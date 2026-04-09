---
title: "Channel factories"
slug: "channel-factories"
domain: lightning
difficulty: 2
source: optech
related: ["eltoo", "channel-commitment-upgrades", "channel-jamming-attacks"]
---

Channel factories are a multi-user contract capable of opening payment channels without putting the channel-open transaction onchain.

For example, three users create a channel factory by each of them
depositing some funds to an onchain 3-of-3 multisig address.  Using
non-broadcast (offchain) spends from that address, they open payment
channels with each other (e.g. Alice↔Bob, Alice↔Charlie, and
Bob↔Charlie).  They can then use those channels with the same security
as if they had opened them onchain because, if necessary, they can
broadcast the channel-open transactions.  However, they don’t need to
broadcast those transactions if both parties act cooperatively,
allowing them to reduce the amount of block chain data used.

For large numbers of users under ideal situations, channel factories
can reduce the onchain size and fee cost of LN by 90% or more.
