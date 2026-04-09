# Annex

/ home / topics / 


    Annex
    
  

  
    




The taproot annex is an optional field in the witness structure of segwit v1 (taproot) inputs that currently has no defined purpose. If an annex is present, any taproot and tapscript signatures must commit to its value.

As of the implementation and activation of taproot, the annex was
reserved for future upgrades.  Transactions containing an annex were not
relayed or mined by default by Bitcoin Core.  There have been several
ideas for using the annex, as well as at least one attempt to define an
extensible data structure for the field.

Primary code and documentation


  BIP341: Taproot


Optech newsletter and website mentions

2025

  Proposed OP_TEMPLATEHASH would commit to transaction details, including annex
  Plan to begin relaying transactions with certain taproot annexes in Libre Relay


2024

  Suggestion to store fee-dependent timelock parameters in the taproot annex


2023

  Discussion about the taproot annex
  Bitcoin Inquisition #22 adds an -annexcarrier runtime option


See also


  
    Taproot

    
  




Previous Topic:Anchor outputs




Next Topic:Anonymity networks



Edit page
  Report Issue

## Related Topics

- topics ()
- Taproot (taproot)
- Anchor outputs (anchor-outputs)
- Anonymity networks (anonymity-networks)
