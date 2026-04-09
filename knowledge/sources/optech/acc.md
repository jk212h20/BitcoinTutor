# Accountable Computing Contracts

/ home / topics / 


    Accountable Computing Contracts
    
  

  
    




Also covering BitVM and Zero-Knowledge Contingent Payments (ZKCP)

Accountable Computing Contracts (ACC) are payments that the receiving party can spend if they verifiably run a specified function on a specified set of inputs.  If the receiving party doesn’t run the function or doesn’t run it correctly, the paying party can reclaim the payment after a period of time.

For example, Alice claims she has a solution to a puzzle.  Bob wants to
buy the solution to the puzzle, but Alice is unwilling to give him a
solution until she’s guaranteed to receive a payment.  Bob is similarly
unwilling to pay Alice until he’s sure the solution is correct.  They
decide to write a program that will return true if it verifies the
solution is correct. Then Bob pays money to a transaction output that
will allow Alice to claim the money if she provides a solution that was
verified by the program.  If the solution is incorrect, either Alice’s
spend will be invalid or she will need to pay a penalty that is equal to
or greater than the amount of the payment.

There have been several proposals and implementations of this idea for
Bitcoin:


  
    ● Zero-Knowledge Contingent Payments (ZKCPs) allow Alice to
prove that she ran the program on her puzzle solution and that the
solution has a particular hash digest.  Bob can then create an
HTLC that pays Alice if she discloses the preimage for
that hash digest.  If Alice doesn’t disclose it, Bob can reclaim his
funds after the HTLC timelock expires.
  
  
    ● BitVM allows Bob to deposit money into a contract that
compactly references the program they’re using for verification.
Alice can then provide the solution.  If Bob is satisfied, he releases
the money to Alice.  If he fails to take action, Alice can claim the
money after a period of time.  If he isn’t satisfied, he can challenge
Alice to prove that their program returns true when run on her
solution, breaking the challenge into multiple steps that each require
an onchain transaction.  BitVM is available on Bitcoin today.
  
  
    ● MATT works similar to BitVM, although it requires a soft
fork.  As a tradeoff, it can be much more efficient than BitVM due to
changing the consensus rules to make this type of proving
efficient.
  


Optech newsletter and website mentions

2026

  Argo: a garbled-circuits scheme with more efficient off-chain computation


2025

  Garbled locks for efficient accountable computing contracts
  Continued discussion about CTV+CSFS advantages for BitVM
  Improvments to BitVM-style contracts allowing disprove transactions to be just 200 bytes
  Discussion about transaction weight limit in response to large BitVM transactions
  Description of benefits to BitVM from OP_CTV and OP_CSFS
  Summary and criticism of CTV + CSFS benefits for accountable computing contracts
  Proposed CTV enhancement opcodes for more flexible vaults and accountable computing


2024

  BitVM may allow bidirectional bridging of tokens when used with Shielded CSV
  Optimistic verification of zero-knowledge proofs using CAT, MATT, and Elftrace
  BitVMX: an alternative to BitVM for verification of program execution
  Development of domain-specific languages for smart contracting, including with BitVM
  Sending and receiving ecash using LN and ZKCPs
  Verification of arbitrary programs using proposed opcode from MATT


2023

  Publication of two BitVM proof of concepts
  BitVM: payments contingent on arbitrary computation without consensus changes


2022

  Proposal for general smart contracts in Bitcoin via covenants


2019

  ZKCP versus standardized atomic data delivery following LN payments


See also


  
    Merklize All The Things (MATT)

    
  




Previous Topic:Zero-conf channels




Next Topic:Accidental confiscation



Edit page
  Report Issue

## Related Topics

- topics ()
- HTLC (htlc)
- MATT (matt)
- Zero-conf channels (zero-conf-channels)
- Accidental confiscation (accidental-confiscation)
