---
title: "Uneconomical outputs"
type: concept
tags: [transactions, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/output-linking.md", "concepts/ephemeral-anchors.md", "concepts/unannounced-channels.md", "entities/utreexo.md"]
summary: "Uneconomical outputs are transaction outputs that are worth less than the fees it will cost to spend them"
difficulty: 2
domain: transactions
---

Uneconomical outputs are transaction outputs that are worth less than the fees it will cost to spend them.  To prevent users from creating uneconomical outputs that will increase the size of the UTXO set,  Bitcoin Core and other nodes refuse to relay or mine transactions with outputs below a certain value, called the dust limit.

Terminology note: sometimes dust is used as a synonym for
uneconomical outputs or, more generically, low value outputs.  This
can create confusion, such as in the case of dust attacks which
involve amounts just barely above the dust limit.  Optech
recommends using uneconomical outputs for outputs that
aren’t worth the cost to spend them, reserving the term dust for
references specific to the dust limit.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
