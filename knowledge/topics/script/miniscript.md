---
title: "Miniscript"
slug: "miniscript"
domain: script
difficulty: 2
source: optech
related: ["merkle-tree-vulnerabilities", "minisketch"]
---

Miniscript allows software to automatically analyze a script, including determining what witness data must be generated in order to spend bitcoins protected by that script.  With miniscript telling the wallet what it needs to do, wallet developers don’t need to write new code when they switch from one script template to another.

The structured representation of Bitcoin scripts provided by
miniscript allows wallets to be much more dynamic about the scripts they use.
In support
of that dynamism, miniscripts can be created using an easily-written
policy language.  Policies are composable, allowing any valid
sub-expression to be replaced by another valid sub-expression (within
certain limits imposed by the Bitcoin system).
