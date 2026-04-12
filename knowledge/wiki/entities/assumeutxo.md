---
title: "AssumeUTXO"
type: entity
tags: [transactions, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/asicboost.md", "concepts/async-payments.md"]
summary: "AssumeUTXO is a proposed mode for bootstrapping new full nodes that allows them to postpone verifying old block chain history until after the user is "
difficulty: 2
domain: transactions
---

AssumeUTXO is a proposed mode for bootstrapping new full nodes that allows them to postpone verifying old block chain history until after the user is able to receive recent transactions.

Embedded in the code of the node would be a hash of the set of all
spendable bitcoins and the conditions necessary to spend them (the
UTXO set) as of a certain recent point in time.  Similar to the
existing assumevalid setting and other parameters used by nodes to
converge on consensus, revisions of the assumeutxo hash would be
checked for correctness by developers during code review.  This would
allow operators of new nodes to
optionally trust that hash and download a UTXO set that matches that
hash.  For blocks produced subsequently to the UTXO set hash, the node
would verify new blocks and update their own UTXO set like any other
node without further trust.  As currently designed, the node would also
download and verify older blocks in the background so that it could eventually prove that the
hash it first started with was correct.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
