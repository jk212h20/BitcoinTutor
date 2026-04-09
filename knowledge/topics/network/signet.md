---
title: "Signet"
slug: "signet"
domain: network
difficulty: 1
source: optech
related: ["signer-delegation", "silent-payments"]
---

Signet is both a tool that allows developers to create networks for testing interactions between different Bitcoin software and the name of the most popular of these testing networks.

Blocks on signets are only valid if they’re signed by a key used to
create that signet.  This gives the creator complete control over
block production, allowing them to choose the rate of block production
or when forks occur.  This can provide a much better controlled
network environment than proof-of-work testnets where adversarial
miners can use various tricks to make the network practically unusable
for long periods of time.
