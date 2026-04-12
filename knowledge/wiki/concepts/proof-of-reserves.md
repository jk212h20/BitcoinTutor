---
title: "Proof of reserves"
type: concept
tags: [cryptography, difficulty-1]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/proof-of-payment.md", "concepts/psbt.md"]
summary: "Proof of reserves are a timestamped commitment to a distribution of funds signed by the entity who controls those funds"
difficulty: 1
domain: cryptography
---

Proof of reserves are a timestamped commitment to a distribution of funds signed by the entity who controls those funds.

For example, Alice, Bob, and Carol all have bitcoin-denominated deposits
with Bank Corp.  Each week, Bank Corp uses the private key controlling
their onchain funds to sign a message saying “Alice has 1 BTC on
deposit; Bob has 2 BTC on deposit; and Carol has 3 BTC on deposit.”  If
the key Bank Corp uses to sign that message contains 6 BTC or more, the
depositors have some assurance that Bank Corp could return their
deposited amounts if it was willing.

Proof of reserves cannot guarantee that the funds are available.  For
example, Bank Corp could contract with a third party who controls 6 BTC
to have them generate the proof.  In that case, Bank Corp may not
control any bitcoins even though its “proof” seems to indicate that it
does.

The simplest form of proof of reserves lists each depositor’s name in a
form that can’t be confused with any other depositor’s name.  The use of explicit
names prevents the custodian from using the same bitcoins as proof for
two or more different depositors.  For example, imagine two different
people both named Alice who both have 1 BTC on deposit.  The example
proof described for 6 BTC earlier would satisfy both of them, plus Bob
and Carol, even though the actual total on deposit needs to be 7 BTC.

For privacy, each depositor’s name may be replaced with a pseudonym.
However, depositors still need to ensure they are each given a unique
name.  For more privacy, the association between the name and the exact deposit
amount may be obscured, for example using a merkle-sum tree to show each
depositor their specific amount and how it contributes towards the total
amount of proven reserves.  For example, Alice is shown that her
contribution is 1 BTC and that the contribution of the amount paired
with hers is 2 BTC.  That aggregated amount is paired with some number of
accounts also totaling 3 BTC for a grand total of 6 BTC:

               6 BTC
                / \
          3 BTC     3 BTC
         /     \
      1 BTC   2 BTC
        |
      Alice


The above describes only a simple privacy-respecting scheme, a scheme
that can fool depositors if they aren’t careful about verifying it and
understanding exactly what it proves.  Many more advanced schemes have
been proposed, and several have been used in production.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
