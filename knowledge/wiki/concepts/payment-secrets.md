---
title: "Payment secrets"
type: concept
tags: [lightning, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/multipath-payments.md", "concepts/payment-probes.md", "concepts/peer-storage.md"]
summary: "Payment secrets are extra data added to BOLT11 invoices that spenders include in their BOLT4 onion-encrypted payments"
difficulty: 2
domain: lightning
---

Payment secrets are extra data added to BOLT11 invoices that spenders include in their BOLT4 onion-encrypted payments.  This allows the receiver to only accept a payment from the intended spender, preventing a probing attack against the receiver when simplified multipath payments are being used.



  This topic description is a stub.  We would welcome a pull
request
providing more background information about the topic.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
