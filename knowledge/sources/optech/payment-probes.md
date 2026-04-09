# Payment probes

/ home / topics / 


    Payment probes
    
  

  
    




Also covering Probing

Payment probes are packets designed to discover information about the LN channels they travel through, such as whether the channel can currently handle a payment of a certain size or how many bitcoins are allocated to each participant in the channel.  Probes use the regular payment (HTLC) mechanism but are designed to always fail, preventing any funds from being transfered.  Probing can be useful, but it can also reduce user privacy.



  This topic description is a stub.  We would welcome a pull
request
providing more background information about the topic.



Optech newsletter and website mentions

2024

  LDK #3103 begins using data collected from frequent probing in its testing benchmarks
  LND #8136 updates the EstimateRouteFee RPC to use payment probing


2023

  Dynamic Payment Switching and Splitting (PSS) proposed to thwart Balance Discovery Attacks
  LDK #2534 adds additional support for pre-payment probing


2022

  LDK #1567 adds support for a basic payment probing API
  LDK #1555 now slightly prefers paying through channels which make balance probing harder
  LN developer meeting summary: probing and balance sharing


2021

  Lowering the cost of probing to make attacks more expensive
  Preventing UTXO probing in dual funded channels


2020

  Upfront fees discussion and its ability to make probing more expensive
  Discussion about preventing UTXO probing in interactively constructed LN funding transactions


2019

  C-Lightning #3259 adds support for payment secrets designed to resist recipient probing
  BOLTs #608 provides a privacy update to BOLT4 to probe channels for the ultimate recipient
  Eclair


2018

  Making path probing more convenient


See also


  JIT routing
  
    Channel jamming attacks

    
  




Previous Topic:Payment batching




Next Topic:Payment secrets



Edit page
  Report Issue

## Related Topics

- topics ()
- JIT routing (jit-routing)
- Channel jamming attacks (channel-jamming-attacks)
- Payment batching (payment-batching)
- Payment secrets (payment-secrets)
