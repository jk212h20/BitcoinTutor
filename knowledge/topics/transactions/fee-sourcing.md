---
title: "Fee sourcing"
slug: "fee-sourcing"
domain: transactions
difficulty: 4
source: optech
related: ["out-of-band-fees", "replace-by-fee", "fee-estimation", "fee-sniping", "fee-sponsorship"]
---

Also covering Exogenous fees and Endogenous fees

Fee sourcing refers to the decisions made by designers of committed transactions (such as presigned transactions) about what sources of funds they’ll use for paying transaction fees.  Endogenous fees are a fundamental part of a transaction or set of transactions. Exogenous fees are those which don’t need to be paid for a transaction or set of transactions to be valid.

Some examples:


  
    ● Original LN commitment transactions paid a feerate chosen at the
time the transaction was signed (endogenous fees).
  
  
    ● Anchor-style LN commitment transactions pay a small fee at the time
the transaction is signed—enough to get it into expected
mempools—but the bulk of the fee is intended to be paid using by CPFP
fee bumping an output of the transaction (exogenous
fees).
  
  
    ● Second generation anchor-style HTLC-X transactions pay no fees and
are partly signed with the SIGHASH_SINGLE|SIGHASH_ANYONECANPAY
sighash flag, allowing the second signer to create a transaction
that includes at least one additional input for paying fees, plus an
additional output for any change from paying the fee.  This is an
example of exogenous fees even though the fee is paid in the
transaction itself; it’s exogenous because Bitcoin’s protocol allows
the transaction to be created and confirmed without any additional
inputs or outputs.
  


The nature of committing to a transaction now and potentially
broadcasting it much later precludes the signer from knowing what
feerate it should use to get confirmed within a desired number of
blocks.  The advantage of exogenous fees in this case is that they’re
relatively easy to design for.  The Bitcoin protocol provides several
features, such as sighash flags and a DAG transaction topology, that
allow an independent UTXO to pay fees for another transaction.

The direct downsides of exogenous fees are that the spender must have
access to an independent UTXO and must put extra data onchain to spend
it.  Much like a rocket must expend some fuel to accelerate other fuel
that it needs for its primary mission, a transaction using exogenous fee
must spend some transaction fees to pay for the other transaction fees
that it needs for its primary purpose.

The indirect downside of using exogenous fees, one that some people
consider more important than the direct downsides, is that the extra
onchain data they require can be eliminated if the fees are instead paid
to a miner out of band.  Less onchain data per
transaction benefits the miner because they can then include more
transactions in their blocks, so the miner can offer a discount to the
user, incentivizing them to pay out of band.  Only the largest miners
practically benefit from out of band payments, so frequent use of them
would lead to mining centralization.

Endogenous fees are harder to build into many protocols, but they can
result in smaller transactions (reducing fees) and do not put
centralization pressure on miners.

A suggested approach to allow dynamic endogenous fees is presigned
incremental RBF bumps where multiple versions of a
transaction are created, each paying a different feerate.  At the time
the transaction is sent, fee estimation can be
performed and the version with the closest match to the estimated
feerate can be broadcast.  If need be, the broadcasted version can later
be replaced with another presigned version paying a higher feerate.
This approach has been criticized for slowing down transaction signing
in time-sensitive applications, limiting the scalability of transaction
trees, and requiring an excessive amount of capital to be reserved for
paying fees.
