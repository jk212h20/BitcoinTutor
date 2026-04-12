---
title: "Discreet Log Contracts (DLCs)"
type: concept
tags: [cryptography, difficulty-4]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/adaptor-signatures.md", "concepts/difficulty-adjustment-algorithms.md", "concepts/discrete-log-equivalency.md"]
summary: "Discreet Log Contracts (DLCs) are a contract protocol where two or more parties agree to exchange money dependent on the outcome of a certain event as"
difficulty: 4
domain: cryptography
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

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
