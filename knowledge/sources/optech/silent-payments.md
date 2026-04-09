# Silent payments

/ home / topics / 


    Silent payments
    
  

  
    




Silent payments are a type of payment that can be made to a unique onchain address for every payment even though the receiver provided the spender with a reusable (offchain) address.  This helps improve privacy.

Traditionally, a user who receives payments should generate a new Bitcoin
address for every payment. This is because receiving multiple payments
to the same address reveals that the same user received those payments,
even if the outputs are later spent in separate transactions.
This is known as address reuse.

Using a new address often requires a secure interaction between sender
and receiver so that the receiver can provide a fresh address every time.
However, interaction is often infeasible and in many cases undesirable.

With silent payments, a receiver can generate and publish a single silent
payment address, eliminating the need for interaction.
The sender then selects one or more of their chosen inputs and uses their
secret key(s) together with public key of the silent payment address to
derive a shared secret which is used to generate the destination.

The intended recipient detects the payment by scanning transactions
in the blockchain and performing an ECDH calculation with the summed
input public keys of the transaction and the scan key from their address.
The main downside is that it is more computationally expensive than
simply scanning the UTXO set for a scriptPubKey as in BIP32-style wallets.
Additionally, using silent payments in a collaborative setting such as
coinjoining is left for future work, and it remains an open
question whether such collaboration can be made provably secure.

Primary code and documentation


  BIP352 silent payments


Optech newsletter and website mentions

2026

  BIPs #2047 publishes BIP392, defining a descriptor format for silent payments
  BIPs #2106 updates BIP352 to limit per-group recipients to 2323
  Nunchuk adds silent payment support
  Proposal to limit the number of per-group silent payment recipients
  Electrum server for testing silent payments
  Draft BIP for silent payment descriptors


2025

  BIPs #1687 merges BIP375 to specify sending silent payments using PSBTs


2024

  Draft BIP for DLEQ proofs to support multiple signing with silent payments
  Draft BIP for sending silent payments with PSBTs
  BitBox02 hardware signing device adds silent payment support
  BIPs #1620 and #1622 make minor updates to the BIP352 specification of silent payments
  Continued discussion about using PSBTs with silent payments
  Discussion about using PSBTs with silent payments
  BIPs #1458 adds BIP352 for silent payments
  Notes from Bitcoin developer discussion about multiple aspects of silent payments
  Human readable payment instructions proposed that are compatible with silent payment addresses


2023

  Proposal to add expiration metadata to silent payment addresses
  Bitcoin Core PR Review Club summary of #28122 adding silent payments
  Draft BIP for silent payments
  Summaries of Bitcoin Core developers in-person meeting


2022

  2022 year-in-review: silent payments
  BIPs #1349 adds BIP351 for a payment protocol inspired by silent payments
  Updated silent payments PR
  Updated alternative to BIP47 reusable payment codes compared to silent payments
  Silent payments proposed


See also


  
    Output linking

    
  




Previous Topic:Signet




Next Topic:Simple taproot channels



Edit page
  Report Issue

## Related Topics

- topics ()
- address reuse (output-linking)
- coinjoining (coinjoin)
- Signet (signet)
- Simple taproot channels (simple-taproot-channels)
