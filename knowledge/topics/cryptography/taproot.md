---
title: "Taproot"
slug: "taproot"
domain: cryptography
difficulty: 2
source: optech
related: ["musig", "mast", "tapscript", "schnorr-signatures", "pay-to-contract-outputs", "swap-in-potentiam"]
---

Taproot is an activated soft fork change to Bitcoin that allows payments to schnorr public keys that may optionally commit to a script that can be revealed at spend time.

Coins protected by taproot may be spent either by satisfying one of
the committed scripts or by simply providing a signature that verifies
against the public key (allowing the scripts to be kept private).
Taproot uses schnorr signatures that simplify multiparty construction
(e.g. using MuSig) and MAST to
allow committing to more than one script, any one of which may be
used at spend time.
