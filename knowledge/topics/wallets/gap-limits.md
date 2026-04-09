---
title: "Gap limits"
slug: "gap-limits"
domain: wallets
difficulty: 2
source: optech
related: ["hd-key-generation", "free-relay", "generic-signmessage"]
---

Gap limits are the limits wallets set for how many addresses they’ll derive from an HD wallet without seeing any transactions related to those addresses.

For example, each time Alice requests a payment, her wallet generates a
new address, which she gives to the spender.  Later, she may need to
recover her wallet from its extended public key (xpub) or from her seed.
Her wallet derives an address and checks to see if it was paid by any
transactions on the blockchain.  If it was, her wallet derives the next
address in the sequence and checks for transactions paying it.  If an
address hasn’t received a payment, it counts that towards the wallet’s
gap limit, derives the next address, and continues scanning for
transactions.  If it finds a transaction for that new address, it resets
its counter, otherwise it continues incrementing it for each new address
derived without a corresponding transaction being found.

Eventually, the wallet derives a consecutive series of addresses equal
to the gap limit that have not been paid by any transaction.  At that
point, the wallet stops deriving new addresses for scanning.

Because far more addresses can be derived from an HD wallet than a
user could ever receive, some limit (like the gap limit) is needed to
ensure a wallet doesn’t spend forever deriving new addresses and
scanning the blockchain.  However, it’s also the case that a receiver wants
to give out a different address to each spender for privacy, but
spenders may change their mind and not send payment, so wallets need to
accommodate some gap between addresses.  The gap limit provides a simple
parameter for choosing between the extremes of generating an unlimited
number of addresses and allowing some addresses to be skipped.

However, the gap limit forces other tradeoffs on the software that uses
it, so it is an occasional source of discussion among developers.
