# Version 3 transaction relay

/ home / topics / 


    Version 3 transaction relay
    
  

  
    




Also covering Topologically Restricted Until Confirmation (TRUC)

Version 3 transaction relay is a proposal to allow transactions to opt-in to a modified set of transaction relay policies designed to prevent pinning attacks. Combined with package relay, these policies help enable the use of dynamic feerates with LN onchain transactions.

V3 transaction relay is a superset of standard transaction policy.
That is, v3 transactions follow all rules for standard transactions
(e.g. minimum and maximum transaction weights) while also adding some
additional rules designed to allow transaction replacement
while precluding transaction-pinning attacks. v3 transactions also
require minor changes to the package RBF policy in order to maintain
incentive compatibility with miners.

V3 transaction relay solves rule 3 transaction pinning
and may allow the removal of the CPFP carve-out.

Version 3 transactions are used by ephemeral anchors.

Primary code and documentation


  BIP431: Topology Restrictions for Pinning
  New transaction policies (nVersion=3) for contracting protocols
  Original implementation


Optech newsletter and website mentions

2025

  Bitcoin Core #32896 extends several RPCs to support creating and spending TRUC transactions


2024

  Rust Bitcoin #3450 adds the ability to opt-in to TRUC transactions
  LN developer discussion of using TRUC for version-3 LN commitments
  Guide for Wallets Employing Bitcoin Core 28.0 Policies: TRUC transactions
  Criticism of motivations for preferring TRUC over replace-by-feerate as a pinning solution
  Bitcoin Core #29496 makes TRUC transactions standard
  BIPs #1541 adds BIP431 with a specification of TRUC transactions
  Bitcoin Core #29242 lays the groundwork for package replace by fee with v3-compatible packages
  Research about historic use of anchor outputs for possibly imbuing them with v3 properties
  Ideas for post-v3 relay enhancements after cluster mempool is deployed
  Bitcoin Core #28948 adds support for (but does not enable) version 3 transaction relay
  Challenges opening zero-conf channels when using the initially allowed v3 transaction topology
  Idea to apply RBF rules to v3 transactions to allow removing CPFP carve-out for cluster mempool
  Proposed changes to LN for v3 relay and ephemeral anchors
  Discussion about cluster mempool and a need for a CPFP carve out replacement like v3 relay
  Discussion about LN anchors and v3 transaction relay proposal
  Discussion about the costs of pinning when v3 policies are used


2023

  Replacement cycle attacks not solved by current v3 transaction relay policies
  LN developer discussion about multiple relay policy topics, including v3 transaction relay
  Preventing coinjoin pinning with v3 transaction relay


2022

  2022 year-in-review: v3 transaction relay
  Ephemeral anchors implementation as proposed extension to v3 transaction relay policy
  Comparing disabling non-replaceable transactions to disabling special v3 transaction relay rules
  Ephemeral anchors proposal built on v3 transaction relay proposal
  Proposed new transaction relay policies designed for LN-penalty


See also


  Transaction pinning
  
    Ephemeral anchors

    
  




Previous Topic:Vaults




Next Topic:Wallet labels



Edit page
  Report Issue

## Related Topics

- topics ()
- transaction replacement (replace-by-fee)
- package RBF (package-relay)
- transaction pinning (transaction-pinning)
- CPFP carve-out (cpfp-carve-out)
- ephemeral anchors (ephemeral-anchors)
- Vaults (vaults)
- Wallet labels (wallet-labels)
