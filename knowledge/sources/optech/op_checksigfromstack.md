# OP_CHECKSIGFROMSTACK

/ home / topics / 


    OP_CHECKSIGFROMSTACK
    
  

  
    




OP_CHECKSIGFROMSTACK (OP_CSFS) is an opcode on ElementsProject.org-based sidechains that is sometimes proposed for implementation on Bitcoin.  The opcode allows checking whether a signature signs an arbitrary message.  The opcode takes three parameters: a signature, a message, and a public key.

Bitcoin’s existing signature-checking opcodes, such as OP_CHECKSIG,
don’t allow specifying an arbitrary message.  The message they use is
derived from the transaction executing the signature-checking opcode.
This allows them to verify that the signature matches a certain public
key and that the private key used to generate both of those objects
was used to authorize the spend.  That mechanism is powerful enough to
secure Bitcoin UTXOs, but it precludes using digital signatures to
authenticate other types of data in the Bitcoin system.  The ability
to use OP_CSFS to verify an arbitrary message can enable several new
features for Bitcoin users:


  
    ● Paying for signatures: if Alice controls a private key that can
sign a transaction paying Bob, Bob can use OP_CSFS to trustlessly
offer to pay Alice for the signature he needs.  

    More recently, protocols involving paying for signatures typically
assume the use of adaptor signatures that
are more private and which use less block space.
  
  
    ● Delegation: Alice might want to delegate the authority to spend
her coins to Bob without explicitly creating an onchain transaction
transferring the coins to a 1-of-2 multisig between her and Bob.  If
Alice designs her scripts with this sort of delegation in mind, she
can put Bob’s pubkey in a message and use OP_CSFS to prove that
she’s delegated spending authority to that key.  

    An alternative approach that’s more private, more flexible, and
more block-space efficient is graftroot, although this
requires a soft fork that has so far only been lightly discussed.
  
  
    ● Oracles: an oracle may agree to sign a message indicating the
outcome of an event, e.g. the name of the national team that wins a
sporting event.  Two or more users can then deposit money into a
script using OP_CSFS that will pay a different person depending on
which team the oracle indicates was the winner.  

    More recent focus on oracle-moderated contracts involves using
Discreet Log Contracts (DLCs), which can be more private
and more block-space efficient.
  
  
    ● Double-spent protection bonds: a service may promise to never
try to double spend its UTXOs in order to encourage its payees to
accept its unconfirmed transactions as reliable payments.  To
demonstrate its good faith, the service can use OP_CSFS to offer
payment of a bond to any user that can prove the same key was used
to create two different signatures for transactions spending the
same UTXO.  

    This use of OP_CSFS can be compared to single-show
signatures that allow anyone who sees two signatures from the
same key to derive the private key used to create them, allowing
them to spend any other funds secured by that key.
  
  
    ● Transaction introspection: If the same pubkey and signature pair
are valid both with OP_CSFS and OP_CHECKSIG, then the contents
of the arbitrary message passed to OP_CSFS is identical to the
serialized spending transaction (and other data) implicitly used
with OP_CHECKSIG.  This makes it possible to put a validated copy
of the spending transaction on the script evaluation stack where
other opcodes can run tests on it in order to enforce restrictions
on the spending transaction.

    For example, if OP_CSFS had been available in 2015 and 2016, it
would’ve been possible to implement the features of BIP65
OP_CHECKLOCKTIMEVERIFY (CLTV) and BIP112
OP_CHECKSEQUENCEVERIFY (CSV) using without any consensus changes
just by writing a verification script.

    Looking forward, OP_CSFS could also allow scripts to implement
the features of the proposed SIGHASH_ANYPREVOUT signature hash, as
well as other opcode proposals such as
OP_CHECKTEMPLATEVERIFY.
Additionally, OP_CSFS would allow the creation of
covenants that restrict the way in which a set
of bitcoins may be spent—for example, a vault may
restrict its spending transaction to a small set of acceptable
scriptPubKeys to limit the risk of theft.

    The strength of OP_CSFS is that it provides full introspection
of the signing transaction in a completely generic way.  Its
weakness is that it requires essentially adding a complete copy of
the signing transaction to the stack, which may significantly
increase the size of transactions that want to use OP_CSFS for
introspection.  By comparison, single-purpose introspection
opcodes such as CLTV and CSV use minimal overhead, but adding each
new special introspection opcode requires a consensus change and
it may not be possible to disable their use (even if they become
unpopular) without risking someone losing money.
  


Relationship to OP_CAT

Proposals to add OP_CSFS to Bitcoin are often combined with
proposals to restore the OP_CAT opcode removed as part
of the response to the value overflow incident.  This opcode
catenates two elements, appending one to the other.  This makes it
possible to construct a message (such as a serialized transaction) by
appending together individual parts of the message (e.g. the fields of
a transaction).  Initializing the stack with the message already split
into parts simplifies the writing of scripts that perform tests on
those parts.

Primary code and documentation


  OP_CHECKSIGFROMSTACK code from ElementsProject.org
  BIP348


Optech newsletter and website mentions

2026

  Why doesn’t CSFS bind signatures to specific inputs?


2025

  Discussion of open letter about CTV and CSFS
  Continued discussion about CTV+CSFS advantages for BitVM
  Claim that OP_CTV and OP_CSFS would provide advantages for using PTLCs
  Description of benefits to BitVM from OP_CTV and OP_CSFS
  Summary and criticism of CTV + CSFS benefits for discreet log contracts (DLCs)
  Summary and criticism of CTV + CSFS benefits for accountable computing contracts
  Summary and criticism of CTV + CSFS benefits for LN-Symmetry
  Summary and criticism of CTV + CSFS benefits for Ark
  Criticism of CTV motivation in a joint activation with CSFS


2024

  BIP348 merged with specification of OP_CSFS
  Lamport signatures providing OP_CSFS alternative without consensus changes
  Mashup of OP_CTV and OP_CSFS proposed, along with new OP_INTERNALKEY


2023

  Mashup of OP_CTV and APO proposed using OP_CSFS and OP_TXHASH
  Fraud proofs for outdated backup state enforcable onchain with OP_CSFS + OP_CAT


2022

  Proposal for OP_TX opcode composable with OP_CHECKSIGFROMSTACK


2021

  Call for OP_CHECKSIGFROMSTACK design suggestions
  Replicating OP_CHECKSIGFROMSTACK with schnorr signatures and OP_CAT


2019

  Discussion of potential script changes, including OP_CSFS
  Criticism of OP_COSHV and SIGHASH_ANYPREVOUT; OP_CSFS as alternative


2018

  Discussion: the evolution of Bitcoin Script, OP_CSFS discussion


See also


  Covenants in Elements Alpha
  
    Covenants

    
  




Previous Topic:OP_CAT




Next Topic:OP_CHECKTEMPLATEVERIFY



Edit page
  Report Issue

## Related Topics

- topics ()
- SIGHASH_ANYPREVOUT (sighash_anyprevout)
- OP_CHECKTEMPLATEVERIFY (op_checktemplateverify)
- covenants (covenants)
- vault (vaults)
- OP_CAT (op_cat)
