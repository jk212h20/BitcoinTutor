# Active Context — Bitcoin Tutor

## Current State (2026-04-09)
Evolved from "Bitcoin Quiz" to "Bitcoin Tutor" with full user system:
- Adaptive Socratic tutor running on Sonnet 4.6 via PPQ.ai
- 157 Bitcoin topics across 9 domains as knowledge base
- SQLite persistence (sql.js) for visitors, users, conversations, faucet
- LNURL-auth login (secp256k1 sig verification, bech32 encoding)
- Visitor fingerprinting via localStorage UUID — tutor recognizes returning visitors
- AI-powered faucet: tutor can tip sats to logged-in users (easter egg)
- Login is hidden — tutor suggests it naturally after ~4+ exchanges

## Key Files
| File | Purpose |
|------|---------|
| `server/index.js` | Express server, LLM integration, session management, auth routes, faucet |
| `server/database.js` | sql.js SQLite: visitors, users, conversations, auth_challenges, faucet_tips |
| `server/lnurl-auth.js` | LNURL-auth challenge generation + secp256k1 verification |
| `server/knowledge.js` | Knowledge base loader and search |
| `public/index.html` | Chat UI (dark theme, vanilla JS, QR display, auth polling) |
| `knowledge/topics/index.json` | Master index of 157 topics |
| `knowledge/first-questions.json` | 25 curated starter questions |

## Architecture
- **Visitor tracking**: localStorage UUID sent on `/api/start`, server tracks visits + topics
- **Soft recognition**: Returning visitors get playful "hey, you look familiar" greeting
- **Previously logged-in visitors**: Tutor suggests they "prove" identity — teaching moment about crypto identity vs cookies
- **Login flow**: Tutor calls `show_login` tool → frontend gets LNURL challenge → QR in chat → polls `/api/auth/status/:k1` → wallet scans → verified → tutor acknowledges
- **Faucet**: Tutor has `send_sats` tool, sees balance in system prompt, tips for great answers (max 100/tip, 500/session, 5000/day)
- **Conversation persistence**: Messages + knowledge profile saved to DB for logged-in users

## Deployment
- **Production URL**: https://bitcointutor-production.up.railway.app
- **GitHub**: https://github.com/jk212h20/BitcoinTutor
- **Railway project**: `e9592122-148a-471a-8fe2-593ee23d4d5b`
- **Railway service**: `f370ab8c-e7a1-491e-bc54-c77f522b13d5`
- **Env vars on Railway**: BASE_URL, PPQ_API_KEY, PORT (3456), MODEL

## Configuration
- Port: 3456
- Model: `claude-sonnet-4.6` via PPQ.ai gateway
- DB: `data/tutor.db` (SQLite via sql.js) — needs Railway volume at `/data` for persistence
- Faucet: 21,000 sats balance, configurable via env vars

## Live Blockchain Tools (added 2026-04-09)
- `server/blockchain.js` — 11 tools querying mempool.space + Blockchair APIs
- Tools: latest_block, recent_blocks, mempool, fees, address, transaction, block, mining_pools, hashrate, network_stats, halving_info
- Smart caching (30s-5min TTL) to avoid hammering APIs
- Tutor uses these proactively when discussing real-time Bitcoin state

## What's Next
- [ ] Mount volume for `/data` on Railway (DB resets on redeploy without it)
- [ ] Add actual Lightning payment for faucet tips (currently just DB tracking)
- [ ] Process Mastering Bitcoin chapters into supplementary knowledge
- [ ] Track knowledge profile more formally
- [ ] Add streaming responses for better UX
