---
title: "Output script descriptors"
slug: "output-script-descriptors"
domain: wallets
difficulty: 2
source: optech
related: ["miniscript", "psbt", "output-linking", "package-relay"]
---

Also covering Descriptors

Output script descriptors are strings that contain all the information necessary to allow a wallet or other program to track payments made to or spent from a particular script or set of related scripts (i.e. an address or a set of related addresses such as in an HD wallet).

Descriptors combine well with miniscript in
allowing a wallet to handle tracking and signing for a larger variety
of scripts.  They also combine well with PSBTs in
allowing the wallet to determine which keys it controls in a multisig
script.
