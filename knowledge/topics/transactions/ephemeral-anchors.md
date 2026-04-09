---
title: "Ephemeral anchors"
slug: "ephemeral-anchors"
domain: transactions
difficulty: 3
source: optech
related: ["version-3-transaction-relay", "package-relay", "fee-sponsorship", "anchor-outputs", "cpfp-carve-out", "eltoo", "erlay"]
---

Also covering Pay-to-Anchor (P2A) and Ephemeral dust

Ephemeral anchors are a proposal to allow some transactions to be relayed even if they don’t pay any transaction fee, provided they’re relayed as part of a package containing a child transaction which pays a fee sufficient for the entire package.

The proposal is built on top of the v3 transaction relay proposal.  A v3 transaction containing as little as
zero fee that has a zero-value output paying OP_TRUE as the entire script
would be accepted when included in a relay package with a fee-paying child.

This allows anyone on the network to use
that output as the input to a child transaction.  This allows anyone to
create the fee-paying child, even if they don’t receive any of the other
outputs from the parent transaction.  This allows ephemeral anchors to
function as fee sponsorship but without
requiring any consensus changes.

Ephemeral anchors is envisioned to be used with contract protocols such
as LN where transactions are signed by the contract participants a long
time before they are broadcast, preventing the participants from
determining an appropriate feerate to use.  Instead, any participant (or
several acting together) can use the ephemeral anchor output as the
input to a child transaction which adds fees at the time the transaction
is broadcast.  This is similar to the anchor outputs added to LN in 2021-22, based on the CPFP carve out relay rule.
