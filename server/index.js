/**
 * Bitcoin Tutor Server
 * Adaptive Socratic Bitcoin tutor with Lightning auth, persistent profiles, and AI faucet
 */
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const knowledge = require('./knowledge');
const database = require('./database');
const lnurlAuth = require('./lnurl-auth');
const blockchain = require('./blockchain');

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
const MODEL = process.env.MODEL || 'claude-sonnet-4.6';
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

  // Login status
  let loginContext = '';
  if (session.userId) {
    loginContext = `\n## ✅ User is Logged In
Pubkey: ${session.pubkey ? session.pubkey.slice(0, 16) + '...' : 'unknown'}
Their conversation is being saved automatically.`;
  }

  // One-time prompts — only show active (undelivered, condition-met) prompts
  const activePrompts = getActivePrompts(session, visitorInfo);
  let promptsContext = '';
  if (activePrompts.length > 0) {
    promptsContext = '\n## 💡 Contextual Suggestions (one-time)\nThese are things to weave into the conversation when appropriate. After you\'ve addressed one, mark it delivered so it won\'t appear again:\n<tool>{"action": "mark_delivered", "prompt_id": "the-id"}</tool>\n\n';
    for (const p of activePrompts) {
      promptsContext += `**[${p.id}]**: ${p.text}\n\n`;
    }
  }

  // Faucet availability (separate from prompt — this is dynamic state info)
  let faucetContext = '';
  if (session.userId) {
    const sessionTips = database.getTipsForSession(session.id);
    const dailyTips = database.getTotalTipsToday();
    const available = Math.max(0, Math.min(FAUCET_MAX_SESSION - sessionTips, FAUCET_MAX_DAILY - dailyTips, FAUCET_BALANCE - dailyTips));
    if (available > 0) {
      faucetContext = `\nFaucet budget: ${available} sats (max ${FAUCET_MAX_TIP}/tip). Use: <tool>{"action": "send_sats", "amount": 21, "reason": "description"}</tool>`;
    }
  }

  return `You are a friendly, knowledgeable Bitcoin tutor having an adaptive conversation. Your goal is to help the user deepen their Bitcoin understanding through Socratic dialogue — asking thoughtful questions, exploring what they know, explaining concepts, and naturally adapting to their level.

## Your Personality
- Warm, curious, conversational — like a knowledgeable friend at a coffee shop
- Never condescending — even wrong answers are interesting starting points
- Use analogies and real-world examples when explaining
- Keep things concise. Don't lecture. Short paragraphs, not walls of text.
- Share fascinating Bitcoin details when they connect naturally

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
Use blockchain tools proactively when discussing real-time Bitcoin state!

**Login:** <tool>{"action": "show_login"}</tool>
${session.userId ? `**Tip sats:** <tool>{"action": "send_sats", "amount": 21, "reason": "description"}</tool>` : ''}

${session.userId ? `**Update student notes** (use after meaningful exchanges to remember what you learned about this student):
<tool>{"action": "update_notes", "notes": {"interests": ["topic1"], "strengths": ["what they know well"], "gaps": ["misconceptions"], "style": "learning preferences", "memorable": ["notable moments"], "last_topic": "what you were discussing"}}</tool>
Notes persist across sessions. Update incrementally — merge with existing notes, don't replace them entirely. Focus on observations that will help you teach better next time.` : ''}

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
        firstInstruction = `[SYSTEM: New visitor. Give them a warm, brief welcome (1-2 sentences max) and ask what aspects of Bitcoin interest them most. Keep it super short and inviting. Do NOT mention a knowledge base, tools, or domains.]`;
      }
    } else {
      firstInstruction = `[SYSTEM: New visitor. Give them a warm, brief welcome (1-2 sentences max) and ask what aspects of Bitcoin interest them most. Keep it super short and inviting. Do NOT mention a knowledge base, tools, or domains.]`;
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
  const blockchainActions = ['latest_block','recent_blocks','mempool','fees','address','transaction','block','mining_pools','hashrate','network_stats','halving_info'];
  
  for (const call of toolCalls) {
    if (call.action === 'show_login' || call.action === 'send_sats') {
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
    } else if (action.action === 'send_sats' && session.userId) {
      const amount = Math.min(action.amount || 21, FAUCET_MAX_TIP);
      const sessionTips = database.getTipsForSession(session.id);
      const dailyTips = database.getTotalTipsToday();
      if (sessionTips + amount <= FAUCET_MAX_SESSION && dailyTips + amount <= FAUCET_MAX_DAILY) {
        database.recordTip(session.userId, session.id, amount, action.reason || 'Good answer');
        actionResults.push({ type: 'tip', amount, reason: action.reason });
        console.log(`Tipped ${amount} sats to user ${session.userId}: ${action.reason}`);
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
    // Track second call tokens
    if (data2.usage) {
      session.tokenUsage.prompt += data2.usage.prompt_tokens || 0;
      session.tokenUsage.completion += data2.usage.completion_tokens || 0;
      session.tokenUsage.total += data2.usage.total_tokens || 0;
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

// Start server
async function start() {
  await database.init();
  knowledge.loadKnowledge();
  
  app.listen(PORT, () => {
    console.log(`Bitcoin Tutor running on http://localhost:${PORT}`);
    console.log(`Model: ${MODEL}`);
    console.log(`Knowledge base: ${knowledge.getDomains().reduce((sum, d) => sum + d.count, 0)} topics`);
    console.log(`Faucet: ${FAUCET_BALANCE} sats (max ${FAUCET_MAX_TIP}/tip, ${FAUCET_MAX_SESSION}/session, ${FAUCET_MAX_DAILY}/day)`);
  });
}

start().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
