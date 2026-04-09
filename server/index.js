/**
 * Bitcoin Quiz Server
 * Adaptive Socratic Bitcoin tutor powered by LLM + structured knowledge base
 */
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const knowledge = require('./knowledge');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Config
const PORT = process.env.PORT || 3456;
const PPQ_API_KEY = process.env.PPQ_API_KEY || 'sk-sOIHBImdCmUYVIXsBnsXBN';
const PPQ_BASE_URL = process.env.PPQ_BASE_URL || 'https://api.ppq.ai/v1';
const MODEL = process.env.MODEL || 'anthropic/claude-sonnet-4';

// Load knowledge base
knowledge.loadKnowledge();

// Load first questions
const firstQuestions = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'knowledge', 'first-questions.json'), 'utf8')
);

// In-memory sessions (no auth, no persistence)
const sessions = new Map();

function createSession() {
  const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
  const firstQ = firstQuestions[Math.floor(Math.random() * firstQuestions.length)];
  
  // Load the topic content for the first question
  const topicContent = knowledge.getTopic(firstQ.topic_slug);
  
  const session = {
    id,
    messages: [],  // conversation history for LLM
    testedTopics: [],  // slugs of topics we've asked about
    knowledgeProfile: {},  // slug -> { correct, partial, wrong, confidence }
    currentTopic: firstQ.topic_slug,
    firstQuestion: firstQ,
    created: Date.now(),
  };
  
  sessions.set(id, session);
  return session;
}

function buildSystemPrompt(session) {
  // Build compact knowledge profile
  let profileText = 'No topics tested yet.';
  if (Object.keys(session.knowledgeProfile).length > 0) {
    profileText = Object.entries(session.knowledgeProfile)
      .map(([slug, p]) => `- ${slug}: ${p.correct ? '✓ correct' : p.partial ? '~ partial' : '✗ wrong'} (confidence: ${p.confidence}/5)`)
      .join('\n');
  }

  return `You are a friendly, knowledgeable Bitcoin tutor running an adaptive conversation. Your goal is to help the user deepen their Bitcoin understanding through Socratic dialogue — asking thoughtful questions, exploring what they know, explaining concepts, and naturally adapting to their level.

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

## Flow
1. Start by learning what they're interested in or what they already know
2. Ask a question that connects to their interest — something that invites a sentence or two
3. React to their answer: acknowledge what's right, gently explore what's off, add a cool detail
4. Ask a natural follow-up that goes slightly deeper, or pivot to something related
5. If they want more explanation at any point, give it — but keep it digestible

## Rules
- ONE question at a time
- Keep your responses short — 2-4 short paragraphs max for most turns
- After they answer, always engage with WHY — don't just say "right!" or "wrong!"
- If they say "explain more", "tell me more", "why?", etc. — go deeper on the current topic
- If they want to change topics, follow their lead enthusiastically

## Student's Knowledge Profile So Far
${profileText}

## Topics Already Covered
${session.testedTopics.length > 0 ? session.testedTopics.join(', ') : 'None yet'}

## Available Tool Calls
You can request knowledge lookups by including JSON tool calls in your response. The system will execute them and provide the results. Format:

To look up a topic before asking about it or explaining it:
<tool>{"action": "get_topic", "slug": "topic-slug-here"}</tool>

To search for topics related to what the user is asking about:
<tool>{"action": "search", "query": "search terms here"}</tool>

To get related topics for follow-up questions:
<tool>{"action": "related", "slug": "topic-slug-here"}</tool>

IMPORTANT: You should use these tools to ground your knowledge. When asking a question about a specific concept, look it up first so your question and explanation are accurate.`;
}

async function callLLM(session, userMessage, isFirstMessage = false) {
  // Add user message to history
  if (userMessage) {
    session.messages.push({ role: 'user', content: userMessage });
  }

  const systemPrompt = buildSystemPrompt(session);
  
  // For the first message, inject the first question context
  let messages = [...session.messages];
  if (isFirstMessage) {
    messages = [
      {
        role: 'user',
        content: `[SYSTEM: The student just arrived. Give them a warm, brief welcome (1-2 sentences max) and ask what aspects of Bitcoin interest them most, or what they'd like to explore. Keep it super short and inviting — don't list domains or be overly formal. Something like asking what drew them to Bitcoin, or what they're most curious about. Do NOT mention a knowledge base, tools, or domains. Just be a friendly person starting a conversation.]`
      }
    ];
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

  // Check for tool calls in the response and execute them
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

  if (toolCalls.length > 0) {
    // Execute tool calls and inject results
    let toolResults = '';
    for (const call of toolCalls) {
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
      }
    }

    // Re-call LLM with tool results injected
    // Strip tool calls from the original response
    const cleanResponse = response.replace(toolPattern, '').trim();
    
    // Add the assistant's attempt and tool results, then ask for a clean response
    session.messages.push({ 
      role: 'assistant', 
      content: cleanResponse || 'Let me look that up...'
    });
    session.messages.push({
      role: 'user',
      content: `[SYSTEM: Here are the knowledge base results you requested:${toolResults}\n\nNow continue the conversation naturally using this information. Do NOT include any <tool> tags in your response — you already have the information you need.]`
    });

    // Second LLM call with the knowledge injected
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

    if (!res2.ok) {
      throw new Error(`LLM API error on tool follow-up: ${res2.status}`);
    }

    const data2 = await res2.json();
    response = data2.choices[0].message.content;
    
    // Remove the system messages from history (keep it clean)
    session.messages.pop(); // Remove tool results message
    session.messages.pop(); // Remove partial assistant message
  }

  // Clean any remaining tool tags from response
  response = response.replace(/<tool>.*?<\/tool>/gs, '').trim();

  // Add final response to history
  session.messages.push({ role: 'assistant', content: response });

  // Keep conversation history manageable (last 30 messages)
  if (session.messages.length > 30) {
    session.messages = session.messages.slice(-30);
  }

  return response;
}

// === Routes ===

// Start a new quiz session
app.post('/api/start', async (req, res) => {
  try {
    const session = createSession();
    const response = await callLLM(session, null, true);
    
    res.json({
      sessionId: session.id,
      message: response,
    });
  } catch (err) {
    console.error('Error starting session:', err);
    res.status(500).json({ error: 'Failed to start quiz session' });
  }
});

// Send a message in an existing session
app.post('/api/chat', async (req, res) => {
  try {
    const { sessionId, message } = req.body;
    
    if (!sessionId || !message) {
      return res.status(400).json({ error: 'sessionId and message required' });
    }
    
    const session = sessions.get(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found. Start a new quiz.' });
    }
    
    const response = await callLLM(session, message);
    
    res.json({
      message: response,
    });
  } catch (err) {
    console.error('Error in chat:', err);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// Get session info (for debugging/status)
app.get('/api/session/:id', (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }
  
  res.json({
    id: session.id,
    messageCount: session.messages.length,
    testedTopics: session.testedTopics,
    knowledgeProfile: session.knowledgeProfile,
    created: session.created,
  });
});

// Knowledge base info (for debugging)
app.get('/api/knowledge/domains', (req, res) => {
  res.json(knowledge.getDomains());
});

app.get('/api/knowledge/search', (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'q parameter required' });
  res.json(knowledge.searchTopics(q));
});

// Start server
app.listen(PORT, () => {
  console.log(`Bitcoin Quiz server running on http://localhost:${PORT}`);
  console.log(`Model: ${MODEL}`);
  console.log(`Knowledge base: ${knowledge.getDomains().reduce((sum, d) => sum + d.count, 0)} topics`);
});
