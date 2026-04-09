---
title: "Watchtowers"
slug: "watchtowers"
domain: lightning
difficulty: 2
source: optech
related: ["vaults", "static-channel-backups", "wallet-labels", "x-only-public-keys"]
---

Watchtowers monitor the block chain for transactions that may cause one of their users to lose funds.  If a theft attempt is detected, the watchtower acts to stop the theft, such as by sending a penalty or recovery transaction on behalf of the affected user.

The idea of watchtowers was introduced for sending LN breach remedy
transactions (justice transactions) when a watchtower detected that one
of their client’s counterparty had broadcast an outdated channel close
transaction.  Later, the name was adapted to software that monitors
vaults for unvaulting transactions and which will
prevent the unvaulting from completing if it violates the user’s policy.

The service provided by watchtowers allows their clients to go offline
for significant amounts of time without having to worry about their
funds being stolen.  Watchtowers are not
entrusted with the funds they monitor; their only responsibility is monitoring the
block chain and broadcasting transactions.  For LN, breach remedy
transactions can be designed so that the watchtower receives a portion
of the safeguarded funds if their services are needed.
