---
title: "Trampoline payments"
slug: "trampoline-payments"
domain: lightning
difficulty: 2
source: optech
related: ["timeout-trees", "transaction-bloom-filtering"]
---

Trampoline payments are a proposed type of payment where the spender routes the payment to an intermediate node who can select the rest of the path to the final receiver.

Using a single trampoline node necessarily reveals the destination to
it.  To regain privacy, a spender may require a payment be routed
through multiple trampoline nodes so that none of them knows whether
they’re routing the payment to the final receiver or just another
intermediate trampoline node.

Although allowing trampoline nodes to select part of the path likely
requires paying more routing fees, it means the spender doesn’t
need to know how to route payments to any arbitrary node—it’s
sufficient for the spender to know how to route a payment to any
trampoline-compatible node.  This is advantageous for lightweight
LN clients that aren’t able to track the full network graph because
they’re often offline or run on underpowered mobile hardware.
