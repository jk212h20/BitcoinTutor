---
title: "Version 3 transaction relay"
type: concept
tags: [transactions, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/replace-by-fee.md", "concepts/package-relay.md", "concepts/transaction-pinning.md", "concepts/cpfp-carve-out.md", "concepts/ephemeral-anchors.md", "concepts/vaults.md", "concepts/wallet-labels.md"]
summary: "Also covering Topologically Restricted Until Confirmation (TRUC)

Version 3 transaction relay is a proposal to allow transactions to opt-in to a modif"
difficulty: 2
domain: transactions
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

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
