---
title: "Payment probes"
type: concept
tags: [lightning, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/jit-routing.md", "concepts/channel-jamming-attacks.md", "concepts/payment-batching.md", "concepts/payment-secrets.md"]
summary: "Also covering Probing

Payment probes are packets designed to discover information about the LN channels they travel through, such as whether the chan"
difficulty: 2
domain: lightning
---

Also covering Probing

Payment probes are packets designed to discover information about the LN channels they travel through, such as whether the channel can currently handle a payment of a certain size or how many bitcoins are allocated to each participant in the channel.  Probes use the regular payment (HTLC) mechanism but are designed to always fail, preventing any funds from being transfered.  Probing can be useful, but it can also reduce user privacy.



  This topic description is a stub.  We would welcome a pull
request
providing more background information about the topic.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
