# Just-In-Time (JIT) channels

/ home / topics / 


    Just-In-Time (JIT) channels
    
  

  
    




JIT channels are virtual LN channels hosted by a service provider. When the first payment to the channel is received, the service provider creates a funding transaction and adds the payment to it, creating a normal channel.  This allows new user to begin receiving funds over LN immediately.

JIT channels should not be confused with JIT routing, which is a technique for rebalancing existing channels to
allow accepting payments that might naively need to be rejected.

Primary code and documentation


  LSPS2: JIT channel negotiation


Optech newsletter and website mentions

2024

  BLIPs #25 allows accepting underfunded HTLCs in support of JIT channel creation


2023

  LDK #2715 allows accepting underfunded HTLCs in support of JIT channel creation
  LDK #2319 allows underfunding HTLCs in support of JIT channel creation
  Proposal to extend BOLT11 invoices to allow requesting prepayment for submarine swaps
  Request for feedback on proposed specifications for LSPs, including LSPS2: JIT channels


2022

  
    LDK #1835 adds a SCID namespace for intercepted HTLCs allowing LSPs to open a JIT channel

    
  




Previous Topic:Inbound forwarding fees




Next Topic:Just-in-time (JIT) routing



Edit page
  Report Issue

## Related Topics

- topics ()
- JIT routing (jit-routing)
- Inbound forwarding fees (inbound-forwarding-fees)
