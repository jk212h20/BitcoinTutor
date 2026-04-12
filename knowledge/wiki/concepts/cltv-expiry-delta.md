---
title: "CLTV expiry delta"
type: concept
tags: [lightning, difficulty-2]
created: 2026-04-12
updated: 2026-04-12
sources: [sources/optech-topics.md]
related: ["concepts/htlc.md", "concepts/client-side-validation.md", "concepts/cluster-mempool.md"]
summary: "CLTV expiry delta is the number of blocks a node has to settle a stalled payment before it could potentially lose money"
difficulty: 2
domain: lightning
---

CLTV expiry delta is the number of blocks a node has to settle a stalled payment before it could potentially lose money.  The deltas apply within a chain of HTLCs and use the OP_CHECKLOCKTIMEVERIFY (CLTV) opcode.

Imagine Alice forwards a payment to Bob who forwards the payment to
Carol.

Forwarded payments:
    Alice ------> Bob ------> Carol
          (1 BTC)     (1 BTC)


If Carol doesn’t claim the payment by releasing the HTLC preimage, but she also doesn’t reject the payment, Bob’s funds are
stuck.  Not only that, but he can’t resolve the forwarded payment he
received from Alice, so her funds are stuck as well.  To avoid funds
becoming permanently stuck, HTLCs have an expiry after which Bob will
be able to claim a refund.  After Bob receives his refund from Carol, he
can reject the payment from Alice—giving her a refund.  Alternatively,
Alice can wait for her own expiry and reclaim the payment she forwarded
to Bob.  Everyone gets back what they started with, which is a safe
outcome.

Forwarded payments:
    Alice ------> Bob ------> Carol
          (1 BTC)     (1 BTC)

Refunds after expiry:
    Alice <------ Bob <------ Carol
          (1 BTC)     (1 BTC)


However, if Alice can claim her refund before Bob receives his refund,
then it’s possible for Carol to accept her payment.  In this case, Alice
spends nothing and Carol receives payment with Bob losing the
difference.

Forwarded payments:
    Alice ------> Bob ------> Carol
          (1 BTC)     (1 BTC)

Refund after expiry to Alice and payment to Carol:
    Alice <------ Bob ------> Carol
          (1 BTC)     (1 BTC)


The CLTV expiry delta tries to prevent Bob from losing value this way.
When Alice gives Bob an HTLC that allows her to claim a refund after
x blocks, Bob gives Carol an HTLC that allows him to claim a refund
after x - y blocks.  The y parameter is Bob’s CLTV expiry delta:
it’s how many blocks he has to claim a refund onchain before he could
potentially lose money if Alice claims her refund.

Higher CLTV expiry deltas provide more safety as they give an LN node more time
to get an HTLC refund transaction confirmed onchain before that node is
at risk of losing funds.  However, higher CLTV expiry deltas magnify the
problems of channel stalling, both accidental stalling (e.g. a node goes
offline suddenly) and malicious stalling (e.g. channel jamming
attacks).

For example, imagine a payment that will be sent across 20 hops each
with an CLTV expiry delta of 100 blocks.  If that payment stalls, it
could be up to 2,000 blocks (about two weeks) until the spender gets
a refund and can resend the payment again.

There’s no universally agreed-upon tradeoff between security and
worst-case payment delivery time, so LN implementations tend to each use
different default CLTV expiry deltas, often change those defaults, and
usually allow users to choose their own setting.

---
*Source: [Bitcoin Optech Topics](https://bitcoinops.org/en/topics/) — ingested 2026-04-12*
