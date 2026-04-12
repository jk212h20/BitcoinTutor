---
title: "Tapscript"
type: concept
tags: [script, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["entities/taproot.md", "entities/testnet.md"]
summary: "Tapscript is the scripting language used for taproot script-path spends"
difficulty: 2
domain: script
---

Tapscript is the scripting language used for taproot script-path spends.

It shares most operations with legacy and segwit Bitcoin Script but
has a few differences:


  
    OP_CHECKMULTISIG and OP_CHECKMULTISIGVERIFY are replaced by a
OP_CHECKSIGADD opcode.
  
  
    Many previously disabled opcodes are redefined to be OP_SUCCESS opcodes that
unconditionally render the entire script valid to simplify soft fork
upgrades.
  
  
    Signature hashes are calculated differently than in legacy script or
BIP143 v0 segwit.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
