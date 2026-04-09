# Async payments

/ home / topics / 


    Async payments
    
  

  
    




Async payments are payments that are made when the receiver is offline.  Onchain payments are async but interactive protocols like LN may require cooperation of a third party to enable async payments.

Traditional onchain Bitcoin payments are asynchronous (async) because
the receiver can generate an output script (Bitcoin address) and give
that address to the spender at any time, and then the spender can pay
that address at any time—even when the receiver is offline.
The process of securing that payment (receiving block confirmations)
doesn’t require any action from the receiver.

For LN, the receiver needs to release a secret at the time a payment is
received in order to secure that payment.  This requires that both the
sender and receiver of a payment both be online at the same time.  In
many cases, it’s not a significant problem for a spender to be online
because they’ve initiated the spending process and can trigger actions
to ensure the payment gets sent.  But for some receivers, being online
to receive a payment is more of a challenge.  For example, an LN node
running on a mobile phone may be entirely disconnected from the internet
some of the time and may not have access to the network other times
because the node’s app is running in the background.

A 2021 discussion about improving this user experience led
to several ideas about allowing a forwarding node to hold a payment for
a receiving node until the receiver was known to be online.  The best
described trustless method in that discussion required the use of
PTLCs, which have not yet been added to LN as of the end
of 2022.  An alternative method, which could be
implemented in the existing protocol, involved the use of trampoline
relays.

Async payments are also a key feature of the Ark protocol.

Optech newsletter and website mentions

2025

  LDK #3628 implements the server-side logic for async payments
  LDK #3618 implements the client-side logic for async payments


2024

  LDK #3140 adds support for paying static BOLT12 invoices to send async payments
  Eclair #2865 enables waking up a disconnected mobile peer for async payments or onion messages
  LDK #3125 introduces support for encoding and parsing messages needed for async payments
  LDK #2973 adds support for intercepting onion messages to facilitate async payments


2023

  Using adaptor signatures to prove an async payment was accepted
  Request for proof that an async payment was accepted
  Idea for non-interactive channel open commitments may allow fast rebalancing for async payments
  Eclair #2464 adds a trigger useful for allowing one node to deliver an async payment to a peer


2022

  2022 year-in-review: async payments
  Eclair #2435 adds support for a basic form of async payments when trampoline relay is used
  Trampoline routing and async mobile payments


2021

  Paying offline nodes


See also


  Trampoline payments
  PTLCs
  Signature adaptors
  
    Proof of payment

    
  




Previous Topic:AssumeUTXO




Next Topic:Atomic multipath payments (AMPs)



Edit page
  Report Issue

## Related Topics

- topics ()
- PTLCs (ptlc)
- Ark (ark)
- Trampoline payments (trampoline-payments)
- Signature adaptors (adaptor-signatures)
- Proof of payment (proof-of-payment)
- AssumeUTXO (assumeutxo)
- Atomic multipath payments (AMPs) (atomic-multipath)
