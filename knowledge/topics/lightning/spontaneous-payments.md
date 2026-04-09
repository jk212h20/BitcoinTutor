---
title: "Spontaneous payments"
slug: "spontaneous-payments"
domain: lightning
difficulty: 2
source: optech
related: ["splicing", "statechains"]
---

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
