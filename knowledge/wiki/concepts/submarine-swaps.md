---
title: "Submarine swaps"
type: concept
tags: [lightning, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/splicing.md", "concepts/static-channel-backups.md", "concepts/swap-in-potentiam.md"]
summary: "Submarine swaps are trust-minimized atomic swaps of offchain bitcoins for onchain bitcoins"
difficulty: 2
domain: lightning
---

Submarine swaps are trust-minimized atomic swaps of offchain bitcoins for onchain bitcoins.  A payment secured by an HTLC is routed over LN to a service provider who creates an onchain output paying the same HTLC.  The onchain receiver can settle the HTLC to claim its funds, allowing the LN HTLCs to be settled like normal.



  This topic description is a stub.  We would welcome a pull
request
providing more background information about the topic.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
