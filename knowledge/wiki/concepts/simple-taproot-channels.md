---
title: "Simple taproot channels"
type: concept
tags: [lightning, difficulty-3]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/htlc.md", "concepts/ptlc.md", "entities/taproot.md", "entities/musig.md", "concepts/silent-payments.md", "entities/simplicity.md"]
summary: "Simple taproot channels are LND funding and commitment transactions that use taproot (P2TR) with support for MuSig2 scriptless multisignature signing "
difficulty: 3
domain: lightning
---

Simple taproot channels are LND funding and commitment transactions that use taproot (P2TR) with support for MuSig2 scriptless multisignature signing when both parties are cooperating. This reduces transaction weight space and improves privacy when channels are closed cooperatively.

The initial experimental deployment of simple taproot channels in LND
continues to exclusively use HTLCs, allowing payments
starting in a taproot channel to continue to be forwarded through other
LN nodes that don’t support taproot channels.  Later upgrades of simple
taproot channels, or alternative approaches, may begin supporting
PTLCs.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
