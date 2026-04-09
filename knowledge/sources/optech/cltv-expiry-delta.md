# CLTV expiry delta

/ home / topics / 


    CLTV expiry delta
    
  

  
    




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

Primary code and documentation


  BOLT2


Optech newsletter and website mentions

2024

  LND #8491 adds a cltv_expiry flag on the lncli RPC commands addinvoice and addholdinvoice
  LN-Symmetry requires longer CLTV expiry deltas than expected


2023

  BOLTs #1086 specifies 2,016 blocks as the default absolute maximum CLTV expiry
  Longer CLTV expiry deltas as a mitigation against replacement cycling attacks
  LND #7768 implements BOLTs #1032 and #1063, allowing accepting a longer expiry than requested
  Eclair #2677 raises its max_cltv to 2,016 blocks due widespread increases in CLTV expiry deltas


2022

  Eclair #2468 implements BOLTs #1032, allowing accepting a longer expiry than requested


2021

  Rust-Lightning #849 makes cltv_expiry_delta configurable and reduces the default from 72 to 36


2020

  BOLTS #785 updates the minimum CLTV expiry delta to 18 blocks
  LND #4488 updates the minimum CLTV expiry delta users may set to 18 blocks
  New attack against LN payment atomicity: raising CLTV expiry delta recommended


2019

  LND #2759 lowers the default CLTV delta for all channels from 144 blocks to 40 blocks


See also


  HTLCs
  
    Channel jamming attacks

    
  




Previous Topic:Client-side validation




Next Topic:Cluster mempool



Edit page
  Report Issue

## Related Topics

- topics ()
- HTLC (htlc)
- channel jamming
attacks (channel-jamming-attacks)
- Client-side validation (client-side-validation)
- Cluster mempool (cluster-mempool)
