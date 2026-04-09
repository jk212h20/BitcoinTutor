---
title: "BLS signatures"
slug: "bls-signatures"
domain: cryptography
difficulty: 4
source: optech
related: ["musig", "ptlc", "multisignature", "block-withholding", "channel-announcements"]
---

Boneh–Lynn–Shacham signatures (BLS signatures) are digital signatures that provide a different set of tradeoffs compared to the ECDSA and schnorr signatures currently used in Bitcoin.

Probably the most interesting property of BLS signatures is that they
allow non-interactive signature aggregation.  For example, if Alice and
Bob both independently sign the same transaction, a third party can
combine their signatures into a single signature that proves both of
them signed.  By comparison, using a Bitcoin’s existing schnorr
signatures, a single signature proving both
of them signed can only be produce through an interactive protocol like
MuSig2 where at least one of them receives the other’s
partial signature before producing their own partial signature and
producing the complete signature.

In theory, if other changes to Bitcoin were made and if support for BLS
signatures was added, miners could aggregate all signatures together
before producing a block, allowing blocks to contain only a single
signature, which would moderately improve onchain capacity and might
speed block verification when cached verification was unavailable (e.g.
during initial block download).

BLS signatures are not directly compatible with the elliptic curve used
by Bitcoin and are not as well studied as schnorr signatures.  It would not be possible to use signature
adaptors and technology based on them (such
as PTLCs) with BLS signatures.
