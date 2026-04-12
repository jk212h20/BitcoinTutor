---
title: "Bitcoin Wiki Schema"
type: schema
updated: 2026-04-11
---

# Bitcoin Wiki Schema

This wiki is maintained by the Orange Rabbit 🐇 and curated by its admin. It follows Andrej Karpathy's LLM Wiki pattern: raw sources are ingested once, compiled into interlinked wiki pages, and kept current — not re-derived on every query.

## Structure

```
knowledge/
├── sources/              # Layer 1: Raw (immutable)
│   ├── mastering-bitcoin/  # 14 chapters + glossary + whitepaper
│   └── optech/             # 130+ Bitcoin Optech topic pages
├── wiki/                 # Layer 2: Rabbit-maintained wiki
│   ├── schema.md           # This file — conventions
│   ├── overview.md         # High-level Bitcoin synthesis
│   ├── index.md            # Content catalog
│   ├── log.md              # Chronological operations log
│   ├── concepts/           # Core Bitcoin concepts
│   ├── entities/           # Protocols, software, people, organizations
│   ├── sources/            # One summary per ingested source
│   └── queries/            # Filed valuable query results
└── topics/               # Legacy processed topics (backward compat)
```

## Page Conventions

Every wiki page uses YAML frontmatter:

```yaml
---
title: "Page Title"
type: concept | entity | source | query | overview
tags: [tag1, tag2]
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: [sources/mastering-bitcoin-ch06.md, sources/optech-taproot.md]
related: [concepts/schnorr-signatures.md, entities/lightning-network.md]
summary: "One-line summary for the index"
---
```

- Start every page with a 1-2 sentence summary paragraph
- Use `[[wikilinks]]` style cross-references: `[[concepts/taproot]]`, `[[entities/lightning-network]]`
- Cite sources with links: `[Mastering Bitcoin Ch.6](../sources/mastering-bitcoin-ch06.md)`
- Keep pages focused — one concept or entity per page
- Difficulty ratings: 1 (beginner) to 5 (expert)

## Page Types

### Concepts
Core Bitcoin ideas: proof-of-work, UTXO model, Schnorr signatures, fee estimation, etc. Each concept page should explain what it is, why it matters, how it works, and link to related concepts and entities.

### Entities  
Named things: Lightning Network, Bitcoin Core, Satoshi Nakamoto, Taproot, BIP-340, mempool.space, etc. Entity pages describe what the thing is, its history, current status, and connections.

### Sources
One summary page per ingested raw source. Links back to the raw file, lists key takeaways, and cross-references wiki pages that were created or updated from this source.

### Queries
Valuable synthesis from conversations — comparisons, analyses, connections discovered during Q&A. These compound the wiki's knowledge beyond what's in raw sources.

## Operations

### Ingest (admin-approved)
When new sources are added, the Rabbit proposes wiki edits:
1. Read the source
2. Propose: summary page in sources/, new/updated concept pages, new/updated entity pages
3. Each proposal is a diff — admin reviews and approves/rejects
4. Approved edits are written to the wiki

### Query
When answering questions, the Rabbit:
1. Searches the wiki index for relevant pages
2. Reads those pages for synthesized knowledge
3. Falls back to raw topics if wiki coverage is thin
4. If the answer produces valuable synthesis, proposes filing it as a query page

### Lint
Periodic health checks looking for:
- Concepts mentioned but lacking their own page
- Pages with no inbound links (orphans)
- Stale claims contradicted by newer sources
- Missing cross-references
- Coverage gaps worth investigating

## Edit Flow

**The Rabbit NEVER writes directly to the wiki.** All changes go through a review queue:

1. Rabbit proposes an edit (create page, update page, delete page)
2. Proposal stored in DB with full content + diff
3. Admin reviews in the admin panel — sees the diff, context, and rationale
4. Admin approves → page written to wiki, log updated
5. Admin rejects → proposal discarded, optionally with feedback

This ensures quality and prevents hallucinated knowledge from entering the wiki.

## Cross-Reference Conventions

- Link to concepts: `[[concepts/proof-of-work]]`
- Link to entities: `[[entities/lightning-network]]`
- Link to sources: `[[sources/mastering-bitcoin-ch06]]`
- When mentioning a concept that has a wiki page, always link it
- Related pages listed in frontmatter `related:` field
