---
title: "Probabilistic payments"
type: concept
tags: [lightning, difficulty-1]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/uneconomical-outputs.md", "concepts/trimmed-htlc.md", "concepts/pooled-mining.md", "concepts/proof-of-payment.md"]
summary: "Probabilistic payments are outputs that allow a pseudorandom function to decide which of n parties will be able to spend the funds"
difficulty: 1
domain: lightning
---

Probabilistic payments are outputs that allow a pseudorandom function to decide which of n parties will be able to spend the funds.

For example, Alice and Bob each deposit 1 BTC into a contract that pays
one of them the full amount based on the result of a cryptographically fair
coin flip.

A particular focus of attention for probabilistic payments in Bitcoin is
for trustless micropayments.  For example, Alice wants to pay Bob 1 sat,
but that would be uneconomical because it
will cost several hundred sats for Alice to create the payment and for
Bob to later spend it.  Instead, Alice offers Bob 10,000 sats with a
0.01% probability.  On average, that’s equivalent to him receiving 1
sat.

Probabilistic micropayments have been proposed as an alternative for
trimmed HTLCs.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
