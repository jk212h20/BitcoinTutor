---
title: "Mastering Bitcoin: Transaction Authorization & Authentication"
type: source
tags: [mastering-bitcoin, textbook]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/mastering-bitcoin/ch07_authorization-authentication.md]
summary: "Chapter from Mastering Bitcoin (3rd Edition) by Andreas Antonopoulos & David Harding"
---

Summary of **Transaction Authorization & Authentication** from *Mastering Bitcoin* (3rd Edition).

## Authorization and Authentication

When you receive bitcoins, you have to decide who will have permission
to spend them, ((("authorization")))((("authentication")))called _authorization_.  You also have to decide how full
nodes will distinguish the authorized spenders from everyone else,
called _authentication_.  Your authorization instructions and the
spender proof of authentication will be checked by thousands of
independent full nodes, which all need to come to the same conclusion
that a spend was authorized and authenticated in order for the transaction
containing it to be valid.

The original description of Bitcoin used a public key for authorization.
Alice paid Bob by putting his public key in the output of a transaction.
Authentication came from Bob in the form of a signature that

*[Content continues in raw source...]*

---
*Raw source: `knowledge/sources/mastering-bitcoin/ch07_authorization-authentication.md` — ingested 2026-04-12*
