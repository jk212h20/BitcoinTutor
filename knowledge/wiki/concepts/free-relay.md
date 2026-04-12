---
title: "Free relay"
type: concept
tags: [network, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/replace-by-fee.md", "concepts/fee-sponsorship.md", "concepts/gap-limits.md"]
summary: "Free relay was a policy on early Bitcoin full nodes to allow some unconfirmed transactions to be relayed even if they didn’t pay transaction fees"
difficulty: 2
domain: network
---

Free relay was a policy on early Bitcoin full nodes to allow some unconfirmed transactions to be relayed even if they didn’t pay transaction fees.  That policy allowed an attacker to waste the bandwidth of full nodes without paying any cost, so modern full nodes generally try to forbid operations which don’t allow miners to claim fees that are proportionate to the amount of relay bandwidth used.

Relaying full nodes relay unconfirmed transactions between each other,
consuming the bandwidth of both the sending and receiving nodes.  For
example, if there are 50,000 nodes on the P2P network, every byte of an
unconfirmed transaction is expected to consume a minimum of 50,000 bytes
of network-wide data (twice that if you count outbound and inbound data
separately).  If full nodes simply relay anything that looks like a
transaction, it would be easy for an attacker to send data to a single
node and cause the rest of the network to consume about 50,000 times as
much data.

Bitcoin Core and most other relaying full node implementations attempt
to prevent this by only relaying unconfirmed transactions if miners can
immediately include those transactions in a block and earn at least 1
sat in fees for every 1 vbyte of relayed data.  This also applies to
replacements of unconfirmed transactions: they typically
must pay at least 1 sat/vbyte more in fees than the transactions they
replace (in addition to following other rules).

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
