# Coin selection

/ home / topics / 


    Coin selection
    
  

  
    




Coin selection is the method a wallet uses to choose which of its UTXOs to spend in a particular transaction.

Most early Bitcoin wallets implemented relatively simple coin
selection strategies, such as spending UTXOs in the order they were
received (first-in, first-out), but as fees have become more of a
concern, some wallets have switched to more advanced algorithms that
try to minimize transaction size.

Coin selection strategies can also be used to improve onchain privacy
by trying to avoid the use of UTXOs associated with previous
transactions in later unrelated transactions.

Optech newsletter and website mentions

2024

  BDK #1581 allows a customizable fallback algorithm in branch-and-bound coin selection
  Effect of SubtractFeeFromOutputs on coin selection in Bitcoin Core
  Notes from Bitcoin developer discussion about coin selection
  LND #8515 updates multiple RPCs to accept the name of the coin selection strategy to be used
  LND #8378 makes several improvements to LND’s coin selection features
  New coin selection strategy for LN liquidity providers
  Bitcoin Core #27877 updates Bitcoin Core’s wallet with CoinGrinder coin selection strategy
  New coin selection strategies proposed and tested for Bitcoin Core


2023

  Bitcoin Core #26152 now pays any fee deficit for unconfirmed outputs chosen by coin selection
  Bitcoin Core #27021 adds interface for calculating an output’s ancestor fee deficit
  BTCPay Server #4600 updates its coin selection to avoid unnecessary inputs for payjoin


2022

  Bitcoin Core #24584 prefers input sets composed of a single output type for privacy
  What is the coin selection ‘waste metric’?


2021

  Bitcoin Core #17526 adds Single Random Draw coin selection algorithm
  Bitcoin Core #22009 introduces new heuristic to compare the effectiveness of coin selection results


2019

  Bitcoin Core PR#17290 coin selection for customized transactions
  Bitcoin Core 0.19 adds wallet flag to avoid address reuse privacy loss
  Bitcoin Core PR#13756 adds flag to avoid address reuse privacy loss


2018

  Bitcoin Core unlikely to add coin selection RPC
  Coin selection groups for privacy and consolidation
  Coin selection simulations


See also


  
    An Evaluation of Coin Selection Strategies

    
  




Previous Topic:Codex32




Next Topic:Coinjoin



Edit page
  Report Issue

## Related Topics

- topics ()
- Codex32 (codex32)
- Coinjoin (coinjoin)
