---
title: "Utreexo"
type: entity
tags: [transactions, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/uneconomical-outputs.md", "concepts/v2-p2p-transport.md"]
summary: "Utreexo is a proposed alternative to the UTXO set for allowing full nodes to obtain and verify information about the UTXOs being spent in a transactio"
difficulty: 2
domain: transactions
---

Utreexo is a proposed alternative to the UTXO set for allowing full nodes to obtain and verify information about the UTXOs being spent in a transaction.

A merkle tree updated after every block accumulates references to
every unspent transaction output, allowing nodes to skip storing the
outputs themselves.  New transactions can be distributed with the
UTXOs they spend and a merkle branch proving they’re part of the
utreexo merkle tree.  Overall, this can decrease the amount of storage
full nodes need to a minimal amount at the cost of modest increases in
bandwidth.  Utreexo would not change Bitcoin’s security model.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
