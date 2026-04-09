# HTLC endorsement

/ home / topics / 


    HTLC endorsement
    
  

  
    




HTLC endorsement is a reputation system proposed for LN.  When a node receives a payment (HTLC) from a channel counterparty for forwarding, that payment may be flagged as endorsed.  If forwarded HTLCs from that counterparty have been profitable in the past, the node may choose to pass on that endorsement when it forwards the HTLC to the next hop.

Nodes opting into this endorsement protocol may give endorsed HTLCs
access to more resources than unendorsed HTLCs.  The two main resources
would be access to a channel’s limited number of HTLC slots (the number
of pending payments the channel can support) and the node’s liquidity (the
amount of capital it has available in the channel).  Both of those
resources are vulnerable to being used without payment (or with
insufficient payment) in a channel jamming attack.

With endorsement, someone executing a channel jamming attack that makes
their counterparties less profitable will not have their HTLCs endorsed.
Honest parties will continue to have their HTLCs endorsed and will be
able to access any HTLC slots and liquidity that is only accessible to
endorsed HTLCs.

Primary code and documentation


  Unjamming Lightning: A Systematic Approach
  Mitigations for loop [channel jamming] attacks


Optech newsletter and website mentions

2025

  Eclair #2716 implements a reputation system for HTLC endorsement that tracks per-peer routing fees


2024

  LND #8390 introduces support for setting and relaying an experimental HTLC endorsement
  Testing of hybrid jamming mitigation and addition of bidirectional reputation
  BLIPs #27 adds BLIP4 for an experimental HTLC endorsement signaling protocol
  Eclair #2884 implements BLIP4 for HTLC endorsement


2023

  HTLC endorsement testing and data collection
  LN developer discussion about channel jamming attacks and HTLC endorsement
  LND #7710 allows retrieving extra data about an HTLC in support of trying HTLC endorsement
  Eclair #2701 now records HTLC receive and settlement times to help later testing of HTLC endorsement
  Testing HTLC endorsement for preventing channel jamming attacks
  Feedback requested on HTLC endorsement to mitigate jamming
  Summary of call about mitigating LN jamming


2022

  2022 year-in-review: HTLC endorsement for channel jamming
  Paper suggesting HTLC endorsement as part of a mitigation for jamming attacks


See also


  
    Channel jamming attacks

    
  




Previous Topic:Hold invoices




Next Topic:Hash Time Locked Contract (HTLC)



Edit page
  Report Issue

## Related Topics

- topics ()
- channel jamming attack (channel-jamming-attacks)
- Hold invoices (hold-invoices)
- Hash Time Locked Contract (HTLC) (htlc)
