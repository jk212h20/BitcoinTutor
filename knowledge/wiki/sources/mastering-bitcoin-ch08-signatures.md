---
title: "Mastering Bitcoin: Digital Signatures"
type: source
tags: [mastering-bitcoin, textbook]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/mastering-bitcoin/ch08_signatures.md]
summary: "Chapter from Mastering Bitcoin (3rd Edition) by Andreas Antonopoulos & David Harding"
---

Summary of **Digital Signatures** from *Mastering Bitcoin* (3rd Edition).

## Digital Signatures

Two ((("digital signatures", "schnorr signature algorithm")))((("schnorr signature algorithm")))((("digital signatures", "ECDSA")))((("ECDSA (Elliptic Curve Digital Signature Algorithm)")))((("transactions", "signatures", see="digital signatures")))signature algorithms are currently
used in Bitcoin, the _schnorr signature algorithm_ and the _Elliptic
Curve Digital Signature Algorithm_ (_ECDSA_).
These algorithms are used for digital signatures based on elliptic
curve private/public key pairs, as described in <<elliptic_curve>>.
They are used for spending segwit v0 P2WPKH outputs, segwit v1 P2TR
keypath spending, and by the script functions +OP_CHECKSIG+,
+OP_CHECKSIGVERIFY+, +OP_CHECKMULTISIG+, [.keep-together]#+OP_CHECKMULTISIGVERIFY+,# and
+OP_CHECKSIGADD+.
Any tim

*[Content continues in raw source...]*

---
*Raw source: `knowledge/sources/mastering-bitcoin/ch08_signatures.md` — ingested 2026-04-12*
