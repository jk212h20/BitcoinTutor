---
title: "Mastering Bitcoin: Transaction Fees"
type: source
tags: [mastering-bitcoin, textbook]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/mastering-bitcoin/ch09_fees.md]
summary: "Chapter from Mastering Bitcoin (3rd Edition) by Andreas Antonopoulos & David Harding"
---

Summary of **Transaction Fees** from *Mastering Bitcoin* (3rd Edition).

## Transaction Fees

++++
<p class="fix_tracking">
The digital signature we saw Alice create in <a data-type="xref" href="#c_signatures">#c_signatures</a> only
proves that she knows her private key and that she committed to a
transaction that pays Bob.  She can create another signature that
instead commits to a transaction paying Carol—a transaction that spends
the same output (bitcoins) that she used to pay Bob.  Those two
transactions are now <em>conflicting transactions</em> because only one
transaction spending a particular output can be included in the valid
blockchain with the most proof of work—the blockchain that full nodes
use to determine which keys control which bitcoins.
</p>
++++

To((("conflicting transactions")))((("transactions", "conflicts in"))) protect himself against co

*[Content continues in raw source...]*

---
*Raw source: `knowledge/sources/mastering-bitcoin/ch09_fees.md` — ingested 2026-04-12*
