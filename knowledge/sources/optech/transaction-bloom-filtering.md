# Transaction bloom filtering

/ home / topics / 


    Transaction bloom filtering
    
  

  
    




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

Primary code and documentation


  BIP37


Optech newsletter and website mentions

2023

  Proposal to remove mempool message support from Bitcoin Core, possibly along with bloom filters


2021

  Rust Bitcoin #580 adds support for the BIP37 P2P network messages
  History of the mempool P2P message being deprecated along with BIP37 bloom filters


2020

  Bitcoin Core #19260 disconnects peers who inappropriately send filterclear


2019

  Bitcoin Core 0.19 released with bloom filters disabled
  Bitcoin Core PR#16248 adds bloom filter whitelist option
  BRD field report: using native segwit addresses with bloom filters
  Mailing list discussion about disabling bloom filters in Bitcoin Core
  Bitcoin Core PR#16152 disables bloom filter support by default


See also


  Privacy in BitcoinJ [bloom filters]
  
    Compact block filters

    
  




Previous Topic:Trampoline payments




Next Topic:Transaction origin privacy



Edit page
  Report Issue

## Related Topics

- topics ()
- Compact block filters (compact-block-filters)
- Trampoline payments (trampoline-payments)
- Transaction origin privacy (transaction-origin-privacy)
