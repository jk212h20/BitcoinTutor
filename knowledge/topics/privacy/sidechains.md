---
title: "Sidechains"
slug: "sidechains"
domain: privacy
difficulty: 1
source: optech
related: ["side-channels", "sighash_anyprevout"]
---

Sidechains (also called two-way pegged sidechains) are block chains whose native unit of currency is the same as another block chain.

In the context of Bitcoin, sidechains use a mechanism where bitcoins
are deposited into a contract on the Bitcoin block chain and an equal
number of bitcoins are created on the sidechain for spending.  Users
on the sidechain can then send sidechain bitcoins to a special
contract that destroys them and releases a corresponding amount of the
bitcoins previously deposited to the contract on the Bitcoin block
chain.

Federated sidechains have depositors send their mainnet bitcoins
to a multisig contract controlled by a federation of signatories who
also control the production of blocks on the sidechain.

Drivechains are a type of proposed decentralized sidechain where
depositors send their mainnet bitcoins into a contract controlled by
anonymous Bitcoin miners who also control the production of blocks on
the sidechain.
