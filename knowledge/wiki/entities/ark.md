---
title: "Ark protocol"
type: entity
tags: [transactions, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/op_checktemplateverify.md", "concepts/joinpools.md", "concepts/covenants.md", "concepts/anonymity-networks.md", "concepts/asicboost.md"]
summary: "In the Ark protocol, a large number of users trustlessly share onchain UTXOs using trees of pre-signed, offchain transactions"
difficulty: 2
domain: transactions
---

In the Ark protocol, a large number of users trustlessly share onchain UTXOs using trees of pre-signed, offchain transactions. By sharing UTXOs and transacting offchain, Ark users can spread the cost of onchain fees across multiple participants, minimizing individual transaction costs while maintaining self-custody of their bitcoin.

Ark transaction trees are constructed periodically through an interactive
process known as “rounds”. Each round involves multiple users and a counterparty
(an Ark operator), who together construct and sign the transaction tree, then
broadcast the root transaction onchain. Users securely store their branch and
leaf transactions offchain. This package of offchain transactions is known as a
VTXO (virtual UTXO), which serves as the core unit of value on Ark.

To unilaterally withdraw bitcoin from Ark, a user broadcasts their branch and
leaf transactions in sequence, ultimately releasing their portion of the shared
UTXO to an onchain output under their sole control. However, under normal
operations, users will typically prefer cooperative exits, where they spend
their VTXO to receive an onchain UTXO from the Ark operator.

VTXOs “expire” according to an absolute timelock. After this timelock expires,
both the Ark operator and users can unilaterally spend the bitcoin. To maintain
trustlessness, users must ensure their VTXOs are spent into a new transaction
tree before expiry. This expiry mechanism allows the Ark operator to efficiently
recover liquidity that has been allocated to previous rounds and external
spending operations.

Payments between Ark users are handled as offchain, pre-signed extensions of the
transaction tree. Each payment transaction requires co-signatures from both the
sender and the Ark operator, meaning receivers must trust that the sender will
not collude with the operator to double-spend.

Users can chain these payments by spending a received VTXO before it’s included
in a new round. In payment chains, any sender in the chain could collude with
the operator to double-spend the entire chain.

Upon receiving a VTXO, users can either roll it into a new round to regain
trustlessness, or spend it to another user before the expiry deadline.

Ark can be implemented on Bitcoin without requiring consensus changes, but would
support significantly more users—and achieve greater fee efficiency—if covenant
features like OP_CHECKTEMPLATEVERIFY were added
to Bitcoin.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
