---
title: "Reproducible builds"
slug: "reproducible-builds"
domain: network
difficulty: 1
source: optech
related: ["replacement-cycling", "responsible-disclosures"]
---

Also covering Gitian and Guix

Reproducible builds are software that was compiled deterministically, making it possible for multiple people to compile the same source code into identical binaries.

This means no one person or computer needs to be trusted to produce
the executable binaries that most people use.  Additionally, people
who compile the software themselves can ensure that they received an
executable that’s identical to what other people received, helping to
ensure their software will remain compatible with other software, e.g.
a full node staying in consensus with the rest of the network.
