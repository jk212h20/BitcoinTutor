# Discrete log equivalency (DLEQ)

/ home / topics / 


    Discrete log equivalency (DLEQ)
    
  

  
    




Also covering Proofs of discrete log equivalency (PODLE)

Discrete log equivalency (DLEQ) or proofs of discrete log equivalency (PODLE) is the ability to prove two points on an elliptic curve were both derived from the same private value (such as a private key).  Applications of it include committing to ownership of a key in the UTXO set without publicly revealing the specific UTXO and proving a silent payment output was constructed correctly without disclosing a private key.

DLEQs have several different applications in Bitcoin:

PODLEs in JoinMarket

The earliest use of PODLE, pronounced poodle, was in the JoinMarket
coinjoin implementation to allow a user (such as
Alice) to claim to control a UTXO without publicly revealing anything
about that UTXO.  If another user (such as Bob) wanted to coinjoin
with that UTXO, Alice could prove to him only that she actually owned
the claimed UTXO.  If Alice lied about owning the UTXO or attempted to
create multiple proofs for the same UTXO, Bob could prove to everyone
that she lied and other users would be less likely to interact with her
in the future.

PODLEs as used in JoinMarket take advantage of a property of schnorr
signature verification.  If the same private
key and the same private nonce are used to generate different public keys
and public nonces using different generators, the s value of a
signature that is valid for one key and nonce will also be valid for the
other key and nonce.

For example, Alice creates a private key (a large number) and derives
from it a Bitcoin public key in the normal way by multiplying the
private key by a specified elliptic curve point (called a
generator).  Alice also multiplies the same private key by a second
generator.  Alice then creates a private nonce (another large number)
and multiplies it by Bitcoin’s usual generator and the secondary
generator.  Then Alice commits to a message and creates an s value for
the combination of private key, private nonce, and message.  That same
s value will be valid for either the Bitcoin public key or the public
key created with the secondary generator.

When Alice announces to JoinMarket participants that she has a UTXO, she
provides the secondary public key (as a hash digest).  When Bob accepts
her offer, she provides him the details of her UTXO (including the
Bitcoin public key), the secondary public key (undigested),
both public nonces, and the s value that proves discrete log
equivalency.  If Bob’s verification succeeds, only he learns the
identity of Alice’s UTXO; if it fails, it can prove Alice lied.

DLEQ in silent payment signing

The output address for a silent payment is
created using elliptic curve diffie-hellman (ECDH) which
involves computing values using private keys.  When several private keys
are involved that belong to independent signers, it’s possible for one
signer to include a correct signature but an incorrect value for the
output address.  This will lead to the destruction of money as it is
sent to an output that cannot be spent by the receiver.

The method for creating a secondary public key in PODLE (described
previously) is functionally the same as creating an ECDH key, so a very
similar protocol is used to create DLEQs for silent payments.  These
DLEQs only need to be shared from one signer of a transaction to the
other signers.  Each signer can verify that every other signer produced
a correct ECDH value without any of the signers needing to share their
private keys.

Primary code and documentation


  P(o)ODLE
  Proposed DLEQ BIP


Optech newsletter and website mentions

2025

  BIPs #1758 updates BIP374 to prevent potential leakage of the private key
  BIPs #1687 adds BIP375 to specify sending DLEQs for multi-signer silent payments using PSBT
  BIPs #1689 merges BIP374 to specify a standard way to generate and verify DLEQs


2024

  Draft BIP for DLEQ proofs
  Continued discussion of PSBTs for silent payments with DLEQ proofs to verify correct ECDH generation


2021

  C-Lightning #4410 updates to latest dual-funding specification draft, which no longer uses PODLE
  New proposal to prevent UTXO probing in LN dual funding compared to PODLE


2020

  Analysis of proposal to use PODLE in dual-funded LN channels
  
    PODLE proposed for use in dual-funded LN channels

    
  




Previous Topic:Discreet Log Contracts (DLCs)




Next Topic:Dual funding



Edit page
  Report Issue

## Related Topics

- topics ()
- coinjoin (coinjoin)
- schnorr
signature (schnorr-signatures)
- silent payment (silent-payments)
- Discreet Log Contracts (DLCs) (discreet-log-contracts)
- Dual funding (dual-funding)
