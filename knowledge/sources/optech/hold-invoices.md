# Hold invoices

/ home / topics / 


    Hold invoices
    
  

  
    




Hold invoices are LN invoices where the receiver doesn’t immediately release the preimage upon receiving a payment.  Instead, the receiver performs some action and then either accepts the payment, explicitly rejects it, or lets it time out.

For example, Alice could automatically generate hold invoices on her
website but wait until a customer actually paid before searching her
inventory for the requested item.  This would give her a chance to
cancel the payment if she couldn’t deliver.

Hold invoices are sometimes spelled “hodl invoices.”

Primary code and documentation


  Hold invoices


Optech newsletter and website mentions

2025

  Protocol proposed for hold fees that could make hold invoices sustainable


2020

  Discussion about bi-directional fees to allow charging for hold invoices
  Zap 0.7.0 Beta adds support for hold invoices
  Reverse up-front payments could improve hold invoice cost spreading


2019

  LND #3390 simplifies hold invoice logic by separate HTLC tracking
  C-Lightning #2540 adds hook allowing plugins to implement hold invoices
  LND #2022 merged adding support for hold invoices


See also


  
    Channel jamming attacks

    
  




Previous Topic:HD key generation




Next Topic:HTLC endorsement



Edit page
  Report Issue

## Related Topics

- topics ()
- Channel jamming attacks (channel-jamming-attacks)
- HD key generation (hd-key-generation)
- HTLC endorsement (htlc-endorsement)
