# Atomic multipath payments (AMPs)

/ home / topics / 


    Atomic multipath payments (AMPs)
    
  

  
    




Also covering AMP

Atomic Multipath Payments (AMPs), sometimes called Original AMP or OG AMP, allow a spender to pay multiple hashes all derived from the same preimage—a preimage the receiver can only reconstruct if they receive a sufficient number of shares.

Unlike Simplified Multipath Payments (SMP), this only
allows the receiver to accept a payment if they receive all of the
individual parts.  Each share using a different hash adds privacy by
preventing the separate payments from being automatically correlated
with each other by a third party.  The proposal’s downside is that the
spender selects all the preimages, so knowledge of the preimage doesn’t
provide cryptographic proof that they actually paid the receiver.

Both AMP and SMP allow splitting higher value HTLCs into multiple lower
value HTLCs that are more likely to
individually succeed, so a spender with sufficient liquidity can use
almost all of their funds at once no matter how many channels those
funds are split across.

Primary code and documentation


  Atomic Multipath Payments


Optech newsletter and website mentions

2021

  2021 year-in-review: atomic multipath payments
  LND 0.14.0-beta allows multiple spontaneous payments to the same AMP invoice
  LND #5803 allows multiple spontaneous payments to the same AMP invoice
  LND 0.13.0-beta allows receiving and sending payments using AMP
  LND #5336 adds the ability for users to reuse AMP invoices non-interactively
  LND #5253 adds support for Atomic Multipath Payment (AMP) invoices
  LND #5159 adds support for making spontaneous AMPs
  LND #5108 adds support for spontaneous multipath payments using AMP


2020

  LND #3957 adds code useful for Atomic Multipath Payments (AMP) support


2018

  LN protocol 1.1 goals: multipath payments


See also


  
    Simplified Multipath Payments (SMP)

    
  




Previous Topic:Async payments




Next Topic:Attributable failures



Edit page
  Report Issue

## Related Topics

- topics ()
- SMP (multipath-payments)
- Async payments (async-payments)
- Attributable failures (attributable-failures)
