---
title: "Scriptless multisignatures"
slug: "multisignature"
domain: cryptography
difficulty: 3
source: optech
related: ["tapscript", "schnorr-signatures", "musig", "multisignature", "threshold-signature", "adaptor-signatures", "multipath-payments"]
---

Also covering 2pECDSA and Two-Party ECDSA (2pECDSA)

Scriptless multisignatures are digital signatures created using two or more private keys which can be verified using only a single public key and a single signature.

Scriptless multisignatures can be compared with scripted multisig, the use of public
keys and signatures with Bitcoin’s OP_CHECKMULTISIG and
OP_CHECKMULTISIGVERIFY opcodes (and the OP_CHECKSIGADD opcode
proposed for tapscript).  Multisignatures have the
advantage that only a single key and a single signature are published
onchain when they are used in a Bitcoin transaction, allowing an
unlimited number of signers to pay the same amount of transaction fee
that a single signer would pay for an otherwise identical transaction.
Multisignature payments being indistinguishable from single-signature
payments also gives the creators of both types of payments greater privacy.

It’s possible to create multisignatures for the ECDSA algorithm
supported by all versions of Bitcoin, although
it’s easier to create multisignatures
for schnorr signatures and several
algorithms for that are known, with MuSig having been
specifically created for the needs of Bitcoin users.

Terminology: the following table summarizes the differences
between multisignature and related terms.


  
    
      Term
      Private keys
      Messages(e.g. tx inputs)
      Published pubkeys
      Signatures
      Signers required
      Notes
    
  
  
    
      Scripted multisig
      m
      1
      m
      k where k<=m
      k
      Uses Bitcoin Script multisig opcodes
    
    
      Scriptless multisignatures
      m
      1
      1
      1
      m
      Indistinguishable onchain from single-sig
    
    
      Threshold signature
      m
      1
      1
      1
      k where k<=m
      Indistinguishable onchain from single-sig
