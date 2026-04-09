# Vaults

/ home / topics / 


    Vaults
    
  

  
    




Vault are a type of covenant that require two separate transactions to appear in two different blocks in order for a user to spend money from their wallet.  The first transaction signals that someone is attempting to spend the money and gives the user a chance to block the second transaction that completes the spend.

A vault protocol specifies a minimum amount of time or number of blocks that
must pass between the two transactions, giving the user that amount of
time to notice if someone stole their private key and is attempting to
steal their money.  If the user detects the theft attempt, most vault
designs also allow the user to either send the money to a safe address
that uses a more secure script or to permanently destroy the money
to prevent the thief from profiting from their attack.

Some vault designs rely on covenants that require
consensus changes to Bitcoin.  Other vault designs use existing
protocol features plus techniques such as signing transactions long
in advance of needing them and then destroying the means to sign
alternative transactions (either by securely deleting the signing key
or by using multisig to ensure multiple independent keys would need to
be compromised).

Primary code and documentation


  Möser-Eyal-Sirer vault proposal
  Vaults using OP_CHECKSIGFROMSTACK and OP_CAT
  Vaults without changing Bitcoin consensus rules
  Custody Protocols Using Bitcoin Vaults


Optech newsletter and website mentions

2025

  Comparison of vaults created with presigned transactinos, CTV, or other methods
  Brainstorming how to use output script descriptors for CTV-style vaults
  Proposed CTV enhancement opcodes for more flexible vaults and accountable computing


2024

  BIPs #1421 adds BIP345 for the OP_VAULT opcode and related consensus changes
  Simple vault prototype using OP_CAT and schnorr signatures


2023

  Discussion about storing vault-related data in taproot annexes
  Analysis of alternative design for OP_VAULT using MATT-style covenants
  Proposal for alternative design for OP_VAULT inspired by OP_TLUV
  Draft BIP available for OP_VAULT and OP_UNVAULT opcodes
  Proposal for OP_VAULT and OP_UNVAULT opcodes


2022

  Proposal to use simple vaults as one benchmark for comparing different covenant designs
  Design and code for a CTV-based vault


2021

  Should vaults always have a cooperative taproot keypath spend?
  OP_TAPLEAF_UPDATE_VERIFY opcode proposed that would simplify some vault designs
  Updating vaults for taproot
  Using schnorr signatures plus OP_CAT to create vaults
  Making hardware wallets compatible with advanced features, like vaults


2020

  2020 year in review: vaults
  Service proposed for storing presigned vault transactions
  Presentation of the Revault multiparty vault architecture
  Revault: an implementation of multiparty vaults
  Vault prototype written in Python
  OP_CHECKTEMPLATEVERIFY (CTV) workshop discussion: using CTV with vaults


2019

  2019 year-in-review: vaults without covenants
  Bitcoin vaults without covenants & weaknesses in previous vault proposals


See also


  Python-vaults
  Revault multiparty vaults demo
  Bitcoin-vault
  
    Covenants

    
  




Previous Topic:V3 commitments




Next Topic:Version 3 transaction relay



Edit page
  Report Issue

## Related Topics

- topics ()
- covenants (covenants)
- V3 commitments (v3-commitments)
- Version 3 transaction relay (version-3-transaction-relay)
