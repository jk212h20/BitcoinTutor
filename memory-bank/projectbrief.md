# Bitcoin Quiz — Project Brief

## What
An adaptive Socratic Bitcoin tutor that quizzes users on Bitcoin knowledge, explains concepts, and dynamically adjusts difficulty based on demonstrated understanding.

## Architecture
- **Backend**: Node.js + Express (server/index.js)
- **Frontend**: Vanilla HTML/CSS/JS chat UI (public/index.html)  
- **Knowledge Base**: 157 Bitcoin Optech topics across 9 domains, stored as markdown files
- **LLM**: PPQ.ai gateway → Claude Sonnet 4 (anthropic/claude-sonnet-4)
- **No database** — in-memory sessions, no auth

## How It Works
1. User starts a quiz → server picks a random starter question from 25 curated first-questions
2. LLM acts as tutor: asks questions, evaluates free-text or multiple-choice answers, explains concepts
3. System prompt gives LLM access to "tool calls" (`<tool>` tags) that retrieve knowledge from the local knowledge base
4. If LLM uses tools, server executes the lookup and re-calls LLM with the results injected
5. Conversation adapts: correct answers → harder topics, wrong answers → explanations and prerequisites

## Knowledge Base Structure
- `knowledge/topics/index.json` — master index of all 157 topics
- `knowledge/topics/{domain}/{slug}.md` — individual topic files with frontmatter
- `knowledge/first-questions.json` — 25 curated starter questions with answers and misconceptions
- Domains: cryptography (22), script (13), transactions (42), network (18), lightning (40), mining (8), consensus (7), wallets (5), privacy (2)
- Source: Bitcoin Optech topic pages (scraped and processed)

## URLs
- Local: http://localhost:3456
- Production: TBD (Railway deployment pending)
