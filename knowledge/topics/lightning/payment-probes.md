---
title: "Payment probes"
slug: "payment-probes"
domain: lightning
difficulty: 2
source: optech
related: ["jit-routing", "channel-jamming-attacks", "payment-batching", "payment-secrets"]
---

Also covering Probing

Payment probes are packets designed to discover information about the LN channels they travel through, such as whether the channel can currently handle a payment of a certain size or how many bitcoins are allocated to each participant in the channel.  Probes use the regular payment (HTLC) mechanism but are designed to always fail, preventing any funds from being transfered.  Probing can be useful, but it can also reduce user privacy.



  This topic description is a stub.  We would welcome a pull
request
providing more background information about the topic.
