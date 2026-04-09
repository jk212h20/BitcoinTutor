---
title: "Transaction pinning"
slug: "transaction-pinning"
domain: transactions
difficulty: 3
source: optech
related: ["cpfp-carve-out", "ephemeral-anchors", "transaction-origin-privacy", "transitory-soft-forks"]
---

Transaction pinning is a method for making fee bumping prohibitively expensive by abusing node protections against attacks that can waste bandwidth, CPU, and memory.  This can make fee management more difficult in multiparty contract protocols (such as LN).

Nodes such as Bitcoin Core that allow transactions to be replaced
(RBF) or packaged with higher-fee child transactions (CPFP) place
restrictions on those replacements in order to prevent various DoS
attacks.  However, when two or more people each have the ability to
fee bump a transaction, this makes it possible for one of them to
pin their version of a transaction at one of the limits and prevent
other participants from using fee bumping.

Some of the limits that can be abused to enable transaction pinning
include:


  
    ● BIP125 RBF rule #3 requires a replacement transaction
pay a higher absolute fee (not just feerate) than the sum of fees paid
by the transaction being replaced and all of its children.  This can
allow an attacker to attach a large and low-feerate transaction to
the transaction they want to pin, forcing any fee bump to pay for the
replacement of the large child transaction.  E.g., with the 2019
Bitcoin Core defaults, an attacker can require an honest participant
pay a minimum of 0.001 BTC to fee bump a transaction (or even
greater amounts in some cases).  
  
  
    ● Maximum package size limitations prevent CPFP from being used if
a transaction has more than 101,000 vbytes of children or other
descendants in a mempool, or has more than 25 descendants or
ancestors.  This can allow an attacker to completely block fee
bumping by creating the maximum amount of child transactions.  If
the attacker has to create those transactions for other reasons
(e.g. because they operate a service paying to users), this attack
can be free.  For some two-party contract protocols (such as current
LN), this is mitigated by CPFP carve out.
