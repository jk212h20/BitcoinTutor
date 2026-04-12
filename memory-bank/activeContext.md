# Active Context — Bitcoin Rabbit Hole

## Current State (2026-04-11)

**Project:** Adaptive Socratic Bitcoin tutor ("Orange Rabbit 🐇") with Lightning auth, faucet tipping, and now a **Rabbit-managed Bitcoin Wiki**.

### Recent Work
- **Wiki system added** (Karpathy LLM Wiki pattern) — commit `f1fe0f5`
  - 174 wiki pages: 144 concepts, 13 entities, 17 source summaries
  - Rabbit has wiki tools: `wiki_search`, `wiki_page`, `wiki_index`, `wiki_propose`
  - Admin review queue for wiki edits (propose → approve/reject flow)
  - Schema at `knowledge/wiki/schema.md`

### Architecture
```
server/
├── index.js          # Express server, LLM integration, all routes
├── database.js       # sql.js SQLite (visitors, users, convos, wiki_edits)
├── wiki.js           # Wiki module (search, read, propose, log)
├── knowledge.js      # Legacy topic lookup (still used as fallback)
├── lnurl-auth.js     # LNURL-auth login
├── lightning.js       # LND integration (tips, withdrawals, donations)
├── blockchain.js      # Mempool.space API integration
knowledge/
├── sources/          # Layer 1: Raw (immutable) — Mastering Bitcoin + Optech
├── wiki/             # Layer 2: Rabbit-maintained wiki (174 pages)
│   ├── concepts/     # 144 Bitcoin concept pages
│   ├── entities/     # 13 entity pages (protocols, software)
│   ├── sources/      # 17 source summaries
│   ├── queries/      # Filed valuable query results (empty, grows over time)
│   ├── schema.md     # Conventions and edit flow
│   ├── overview.md   # Comprehensive Bitcoin synthesis
│   ├── index.md      # Content catalog
│   └── log.md        # Operations log
├── topics/           # Legacy processed topics (backward compat)
public/
├── index.html        # Main chat UI
├── admin.html        # Admin panel
```

### Key Patterns
- **Wiki edit flow:** Rabbit proposes → stored in `wiki_edits` DB table → admin approves/rejects via API → approved edits written to disk
- **Three knowledge layers:** raw sources → wiki (synthesized) → conversations (ephemeral)
- **System prompt** includes wiki stats and wiki tools; instructs Rabbit to prefer wiki over raw topics
- **Admin wiki routes:** `/api/admin/wiki/stats`, `/api/admin/wiki/edits`, approve/reject, browse pages

### What's NOT Built Yet
- Admin UI section for wiki review (API routes exist, but no HTML in admin.html yet)
- Wiki lint/health-check tool (detect orphans, gaps, stale claims)
- Public-facing wiki browser (currently admin-only)
- Wiki page editing in admin UI (currently approve/reject only)

### Tech
- Node.js + Express, sql.js (SQLite), PPQ.ai for LLM
- Port 3456 (local dev)
- LNURL-auth for login, LND for Lightning payments
