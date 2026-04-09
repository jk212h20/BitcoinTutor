---
title: "ASICBoost"
slug: "asicboost"
domain: mining
difficulty: 2
source: optech
related: ["soft-fork-activation/#2016-7-bip9-bip148-and-bip91-the-bip141143-segwit-activation", "ark", "assumeutxo"]
---

Also covering Overt ASICBoost and Covert ASICBoost

ASICBoost is a technique for specially constructing a Bitcoin block header in order to reduce by about 15% the number of operations necessary to find a certain amount of proof of work.

ASICBoost can be implemented in two forms:


  
    ● Overt ASICBoost requires manipulating the nVersion field of a
block header.  This is clearly visible on the block chain.  Miners
wishing to use overt ASICBoost are recommended to use the version bits
reserved for general purpose use by BIP320.
  
  
    ● Covert ASICBoost requires manipulating part of the merkle root
field of a block header.  This can be done undetectably, although
naive implementations often leave clues.

    Covert ASICBoost is not compatible with blocks that contain
secondary commitments to their transactions, as is the case with any
block that contains a segwit transaction.  This produced
controversy when it was discovered that a mining
hardware manufacturer who strongly objected to segwit had secretly
designed features into their ASICs to use covert ASICBoost.
