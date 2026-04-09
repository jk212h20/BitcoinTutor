# Spontaneous payments

/ home / topics / 


    Spontaneous payments
    
  

  
    




Also covering Keysend

Spontaneous payments is the ability of one LN node to pay another node without receiving an invoice first.  As of 2022, this is commonly accomplished using keysend payments.

The invoice used for regular LN payments contains a hash that the
payer and each routing node uses as part of the
Hash-Time-Locked-Contract.  Spontaneous payments need to replicate
this security mechanism but without the invoice mechanism for
communication.

As of 2022, the commonly used method for accomplishing this is
keysend: the person sending the payment
  chooses a hash pre-image, encrypts it to the receiver’s key, and
  appends it as extra data in the routing packet.  When the payment
  arrives at the receiver, they can decrypt the data and use the
  pre-image to claim the payment.  Keysend support was added to several
  popular LN nodes in 2022.

An alternative mechanism was proposed in 2019 but has not seen
widespread implementation or use: the person sending the payment combines
  their key and the receiver’s key to create a shared secret.  Then
  the spender uses a hash of this secret as the pre-image.  The
  receiver can also generate a shared secret and can use it to accept
  the payment.

Primary code and documentation


  BLIP3: Keysend payments


Optech newsletter and website mentions

2024

  LDK #2935 begins supporting sending keysend payments to blinded paths


2023

  LDK #2156 adds support for keysend payments that use simplified multipath payments
  LDK #2002 adds support for automatically resending spontaneous payments
  Eclair #2573 begins accepting keysend payments that don’t contain a payment secret


2022

  LND #5414 begins advertising support for previously-implemented keysend payments


2021

  LND #5803 allows multiple spontaneous payments to the same invoice
  Rust-Lightning #967 adds support for sending keysend-style spontaneous payments
  LND #5108 adds support for spontaneous multipath payments using AMP
  C-Lightning #4404 allows keysending to nodes that don’t advertise support


2020

  Eclair 0.4.2 adds support for keysend-style spontaneous payments
  Eclair #1485 adds support for keysend spontaneous payments
  Zap 0.7.0 Beta adds support for spontaneous payments
  C-Lightning #3792 adds support for sending keysend spontaneous payments
  LND #4167 allows spontaneous payments made using keysend to be held
  Juggernaut uses spontaneous payments for messaging and instant payments”
  Breez wallet adds support for spontaneous payments
  C-Lightning 0.8.2 released with a plugin for sending spontaneous payments
  C-Lightning #3611 adds a keysend plugin to support spontaneous payments
  Eclair 0.3.3 adds experimental support for trampoline payments


2019

  Using ECDH for uncoordinated LN payments
  
    LND PR for spontaneous LN payments

    
  




Previous Topic:Splicing




Next Topic:Statechains



Edit page
  Report Issue

## Related Topics

- topics ()
- Splicing (splicing)
- Statechains (statechains)
