---
title: "Selfish mining"
type: concept
tags: [mining, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["entities/segregated-witness.md", "concepts/side-channels.md"]
summary: "Selfish mining allows a miner (or cartel of miners) controlling less than a majority of hashrate to keep more block reward per unit of work than the m"
difficulty: 2
domain: mining
---

Selfish mining allows a miner (or cartel of miners) controlling less than a majority of hashrate to keep more block reward per unit of work than the majority of honest miners.  This effectively allows the sub-majority to dictate block inclusion policy, including censoring transactions.

The attack was first publicly described in 2010.  It
later obtained its name selfish mining from a 2013 paper.  In
the form of attack requiring the fewest assumptions, the math shows that a miner with 1/3 of total network hashrate can obtain
marginally more block reward per unit of work than the other 2/3 of
honest miners.  As the selfish miner increases hashrate towards 1/2 of
the network total, their block reward ratio increases.  If they
consistently obtain more than 1/2 of the network total hashrate, they
can prevent other miners from keeping any blocks on the best chain,
allowing them to obtain all block reward and censor any transaction.

There is no known practical solution to selfish mining for Bitcoin,
beyond attempting to ensure no miner or cartel of miners obtains 1/3 or
more of total hashrate.

It is possible for selfish mining to occur accidentally, such as when
several large hashrate miners have low-latency connections to each other
but high-latency connections to the rest of the network.  There were
indications that such accidental selfish mining occasionally occurred in
2015 when significant Bitcoin mining was located in China and that
country’s firewall contributed significant latency to
block propagation.  Mitigating this concern, as
well as addressing other problems, inspired the development of
centralized block relay solutions (such as FIBRE and FALCON) and
decentralized block relay improvements (such as compact block
relay).

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
