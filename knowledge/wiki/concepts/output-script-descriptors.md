---
title: "Output script descriptors"
type: concept
tags: [wallets, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["entities/miniscript.md", "concepts/psbt.md", "concepts/output-linking.md", "concepts/package-relay.md"]
summary: "Also covering Descriptors

Output script descriptors are strings that contain all the information necessary to allow a wallet or other program to trac"
difficulty: 2
domain: wallets
---

Also covering Descriptors

Output script descriptors are strings that contain all the information necessary to allow a wallet or other program to track payments made to or spent from a particular script or set of related scripts (i.e. an address or a set of related addresses such as in an HD wallet).

Descriptors combine well with miniscript in
allowing a wallet to handle tracking and signing for a larger variety
of scripts.  They also combine well with PSBTs in
allowing the wallet to determine which keys it controls in a multisig
script.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
