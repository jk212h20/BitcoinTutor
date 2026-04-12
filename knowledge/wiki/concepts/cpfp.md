---
title: "Child pays for parent (CPFP)"
type: concept
tags: [transactions, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/cpfp-carve-out.md", "concepts/package-relay.md", "concepts/cross-input-signature-aggregation.md"]
summary: "Also covering Ancestor feerate mining

Child Pays For Parent (CPFP) is a fee bumping technique where a user spends an output from a low-feerate unconf"
difficulty: 2
domain: transactions
---

Also covering Ancestor feerate mining

Child Pays For Parent (CPFP) is a fee bumping technique where a user spends an output from a low-feerate unconfirmed transaction in a child transaction with a high feerate in order to encourage miners to include both transactions in a block.

Bitcoin consensus rules require that the transaction which creates an
output must appear earlier in the block chain than the transaction
which spends that outputs—including having the parent transaction
appear earlier in the same block than the child transaction if both
are included in the same block.

This means that an unconfirmed transaction with a high feerate can
incentivize miners to mine any of its ancestor transactions that are
also unconfirmed.  Nodes such as Bitcoin Core that implement such
transaction selection policies for their block templates call this
ancestor feerate mining.  As long as a moderate percentage of miners
implement ancestor feerate mining, wallets can use CPFP as a fee
bumping technique.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
