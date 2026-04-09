# Bech32(m)

/ home / topics / 


    Bech32(m)
    
  

  
    




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

Primary code and documentation


  BIP173: bech32
  BIP350: bech32m
  Bech32(m) reference code


Optech newsletter and website mentions

2025

  Information about the selection and order of characters in the bech32 alphabet


2022

  Bitcoin Core GUI #459 allows users to choose to create bech32m addresses


2021

  2021 year-in-review: bech32m addresses
  Bitcoin Core #16807 returns the location of typos in bech32/bech32m addresses
  Rust Bitcoin #691 adds an API to create bech32m addresses for a P2TR scriptPubKey
  Instructions for creating bech32m addresses in Bitcoin Core
  Rust Bitcoin #563 adds support for bech32m addresses for P2TR outputs
  Sparrow wallet adds support for bech32m addresses
  Wiki page for tracking wallet & service support of bech32m
  Rust Bitcoin #601 adds support for parsing bech32m addresses
  Preparing for taproot #1: bech32m sending support
  C-Lightning
  Electrum 4.1.0 adds support for bech32m
  Blockchain.com adds support for bech32 receiving and spending
  Bitcoin Core #20861 implements support for bech32m addresses
  BitMEX exchange announces support for bech32 deposit addresses
  BTCPay Server #2181 uppercases bech32 addresses in QR codes
  BIPs #1056 adds BIP350 for bech32m
  Draft BIP for bech32m


2020

  2020 year in review: taproot’s need for a modified bech32 address format
  Q&A: What is the difference between ‘native segwit’ and ‘bech32’?
  Problems with QR-encoded bech32 BIP21 invoices with uppercase schema
  Bech32 algorithm revision research and proposal
  Discussion about updates to BIP173 bech32 to address mutability concerns
  Proposed updates to BIP173 bech32 to address mutability concerns


2019

  2019 year-in-review: bech32 mutability
  Proposed plan to deal with bech32 malleability in variable-length addresses
  Analysis of bech32 error detection capability
  LND #3767 rejects malformed BOLT11 invoices with a valid bech32 checksum
  How does the bech32 length-extension mutation weakness work?
  Impact of bech32 length-change mutability on v1 segwit script length
  Bech32 sending support (24-part series)


2018

  Bech32 security update for C implementations


See also


  
    Javascript bech32 demo decoder

    
  




Previous Topic:Basic Bitcoin Lisp Language (bll)




Next Topic:BIP70 payment protocol



Edit page
  Report Issue

## Related Topics

- topics ()
- taproot (taproot)
- Basic Bitcoin Lisp Language (bll) (basic-bitcoin-lisp-language)
- BIP70 payment protocol (bip70-payment-protocol)
