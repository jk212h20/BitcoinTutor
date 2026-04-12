---
title: "Silent payments"
type: concept
tags: [transactions, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/output-linking.md", "concepts/coinjoin.md", "entities/signet.md", "concepts/simple-taproot-channels.md"]
summary: "Silent payments are a type of payment that can be made to a unique onchain address for every payment even though the receiver provided the spender wit"
difficulty: 2
domain: transactions
---

Silent payments are a type of payment that can be made to a unique onchain address for every payment even though the receiver provided the spender with a reusable (offchain) address.  This helps improve privacy.

Traditionally, a user who receives payments should generate a new Bitcoin
address for every payment. This is because receiving multiple payments
to the same address reveals that the same user received those payments,
even if the outputs are later spent in separate transactions.
This is known as address reuse.

Using a new address often requires a secure interaction between sender
and receiver so that the receiver can provide a fresh address every time.
However, interaction is often infeasible and in many cases undesirable.

With silent payments, a receiver can generate and publish a single silent
payment address, eliminating the need for interaction.
The sender then selects one or more of their chosen inputs and uses their
secret key(s) together with public key of the silent payment address to
derive a shared secret which is used to generate the destination.

The intended recipient detects the payment by scanning transactions
in the blockchain and performing an ECDH calculation with the summed
input public keys of the transaction and the scan key from their address.
The main downside is that it is more computationally expensive than
simply scanning the UTXO set for a scriptPubKey as in BIP32-style wallets.
Additionally, using silent payments in a collaborative setting such as
coinjoining is left for future work, and it remains an open
question whether such collaboration can be made provably secure.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
