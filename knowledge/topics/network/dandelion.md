---
title: "Dandelion"
slug: "dandelion"
domain: network
difficulty: 2
source: optech
related: ["v2-p2p-transport", "transaction-origin-privacy", "anonymity-networks", "cve", "default-minimum-transaction-relay-feerates"]
---

Also covering BIP156

Dandelion is a privacy-enhancement proposal to allow transactions to first propagate serially from one node to one other node before being broadcast from one node to all of its peers.

This propagation behavior would help hide which node originated the
transaction, especially if some of the nodes involved in the initial
serial relay (“stem phase”) encrypted their Bitcoin protocol traffic
using either Tor or something like v2 P2P transport.
