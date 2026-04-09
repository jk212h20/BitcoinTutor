# BIP70 payment protocol

/ home / topics / 


    BIP70 payment protocol
    
  

  
    




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

Primary code and documentation


  BIP70
  BIP71
  BIP72


Optech newsletter and website mentions

2021

  Mailing list discussion about a BIP70 replacement


2019

  2019 year-in-review: Bitcoin Core BIP70 deprecation and disablement
  Bitcoin Core 0.19 released with BIP70 support disabled by default
  Bitcoin Core PR#17165 removes support for BIP70 payment protocol
  Bitcoin Core PR#15584 disables support for BIP70 by default
  Bitcoin Core PR#15063 allows falling back to BIP21 parsing of BIP72 URIs


2018

  Bitcoin Core PR#14451 allows building Bitcoin-Qt without BIP70 support
  
    Pay-to-EndPoint (P2EP) has elements similar to BIP70

    
  




Previous Topic:Bech32(m)




Next Topic:Block explorers



Edit page
  Report Issue

## Related Topics

- topics ()
- Bech32(m) (bech32)
- Block explorers (block-explorers)
