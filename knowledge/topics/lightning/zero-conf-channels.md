---
title: "Zero-conf channels"
slug: "zero-conf-channels"
domain: lightning
difficulty: 2
source: optech
related: ["jit-channels", "x-only-public-keys", "acc"]
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
