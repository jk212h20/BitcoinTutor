# Generic signmessage

/ home / topics / 


    Generic signmessage
    
  

  
    




Also covering Signmessage and BIP322

Generic signmessage is a method that allows wallets to sign or partially sign a message for any script from which they could conceivably spend.

The BIP322 generic signed message format allows a wallet to sign
a text string by producing a
signature for a virtual Bitcoin transaction.  This means a signed message can
be produced for any script or address that a wallet would be able to
spend.  Additionally, two or more wallets can cooperate to create a
BIP322 signed message for multisig scripts.

When signing for legacy P2PKH addresses, BIP322 instead uses the
traditional signmessage format that was first implemented in an
early version of the Bitcoin software, making the proposal backwards
compatible with existing software that verifies signed messages for
P2PKH addresses.

Primary code and documentation


  BIP322
  Bitcoin Core PR#16440


Optech newsletter and website mentions

2025

  Bitcoin Knots 28.1 adds support for BIP322 generic signmessage


2023

  Sparrow 1.7.8 adds support for BIP322 generic signmessage


2022

  Proposed BIP for multiformat single-sig message signing
  BIPs #1279 updates BIP322 with clarifications and test vectors


2021

  Preparing for taproot: generic signmessage still needed
  BIPs #1048 rewrites BIP322 to simplify implementation
  Proposed rewrite of BIP322 to simplify implementation


2020

  2020 year in review: generic signmessage
  BIP322 updated to use virtual transactions
  Alternative proposal for generic signmessage using virtual transactions
  Simplified BIP322, only allowing signatures from one script per proof
  Proposed update to BIP322 generic signmessage
  Additional request for feedback on BIP322 generic signmessage


2019

  Bitcoin Core PR opened for BIP322 signmessage support
  Searching for a bech32 signmessage format


2018

  2018 year-in-review: initial discussion that became BIP322
  
    BIP322 proposed

    
  




Previous Topic:Gap limits




Next Topic:HD key generation



Edit page
  Report Issue

## Related Topics

- topics ()
- Gap limits (gap-limits)
- HD key generation (hd-key-generation)
