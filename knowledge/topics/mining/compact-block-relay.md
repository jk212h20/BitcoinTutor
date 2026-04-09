---
title: "Compact block relay"
slug: "compact-block-relay"
domain: mining
difficulty: 5
source: optech
related: ["compact-block-filters", "consensus-cleanup-soft-fork"]
---

Also covering BIP152

Compact block relay is a protocol that allows two nodes with roughly similar sets of unconfirmed transactions to minimize both the bandwidth and the latency required to transfer a block that confirms many of those same transactions.

By default, most full nodes are configured to receive relayed
unconfirmed transactions, which the nodes store in their mempools and
further relay to their other peers.  Ultimately those transactions
reach miners, who attempt to include them in a block.  When that new
block is itself relayed back to nodes, it typically consists almost
entirely of transactions that the nodes already have in their mempools.

Relaying those transactions a second time is redundant, and it’s that
redundancy that BIP152 compact blocks aims to eliminate.  A sending
node constructs a compact block by replacing each transaction it
believes its peer has with a fast per-peer 6-byte non-cryptographic hash
of that transaction’s identifier (txid for pre-segwit nodes, witness
txid (wtxid) for segwit nodes).
This can take a multimegabyte block with thousands of
transactions and compact it down to just a few kilobytes.  This directly
reduces bandwidth.  Indirectly, it also significantly reduces latency
because TCP propagates smaller amounts of data faster than larger
amounts.

For any transactions the generating node doesn’t think its peer knows
about, it sends the full transaction.

The receiving peer hashes the wtxids of all the transactions in its
mempool.  It then substitutes each wtxid hash in the compact block with
the full transaction from its mempool.  If any of the wtxid hashes in the
compact block don’t match a transaction in the receiving peer’s mempool,
it requests that transaction from the sending node.

To maximize both bandwidth and latency improvements, compact blocks can
be used in two different modes:


  
    ● Low bandwidth mode is designed to be used with most peers.  When a
node learns about a new block, it announces the header hash of that
block to its BIP152 low-bandwidth peers.  Only if a peer requests the
compact block is any additional data sent.  This avoids sending data
to peers who may have already received the block from one of their
other peers.
  
  
    ● High bandwidth mode is designed to only be used with a few peers
who specifically request the mode.  When a node receives a block, it
verifies its header contains an appropriate amount of Proof of Work
(PoW) and then, without performing any other significant verification,
immediately sends it as a compact block to its high bandwidth mode
peers.  This allows blocks to propagate across the network quickly at
the cost of nodes sometimes sending a compact block to a peer who
already received the block from another node.  Since compact blocks
are so much smaller than raw blocks, this “high bandwidth” mode still
typically uses less bandwidth than pre-BIP152 block relay.
  


BIP152 also specifies two versions of compact blocks:


  
    Version 1 uses hashes of txids.
  
  
    Version 2 uses hashes of wtxids.
  


Preserving the advantages of compact block relay is often cited as one
reason for trying to keep mempool and relay policy consistent between
nodes—the more the mempools of nodes differ, the less effective
compact blocks will be at minimizing bandwidth and latency.
