# Covenants

/ home / topics / 


    Covenants
    
  

  
    




Covenants are a category of proposed changes to Bitcoin’s consensus rules that would allow a script to prevent an authorized spender from spending to certain other scripts.


  “In the context of Bitcoin, the most useful definition of
covenant is that it’s when the scriptPubKey of a UTXO restricts the
scriptPubKey in the output(s) of a tx spending that UTXO.”  —Anthony
Towns (source)


For example, a covenant may normally only allow spending to a
whitelisted set of scripts, such as returning bitcoins to the user’s own
balance or spending to a staging address that only allows spending to
any arbitrary address after a period of time.

Primary code and documentation


  Enhancing Bitcoin transactions with covenants


Optech newsletter and website mentions

2026

  Using the Bitcoin PIPEs v2 offchain protocol to enforce covenant-like spending conditions


2025

  Suggestion for opcodes to enable recursive covenants through quines
  Request for a covenant to fairly distribute rewards in the Braidpool decentralized mining pool


2024

  Poll on developer opinions about selected covenant proposals
  Oracle-assisted and slashing-based pseudo-covenants
  Idea to add covenants to Bitcoin without consensus changes using hash grinding
  Idea to add covenants to Bitcoin without consensus changes using functional encryption


2023

  HTLC aggregation with covenants
  Research into minimal opcodes for output script introspection to enable covenants
  Draft BIP specification for OP_TXHASH proposed
  Using covenants like OP_CTV and APO to improve LN scalability
  Mashup of OP_CTV and APO proposed using OP_CSFS and OP_TXHASH
  Proposed joinpool construction for Ark could be less interactive with covenants
  Analysis of alternative design for OP_VAULT using MATT-style covenants
  Proposal for alternative design for OP_VAULT inspired by OP_TLUV
  Proposal for OP_VAULT and OP_UNVAULT opcodes to enable convenant-based valuts


2022

  Proposal to use covenants and merkle trees to enable generalized smart contracts
  Discussion about Miner Extractable Value (MEV) risk from recursive covenants
  When would enabling OP_CAT allow recursive covenants?
  Updated OP_TX opcode useful for constructing covenants
  Discussion about the risks of allowing recursive covenants
  Proposed OP_EVICT opcode to make covenants more efficient
  Proposal for composable OP_TX opcode useful for constructing covenants


2021

  OP_TAPLEAF_UPDATE_VERIFY opcode proposed with a taproot-native covenant design
  Replicating the OP_CSFS covenant-enabling opcode with OP_CAT and schnorr signatures


2020

  Discussion about how Simplicity could be used for covenants
  Demo implementation of a multisig vaults covenant prototype
  Vault prototype using pre-signed transactions
  OP_CHECKTEMPLATEVERIFY workshop report


2019

  2019 year-in-review: OP_CHECKTEMPLATEVERIFY
  Suggested changes to OP_CHECKTEMPLATEVERIFY proposal
  OP_CHECKOUTPUTSHASHVERIFY renamed OP_CHECKTEMPLATEVERIFY and updated
  Bitcoin vaults without covenants
  CoreDev.tech discussion: potential script changes
  New proposed opcode: OP_CHECKOUTPUTSHASHVERIFY


2018

  Scaling Bitcoin Tokyo 2018, Script Roundtable: OP_CHECKSIGFROMSTACK


See also


  An early description of covenants in Bitcoin
  OP_CHECKSIGFROMSTACK
  OP_CHECKTEMPLATEVERIFY
  SIGHASH_ANYPREVOUT
  
    Vaults

    
  




Previous Topic:Countersign




Next Topic:CPFP carve out



Edit page
  Report Issue

## Related Topics

- topics ()
- OP_CHECKSIGFROMSTACK (op_checksigfromstack)
- OP_CHECKTEMPLATEVERIFY (op_checktemplateverify)
- SIGHASH_ANYPREVOUT (sighash_anyprevout)
- Vaults (vaults)
- Countersign (countersign)
- CPFP carve out (cpfp-carve-out)
