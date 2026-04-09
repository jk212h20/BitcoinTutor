# Large channels

/ home / topics / 


    Large channels
    
  

  
    




Also covering Wumbo

Large channels are LN payment channels where both peers send the parameter option_support_large_channel and which can be funded with a balance over 0.16777216 BTC.

During the early development of LN, developers agreed to temporarily limit the maximum size of channels to less than
224 base units (0.16777216 BTC; about $40 at the time) and
individual payments to 232 msat (0.04294967296 BTC; about
$10 at the time).  The goal was to limit the amount any individual
early adopter would lose due to bugs in the software:


  I guarantee that early releases of lightning clients will have
bugs and people will lose money because of them. […] I sleep
better at night knowing that, if you lose money because of my bug, I
can buy you a beer/coffee in exchange for your story and we’re about
even. —LN developer Rusty Russell (emphasis in original)


After several years of LN development, the 2018 LN specification
meeting decided to allow implementations to opt-in to wumbo
(jumbo) channel sizes with no protocol-level amount limit, although
implementations and users can still refuse to accept channels over
a customizable size.  Support for this new feature, later named
option_support_large_channel saw widespread implementation among LN
software in 2020.

The limit of approximately 0.04 BTC per payment still remains part of
the LN protocol specification, but multipath payments allow splitting a payment amount above the limit
into several smaller parts that are each below the limit, making it
possible for any compatible software to optionally send or receive
payments above the limit.

Primary code and documentation


  Update to BOLT specifaction adding optional large channel support


Optech newsletter and website mentions

2023

  Core Lightning #6783 deprecates the large-channels conf option, making them always enabled


2022

  LDK #1425 adds support for large channels


2021

  BOLTs #877 removes the protocol-level per-payment amount limit


2020

  2020 year in review: large channels
  LND #4567 adds a new --maxchansize parameter for large channels
  LND 0.11.0-beta released with support for large channels by default
  LND #4429 enables support for large channels by default
  C-Lightning fixes incompatibility when opening large channels with Eclair
  LND 0.10.0-beta released with the ability to create invoices over 0.043 BTC
  C-Lightning 0.8.2 released with support for large channels
  LND #4075 allows creating invoices over 0.043 BTC
  C-Lightning #3612 adds support for option_support_large_channel
  Eclair #1323 advertise support for channel opens over ~0.17 BTC
  BOLTs #596 updates BOLT2 to allow channel opens over ~0.17 BTC


2018

  LN 1.1 specification meeting: wumbo channels and payments proposal


See also


  
    Origin of “wumbo” term (video)

    
  




Previous Topic:Kindred replace by fee




Next Topic:Liquidity advertisements



Edit page
  Report Issue

## Related Topics

- topics ()
- multipath payments (multipath-payments)
- Kindred replace by fee (kindred-replace-by-fee)
- Liquidity advertisements (liquidity-advertisements)
