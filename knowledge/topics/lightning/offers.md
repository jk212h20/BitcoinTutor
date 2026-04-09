---
title: "Offers"
slug: "offers"
domain: lightning
difficulty: 2
source: optech
related: ["rendez-vous-routing", "musig", "onion-messages"]
---

Also covering BOLT12

Offers is a protocol for Lightning that allows nodes to request and receive invoices over LN.

An example of a common use of this protocol would be that a merchant
generates a QR code, the customer scans the QR code, the customer’s LN
node sends some of the details from the QR code (such as an order ID
number) to the merchant’s node over LN, the merchant’s node returns an
invoice (also over LN), the invoice is displayed to the user (who
agrees to pay), and the payment is sent.

Although the above use case was previously addressed using
BOLT11 invoices, the ability for the spending and receiving nodes
to communicate directly before attempting payment provides much more
flexibility. For example, the requested amount could be specified in
the terms of a non-Bitcoin currency (e.g. USD); if the BTC-to-USD
exchange rate changed too much since the invoice was received, the two
nodes could automatically negotiate an update to the payable BTC
amount to make it again consistent with the requested USD amount.

Interactive communication between the nodes also enables features that
aren’t possible with BOLT11’s one-time-use hashlocks, such as
recurring payments for subscriptions and donations.
