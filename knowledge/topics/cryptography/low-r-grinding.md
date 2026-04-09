---
title: "Low-r grinding"
slug: "low-r-grinding"
domain: cryptography
difficulty: 2
source: optech
related: ["taproot", "lnurl", "mast"]
---

Also covering Signature grinding

Low-r grinding is an optimization for wallets where they keep generating new ECDSA signatures for the same transaction until the find a signature whose r value is on the lower half of the range, allowing it to be encoded with one fewer byte than a signature on the top half of the range.

This optimization only applies to legacy and segwit v0 transactions
where ECDSA is used.  Signatures in taproot
transactions can’t be made any shorter.

Roughly half of all ECDSA transactions are expected to have high-r
values and roughly half are expect to have low-r values, so grinding
saves an average of 0.5 vbytes per signature in legacy transactions and
0.125 vbytes in segwit v0 transactions.
