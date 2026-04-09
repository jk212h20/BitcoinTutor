---
title: "Package relay"
slug: "package-relay"
domain: transactions
difficulty: 3
source: optech
related: ["cpfp", "anchor-outputs", "output-script-descriptors", "pay-to-contract-outputs"]
---

Also covering BIP331

Package relay is a proposed feature for Bitcoin relay nodes that would allow them to send and receive packages of related transactions which would be accepted or rejected based on the feerate of the overall package rather than having each individual transaction in the package accepted or rejected based only on its own feerate.

Without package relay, it’s not possible to effectively CPFP fee bump a transaction that’s below the minimum feerate nodes
accept.  Nodes will reject the parent transaction for its too low
feerate and then ignore the fee-bumping child transaction because the
parent transaction is needed in order to validate the child.  This is
especially problematic because the minimum feerate that a node accepts
depends on the contents of its mempool, so a parent transaction that
could previously be fee bumped might not be bumpable now.
This has significant security implications for LN and other
time-sensitive contract protocols that want to depend on CPFP fee
bumping.

The main obstacle to adding package relay support to the Bitcoin P2P
protocol is ensuring that an implementation of it doesn’t create any
new vectors for denial-of-service attacks.
