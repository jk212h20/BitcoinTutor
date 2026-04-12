---
title: "Splicing"
type: concept
tags: [lightning, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/submarine-swaps.md", "concepts/dual-funding.md", "concepts/soft-fork-activation.md", "concepts/spontaneous-payments.md"]
summary: "Splicing is the act of transferring funds from onchain outputs into a payment channel, or from a payment channel to independent onchain outputs, witho"
difficulty: 2
domain: lightning
---

Splicing is the act of transferring funds from onchain outputs into a payment channel, or from a payment channel to independent onchain outputs, without the channel participants having to wait for a confirmation delay to spend the channel’s other funds.

Splicing comes in two varieties:


  
    ● Splice in means adding funds to a channel.  In this case, a
cooperative close of the channel is arranged between the involved
parties that spends the old channel funds to a new channel along
with the new deposit.  Because the new channel open is based on the
security of the old channel close, the channel participants can
safely spend the old funds within the channel while waiting for the
close and open transactions to confirm.
  
  
    ● Splice out means removing funds from a channel to an
independent onchain output.  Similar to splice-in, the channel is
closed and a new channel is opened, with the remaining funds being
secured by the old channel’s security until the new channel has
fully confirmed.
  


Splicing is different from submarine swaps (such as those
implemented by Lightning Loop) where funds are transferred
between users in exchange for onchain transactions—in submarine
swaps, the overall balance of the channel stays the same; in
splicing, the overall balance of the channel changes.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
