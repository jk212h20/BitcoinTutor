---
title: "Ecash"
type: entity
tags: [transactions, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/duplicate-transactions.md", "concepts/eclipse-attacks.md"]
summary: "Ecash is a type of centralized digital currency that uses blind signatures to prevent the centralized controlling party (the mint) from knowing the ba"
difficulty: 2
domain: transactions
---

Ecash is a type of centralized digital currency that uses blind signatures to prevent the centralized controlling party (the mint) from knowing the balance of any particular user or from learning which users were involved in any transactions.

David Chaum invented blind signatures in 1983 and used them to
describe the ideas behind ecash.  In a typical ecash system, a user
requests some number of tokens from a mint, usually after providing the
mint with collateral such as bitcoins.  The mint signs each token it
returns to the user in such a way that the user can manipulate the
signature to produce an equally valid signature that the mint can
recognize as its own but which doesn’t identify which token it came from
(unless the user tries submitting two signatures for the same token).

This allows Alice to receive some tokens from the mint, send a copy of
those tokens to Bob, and Bob to redeem the tokens with the mint.  If
Alice deposited 1,000 sat with the mint for each token, a perfect mint
would give Bob 1,000 sat for each token he redeemed.  Later, if Alice
tried to redeem one of the tokens she previously gave Bob, the mint
would recognize the attempt to redeem the same token twice and reject
Alice’s attempt.

Alice and Bob both need to trust the mint to store their money, provide
them with legitimately signed tokens, and accept honest redemptions of
tokens.

There are several implementations of ecash that focus on interoperability
with Bitcoin payments.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
