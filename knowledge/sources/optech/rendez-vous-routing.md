# Rendez-vous routing

/ home / topics / 


    Rendez-vous routing
    
  

  
    




Also covering Hidden destinations, Blinded paths, and Route blinding

Rendez-vous routing, hidden destinations, and blinded paths are names for techniques that allow an LN node to send a payment to an unannounced node without learning where that node is in the network topology or what channels it shares with other nodes.



  This topic description is a stub.  We would welcome a pull
request
providing more background information about the topic.


Primary code and documentation


  Route blinding


Optech newsletter and website mentions

2025

  Eclair #2993 allows the recipient to pay fees associated with the blinded portion of a path


2024

  BLIPs #39 adds BLIP39 for an optional field b in BOLT11 invoices to communicate a blinded path
  LND #8735 and #8764 improve LND’s support for blinded paths, including for multipath
  Proposed BLIP for adding a blinded path field to BOLT11 invoices
  Eclair #2867 defines an encoded node ID to use to identify mobile wallets in blinded paths
  LDK #3080 allows creating either compact or regular binded paths
  LND #8159 and #8160 add experimental support for sending payments to blinded routes
  Eclair #2811 allows trampoline payments to use a blinded path for the ultimate receiver
  LDK #2791, #2801, and #2812 complete adding support for route blinding
  LND #8095 and #8142 add additional logic to parts of LND’s codebase for handling binded paths
  LDK #2781 and #2688 update support for sending and receiving blinded payments


2023

  LND #7267 makes it possible to create routes to blinded paths
  LDK #2413 adds support for sending and receving payments with blinded paths
  LDK #2411 and #2412 add an API for constructing payment paths for blinded payments
  LND #7710 adds the ability to retrieve extra data about an HTLC in support of route blinding
  LDK #2120 adds support for finding a route to a receiver who is using blinded paths
  BOLTs #765 adds route blinding to the LN specification
  Eclair #2482 allows sending payments using blinded routes


2022

  Core Lightning #5646 adds support for forwarding blinded payments
  Eclair #2418 and #2408 add support for receiving payments sent with blinded routes
  Eclair #2253 adds support for relaying blinded payments
  Discussion about the need for LNURL or offers for effective blinded paths


2020

  C-Lightning #3623 adds a minimal implementation for spending payments using blinded paths
  C-Lightning #3600 adds experimental support for onion messages using blinded paths
  Decoy nodes and lightweight rendez-vous routing (blinded paths)


2018

  Lightning Network protocol 1.1 goals: hidden destinations


See also


  Unannounced channels
  Onion messages
  
    Offers

    
  




Previous Topic:Redundant overpayments




Next Topic:Replace-by-fee (RBF)



Edit page
  Report Issue

## Related Topics

- topics ()
- Unannounced channels (unannounced-channels)
- Onion messages (onion-messages)
- Offers (offers)
- Redundant overpayments (redundant-overpayments)
- Replace-by-fee (RBF) (replace-by-fee)
