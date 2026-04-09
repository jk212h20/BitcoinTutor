# Payment secrets

/ home / topics / 


    Payment secrets
    
  

  
    




Payment secrets are extra data added to BOLT11 invoices that spenders include in their BOLT4 onion-encrypted payments.  This allows the receiver to only accept a payment from the intended spender, preventing a probing attack against the receiver when simplified multipath payments are being used.



  This topic description is a stub.  We would welcome a pull
request
providing more background information about the topic.


Primary code and documentation


  BOLT4
  BOLT11


Optech newsletter and website mentions

2025

  BOLTs #1242 makes payment secrets mandatory (and assumed to be enabled) for all BOLT11 invoices


2023

  LDK #2156 adds support for multipath keysend payments, which require payment secrets


2022

  Rust-Lightning #1177 uses the payment secret field to store encrypted invoice information


2021

  BOLTs #887 updates BOLT11 to require that spenders specify the payment secret
  C-Lightning #4646 makes payment secrets required
  LND #5336 allows non-interactive reuse of AMP invoices by changing the payment secret
  Eclair #1810 makes it mandatory for peers to signal and comply with the payment_secret feature
  Rust-Lightning #893 requires payment secrets to prevent multipath probing


2020

  LND #4752 prevents the node from releasing a local payment preimage without a payment secret
  CVE-2020-26896 could have been prevented by payment secrets


2019

  BOLTs #643 adds payment secrets to LN specification
  LND #3788 adds support for “payment addresses” (payment secrets)
  C-Lightning #3259 adds payment secrets to prevent multipath probing


See also


  
    Simplified multipath payments

    
  




Previous Topic:Payment probes




Next Topic:Peer storage



Edit page
  Report Issue

## Related Topics

- topics ()
- Simplified multipath payments (multipath-payments)
- Payment probes (payment-probes)
- Peer storage (peer-storage)
