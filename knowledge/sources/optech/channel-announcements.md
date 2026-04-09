# Channel announcements

/ home / topics / 


    Channel announcements
    
  

  
    




Also covering Gossip (LN)

Channel announcements are advertisements that a channel is available to forward payments.  The advertisements are relayed through the LN gossip network.

Many LN nodes choose to announce their existence and their channels to
encourage other nodes to use them for routing payments.  Other nodes
choose to remain private, using unannounced channels.

As of this writing, many developers call the currently deployed
BOLT7 announcement protocol “gossip v1”.  One key feature of gossip v1
is that channel announcements and updates must be signed by a key
belonging to a P2WSH UTXO corresponding to a 2-of-2 multisig script (the
type of script used for v1 LN funding transactions).  This means that a
channel announcement or update message can only be created after someone
has paid the onchain fees necessary to get a P2WSH output confirmed,
providing built-in denial-of-service (DoS) protection against fake
channel announcements that would waste bandwidth and potentially result
in failed routing attempts across non-existent channels.

This approach has two major downsides:


  
    ● Restricts upgrades: the requirement in v1 gossip to use P2WSH UTXOs
with a specific script prevents announced LN channels from using
alternative scripts and output types.  Anyone experimenting with new
ideas for LN, such as simple taproot channels, is forced to use unannounced channels.
  
  
    ● Linkability: it’s expected that channels will be announced using the
specific UTXO that is jointly controlled by the two nodes.  Although
this provides DoS protection through an efficient reuse of something
the nodes already need to pay for, it reduces privacy by publicly
linking node and channel activity to a specific UTXO.
  


A proposed upgrade to LN gossip, sometimes called “v1.5 gossip”, would
allow using P2TR outputs with keypath-signed channel
announcements and updates, addressing the problem of restricted
upgrades.

A more ambitious proposed upgrade to LN gossip, sometimes called “v2
gossip”, proposes to address both linkability and restricted upgrades by
allowing signatures for a broad range of UTXOs to be used—not just UTXOs
that match an LN template.  This would allow breaking the connection
between channels and UTXOs in several ways, including allowing owners
of UTXOs to sell non-spending signatures for them to LN node operators
who want maximal privacy.  It would also allow some non-LN UTXO owners
to broadcast fake channel announcements as part of a potential DoS
attack, but the amount of gossip that could be created would still be
limited by the cost to create and hold a UTXO.

A version of gossip v2 was first proposed in 2019, with an updated
version being proposed in 2022 that allowed using a wide range of UTXOs.
Concerns about the use of non-LN UTXOs have been debated since then,
with gossip v1.5 being proposed as a less ambitious alternative.  A
compromise version called v1.75 was proposed at an LN developer
meeting.

Primary code and documentation


  BOLT7: P2P node and channel discovery
  Proposed taproot gossip (AKA, gossip v1.5)
  V2 gossip protocol


Optech newsletter and website mentions

2025

  Utreexo-based zero-knowledge gossip for LN channel announcements compatible with MuSig2 STCs
  Eclair #2983 only synchronizes channel announcements with the node’s top peers on reconnection


2024

  Updates to the version 1.75 channel announcements proposal
  LN developers discuss upgrades to the gossip protocol
  LND #8044 adds new message types for the new v1.75 gossip protocol compatible with taproot channels
  Proving UTXO set inclusion in zero knowledge for more private channel announcement messages
  New anonymous usage tokens proposed that could be used to improve channel announcement privacy
  Disclosure of two past vulnerabilities in LND gossip handling


2023

  LN developer discussion about updated channel announcements
  LDK #2222 allows accepting gossip without verifying it first
  LDK #2198 increases the amount of time before gossiping that a channel is down


2022

  LN fee rate cards proposed to reduce fee-related channel update gossip
  Core Lightning #5239 improves its gossip handling code
  LN developer meeting discussion about gossip updates
  LN gossip rate limiting for use with Erlay-like set reconciliation
  Continued discussion about updated gossip proposal
  Updated gossip proposal


2021

  C-Lightning #4639 adds experimental support for gossiping liquidity advertisements
  Blockstream Satellite begins broadcasting LN gossip data


2019

  C-Lightning #3064 begins limiting gossip updates to once per day
  Request for comments on limiting LN gossip updates to once per day
  Eclair #954 adds a gossip sync whitelist
  Eclair #899 implements extended gossip queries as proposed in BOLTs #557
  LND #3359 adds an ignore-historical-filters configuration option for ignoring some gossip filters
  Gossip update proposed
  LND #2985 waits to relay gossip announcements until there are there are at least ten
  LND #2740 implements a new gossiper subsystem which puts its peers into two buckets
  LND #2690 puts more gossip traffic in a queue to allow prioritizing urgent information


See also


  
    Unannounced channels

    
  




Previous Topic:BLS signatures




Next Topic:Channel commitment upgrades



Edit page
  Report Issue

## Related Topics

- topics ()
- unannounced channels (unannounced-channels)
- simple taproot channels (simple-taproot-channels)
- P2TR (taproot)
- BLS signatures (bls-signatures)
- Channel commitment upgrades (channel-commitment-upgrades)
