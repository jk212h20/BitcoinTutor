---
title: "SIGHASH_ANYPREVOUT"
slug: "sighash_anyprevout"
domain: cryptography
difficulty: 2
source: optech
related: ["eltoo", "covenants", "sidechains", "signer-delegation"]
---

Also covering SIGHASH_NOINPUT

SIGHASH_ANYPREVOUT, an updated version of SIGHASH_NOINPUT, is a proposal for a signature hash (sighash) where the identifier for the UTXO being spent is not signed, allowing the signature to be used with any UTXO that’s protected by a similar script (i.e. uses the same public keys).

A noinput-style sighash is necessary for the proposed eltoo
layer for LN.
