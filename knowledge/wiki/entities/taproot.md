---
title: "Taproot"
type: entity
tags: [cryptography, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["entities/musig.md", "concepts/mast.md", "concepts/tapscript.md", "concepts/schnorr-signatures.md", "concepts/pay-to-contract-outputs.md", "concepts/swap-in-potentiam.md"]
summary: "Taproot is an activated soft fork change to Bitcoin that allows payments to schnorr public keys that may optionally commit to a script that can be rev"
difficulty: 2
domain: cryptography
---

Taproot is an activated soft fork change to Bitcoin that allows payments to schnorr public keys that may optionally commit to a script that can be revealed at spend time.

Coins protected by taproot may be spent either by satisfying one of
the committed scripts or by simply providing a signature that verifies
against the public key (allowing the scripts to be kept private).
Taproot uses schnorr signatures that simplify multiparty construction
(e.g. using MuSig) and MAST to
allow committing to more than one script, any one of which may be
used at spend time.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
