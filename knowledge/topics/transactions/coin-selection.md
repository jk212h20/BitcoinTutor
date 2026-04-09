---
title: "Coin selection"
slug: "coin-selection"
domain: transactions
difficulty: 2
source: optech
related: ["codex32", "coinjoin"]
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
