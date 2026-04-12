---
title: "Channel jamming attacks"
type: concept
tags: [lightning, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/htlc.md", "concepts/htlc-endorsement.md", "concepts/channel-factories.md", "concepts/client-side-validation.md"]
summary: "Channel jamming attacks are Denial of Service (DoS) attacks where an attacker can prevent a series of channels up to 20 hops away from being able to u"
difficulty: 2
domain: lightning
---

Channel jamming attacks are Denial of Service (DoS) attacks where an attacker can prevent a series of channels up to 20 hops away from being able to use part or all of their funds for a prolonged period of time.

An LN node can route a payment to itself across a path of 20 or more
hops. This creates two possible avenues for channel jamming attacks:


  
    ● Liquidity jamming attack (originally called the loop attack in 2015) is where an attacker with x amount of money (e.g. 1 BTC) sends
it to themselves across 20 other channels but delays either settling
or rejecting the payment, temporarily locking up a total of 20x
funds belonging to other users (e.g. 20 BTC). After several hours of locking other
users’ money, the attacker can cancel the payment and receive a
complete refund on their fees, making the attack essentially free.
  
  
    ● HTLC jamming attack is where an attacker sends 483 small payments
(HTLCs) through the series of 20 channels, where 483
is the maximum number of pending payments a channel may contain. In
this case, an attacker with two channels, each with 483 slots, can
jam over 10,000 honest HTLC slots—again without paying any fees.
  




A variety of possible solutions have been
discussed, including forward upfront fees paid from the spender to
each node along the path, backwards upfront fees paid from each payment hop to the previous hop, a
combination of both forward and backwards fees,
nested incremental routing, and fidelity
bonds.  As of April 2021, no solution has
gained widespread support and developers continue to discuss the issue.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
