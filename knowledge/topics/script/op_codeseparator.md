---
title: "OP_CODESEPARATOR"
slug: "op_codeseparator"
domain: script
difficulty: 3
source: optech
related: ["tapscript", "taproot", "consensus-cleanup-soft-fork", "op_checktemplateverify", "out-of-band-fees"]
---

OP_CODESEPARATOR is an opcode that changes what data is used when a signature commits to a script.  The opcode has been available since the original version of Bitcoin Script, but its use and behavior have changed over time (with further changes having been proposed).

In Bitcoin 0.1, the scriptSig from a spend and the scriptPubKey of the
output being spent
were evaluated together with a virtual
OP_CODESEPARATOR placed between them.  For example, using a P2PK
script:

<signature> OP_CODESEPARATOR <public key> OP_CHECKSIG


In legacy Bitcoin Script, such as the above example,
OP_CODESEPARATOR removes itself and any preceding parts of a script
from the scriptCode—which is part of the data that is hashed to
create the message that is signed by a signature in Bitcoin.  The
above code separator allows the signature to only commit to the
<pubkey> OP_CHECKSIG part of the script.  Some operation of this
type is required because the signature can’t commit to
itself—although Bitcoin 0.1 also directly removed any signatures
from the commitment using a function named FindAndDelete().

There’s speculation that the code separator was
also part of an earlier Bitcoin design that could have allowed coin
delegation.  For example, Alice owns a coin but adds Bob to the set of
people who can spend it—without Alice giving away her private key or
creating an onchain transaction.  Bob can then delegate further by
adding Carol to the set of allowed spenders.  No released version of
Bitcoin supported this capability but source code claimed to be from
a pre-release version of Bitcoin may have supported this capability.

In Bitcoin 0.3.7 (July 2010), one of the fixes related to the 1 OP_RETURN bug was
deployed that
changed how the scripts were evaluated, including discontinuing the
use of the virtual OP_CODESEPARATOR.  However, the opcode itself
wasn’t changed and scripts have continued to be able to include it
directly.

Later changes and proposals

The BIP143 signature verification rules for
version 0 (v0) segwit that activated in August 2017 specified a slightly different
version of OP_CODESEPARATOR.  In legacy script, the
FindAndDelete() operation is used to delete all code separators from
the scriptCode.  In segwit v0, the FindAndDelete() operation is
no longer performed, so any OP_CODESEPARATOR opcodes that appear
later in script than the most recently executed code separator will be
included in the scriptCode.  Otherwise, the opcode operates the same
by deleting its calling OP_CODESEPARATOR and any preceding parts of
the script from the scriptCode.

As of this writing, the proposed tapscript soft
fork to implement v1 segwit script contains a further modified
OP_CODESEPARATOR.  In tapscript, signatures no longer commit to a
computed scriptCode; instead they indirectly commit to the executed
script through its leaf in the taproot merkle tree
(called the tapleaf).  This would render OP_CODESEPARATOR useless, so
in tapscript signatures must instead commit to the position of the
most recently executed OP_CODESEPARATOR (or 0xffffffff if none has
been executed).

Also as of this writing, the proposed consensus cleanup soft fork specifies disabling the ability to use
OP_CODESEPARATOR in legacy Bitcoin scripts.  This would prevent it
from being used to call the relatively slow FindAndDelete()
operation an excessive number of times, a problem known to result in
transactions and blocks that could take a long time to verify.  This
proposed change would make unspendable any money spent to a script
using code separator, so this proposed change met with some
criticism even though no one is known to be
using legacy OP_CODESEPARATOR.  It’s unclear whether or not this
part of the proposal may be changed.

Additionally, Bitcoin Core 0.16.1 and later will not relay or mine any
transaction that uses OP_CODESEPARATOR in a legacy script.
