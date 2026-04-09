---
title: "Statechains"
slug: "statechains"
domain: cryptography
difficulty: 2
source: optech
related: ["eltoo", "sidechains", "schnorr-signatures", "multisignature", "signer-delegation", "spontaneous-payments", "stateless-invoices"]
---

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
