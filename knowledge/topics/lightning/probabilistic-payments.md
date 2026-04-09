---
title: "Probabilistic payments"
slug: "probabilistic-payments"
domain: lightning
difficulty: 1
source: optech
related: ["uneconomical-outputs", "trimmed-htlc", "pooled-mining", "proof-of-payment"]
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
