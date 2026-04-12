---
title: "Channel commitment upgrades"
type: concept
tags: [script, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["entities/taproot.md", "concepts/anchor-outputs.md", "concepts/eltoo.md", "concepts/ptlc.md", "concepts/channel-announcements.md", "concepts/channel-factories.md"]
summary: "Channel commitment upgrades are changes to the format of the onchain commitment transaction used by LN, or any other change which would affect the com"
difficulty: 2
domain: script
---

Channel commitment upgrades are changes to the format of the onchain commitment transaction used by LN, or any other change which would affect the commitment transaction.  Upgrading the LN protocol for these changes requires extra care because both nodes involved in a channel need to agree perfectly on the commitment format.

Upgrades of this nature can also be challenging when the upgraded
commitment transaction can’t directly spend from the setup transaction
which established a channel.  For example, the original LN protocol
establishes channels with payment to a P2WSH output in the setup
transaction.  By contrast, the LN protocol may later expect commitment
transactions to spend from a taproot P2TR output.
The simplest way to deal with this transition would be P2WSH users to
close their channels and reopen them using P2TR, but that would be
wasteful, so developers work on channel commitment upgrade mechanisms
that don’t require unnecessary channel closure.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
