# Cross-input signature aggregation (CISA)

/ home / topics / 


    Cross-input signature aggregation (CISA)
    
  

  
    




Also covering Half aggregation

Cross-input signature aggregation (CISA) is a proposal to reduce the number of signatures a transaction requires.  In theory, every signature required to make a transaction valid could be combined into a single signature that covers the whole transaction.

For example, Alice controls two P2TR UTXOs.  Normally,
if she creates a transaction spending both UTXOs with a keypath spend,
she’ll need to include one 16-vbyte signature in each output.  However,
any node could aggregate both public keys from the UTXOs and Alice could
produce a single 16-vbyte MuSig-style scriptless
multisigature that corresponded to the aggregate
public key, proving that she controlled the private key for both of the
original public keys.

Although inputs would still need to include a significant amount of
other data, such as the 36-vbyte outpoint that uniquely identifies the
UTXO being spent, CISA could provide a modest reduction in the size of
transactions with multiple inputs.  It could make the per-participant
transaction fees for a coinjoin moderately cheaper than each
participant creating a transaction on their own, which could lead to
more people using coinjoin-style privacy.

Primary code and documentation


  Cross-input signature aggregation research repository


Optech newsletter and website mentions

2025

  DahLIAS interactive aggregate signatures for secp256k1
  Interplay between CISA and Musig1 interactive aggregated signature


2024

  Notes from Bitcoin developer discussion about CISA


2022

  Draft BIP about half aggregation of BIP340 schnorr signatures


2021

  Question: why does signature aggregation interefer with signature adaptors?


2019

  Taproot to not include cross-input signature aggregation


See also


  Schnorr signatures
  
    BLS signatures

    
  




Previous Topic:Child pays for parent (CPFP)




Next Topic:CVE-2018-17144



Edit page
  Report Issue

## Related Topics

- topics ()
- P2TR (taproot)
- MuSig (musig)
- scriptless
multisigature (multisignature)
- coinjoin (coinjoin)
- Schnorr signatures (schnorr-signatures)
- BLS signatures (bls-signatures)
- Child pays for parent (CPFP) (cpfp)
- CVE-2018-17144 (cve-2018-17144)
