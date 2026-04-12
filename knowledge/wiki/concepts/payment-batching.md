---
title: "Payment batching"
type: concept
tags: [transactions, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/op_checktemplateverify.md", "concepts/payjoin.md", "concepts/payment-probes.md"]
summary: "Also covering Batching

Payment batching is the technique of including multiple payments in the same onchain transaction"
difficulty: 2
domain: transactions
---

Also covering Batching

Payment batching is the technique of including multiple payments in the same onchain transaction.  This splits the cost of creating a transaction, spending inputs, and creating a change output across all the payments in the transaction, reducing the average cost per payment.

It’s realistically possible to save 75% on transaction fees by
batching just a small number of payments and with no degradation in
confirmation speed or other changes required.  Even using exactly the
same inputs you’d use without batching, it’s possible to save more
than 20%.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
