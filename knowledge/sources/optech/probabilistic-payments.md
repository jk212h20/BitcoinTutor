# Probabilistic payments

/ home / topics / 


    Probabilistic payments
    
  

  
    




Probabilistic payments are outputs that allow a pseudorandom function to decide which of n parties will be able to spend the funds.

For example, Alice and Bob each deposit 1 BTC into a contract that pays
one of them the full amount based on the result of a cryptographically fair
coin flip.

A particular focus of attention for probabilistic payments in Bitcoin is
for trustless micropayments.  For example, Alice wants to pay Bob 1 sat,
but that would be uneconomical because it
will cost several hundred sats for Alice to create the payment and for
Bob to later spend it.  Instead, Alice offers Bob 10,000 sats with a
0.01% probability.  On average, that’s equivalent to him receiving 1
sat.

Probabilistic micropayments have been proposed as an alternative for
trimmed HTLCs.

Primary code and documentation


  Electronic Lottery Tickets as Micropayments (1997)
  Sustainable nanopayment idea: Probabilistic Payments


Optech newsletter and website mentions

2025

  Probabilistic payments using different hash functions as an xor function
  
    Emulating OP_RAND

    
  




Previous Topic:Pooled mining




Next Topic:Proof of payment



Edit page
  Report Issue

## Related Topics

- topics ()
- uneconomical (uneconomical-outputs)
- trimmed HTLCs (trimmed-htlc)
- Pooled mining (pooled-mining)
- Proof of payment (proof-of-payment)
