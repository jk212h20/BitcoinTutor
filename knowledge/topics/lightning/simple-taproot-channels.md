---
title: "Simple taproot channels"
slug: "simple-taproot-channels"
domain: lightning
difficulty: 3
source: optech
related: ["htlc", "ptlc", "taproot", "musig", "silent-payments", "simplicity"]
---

Simple taproot channels are LND funding and commitment transactions that use taproot (P2TR) with support for MuSig2 scriptless multisignature signing when both parties are cooperating. This reduces transaction weight space and improves privacy when channels are closed cooperatively.

The initial experimental deployment of simple taproot channels in LND
continues to exclusively use HTLCs, allowing payments
starting in a taproot channel to continue to be forwarded through other
LN nodes that don’t support taproot channels.  Later upgrades of simple
taproot channels, or alternative approaches, may begin supporting
PTLCs.
