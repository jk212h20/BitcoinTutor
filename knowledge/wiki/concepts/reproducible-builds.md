---
title: "Reproducible builds"
type: concept
tags: [network, difficulty-1]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/replacement-cycling.md", "concepts/responsible-disclosures.md"]
summary: "Also covering Gitian and Guix

Reproducible builds are software that was compiled deterministically, making it possible for multiple people to compile"
difficulty: 1
domain: network
---

Also covering Gitian and Guix

Reproducible builds are software that was compiled deterministically, making it possible for multiple people to compile the same source code into identical binaries.

This means no one person or computer needs to be trusted to produce
the executable binaries that most people use.  Additionally, people
who compile the software themselves can ensure that they received an
executable that’s identical to what other people received, helping to
ensure their software will remain compatible with other software, e.g.
a full node staying in consensus with the rest of the network.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
