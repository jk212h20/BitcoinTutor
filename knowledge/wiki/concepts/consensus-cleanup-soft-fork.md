---
title: "Consensus cleanup soft fork"
type: concept
tags: [consensus, difficulty-3]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/time-warp.md", "concepts/merkle-tree-vulnerabilities.md", "concepts/duplicate-transactions.md", "concepts/soft-fork-activation.md", "concepts/compact-block-relay.md", "concepts/countersign.md"]
summary: "Consensus cleanup soft fork is a proposal to address several issues in Bitcoin’s consensus rules that date back to the original version of Bitcoin rel"
difficulty: 3
domain: consensus
---

Consensus cleanup soft fork is a proposal to address several issues in Bitcoin’s consensus rules that date back to the original version of Bitcoin released in 2009.

After a prior draft in 2019 was deferred, renewed efforts since 2023
substantiated into a concrete proposal, BIP54: Consensus Cleanup. The soft fork
proposal advocates for fixing the following four issues.


  
    ● Time warp bug: an off-by-one error in the difficulty adjustment algorithm
permits a majority hashrate attacker to arbitrarily increase block cadence.
This is mitigated by limiting the permitted timestamps for the first block
in difficulty periods and requiring that an entire difficulty period has
a non-negative duration.
  
  
    ● Slow-to-validate blocks: attackers may use uncommon script patterns to compose blocks
that are prohibitively expensive to process. These forms of malicious
transactions are prevented by introducing limits on signature operations
that curb this malicious use but far exceed organic uses.
  
  
    ● Merkle tree weakness: the construction of the merkle tree on a block’s
transactions treats transactions with witness-stripped sizes of
64 bytes indistinguishably from inner nodes. Forbidding such transactions prevents two ways of
misrepresenting the content of a valid block.
  
  
    ● Duplicate transaction vector: Some early coinbase transactions exhibit
patterns that would allow them to be replayed in future blocks. Requiring
that the locktime of coinbase transactions is set to a specific value based
on the block height enforces that future coinbase transactions are unique
without needing to enforce BIP30 checks for those blocks.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
