# Active Context — Bitcoin Quiz

## Current State (2026-04-08)
MVP is working locally. Quiz flow tested end-to-end via API calls:
- Server starts, loads 157 topics, picks random first question
- LLM generates welcome + multiple choice question
- User answers → LLM evaluates, explains, adapts difficulty, asks next question
- Tool call system works (LLM can look up topics from knowledge base)

## Key Files
| File | Purpose |
|------|---------|
| `server/index.js` | Express server, LLM integration, session management |
| `server/knowledge.js` | Knowledge base loader and search |
| `public/index.html` | Chat UI (dark theme, vanilla JS) |
| `knowledge/topics/index.json` | Master index of 157 topics |
| `knowledge/first-questions.json` | 25 curated starter questions |

## Configuration
- Port: 3456
- Model: `anthropic/claude-sonnet-4` via PPQ.ai gateway
- API key hardcoded in server (move to env var for deploy)

## What's Next
- [ ] Deploy to Railway (set PPQ_API_KEY as env var)
- [ ] Consider using a cheaper model (claude-haiku-4.5) to reduce costs
- [ ] Add streaming responses for better UX
- [ ] Process Mastering Bitcoin chapters into supplementary knowledge
- [ ] Track knowledge profile more formally (currently in session but LLM decides)
- [ ] Visual knowledge map / progress indicator
