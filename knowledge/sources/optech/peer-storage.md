# Peer storage

/ home / topics / 


    Peer storage
    
  

  
    




Peer storage is an optional service where a node accepts a small amount of frequently-updated encrypted data from its peers (especially channel counterparties).  It provides the latest version of that data back to the peer upon request, such as connection reestablishment.  The data can be a backup of the peer’s latest channel state, allowing them to resume using a channel even if they lost their local state.



  This topic description is a stub.  We would welcome a pull
request
providing more background information about the topic.


Primary code and documentation


  BOLTs #1110: peer storage


Optech newsletter and website mentions

2025

  LDK #3623 extends its peer storage support to provide automatic and encrypted peer backups
  Core Lightning #8140 enables peer storage of channel backups by default
  LDK #3575 implements the peer storage protocol
  BOLTs #1110 merges the specification for the peer storage protocol
  Eclair #2888 implements support for the peer storage protocol as specified in BOLTs #1110


2023

  Fraud proofs for outdated state compared to peer storage backups
  Core Lightning #5361 adds experimental support for peer storage backups


2021

  
    Restoring LN channels from only a BIP32 seed

    
  




Previous Topic:Payment secrets




Next Topic:Pooled mining



Edit page
  Report Issue

## Related Topics

- topics ()
- Payment secrets (payment-secrets)
- Pooled mining (pooled-mining)
