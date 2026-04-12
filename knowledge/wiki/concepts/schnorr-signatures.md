---
title: "Schnorr signatures"
type: concept
tags: [cryptography, difficulty-4]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["entities/musig.md", "entities/taproot.md", "concepts/multisignature.md", "concepts/responsible-disclosures.md", "entities/segregated-witness.md"]
summary: "Schnorr signatures are digital signatures that provide similar security to the ECDSA scheme used since Bitcoin’s original implementation, but which pr"
difficulty: 4
domain: cryptography
---

Schnorr signatures are digital signatures that provide similar security to the ECDSA scheme used since Bitcoin’s original implementation, but which provide other benefits. They were added to Bitcoin as part of the taproot soft fork.

Schnorr is secure under the same cryptographic assumptions as
ECDSA and it is easier and faster to create secure multiparty
signatures using schnorr with protocols such as MuSig.  A new
signature type also provided an opportunity to change the signature
serialization format from BER/DER to one that is more compact
and simpler to implement.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
