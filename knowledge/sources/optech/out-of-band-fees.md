# Out-of-band fees

/ home / topics / 


    Out-of-band fees
    
  

  
    




Out-of-band fees are payments made directly to a specific miner (or group of miners) in exchange for confirming one or more transactions.  They can be contrasted with standard in-band fees that are paid using the fee implied by the difference in a transaction’s input and output value.

For example, Alice broadcasts a transaction at a feerate that is low
relative to other transactions in typical miner mempools.  Alice wants
to increase its feerate but is unable to use either RBF or
CPFP fee bumping.  Instead, she contacts a miner directly
and pays them to include the transaction in their candidate blocks,
which will eventually lead to confirmation (unless the miner gives up).
Alice’s payment can be completely independent of her transaction; she
may even pay using a non-bitcoin form of currency.

Consistent use of out-of-band fees weakens Bitcoin’s censorship
resistance.  Miners controlling a large amount of hash rate produce
blocks more consistently than smaller miners, meaning someone such as
Alice who wants a transaction confirmed quickly will put more effort
into paying large miners than paying small miners.  For example, if
Alice pays miners controlling 55% of hashrate to include her transaction
in their block candidates, there’s a 99% chance that her transaction
will be confirmed within 6 blocks: 1 - (1 - 0.55)**6

The advantage to Alice of paying small miners out of band is minuscule,
likely meaning they will not receive the same opportunity to earn fees
as large miners.  If large miners earn a significantly higher percentage of profit than
small miners for a long period of time, we would expect large miners to
control a majority of total network hash rate.  The fewer entities that
control a majority of hash rate, the fewer entities there are that need
to be compromised to censor which transactions get included in blocks.

Optech newsletter and website mentions

2025

  Soft fork to limit transaction weight proposed to prevent a cause of out-of-band fees


2024

  Frequent use of exogenous fees may risk mining decentralization due to out-of-band fees
  Discussion about the effect of out-of-band fees on proposed fee-dependent timelocks


2023

  Improvements to features for miners that accept out-of-band fees


2021

  Discussion about submitting transactions directly to miners


2020

  Discussion of HTLC mining incentives and out-of-band fees


See also


  
    Fee sniping

    
  




Previous Topic:OP_CODESEPARATOR




Next Topic:Output linking



Edit page
  Report Issue

## Related Topics

- topics ()
- RBF (replace-by-fee)
- CPFP (cpfp)
- Fee sniping (fee-sniping)
- OP_CODESEPARATOR (op_codeseparator)
- Output linking (output-linking)
