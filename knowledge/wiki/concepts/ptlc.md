---
title: "Point Time Locked Contracts (PTLCs)"
type: concept
tags: [cryptography, difficulty-4]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/htlc.md", "concepts/adaptor-signatures.md", "concepts/schnorr-signatures.md", "concepts/psbt.md", "concepts/quantum-resistance.md"]
summary: "Point Time Locked Contracts (PTLCs) are conditional payments that can replace the use of HTLCs in LN payment channels, same-chain coinswaps, some cros"
difficulty: 4
domain: cryptography
---

Point Time Locked Contracts (PTLCs) are conditional payments that can replace the use of HTLCs in LN payment channels, same-chain coinswaps, some cross-chain atomic swaps, and other contract protocols.  Compared to HTLCs, they can be more private and use less block space.

PTLCs differ from HTLCs in their primary locking and
unlocking method:


  
    ● HTLC hash locks: are locked using a hash digest and unlocked by
providing the corresponding preimage.  The most commonly used hash function is
SHA256, which produces a 256-bit (32-byte) digest commonly generated
from a 32-byte preimage.

    When used to secure multiple payments (e.g. a routed LN payment or
an atomic swap), all payments use the same preimage and hash lock.
This creates a link between those payments if they’re published
onchain or if they’re routed offchain though surveillance nodes.
  
  
    ● PTLC point locks: are locked using a public key (a point on
Bitcoin’s elliptic curve) and unlocked by providing a corresponding
signature from a satisfied signature adaptor.  For a proposed schnorr signature construction, the key would be 32 bytes and the signature
64 bytes.  However, using either multiparty ECDSA or schnorr key
aggregation and signing, the keys and signature can be combined
with other keys and signatures needed to authorize any spend,
allowing point locks to use zero bytes of distinct block space.

    Each point lock can use different keys and signatures, so there is
nothing about the point lock that correlates different payments
either onchain or when routed offchain through surveillance nodes.
  


Implementation of PTLCs in Bitcoin requires creating signature
adaptors that will be easier to combine
with digital signatures when schnorr signatures have been implemented on Bitcoin.  For that reason, the
development of PTLCs in Bitcoin has mostly been a discussion topic
rather than something actively worked on.  The unavailability of
schnorr signatures in alternative cryptocurrencies may also prevent
the use of PTLCs in some cross-chain contracts, though it is still
technically possible to use PTLCs with just ECDSA pubkeys and
signatures.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
