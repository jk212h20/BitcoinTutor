# Uneconomical outputs

/ home / topics / 


    Uneconomical outputs
    
  

  
    




Also covering Dust

Uneconomical outputs are transaction outputs that are worth less than the fees it will cost to spend them.  To prevent users from creating uneconomical outputs that will increase the size of the UTXO set,  Bitcoin Core and other nodes refuse to relay or mine transactions with outputs below a certain value, called the dust limit.

Terminology note: sometimes dust is used as a synonym for
uneconomical outputs or, more generically, low value outputs.  This
can create confusion, such as in the case of dust attacks which
involve amounts just barely above the dust limit.  Optech
recommends using uneconomical outputs for outputs that
aren’t worth the cost to spend them, reserving the term dust for
references specific to the dust limit.

Primary code and documentation


  Bitcoin Core dust limit code comment


Optech newsletter and website mentions

2026

  BOLTs #1301 recommends a higher dust_limit_satoshis for anchor channels


2025

  Proposal for removing uneconomical outputs from the stored UTXO set


2024

  Bitcoin Core PR Review Club about exempting ephemeral anchors from the dust limit
  LDK #3268 adds a more conservative fee estimation method for dust calculations


2023

  BOLTs #919 suggests LN nodes limit their maximum exposure to uneconomical HTLCs


2022

  Discussion about allowing uneconomical outputs that are part of a transaction package
  BDK #689 allows a wallet to create a transaction that violates the dust limit
  Question about problems removing uneconomical outputs from UTXO set


2021

  Discussion about removing the dust limit for one particular case
  Bitcoin Core #22863 documents P2TR dust amount
  BOLTs #894 specifies various checks related to uneconomical payments in LN
  Multiple implementations of LN vulnerable to uneconomical spending CVEs
  Multiple implementations of BOLTs #894 which allow using a lower commitment tx dust limit
  Rust-Lightning #1009 adds a max_dust_htlc_exposure_msat channel configuration option
  Discussion about removing the dust limit


2020

  LND #3809 adds a force parameter to the BumpFee RPC so that it can spend uneconomical UTXOs


2019

  Question: how was the dust limit chosen?
  Question: how does LN handle dust and uneconomical payments?


See also


  Dust attacks (output linking)
  
    Ephemeral anchors

    
  




Previous Topic:Unannounced channels




Next Topic:Utreexo



Edit page
  Report Issue

## Related Topics

- topics ()
- dust attacks (output-linking)
- Ephemeral anchors (ephemeral-anchors)
- Unannounced channels (unannounced-channels)
- Utreexo (utreexo)
