# Unannounced channels

/ home / topics / 


    Unannounced channels
    
  

  
    




Also covering Private channels

Unannounced channels are LN channels that are not advertised to the network for use in routing.

Most unannounced channels are believed to belong to users that simply
don’t intend to route payments, such as users of mobile clients that
aren’t always online to route payments.

An alternative name is private channels, but there’s contention
between experts about whether the channels improve privacy or not, so it may be
preferable to use the universally accepted name “unannounced
channels.”

Optech newsletter and website mentions

2024

  Core Lightning #6869 updates the listchannels RPC to no longer list unannounced channels


2023

  LND v0.17.0-beta ships with experimental support for unannounced taproot and MuSig2 LN channels


2021

  C-Lightning #4611 updates the keysend RPC to support unannounced channels


2020

  C-Lighting #3623 improves unannounced channel privacy when routing payments
  C-Lightning #3600 adds blinded paths to improve unannounced channel privacy
  Breaking the link between UTXOs and unannounced channels
  Eclair #1283 allows multipath payments to traverse unannounced channels
  C-Lightning #3351 enhances invoice RPC for private channels


2019

  Talk about LN topology and lack of public info about unannounced channels
  C-Lightning #2234 adds route hints for private channels to invoice RPC
  C-Lightning #2230 adds a private flag to the listpeers RPC


2018

  LND #1944 tweaks sendtoroute RPC to allow routing via private channels


See also


  
    Blinded paths

    
  




Previous Topic:Trimmed HTLC




Next Topic:Uneconomical outputs



Edit page
  Report Issue

## Related Topics

- topics ()
- Blinded paths (rendez-vous-routing)
- Trimmed HTLC (trimmed-htlc)
- Uneconomical outputs (uneconomical-outputs)
