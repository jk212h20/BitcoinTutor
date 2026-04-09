---
title: "CPFP carve out"
slug: "cpfp-carve-out"
domain: transactions
difficulty: 2
source: optech
related: ["transaction-pinning", "anchor-outputs", "version-3-transaction-relay", "covenants", "cpfp"]
---

CPFP carve out is a transaction relay policy implemented in Bitcoin Core that allows a single transaction to moderately exceed the node’s maximum package size and depth limits if that transaction only has one unconfirmed ancestor.

This makes it possible for two-party contract protocols (such as the
current LN protocol) to ensure both parties get a chance to use
Child Pays For Parent (CPFP) fee bumping.  The first party can use fee
bumping up to the package limits, but can’t pin the transaction because the second party is able to use CPFP
carve out.
