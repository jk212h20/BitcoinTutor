---
title: "Replace-by-fee (RBF)"
slug: "replace-by-fee"
domain: transactions
difficulty: 3
source: optech
related: ["transaction-pinning", "version-3-transaction-relay", "rendez-vous-routing", "replacement-cycling"]
---

Also covering BIP125, Opt-in Replace-by-Fee, and Full-RBF

Replace-By-Fee (RBF) is a node policy that allows an unconfirmed transaction in a mempool to be replaced with a different transaction that spends at least one of the same inputs and which pays a higher transaction fee.

Different node software can use different RBF rules, so there have
been several variations.  The most widely-used form of RBF today is
BIP125 opt-in RBF as
implemented in Bitcoin Core 0.12.0 and subsequent
versions; this allows the creator of a transaction to signal that
they’re willing to allow it to be replaced by a higher-paying version.
An alternative form of RBF is full-RBF that allows any transaction to
be replaced whether or not it signals BIP125 replaceability.

BIP125 requires a replacement transaction to pay both higher feerate
(BTC/vbyte) and a higher absolute fee (total BTC).  This can make
multiparty transactions that want to use RBF vulnerable to
transaction pinning attacks, and so an occasional discussion
topic is proposals to allow RBF to operate solely on a feerate basis.
