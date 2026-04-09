# Adaptor signatures

/ home / topics / 


    Adaptor signatures
    
  

  
    




Also covering Signature adaptors and Scriptless scripts

Adaptor signatures (also called signature adaptors) are auxiliary signature data that commit to a hidden value.  When an adaptor is combined with a corresponding signature, it reveals the hidden value.  Alternatively, when combined with the hidden value, the adaptor reveals the signature.  Other people may create secondary adaptors that reuse the commitment even if they don’t know the hidden value. This makes adaptors a powerful tool for implementing locking in bitcoin contracts.

Contracts in Bitcoin often require a locking mechanism to ensure the
atomicity of a set of payments—either all the payments succeed or
all of them fail.  This locking has traditionally been done by having
all payments in the set commit to the same hash digest preimage; when
the party who knows the preimage reveals it onchain, everyone else
learns it and can unlock their own payments.  Commonly used hashlocks
in Bitcoin consume about 67 bytes  and reveal the link
between the set of payments because they all use the same preimage and
digest.

By comparison, signature adaptors never need to be published onchain.   To anyone
without a corresponding adaptor, a signature created with an adaptor looks
like any other digital signature, giving adaptors significant efficiency
and privacy advantages over hashlocks.

Example

The multiple uses of signature adaptors can be seen in a simple
coinswap protocol.  For example, Alice can give Bob an adaptor
for an unsigned transaction that promises to pay him 1 BTC.  An
adaptor by itself can’t be used as a BIP340 signature, so
Alice hasn’t paid Bob yet.

What the adaptor does provide Bob is a commitment to Alice’s hidden
value.  This commitment includes a parameter Bob can use to create a
second adaptor that commits to the same hidden value as Alice’s
adaptor.  Bob can make that commitment even without knowing Alice’s
hidden value or his own signature for that commitment.  Bob gives
Alice his adaptor and a corresponding unsigned transaction that
promises to pay her 1 BTC.

Alice has always known the hidden value, so she can combine the hidden
value with Bob’s adaptor to get his signature for the
transaction that pays her.  She broadcasts the transaction and
receives Bob’s payment.  When Bob sees that transaction onchain, he
can combine its signature with the adaptor he gave
Alice, allowing him to derive the hidden value.  Then he can
combine that hidden value with the adaptor Alice gave him earlier.
Bob broadcasts
that transaction to receive Alice’s payment, completing the coinswap.

Besides coinswaps, there are several other proposed uses for adaptor signatures.




    Click to display the same coinswap example in mathematical terms

    In the following example, we assume the use of BIP340
schnorr signatures.  We use lowercase variables for scalars and
uppercase variables for elliptic curve points.  We represent
concatenation with || and the hash function with H().

    Alice creates a valid signature commitment (s) for the transaction paying Bob
(m) using her private key (p), which corresponds to her public key
(P = pG).  She also uses a private random nonce (r), a hidden value
(t), and the elliptic curve points for them (R = rG, T = tG):

    s = r + t + H(R + T || P || m) * p
    

    She subtracts t from the signature commitment to produce a signature adaptor:

    s' = s - t
    

    She gives Bob the adaptor, which consists of the following
data:

    s', R, T
    

    Bob can verify the adaptor:

    s' * G ?= R + H(R + T || P || m) * P
    

    But the adaptor is not a valid BIP340 signature.  For a valid signature, BIP340 expects
x and Y, using them with the expression:

    x * G ?= Y + H(Y || P || m) * P
    

    However,

    
      
        If Bob sets Y = R so that it matches the s' he received in the
adaptor, then BIP340 is going to fail on H(R || P || m)
since Alice computed her hash with H(R + T || P || m).
      
      
        If Bob sets Y = R + T so that it matches H(R + T || P || m), BIP340
is going to fail on the initial Y since Bob is providing R + T
rather than the needed R.
      
    

    Therefore Bob can’t use the adaptor as a BIP340 signature.
However, he can create his own adaptor using it.  This is similar to the
signature Alice created but Bob doesn’t commit to t here, since Bob
doesn’t know that value.  All variables here except T are different
for Bob than they were for Alice:

    s = r + H(R + T || P || m) * p
    

    Unlike Alice, Bob doesn’t need to tweak his signature.  Bob’s signature commitment s is
not a part of a valid signature because it commits to r and R + T, which
won’t pass BIP340 verification for the same reasons previously described.
To be valid, the signature needs to commit to r + t and R + T,
which Bob can’t produce since he doesn’t know t.

    Bob gives Alice his adaptor:

    s, R, T
    

    Alice already knew T, but (s, R, T) is a standard signature
adaptor so we use its full form.  Alice can produce a
signature from that adaptor using the hidden t value that
only she knows so far:

    (s + t) * G ?= R + T + H(R + T || P || m) * P
    

    Alice uses the signature to broadcast Bob’s transaction that
pays her.  When Bob sees (s + t) onchain, he can learn the value of t:

    t = (s + t) - s
    

    He can then use t to solve the adaptor Alice gave him
earlier:

    (s' + t) * G ?= R + T + H(R + T || P || m) * P
    

    Bob uses that signature to broadcast the transaction Alice
originally gave him.

  


Relationship to multiparty signatures

Signature adaptors usually can’t secure a contract entirely by
themselves.  For example, in the above description of a coinswap,
Alice could double spend her payment to Bob after she learned Bob’s
signature, or Bob could’ve tried the same in reverse (with more
difficulty since we assumed Alice’s transaction had one confirmation).
This issue is typically addressed by combining signature adaptors with
multiparty signatures.  For example, Alice deposits her money into an
address that can only be spent if both she and Bob collaborate to
create a valid signature.  Now Alice can provide Bob with an adaptor
for her half of the multiparty signature, which Bob can accept with
perfect safety knowing that Alice couldn’t double spend the funds
without his participation.  This may additionally require a timelocked
refund option in case one party refuses to sign.

In the schnorr signature scheme,
signature adaptors are usually proposed to be combined with multiparty signature
schemes such as MuSig to allow the published
signature to look like a single-party signature, enhancing
privacy and efficiency.  This is also possible in ECDSA but it
requires novel algorithms that are either comparatively slow or
require additional security assumptions.  Instead, an alternative scheme for adaptor
signatures exists for Bitcoin that uses 2-of-2 OP_CHECKSIG multisig;
this is less efficient and possibly less private—but arguably
simpler and safer than multiparty ECDSA.

Primary code and documentation


  Scriptless scripts slides (PDF)
  One-time verifiably encrypted signatures (PDF)
  Documentation for scriptless script protocols


Optech newsletter and website mentions

2024

  LN developer discussion of variations of signature adaptors for adding PTLC support


2023

  Analysis of signature adaptor security
  Using signature adaptors to prove acceptance of an LN async payment


2021

  Preparing for taproot: signature adaptors
  Question: Why does blockwide signature aggregation prevent adaptor signatures?
  Libsecp256k1-zkp #117 adds support for simplified ECDSA signature adaptors


2020

  2020 year in review: signature adaptors for LN channel commitments
  Revised witness asymmetric channels proposal with signature adaptors
  Using signature adaptors for witness asymmetric payment channels
  Paying for a PTLC pointlock using an signature adaptors
  Work on PTLCs for LN using simplified ECDSA signature adaptors
  ECDSA signature adaptors for statechains with secure multiparty computation
  Boomerang contracts using signature adaptors for LN latency & throughput
  Taproot privacy gains, including those from signature adaptors


2019

  Presentation: Blockchain design patterns: Layers and scaling approaches
  libsecp256k1-zkp library updated with support for signature adaptors
  Q&A: what’s the difference between taproot and signature adaptors?


2018

  Discussion about problems in LN solvable using signature adaptors
  Fast multiparty ECDSA compatible with signature adaptors
  Multiparty ECDSA for scriptless LN channels


See also


  Schnorr signatures
  MuSig key and signature aggregation
  Using schnorr subtraction to create more private coinswaps
  
    Adaptor signatures for discreet log contracts

    
  




Previous Topic:Accidental confiscation




Next Topic:Addr v2



Edit page
  Report Issue

## Related Topics

- topics ()
- schnorr signature scheme (schnorr-signatures)
- MuSig (musig)
- Accidental confiscation (accidental-confiscation)
- Addr v2 (addr-v2)
