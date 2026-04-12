---
title: "Addr v2"
type: concept
tags: [network, difficulty-1]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/anonymity-networks.md", "concepts/adaptor-signatures.md", "concepts/anchor-outputs.md"]
summary: "addr v2 is a proposed new version of the addr message in the Bitcoin P2P network protocol, which is used to advertise the addresses of nodes that acce"
difficulty: 1
domain: network
---

addr v2 is a proposed new version of the addr message in the Bitcoin P2P network protocol, which is used to advertise the addresses of nodes that accept incoming connections.

The original addr message allows relaying 128-bit IPv6 addresses
with backwards compatibility for IPv4 and onioncat-encoded version
2 (v2) Tor hidden service (.onion) addresses.  However, v3 Tor hidden
service addresses are 256 bits in size, as are addresses for several
other privacy-enhancing network protocols.  Since those newer address
types can’t be used with the existing addr message, a new version of
the message has been proposed.  Additionally, the update may allow
tweaking other aspects of the message or the behavior of nodes and
clients that process it.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
