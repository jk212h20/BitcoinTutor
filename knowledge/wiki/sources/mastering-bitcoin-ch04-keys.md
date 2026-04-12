---
title: "Mastering Bitcoin: Keys and Addresses"
type: source
tags: [mastering-bitcoin, textbook]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/mastering-bitcoin/ch04_keys.md]
summary: "Chapter from Mastering Bitcoin (3rd Edition) by Andreas Antonopoulos & David Harding"
---

Summary of **Keys and Addresses** from *Mastering Bitcoin* (3rd Edition).

## Keys and Addresses

Alice wants to pay Bob, but the thousands of Bitcoin full nodes who
will verify her transaction don't know who Alice or Bob are--and we want
to keep it that way to protect their privacy.  Alice needs to
communicate that Bob should receive some of her bitcoins without tying
any aspect of that transaction to Bob's real-world identity or to other
Bitcoin payments that Bob receives.  The method Alice uses must ensure
that only Bob can further spend the bitcoins he receives.

The original Bitcoin paper describes a very simple scheme for achieving
those goals, shown in <<pay-to-pure-pubkey>>.  


.Transaction chain from original Bitcoin paper.


A receiver like Bob
accepts bitcoins to a public key in a transaction that is signed by the
spender (like Alice).  The bitcoins t

*[Content continues in raw source...]*

---
*Raw source: `knowledge/sources/mastering-bitcoin/ch04_keys.md` — ingested 2026-04-12*
