# X-only public keys

/ home / topics / 


    X-only public keys
    
  

  
    




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

Primary code and documentation


  BIP340 schnorr signatures for secp256k1


Optech newsletter and website mentions

2025

  Why batch validation makes it necessary to check the parity of the Y coordinate
  Bitcoin Core #31590 checks parity bits when retrieving privkeys for x-only pubkeys in descriptors


2024

  Should an even Y coordinate be enforced after every key-tweak operation, or only at the end?


2022

  Libsecp256k1 #993 includes in the default build options a modules for working with x-only pubkeys
  Core Lightning #5646 updates the experimental implementation of offers to remove x-only public keys
  X-only workaround for covenant-based protocols


2020

  Alternative x-only tiebreaker proposed and discussion of safety of precomputed pubkeys


2019

  Taproot review: blog post published about x-only pubkeys
  Summary of updates to taproot proposal, including x-only public keys
  Request for discussion about using x-only public keys in taproot
  Suggestion to use x-only public keys in taproot


See also


  Schnorr signatures
  
    Taproot

    
  




Previous Topic:Watchtowers




Next Topic:Zero-conf channels



Edit page
  Report Issue

## Related Topics

- topics ()
- taproot (taproot)
- tapscript (tapscript)
- covenant (covenants)
- MAST (mast)
- Schnorr signatures (schnorr-signatures)
- Watchtowers (watchtowers)
- Zero-conf channels (zero-conf-channels)
