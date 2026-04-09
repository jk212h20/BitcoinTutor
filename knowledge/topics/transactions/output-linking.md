---
title: "Output linking"
slug: "output-linking"
domain: transactions
difficulty: 3
source: optech
related: ["uneconomical-outputs", "out-of-band-fees", "output-script-descriptors"]
---

Also covering Address reuse, Dust attacks, and Reuse avoidance

Output linking, also called address reuse, occurs when a user receives two or more payments to the same public key or other unique script element.  This may happen because the user reuses an address out of ignorance or as the result of deliberate targeting, as in a dust attack.  Methods for limiting the loss of privacy from output linking fall under the category of reuse avoidance.

When you receive several payments to the same Bitcoin address, other
users can reasonably assume that the same person received all of those
payments even if the payments are later spent in separate
transactions.  To prevent third parties from making such connections,
users are encouraged to perform reuse avoidance by generating a new
address for each payment they receive.

Unfortunately users don’t have complete control over the payments they
receive.  In a dust attack, an attacker sends small amounts of bitcoin
to addresses that have already appeared on the block chain, producing
address reuse even for conscientiousness users who tried to avoid it.  Some
wallets try to address this by implementing mandatory coin selection
(coin control) that helps prevent users from spending dust in
transactions where they want to protect their privacy.  Other wallets
provide optional features that will spend all coins received to the
same address at the same time—but not more than once—eliminating
the privacy loss from address reuse at the risk of not being able to
spend funds received to a previously-used address.

Reusing addresses can also make users of broken software more
vulnerable to attacks than they would be if they had not reused
addresses, such as in cases where software reuses digital signature
nonces.
