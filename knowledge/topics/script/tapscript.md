---
title: "Tapscript"
slug: "tapscript"
domain: script
difficulty: 2
source: optech
related: ["taproot", "testnet"]
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
