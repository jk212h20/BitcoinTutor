# LNURL

/ home / topics / 


    LNURL
    
  

  
    




Also covering Lightning Addresses

LNURL is a set of protocols for communicating information using URLs and HTTPS.  Perhaps the most common use of LNURL is transferring BOLT11 invoices.  A related protocol is Lightning Addresses which allow transforming a static identifier that looks like an RFC822 email address into a BOLT11 invoice.

An upside of LNURL is their flexibility and use of widely understood
HTTP: a web developer can use their existing skills to interact with LN
clients.  This allows web developers to handle business logic on the web
side of their application and only use a LN node to send and receive
payments.  It also makes it easy for web developers to use LN node
capabilities in new and interesting ways, such as LNURL-based
authentication.

A downside of LNURL is that hosted LNURL services may learn information
about their users’ payments and other actions.  For example, many
Lightning Addresses are managed by centralized services that have the
capability to intercept payments and potentially track how much a user
receives through their Lightning Address.  For this reason, alternatives
to LNURL or additional layers on top of it have been proposed.

Primary code and documentation


  LNURL Documents (LUDs)


Optech newsletter and website mentions

2023

  Discussion about offers-compatible Lightning addresses


2022

  BTCPay Server #3709 adds support for pull payments to be received via a LNURL withdraw
  Large size of blinded paths may make them dependent on invoice protocols like LNURL or offers
  Dicussion about how to make LNURL and offers compatible
  C-Lightning #5121 updates its invoice RPC for improved LNURL compatibility
  BTCPay Server #3083 allows administrators to log in using LNURL authentication


2021

  Lightning Address identifiers announced based on LNURL
  Stacker News launched with LNURL authentication
  Phoenix v1.4.12 adds support for the LNURL-pay protocol
  Discussion about a BIP70 replacement, including a version that works with LNURL


See also


  
    Offers

    
  




Previous Topic:LN-Penalty




Next Topic:Low-r grinding



Edit page
  Report Issue

## Related Topics

- topics ()
- Offers (offers)
- LN-Penalty (ln-penalty)
- Low-r grinding (low-r-grinding)
