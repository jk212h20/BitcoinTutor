---
title: "OP_CAT"
slug: "op_cat"
domain: cryptography
difficulty: 3
source: optech
related: ["op_checksigfromstack", "op_checktemplateverify", "matt", "onion-messages"]
---

OP_CAT was originally an opcode in Bitcoin.  It was disabled in 2010 but slight variations on it are frequently proposed to be added to Bitcoin using a soft fork.

Both the original OP_CAT and the new proposals for it
concatenate two elements on the stack into a single element.  For
example, the following script:

<0xB10C> <0xCAFE> OP_CAT


Would become:

<0xB10CCAFE>


The primary expected use for OP_CAT is for data provided by the
creator of a script to be concatenated with data provided by someone
spending from that script.  For example, Alice wants to create an
equivocation bond that she can’t create competing spends for without
putting her funds at risk.  She generates a private key in the normal
way, derives a public key from it in the normal way, chooses a
random private nonce the same way she usually would for a schnorr
signature, and derives the public nonce also
in the normal way.  She then pays to the following script:

<public nonce> OP_CAT <pubkey> OP_CHECKSIG


Later, when she signs, instead of providing a complete schnorr
signature—which includes both a public nonce and a scalar—she’s
forced to use the public nonce from her script.  In her witness field,
she only provides the scalar.  The scalar and the public nonce are
concatenated together to produce a BIP340 schnorr signature, which
is then verified against Alice’s public key like normal using the
OP_CHECKSIG opcode.

If Alice later tries to sign a different version of the transaction,
she’s forced to reuse the same public nonce but must (because of the
BIP340 equation) generate a different scalar.  This reuse of the same
nonce in different signatures from the same private key allows anyone to
derive her private key.  They can then create their own signatures for
Alice’s private key, potentially spending her funds if they haven’t been
spent already.

There are many other proposed applications of OP_CAT, see BIN24-1
for one list.  Some applications, such as the example above, are
possible with just OP_CAT and other features that are already part of
Bitcoin script; other applications require additional new opcodes or
other changes to Bitcoin.
