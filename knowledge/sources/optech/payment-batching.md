# Payment batching

/ home / topics / 


    Payment batching
    
  

  
    




Also covering Batching

Payment batching is the technique of including multiple payments in the same onchain transaction.  This splits the cost of creating a transaction, spending inputs, and creating a change output across all the payments in the transaction, reducing the average cost per payment.

It’s realistically possible to save 75% on transaction fees by
batching just a small number of payments and with no degradation in
confirmation speed or other changes required.  Even using exactly the
same inputs you’d use without batching, it’s possible to save more
than 20%.



Primary code and documentation


  Scaling Bitcoin using Payment Batching


Optech newsletter and website mentions

2025

  LDK #3340 introduces batching of on-chain claim transactions with pinnable outputs


2024

  Proposal for a pool exit protocol that allows highly efficient payment batching


2023

  Proposal for OP_VAULT opcode supports batching vault withdrawals


2021

  Candidate set based block templates may help fee bumping batched payments


2020

  BOLTs #803 adds recommendations for securely using batches to settle HTLCs
  Sparrow wallet adds support for payment batching
  Bitcoin Core #16378 adds a new RPC to the wallet with batching support
  C-Lightning #3812 adds batching support to its onchain wallet
  C-Lightning #3763 adds new RPC to batch open channels
  Specter Desktop adds payment batching support
  Field Report: How batching could have saved millions of dollars in fees
  Withdrawal transactions from Coinbase now use payment batching
  OP_CHECKTEMPLATEVERIFY discussion about compressed payment batching
  Non-equal value coinjoins could look like batching for improved privacy


2019

  Proposed new opcode to make batching more efficient during fee spikes
  Presentation: A Return to Fees, covering techniques including batching


2018

  2018 year-in-review: about 11% of payments used batching


See also


  
    OP_CHECKTEMPLATEVERIFY

    
  




Previous Topic:Payjoin




Next Topic:Payment probes



Edit page
  Report Issue

## Related Topics

- topics ()
- OP_CHECKTEMPLATEVERIFY (op_checktemplateverify)
- Payjoin (payjoin)
- Payment probes (payment-probes)
