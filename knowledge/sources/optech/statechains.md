# Statechains

/ home / topics / 


    Statechains
    
  

  
    




Statechains are a proposed offchain system for allowing a user (such as Alice) to delegate the ability to spend a UTXO to another user (Bob), who can then further delegate the spending authority to a third user (Carol), etc.

The offchain delegation operations are all performed using signature
adaptors and the cooperation of a trusted
third party who uses the eltoo mechanism and their
knowledge of every previous delegation operation to ensure each
new delegation uses a state number higher than any previously used
state number.  These incrementing state numbers ensure an onchain spend by
the most recent delegate (Carol) can take precedence over spends by
previous delegates (Alice and Bob), assuming the trusted third party
hasn’t colluded with a previous delegate to cheat.

Beyond colluding with a delegated signer (such as previous delegates
Alice or Bob), there is no way for the trusted third party to steal
funds.  A delegated signer
can always spend the UTXO onchain without needing permission from the
trusted third party, arguably making statechains less trusted than
federated sidechains.

Although initially described for use with schnorr-based signature adaptors, there has been work to adapt the
protocol to ECDSA-based multisignatures and to
use decrementing locktime similar to that proposed for duplex
micropayment channels rather than eltoo.  This would make statechains
usable on Bitcoin without depending on any proposed consensus changes.

Primary code and documentation


  Statechains
  Statechains with ECDSA and without eltoo


Optech newsletter and website mentions

2024

  Spark statechain-like protocol announced
  Mercury Layer announced as an implementation of statechains using blind signing


2023

  Discussion about blind MuSig2 signing for statechains


2020

  Transcript of discussion about multiple topics, including statechains
  Transcript about watchtowers and their usefulness for statechains
  Discussion about implementing statechains without schnorr or eltoo


2019

  Bitcoin Core contributor meeting discussion topic: blind statechains


See also


  Eltoo
  Signature adaptors
  Multisignatures
  Signer delegation
  
    Sidechains

    
  




Previous Topic:Spontaneous payments




Next Topic:Stateless invoices



Edit page
  Report Issue

## Related Topics

- topics ()
- signature
adaptors (adaptor-signatures)
- eltoo (eltoo)
- sidechains (sidechains)
- schnorr (schnorr-signatures)
- multisignatures (multisignature)
- Signer delegation (signer-delegation)
- Spontaneous payments (spontaneous-payments)
- Stateless invoices (stateless-invoices)
