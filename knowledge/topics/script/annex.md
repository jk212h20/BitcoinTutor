---
title: "Annex"
slug: "annex"
domain: script
difficulty: 3
source: optech
related: ["taproot", "anchor-outputs", "anonymity-networks"]
---

The taproot annex is an optional field in the witness structure of segwit v1 (taproot) inputs that currently has no defined purpose. If an annex is present, any taproot and tapscript signatures must commit to its value.

As of the implementation and activation of taproot, the annex was
reserved for future upgrades.  Transactions containing an annex were not
relayed or mined by default by Bitcoin Core.  There have been several
ideas for using the annex, as well as at least one attempt to define an
extensible data structure for the field.
