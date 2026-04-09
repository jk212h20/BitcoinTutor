---
title: "Trimmed HTLC"
slug: "trimmed-htlc"
domain: transactions
difficulty: 2
source: optech
related: ["htlc", "transitory-soft-forks", "unannounced-channels"]
---

Trimmed HTLCs are forwardable LN payments that are below a channel’s economic limit for being resolved onchain.  Instead, a commitment transaction that goes onchain pays the value of all trimmed HTLCs to transaction fees.

Different channels may have different limits for uneconomical
outputs, so a trimmed HTLC in one channel may
be a regular HTLC in another channel.  That means trimmed HTLCs are
constructed, used, and resolved the same way as regular HTLCs for most
purposes.

If trimmed HTLCs weren’t allowed, the minimum value a channel could
send, accept, or forward would be the amount it considered to be
economic onchain, which can easily be thousands of sats.  Trimmed HTLCs
allow channels to forward very small payments.

Unfortunately, trimmed HTLCs come with risks and can create incentive
problems.  A malicious party can destroy part of a channel’s value using
trimmed HTLCs or use trimmed HTLCs they have no intention of resolving
to get their counterparty to pay part of a channel’s transaction fees.
Suggested alternatives have included destroying trimmed
HTLC value by [paying it to an OP_RETURN output or using a
probabilistic payment when trimming is necessary.
