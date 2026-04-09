# Coinswap

/ home / topics / 


    Coinswap
    
  

  
    




Coinswap is a protocol that allows two or more users to create a set of transactions that look like independent payments but which actually swap their coins with each other, optionally making a payment in the process. This improves the privacy of not just the coinswap users but all Bitcoin users, as anything that looks like a payment could have instead been a coinswap.

Coinswaps are often compared to coinjoins.  The most
obvious difference is that a coinjoin uses a single transaction but a
coinswap uses two or more transactions.  Although it’s possible for a
coinjoin to look like payment batching,
they can be fairly easy to identify onchain—and some Bitcoin exchanges
have refused to accept coins with a recent history of coinjoining.
Coinswaps look like payments, so they may be harder to discriminate
against.  Coinswaps may also be performed across different block
chains—often under the name atomic swap—but that’s not possible
with a coinjoin.

To ensure that coinswaps either successfully swap funds or any
unswapped funds are refunded, they need to use a locking mechanism
such as an HTLC or a PTLC.

Primary code and documentation


  Original idea for coinswap
  Design for a coinswap implementation


Optech newsletter and website mentions

2025

  Coinswap v0.1.0 released with support for testnet4


2022

  Teleport Transactions 0.1 implements routable coinswaps


2020

  2020 year-in-review: succinct atomic swaps
  2020 year-in-review: routed coinswap discussion and implementation
  Continued coinswap discussion focused on potential weaknesses
  Discussion about routed coinswaps
  Presentation about succinct atomic swaps
  Presentation about coinswaps
  Design for a coinswap implementation
  Two-transaction cross chain atomic swap or same-chain coinswap


2018

  Talk about using schnorr signatures for blind coinswaps


See also


  Coinjoin
  HTLCs
  PTLCs
  
    Submarine swaps

    
  




Previous Topic:Coinjoin




Next Topic:Compact block filters



Edit page
  Report Issue

## Related Topics

- topics ()
- coinjoins (coinjoin)
- payment batching (payment-batching)
- HTLC (htlc)
- PTLC (ptlc)
- Submarine swaps (submarine-swaps)
- Compact block filters (compact-block-filters)
