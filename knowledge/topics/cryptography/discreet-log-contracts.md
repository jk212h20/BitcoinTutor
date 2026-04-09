---
title: "Discreet Log Contracts (DLCs)"
slug: "discreet-log-contracts"
domain: cryptography
difficulty: 4
source: optech
related: ["adaptor-signatures", "difficulty-adjustment-algorithms", "discrete-log-equivalency"]
---

Discreet Log Contracts (DLCs) are a contract protocol where two or more parties agree to exchange money dependent on the outcome of a certain event as determined by an oracle (or several oracles). After the event happens, the oracle publishes a commitment to the outcome of the event that the winning party can use to claim their funds. The oracle doesn’t need to know the terms of the contract (or even that a contract was made).

The transactions creating and settling the contract can be made
indistinguishable from many other Bitcoin transactions or they can be
executed within an LN channel. This makes DLCs more private and
efficient than other known oracle-based contract methods.
Additionally, DLCs are arguably more secure than earlier oracle-based
methods because an oracle that commits to a false result
generates clear evidence of fraud.

The original DLC construction was specific to schnorr
signatures.  Later, a version was developed
to use signature adaptors that are
compatible with Bitcoin’s existing ECDSA signature scheme.

Note on spelling: the name is a play on the discrete log
problem, which gives the protocol its security, and DLC’s
enhanced privacy making the contracts more discreet.  The spelling
used by the idea’s original author and the DLC interoperability
specification is discreet log contracts.
