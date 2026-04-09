---
title: "HTLC endorsement"
slug: "htlc-endorsement"
domain: lightning
difficulty: 2
source: optech
related: ["channel-jamming-attacks", "hold-invoices", "htlc"]
---

HTLC endorsement is a reputation system proposed for LN.  When a node receives a payment (HTLC) from a channel counterparty for forwarding, that payment may be flagged as endorsed.  If forwarded HTLCs from that counterparty have been profitable in the past, the node may choose to pass on that endorsement when it forwards the HTLC to the next hop.

Nodes opting into this endorsement protocol may give endorsed HTLCs
access to more resources than unendorsed HTLCs.  The two main resources
would be access to a channel’s limited number of HTLC slots (the number
of pending payments the channel can support) and the node’s liquidity (the
amount of capital it has available in the channel).  Both of those
resources are vulnerable to being used without payment (or with
insufficient payment) in a channel jamming attack.

With endorsement, someone executing a channel jamming attack that makes
their counterparties less profitable will not have their HTLCs endorsed.
Honest parties will continue to have their HTLCs endorsed and will be
able to access any HTLC slots and liquidity that is only accessible to
endorsed HTLCs.
