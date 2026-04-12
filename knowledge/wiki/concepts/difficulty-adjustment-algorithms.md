---
title: "Difficulty adjustment algorithms"
type: concept
tags: [mining, difficulty-1]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["entities/testnet.md", "concepts/pooled-mining.md", "concepts/time-warp.md", "concepts/default-minimum-transaction-relay-feerates.md", "concepts/discreet-log-contracts.md"]
summary: "Difficulty adjustment algorithms (DAAs) are the methods by which mining difficulty is regulated, which affects the average time between blocks, the to"
difficulty: 1
domain: mining
---

Difficulty adjustment algorithms (DAAs) are the methods by which mining difficulty is regulated, which affects the average time between blocks, the total amount of block space, and the rate of distribution of new bitcoins (the block subsidy).

Bitcoin’s DAA attempts to keep the average time between blocks at
approximately one block every ten minutes.  It uses timestamps contained
within block headers to retarget difficulty every 2,016 blocks.

Bitcoin’s testnets use a slightly different DAA than
Bitcoin.  The alternative DAAs are designed to ensure block production
continues even if there’s a sudden major reduction in hashrate.  This
mechanism can’t be used on Bitcoin itself due to it incentivizing miners
to lie about when they created their blocks; however, for a testnet
where coins have no value, there’s no incentive to lie.

Other cryptocurrencies use different DAAs, and these have sometimes
resulted in severe security vulnerabilities for those systems.
Alternative DAAs for systems that use the same SHA256d PoW function as
Bitcoin have occasionally resulted in that system temporarily overpaying
or underpaying for hashrate, attracting miners away from (or to)
Bitcoin, leading to inconsistent block production in Bitcoin until the
problem is solved.

Alternative DAAs may also be used in Bitcoin-related protocols, such as
decentralized mining pools like Braidpool.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
