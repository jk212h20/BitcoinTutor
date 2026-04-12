---
title: "Timeout trees"
type: concept
tags: [consensus, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/joinpools.md", "concepts/covenants.md", "entities/ark.md", "concepts/timelocks.md", "concepts/trampoline-payments.md"]
summary: "Timeout trees are a type of trustless contract protocol that produces a tree of offchain transactions that only remain safe against counterparty theft"
difficulty: 2
domain: consensus
---

Timeout trees are a type of trustless contract protocol that produces a tree of offchain transactions that only remain safe against counterparty theft for a limited period of time (i.e., they time out).

Typically, the single transaction at the root of the tree (the funding
transaction) is the only transaction that must be put onchain.  The
leaves of the tree (and any intermediate branches between the root and
the leaves) can be kept offchain as long as all of the involved parties
remain cooperative with each other.  However, in the case of a dispute,
trustlessness is preserved by allowing the relevant parts of the tree to
be placed onchain for settlement.

Ideally, as the timeout approaches, all parties agree to an offchain transfer
of their funds from the leaves of the tree to the counterparty who will
be able to claim those funds at the timeout.  If every party does this,
they can claim all funds at the timeout in a single transaction that
spends from the funding transaction, allowing all leaves and branches of
the tree to be forgotten (never published onchain).  Similar to channel
factories and joinpools,
this can allow large numbers of users to share a UTXO and split the
costs of creating and spending it.

The main advantage of timeout trees over previous UTXO sharing schemes
is its small onchain footprint even in the case of nonresponsiveness.
For example, in a channel factory with ten users, even one of those
users being offline or having lost critical data prevents the root state
from being updated any further, requiring all parts of the tree of
transactions that created the current state to be put onchain.  In a
timeout tree, the offline user (or user with data loss) risks having
their funds taken by a counterparty but does not force any additional
data to be published onchain.

Note that, even when a counterparty can take the funds of a
nonresponsive user, the counterparty may choose to return those funds to
that user.  Although no user can depend on this charity, it may be the
common state of affairs for timeout trees run by established business
that profit from repeat customers.

Timeout trees were first described by developer John Law in a paper
introducing the inherited identifiers soft fork
proposal.  Law later expanded on the idea for other
covenant proposals.  Other developers have described
variations on timeout trees, including designs that require greater
interaction between participants but no consensus changes.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
