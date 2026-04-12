---
title: "Anonymity networks"
type: concept
tags: [network, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/eclipse-attacks.md", "concepts/dandelion.md", "concepts/addr-v2.md", "concepts/annex.md", "entities/ark.md"]
summary: "Also covering Tor and I2P

Anonymity networks are systems that allow network communication without senders or receivers needing to reveal their IP add"
difficulty: 2
domain: network
---

Also covering Tor and I2P

Anonymity networks are systems that allow network communication without senders or receivers needing to reveal their IP addresses to each other.  The best known of these are Tor and I2P.

The use of anonymity networks can go a long way to improving the privacy
of Bitcoin software.  It’s particularly beneficial when sending your own
transactions.  This is especially true for lightweight clients that
don’t relay transactions for other peers, so any transaction sent from
their IP address can easily be associated with their network identity.

But using an anonymity network can also be a liability in some cases;
for example:


  
    ● Following the best block chain is a major challenge for full nodes
and lightweight clients on anonymity networks.  Because anonymity
networks allow the creation of a large number of false identities,
systems that solely use them are vulnerable to sybil attacks that can
become eclipse attacks which feed a different
block chain to clients and nodes than what the rest of the network is
using, possibly resulting in loss of funds.
  
  
    ● Latency can be an issue for routed contract protocol systems
designed to be fast, such as LN.  Still, for many end users, it’s fine
to trade off slightly slower speed for much improved privacy.
  


Anonymity networks that are separate from Bitcoin, such as Tor and I2P,
can also be combined with privacy-improving techniques in Bitcoin, such
as dandelion.

Note: Tor onion services should not be confused with the onion
encryption used in LN.  Although both derive from the same ideas about
preserving privacy, they are two different systems.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
