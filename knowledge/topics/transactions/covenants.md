---
title: "Covenants"
slug: "covenants"
domain: transactions
difficulty: 2
source: optech
related: ["op_checksigfromstack", "op_checktemplateverify", "sighash_anyprevout", "vaults", "countersign", "cpfp-carve-out"]
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
