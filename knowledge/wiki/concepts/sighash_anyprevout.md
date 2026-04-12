---
title: "SIGHASH_ANYPREVOUT"
type: concept
tags: [cryptography, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/eltoo.md", "concepts/covenants.md", "concepts/sidechains.md", "concepts/signer-delegation.md"]
summary: "Also covering SIGHASH_NOINPUT

SIGHASH_ANYPREVOUT, an updated version of SIGHASH_NOINPUT, is a proposal for a signature hash (sighash) where the ident"
difficulty: 2
domain: cryptography
---

Also covering SIGHASH_NOINPUT

SIGHASH_ANYPREVOUT, an updated version of SIGHASH_NOINPUT, is a proposal for a signature hash (sighash) where the identifier for the UTXO being spent is not signed, allowing the signature to be used with any UTXO that’s protected by a similar script (i.e. uses the same public keys).

A noinput-style sighash is necessary for the proposed eltoo
layer for LN.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
