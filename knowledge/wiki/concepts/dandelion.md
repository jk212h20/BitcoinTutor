---
title: "Dandelion"
type: concept
tags: [network, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/v2-p2p-transport.md", "concepts/transaction-origin-privacy.md", "concepts/anonymity-networks.md", "concepts/cve.md", "concepts/default-minimum-transaction-relay-feerates.md"]
summary: "Also covering BIP156

Dandelion is a privacy-enhancement proposal to allow transactions to first propagate serially from one node to one other node be"
difficulty: 2
domain: network
---

Also covering BIP156

Dandelion is a privacy-enhancement proposal to allow transactions to first propagate serially from one node to one other node before being broadcast from one node to all of its peers.

This propagation behavior would help hide which node originated the
transaction, especially if some of the nodes involved in the initial
serial relay (“stem phase”) encrypted their Bitcoin protocol traffic
using either Tor or something like v2 P2P transport.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
