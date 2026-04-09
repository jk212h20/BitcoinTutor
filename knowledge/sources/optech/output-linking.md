# Output linking

/ home / topics / 


    Output linking
    
  

  
    




Also covering Address reuse, Dust attacks, and Reuse avoidance

Output linking, also called address reuse, occurs when a user receives two or more payments to the same public key or other unique script element.  This may happen because the user reuses an address out of ignorance or as the result of deliberate targeting, as in a dust attack.  Methods for limiting the loss of privacy from output linking fall under the category of reuse avoidance.

When you receive several payments to the same Bitcoin address, other
users can reasonably assume that the same person received all of those
payments even if the payments are later spent in separate
transactions.  To prevent third parties from making such connections,
users are encouraged to perform reuse avoidance by generating a new
address for each payment they receive.

Unfortunately users don’t have complete control over the payments they
receive.  In a dust attack, an attacker sends small amounts of bitcoin
to addresses that have already appeared on the block chain, producing
address reuse even for conscientiousness users who tried to avoid it.  Some
wallets try to address this by implementing mandatory coin selection
(coin control) that helps prevent users from spending dust in
transactions where they want to protect their privacy.  Other wallets
provide optional features that will spend all coins received to the
same address at the same time—but not more than once—eliminating
the privacy loss from address reuse at the risk of not being able to
spend funds received to a previously-used address.

Reusing addresses can also make users of broken software more
vulnerable to attacks than they would be if they had not reused
addresses, such as in cases where software reuses digital signature
nonces.

Primary code and documentation


  Address reuse (Bitcoin Wiki)


Optech newsletter and website mentions

2026

  Discussion of dust attack mitigations


2025

  Proposed scheme to prevent BIP32 path reuse to avoid output linking and other problems


2022

  Recommendations for unique address servers
  Updated alternative to BIP47 reusable payment codes
  Experimentation with silent addresses
  Silent addresses for delinked reusable addresses


2021

  Preparing for taproot: impact of a new output script on output linkability
  Bitcoin Core #23065 allows the wallet to persistently prevent spending of spam UTXOs
  Reused hash-based addresses provide no quantum resistance


2020

  2020 year in review: transaction origin privacy
  Bitcoin Core #17843 fixes balance discrepancy related to avoid_reuse flag
  Bitcoin Core #17621 fixes potential privacy leak in the avoid_reuse flag


2019

  Bitcoin Core 0.19 new feature: avoid_reuse wallet flag
  Bitcoin Core #13756 adds avoid_reuse wallet flag
  Esplora block explorer updated with privacy warning against address reuse
  Weak signature nonces discovered in reused addresses


2018

  Bitcoin Core #12257: new -avoidpartialspends configuration option


See also


  
    Uneconomical outputs (dust)

    
  




Previous Topic:Out-of-band fees




Next Topic:Output script descriptors



Edit page
  Report Issue

## Related Topics

- topics ()
- Uneconomical outputs (dust) (uneconomical-outputs)
- Out-of-band fees (out-of-band-fees)
- Output script descriptors (output-script-descriptors)
