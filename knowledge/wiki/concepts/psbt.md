---
title: "Partially signed bitcoin transactions"
type: concept
tags: [transactions, difficulty-3]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/output-script-descriptors.md", "entities/miniscript.md", "concepts/proof-of-reserves.md", "concepts/ptlc.md"]
summary: "Also covering BIP174 and PSBT

Partially Signed Bitcoin Transactions (PSBTs) are a data format that allows wallets and other tools to exchange informa"
difficulty: 3
domain: transactions
---

Also covering BIP174 and PSBT

Partially Signed Bitcoin Transactions (PSBTs) are a data format that allows wallets and other tools to exchange information about a Bitcoin transaction and the signatures necessary to complete it.

A PSBT can be created that identifies a set of UTXOs to spend and a
set of outputs to receive that spent value.  Then information about
each UTXO that’s necessary to generate a signature for it can added,
possibly by a separate tool, such as the UTXO’s script or its precise
bitcoin value.

The PSBT can then be copied by any means to a program that can sign it.  For
multisig wallets or cases where different wallets control different
inputs, this last step can be repeated multiple times by different
programs on different copies of the PSBT.  Multiple PSBTs each with
one or more necessary signatures can be integrated into a single
PSBT later.  Finally, that fully signed PSBT can be converted into a
complete ready-to-broadcast transaction.

The basic details about PSBTs and a specification for the original
version 0 PSBTs are published in BIP174.  Version 2 PSBTs are
described in BIP370.  There are no version 1 PSBTs.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
