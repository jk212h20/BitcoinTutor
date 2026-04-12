---
title: "Large channels"
type: concept
tags: [lightning, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/multipath-payments.md", "concepts/kindred-replace-by-fee.md", "concepts/liquidity-advertisements.md"]
summary: "Large channels are LN payment channels where both peers send the parameter option_support_large_channel and which can be funded with a balance over 0"
difficulty: 2
domain: lightning
---

Large channels are LN payment channels where both peers send the parameter option_support_large_channel and which can be funded with a balance over 0.16777216 BTC.

During the early development of LN, developers agreed to temporarily limit the maximum size of channels to less than
224 base units (0.16777216 BTC; about $40 at the time) and
individual payments to 232 msat (0.04294967296 BTC; about
$10 at the time).  The goal was to limit the amount any individual
early adopter would lose due to bugs in the software:


  I guarantee that early releases of lightning clients will have
bugs and people will lose money because of them. […] I sleep
better at night knowing that, if you lose money because of my bug, I
can buy you a beer/coffee in exchange for your story and we’re about
even. —LN developer Rusty Russell (emphasis in original)


After several years of LN development, the 2018 LN specification
meeting decided to allow implementations to opt-in to wumbo
(jumbo) channel sizes with no protocol-level amount limit, although
implementations and users can still refuse to accept channels over
a customizable size.  Support for this new feature, later named
option_support_large_channel saw widespread implementation among LN
software in 2020.

The limit of approximately 0.04 BTC per payment still remains part of
the LN protocol specification, but multipath payments allow splitting a payment amount above the limit
into several smaller parts that are each below the limit, making it
possible for any compatible software to optionally send or receive
payments above the limit.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
