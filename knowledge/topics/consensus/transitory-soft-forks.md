---
title: "Transitory soft forks"
slug: "transitory-soft-forks"
domain: consensus
difficulty: 1
source: optech
related: ["op_checktemplateverify", "transaction-pinning", "trimmed-htlc"]
---

Transitory soft forks are soft forks that automatically revert after a period of time if Bitcoin users don’t extend them or make them permanent.

The response to the BIP50 consensus failure included a transitory
soft fork that briefly limited the maximum block size.  The idea of
doing something similar for adding features was proposed as a compromise
between advocates of OP_CHECKTEMPLATEVERIFY and those who either doubted its utility or
preferred to wait for a better alternative.  Since then, the idea has
also been proposed to derisk consensus changes designed to fix bugs and
improve security.
