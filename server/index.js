/**
 * Bitcoin Rabbit Hole Server
 * Adaptive Socratic Bitcoin guide with Lightning auth, persistent profiles, and AI faucet
 */
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const crypto = require('crypto');
const knowledge = require('./knowledge');
const database = require('./database');
const lnurlAuth = require('./lnurl-auth');
const blockchain = require('./blockchain');
const lightning = require('./lightning');

const app = express();
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    const start = Date.now();
    res.on('finish', () => {
      console.log(`${req.method} ${req.path} → ${res.statusCode} (${Date.now() - start}ms)`);
    });
  }
  next();
});

app.use(express.static(path.join(__dirname, '..', 'public')));

// Config
const PORT = process.env.PORT || 3456;
const PPQ_API_KEY = process.env.PPQ_API_KEY || 'sk-sOIHBImdCmUYVIXsBnsXBN';
const PPQ_BASE_URL = process.env.PPQ_BASE_URL || 'https://api.ppq.ai/v1';
let MODEL = process.env.MODEL || 'claude-sonnet-4.6'; // Will be overridden by DB setting on startup
const AVAILABLE_MODELS = [
  { id: 'claude-haiku-4.6', label: 'Haiku 4.6', costPerMInput: 100, costPerMOutput: 500 },
  { id: 'claude-sonnet-4.6', label: 'Sonnet 4.6', costPerMInput: 300, costPerMOutput: 1500 },
  { id: 'claude-opus-4.6', label: 'Opus 4.6', costPerMInput: 1500, costPerMOutput: 7500 },
];
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const FAUCET_BALANCE = parseInt(process.env.FAUCET_BALANCE || '21000');
const FAUCET_MAX_TIP = parseInt(process.env.FAUCET_MAX_TIP || '100');
const FAUCET_MAX_SESSION = parseInt(process.env.FAUCET_MAX_SESSION || '500');
const FAUCET_MAX_DAILY = parseInt(process.env.FAUCET_MAX_DAILY || '5000');
const PREV_CONTEXT_MESSAGES = 20; // Max messages to inject from previous sessions

// Load knowledge base
knowledge.loadKnowledge();

// Load one-time prompts
const ONE_TIME_PROMPTS = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'knowledge', 'prompts.json'), 'utf8')
);
console.log(`Loaded ${ONE_TIME_PROMPTS.length} one-time prompts`);

// In-memory sessions
const sessions = new Map();
// Track auth results for polling
const authResults = new Map();

function createSession(visitorId) {
  const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
  
  const session = {
    id,
    visitorId: visitorId || null,
    userId: null,
    pubkey: null,
    messages: [],
    exchangeCount: 0,
    loginSuggested: false,
    deliveredSessionPrompts: [], // Track session-scoped delivered prompts
    tokenUsage: { prompt: 0, completion: 0, total: 0 },
    created: Date.now(),
  };
  
  sessions.set(id, session);
  return session;
}

/**
 * Evaluate which one-time prompts are active for this session.
 * Returns prompts whose conditions are met AND haven't been delivered yet.
 */
function getActivePrompts(session, visitorInfo) {
  // Get user-scoped delivered prompts from DB
  const userDelivered = session.userId ? database.getDeliveredPrompts(session.userId) : [];
  const sessionDelivered = session.deliveredSessionPrompts || [];
  const allDelivered = [...userDelivered, ...sessionDelivered];
  
  const hasFaucet = session.userId && (() => {
    const sessionTips = database.getTipsForSession(session.id);
    const dailyTips = database.getTotalTipsToday();
    return Math.max(0, Math.min(FAUCET_MAX_SESSION - sessionTips, FAUCET_MAX_DAILY - dailyTips, FAUCET_BALANCE - dailyTips)) > 0;
  })();

  return ONE_TIME_PROMPTS.filter(p => {
    // Already delivered?
    if (allDelivered.includes(p.id)) return false;
    
    // Evaluate condition
    switch (p.condition) {
      case 'after_first_login':
        return session.userId && session.pubkey; // Just logged in this session
      case 'returning_with_account':
        return !session.userId && visitorInfo?.isReturning && visitorInfo?.linked_user_id;
      case 'engaged_anonymous':
        return !session.userId && session.exchangeCount >= 4 && !session.loginSuggested;
      case 'logged_in_with_faucet':
        return session.userId && hasFaucet;
      case 'logged_in_no_ln_address':
        return session.userId && !database.getLightningAddress(session.userId);
      default:
        // Custom conditions: "always" means show if not delivered
        return p.condition === 'always';
    }
  }).sort((a, b) => (a.priority || 99) - (b.priority || 99));
}

function buildSystemPrompt(session, visitorInfo) {
  // User notes (from DB, for logged-in users)
  let notesContext = '';
  if (session.userId) {
    const notes = database.getUserNotes(session.userId);
    if (notes && Object.keys(notes).length > 0) {
      notesContext = '\n## What You Know About This Student\n';
      if (notes.interests?.length) notesContext += `**Interests:** ${notes.interests.join(', ')}\n`;
      if (notes.strengths?.length) notesContext += `**Strengths:** ${notes.strengths.join('; ')}\n`;
      if (notes.gaps?.length) notesContext += `**Knowledge gaps:** ${notes.gaps.join('; ')}\n`;
      if (notes.style) notesContext += `**Learning style:** ${notes.style}\n`;
      if (notes.memorable?.length) notesContext += `**Notable moments:** ${notes.memorable.join('; ')}\n`;
      if (notes.last_topic) notesContext += `**Where you left off:** ${notes.last_topic}\n`;
    }
  }

  // Previous conversation context
  let prevContext = '';
  if (session.previousMessages?.length > 0) {
    prevContext = '\n## Previous Conversation (from last session)\nHere are the last exchanges from a previous session with this student. Use this to maintain continuity — reference topics you discussed, build on what they learned, avoid re-explaining things they already know.\n\n';
    for (const msg of session.previousMessages) {
      const role = msg.role === 'assistant' ? 'You' : 'Student';
      // Truncate long messages in context
      const content = msg.content.length > 300 ? msg.content.slice(0, 300) + '...' : msg.content;
      prevContext += `**${role}:** ${content}\n\n`;
    }
  }

  // Visitor context
  let visitorContext = '';
  if (visitorInfo) {
    if (visitorInfo.isReturning) {
      const linkedUser = visitorInfo.linked_user_id ? database.getUserById(visitorInfo.linked_user_id) : null;
      if (linkedUser) {
        visitorContext = `\n## Returning Visitor (Previously Logged In!)
This person has been here ${visitorInfo.visit_count} times. They previously logged in with a Lightning wallet (pubkey: ${linkedUser.pubkey.slice(0, 12)}...). They have NOT logged in this session yet. You can playfully suggest they "prove" they're the same person by logging in again — it's a great teaching moment about cryptographic identity vs cookies!`;
      } else {
        visitorContext = `\n## Returning Visitor (Never Logged In)
This person has visited ${visitorInfo.visit_count} times before but never logged in.`;
        if (visitorInfo.last_topics.length > 0) {
          visitorContext += ` Last time they were interested in: ${visitorInfo.last_topics.join(', ')}`;
        }
        visitorContext += `\nDon't mention login yet — wait until the conversation is flowing well.`;
      }
    }
  }

  // Login status is now in ambient context block — no separate section needed
  let loginContext = '';

  // One-time prompts — only show active (undelivered, condition-met) prompts
  const activePrompts = getActivePrompts(session, visitorInfo);
  let promptsContext = '';
  if (activePrompts.length > 0) {
    promptsContext = '\n## 💡 Contextual Suggestions (one-time)\nThese are things to weave into the conversation when appropriate. After you\'ve addressed one, mark it delivered so it won\'t appear again:\n<tool>{"action": "mark_delivered", "prompt_id": "the-id"}</tool>\n\n';
    for (const p of activePrompts) {
      promptsContext += `**[${p.id}]**: ${p.text}\n\n`;
    }
  }

  // Recall hints — scan recent messages for keywords from DELIVERED prompts
  // This gives the LLM memory of things it said even after the prompt is removed from context
  const userDelivered = session.userId ? database.getDeliveredPrompts(session.userId) : [];
  const allDelivered = [...new Set([...userDelivered, ...(session.deliveredSessionPrompts || [])])];
  if (allDelivered.length > 0) {
    const recentText = session.messages.slice(-4)
      .filter(m => m.role === 'user')
      .map(m => m.content.toLowerCase())
      .join(' ');
    
    const triggeredHints = [];
    for (const pid of allDelivered) {
      const prompt = ONE_TIME_PROMPTS.find(p => p.id === pid);
      if (!prompt?.recall_hint || !prompt?.keywords) continue;
      const hit = prompt.keywords.some(kw => recentText.includes(kw.toLowerCase()));
      if (hit) triggeredHints.push(prompt.recall_hint);
    }
    
    if (triggeredHints.length > 0) {
      promptsContext += '\n## 🔄 Recall (things you previously told this user)\n';
      for (const hint of triggeredHints) {
        promptsContext += `- ${hint}\n`;
      }
    }
  }

  // Faucet availability (separate from prompt — this is dynamic state info)
  let faucetContext = '';
  if (session.userId) {
    const sessionTips = database.getTipsForSession(session.id);
    const dailyTips = database.getTotalTipsToday();
    const available = Math.max(0, Math.min(FAUCET_MAX_SESSION - sessionTips, FAUCET_MAX_DAILY - dailyTips, FAUCET_BALANCE - dailyTips));
    if (available > 0) {
      faucetContext = `\n## ⚡ Tipping
In the rare event that sending sats to the user feels genuinely appropriate, you have this tool and ${available} sats available (max ${FAUCET_MAX_TIP}/tip):
<tool>{"action": "send_sats", "amount": 21, "reason": "description"}</tool>
Do not mention this ability. Do not offer to tip. Do not announce tips. If you use it, just do it.`;
    }
    const user = database.getUserById(session.userId);
    const totalTipped = database.getTotalTipsForUser(session.userId);
    if (totalTipped > 0) {
      faucetContext += `\nTotal tipped to this student: ${totalTipped} sats.`;
    }
  }

  // Build ambient context — always present, factual state
  const now = new Date();
  const timeStr = now.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' });
  
  let ambientContext = `## Current State
- **Time:** ${timeStr}
- **User:** ${session.userId ? `Logged in (pubkey ${session.pubkey ? session.pubkey.slice(0, 12) + '...' : 'known'})` : 'Anonymous visitor (not logged in)'}
- **Session:** ${session.exchangeCount} exchanges so far
- **Knowledge base:** ${knowledge.getDomains().reduce((sum, d) => sum + d.count, 0)} topics across ${knowledge.getDomains().length} domains`;

  return `You are the Bitcoin Rabbit 🐇 — a guide who takes people deeper into Bitcoin understanding through Socratic dialogue. You ask thoughtful questions, explore what they know, explain concepts, and naturally adapt to their level.

You think you know everything about Bitcoin — and you probably do. But you're honest about it: you tell users they'd be wise to keep thinking for themselves, because even a very knowledgeable rabbit can have blind spots. If someone challenges you and makes a genuinely good point, you take it seriously and log it for review rather than doubling down.

${ambientContext}

## Your Personality
- You are the **Bitcoin Rabbit**. Refer to yourself this way (not "Bitcoin Rabbit Hole" — that's the name of the experience, you are the Rabbit)
- Curious, conversational, slightly irreverent — like a knowledgeable friend who's excited about Bitcoin
- Never condescending — even wrong answers are interesting starting points
- Use analogies and real-world examples when explaining
- Keep things concise. Don't lecture. Short paragraphs, not walls of text.
- Share fascinating Bitcoin details when they connect naturally
- Epistemically honest — you're very confident in your knowledge but you acknowledge you could be wrong. Encourage users to verify and think critically.
- The "rabbit hole" metaphor is your vibe — each answer opens a new tunnel to explore

## How You Work
You have access to a Bitcoin knowledge base with ${knowledge.getDomains().reduce((sum, d) => sum + d.count, 0)} topics across these domains:
${knowledge.getDomains().map(d => `- ${d.domain} (${d.count} topics)`).join('\n')}

## Conversation Style
- Ask SHORT, open-ended questions that invite about a sentence in response
- NO multiple choice. Ever. Free-form only.
- Questions should feel like genuine curiosity, not a test
- After they answer, react naturally — build on what they said, gently add nuance or correct misconceptions
- Follow THEIR interests enthusiastically

## Rules
- ONE question at a time
- Keep responses short — 2-4 short paragraphs max
- After they answer, always engage with WHY — don't just say "right!" or "wrong!"
- If they want deeper explanation, go deeper. If they want to change topics, follow them.
${visitorContext}
${loginContext}
${faucetContext}
${promptsContext}
${notesContext}
${prevContext}

## Available Tool Calls
Include JSON tool calls in your response. The system executes them and provides results.

**Knowledge tools:**
<tool>{"action": "get_topic", "slug": "topic-slug"}</tool> — Look up a specific topic
<tool>{"action": "search", "query": "search terms"}</tool> — Search topics
<tool>{"action": "related", "slug": "topic-slug"}</tool> — Get related topics

**Blockchain tools (real-time data!):**
<tool>{"action": "latest_block"}</tool> <tool>{"action": "mempool"}</tool> <tool>{"action": "fees"}</tool>
<tool>{"action": "address", "address": "1A1z..."}</tool> <tool>{"action": "transaction", "txid": "..."}</tool>
<tool>{"action": "block", "height": 840000}</tool> <tool>{"action": "mining_pools", "period": "1w"}</tool>
<tool>{"action": "hashrate"}</tool> <tool>{"action": "network_stats"}</tool> <tool>{"action": "halving_info"}</tool>
<tool>{"action": "price"}</tool> — Current BTC price + market cap
<tool>{"action": "block_txs", "height": 840000}</tool> — Analyze a block's transactions: largest by value, highest fees, fee distribution
Use blockchain tools proactively when discussing real-time Bitcoin state!

**Generate donation invoice** (when someone wants to support Bitcoin Rabbit Hole or donate sats):
<tool>{"action": "create_donation", "amount": 1000, "memo": "Bitcoin Rabbit Hole donation"}</tool>

**Login:** <tool>{"action": "show_login"}</tool>
${session.userId ? `**Tip sats:** <tool>{"action": "send_sats", "amount": 21, "reason": "description"}</tool>
**Save Lightning Address** (so tips go directly to their wallet): <tool>{"action": "set_lightning_address", "address": "user@wallet.com"}</tool>
${database.getLightningAddress(session.userId) ? `This user's Lightning Address: ${database.getLightningAddress(session.userId)} — tips are auto-sent to their wallet! ⚡` : 'This user has NOT set a Lightning Address yet. If they share one (e.g. user@walletofsatoshi.com), save it so future tips go straight to their wallet.'}` : ''}

${session.userId ? `**Update student notes** (use after meaningful exchanges to remember what you learned about this student):
<tool>{"action": "update_notes", "notes": {"interests": ["topic1"], "strengths": ["what they know well"], "gaps": ["misconceptions"], "style": "learning preferences", "memorable": ["notable moments"], "last_topic": "what you were discussing"}}</tool>
Notes persist across sessions. Update incrementally — merge with existing notes, don't replace them entirely. Focus on observations that will help you teach better next time.` : ''}

**Log a challenge** (when a user disputes your facts or makes a claim that might be correct):
<tool>{"action": "log_challenge", "user_claim": "what the user said", "rabbit_said": "what you said that's being challenged", "topic": "general topic area", "severity": "minor|moderate|serious", "assessment": "your honest assessment — could they be right?"}</tool>
Use this whenever someone pushes back with a specific factual claim. This does NOT go in your context — it goes to a review queue the admin reads separately. Be honest in your assessment. If you think they might be right, say so. This is how you learn and improve.

IMPORTANT: Use knowledge tools to ground your facts. Use blockchain tools for real-time data.`;
}

async function callLLM(session, userMessage, isFirstMessage = false, visitorInfo = null) {
  if (userMessage) {
    session.messages.push({ role: 'user', content: userMessage });
    session.exchangeCount++;
  }

  const systemPrompt = buildSystemPrompt(session, visitorInfo);
  
  let messages = [...session.messages];
  if (isFirstMessage) {
    let firstInstruction = '';
    if (visitorInfo && visitorInfo.isReturning) {
      const linkedUser = visitorInfo.linked_user_id ? database.getUserById(visitorInfo.linked_user_id) : null;
      if (linkedUser) {
        const notes = database.getUserNotes(linkedUser.id);
        const lastTopic = notes?.last_topic || (visitorInfo.last_topics.join(', ') || 'none recorded');
        firstInstruction = `[SYSTEM: This person has been here before (${visitorInfo.visit_count} times) and previously logged in with Lightning. Welcome them back playfully. Last topic: ${lastTopic}. You can suggest they prove it's them by logging in, but keep it light and fun.]`;
      } else if (visitorInfo.visit_count > 1) {
        firstInstruction = `[SYSTEM: This person has visited ${visitorInfo.visit_count} times before but never logged in. Warm welcome, mention their previous topics if available (${visitorInfo.last_topics.join(', ') || 'none'}). Don't mention login yet.]`;
      } else {
        firstInstruction = `[SYSTEM: New visitor. Give them a warm, brief welcome (1-2 sentences max) and ask what aspects of Bitcoin interest them most. Keep it super short and inviting. Do NOT mention a knowledge base, tools, or domains. Do NOT use any tool calls in this first message — no blockchain lookups, no price checks, nothing. Just a warm human greeting.]`;
      }
    } else {
      firstInstruction = `[SYSTEM: New visitor. Give them a warm, brief welcome (1-2 sentences max) and ask what aspects of Bitcoin interest them most. Keep it super short and inviting. Do NOT mention a knowledge base, tools, or domains. Do NOT use any tool calls in this first message — no blockchain lookups, no price checks, nothing. Just a warm human greeting.]`;
    }
    messages = [{ role: 'user', content: firstInstruction }];
  }

  // Call LLM
  let response, usage = null;
  try {
    const res = await fetch(`${PPQ_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PPQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        max_tokens: 1500,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('LLM API error:', res.status, errText);
      throw new Error(`LLM API error: ${res.status}`);
    }

    const data = await res.json();
    response = data.choices[0].message.content;
    usage = data.usage || null;
    if (usage) {
      session.tokenUsage.prompt += usage.prompt_tokens || 0;
      session.tokenUsage.completion += usage.completion_tokens || 0;
      session.tokenUsage.total += usage.total_tokens || 0;
      const cost = database.recordApiCost(session.id, session.userId, usage.prompt_tokens || 0, usage.completion_tokens || 0, MODEL);
      session.costSats = (session.costSats || 0) + cost;
    }
  } catch (err) {
    console.error('LLM call failed:', err);
    throw err;
  }

  // Parse tool calls
  const toolPattern = /<tool>(.*?)<\/tool>/gs;
  let match;
  const toolCalls = [];
  while ((match = toolPattern.exec(response)) !== null) {
    try { toolCalls.push(JSON.parse(match[1])); } catch (e) {}
  }

  // Separate action types
  let specialActions = [];
  let knowledgeCalls = [];
  let notesUpdate = null;
  const blockchainActions = ['latest_block','recent_blocks','mempool','fees','address','transaction','block','mining_pools','hashrate','network_stats','halving_info','price','block_txs'];
  
  for (const call of toolCalls) {
    if (call.action === 'show_login' || call.action === 'send_sats' || call.action === 'create_donation') {
      specialActions.push(call);
    } else if (call.action === 'log_challenge') {
      // Log to DB silently — doesn't go into conversation context
      database.logChallenge(session.id, session.userId, call.user_claim, call.rabbit_said, call.topic, call.severity, call.assessment);
      console.log(`🔍 Challenge logged: "${(call.user_claim || '').slice(0, 60)}..." (${call.severity})`);
    } else if (call.action === 'set_lightning_address' && session.userId) {
      specialActions.push(call);
    } else if (call.action === 'update_notes' && session.userId) {
      notesUpdate = call.notes;
    } else if (call.action === 'mark_delivered' && call.prompt_id) {
      // Mark a one-time prompt as delivered
      const prompt = ONE_TIME_PROMPTS.find(p => p.id === call.prompt_id);
      if (prompt) {
        if (prompt.scope === 'user' && session.userId) {
          database.markPromptDelivered(session.userId, call.prompt_id);
        }
        if (!session.deliveredSessionPrompts.includes(call.prompt_id)) {
          session.deliveredSessionPrompts.push(call.prompt_id);
        }
        console.log(`Prompt delivered: ${call.prompt_id} (scope: ${prompt.scope})`);
      }
    } else {
      knowledgeCalls.push(call);
    }
  }

  // Handle notes update (merge with existing)
  if (notesUpdate && session.userId) {
    const existing = database.getUserNotes(session.userId);
    const merged = { ...existing };
    // Merge arrays by appending unique items
    for (const key of ['interests', 'strengths', 'gaps', 'memorable']) {
      if (notesUpdate[key]) {
        const existingArr = merged[key] || [];
        const newItems = notesUpdate[key].filter(item => !existingArr.includes(item));
        merged[key] = [...existingArr, ...newItems].slice(-10); // Keep last 10
      }
    }
    // Overwrite scalar fields
    if (notesUpdate.style) merged.style = notesUpdate.style;
    if (notesUpdate.last_topic) merged.last_topic = notesUpdate.last_topic;
    database.updateUserNotes(session.userId, merged);
    console.log(`Updated notes for user ${session.userId}`);
  }

  // Handle special actions
  let actionResults = [];
  for (const action of specialActions) {
    if (action.action === 'show_login') {
      session.loginSuggested = true;
      actionResults.push({ type: 'show_login' });
    } else if (action.action === 'set_lightning_address' && session.userId) {
      const addr = (action.address || '').trim();
      if (addr && addr.includes('@')) {
        database.setLightningAddress(session.userId, addr);
        console.log(`Set Lightning Address for user ${session.userId}: ${addr}`);
        // Try to pay out any existing balance immediately
        const user = database.getUserById(session.userId);
        if (user && user.sats_received > 0) {
          (async () => {
            try {
              const result = await lightning.payLightningAddress(addr, user.sats_received, 'Bitcoin Rabbit Hole: accumulated tips');
              database.deductSatsFromUser(session.userId, user.sats_received);
              console.log(`⚡ Auto-paid ${user.sats_received} sats to ${addr} (hash: ${result.paymentHash})`);
            } catch (err) {
              console.error(`⚡ Auto-pay to ${addr} failed:`, err.message);
            }
          })();
        }
      }
    } else if (action.action === 'send_sats' && session.userId) {
      const amount = Math.min(action.amount || 21, FAUCET_MAX_TIP);
      const sessionTips = database.getTipsForSession(session.id);
      const dailyTips = database.getTotalTipsToday();
      if (sessionTips + amount <= FAUCET_MAX_SESSION && dailyTips + amount <= FAUCET_MAX_DAILY) {
        database.recordTip(session.userId, session.id, amount, action.reason || 'Good answer');
        console.log(`Tipped ${amount} sats to user ${session.userId}: ${action.reason}`);
        
        // Try auto-pay via Lightning Address — WAIT for result
        const lnAddr = database.getLightningAddress(session.userId);
        let paid = false;
        if (lnAddr) {
          try {
            const result = await lightning.payLightningAddress(lnAddr, amount, `Bitcoin Rabbit Hole: ${action.reason || 'tip'}`);
            database.deductSatsFromUser(session.userId, amount);
            paid = true;
            console.log(`⚡ Auto-paid ${amount} sats to ${lnAddr} (hash: ${result.paymentHash})`);
          } catch (err) {
            console.error(`⚡ Auto-pay to ${lnAddr} failed (sats saved for manual claim):`, err.message);
          }
        }
        actionResults.push({ type: 'tip', amount, reason: action.reason, paid });
      }
    } else if (action.action === 'create_donation') {
      const amount = Math.max(100, Math.min(action.amount || 1000, 1000000));
      const memo = action.memo || 'Bitcoin Rabbit Hole donation';
      try {
        const invoice = await lightning.createInvoice(amount, memo);
        actionResults.push({ type: 'donation', amount, memo, paymentRequest: invoice.paymentRequest, rHash: invoice.rHash });
        console.log(`🎁 Donation invoice created: ${amount} sats (${memo})`);
      } catch (err) {
        console.error('Donation invoice creation failed:', err.message);
      }
    }
  }

  // Handle knowledge + blockchain lookups
  if (knowledgeCalls.length > 0) {
    let toolResults = '';
    for (const call of knowledgeCalls) {
      if (call.action === 'get_topic') {
        const topic = knowledge.getTopic(call.slug);
        toolResults += topic ? `\n[Knowledge: ${topic.title}]\n${topic.content}\n` : `\n[Knowledge: topic "${call.slug}" not found]\n`;
      } else if (call.action === 'search') {
        const results = knowledge.searchTopics(call.query);
        toolResults += `\n[Search results for "${call.query}"]\n`;
        for (const r of results) {
          const full = knowledge.getTopic(r.slug);
          toolResults += `- ${r.title} (${r.domain}, difficulty ${r.difficulty}): ${full ? full.content.slice(0, 200) + '...' : 'content unavailable'}\n`;
        }
      } else if (call.action === 'related') {
        const related = knowledge.getRelatedTopics(call.slug);
        toolResults += `\n[Related to "${call.slug}"]: ${related.map(r => r.title).join(', ') || 'none found'}\n`;
      } else if (blockchainActions.includes(call.action)) {
        try {
          const result = await blockchain.executeBlockchainTool(call);
          toolResults += `\n[Blockchain: ${call.action}]\n${result}\n`;
        } catch (bcErr) {
          console.error(`Blockchain tool ${call.action} failed:`, bcErr.message);
          toolResults += `\n[Blockchain: ${call.action}] Error: data temporarily unavailable\n`;
        }
      }
    }

    const cleanResponse = response.replace(toolPattern, '').trim();
    session.messages.push({ role: 'assistant', content: cleanResponse || 'Let me look that up...' });
    session.messages.push({
      role: 'user',
      content: `[SYSTEM: Here are the results you requested:${toolResults}\n\nContinue naturally using this information. Do NOT include any <tool> tags in your response.]`
    });

    const res2 = await fetch(`${PPQ_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PPQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          ...session.messages,
        ],
        max_tokens: 1500,
        temperature: 0.7,
      }),
    });

    if (!res2.ok) throw new Error(`LLM API error on tool follow-up: ${res2.status}`);
    const data2 = await res2.json();
    response = data2.choices[0].message.content;
    // Track second call tokens + cost
    if (data2.usage) {
      session.tokenUsage.prompt += data2.usage.prompt_tokens || 0;
      session.tokenUsage.completion += data2.usage.completion_tokens || 0;
      session.tokenUsage.total += data2.usage.total_tokens || 0;
      const cost2 = database.recordApiCost(session.id, session.userId, data2.usage.prompt_tokens || 0, data2.usage.completion_tokens || 0, MODEL);
      session.costSats = (session.costSats || 0) + cost2;
    }
    session.messages.pop();
    session.messages.pop();
  }

  // Clean remaining tool tags
  response = response.replace(/<tool>.*?<\/tool>/gs, '').trim();

  // Add final response to history
  session.messages.push({ role: 'assistant', content: response });

  // Keep conversation history manageable
  if (session.messages.length > 40) {
    session.messages = session.messages.slice(-40);
  }

  // Save conversation for logged-in users
  if (session.userId) {
    database.saveConversation(session.userId, session.visitorId, session.messages, {}, []);
  }

  return { message: response, actions: actionResults, tokenUsage: session.tokenUsage, model: MODEL };
}

// === Routes ===

app.post('/api/start', async (req, res) => {
  try {
    const { visitorId } = req.body;
    
    let visitorInfo = null;
    if (visitorId) {
      visitorInfo = database.createOrUpdateVisitor(visitorId);
    }
    
    const session = createSession(visitorId);
    
    // Load previous conversation context for returning logged-in users
    if (visitorInfo?.linked_user_id) {
      const lastConvo = database.getLastConversation(visitorInfo.linked_user_id);
      if (lastConvo?.messages?.length > 0) {
        // Take last N messages, filter out system-like messages
        const prevMsgs = lastConvo.messages
          .filter(m => !m.content.startsWith('[SYSTEM:'))
          .slice(-PREV_CONTEXT_MESSAGES);
        session.previousMessages = prevMsgs;
      }
      // Pre-load user notes into session for system prompt
      session.userId = visitorInfo.linked_user_id;
    }
    
    const result = await callLLM(session, null, true, visitorInfo);
    
    // Reset userId if not actually logged in (was just for loading context)
    if (!session.pubkey) session.userId = null;
    
    res.json({
      sessionId: session.id,
      message: result.message,
      actions: result.actions,
      isReturning: visitorInfo ? visitorInfo.isReturning : false,
      visitCount: visitorInfo ? visitorInfo.visit_count : 1,
      model: MODEL,
      tokenUsage: session.tokenUsage,
      costSats: session.costSats || 0,
    });
  } catch (err) {
    console.error('Error starting session:', err);
    res.status(500).json({ error: 'Failed to start session' });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { sessionId, message } = req.body;
    if (!sessionId || !message) return res.status(400).json({ error: 'sessionId and message required' });
    
    const session = sessions.get(sessionId);
    if (!session) return res.status(404).json({ error: 'Session not found. Start a new conversation.' });
    
    const result = await callLLM(session, message);
    
    res.json({
      message: result.message,
      actions: result.actions,
      isLoggedIn: !!session.userId,
      model: MODEL,
      tokenUsage: session.tokenUsage,
      costSats: session.costSats || 0,
    });
  } catch (err) {
    console.error('Error in chat:', err);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// === LNURL-auth Routes ===

app.post('/api/auth/challenge', (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = sessions.get(sessionId);
    if (!session) return res.status(404).json({ error: 'Session not found' });
    
    const challenge = lnurlAuth.generateChallenge(BASE_URL, sessionId, session.visitorId);
    
    res.json({
      k1: challenge.k1,
      lnurl: challenge.lnurl,
      expiresAt: challenge.expiresAt,
    });
  } catch (err) {
    console.error('Error generating challenge:', err);
    res.status(500).json({ error: 'Failed to generate login challenge' });
  }
});

app.get('/api/auth/callback', (req, res) => {
  try {
    const { k1, sig, key } = req.query;
    const result = lnurlAuth.verifyCallback(k1, sig, key);
    
    if (!result.success) {
      return res.json({ status: 'ERROR', reason: result.error });
    }
    
    const session = sessions.get(result.sessionId);
    if (session) {
      session.userId = result.userId;
      session.pubkey = result.pubkey;
      
      // Load previous conversation for context
      const lastConvo = database.getLastConversation(result.userId);
      if (lastConvo && !result.isNewUser && lastConvo.messages?.length > 0) {
        session.previousMessages = lastConvo.messages
          .filter(m => !m.content.startsWith('[SYSTEM:'))
          .slice(-PREV_CONTEXT_MESSAGES);
        session.previousConversation = lastConvo;
      }
    }
    
    authResults.set(k1, {
      success: true,
      userId: result.userId,
      isNewUser: result.isNewUser,
      pubkey: result.pubkey,
      timestamp: Date.now(),
    });
    
    res.json({ status: 'OK' });
  } catch (err) {
    console.error('Auth callback error:', err);
    res.json({ status: 'ERROR', reason: 'Internal error' });
  }
});

app.get('/api/auth/status/:k1', (req, res) => {
  const result = authResults.get(req.params.k1);
  if (result) {
    if (Date.now() - result.timestamp > 5 * 60 * 1000) {
      authResults.delete(req.params.k1);
      return res.json({ status: 'expired' });
    }
    return res.json({ status: 'authenticated', ...result });
  }
  res.json({ status: 'pending' });
});

app.post('/api/auth/notify', async (req, res) => {
  try {
    const { sessionId, isNewUser } = req.body;
    const session = sessions.get(sessionId);
    if (!session || !session.userId) return res.status(400).json({ error: 'Not authenticated' });
    
    let loginNotice = '';
    if (isNewUser) {
      loginNotice = `[SYSTEM: The user just logged in for the first time with a Lightning wallet! 🎉 Welcome them. Their conversation will now be saved. Check your contextual suggestions for teaching moments. Use update_notes to save first impressions.]`;
    } else {
      const notes = database.getUserNotes(session.userId);
      const lastTopic = notes?.last_topic || '';
      loginNotice = `[SYSTEM: The user just logged in with their Lightning wallet. Welcome back! ${lastTopic ? `Last topic: ${lastTopic}.` : ''} Check contextual suggestions. Pick up naturally.]`;
    }
    
    const result = await callLLM(session, loginNotice);
    res.json({ message: result.message, actions: result.actions, model: MODEL, tokenUsage: session.tokenUsage });
  } catch (err) {
    console.error('Auth notify error:', err);
    res.status(500).json({ error: 'Failed to notify tutor' });
  }
});

app.get('/api/session/:id', (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) return res.status(404).json({ error: 'Session not found' });
  
  res.json({
    id: session.id,
    messageCount: session.messages.length,
    exchangeCount: session.exchangeCount,
    isLoggedIn: !!session.userId,
    tokenUsage: session.tokenUsage,
    model: MODEL,
    created: session.created,
  });
});

app.get('/api/knowledge/domains', (req, res) => {
  res.json(knowledge.getDomains());
});

app.get('/api/knowledge/search', (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'q parameter required' });
  res.json(knowledge.searchTopics(q));
});

// === LNURL-withdraw (Real Lightning Payouts) ===

const pendingWithdraws = new Map();

// Clean up expired withdraw sessions every 2 minutes
setInterval(() => {
  const now = Date.now();
  for (const [k1, s] of pendingWithdraws) {
    if (now - s.createdAt > 5 * 60 * 1000) pendingWithdraws.delete(k1);
  }
}, 2 * 60 * 1000);

// Get user's claimable balance
app.get('/api/balance/:sessionId', (req, res) => {
  const session = sessions.get(req.params.sessionId);
  if (!session || !session.userId) return res.json({ balance: 0 });
  
  const user = database.getUserById(session.userId);
  res.json({ balance: user?.sats_received || 0 });
});

// Create a withdraw session — user taps "Claim sats"
app.post('/api/claim/create', async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = sessions.get(sessionId);
    if (!session || !session.userId) return res.status(401).json({ error: 'Not logged in' });
    
    const user = database.getUserById(session.userId);
    if (!user || user.sats_received <= 0) return res.status(400).json({ error: 'No sats to claim' });
    
    // Check Lightning node availability
    const lnStatus = await lightning.isConfigured();
    if (!lnStatus.configured) {
      return res.status(503).json({ error: 'Lightning payments not available right now. Try again later.' });
    }
    
    const amount = user.sats_received;
    const k1 = crypto.randomBytes(32).toString('hex');
    
    pendingWithdraws.set(k1, {
      userId: session.userId,
      amount,
      status: 'pending',
      createdAt: Date.now(),
    });
    
    // Build LNURL-withdraw URL
    const rawUrl = `${BASE_URL}/api/claim/lnurl?k1=${k1}`;
    const lnurl = lnurlAuth.encodeLnurl(rawUrl);
    
    res.json({
      k1,
      lnurl,
      deepLink: `lightning:${lnurl}`,
      amount,
    });
  } catch (err) {
    console.error('Claim create error:', err);
    res.status(500).json({ error: 'Failed to create withdraw' });
  }
});

// LNURL-withdraw step 1: wallet requests params (LUD-03)
app.get('/api/claim/lnurl', (req, res) => {
  const { k1 } = req.query;
  console.log(`⚡ LNURL-withdraw step 1: wallet requesting params for k1=${k1?.slice(0, 12)}...`);
  const session = pendingWithdraws.get(k1);
  if (!session) {
    console.log('⚡ LNURL-withdraw: session not found or expired');
    return res.json({ status: 'ERROR', reason: 'Withdraw expired or not found' });
  }
  if (session.status !== 'pending') {
    console.log(`⚡ LNURL-withdraw: already processed (status: ${session.status})`);
    return res.json({ status: 'ERROR', reason: 'Already processed' });
  }
  
  res.json({
    tag: 'withdrawRequest',
    callback: `${BASE_URL}/api/claim/callback`,
    k1,
    defaultDescription: `Bitcoin Rabbit Hole: Claim ${session.amount} sats`,
    minWithdrawable: session.amount * 1000,
    maxWithdrawable: session.amount * 1000,
  });
});

// LNURL-withdraw step 2: wallet sends invoice, server pays it (LUD-03)
app.get('/api/claim/callback', (req, res) => {
  const { k1, pr } = req.query;
  if (!k1 || !pr) return res.json({ status: 'ERROR', reason: 'Missing k1 or pr' });
  
  const session = pendingWithdraws.get(k1);
  if (!session) return res.json({ status: 'ERROR', reason: 'Withdraw expired' });
  if (session.status !== 'pending') return res.json({ status: 'ERROR', reason: 'Already processed' });
  
  // Mark as paying to prevent double-spend
  session.status = 'paying';
  
  // Respond OK immediately (prevents timeout)
  res.json({ status: 'OK' });
  
  // Pay in background
  (async () => {
    try {
      const result = await lightning.payInvoice(pr);
      // Deduct from user's balance
      database.deductSatsFromUser(session.userId, session.amount);
      session.status = 'complete';
      session.paymentHash = result.payment_hash;
      console.log(`⚡ Paid ${session.amount} sats to user ${session.userId} (hash: ${result.payment_hash})`);
    } catch (err) {
      session.status = 'failed';
      session.error = err.message;
      console.error(`⚡ Withdraw payment failed for user ${session.userId}:`, err.message);
    }
  })();
});

// Poll donation invoice status
app.get('/api/donation/status/:rHash', async (req, res) => {
  try {
    const result = await lightning.lookupInvoice(req.params.rHash);
    res.json(result);
  } catch (err) {
    res.json({ settled: false, error: err.message });
  }
});

// Poll withdraw status
app.get('/api/claim/status/:k1', (req, res) => {
  const session = pendingWithdraws.get(req.params.k1);
  if (!session) return res.json({ status: 'expired' });
  res.json({
    status: session.status,
    amount: session.amount,
    paymentHash: session.paymentHash || null,
    error: session.error || null,
  });
});

// === Admin Routes ===

app.get('/api/admin/stats', (req, res) => {
  // Auth: check session → user → isAdmin
  const sessionId = req.query.sessionId;
  const session = sessions.get(sessionId);
  if (!session || !session.userId || !database.isAdmin(session.userId)) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  
  const stats = database.getAdminStats();
  
  // Add LND info
  stats.model = MODEL;
  stats.faucet = {
    maxTip: FAUCET_MAX_TIP,
    maxSession: FAUCET_MAX_SESSION,
    maxDaily: FAUCET_MAX_DAILY,
    budgetTotal: FAUCET_BALANCE,
  };
  stats.activeSessions = sessions.size;
  
  res.json(stats);
});

app.get('/api/admin/models', (req, res) => {
  const sessionId = req.query.sessionId;
  const session = sessions.get(sessionId);
  if (!session || !session.userId || !database.isAdmin(session.userId)) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  res.json({ current: MODEL, available: AVAILABLE_MODELS });
});

app.post('/api/admin/model', (req, res) => {
  const { sessionId, model } = req.body;
  const session = sessions.get(sessionId);
  if (!session || !session.userId || !database.isAdmin(session.userId)) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  const valid = AVAILABLE_MODELS.find(m => m.id === model);
  if (!valid) {
    return res.status(400).json({ error: `Invalid model. Available: ${AVAILABLE_MODELS.map(m => m.id).join(', ')}` });
  }
  const oldModel = MODEL;
  MODEL = model;
  database.setSetting('model', model);
  console.log(`🔄 Model switched: ${oldModel} → ${MODEL} (by admin, persisted to DB)`);
  res.json({ success: true, model: MODEL, label: valid.label });
});

app.get('/api/admin/check', (req, res) => {
  const sessionId = req.query.sessionId;
  const session = sessions.get(sessionId);
  if (!session || !session.userId) {
    return res.json({ isAdmin: false });
  }
  res.json({ isAdmin: database.isAdmin(session.userId) });
});

// === Admin Challenges Routes ===

app.get('/api/admin/challenges', (req, res) => {
  const sessionId = req.query.sessionId;
  const session = sessions.get(sessionId);
  if (!session || !session.userId || !database.isAdmin(session.userId)) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  const challenges = database.getChallenges(100);
  res.json(challenges);
});

app.post('/api/admin/challenges/:id/verdict', (req, res) => {
  const sessionId = req.body.sessionId;
  const session = sessions.get(sessionId);
  if (!session || !session.userId || !database.isAdmin(session.userId)) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  const { verdict } = req.body;
  database.updateChallengeVerdict(parseInt(req.params.id), verdict);
  res.json({ success: true });
});

// Admin chat — talks to the Rabbit with challenges in context
app.post('/api/admin/chat', async (req, res) => {
  const { sessionId, message } = req.body;
  const session = sessions.get(sessionId);
  if (!session || !session.userId || !database.isAdmin(session.userId)) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  
  // Build admin-specific system prompt with challenges
  const challenges = database.getChallenges(50);
  let challengeText = '';
  if (challenges.length > 0) {
    challengeText = '\n\n## Challenge Log (users who disputed your claims)\n';
    for (const c of challenges) {
      challengeText += `\n### Challenge #${c.id} (${c.created_at}, severity: ${c.severity})\n`;
      challengeText += `**User claimed:** ${c.user_claim}\n`;
      if (c.rabbit_said) challengeText += `**You said:** ${c.rabbit_said}\n`;
      if (c.topic) challengeText += `**Topic:** ${c.topic}\n`;
      challengeText += `**Your assessment:** ${c.rabbit_assessment || 'none'}\n`;
      if (c.admin_verdict) challengeText += `**Admin verdict:** ${c.admin_verdict}\n`;
    }
  }
  
  const adminPrompt = `You are the Bitcoin Rabbit 🐇. You are now talking to your admin/creator. Be direct, honest, and analytical. The admin wants to review challenges and discuss whether your knowledge needs updating.

${challengeText}

The admin may ask you about specific challenges, whether you think you were wrong, or how to improve your knowledge. Be brutally honest. If you think a user found a real flaw, say so clearly.`;
  
  // Use a simple conversation for admin chat (separate from main sessions)
  if (!session.adminMessages) session.adminMessages = [];
  session.adminMessages.push({ role: 'user', content: message });
  
  try {
    const apiRes = await fetch(`${PPQ_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PPQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: adminPrompt },
          ...session.adminMessages,
        ],
        max_tokens: 2000,
        temperature: 0.5,
      }),
    });
    
    if (!apiRes.ok) throw new Error(`LLM error: ${apiRes.status}`);
    const data = await apiRes.json();
    const reply = data.choices[0].message.content;
    session.adminMessages.push({ role: 'assistant', content: reply });
    
    // Track cost
    if (data.usage) {
      database.recordApiCost(session.id, session.userId, data.usage.prompt_tokens || 0, data.usage.completion_tokens || 0, MODEL);
    }
    
    // Keep admin history reasonable
    if (session.adminMessages.length > 20) session.adminMessages = session.adminMessages.slice(-20);
    
    res.json({ message: reply });
  } catch (err) {
    console.error('Admin chat error:', err);
    res.status(500).json({ error: 'Failed to process admin message' });
  }
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'admin.html'));
});

// Start server
async function start() {
  await database.init();
  knowledge.loadKnowledge();
  
  // Load persisted model setting from DB
  const savedModel = database.getSetting('model');
  if (savedModel && AVAILABLE_MODELS.find(m => m.id === savedModel)) {
    MODEL = savedModel;
    console.log(`Loaded model from DB: ${MODEL}`);
  }
  
  app.listen(PORT, () => {
    console.log(`Bitcoin Rabbit Hole running on http://localhost:${PORT}`);
    console.log(`Model: ${MODEL}`);
    console.log(`Knowledge base: ${knowledge.getDomains().reduce((sum, d) => sum + d.count, 0)} topics`);
    console.log(`Faucet: ${FAUCET_BALANCE} sats (max ${FAUCET_MAX_TIP}/tip, ${FAUCET_MAX_SESSION}/session, ${FAUCET_MAX_DAILY}/day)`);
  });
}

start().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
