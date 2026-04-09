---
title: "Countersign"
slug: "countersign"
domain: network
difficulty: 1
source: optech
related: ["consensus-cleanup-soft-fork", "covenants"]
---

Countersign is the idea for a protocol that will allow a client and server who have each other’s public keys to negotiate authentication without either participant revealing any identifying information to third parties.

This would make it easier to securely set up whitelisted nodes across
the Internet for miners or exchanges, or to allow lightweight wallets
to ensure they connect to trusted nodes.  By enabling authentication
without revealing identity to third parties, nodes on anonymity
networks (such as Tor) or nodes that simply changed IP addresses
couldn’t have their network identity tracked.

The protocol should be compatible with the version 2 P2P transport
protocol.
