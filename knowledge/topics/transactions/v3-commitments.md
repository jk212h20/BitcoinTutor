---
title: "V3 commitments"
slug: "v3-commitments"
domain: transactions
difficulty: 3
source: optech
related: ["htlc", "ln-penalty", "fee-sourcing", "anchor-outputs", "cpfp", "default-minimum-transaction-relay-feerates", "cpfp-carve-out", "cluster-mempool", "version-3-transaction-relay", "package-relay", "ephemeral-anchors", "kindred-replace-by-fee", "uneconomical-outputs", "channel-commitment-upgrades", "v2-p2p-transport", "vaults"]
---

Also covering Zero-fee commitments

V3 commitments are LN commitment transactions made using version 3 transactions adhering to the policies for TRUC, a P2A outputs, ephemeral dust, and sibling replacement.  This allows it to be a zero-fee commitment, as the onchain fee will be paid by a CPFP spend of the ephemeral P2A output.  The commitment transaction and its fee-paying child will be transmitted by package relay.

LN commitment transactions commit to the current state of the channel,
including each party’s settled balance plus any pending HTLCs that conditionally transfer funds between them.  Commitment
transactions usually aren’t published, allowing for offchain balance
updates, but each transaction must be confirmable onchain in case one
party needs to close the channel without the cooperation of the other
party.  For a transaction to be confirmable, it must be both valid and
incentivize miners to include it in a block—which is usually done by
having it pay a transaction fee.

The original LN-Penalty commitment transaction
format used entirely endogenous fees, with the
full fee amount being implicitly allocated in the transaction itself
using normal Bitcoin transaction semantics.  This had the advantage of
being simple and compact, but it was fragile if market pricing for
feerates suddenly spiked—a previously signed valid commitment
transaction might no longer be confirmable in a reasonable amount of
time, which can lead to loss of money.

An updated commitment format called anchor outputs or anchor commitments added two additional outputs to the
commitment transaction to allow either party to CPFP fee
bump it if necessary.  This allowed reducing the commitment transaction
fee to the minimum necessary to get it to relay.  Although this was a
major improvement, it was still fragile if the minimum relay feerate
increased.  Additionally, it depended on CPFP carve-out policy, which is vulnerable to transaction pinning
attacks and may be removed to allow
deployment of cluster mempool.

Since the initial proposals in 2018 for anchor commitments, Bitcoin Core
transaction relay policy and tools have seen significant advances.  V3
commitments build on those improvements:


  
    ● TRUC (v3) transactions significantly
reduce the worst-case pinning vulnerabilities.  Additionally, CPFP
carve-out required that only the two outputs designed for fee bumping
be immediately spendable, forcing all other outputs (such as HTLCs) to
include a 1-block relative locktime (commonly called “1 OP_CSV”).
This prevented using any of the value in those outputs to pay
transaction fees.
  
  
    ● Package relay allows the commitment transaction
to pay zero fee.  This eliminates the fragility of increases in
feerates (or minimum relay feerates) making a previously signed
commitment transaction non-confirmable.  It also allows removing the
update_fee mechanism from the LN protocol, which was a source of
multiple problems, from stuck channels to security
vulnerabilities.
  
  
    ● P2A allows the output intended for fee
bumping to be spendable by either party.  Additionally, P2A uses only
a small amount of onchain space.  Sibling RBF
allows either party to increase the fee bump even if the other party
created the initial fee bump.
  
  
    ● Ephemeral dust allows the P2A output to have a
zero value even though it would otherwise be uneconomic.  This is allowed under the assumption that
spending a small P2A output is the most efficient way to add fees to
the zero-fee commitment transaction using public transaction relay.
