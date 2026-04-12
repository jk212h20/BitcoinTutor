---
title: "Miniscript"
type: entity
tags: [script, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/merkle-tree-vulnerabilities.md", "concepts/minisketch.md"]
summary: "Miniscript allows software to automatically analyze a script, including determining what witness data must be generated in order to spend bitcoins pro"
difficulty: 2
domain: script
---

Miniscript allows software to automatically analyze a script, including determining what witness data must be generated in order to spend bitcoins protected by that script.  With miniscript telling the wallet what it needs to do, wallet developers don’t need to write new code when they switch from one script template to another.

The structured representation of Bitcoin scripts provided by
miniscript allows wallets to be much more dynamic about the scripts they use.
In support
of that dynamism, miniscripts can be created using an easily-written
policy language.  Policies are composable, allowing any valid
sub-expression to be replaced by another valid sub-expression (within
certain limits imposed by the Bitcoin system).

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
