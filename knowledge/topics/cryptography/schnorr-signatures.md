---
title: "Schnorr signatures"
slug: "schnorr-signatures"
domain: cryptography
difficulty: 4
source: optech
related: ["musig", "taproot", "multisignature", "responsible-disclosures", "segregated-witness"]
---

Schnorr signatures are digital signatures that provide similar security to the ECDSA scheme used since Bitcoin’s original implementation, but which provide other benefits. They were added to Bitcoin as part of the taproot soft fork.

Schnorr is secure under the same cryptographic assumptions as
ECDSA and it is easier and faster to create secure multiparty
signatures using schnorr with protocols such as MuSig.  A new
signature type also provided an opportunity to change the signature
serialization format from BER/DER to one that is more compact
and simpler to implement.
