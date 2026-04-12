---
title: "Just-In-Time (JIT) channels"
type: concept
tags: [lightning, difficulty-3]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/jit-routing.md", "concepts/inbound-forwarding-fees.md"]
summary: "JIT channels are virtual LN channels hosted by a service provider"
difficulty: 3
domain: lightning
---

JIT channels are virtual LN channels hosted by a service provider. When the first payment to the channel is received, the service provider creates a funding transaction and adds the payment to it, creating a normal channel.  This allows new user to begin receiving funds over LN immediately.

JIT channels should not be confused with JIT routing, which is a technique for rebalancing existing channels to
allow accepting payments that might naively need to be rejected.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
