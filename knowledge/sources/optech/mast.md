# MAST

/ home / topics / 


    MAST
    
  

  
    




MAST is a method of using a merkle tree to store the various user-selected conditions that must be fulfilled in order for the encumbered bitcoins to be spent.  Using a merkle tree allows the spender to select which one of the conditions they’ll fulfill without having to reveal the details of other conditions to the block chain.

Users of MAST who are able to keep unused conditions off of the block
chain will enjoy lower fees, be able to create larger contracts than
currently possible, will have improved privacy, and will improve the
fungibility of their bitcoins.

MAST has been discussed generically in Bitcoin since 2013 and there
have been several concrete proposals to add it to Bitcoin:


  ● BIP114 OP_MAST
  ● BIP116 OP_MERKLEBRANCHVERIFY and BIP117 tail call execution semantics
  ● bip-taproot’s merkle tree


In November 2021, MAST was added to Bitcoin as part of the
taproot soft fork.

Note: the abbreviation MAST originally stood for Merklized Abstract
Syntax Trees as proposed by Russell
O’Connor based on merkle trees and abstract syntax trees.
Subsequent proposals no longer use anything like abstract syntax trees
but people continued to use the name “MAST” for them, leading Anthony
Towns to propose the backronym Merklized
Alternative Script Trees.

Primary code and documentation


  BIP114
  BIP116
  BIP117
  bip-taproot


Optech newsletter and website mentions

2020

  What are Merklized Alternative Script Trees?
  Discussion about the evolution of MAST (and other things) into taproot
  Discussion about taproot versus alternative MAST-enabling proposals


2019

  Overview of Taproot and it’s MAST-based encumbrances
  It should be possible to upgrade miniscript for things like MAST
  Should OP_CODESEPARATOR be disabled in MAST scripts?


2018

  Taproot: an optimization for MAST


See also


  
    Taproot

    
  




Previous Topic:Low-r grinding




Next Topic:MATT



Edit page
  Report Issue

## Related Topics

- topics ()
- taproot (taproot)
- Low-r grinding (low-r-grinding)
- MATT (matt)
