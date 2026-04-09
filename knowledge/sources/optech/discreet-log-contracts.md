# Discreet Log Contracts (DLCs)

/ home / topics / 


    Discreet Log Contracts (DLCs)
    
  

  
    




Discreet Log Contracts (DLCs) are a contract protocol where two or more parties agree to exchange money dependent on the outcome of a certain event as determined by an oracle (or several oracles). After the event happens, the oracle publishes a commitment to the outcome of the event that the winning party can use to claim their funds. The oracle doesn’t need to know the terms of the contract (or even that a contract was made).

The transactions creating and settling the contract can be made
indistinguishable from many other Bitcoin transactions or they can be
executed within an LN channel. This makes DLCs more private and
efficient than other known oracle-based contract methods.
Additionally, DLCs are arguably more secure than earlier oracle-based
methods because an oracle that commits to a false result
generates clear evidence of fraud.

The original DLC construction was specific to schnorr
signatures.  Later, a version was developed
to use signature adaptors that are
compatible with Bitcoin’s existing ECDSA signature scheme.

Note on spelling: the name is a play on the discrete log
problem, which gives the protocol its security, and DLC’s
enhanced privacy making the contracts more discreet.  The spelling
used by the idea’s original author and the DLC interoperability
specification is discreet log contracts.

Primary code and documentation


  Discreet log contracts (original paper)
  Introduction to discreet log contracts
  Discreet Log Contract Interoperability Specification


Optech newsletter and website mentions

2025

  Summary and criticism of CTV + CSFS benefits for discreet log contracts (DLCs)
  Offchain DLCs: DLC channels compared to DLC factories
  Offchain DLCs


2024

  Lava Loans: DLC-based loan contract execution


2023

  Wallet 10101 allows pooling funds between LN and DLCs
  Proposal for vault-enabling opcodes could also make DLCs much more efficient


2022

  Using Bitcoin-compatible BLS signatures for DLCs
  Discussion about how CTV or other covenant features could make DLCs much more efficient


2021

  Mailing list post about DLCs over LN
  Discussion about DLC specification breaking changes
  Alpha release of Suredbits’s DLC wallet
  Discussion of fraud proofs in DLC v0 specification
  New mailing list for discussion of DLC protocol development


2020

  2020 year-in-review: four compatible implementations of DLCs
  Beta application announced for creating test DLC derivatives
  Drafting of an interoperability specification for DLCs


See also


  
    Signature adaptors

    
  




Previous Topic:Difficulty adjustment algorithms




Next Topic:Discrete log equivalency (DLEQ)



Edit page
  Report Issue

## Related Topics

- topics ()
- schnorr
signatures (schnorr-signatures)
- signature adaptors (adaptor-signatures)
- Difficulty adjustment algorithms (difficulty-adjustment-algorithms)
- Discrete log equivalency (DLEQ) (discrete-log-equivalency)
