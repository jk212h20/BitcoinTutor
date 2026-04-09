---
title: "Hardware wallet interface (HWI)"
slug: "hwi"
domain: wallets
difficulty: 3
source: optech
related: ["psbt", "output-script-descriptors", "miniscript", "exfiltration-resistant-signing", "htlc", "inbound-forwarding-fees"]
---

Hardware Wallet Interface (HWI) is a Python library and command-line tool used to interface with hardware wallets using Partially-Signed Bitcoin Transactions (PSBTs) and output script descriptors.

Designed primarily by Bitcoin Core developers to allow that software to
use hardware wallets as external signers, HWI is now being used by
other wallets as well.
