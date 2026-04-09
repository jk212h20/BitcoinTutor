---
title: "Uneconomical outputs"
slug: "uneconomical-outputs"
domain: transactions
difficulty: 2
source: optech
related: ["output-linking", "ephemeral-anchors", "unannounced-channels", "utreexo"]
---

Uneconomical outputs are transaction outputs that are worth less than the fees it will cost to spend them.  To prevent users from creating uneconomical outputs that will increase the size of the UTXO set,  Bitcoin Core and other nodes refuse to relay or mine transactions with outputs below a certain value, called the dust limit.

Terminology note: sometimes dust is used as a synonym for
uneconomical outputs or, more generically, low value outputs.  This
can create confusion, such as in the case of dust attacks which
involve amounts just barely above the dust limit.  Optech
recommends using uneconomical outputs for outputs that
aren’t worth the cost to spend them, reserving the term dust for
references specific to the dust limit.
