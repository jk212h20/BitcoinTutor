# Trimmed HTLC

/ home / topics / 


    Trimmed HTLC
    
  

  
    




Trimmed HTLCs are forwardable LN payments that are below a channel’s economic limit for being resolved onchain.  Instead, a commitment transaction that goes onchain pays the value of all trimmed HTLCs to transaction fees.

Different channels may have different limits for uneconomical
outputs, so a trimmed HTLC in one channel may
be a regular HTLC in another channel.  That means trimmed HTLCs are
constructed, used, and resolved the same way as regular HTLCs for most
purposes.

If trimmed HTLCs weren’t allowed, the minimum value a channel could
send, accept, or forward would be the amount it considered to be
economic onchain, which can easily be thousands of sats.  Trimmed HTLCs
allow channels to forward very small payments.

Unfortunately, trimmed HTLCs come with risks and can create incentive
problems.  A malicious party can destroy part of a channel’s value using
trimmed HTLCs or use trimmed HTLCs they have no intention of resolving
to get their counterparty to pay part of a channel’s transaction fees.
Suggested alternatives have included destroying trimmed
HTLC value by [paying it to an OP_RETURN output or using a
probabilistic payment when trimming is necessary.

Primary code and documentation


  BOLT3: trimmed outputs


Optech newsletter and website mentions

2025

  Discussion of tradeoffs in ephemeral anchor scripts related to spending trimmed HTLC value


2024

  Continued discussion about placing trimmed HTLC value in ephemeral anchor outputs
  Discussion about placing trimmed HTLC value in ephemeral anchor outputs and consequences for MEV


2023

  BOLTs #919 suggests nodes stop accepting additional trimmed HTLCs beyond a certain value


See also


  HTLCs
  
    Uneconomical outputs

    
  




Previous Topic:Transitory soft forks




Next Topic:Unannounced channels



Edit page
  Report Issue

## Related Topics

- topics ()
- uneconomical
outputs (uneconomical-outputs)
- HTLCs (htlc)
- Transitory soft forks (transitory-soft-forks)
- Unannounced channels (unannounced-channels)
