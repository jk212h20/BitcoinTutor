---
title: "Covenants"
type: concept
tags: [transactions, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/op_checksigfromstack.md", "concepts/op_checktemplateverify.md", "concepts/sighash_anyprevout.md", "concepts/vaults.md", "concepts/countersign.md", "concepts/cpfp-carve-out.md"]
summary: "Covenants are a category of proposed changes to Bitcoin’s consensus rules that would allow a script to prevent an authorized spender from spending to "
difficulty: 2
domain: transactions
---

Covenants are a category of proposed changes to Bitcoin’s consensus rules that would allow a script to prevent an authorized spender from spending to certain other scripts.


  “In the context of Bitcoin, the most useful definition of
covenant is that it’s when the scriptPubKey of a UTXO restricts the
scriptPubKey in the output(s) of a tx spending that UTXO.”  —Anthony
Towns (source)


For example, a covenant may normally only allow spending to a
whitelisted set of scripts, such as returning bitcoins to the user’s own
balance or spending to a staging address that only allows spending to
any arbitrary address after a period of time.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
