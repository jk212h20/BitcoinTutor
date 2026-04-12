---
title: "Accidental confiscation"
type: concept
tags: [script, difficulty-3]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/soft-fork-activation.md", "concepts/acc.md", "concepts/adaptor-signatures.md"]
summary: "Accidental confiscation can occur if a poorly designed soft fork permanently prevents a user from being able to get a transaction confirmed"
difficulty: 3
domain: script
---

Accidental confiscation can occur if a poorly designed soft fork permanently prevents a user from being able to get a transaction confirmed.

A soft fork is a restriction on the previous consensus rules.  If a soft
fork overly restricts the use of a feature that a user needs to spend
some bitcoins they previously received, those bitcoins will become
unspendable unless the soft fork behavior is changed in a later hard
fork.

Such confiscation can be done deliberately, in which case the operators
of economic full nodes who enforce the consensus rules need to decide if
the benefits of a confiscatory soft fork outweigh its problems.  But it
can also happen accidentally if a soft fork is poorly designed or if
there’s poor communication between consensus developers and developers
of contract protocols.  Three particular risks stand out:


  
    ● Unknown use of upgrade features: some features of the consensus
protocol, such as the OP_NOPx and OP_SUCCESSx opcodes are reserved
for future soft forks.  If anyone begins using them before a soft
fork, they could become a victim of accidental confiscation.  For that
reason, Bitcoin Optech very strongly recommends anyone considering
use of a feature reserved for soft fork upgrades publicly announce
their plans to protocol developer communication channels and
proactively monitor any discussion of new soft forks for changes to
the features being used.
  
  
    ● Presigned transactions: some contract protocols and uses of
Bitcoin may require a user to generate a spending transaction, sign it
with the necessary private keys, and then delete the private keys.
This prevents them from being able to sign alternative versions of the
transaction.  If the Bitcoin consensus rules are changed to make the
spending transaction invalid, the user’s funds are lost.  Optech
recommends that presigned transaction protocols be well documented,
they be checked against standardness policy (see below), and that
anyone using them monitor any discussion of new soft fork proposals
for changes that would render those transactions invalid.
  
  
    ● Committed scripts: P2SH, P2WSH, and P2TR scriptpaths are all
scripts that do not appear on the blockchain when the user commits to
potentially using them.  Any soft fork restriction to the scripting
language can make a previously satisfiable script into one that cannot
be satisfied.   Optech makes the same recommendation here as we do for
presigned transactions.
  


Relationship to transaction standardness policy

Full nodes such as Bitcoin Core will not relay certain transactions,
allow them into their mempools, or put them in block templates—even if
those transactions are valid according to the current consensus rules.
There are a variety of reasons for the transaction relay policies, but
some of those policies exist to discourage anyone from using features
reserved for future soft fork upgrades.

For example, if you create a transaction at present which executes
OP_NOP9, that transaction will be considered non-standard and will not
be relayed while it is unconfirmed.  It’s still valid in a block and all
full nodes must accept it in a block to remain in consensus.

The goal is for anyone who begins using a reserved feature to quickly
discover that transactions using that feature are hard to get mined.
They can then either switch to an alternative method of accomplishing
the same thing or they can convince full node developers to change their
relay policy, which hopefully serves as sufficient public notification
that the feature is being used, preventing later accidental confiscation.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
