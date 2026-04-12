---
title: "Mastering Bitcoin: The Blockchain"
type: source
tags: [mastering-bitcoin, textbook]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/mastering-bitcoin/ch11_blockchain.md]
summary: "Chapter from Mastering Bitcoin (3rd Edition) by Andreas Antonopoulos & David Harding"
---

Summary of **The Blockchain** from *Mastering Bitcoin* (3rd Edition).

## The Blockchain

The ((("blockchain", "explained", id="blockchain-explain")))blockchain is the history of every confirmed Bitcoin transaction.
It's what allows every full node to independently determine what keys and
scripts control which bitcoins.  In this chapter, we'll look at the
structure of the blockchain and see how it uses cryptographic
commitments and other clever tricks to make every part of it easy for
full nodes (and sometimes lightweight clients) to validate.

The blockchain data structure is
an ordered, back-linked list of blocks of transactions.  The blockchain
can be stored as a flat file or in a simple database.
Blocks are linked "back," each referring to the previous block in the
chain. The blockchain is often visualized
as a vertical stack, with blocks layered on top o

*[Content continues in raw source...]*

---
*Raw source: `knowledge/sources/mastering-bitcoin/ch11_blockchain.md` — ingested 2026-04-12*
