---
title: "Hold invoices"
slug: "hold-invoices"
domain: lightning
difficulty: 1
source: optech
related: ["channel-jamming-attacks", "hd-key-generation", "htlc-endorsement"]
---

Hold invoices are LN invoices where the receiver doesn’t immediately release the preimage upon receiving a payment.  Instead, the receiver performs some action and then either accepts the payment, explicitly rejects it, or lets it time out.

For example, Alice could automatically generate hold invoices on her
website but wait until a customer actually paid before searching her
inventory for the requested item.  This would give her a chance to
cancel the payment if she couldn’t deliver.

Hold invoices are sometimes spelled “hodl invoices.”
