# Channel commitment upgrades

/ home / topics / 


    Channel commitment upgrades
    
  

  
    




Channel commitment upgrades are changes to the format of the onchain commitment transaction used by LN, or any other change which would affect the commitment transaction.  Upgrading the LN protocol for these changes requires extra care because both nodes involved in a channel need to agree perfectly on the commitment format.

Upgrades of this nature can also be challenging when the upgraded
commitment transaction can’t directly spend from the setup transaction
which established a channel.  For example, the original LN protocol
establishes channels with payment to a P2WSH output in the setup
transaction.  By contrast, the LN protocol may later expect commitment
transactions to spend from a taproot P2TR output.
The simplest way to deal with this transition would be P2WSH users to
close their channels and reopen them using P2TR, but that would be
wasteful, so developers work on channel commitment upgrade mechanisms
that don’t require unnecessary channel closure.

Primary code and documentation


  Extension/dynamic commitments
  Dynamic commitments


Optech newsletter and website mentions

2024

  LND #8270 implements the channel quiescence protocol designed in part for channel upgrades
  LND #8967 adds Stfu wire message to lock channel state before initiating protocol upgrades
  LND #8952 refactors code to make it easier to implement dynamic commitments
  BOLTs #869 introduces a new channel quiescence protocol, in part for channel upgrades
  Analysis of multiple proposals for upgrading LN channels


2022

  Updating LN commitments


2021

  C-Lightning #4532 adds experimental support for upgrading a channel


2020

  Upgrading channel commitment formats


See also


  Anchor outputs
  LN-Symmetry (Eltoo)
  
    PTLCs

    
  




Previous Topic:Channel announcements




Next Topic:Channel factories



Edit page
  Report Issue

## Related Topics

- topics ()
- taproot (taproot)
- Anchor outputs (anchor-outputs)
- LN-Symmetry (Eltoo) (eltoo)
- PTLCs (ptlc)
- Channel announcements (channel-announcements)
- Channel factories (channel-factories)
