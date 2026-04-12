---
title: "Generic signmessage"
type: concept
tags: [cryptography, difficulty-3]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/gap-limits.md", "concepts/hd-key-generation.md"]
summary: "Also covering Signmessage and BIP322

Generic signmessage is a method that allows wallets to sign or partially sign a message for any script from whic"
difficulty: 3
domain: cryptography
---

Also covering Signmessage and BIP322

Generic signmessage is a method that allows wallets to sign or partially sign a message for any script from which they could conceivably spend.

The BIP322 generic signed message format allows a wallet to sign
a text string by producing a
signature for a virtual Bitcoin transaction.  This means a signed message can
be produced for any script or address that a wallet would be able to
spend.  Additionally, two or more wallets can cooperate to create a
BIP322 signed message for multisig scripts.

When signing for legacy P2PKH addresses, BIP322 instead uses the
traditional signmessage format that was first implemented in an
early version of the Bitcoin software, making the proposal backwards
compatible with existing software that verifies signed messages for
P2PKH addresses.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
