---
title: "Coinswap"
slug: "coinswap"
domain: privacy
difficulty: 2
source: optech
related: ["coinjoin", "payment-batching", "htlc", "ptlc", "submarine-swaps", "compact-block-filters"]
---

Coinswap is a protocol that allows two or more users to create a set of transactions that look like independent payments but which actually swap their coins with each other, optionally making a payment in the process. This improves the privacy of not just the coinswap users but all Bitcoin users, as anything that looks like a payment could have instead been a coinswap.

Coinswaps are often compared to coinjoins.  The most
obvious difference is that a coinjoin uses a single transaction but a
coinswap uses two or more transactions.  Although it’s possible for a
coinjoin to look like payment batching,
they can be fairly easy to identify onchain—and some Bitcoin exchanges
have refused to accept coins with a recent history of coinjoining.
Coinswaps look like payments, so they may be harder to discriminate
against.  Coinswaps may also be performed across different block
chains—often under the name atomic swap—but that’s not possible
with a coinjoin.

To ensure that coinswaps either successfully swap funds or any
unswapped funds are refunded, they need to use a locking mechanism
such as an HTLC or a PTLC.
