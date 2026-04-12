---
title: "Channel announcements"
type: concept
tags: [transactions, difficulty-3]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/unannounced-channels.md", "concepts/simple-taproot-channels.md", "entities/taproot.md", "concepts/bls-signatures.md", "concepts/channel-commitment-upgrades.md"]
summary: "Also covering Gossip (LN)

Channel announcements are advertisements that a channel is available to forward payments"
difficulty: 3
domain: transactions
---

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

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
