# Onion messages

/ home / topics / 


    Onion messages
    
  

  
    




Onion messages are messages that can be sent across the LN network by nodes that support the protocol.  Messages don’t use HTLCs, minimizing the use of LN node resources.



  This topic description is a stub.  We would welcome a pull
request
providing more background information about the topic.


Primary code and documentation


  Onion message support


Optech newsletter and website mentions

2025

  Discussion about separating onion message relay from HTLC relay


2024

  Eclair #2865 enables waking up a disconnected mobile peer for async payments or onion messages
  Discussion of onion denial-of-service risk with proposed mitigations
  Core Lightning #7455 makes multiple changes to its onion message defaults
  BOLTs #1173 makes the channel_update field optional in failure onion messages
  Eclair #2854 and LDK #3083 implement BOLTs #1163 to make message delivery failures more private
  BLIPs #32 adds BLIP32 describing DNS-based payment instructions with onion messages
  CLN #7304 adds support for direct peer connections for message relay
  LDK #2973 adds support for intercepting onion messages to facilitate async payments
  LDK #2723 adds support for sending onion messages using direct connections


2023

  BOLTs #759 adds support for onion messages to the LN specification
  LDK #2294 adds support for replying to onion messages


2022

  2022 year-in-review: onion messages
  LDK #1652 adds support for onion message reply paths
  LDK #1503 adds support for onion messages
  Proposals to either rate limit or charge for onion messages
  Proposal to charge for onion message bandwidth
  Eclair #2133 begins relaying onion messages by default
  Eclair #2117 adds onion message replies in preparation for supporting offers
  Eclair #2099 adds onion message configuration option for controling when to relay messages


2021

  2021 year-in-review: onion messages
  Eclair #2061 adds initial support for onion messages
  C-Lightning #4921 updates the implementation of onion messages
  Eclair #1957 adds basic support for onion messages


2020

  C-Lightning #3600 adds experimental support for onion messages using blinded paths
  Proposal for LN direct messages


See also


  
    Blinded paths

    
  




Previous Topic:Offers




Next Topic:OP_CAT



Edit page
  Report Issue

## Related Topics

- topics ()
- Blinded paths (rendez-vous-routing)
- Offers (offers)
- OP_CAT (op_cat)
