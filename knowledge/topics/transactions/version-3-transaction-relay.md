---
title: "Version 3 transaction relay"
slug: "version-3-transaction-relay"
domain: transactions
difficulty: 2
source: optech
related: ["replace-by-fee", "package-relay", "transaction-pinning", "cpfp-carve-out", "ephemeral-anchors", "vaults", "wallet-labels"]
---

Also covering Topologically Restricted Until Confirmation (TRUC)

Version 3 transaction relay is a proposal to allow transactions to opt-in to a modified set of transaction relay policies designed to prevent pinning attacks. Combined with package relay, these policies help enable the use of dynamic feerates with LN onchain transactions.

V3 transaction relay is a superset of standard transaction policy.
That is, v3 transactions follow all rules for standard transactions
(e.g. minimum and maximum transaction weights) while also adding some
additional rules designed to allow transaction replacement
while precluding transaction-pinning attacks. v3 transactions also
require minor changes to the package RBF policy in order to maintain
incentive compatibility with miners.

V3 transaction relay solves rule 3 transaction pinning
and may allow the removal of the CPFP carve-out.

Version 3 transactions are used by ephemeral anchors.
