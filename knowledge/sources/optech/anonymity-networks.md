# Anonymity networks

/ home / topics / 


    Anonymity networks
    
  

  
    




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

Optech newsletter and website mentions

2025

  Fingerprinting nodes on anonymity networks using P2P addr messages


2024

  DNS seeding for nodes on anonymity networks
  Bitcoin Core #29200 allows the I2P to use connections encrypted with both ECIES-X25519 and ElGamal


2023

  Bitcoin Core #27411 stops announcing the local node’s Tor or I2P address on other networks


2022

  Bitcoin Core #25355 adds support for transient I2P addresses


2021

  Bitcoin Core #23077 enables address relay via CJDNS
  Bitcoin Core 22.0 adds support for I2P connections and removes v2 Tor connections
  Bitcoin Core #22112 changes the assumed port for I2P addresses to be 0 instead of 8333
  Bitcoin Core #22050 drops support for deprecated version 2 Tor onion services
  Bitcoin Core #21594 adds a network type field to the getnodeaddresses RPC
  Bitcoin Core #20197 updates eviction logic to keep long-running onion peers
  Question: how to use I2P with Bitcoin Core?
  Bitcoin Core #20685 adds support for the I2P privacy network
  Bitcoin Core 0.21.0 released with support for Tor v3 onion addresses
  Bitcoin Core GUI #162 adds network type information to the GUI Peers window


2020

  Year-in-review: support for Tor v3 onion addresses
  Bitcoin Core #19954 completes the BIP155 addr v2 implementation
  Bitcoin Core #19991 enables tracking inbound connections from onion peers
  Bitcoin Core PR Review Club on a proposed implementation of BIP155 addr v2
  Desktop version of Blockstream Green released with Tor support
  Presentation on enhancements in LND 0.10, including better Tor support
  BOLTs #751 updates BOLT7 to better handled multi-network node announcements
  CKBunker allows specifying spending conditions for a Tor-enabled Coldcard
  Eclair #1278 allows users to skip using SSL when using an onion service


2019

  C-Lightning #3155 adds option to use a static onion service address
  Blockstream Green built-in Tor support for both iOS and Android
  BIPs #766 assigns BIP155 to the addr v2 proposal for v3 onion addresses
  Bitcoin Core #15651 always binds to the default port when listening on Tor
  BIP for new address relay message to support Tor v3 onion addresses
  Eclair #736 adds support for using and becoming an onion service


2018

  LND #1516 adds support for automatically setting up a v3 onion service


See also


  Dandelion
  
    Addr v2

    
  




Previous Topic:Annex




Next Topic:Ark protocol



Edit page
  Report Issue

## Related Topics

- topics ()
- eclipse attacks (eclipse-attacks)
- dandelion (dandelion)
- Addr v2 (addr-v2)
- Annex (annex)
- Ark protocol (ark)
