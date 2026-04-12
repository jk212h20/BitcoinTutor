---
title: "Vaults"
type: concept
tags: [cryptography, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/covenants.md", "concepts/v3-commitments.md", "concepts/version-3-transaction-relay.md"]
summary: "Vault are a type of covenant that require two separate transactions to appear in two different blocks in order for a user to spend money from their wa"
difficulty: 2
domain: cryptography
---

Vault are a type of covenant that require two separate transactions to appear in two different blocks in order for a user to spend money from their wallet.  The first transaction signals that someone is attempting to spend the money and gives the user a chance to block the second transaction that completes the spend.

A vault protocol specifies a minimum amount of time or number of blocks that
must pass between the two transactions, giving the user that amount of
time to notice if someone stole their private key and is attempting to
steal their money.  If the user detects the theft attempt, most vault
designs also allow the user to either send the money to a safe address
that uses a more secure script or to permanently destroy the money
to prevent the thief from profiting from their attack.

Some vault designs rely on covenants that require
consensus changes to Bitcoin.  Other vault designs use existing
protocol features plus techniques such as signing transactions long
in advance of needing them and then destroying the means to sign
alternative transactions (either by securely deleting the signing key
or by using multisig to ensure multiple independent keys would need to
be compromised).

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
