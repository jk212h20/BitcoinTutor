---
title: "Quantum resistance"
type: concept
tags: [cryptography, difficulty-5]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/htlc.md", "entities/taproot.md", "concepts/v2-p2p-transport.md", "concepts/ptlc.md", "concepts/redundant-overpayments.md"]
summary: "Also covering Post-quantum cryptography

Quantum resistance is the ability for cryptographic protocols to remain secure in the presence of fast quantu"
difficulty: 5
domain: cryptography
---

Also covering Post-quantum cryptography

Quantum resistance is the ability for cryptographic protocols to remain secure in the presence of fast quantum computers.

Bitcoin uses a variety of cryptographic protocols with varying degrees
of vulnerability to fast quantum computers:


  
    ● SHA256, SHA256d, and RIPEMD160 used variously in Bitcoin’s proof
of work and to uniquely identify blocks, scripts, individual
transactions, and collections of transactions, plus used for hash
locks in HTLCs, would have their security strength
reduced to its square root by Grover’s algorithm running on an
idealized quantum computer.  That means an algorithm like SHA256 that
currently has an estimated second preimage resistance of 256 bits
(2256) would be reduced to 128 bits (2128 is the
square root of 2256).  That loss can be overcome by using a
roughly equivalent algorithm with twice as many security bits, e.g.
going from SHA256 to SHA512.
  
  
    ● ECDSA public keys used in Bitcoin are vulnerable to a
factorization attack using Shor’s algorithm.  This would
completely eliminate the security of ECDSA, assuming an idealized
quantum computer.  Since public keys used for proposed schnorr
signatures are essentially identical to
those used for ECDSA, the same attack applies.  Quantum-resistant
alternatives to ECDSA are known, but they involve much larger key and
signature sizes, so most developers seem to prefer to delay upgrading
until it’s necessary.
  
  
    ● Noise is the protocol framework used for
encrypted communication in LN.
Optech has not seen discussion of its quantum resistance, but we
believe the way LN currently uses it depends on the security of ECDSA,
so if fast quantum computers are developed, they may be able to
decrypt old communication between LN nodes.
  


The worst case for attacks assumes an idealized quantum computer with
sufficient capacity and reliability to perform the attack.  It’s likely
that the capacity and reliability of quantum computers will increase
gradually over time, meaning the security of the cryptography used in
Bitcoin will similarly decrease gradually over time, with attacks
progressing from computationally infeasible, to theoretically possible
but implausible, to extraordinarily expensive, to very expensive, to
practical.  As long as this progression is followed and is possible to
publicly track, it’s likely Bitcoin can continue using its currently
highly space efficient cryptography while it remains safe, and then
upgrade to post-quantum cryptography when it looks like it’ll soon
become necessary.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
