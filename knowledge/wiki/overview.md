---
title: "Bitcoin Knowledge Overview"
type: overview
tags: [overview, bitcoin]
created: 2026-04-12
updated: 2026-04-12
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
- **Bitcoin Optech** — 157 technical topic pages on protocol development
- **Conversations** — insights from user interactions (filed in queries/)

## Wiki Health

- **157** wiki pages (144 concepts, 13 entities)
- **16** source summaries
- **157** raw source topics

---
*Last updated: 2026-04-12*
