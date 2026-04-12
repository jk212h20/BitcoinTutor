---
title: "Transitory soft forks"
type: concept
tags: [consensus, difficulty-1]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/op_checktemplateverify.md", "concepts/transaction-pinning.md", "concepts/trimmed-htlc.md"]
summary: "Transitory soft forks are soft forks that automatically revert after a period of time if Bitcoin users don’t extend them or make them permanent"
difficulty: 1
domain: consensus
---

Transitory soft forks are soft forks that automatically revert after a period of time if Bitcoin users don’t extend them or make them permanent.

The response to the BIP50 consensus failure included a transitory
soft fork that briefly limited the maximum block size.  The idea of
doing something similar for adding features was proposed as a compromise
between advocates of OP_CHECKTEMPLATEVERIFY and those who either doubted its utility or
preferred to wait for a better alternative.  Since then, the idea has
also been proposed to derisk consensus changes designed to fix bugs and
improve security.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
