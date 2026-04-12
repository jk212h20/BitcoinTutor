---
title: "Joinpools"
type: concept
tags: [transactions, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/coinjoin.md", "concepts/channel-factories.md", "concepts/covenants.md", "concepts/jit-routing.md", "concepts/kindred-replace-by-fee.md"]
summary: "Also covering Payment pools and Coinpools

Joinpools are a construction that allows multiple users to trustlessly share ownership of one or more UTXOs"
difficulty: 2
domain: transactions
---

Also covering Payment pools and Coinpools

Joinpools are a construction that allows multiple users to trustlessly share ownership of one or more UTXOs.  When funds are spent, it’s not possible to tell from the block chain which pool member (or members) spent the funds.  Joinpools can use presigned transactions or proposed protocol features to ensure each member can unilaterally withdraw their funds from the pool at any time.



  This topic description is a stub.  We would welcome a pull
request
providing more background information about the topic.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
