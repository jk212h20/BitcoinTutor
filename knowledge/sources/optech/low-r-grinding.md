# Low-r grinding

/ home / topics / 


    Low-r grinding
    
  

  
    




Also covering Signature grinding

Low-r grinding is an optimization for wallets where they keep generating new ECDSA signatures for the same transaction until the find a signature whose r value is on the lower half of the range, allowing it to be encoded with one fewer byte than a signature on the top half of the range.

This optimization only applies to legacy and segwit v0 transactions
where ECDSA is used.  Signatures in taproot
transactions can’t be made any shorter.

Roughly half of all ECDSA transactions are expected to have high-r
values and roughly half are expect to have low-r values, so grinding
saves an average of 0.5 vbytes per signature in legacy transactions and
0.125 vbytes in segwit v0 transactions.

Optech newsletter and website mentions

2025

  BOLTs #1243 updates BOLT11 to specify handling of low-r signatures on invoices


2022

  BDK #779 adds support for creating low-r signatures
  LDK #1388 adds default support for creating low-r signatures


2019

  C-Lightning #3220 begins always creating signatures with a low r value


2018

  Bitcoin Core wallet to begin only creating low-r signatures


See also


  
    What is signature grinding?

    
  




Previous Topic:LNURL




Next Topic:MAST



Edit page
  Report Issue

## Related Topics

- topics ()
- taproot (taproot)
- LNURL (lnurl)
- MAST (mast)
