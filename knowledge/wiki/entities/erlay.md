---
title: "Erlay"
type: entity
tags: [network, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/minisketch.md", "concepts/ephemeral-anchors.md", "concepts/exfiltration-resistant-signing.md"]
summary: "Erlay is proposal to improve the bandwidth efficiency of relaying unconfirmed transactions between Bitcoin full nodes"
difficulty: 2
domain: network
---

Erlay is proposal to improve the bandwidth efficiency of relaying unconfirmed transactions between Bitcoin full nodes.

In the currently-used Bitcoin gossip protocol, most full nodes are
configured to advertise every new transaction to all of their peers
unless they’ve previously received an advertisement about the
transaction from that peer.  At a minimum of 32 bytes per
advertised txid and nodes having a default maximum of 125 peers, this
consumes a large amount of redundant bandwidth given that each node
only needs to learn about a transaction from one of its peers.

Erlay is a two-part proposal that first limits the number of peers to
which a node will directly advertise transactions (default: 8) and,
second, uses set reconciliation based on libminisketch with the
remainder of its peers to avoid sending the txid of any transactions
that the receiving peer has already seen.

Erlay scales to larger numbers of peers much better than the current
protocol, making it practical for nodes to accept more connections
than they do now.  This would improve the robustness of the relay
network against both accidental and deliberate network partitions.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
