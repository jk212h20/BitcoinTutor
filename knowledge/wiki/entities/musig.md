---
title: "MuSig"
type: entity
tags: [cryptography, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/multisignature.md", "concepts/schnorr-signatures.md", "concepts/offers.md"]
summary: "MuSig is a protocol for aggregating public keys and signatures for the schnorr digital signature algorithm"
difficulty: 2
domain: cryptography
---

MuSig is a protocol for aggregating public keys and signatures for the schnorr digital signature algorithm.

MuSig allows multiple users each with their own private key to create a
combined public key that’s indistinguishable from any other schnorr
pubkey, including being the same size as a single-user pubkey.  It
further describes how the users who created the pubkey can work
together to securely create a multisignature corresponding to the pubkey.
Like the pubkey, the signature is indistinguishable from any
other schnorr signature.

Compared to traditional script-based multisig, MuSig uses less block
space and is more private, but it also requires more interactivity
between the participants.  As of August 2021, there are three protocols
in the MuSig family:


  
    ● MuSig (also called MuSig1), which should be simple to implement
but which requires three rounds of communication during the signing
process.
  
  
    ● MuSig2, also simple to implement.  It eliminates one round of
communication and allows another round to be combined with key
exchange.  That can allow using a somewhat similar signing
process to what we use today with script-based multisig.  This does
require storing extra data and being very careful about ensuring your signing software or
hardware can’t be tricked into unknowingly repeating part of the
signing session.
  
  
    ● MuSig-DN (Deterministic Nonce), significantly more complex to
implement.  Its communication between participants can’t be combined
with key exchange, but it has the advantage that it’s not vulnerable to the repeated
session attack.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
