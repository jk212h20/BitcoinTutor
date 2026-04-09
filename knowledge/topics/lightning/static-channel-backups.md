---
title: "Static channel backups"
slug: "static-channel-backups"
domain: lightning
difficulty: 2
source: optech
related: ["stateless-invoices", "submarine-swaps"]
---

Static channel backups are backup files that only need to be updated when an LN node opens or closes a new channel.  In case of data loss, they allow the node to attempt to get the latest channel state from their remote peer.

The mechanism allows a node that has potentially lost some of its
state to encourage its peer to initiate a channel close. Since the peer
should still have the most recent state, it can close the channel using that
state and allow both nodes to receive their most recent balances.

This method does carry two risks:


  
    ● Advertising weakness: the peer can guess that something is wrong
and attempt to steal funds from the stale node by closing the channel
using an old state. But the risk is mitigated in large part by the LN
penalty mechanism: if the stale node does have a revocation of that old
state in its backups, it can create a breach remedy transaction (justice
transaction) that will seize all of the lying peer’s funds from that
channel. Because of this risk, peers using the option_data_loss_protect
mechanism have an incentive to close the channel honestly with the
latest state when they hear from a stale node.
  
  
    ● Mutual loss: if both peers lose state, or if the remote peer
becomes permanently unavailable, static channel backups can’t help
recover the current channel state.
