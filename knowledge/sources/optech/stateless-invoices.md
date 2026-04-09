# Stateless invoices

/ home / topics / 


    Stateless invoices
    
  

  
    




Stateless invoices are LN invoices whose payment preimage is generated deterministically from payment metadata.  This allows the receiver of a payment to avoid storing any data about the invoice until the spender submits a copy of the metadata along with the payment.



  This topic description is a stub.  We would welcome a pull
request
providing more background information about the topic.


Primary code and documentation


  Stateless invoices with proof-of-payment


Optech newsletter and website mentions

2023

  LDK #1878 encodes CLTV delta in payment secret for its stateless invoices


2022

  2022 year-in-review: stateless invoices
  LND #5810 implements sending support for payment metadata
  Core Lightning #5068 adds payer-side support for stateless invoices
  LDK #1199 uses stateless invoices to allow phantom node payments
  Eclair #2063 adds support for the new option_payment_metadata invoice field
  BOLTs #912 adds a new optional field to BOLT11 invoices to enable stateless payments
  Rust-Lightning #1177 implements stateless payments using the payment secret field


2021

  Stateless invoices to avoid tracking unused payment requests


See also


  
    Offers

    
  




Previous Topic:Statechains




Next Topic:Static channel backups



Edit page
  Report Issue

## Related Topics

- topics ()
- Offers (offers)
- Statechains (statechains)
- Static channel backups (static-channel-backups)
