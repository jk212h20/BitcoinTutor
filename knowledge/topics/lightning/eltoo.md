---
title: "Eltoo"
slug: "eltoo"
domain: lightning
difficulty: 2
source: optech
related: ["channel-factories", "sighash_anyprevout", "eclipse-attacks", "ephemeral-anchors"]
---

Also covering LN-Symmetry

Eltoo (also called LN-Symmetry) is a proposed enforcement mechanism for LN that allows any later channel state to replace any earlier channel state.  Although eltoo can be used with a penalty mechanism similar to the one used with existing LN channels, eltoo doesn’t need the penalty mechanism in order to be secure.

If eltoo is used without a penalty mechanism, there’s no harm in
publishing an old state, except that it costs transaction fees to
publish.  This makes it less dangerous to try to restore an LN node
from a backup after a sudden failure or some other problem.  It also
makes it much simpler for three or more parties to open a single LN
channel together, enabling features such as channel factories.

Another consequence of LN channels without penalties is that LN nodes
using eltoo only need to store the latest state.  For certain devices
that lack large amounts of persistent storage (for example, hardware
wallets), they may not be able to store enough data to effectively use
penalty-based LN—but as long as they can store a few kB, they should
be able to use eltoo-based LN.
