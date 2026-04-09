---
title: "Payment batching"
slug: "payment-batching"
domain: transactions
difficulty: 2
source: optech
related: ["op_checktemplateverify", "payjoin", "payment-probes"]
---

Also covering Batching

Payment batching is the technique of including multiple payments in the same onchain transaction.  This splits the cost of creating a transaction, spending inputs, and creating a change output across all the payments in the transaction, reducing the average cost per payment.

It’s realistically possible to save 75% on transaction fees by
batching just a small number of payments and with no degradation in
confirmation speed or other changes required.  Even using exactly the
same inputs you’d use without batching, it’s possible to save more
than 20%.
