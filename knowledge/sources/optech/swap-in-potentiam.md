# Swap-in Potentiam (SIP)

/ home / topics / 


    Swap-in Potentiam (SIP)
    
  

  
    




Swap-in-Potentiam (SIP) is a protocol that facilitates the immediate transfer of confirmed on-chain Bitcoin to the Lightning Network. It reduces trust requirements compared to other instant channel opening methods like 0-conf channels by temporarily committing to co-ownership with a Lightning Service Provider (LSP) and delaying unilateral access per a timeout.

Swap-in potentiam (SIP) differs from typical HTLC-based swaps by
allowing for a pre-commital stage. This allows for; reusable swap addresses,
immediate transfers to lightning, and reduced trust requirements compared to
0-conf channels.

In this scheme, the reusable swap address is a contract between Alice and Bob
that allows for two spend paths; Alice and Bob cosign, or Alice
can spend unilaterally after a timeout.

Once the swap address is funded and confirmed, Alice can choose one of the
following options; swap the funds into a new or existing lightning network
channel with the help of Bob, or send the funds to a new onchain address with
the help of Bob. Alice also has the third option of waiting for the recovery
timeout if Bob is offline or uncooperative.

SIP is primarily geared towards mobile users who may go offline for extended
periods, and a variation called swaproot has been implemented in Phoenix wallet.

Primary code and documentation


  Moving Onchain Funds “Instantly” To Lightning (Jesse Posner, ZmnSCPxj)


Optech newsletter and website mentions

2023

  Swap-in Potentiam Announced
  Non-interactive LN channel open commitments


See also


  Hash Time Locked Contracts from Bitcoin Wiki
  Swap-in potentiam for Phoenix
  Swaproot
  
    Payjoin-in-Potentiam

    
  




Previous Topic:Submarine swaps




Next Topic:Taproot



Edit page
  Report Issue

## Related Topics

- topics ()
- Submarine swaps (submarine-swaps)
- Taproot (taproot)
