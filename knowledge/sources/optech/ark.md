# Ark protocol

/ home / topics / 


    Ark protocol
    
  

  
    




In the Ark protocol, a large number of users trustlessly share onchain UTXOs using trees of pre-signed, offchain transactions. By sharing UTXOs and transacting offchain, Ark users can spread the cost of onchain fees across multiple participants, minimizing individual transaction costs while maintaining self-custody of their bitcoin.

Ark transaction trees are constructed periodically through an interactive
process known as “rounds”. Each round involves multiple users and a counterparty
(an Ark operator), who together construct and sign the transaction tree, then
broadcast the root transaction onchain. Users securely store their branch and
leaf transactions offchain. This package of offchain transactions is known as a
VTXO (virtual UTXO), which serves as the core unit of value on Ark.

To unilaterally withdraw bitcoin from Ark, a user broadcasts their branch and
leaf transactions in sequence, ultimately releasing their portion of the shared
UTXO to an onchain output under their sole control. However, under normal
operations, users will typically prefer cooperative exits, where they spend
their VTXO to receive an onchain UTXO from the Ark operator.

VTXOs “expire” according to an absolute timelock. After this timelock expires,
both the Ark operator and users can unilaterally spend the bitcoin. To maintain
trustlessness, users must ensure their VTXOs are spent into a new transaction
tree before expiry. This expiry mechanism allows the Ark operator to efficiently
recover liquidity that has been allocated to previous rounds and external
spending operations.

Payments between Ark users are handled as offchain, pre-signed extensions of the
transaction tree. Each payment transaction requires co-signatures from both the
sender and the Ark operator, meaning receivers must trust that the sender will
not collude with the operator to double-spend.

Users can chain these payments by spending a received VTXO before it’s included
in a new round. In payment chains, any sender in the chain could collude with
the operator to double-spend the entire chain.

Upon receiving a VTXO, users can either roll it into a new round to regain
trustlessness, or spend it to another user before the expiry deadline.

Ark can be implemented on Bitcoin without requiring consensus changes, but would
support significantly more users—and achieve greater fee efficiency—if covenant
features like OP_CHECKTEMPLATEVERIFY were added
to Bitcoin.

Primary code and documentation


  Arkade implementation
  Arkade technical documentation
  Second implementation
  Second technical documentation


Optech newsletter and website mentions

2026

  V-PACK, a standard for stateless VTXO verification
  Hash-lock based Ark protocol, hArk, software released
  Using Ark as a channel factory


2025

  Ark Labs launches Arkade
  Summary and criticism of CTV + CSFS benefits for Ark
  Bark implementation of Ark is now available on signet
  Ark Wallet SDK released


2024

  Implementation of Ark demonstrated on mainnet


2023

  Improving LN scalability with covenants in a similar way to Ark
  Proposal for a managed joinpool protocol


See also


  Joinpools
  
    Covenants

    
  




Previous Topic:Anonymity networks




Next Topic:ASICBoost



Edit page
  Report Issue

## Related Topics

- topics ()
- OP_CHECKTEMPLATEVERIFY (op_checktemplateverify)
- Joinpools (joinpools)
- Covenants (covenants)
- Anonymity networks (anonymity-networks)
- ASICBoost (asicboost)
