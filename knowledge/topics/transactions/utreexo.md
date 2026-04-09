---
title: "Utreexo"
slug: "utreexo"
domain: transactions
difficulty: 2
source: optech
related: ["uneconomical-outputs", "v2-p2p-transport"]
---

Utreexo is a proposed alternative to the UTXO set for allowing full nodes to obtain and verify information about the UTXOs being spent in a transaction.

A merkle tree updated after every block accumulates references to
every unspent transaction output, allowing nodes to skip storing the
outputs themselves.  New transactions can be distributed with the
UTXOs they spend and a merkle branch proving they’re part of the
utreexo merkle tree.  Overall, this can decrease the amount of storage
full nodes need to a minimal amount at the cost of modest increases in
bandwidth.  Utreexo would not change Bitcoin’s security model.
