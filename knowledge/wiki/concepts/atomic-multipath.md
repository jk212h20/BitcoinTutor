---
title: "Atomic multipath payments (AMPs)"
type: concept
tags: [lightning, difficulty-4]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/multipath-payments.md", "concepts/async-payments.md", "concepts/attributable-failures.md"]
summary: "Atomic Multipath Payments (AMPs), sometimes called Original AMP or OG AMP, allow a spender to pay multiple hashes all derived from the same preimage—a"
difficulty: 4
domain: lightning
---

Atomic Multipath Payments (AMPs), sometimes called Original AMP or OG AMP, allow a spender to pay multiple hashes all derived from the same preimage—a preimage the receiver can only reconstruct if they receive a sufficient number of shares.

Unlike Simplified Multipath Payments (SMP), this only
allows the receiver to accept a payment if they receive all of the
individual parts.  Each share using a different hash adds privacy by
preventing the separate payments from being automatically correlated
with each other by a third party.  The proposal’s downside is that the
spender selects all the preimages, so knowledge of the preimage doesn’t
provide cryptographic proof that they actually paid the receiver.

Both AMP and SMP allow splitting higher value HTLCs into multiple lower
value HTLCs that are more likely to
individually succeed, so a spender with sufficient liquidity can use
almost all of their funds at once no matter how many channels those
funds are split across.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
