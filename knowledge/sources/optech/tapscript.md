# Tapscript

/ home / topics / 


    Tapscript
    
  

  
    




Tapscript is the scripting language used for taproot script-path spends.

It shares most operations with legacy and segwit Bitcoin Script but
has a few differences:


  
    OP_CHECKMULTISIG and OP_CHECKMULTISIGVERIFY are replaced by a
OP_CHECKSIGADD opcode.
  
  
    Many previously disabled opcodes are redefined to be OP_SUCCESS opcodes that
unconditionally render the entire script valid to simplify soft fork
upgrades.
  
  
    Signature hashes are calculated differently than in legacy script or
BIP143 v0 segwit.
  


Primary code and documentation


  bip-tapscript


Optech newsletter and website mentions

2023

  Research showing effect of OP_SUCCESSx on covenants using output script introspection
  Description of tapscript signature malleability and proposed fix for SIGHASH_ANYPREVOUT


2022

  Discussion about lowering tapscript resource limits
  Question: why do invalid OP_CHECKSIGADD signatures fail their script?


2021

  Rust Bitcoin #644 adds support for tapscript’s new opcodes
  Bitcoin Core #21365 allows the wallet to create signatures for tapscript spends
  Using backup tapscript spending paths to recover from crypto breaks


2020

  2020 year in review: Taproot, tapscript, and schnorr signatures
  Bitcoin Core #19953 merged with consensus implementation of BIP342
  Bitcoin Core #16902 fixes an inefficiency in OP_IF related opcodes
  btcdeb adds tap command for experimenting with taproot and tapscript


2019

  2019 year-in-review: taproot and tapscript
  Discussion about position commitments using signature-checking opcodes
  Bitcoin Optech schnorr/taproot workshop
  Announcement of structured taproot review (including tapscript)
  Update on changes to schnorr, taproot, and tapscript
  Tapscript resource limits
  BIP322 signmessage forward compatibility
  Executive briefing: Taproot and Tapscript
  Overview of Taproot and Tapscript
  Extended summary of bip-taproot and bip-tapscript


See also


  
    Taproot

    
  




Previous Topic:Taproot




Next Topic:Testnet



Edit page
  Report Issue

## Related Topics

- topics ()
- Taproot (taproot)
- Testnet (testnet)
