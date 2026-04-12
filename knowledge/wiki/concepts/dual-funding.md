---
title: "Dual funding"
type: concept
tags: [lightning, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/coinjoin.md", "concepts/payjoin.md", "concepts/liquidity-advertisements.md", "concepts/psbt.md", "concepts/submarine-swaps.md", "concepts/splicing.md", "concepts/discrete-log-equivalency.md", "concepts/duplex-micropayment-channels.md"]
summary: "Also covering Interactive funding protocol

Dual funding is creating a payment channel for LN where both parties can contribute funds"
difficulty: 2
domain: lightning
---

Also covering Interactive funding protocol

Dual funding is creating a payment channel for LN where both parties can contribute funds.  The underlying protocol, called the version 2 channel establishment protocol, may also be used for negotiated opening of single-funded channels, but its motivating purpose is providing support for dual funding.

Early analysis of LN determined that it would be
significantly easier to build software where the user requesting to
open the payment channel contributed all funds to that channel and
paid all of its onchain fees, called single funded channels.  This
prevented attackers from freely or cheaply opening new channels,
locking up their counterparty’s funds, and then making those victims
pay onchain fees to get their money back.

For spenders, single funded channels work great.  As soon as a channel
finishes opening, the user can start spending their funds with all of
the speed, efficiency, and privacy benefits of LN.  But receivers who
open a new single funded channel can’t use it to receive funds until
they’ve spent funds.  This creates problems for merchants who want to
accept payments over LN but who aren’t yet in a position to pay an
equal amount of their costs over LN.

One solution to this problem is to allow channels to be dual funded,
immediately allowing spending in either direction once the channel
opens.  Dual funded channels don’t need to start with the same amount
of funding on both sides, so a merchant who wants to be able to
receive a significant amount of bitcoins may only need to contribute a
small part of the total channel capacity.

The dual funded protocol may also be used to open new single-funded
channels.  This may have advantages when the participating parties
want to use the protocol’s ability to communicate node preferences and
find mutually acceptable values for various channel parameters.

After dual funding is available, it may be used in combination with
new proposed node announcements that
could help buyers and sellers of inbound capacity find each other in a
decentralized fashion.

Dual funding does require each party reveal ownership of one of their
UTXOs to the other party.  Like other protocols where this is
required (such as coinjoin and payjoin), this can be abused by an attacker to learn information
about who owns which UTXO.  Several approaches to
limiting this problem have been discussed.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
