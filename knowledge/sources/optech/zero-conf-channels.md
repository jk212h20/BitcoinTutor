# Zero-conf channels

/ home / topics / 


    Zero-conf channels
    
  

  
    




Zero-conf channels, also called turbo channels, are new single-funded channels where the funder gives some or all of their initial funds to the acceptor. Those funds are not secure until the channel open transaction receives a sufficient number of confirmations, so there’s no risk to the acceptor spending some of those funds back through the funder using the standard LN protocol.

For example, Alice has several BTC in an account at Bob’s custodial
exchange.  Alice asks Bob to open a new channel paying her 1.0 BTC.
Because Bob trusts himself not to double-spend the channel he just
opened, he can allow Alice to send 0.1 BTC through his node to
third-party Carol even before the channel open transaction has received
a single confirmation.



Zero-conf channels were in use via various ad hoc mechanisms prior to a
standardized mechanisim for them being added to the LN protocol in 2022.

Primary code and documentation


  BOLTs #910 specifying zero-conf channels


Optech newsletter and website mentions

2024

  Challenges opening zero-conf channels when using the initially allowed v3 transaction topology


2023

  Challenges with zero-conf channels when dual funding


2022

  2022 year-in-review: zero-conf channels
  LND 0.15.1-beta adds support for zero-conf channels
  Core Lightning 0.12 adds support for zero-conf channels
  LND #6816 adds documentation about how to use zero-conf channels
  LDK #1401 adds support for zero-conf channel opens
  BOLTs #910 adds an option_zeroconf feature bit
  LDK #1311 adds support for SCID alias field useful for zero-conf channels


2021

  2021 year-in-review: zero-conf channel opens
  Rust-Lightning #1078 adds channel_type negotiation useful for zero-conf channels
  Discussion about standardizing zero-conf channel opens


See also


  
    JIT channels

    
  




Previous Topic:X-only public keys




Next Topic:Accountable Computing Contracts



Edit page
  Report Issue

## Related Topics

- topics ()
- JIT channels (jit-channels)
- X-only public keys (x-only-public-keys)
- Accountable Computing Contracts (acc)
