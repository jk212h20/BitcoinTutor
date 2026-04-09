# Utreexo

/ home / topics / 


    Utreexo
    
  

  
    




Utreexo is a proposed alternative to the UTXO set for allowing full nodes to obtain and verify information about the UTXOs being spent in a transaction.

A merkle tree updated after every block accumulates references to
every unspent transaction output, allowing nodes to skip storing the
outputs themselves.  New transactions can be distributed with the
UTXOs they spend and a merkle branch proving they’re part of the
utreexo merkle tree.  Overall, this can decrease the amount of storage
full nodes need to a minimal amount at the cost of modest increases in
bandwidth.  Utreexo would not change Bitcoin’s security model.

Primary code and documentation


  Utreexo: A dynamic hash-based accumulator optimized for the Bitcoin UTXO set


Optech newsletter and website mentions

2025

  Draft BIPs published with specifications for Utreexo accumulator, validation, and P2P protocol
  Discussion of alternatives to Utreexo for proving UTXO existence without a UTXO set
  SwiftSync faster sync allows parallel block validation, similar to Utreexo
  Utreexo might make it easier to manage a DAG-style blockchain


2024

  Release of utreexod beta


2023

  Libflorestra library announced for using utreexo in applications
  ZeroSync protocol which uses a variation of utreexo
  Service bit for Utreexo


2022

  Launch of ZeroSync project using Utreexo


2019

  Utreexo Q&A session at CoreDev.Tech
  Exploring accumulators


2018

  CoreDev.Tech summaries: Utreexo


See also


  
    Uneconomical outputs

    
  




Previous Topic:Uneconomical outputs




Next Topic:Version 2 P2P transport



Edit page
  Report Issue

## Related Topics

- topics ()
- Uneconomical outputs (uneconomical-outputs)
- Version 2 P2P transport (v2-p2p-transport)
