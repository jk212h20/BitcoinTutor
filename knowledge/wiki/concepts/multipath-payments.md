---
title: "Multipath payments"
type: concept
tags: [lightning, difficulty-5]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/atomic-multipath.md", "concepts/htlc.md", "concepts/payment-secrets.md", "concepts/minisketch.md", "concepts/multisignature.md"]
summary: "Also covering Multipart payments, Simplified multipath payments, and Base AMP

Simplified Multipath Payments (SMPs), also called Base AMP, are LN paym"
difficulty: 5
domain: lightning
---

Also covering Multipart payments, Simplified multipath payments, and Base AMP

Simplified Multipath Payments (SMPs), also called Base AMP, are LN payments that are split into two or more parts all sharing the same hash and preimage, and which are sent using a different path for each part.

Although proposed after atomic multipath payments (AMP),
simplified multipath payments required fewer changes to the LN protocol
to implement and preserved the ability for spenders to receive a
cryptographic proof of payment, so they were the first to be deployed on
the production network.

The main downside of simplified multipath payments when using
HTLCs is that third-parties who see multiple payments all
using the same hash can infer that they’re part of a larger true payment.

Both AMP and SMP allow splitting higher value HTLCs into multiple lower
value HTLCs that are more likely to
individually succeed, so a spender with sufficient liquidity can use
almost all of their funds at once no matter how many channels those
funds are split across.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
