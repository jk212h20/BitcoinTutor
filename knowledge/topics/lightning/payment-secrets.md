---
title: "Payment secrets"
slug: "payment-secrets"
domain: lightning
difficulty: 2
source: optech
related: ["multipath-payments", "payment-probes", "peer-storage"]
---

Payment secrets are extra data added to BOLT11 invoices that spenders include in their BOLT4 onion-encrypted payments.  This allows the receiver to only accept a payment from the intended spender, preventing a probing attack against the receiver when simplified multipath payments are being used.



  This topic description is a stub.  We would welcome a pull
request
providing more background information about the topic.
