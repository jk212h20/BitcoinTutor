---
title: "Atomic multipath payments (AMPs)"
slug: "atomic-multipath"
domain: lightning
difficulty: 4
source: optech
related: ["multipath-payments", "async-payments", "attributable-failures"]
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
