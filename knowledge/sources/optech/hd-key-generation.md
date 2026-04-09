# HD key generation

/ home / topics / 


    HD key generation
    
  

  
    




Also covering BIP32 and HD wallets

HD key generation as specified in BIP32 allows securely creating an unlimited number of keypairs from a seed as small as 128 bits.  A wallet may also create extended pubkeys (xpubs) that allow external software to create new pubkeys for the wallet without learning the corresponding private keys.



  This topic description is a stub.  We would welcome a pull
request
providing more background information about the topic.


Primary code and documentation


  BIP32


Optech newsletter and website mentions

2025

  Chain code withholding to improve privacy when using co-signer services
  Proposed scheme to prevent BIP32 path reuse to avoid output linking and other problems


2024

  BIP328 added with a specifications BIP32-compatible MuSig2 key derivation
  Rust Bitcoin #2451 removes the requirement that an HD derivation path start with an m


2023

  ColdCard 6.0.0X adds support for BIP129 exchange of xpubs during multisig wallet set up
  Faster offline verification of BIP32 master seed backups


2022

  BIP proposed to allow multiple BIP32 derivation paths in a descriptor


2021

  Complications for HD wallet recovery in zero HTLC fee anchor outputs protocol
  No changes to BIP32 derivation needed to implement taproot receiving support
  Proposed BIP32 key derivation path for single-sig P2TR
  Bitcoin Core #22095 adds test to ensure BIP32 derived keys are correctly padded
  BIPs #1097 assigns BIP129 to proposal for exchange of xpubs during multisig wallet set up
  BIPs #1089 assigns BIP87 to proposal for standardized BIP32 paths for multisig wallets
  Closing lost LN channels with only a BIP32 seed
  Proposal for secure exchange of BIP32 xpubs during multisig wallet set up


2020

  Proposed BIP for BIP32 path templates
  BIPs #910 Assigns BIP85 to the Deterministic Entropy From BIP32 Keychains proposal
  Proposal for using one BIP32 keychain to seed multiple child keychains
  Question: why was the BIP32 fingerprint used for BIP174 PSBT?


2019

  Question: what is the max allowed depth for BIP32 derivation paths?
  Question about BIP32 extended pubkeys (xpubs) versus ypubs and zpubs
  BIPs #784 updates BIP174 PSBTs to include a BIP32 xpub
  Suggestion to include BIP32 derivation paths in BIP174 PSBTs


2018

  Bitcoin Core #14150 adds key origin support to descriptors for tracking BIP32 xpubs


See also


  
    Output script descriptors

    
  




Previous Topic:Generic signmessage




Next Topic:Hold invoices



Edit page
  Report Issue

## Related Topics

- topics ()
- Output script descriptors (output-script-descriptors)
- Generic signmessage (generic-signmessage)
- Hold invoices (hold-invoices)
