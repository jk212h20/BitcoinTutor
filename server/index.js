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
const FAUCET_BALANCE = parseInt(process.env.FAUCET_BALANCE || '21000'); // sats
const FAUCET_MAX_TIP = parseInt(process.env.FAUCET_MAX_TIP || '100');
const FAUCET_MAX_SESSION = parseInt(process.env.FAUCET_MAX_SESSION || '500');
const FAUCET_MAX_DAILY = parseInt(process.env.FAUCET_MAX_DAILY || '5000');

// Load knowledge base
knowledge.loadKnowledge();

// Load first questions
const firstQuestions = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'knowledge', 'first-questions.json'), 'utf8')
);

// In-memory sessions
const sessions = new Map();
// Track auth results for polling
const authResults = new Map();

function createSession(visitorId) {
  const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
  
  const session = {
    id,
    visitorId: visitorId || null,
    userId: null,       // set when logged in via LNURL-auth
    pubkey: null,       // set when logged in
    messages: [],       // conversation history for LLM
    testedTopics: [],
    knowledgeProfile: {},
    exchangeCount: 0,   // how many user messages sent (for login timing)
    loginSuggested: false,
    created: Date.now(),
  };
  
  sessions.set(id, session);
  return session;
}

function buildSystemPrompt(session, visitorInfo) {
  // Build compact knowledge profile
  let profileText = 'No topics tested yet.';
  if (Object.keys(session.knowledgeProfile).length > 0) {
    profileText = Object.entries(session.knowledgeProfile)
      .map(([slug, p]) => `- ${slug}: ${p.correct ? '✓ correct' : p.partial ? '~ partial' : '✗ wrong'} (confidence: ${p.confidence}/5)`)
      .join('\n');
  }

  // Visitor context
  let visitorContext = '';
  if (visitorInfo) {
    if (visitorInfo.isReturning) {
      const linkedUser = visitorInfo.linked_user_id ? database.getUserById(visitorInfo.linked_user_id) : null;
      if (linkedUser) {
        visitorContext = `\n## Returning Visitor (Previously Logged In!)
This person has been here ${visitorInfo.visit_count} times. They previously logged in with a Lightning wallet (pubkey: ${linkedUser.pubkey.slice(0, 12)}...). They have NOT logged in this session yet. You can playfully suggest they "prove" they're the same person by logging in again — it's a great teaching moment about cryptographic identity vs cookies!`;
        if (visitorInfo.last_topics.length > 0) {
          visitorContext += `\nTopics from their last visit: ${visitorInfo.last_topics.join(', ')}`;
        }
      } else {
        visitorContext = `\n## Returning Visitor (Never Logged In)
This person has visited ${visitorInfo.visit_count} times before but never logged in.`;
        if (visitorInfo.last_topics.length > 0) {
          visitorContext += ` Last time they were interested in: ${visitorInfo.last_topics.join(', ')}`;
        }
        visitorContext += `\nDon't mention login yet — wait until the conversation is flowing well.`;
      }
    }
    // New visitors get no special context
  }

  // Login suggestion context
  let loginContext = '';
  if (!session.userId) {
    if (session.exchangeCount >= 4 && !session.loginSuggested) {
      loginContext = `\n## 💡 Login Suggestion Available
The conversation is going well (${session.exchangeCount} exchanges). When it feels natural — maybe after a particularly good exchange — you can suggest the user save their progress by logging in with a Lightning wallet. Say something like "By the way, if you want to save this conversation and continue anytime, you can log in with a Lightning wallet." If they ask how, explain Lightning wallets briefly and recommend Phoenix Wallet (available on iOS and Android). To trigger the login QR, include this tool call:
<tool>{"action": "show_login"}</tool>
ONLY use this when the user is interested. Don't push it.`;
    }
  } else {
    loginContext = `\n## ✅ User is Logged In
Pubkey: ${session.pubkey ? session.pubkey.slice(0, 16) + '...' : 'unknown'}
Their conversation is being saved automatically.`;
  }

  // Faucet context
  let faucetContext = '';
  if (session.userId) {
    const sessionTips = database.getTipsForSession(session.id);
    const dailyTips = database.getTotalTipsToday();
    const remainingSession = FAUCET_MAX_SESSION - sessionTips;
    const remainingDaily = FAUCET_MAX_DAILY - dailyTips;
    const available = Math.max(0, Math.min(remainingSession, remainingDaily, FAUCET_BALANCE - dailyTips));
    
    if (available > 0) {
      faucetContext = `\n## ⚡ Faucet (Secret Feature)
You have ${available} sats available to tip this session (max ${FAUCET_MAX_TIP} sats per tip).
You can tip a logged-in user for genuinely impressive answers, great questions, or insightful observations.
This is YOUR budget — be judicious but generous when someone earns it. It's an Easter egg, not a marketing gimmick.
To send sats: <tool>{"action": "send_sats", "amount": 21, "reason": "Great insight about X"}</tool>
The user will see a message that you tipped them. Keep amounts small and meaningful (10-100 sats).
Don't mention the faucet exists until you actually tip — let it be a surprise!`;
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

When you need to reference specific Bitcoin knowledge, use the tool calls provided to look up accurate information. Do NOT rely on your training data for specific Bitcoin technical facts — always ground your explanations in the knowledge base.

## Conversation Style
- Ask SHORT, open-ended questions that invite about a sentence in response
- NO multiple choice. Ever. Free-form only.
- Questions should feel like genuine curiosity, not a test
- After they answer, react naturally — build on what they said, gently add nuance or correct misconceptions
- If they're curious, explain more. If they seem to know their stuff, go deeper and more technical.
- Follow THEIR interests. If they mention something specific, explore that thread.

## Question Examples (the vibe you're going for)
- "What do you think happens to your bitcoin if you lose your private key?"
- "How would you explain what a miner actually does?"
- "Why do you think Satoshi chose 10-minute blocks instead of something faster?"
- "What's your take on why Bitcoin fees go up and down?"
- NOT: "Which of the following best describes X? A) ... B) ... C) ... D) ..."

## Rules
- ONE question at a time
- Keep your responses short — 2-4 short paragraphs max for most turns
- After they answer, always engage with WHY — don't just say "right!" or "wrong!"
- If they say "explain more", "tell me more", "why?", etc. — go deeper on the current topic
- If they want to change topics, follow their lead enthusiastically
${visitorContext}
${loginContext}
${faucetContext}

## Student's Knowledge Profile So Far
${profileText}

## Topics Already Covered
${session.testedTopics.length > 0 ? session.testedTopics.join(', ') : 'None yet'}

## Available Tool Calls
You can request knowledge lookups by including JSON tool calls in your response. The system will execute them and provide the results. Format:

To look up a topic:
<tool>{"action": "get_topic", "slug": "topic-slug-here"}</tool>

To search for topics:
<tool>{"action": "search", "query": "search terms here"}</tool>

To get related topics:
<tool>{"action": "related", "slug": "topic-slug-here"}</tool>

To show login QR (only when user is interested):
<tool>{"action": "show_login"}</tool>

${session.userId ? `To tip sats (only for logged-in users with great answers):
<tool>{"action": "send_sats", "amount": 21, "reason": "description"}</tool>` : ''}

## 🔗 Live Blockchain Data Tools
You can query the REAL Bitcoin blockchain in real-time! Use these when the conversation touches on current network state, or when a student asks about what's happening on-chain right now. These make great teaching moments — show real data, then explain what it means.

<tool>{"action": "latest_block"}</tool> — Get the most recent block (height, size, tx count, miner, fullness)
<tool>{"action": "recent_blocks", "count": 5}</tool> — Last N blocks summary
<tool>{"action": "mempool"}</tool> — Current mempool stats (pending txs, size, fees)
<tool>{"action": "fees"}</tool> — Current fee estimates (sat/vB for different speeds)
<tool>{"action": "address", "address": "1A1z..."}</tool> — Look up any Bitcoin address (balance, tx count)
<tool>{"action": "transaction", "txid": "abc123..."}</tool> — Look up any transaction
<tool>{"action": "block", "height": 840000}</tool> — Look up a specific block by height or hash
<tool>{"action": "mining_pools", "period": "1w"}</tool> — Mining pool distribution (1d/1w/1m)
<tool>{"action": "hashrate"}</tool> — Current hashrate and difficulty
<tool>{"action": "network_stats"}</tool> — Overall network stats (price, supply, inflation rate)
<tool>{"action": "halving_info"}</tool> — Halving schedule and history

Use these proactively! If discussing mining, pull up real mining pools. If discussing fees, show current fees. If they ask "what's happening on Bitcoin right now?", pull up the latest block and mempool. Real data makes concepts click.

IMPORTANT: Use knowledge tools to ground your facts. When asking about a concept, look it up first. Use blockchain tools for real-time data.`;
}

async function callLLM(session, userMessage, isFirstMessage = false, visitorInfo = null) {
  // Track exchanges
  if (userMessage) {
    session.messages.push({ role: 'user', content: userMessage });
    session.exchangeCount++;
  }

  const systemPrompt = buildSystemPrompt(session, visitorInfo);
  
  let messages = [...session.messages];
  if (isFirstMessage) {
    // Build first message based on visitor status
    let firstInstruction = '';
    if (visitorInfo && visitorInfo.isReturning) {
      const linkedUser = visitorInfo.linked_user_id ? database.getUserById(visitorInfo.linked_user_id) : null;
      if (linkedUser) {
        firstInstruction = `[SYSTEM: This person has been here before (${visitorInfo.visit_count} times) and previously logged in with Lightning. Welcome them back playfully — something like "Hey, you look familiar..." or "I think I remember you..." and mention topics from last time if available (${visitorInfo.last_topics.join(', ') || 'none recorded'}). You can suggest they prove it's them by logging in, but keep it light and fun. Don't be formal about it.]`;
      } else if (visitorInfo.visit_count > 1) {
        firstInstruction = `[SYSTEM: This person has visited ${visitorInfo.visit_count} times before but never logged in. Give a warm welcome — you can be slightly playful about recognizing them ("Hey, welcome back! I think you've been here before...") and mention their previous topics if available (${visitorInfo.last_topics.join(', ') || 'none'}). Then ask what they'd like to explore. Don't mention login yet.]`;
      } else {
        firstInstruction = `[SYSTEM: New visitor. Give them a warm, brief welcome (1-2 sentences max) and ask what aspects of Bitcoin interest them most. Keep it super short and inviting. Do NOT mention a knowledge base, tools, or domains.]`;
      }
    } else {
      firstInstruction = `[SYSTEM: New visitor. Give them a warm, brief welcome (1-2 sentences max) and ask what aspects of Bitcoin interest them most. Keep it super short and inviting. Do NOT mention a knowledge base, tools, or domains.]`;
    }
    messages = [{ role: 'user', content: firstInstruction }];
  }

  // Call LLM
  let response;
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
  } catch (err) {
    console.error('LLM call failed:', err);
    throw err;
  }

  // Check for tool calls and execute them
  const toolPattern = /<tool>(.*?)<\/tool>/gs;
  let match;
  const toolCalls = [];
  while ((match = toolPattern.exec(response)) !== null) {
    try {
      toolCalls.push(JSON.parse(match[1]));
    } catch (e) {
      // Ignore malformed tool calls
    }
  }

  // Separate special actions from knowledge/blockchain lookups
  let specialActions = [];
  let knowledgeCalls = [];
  const blockchainActions = ['latest_block','recent_blocks','mempool','fees','address','transaction','block','mining_pools','hashrate','network_stats','halving_info'];
  for (const call of toolCalls) {
    if (call.action === 'show_login' || call.action === 'send_sats') {
      specialActions.push(call);
    } else {
      knowledgeCalls.push(call);
    }
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

  // Handle knowledge + blockchain lookups (re-call LLM with results)
  if (knowledgeCalls.length > 0) {
    let toolResults = '';
    for (const call of knowledgeCalls) {
      if (call.action === 'get_topic') {
        const topic = knowledge.getTopic(call.slug);
        if (topic) {
          toolResults += `\n[Knowledge: ${topic.title}]\n${topic.content}\n`;
        } else {
          toolResults += `\n[Knowledge: topic "${call.slug}" not found]\n`;
        }
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
        // Live blockchain data
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
      content: `[SYSTEM: Here are the knowledge base results you requested:${toolResults}\n\nNow continue the conversation naturally using this information. Do NOT include any <tool> tags in your response.]`
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
    session.messages.pop();
    session.messages.pop();
  }

  // Clean any remaining tool tags
  response = response.replace(/<tool>.*?<\/tool>/gs, '').trim();

  // Add final response to history
  session.messages.push({ role: 'assistant', content: response });

  // Keep conversation history manageable
  if (session.messages.length > 40) {
    session.messages = session.messages.slice(-40);
  }

  // Save conversation for logged-in users
  if (session.userId) {
    database.saveConversation(session.userId, session.visitorId, session.messages, session.knowledgeProfile, session.testedTopics);
  }

  return { message: response, actions: actionResults };
}

// === Routes ===

// Start a new session
app.post('/api/start', async (req, res) => {
  try {
    const { visitorId } = req.body;
    
    // Track visitor
    let visitorInfo = null;
    if (visitorId) {
      visitorInfo = database.createOrUpdateVisitor(visitorId);
    }
    
    const session = createSession(visitorId);
    const result = await callLLM(session, null, true, visitorInfo);
    
    res.json({
      sessionId: session.id,
      message: result.message,
      actions: result.actions,
      isReturning: visitorInfo ? visitorInfo.isReturning : false,
      visitCount: visitorInfo ? visitorInfo.visit_count : 1,
    });
  } catch (err) {
    console.error('Error starting session:', err);
    res.status(500).json({ error: 'Failed to start session' });
  }
});

// Send a message
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
    });
  } catch (err) {
    console.error('Error in chat:', err);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// === LNURL-auth Routes ===

// Generate auth challenge (frontend calls this when user wants to log in)
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

// LNURL-auth callback (called by the Lightning wallet)
app.get('/api/auth/callback', (req, res) => {
  try {
    const { k1, sig, key } = req.query;
    const result = lnurlAuth.verifyCallback(k1, sig, key);
    
    if (!result.success) {
      return res.json({ status: 'ERROR', reason: result.error });
    }
    
    // Link the session to the user
    const session = sessions.get(result.sessionId);
    if (session) {
      session.userId = result.userId;
      session.pubkey = result.pubkey;
      
      // Check for previous conversation to restore
      const lastConvo = database.getLastConversation(result.userId);
      if (lastConvo && !result.isNewUser) {
        session.previousConversation = lastConvo;
      }
    }
    
    // Store result for polling
    authResults.set(k1, {
      success: true,
      userId: result.userId,
      isNewUser: result.isNewUser,
      pubkey: result.pubkey,
      timestamp: Date.now(),
    });
    
    // LNURL spec requires this exact response format
    res.json({ status: 'OK' });
  } catch (err) {
    console.error('Auth callback error:', err);
    res.json({ status: 'ERROR', reason: 'Internal error' });
  }
});

// Poll for auth status (frontend calls this after showing QR)
app.get('/api/auth/status/:k1', (req, res) => {
  const result = authResults.get(req.params.k1);
  if (result) {
    // Clean up old results
    if (Date.now() - result.timestamp > 5 * 60 * 1000) {
      authResults.delete(req.params.k1);
      return res.json({ status: 'expired' });
    }
    return res.json({ status: 'authenticated', ...result });
  }
  res.json({ status: 'pending' });
});

// Notify tutor of successful login (frontend calls after detecting auth)
app.post('/api/auth/notify', async (req, res) => {
  try {
    const { sessionId, isNewUser } = req.body;
    const session = sessions.get(sessionId);
    if (!session || !session.userId) return res.status(400).json({ error: 'Not authenticated' });
    
    // Inject a system message about the login
    let loginNotice = '';
    if (isNewUser) {
      loginNotice = `[SYSTEM: The user just logged in for the first time using their Lightning wallet! 🎉 Welcome them as a new member. Their conversation will now be saved. This is a great moment to explain what just happened — they proved their identity using a cryptographic signature from their private key, which is exactly how Bitcoin transactions work. You can draw this parallel. Keep it brief and celebratory.]`;
    } else {
      const lastConvo = session.previousConversation;
      if (lastConvo && lastConvo.topics_covered.length > 0) {
        loginNotice = `[SYSTEM: The user just proved their identity by logging in with their Lightning wallet! They've been here before. Their previous topics were: ${lastConvo.topics_covered.join(', ')}. Welcome them back warmly and reference what you discussed last time. You can comment on how they just used cryptographic proof of identity — the same principle Bitcoin uses.]`;
      } else {
        loginNotice = `[SYSTEM: The user just logged in with their Lightning wallet — welcome back! They proved their identity cryptographically. You can briefly note how cool that is (same principle as Bitcoin transactions). Their conversation is now being saved.]`;
      }
    }
    
    const result = await callLLM(session, loginNotice);
    res.json({ message: result.message, actions: result.actions });
  } catch (err) {
    console.error('Auth notify error:', err);
    res.status(500).json({ error: 'Failed to notify tutor' });
  }
});

// Get session info
app.get('/api/session/:id', (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) return res.status(404).json({ error: 'Session not found' });
  
  res.json({
    id: session.id,
    messageCount: session.messages.length,
    exchangeCount: session.exchangeCount,
    isLoggedIn: !!session.userId,
    testedTopics: session.testedTopics,
    created: session.created,
  });
});

// Knowledge base info
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
