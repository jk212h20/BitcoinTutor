---
title: "LNURL"
slug: "lnurl"
domain: lightning
difficulty: 1
source: optech
related: ["offers", "ln-penalty", "low-r-grinding"]
---

Also covering Lightning Addresses

LNURL is a set of protocols for communicating information using URLs and HTTPS.  Perhaps the most common use of LNURL is transferring BOLT11 invoices.  A related protocol is Lightning Addresses which allow transforming a static identifier that looks like an RFC822 email address into a BOLT11 invoice.

An upside of LNURL is their flexibility and use of widely understood
HTTP: a web developer can use their existing skills to interact with LN
clients.  This allows web developers to handle business logic on the web
side of their application and only use a LN node to send and receive
payments.  It also makes it easy for web developers to use LN node
capabilities in new and interesting ways, such as LNURL-based
authentication.

A downside of LNURL is that hosted LNURL services may learn information
about their users’ payments and other actions.  For example, many
Lightning Addresses are managed by centralized services that have the
capability to intercept payments and potentially track how much a user
receives through their Lightning Address.  For this reason, alternatives
to LNURL or additional layers on top of it have been proposed.
