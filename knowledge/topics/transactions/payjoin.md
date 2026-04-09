---
title: "Payjoin"
slug: "payjoin"
domain: transactions
difficulty: 1
source: optech
related: ["pay-to-contract-outputs", "payment-batching"]
---

Also covering Pay-to-EndPoint, Bustapay, and BIP79

Payjoin is a technique for paying someone while including one of their inputs in the payment in order to enhance the privacy of the spender, the receiver, and Bitcoin users in general.  The general idea is also known under the names Pay-to-EndPoint (P2EP) and Bustapay.

By including inputs from both the spender and the receiver, payjoin
makes it difficult for block chain analysis companies to determine
which inputs and outputs belong to each participant.
