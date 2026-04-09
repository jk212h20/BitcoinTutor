---
title: "Anchor outputs"
slug: "anchor-outputs"
domain: transactions
difficulty: 3
source: optech
related: ["cpfp", "cpfp-carve-out", "package-relay", "ephemeral-anchors", "addr-v2", "annex"]
---

Also covering Simplified commitments

Anchor outputs are special outputs in LN commitment transactions that are designed to allow the transaction to be fee bumped.  An earlier name for the proposal was simplified commitments.

Each time the balance changes in an LN channel, a commitment
transaction is created and signed by the participating parties.  The
transaction is only broadcast if one party decides to
unilaterally close the channel (e.g. because the other party has
become unresponsive).  Because the broadcast of the commitment
transaction may occur a long time after it was created, the commitment
transaction may pay too much or too little in transaction fees.
Paying a too-low feerate may prevent the commitment transaction from
confirming before any timelocks contained within it expire, allowing
funds to be stolen.

The solution to this is for the commitment transaction to pay a
minimal amount of fees and then to allow either channel participant to fee
bump the transaction.  Early designs to accomplish this using Replace-by-Fee
(RBF) fee bumping ran into problems with transaction
pinning.  Later designs used
Child Pays For Parent (CPFP) fee bumping and came to
depend on CPFP carve-out to circumvent the
pinning problem.

As of this writing, the most recent versions of the design add two
outputs to the commitment transaction—one for each LN party—and
require all other outputs in the commitment transaction to have their
scripts encumbered by a 1 OP_CHECKSEQUENCEVERIFY (CSV) condition
that prevents them from being spent for at least one block.

To be fully effective, the protocol also depends on Bitcoin full nodes
implementing package relay so that there’s a
way to CPFP fee bump commitment transactions even if their feerates
are below a node’s minimum relay fee.  But until package relay is
available, it’s possible for LN nodes to just pay a somewhat higher
feerate on their commitment transactions to ensure that they’ll be
accepted by nodes.
