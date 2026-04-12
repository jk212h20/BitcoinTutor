---
title: "Zero-conf channels"
type: concept
tags: [lightning, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/jit-channels.md", "concepts/x-only-public-keys.md", "concepts/acc.md"]
summary: "Zero-conf channels, also called turbo channels, are new single-funded channels where the funder gives some or all of their initial funds to the accept"
difficulty: 2
domain: lightning
---

Zero-conf channels, also called turbo channels, are new single-funded channels where the funder gives some or all of their initial funds to the acceptor. Those funds are not secure until the channel open transaction receives a sufficient number of confirmations, so there’s no risk to the acceptor spending some of those funds back through the funder using the standard LN protocol.

For example, Alice has several BTC in an account at Bob’s custodial
exchange.  Alice asks Bob to open a new channel paying her 1.0 BTC.
Because Bob trusts himself not to double-spend the channel he just
opened, he can allow Alice to send 0.1 BTC through his node to
third-party Carol even before the channel open transaction has received
a single confirmation.



Zero-conf channels were in use via various ad hoc mechanisms prior to a
standardized mechanisim for them being added to the LN protocol in 2022.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
