# Active Context — Bitcoin Tutor

## Current State (2026-04-09)
Deployed and live at https://bitcointutor-production.up.railway.app

## Architecture
- **Frontend**: Single `public/index.html` — vanilla HTML/CSS/JS chat UI
- **Backend**: Node.js + Express (`server/index.js`)
- **DB**: SQLite via sql.js, persisted at `DATABASE_PATH` (Railway volume at `/data/tutor.db`)
- **LLM**: PPQ.ai gateway → Claude Sonnet 4.6 (configurable via `MODEL` env var)
- **Auth**: LNURL-auth (`server/lnurl-auth.js`) — Lightning wallet login
- **Knowledge**: 157 topics across 9 domains, scraped from Mastering Bitcoin + Bitcoin Optech

## Key Features
| Feature | Status | Notes |
|---------|--------|-------|
| Adaptive Socratic chat | ✅ | LLM with knowledge base tools |
| LNURL-auth login | ✅ | QR code, wallet scan, cryptographic proof |
| Visitor tracking | ✅ | localStorage UUID, visit count, returning user detection |
| AI faucet | ✅ | Tutor tips sats for great answers (21k budget) |
| **Real Lightning payouts** | ✅ | LNURL-withdraw via Voltage LND node — users claim earned sats |
| Live blockchain tools | ✅ | mempool.space API — blocks, fees, mining, addresses |
| **User notes** | ✅ | LLM writes observations (interests, gaps, style, etc.) — persists across sessions |
| **Conversation continuity** | ✅ | Last 20 messages from previous session injected into system prompt |
| **Token tracking** | ✅ | Cumulative prompt/completion/total per session, shown in UI |
| **Model display** | ✅ | Discreet monospace bar showing model name + token count |
| **One-time prompts** | ✅ | Configurable suggestions that disappear after delivery — saves tokens, avoids repetition |
| **Recall hints** | ✅ | Keyword-triggered reminders for delivered prompts — LLM remembers what it told the user |

## Key Files
| File | Purpose |
|------|---------|
| `server/index.js` | Main server — routes, LLM calls, system prompt, tool handling |
| `server/database.js` | SQLite via sql.js — visitors, users, conversations, faucet, user notes |
| `server/knowledge.js` | Knowledge base loader + search |
| `server/lnurl-auth.js` | LNURL-auth challenge/verify |
| `server/blockchain.js` | mempool.space API wrapper |
| `server/lightning.js` | LND REST client for Voltage node (payInvoice, isConfigured) |
| `knowledge/prompts.json` | One-time prompt definitions with recall hints + keywords |
| `public/index.html` | Chat UI with auth polling, model info display |
| `knowledge/topics/` | Pre-processed topic JSON files by domain |

## DB Schema (key tables)
- **users**: id, pubkey, display_name, **notes** (JSON — interests, strengths, gaps, style, memorable, last_topic), created_at, last_login, sats_received
- **visitors**: visitor_id, visit_count, last_topics, linked_user_id
- **conversations**: id, user_id, visitor_id, messages (JSON), created_at, updated_at
- **faucet_tips**: id, user_id, session_id, amount, reason

## LLM Tool Calls
The LLM can use `<tool>{...}</tool>` tags for:
- `get_topic`, `search`, `related` — knowledge base lookups
- `latest_block`, `mempool`, `fees`, `hashrate`, etc. — live blockchain data
- `show_login` — trigger LNURL-auth QR
- `send_sats` — tip logged-in users
- `update_notes` — persist observations about students (merged incrementally)

## Recent Changes (2026-04-09)
- **Real Lightning payouts**: LNURL-withdraw flow (LND REST → Voltage node). Users earn virtual sats via faucet, then claim them by scanning a QR with their Lightning wallet. Server pays the invoice in background.
- **One-time prompts with recall**: `knowledge/prompts.json` defines prompts with `recall_hint` + `keywords`. After delivery, if user mentions related keywords, the hint is re-injected so LLM remembers what it said.
- **Balance indicator**: Header shows "⚡ N sats — Claim" button when user has earned sats
- User notes system, conversation continuity, token tracking, model display (all from earlier today)
- Fixed quadruple auth notify race condition, session expiry auto-resend

## Deployment
- **Railway project**: e9592122-148a-471a-8fe2-593ee23d4d5b
- **Service**: f370ab8c-e7a1-491e-bc54-c77f522b13d5
- **Domain**: bitcointutor-production.up.railway.app
- **Volume**: mounted at /data for SQLite persistence
- **GitHub**: https://github.com/jk212h20/BitcoinTutor.git (master branch)

## Env Vars (Railway)
- `PPQ_API_KEY`, `PPQ_BASE_URL`, `MODEL`, `BASE_URL`, `DATABASE_PATH=/data/tutor.db`
- `PORT=3456`, `FAUCET_BALANCE`, `FAUCET_MAX_TIP`, `FAUCET_MAX_SESSION`, `FAUCET_MAX_DAILY`
- `LND_REST_URL` (Voltage node: predictions.m.voltageapp.io:8080), `LND_MACAROON`
