---
title: "Annex"
type: concept
tags: [script, difficulty-3]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["entities/taproot.md", "concepts/anchor-outputs.md", "concepts/anonymity-networks.md"]
summary: "The taproot annex is an optional field in the witness structure of segwit v1 (taproot) inputs that currently has no defined purpose"
difficulty: 3
domain: script
---

The taproot annex is an optional field in the witness structure of segwit v1 (taproot) inputs that currently has no defined purpose. If an annex is present, any taproot and tapscript signatures must commit to its value.

As of the implementation and activation of taproot, the annex was
reserved for future upgrades.  Transactions containing an annex were not
relayed or mined by default by Bitcoin Core.  There have been several
ideas for using the annex, as well as at least one attempt to define an
extensible data structure for the field.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
