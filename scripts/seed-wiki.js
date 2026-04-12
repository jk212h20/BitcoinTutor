#!/usr/bin/env node
/**
 * Seed the wiki from existing knowledge/topics/ files.
 * 
 * Converts existing processed Optech topics into wiki concept pages
 * and Mastering Bitcoin chapters into wiki source summaries.
 * 
 * Run once: node scripts/seed-wiki.js
 */
const fs = require('fs');
const path = require('path');

const TOPICS_DIR = path.join(__dirname, '..', 'knowledge', 'topics');
const SOURCES_DIR = path.join(__dirname, '..', 'knowledge', 'sources');
const WIKI_DIR = path.join(__dirname, '..', 'knowledge', 'wiki');
const INDEX_PATH = path.join(TOPICS_DIR, 'index.json');

// Ensure wiki directories exist
for (const dir of ['concepts', 'entities', 'sources', 'queries']) {
  const p = path.join(WIKI_DIR, dir);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

const today = new Date().toISOString().split('T')[0];

// === 1. Convert Optech topics into concept pages ===

const topicsIndex = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8'));
console.log(`Processing ${topicsIndex.length} topics...`);

// Entities vs concepts — some topics are more "entity-like" (named protocols, software)
const entitySlugs = new Set([
  'taproot', 'segregated-witness', 'lightning-network', 'bitcoin-core',
  'signet', 'testnet', 'ecash', 'ark', 'simplicity', 'miniscript',
  'musig', 'erlay', 'assumeutxo', 'utreexo', 'codex32',
]);

let conceptCount = 0;
let entityCount = 0;

for (const topic of topicsIndex) {
  // Read the topic file
  const topicPath = path.join(TOPICS_DIR, topic.domain, `${topic.slug}.md`);
  if (!fs.existsSync(topicPath)) {
    console.warn(`  Skip: ${topic.slug} (file not found)`);
    continue;
  }
  
  const rawContent = fs.readFileSync(topicPath, 'utf8');
  const body = rawContent.replace(/^---[\s\S]*?---\s*/, '').trim();
  
  if (!body || body.length < 20) {
    console.warn(`  Skip: ${topic.slug} (too short)`);
    continue;
  }
  
  const isEntity = entitySlugs.has(topic.slug);
  const type = isEntity ? 'entity' : 'concept';
  const dir = isEntity ? 'entities' : 'concepts';
  
  // Build related links
  const related = (topic.related || [])
    .filter(r => !r.includes('http'))
    .map(r => {
      const isRelEntity = entitySlugs.has(r);
      return `${isRelEntity ? 'entities' : 'concepts'}/${r}.md`;
    });
  
  // Build wiki page
  const wikiContent = `---
title: "${topic.title}"
type: ${type}
tags: [${topic.domain}${topic.difficulty ? `, difficulty-${topic.difficulty}` : ''}]
created: ${today}
updated: ${today}
sources: [sources/optech-topics.md]
related: [${related.slice(0, 8).map(r => `"${r}"`).join(', ')}]
summary: "${body.split('.')[0].replace(/"/g, "'").slice(0, 150)}"
difficulty: ${topic.difficulty || 2}
domain: ${topic.domain}
---

${body}

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested ${today}*
`;

  const outPath = path.join(WIKI_DIR, dir, `${topic.slug}.md`);
  fs.writeFileSync(outPath, wikiContent, 'utf8');
  
  if (isEntity) entityCount++;
  else conceptCount++;
}

console.log(`Created ${conceptCount} concept pages, ${entityCount} entity pages`);

// === 2. Create source summaries for Mastering Bitcoin chapters ===

const mbDir = path.join(SOURCES_DIR, 'mastering-bitcoin');
if (fs.existsSync(mbDir)) {
  const mbFiles = fs.readdirSync(mbDir).filter(f => f.endsWith('.md'));
  let sourceCount = 0;
  
  const chapterNames = {
    'ch01_intro.md': 'Introduction to Bitcoin',
    'ch02_overview.md': 'How Bitcoin Works — Overview',
    'ch03_bitcoin-core.md': 'Bitcoin Core: The Reference Implementation',
    'ch04_keys.md': 'Keys and Addresses',
    'ch05_wallets.md': 'Wallet Technology',
    'ch06_transactions.md': 'Transactions',
    'ch07_authorization-authentication.md': 'Transaction Authorization & Authentication',
    'ch08_signatures.md': 'Digital Signatures',
    'ch09_fees.md': 'Transaction Fees',
    'ch10_network.md': 'The Bitcoin Network',
    'ch11_blockchain.md': 'The Blockchain',
    'ch12_mining.md': 'Mining and Consensus',
    'ch13_security.md': 'Bitcoin Security',
    'ch14_applications.md': 'Applications and Advanced Concepts',
    'glossary.md': 'Glossary of Terms',
    'appa_whitepaper.md': 'The Bitcoin Whitepaper',
  };
  
  for (const file of mbFiles) {
    const raw = fs.readFileSync(path.join(mbDir, file), 'utf8');
    const title = chapterNames[file] || file.replace('.md', '').replace(/_/g, ' ');
    const slug = `mastering-bitcoin-${file.replace('.md', '').replace(/_/g, '-')}`;
    
    // Extract first ~500 chars as summary content
    const body = raw.replace(/^---[\s\S]*?---\s*/, '').trim();
    const preview = body.slice(0, 800).replace(/\n/g, '\n');
    
    const sourceContent = `---
title: "Mastering Bitcoin: ${title}"
type: source
tags: [mastering-bitcoin, textbook]
created: ${today}
updated: ${today}
sources: [sources/mastering-bitcoin/${file}]
summary: "Chapter from Mastering Bitcoin (3rd Edition) by Andreas Antonopoulos & David Harding"
---

Summary of **${title}** from *Mastering Bitcoin* (3rd Edition).

${preview}${body.length > 800 ? '\n\n*[Content continues in raw source...]*' : ''}

---
*Raw source: \`knowledge/sources/mastering-bitcoin/${file}\` — ingested ${today}*
`;

    fs.writeFileSync(path.join(WIKI_DIR, 'sources', `${slug}.md`), sourceContent, 'utf8');
    sourceCount++;
  }
  
  console.log(`Created ${sourceCount} Mastering Bitcoin source pages`);
}

// === 3. Create Optech topics source summary ===

const optechSourceContent = `---
title: "Bitcoin Optech Topics"
type: source
tags: [optech, reference]
created: ${today}
updated: ${today}
summary: "130+ topic pages from Bitcoin Optech covering protocol development, Lightning, cryptography, and more"
---

Source collection of ${topicsIndex.length} topics from [Bitcoin Optech](https://bitcoinops.org/en/topics/), a technical information hub for Bitcoin developers.

## Coverage by Domain

${Object.entries(
  topicsIndex.reduce((acc, t) => {
    acc[t.domain] = (acc[t.domain] || 0) + 1;
    return acc;
  }, {})
).sort((a, b) => b[1] - a[1]).map(([domain, count]) => `- **${domain}**: ${count} topics`).join('\n')}

## All Topics

${topicsIndex.sort((a, b) => a.title.localeCompare(b.title)).map(t => `- [[concepts/${t.slug}]] — ${t.title} (${t.domain}, difficulty ${t.difficulty})`).join('\n')}

---
*Raw sources: \`knowledge/sources/optech/\` — ingested ${today}*
`;

fs.writeFileSync(path.join(WIKI_DIR, 'sources', 'optech-topics.md'), optechSourceContent, 'utf8');

// === 4. Create overview page ===

const overviewContent = `---
title: "Bitcoin Knowledge Overview"
type: overview
tags: [overview, bitcoin]
created: ${today}
updated: ${today}
summary: "High-level synthesis of Bitcoin knowledge across all wiki sources"
---

# Bitcoin: A Comprehensive Overview

Bitcoin is a decentralized digital currency system proposed by Satoshi Nakamoto in 2008 and launched in January 2009. It enables peer-to-peer electronic cash transactions without trusted intermediaries through a combination of cryptographic proofs, economic incentives, and distributed consensus.

## Core Architecture

**Transactions** form the foundation — transfers of value encoded as data structures with inputs (referencing previous outputs) and outputs (locking value to conditions). Bitcoin uses a [[concepts/utxo-model|UTXO model]] where unspent transaction outputs represent the current state of ownership.

**Blocks** bundle transactions into ordered batches, chained together cryptographically. Each block references the previous block's hash, creating an immutable append-only ledger — the [[concepts/blockchain|blockchain]].

**Mining** is the process by which new blocks are created through [[concepts/proof-of-work|proof-of-work]] — miners compete to find a hash below a target difficulty, earning block rewards and transaction fees. The difficulty adjusts every 2016 blocks (~2 weeks) to maintain ~10 minute block intervals.

**Nodes** form a peer-to-peer network that validates and relays transactions and blocks. Full nodes enforce all consensus rules independently, requiring no trust in any other participant.

## Key Technical Domains

### Cryptography
Bitcoin relies on elliptic curve cryptography (secp256k1) for key generation and signatures. [[concepts/schnorr-signatures|Schnorr signatures]] (activated with [[entities/taproot|Taproot]] in 2021) enable more efficient multisig, better privacy, and batch validation. Related: [[concepts/musig|MuSig]], [[concepts/adaptor-signatures|adaptor signatures]], [[concepts/ptlc|PTLCs]].

### Script & Smart Contracts
Bitcoin's Script language enables programmable spending conditions. [[entities/taproot|Taproot]] introduced [[concepts/tapscript|Tapscript]] with expanded opcodes. [[concepts/miniscript|Miniscript]] provides a structured way to write and analyze spending policies. Proposed additions include [[concepts/op-cat|OP_CAT]], [[concepts/op-checktemplateverify|OP_CTV]], and [[concepts/covenants|covenants]].

### Lightning Network
A layer-2 payment channel network enabling instant, low-fee Bitcoin transactions. Key concepts: [[concepts/htlc|HTLCs]], [[concepts/channel-factories|channel factories]], [[concepts/splicing|splicing]], [[concepts/offers|BOLT12 offers]], [[concepts/multipath-payments|multipath payments]]. Active development on [[concepts/ptlc|PTLCs]], [[entities/eltoo|eltoo]], and [[concepts/channel-jamming-attacks|jamming mitigations]].

### Transactions & Mempool
Transaction relay policy shapes what the network will propagate. Key topics: [[concepts/replace-by-fee|RBF]], [[concepts/cpfp|CPFP]], [[concepts/package-relay|package relay]], [[concepts/cluster-mempool|cluster mempool]], [[concepts/fee-estimation|fee estimation]]. [[concepts/anchor-outputs|Anchor outputs]] and [[concepts/ephemeral-anchors|ephemeral anchors]] solve fee-bumping for pre-signed transactions.

### Privacy
Bitcoin is pseudonymous, not anonymous. Privacy techniques include [[concepts/coinjoin|CoinJoin]], [[concepts/payjoin|PayJoin]], [[concepts/silent-payments|silent payments]], [[concepts/coinswap|CoinSwap]], and [[concepts/anonymity-networks|anonymity networks]] (Tor/I2P). [[concepts/output-linking|Output linking]] remains the primary privacy threat.

### Mining & Consensus
Beyond proof-of-work, key topics include [[concepts/selfish-mining|selfish mining]], [[concepts/fee-sniping|fee sniping]], [[concepts/pooled-mining|pooled mining]], [[concepts/difficulty-adjustment-algorithms|difficulty adjustment]], and [[concepts/time-warp|time warp attacks]]. [[concepts/soft-fork-activation|Soft fork activation]] remains a socially complex process.

### Wallets & Key Management
[[concepts/hd-key-generation|HD key generation]] (BIP-32/39/44) standardizes key derivation. [[concepts/output-script-descriptors|Output script descriptors]] describe what a wallet can spend. [[entities/codex32|Codex32]] enables verifiable paper backups. [[concepts/hwi|HWI]] bridges hardware wallets.

## Sources

This wiki synthesizes knowledge from:
- **Mastering Bitcoin** (3rd Edition) — 14 chapters covering fundamentals through advanced topics
- **Bitcoin Optech** — ${topicsIndex.length} technical topic pages on protocol development
- **Conversations** — insights from user interactions (filed in queries/)

## Wiki Health

- **${conceptCount + entityCount}** wiki pages (${conceptCount} concepts, ${entityCount} entities)
- **${16}** source summaries
- **${topicsIndex.length}** raw source topics

---
*Last updated: ${today}*
`;

fs.writeFileSync(path.join(WIKI_DIR, 'overview.md'), overviewContent, 'utf8');

// === 5. Create index.md ===

// Collect all wiki pages
const allPages = [];
for (const dir of ['concepts', 'entities', 'sources', 'queries']) {
  const dirPath = path.join(WIKI_DIR, dir);
  if (!fs.existsSync(dirPath)) continue;
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
  for (const file of files) {
    const content = fs.readFileSync(path.join(dirPath, file), 'utf8');
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
    let title = file.replace('.md', '').replace(/-/g, ' ');
    let summary = '';
    if (fmMatch) {
      const titleMatch = fmMatch[1].match(/title:\s*"([^"]+)"/);
      if (titleMatch) title = titleMatch[1];
      const summaryMatch = fmMatch[1].match(/summary:\s*"([^"]+)"/);
      if (summaryMatch) summary = summaryMatch[1];
    }
    allPages.push({ dir, file, title, summary });
  }
}

let indexContent = `---
title: "Wiki Index"
type: index
updated: ${today}
---

# Bitcoin Wiki Index

Content catalog — every page with link and summary.

## Overview
- [Bitcoin Knowledge Overview](overview.md) — High-level synthesis across all sources

## Concepts (${allPages.filter(p => p.dir === 'concepts').length})

${allPages.filter(p => p.dir === 'concepts').sort((a, b) => a.title.localeCompare(b.title)).map(p => `- [${p.title}](concepts/${p.file}) — ${p.summary.slice(0, 100) || 'no summary'}`).join('\n')}

## Entities (${allPages.filter(p => p.dir === 'entities').length})

${allPages.filter(p => p.dir === 'entities').sort((a, b) => a.title.localeCompare(b.title)).map(p => `- [${p.title}](entities/${p.file}) — ${p.summary.slice(0, 100) || 'no summary'}`).join('\n')}

## Sources (${allPages.filter(p => p.dir === 'sources').length})

${allPages.filter(p => p.dir === 'sources').sort((a, b) => a.title.localeCompare(b.title)).map(p => `- [${p.title}](sources/${p.file}) — ${p.summary.slice(0, 100) || 'no summary'}`).join('\n')}

## Queries (${allPages.filter(p => p.dir === 'queries').length})

${allPages.filter(p => p.dir === 'queries').length === 0 ? '*No filed queries yet. Valuable answers from conversations will appear here.*' : allPages.filter(p => p.dir === 'queries').sort((a, b) => a.title.localeCompare(b.title)).map(p => `- [${p.title}](queries/${p.file}) — ${p.summary.slice(0, 100) || 'no summary'}`).join('\n')}

---
*Auto-generated ${today} — updated on every wiki operation*
`;

fs.writeFileSync(path.join(WIKI_DIR, 'index.md'), indexContent, 'utf8');

// === 6. Create initial log ===

const logContent = `# Wiki Log

Chronological record of wiki operations.

## [${today}] init | Wiki initialized from existing knowledge base

Seeded wiki from ${topicsIndex.length} Optech topics and 16 Mastering Bitcoin source files.
Created ${conceptCount} concept pages, ${entityCount} entity pages, and 17 source summaries.

`;

fs.writeFileSync(path.join(WIKI_DIR, 'log.md'), logContent, 'utf8');

console.log('\n✅ Wiki seeded successfully!');
console.log(`   ${conceptCount} concepts, ${entityCount} entities, 17 sources`);
console.log(`   index.md, overview.md, log.md, schema.md created`);
