# LN-Penalty

/ home / topics / 


    LN-Penalty
    
  

  
    




LN-Penalty is a state protocol that penalizes a party who publishes a past state by allowing their funds to be seized by their counterparty.  The protocol is most widely used as the payment channel protocol (PCP) at the heart of the original (and still only fully developed) version of LN.  It is also used to manage state for repeated off-chain DLCs between two parties.

The concept for LN-Penalty was developed by Joseph Poon and Tadge Dryja
in the original Lightning Network paper, with refinements
focused on practical implementation proposed by
Rusty Russell and others.  At the time of its development, it offered
several advantages over previously proposed PCPs:


  
    ● Bidirectional: the BIP65 PCP provided the first
trustless payment channel protocol construction for Bitcoin, but it
only allowed payments to safely flow in the direction of the receiver.
By comparison, LN-Penalty allows payments to flow in both directions.
  
  
    ● Non-expiring: the Spillman PCP allows
bidirectional payments but the channel must be closed by a deadline
(and each change of direction reduces the time to the deadline).  By
comparison, LN-Penalty allows payment channels to stay open
indefinitely.
  
  
    ● Unlimited state updates: because each BIP65 state update must
change channel balance by at least one satoshi and each change of
direction in a Spillman channel reduces the time to until expiry,
both only support a limited number of state updates.  By comparison,
LN-Penalty theoretically supports an unlimited number of state
updates.  In practice, the deployed version of LN-Penalty is currently
limited to about 1.5 billion state updates  as part of simplifying support for
watchtowers.
  


At the time LN-Penalty was proposed, it required relative locktimes
(added through soft fork activation of
BIPs 68 and 112) and a fix for txid malleability
(added through soft fork activation of BIPs 141 and
143).

Several limitations of LN-Penalty have been identified:


  
    ● Toxic waste: if any of a user’s old states is broadcast, that
user will lose all of their funds.  That can happen if the user’s
backups are compromised or if their software resets to an earlier
state (e.g. due to a loss of newer state stored in volatile memory).
This runs contrary to the general design in software to make backing
up and restoring as easy as possible.  PCPs that don’t create toxic
waste include Spillman channels, CLTV channels, proposed duplex
payment channels, and proposed
LN-Symmetry.
  
  
    ● Two party only: old states may allocate more funds to a party than
they are entitled to in the latest state.  Penalizing the party who
publishes an old state by allowing all of their funds from that old
state to be seized effectively disincentivizes that behavior.  That
mechanism only works well for two users where funds either belong to
Alice or Bob.  For more users, say three users, Alice can publish an
old state that assigns to her funds that the latest state assigns in
part Bob and in part to Carol.  If Alice publishes that state, both
Bob and Carol must be able to act unilaterally to recover their funds
(otherwise it isn’t a trustless protocol) but they each must not be
able to seize the other’s funds (again for trustlessness).  The
inability to scale the protocol to multiple users in a single channel
can be limiting in the context of channel factories, DLCs, and other protocols.  PCPs that allow
multiple parties include Spillman channels, duplex payment
channels, LN-Symmetry, and multiple variants of the tunable
penalty protocol.
  
  
    ● Fully penalized: the publication of an old state results in that
party losing 100% of their balance in the channel.  There’s no way to
increase or decrease that penalty.  PCPs that allow adjustable
penalties include variants of the tunable penalty protocol and a
variant of LN-Symmetry called Daric; it’s likely the
case that an adjustable penalty mechanism could be added to some
of the other PCPs mentioned in this article.
  


As of this writing, LN-Penalty is the only fully developed PCP
compatible with LN.

Primary code and documentation


  Lightning Network
  Deployable Lightning


Optech newsletter and website mentions

2024

  Superscalar: a timeout tree channel factory proposal with leaves using LN-Penalty


2023

  Using covenants to improve LN scalability (compatible with LN-Penalty)
  Proposal for fraud proofs for providing outdated backup states to make LN-Penalty safer


2022

  Factory-optimized LN protocol compared to LN-Penalty
  Proposed new transaction relay policies designed for LN-penalty


2019

  Discussion of LN-Penalty versus proposed LN-Symmetry (eltoo)


See also


  LN-Symmetry (eltoo)
  
    Duplex micropayment channels

    
  




Previous Topic:Liquidity advertisements




Next Topic:LNURL



Edit page
  Report Issue

## Related Topics

- topics ()
- watchtowers (watchtowers)
- soft fork activation (soft-fork-activation)
- duplex
payment channels (duplex-micropayment-channels)
- LN-Symmetry (eltoo)
- channel factories (channel-factories)
- DLCs (discreet-log-contracts)
- Liquidity advertisements (liquidity-advertisements)
- LNURL (lnurl)
