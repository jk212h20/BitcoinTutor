---
title: "CPFP carve out"
type: concept
tags: [transactions, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/transaction-pinning.md", "concepts/anchor-outputs.md", "concepts/version-3-transaction-relay.md", "concepts/covenants.md", "concepts/cpfp.md"]
summary: "CPFP carve out is a transaction relay policy implemented in Bitcoin Core that allows a single transaction to moderately exceed the node’s maximum pack"
difficulty: 2
domain: transactions
---

CPFP carve out is a transaction relay policy implemented in Bitcoin Core that allows a single transaction to moderately exceed the node’s maximum package size and depth limits if that transaction only has one unconfirmed ancestor.

This makes it possible for two-party contract protocols (such as the
current LN protocol) to ensure both parties get a chance to use
Child Pays For Parent (CPFP) fee bumping.  The first party can use fee
bumping up to the package limits, but can’t pin the transaction because the second party is able to use CPFP
carve out.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
