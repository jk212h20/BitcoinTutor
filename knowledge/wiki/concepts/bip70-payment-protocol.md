---
title: "BIP70 payment protocol"
type: concept
tags: [network, difficulty-4]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/bech32.md", "concepts/block-explorers.md"]
summary: "The BIP70 payment protocol is an interactive protocol for sending payment requests and receiving payments"
difficulty: 4
domain: network
---

The BIP70 payment protocol is an interactive protocol for sending payment requests and receiving payments.

The protocol involves several steps:


  
    ● Customer clicks a BIP21 bitcoin: URI extended with an
additional r parameter (described in BIP72).  The URI handler
opens the user’s wallet in response
  
  
    The wallet contacts the merchant’s server and asks for a payment request
signed by the merchant’s SSL certificate.  Upon receipt and
validation of the signed payment request, the payment details are
automatically filled out on the wallet’s Send Transaction screen.
Optionally, the user is notified that they’re paying the owner of
the domain corresponding to signing certificate (e.g.
“example.com”)
  
  
    The customer reviews the payment details and clicks the Send
Transaction button.  The transaction is generated and broadcast to
the Bitcoin network.  A copy of the transaction is sent to the
merchant, who then replies with an acknowledgment that the payment
was received (optionally rebroadcasting the transaction from their
own nodes)
  


The protocol had several advantages over plain BIP21 URIs:


  
    The merchant could request payment to any script—not just one
of the popular address types—making the proposal forward
compatible with new address formats
  
  
    The customer’s wallet automatically sent their own script to be
used in case a refund needed to be issued
  
  
    Payment requests had an expiration date after which point the quoted price
would no longer apply
  
  
    It gave the spending transaction directly to the merchant,
allowing them to broadcast it.  This could allow a user to pay
using Bluetooth or NFC even if they didn’t currently have
a connection to the Internet
  


Its main disadvantage was that it required that spenders support the SSL
certificate system, which includes many algorithms not otherwise used
in Bitcoin and a complex Public Key Infrastructure (PKI) system.  In
practice, this meant software needed to include a library such as
OpenSSL as a dependency.  Bugs in that library could then be used to
exploit Bitcoin programs, such as the OpenSSL heartbleed
vulnerability that potentially allowed attackers to access private
keys from Bitcoin Core in 2014.

Ultimately, BIP70 never saw widespread adoption and almost all
merchants and wallets that did once support it have either ended
support or plan to end their support in the future.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
