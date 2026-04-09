---
title: "X-only public keys"
slug: "x-only-public-keys"
domain: script
difficulty: 3
source: optech
related: ["taproot", "tapscript", "covenants", "mast", "schnorr-signatures", "watchtowers", "zero-conf-channels"]
---

X-only public keys are public keys for the secp256k1 elliptic curve that only provide the x coordinate for their position in the finite field.  This is in comparison to uncompressed public keys that provide both their x and y coordinates and compressed public keys that provide their x coordinate plus an additional bit to differentiate the two y alternatives.

Bitcoin public keys are points on the secp256k1 elliptic curve over
a 256-bit finite field.  It’s easy to describe such a point by giving
its x and y coordinates, using a 256-bit number for each (32 bytes
each, for a total of 64 bytes).  Uncompressed public keys do this,
adding a prefix byte for a total of 65 bytes.

If we describe just the x coordinate and use the curve equation to
derive the y coordinate, we find that each x coordinate corresponds
to two different y coordinates.  This allows us to compact our
description to 256 bits for the x coordinate plus a single extra bit
to indicate which of the y coordinates to use.  Compressed public keys
do this, containing the bit within their prefix byte for a total of 33
bytes.

The extra bit can be eliminated if only one of the two alternative y
coordinates is allowed.  X-only public keys do this, using a total of
32 bytes.  Segwit v1 (taproot) and the initial version
of tapscript use x-only public keys for all signature
checking operations to reduce the size of public keys.

The advantage of x-only public keys is that they save space.  The
downside is that public keys need to be generated in a way that ensures
they only use the allowed y coordinate.  This is easy for a wallet
generating a public key but it
was later realized that it could be quite challenging for any
covenant that needed to modify taproot witness
programs that commit to both a MAST-like tree of scripts
and an x-only internal public key.
