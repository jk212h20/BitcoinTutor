---
title: "Transaction bloom filtering"
slug: "transaction-bloom-filtering"
domain: network
difficulty: 2
source: optech
related: ["compact-block-filters", "trampoline-payments", "transaction-origin-privacy"]
---

Also covering BIP37 and Bloom filters

Transaction bloom filtering is a method that allows lightweight clients to limit the amount of transaction data they receive from full nodes to only those transactions that affect their wallet (plus a configurable amount of additional transactions to generate plausible deniability about which transactions belong to the client).

Bloom filters provide the ability to create a compact filter that
is guaranteed to match a specified string with a configurable rate of
false positive matches for other strings.  A lightweight client can
create a bloom filter for all of its wallet addresses, send that
filter to a node using the P2P protocol messages defined in BIP37, and
then request a special form of blocks (merkle blocks) from the node.

A merkle block, also defined in BIP37, will contain only transactions
matching the previously sent filter plus the block header and a
partial merkle branch connecting each matching transaction to the
merkle root in the block header.

Clients will also receive announcements of new unconfirmed transactions being
relayed by the node if they match the filter.

When BIP37 was popular, most lightweight clients that used it ran on
mobile devices with limited bandwidth and so chose low false positive
rates to minimize their bandwidth use.  This meant that they
essentially gave their list of addresses to any node they contacted.
It was expected that privacy-focused users could mitigate this privacy
loss by setting a higher false positive rate, but research suggests
that the rate needs to be quite high in order to provide plausible
deniability.

As an additional problem, nodes serving BIP37 filters must perform
filtering independently for each client and it’s possible for filters to be created
in a way that requires nodes perform an extensive amount of CPU processing to
filter each block.  This resulted in a set of known DoS vectors
against nodes.

Although in practice BIP37 allowed clients to use a fairly small
amount of bandwidth, it was slower and used more bandwidth than other
remote transaction scanning methods based on large databases of
transactions.  Many popular lightweight clients today query such
databases instead of using transaction bloom filters.

Note: this topic only refers to BIP37 transaction bloom filters.  There
are uses of generic bloom filters in Bitcoin (such as in Bitcoin Core’s
transaction relay tracking) that aren’t indexed to this topic.
