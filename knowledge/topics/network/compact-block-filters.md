---
title: "Compact block filters"
slug: "compact-block-filters"
domain: network
difficulty: 2
source: optech
related: ["transaction-bloom-filtering", "coinswap", "compact-block-relay"]
---

Also covering BIP157, BIP158, and Neutrino protocol

Compact block filters are a condensed representation of the contents of a block that allow wallets to determine whether the block contains any transactions involving the user’s keys.

A full node uses BIP158 to create a Golomb-Rice Coded Set (GCS) of the
data from each block in the block chain. The GCSs (called filters) are then
distributed to wallets (such as via the P2P protocol as described in
BIP157), allowing them to search for any matches to their scripts.  If a
match is found, the wallet can then download the corresponding block to access
any relevant transactions.

The GCS mechanism guarantees that a wallet following the protocol will find
any transactions matching its scripts, but it may also find some
false-positive matches for which it will need to download and scan
the block despite the block not containing any transactions relevant
to the wallet.

The BIP157/158 protocol is sometimes incorrectly called “Neutrino” after the
wallet library developed to use the protocol.  It’s one of several
methods that lightweight clients can use to acquire data about their
wallet transactions.  Compared to BIP37 bloom filters, it offers
more privacy against spy nodes and less risk of attack against
honest nodes.  Compared to address-indexed servers (such as
Electrum-style servers), it also provides more privacy and requires
less server storage and CPU.  However, the BIP157/158 does consume
significantly more bandwidth in the normal case than either of those
other protocols.
