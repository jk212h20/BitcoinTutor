---
title: "Hash Time Locked Contract (HTLC)"
type: concept
tags: [cryptography, difficulty-4]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/ptlc.md", "concepts/adaptor-signatures.md", "concepts/schnorr-signatures.md", "concepts/htlc-endorsement.md", "concepts/hwi.md"]
summary: "Hash Time Locked Contracts (HTLCs) are conditional payments used in LN payment channels, cross-chain atomic swaps, same-chain coinswaps, zero-knowledg"
difficulty: 4
domain: cryptography
---

Hash Time Locked Contracts (HTLCs) are conditional payments used in LN payment channels, cross-chain atomic swaps, same-chain coinswaps, zero-knowledge contingent payments, and other contract protocols.

HTLCs have two fundamental clauses: a payment clause secured with a
hash lock and a refund clause secured with a time lock.  To open a
hash lock and claim a payment, the receiver needs to reveal the
preimage to a hash digest encoded in the contract.  To open a time
lock and receive a refund, the spender needs to wait until after a
certain time encoded in the contract.

Because revealed preimages and past times don’t uniquely identify the
person who should receive either the payment, HTLCs are only secure if
they also require a unique signature matching the public key of either
the spender (refundee) or the intended receiver.  That makes the
minimal HTLC look something like this in the
Minsc scripting language:

(pk(Receiver) && sha256(H)) || (pk(Refundee) && older(10))


History

Hash locks and time locks as independent features were clearly
designed into the original version of Bitcoin.  As far as we’re aware,
the earliest description combining the two to create a conditional
payment—what’d we now call an HTLC—is a set of posts (1, 2) from July 2012. However, it’s
possible that a December 2010 post was
alluding to the same basic idea when mentioning a “cryptographically
[…] risk free trade”.

Future

Point Time Lock Contracts (PTLCs) perform the same
function as HTLCs but can provide better privacy, use less block
space, and prevent routing interception.  As a downside, they depend
on signature adaptors which can only
implemented using Bitcoin’s existing ECDSA signatures either with
particularly slow algorithms, by making additional security
assumptions, or by using an OP_CHECKMULTISIG
construction that doesn’t save as much block space as is possible with
the extra security assumptions.  This conflict between security and
space savings will be resolved if schnorr signatures are added to Bitcoin.  If that happens, it’s expected that
protocols which only require Bitcoin support may migrate from using
HTLCs to PTLCs.  Other protocols that bridge Bitcoin and other
cryptocurrencies will likely continue using HTLCs due to widespread
support for standardized hash functions such as SHA256.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
