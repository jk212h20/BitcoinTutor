---
title: "Coin selection"
type: concept
tags: [transactions, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["entities/codex32.md", "concepts/coinjoin.md"]
summary: "Coin selection is the method a wallet uses to choose which of its UTXOs to spend in a particular transaction"
difficulty: 2
domain: transactions
---

Coin selection is the method a wallet uses to choose which of its UTXOs to spend in a particular transaction.

Most early Bitcoin wallets implemented relatively simple coin
selection strategies, such as spending UTXOs in the order they were
received (first-in, first-out), but as fees have become more of a
concern, some wallets have switched to more advanced algorithms that
try to minimize transaction size.

Coin selection strategies can also be used to improve onchain privacy
by trying to avoid the use of UTXOs associated with previous
transactions in later unrelated transactions.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
