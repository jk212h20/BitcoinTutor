---
title: "Async payments"
type: concept
tags: [lightning, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/ptlc.md", "entities/ark.md", "concepts/trampoline-payments.md", "concepts/adaptor-signatures.md", "concepts/proof-of-payment.md", "entities/assumeutxo.md", "concepts/atomic-multipath.md"]
summary: "Async payments are payments that are made when the receiver is offline"
difficulty: 2
domain: lightning
---

Async payments are payments that are made when the receiver is offline.  Onchain payments are async but interactive protocols like LN may require cooperation of a third party to enable async payments.

Traditional onchain Bitcoin payments are asynchronous (async) because
the receiver can generate an output script (Bitcoin address) and give
that address to the spender at any time, and then the spender can pay
that address at any time—even when the receiver is offline.
The process of securing that payment (receiving block confirmations)
doesn’t require any action from the receiver.

For LN, the receiver needs to release a secret at the time a payment is
received in order to secure that payment.  This requires that both the
sender and receiver of a payment both be online at the same time.  In
many cases, it’s not a significant problem for a spender to be online
because they’ve initiated the spending process and can trigger actions
to ensure the payment gets sent.  But for some receivers, being online
to receive a payment is more of a challenge.  For example, an LN node
running on a mobile phone may be entirely disconnected from the internet
some of the time and may not have access to the network other times
because the node’s app is running in the background.

A 2021 discussion about improving this user experience led
to several ideas about allowing a forwarding node to hold a payment for
a receiving node until the receiver was known to be online.  The best
described trustless method in that discussion required the use of
PTLCs, which have not yet been added to LN as of the end
of 2022.  An alternative method, which could be
implemented in the existing protocol, involved the use of trampoline
relays.

Async payments are also a key feature of the Ark protocol.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
