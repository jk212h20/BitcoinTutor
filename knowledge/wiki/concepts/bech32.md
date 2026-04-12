---
title: "Bech32(m)"
type: concept
tags: [script, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["entities/taproot.md", "concepts/basic-bitcoin-lisp-language.md", "concepts/bip70-payment-protocol.md"]
summary: "Also covering Bech32, Bech32m, BIP173, and Native segwit address

Bech32 and Bech32m are address formats used to pay native segwit outputs"
difficulty: 2
domain: script
---

Also covering Bech32, Bech32m, BIP173, and Native segwit address

Bech32 and Bech32m are address formats used to pay native segwit outputs.

Using only 32 letters and numbers, the bech32 address format does not use
mixed case and includes an error-correction code that can catch
almost all address typos (and even identify where the typos occur in
some cases).  Addresses encode a segwit version, making them forward
compatible with a large range of conceivable upgrades.

After a problem was discovered with bech32 error
detection for future upgrades under some rare circumstances, a new
bech32 modified (bech32m) format was proposed.
It is expected that bech32m will be used for
taproot and future segwit-based script upgrades,
requiring wallets and services that implemented support for paying the
original bech32 address format to upgrade if they want to support
paying taproot addresses and future upgrades.  No upgrade is required to
continue paying the original (version 0) segwit addresses for P2WPKH
and P2WSH scripts.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
