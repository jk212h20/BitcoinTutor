---
title: "Coinjoin"
slug: "coinjoin"
domain: transactions
difficulty: 4
source: optech
related: ["payjoin", "coin-selection", "coinswap"]
---

Coinjoin is a trustless protocol for mixing UTXOs from multiple owners in order to make it difficult for outside parties to use the block chain’s transaction history to determine who owns which coin.

On July 2nd 2011, the Bitcointalk user Hashcoin first described the concept of a collaborative transaction to achieve privacy. Later in 2013, the concept was named coinjoin after a proposal by Gregory Maxwell. He laid out the ideas and set up a developer bounty to make them a reality.

It took only 4 days after Maxwell’s post for someone to try to claim the bounty with the first coinjoin coordinator implementation. In the months that followed, more projects were released with the goal of correctly implementing the coinjoin protocol: Bitprivacy, Sharedcoin, Coinmux, Darkwallet, CoinJumble, and CoinShuffle. They all had one thing in common: they failed to provide guaranteed privacy to the user.

On January 9th 2015, Chris Belcher announced Joinmarket. It was the first non-broken implementation of a coinjoin protocol. The idea was simple: set the incentives right by creating a market of takers and makers, allowing the latter to earn a fee for providing liquidity.

In November 2016, an alternative to coinjoins was released with Tumblebit. Users could create two fixed-amount payment channels to a Tumbler (coordinator) who can’t steal their coins or deanonymize them. The coins get sent back to a user from the payment channels of other users. It takes a total of 4 transactions to complete, but you get a very high anonymity rate. The wallets Breeze and Hidden Wallet (now Wasabi Wallet) were the main clients to use this privacy technique.

On August 14th 2017, the ZeroLink paper was introduced as The Bitcoin Fungibility Framework. It was a collaboration between the Hidden Wallet (now Wasabi Wallet) and Samourai Wallet teams. The research paper was authored by Adam Ficsor (Nopara73) with some support from TDev. It provided a framework not only for a coinjoin protocol, but for privacy wallets in general.

On October 31st, 2018, Wasabi Wallet 1.0 was officially released publicly. It provided an efficient alternative to Joinmarket for less technical users and a full zero-link coinjoin implementation. Like Tumblebit, there was no need to trust the central coordinator. Unlike Tumblebit, you could get anonymity very quickly and for a low fee.

On June 25th, 2019, the Samourai Wallet team launched a coinjoin feature called Whirlpool, which implements the Zerolink protocol with one major change. Instead of registering non-private UTXOs as inputs in a coinjoin transaction and getting the exceeding change as a non-private output, a premixing transaction takes place beforehand. In it, excess change is separated from UTXOs to mix and from the coordinator fee. Subsequently, UTXOs to mix would form a coinjoin transaction that produces no toxic change outputs. Toxic change is a non-private change output that has a deterministic link back to its transaction input. It is understood as “toxic” as it has no plausible deniability.

In February 2021, the WabiSabi paper was published following extensive public discussions aimed at developing a third-generation coinjoin protocol. This new protocol introduced cryptographic advancements that eliminated the fixed output limit characteristic of earlier versions. As a result, it became feasible to break down total bitcoin amounts into varying output sizes while still providing privacy against the coordinator. This innovation significantly diminished the amount of toxic change created while still being able to mix important amounts. On the other hand, WabiSabi requires an important amount of similarly-valued inputs to work efficiently, which makes it non-trivial to run a coordinator.

On June 15th, 2022, Wasabi Wallet 2.0 was launched with the new WabiSabi coinjoin protocol. It also improved the user experience by automating the coinjoin process.
