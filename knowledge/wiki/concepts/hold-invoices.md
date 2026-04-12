---
title: "Hold invoices"
type: concept
tags: [lightning, difficulty-1]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/channel-jamming-attacks.md", "concepts/hd-key-generation.md", "concepts/htlc-endorsement.md"]
summary: "Hold invoices are LN invoices where the receiver doesn’t immediately release the preimage upon receiving a payment"
difficulty: 1
domain: lightning
---

Hold invoices are LN invoices where the receiver doesn’t immediately release the preimage upon receiving a payment.  Instead, the receiver performs some action and then either accepts the payment, explicitly rejects it, or lets it time out.

For example, Alice could automatically generate hold invoices on her
website but wait until a customer actually paid before searching her
inventory for the requested item.  This would give her a chance to
cancel the payment if she couldn’t deliver.

Hold invoices are sometimes spelled “hodl invoices.”

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
