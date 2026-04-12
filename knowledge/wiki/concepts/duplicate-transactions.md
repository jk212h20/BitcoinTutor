---
title: "Duplicate transactions"
type: concept
tags: [consensus, difficulty-4]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/consensus-cleanup-soft-fork.md", "concepts/duplex-micropayment-channels.md", "entities/ecash.md"]
summary: "Also covering Block 1,983,702 problem

Duplicate transactions are more than one transaction that are identical and have identical txids"
difficulty: 4
domain: consensus
---

Also covering Block 1,983,702 problem

Duplicate transactions are more than one transaction that are identical and have identical txids.  Bitcoin’s consensus rules use txids to uniquely identify transactions, so duplicate transactions can cause unwanted behavior.

Each regular Bitcoin transaction spends at least one output of a
previous transaction, identifying that output by a hash digest of the
transaction that contains it (a txid) and an index number indicating
the output’s location in the previous transaction.  Cryptographically
secure hash functions should effectively always return a unique hash
digest for unique data, so as long as each transaction is unique, this
mechanism allows the Bitcoin protocol to uniquely identify outputs.
That’s essential because a critical consensus rule forbids any output
from being spent more than once on a given blockchain, preventing
unwanted inflation by ensuring that each user can only spend a
particular set of bitcoins once.

The first transaction in a block (a coinbase transaction) is not a
regular transaction.  It is forbidden from referring to any previous
transaction.  In the original Bitcoin protocol, it was easy to construct
two coinbase transactions in different blocks that were identical to
each other, leading to them having identical txids.

At least one person who discovered this potential problem did create
duplicate transactions onchain.  Because the situation was
unanticipated, the behavior was unspecified, but nearly everyone at the
time ran the same full node software, so we can describe what it did: a
later transaction overwrote an identical earlier transaction in the
output-tracking database.  Both transactions paid the same output
script, but only one of them was now spendable, meaning the transaction
creator lost money.

However, if the creator had spent the
output of the first transaction before creating the duplicate transaction, they (or anyone else)
could have also spent the duplicate output by simply rebroadcasting the
first spend.  If their spends had multiple outputs, they could quickly
multiply the number of potential duplicate transactions on the network
and could use this to confuse and (likely) attack full nodes and wallets
that were built on the assumption that valid duplicate transactions were
impossible.

The BIP30 soft fork limited the damage by forbidding any transaction
in a new block from having the same txid as a partly unspent previous
transaction.  A later soft fork, BIP34, attempted to fix the problem
entirely by requiring each coinbase transaction to include unique data,
ensuring it was a unique transaction with a unique txid.  Unfortunately,
it was later discovered that some pre-BIP34 blocks contained the unique
data necessary for a later block to pass the BIP34 rule, called the
block 1,983,702 problem for the first block which can circumvent the
intended BIP34 protection.

Recent versions of the proposed consensus cleanup soft fork has proposed to fix the eventual problem by requiring
slightly more unique data be included in coinbase transactions.

For reference, the txids of two different historic duplicate
transactions (four transactions total) are
d5d2…8599 (in blocks 91,812 and 91,842)
and
e3bf…b468 (in blocks 91,722 and 91,880).

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
