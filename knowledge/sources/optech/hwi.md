# Hardware wallet interface (HWI)

/ home / topics / 


    Hardware wallet interface (HWI)
    
  

  
    




Hardware Wallet Interface (HWI) is a Python library and command-line tool used to interface with hardware wallets using Partially-Signed Bitcoin Transactions (PSBTs) and output script descriptors.

Designed primarily by Bitcoin Core developers to allow that software to
use hardware wallets as external signers, HWI is now being used by
other wallets as well.

Primary code and documentation


  HWI repository


Optech newsletter and website mentions

2025

  Sparrow 2.1.0 begins using Lark as an alternative to HWI


2023

  Bitcoin Core #21576 allows wallets using an external signer to RBF fee bump


2022

  Bitcoin Core #23578 using HWI to add support for externally signing taproot keypath spends
  BDK #682 adds signing capabilities for hardware signing devices using HWI and rust-hwi


2021

  HWI #475 adds support for the Blockstream Jade hardware signer
  Bitcoin Core GUI #4 adds initial support for using HWI external signers via the GUI
  Significantly updated and extended HWI documentation
  Bitcoin Core #16546 adds external signer interface compatible with HWI


2020

  HWI #363 adds support for Bitbox02 hardware wallet
  Initial release of Lily Wallet supports HWI
  Fix for segwit fee overpayment attack affects HWI compatibility
  BTCPay Vault using HWI for signing


2019

  2019 year-in-review: HWI
  CoreDev.tech discussions: HWI integration into Bitcoin Core
  Bitcoin Core 0.18 with basic hardware signer support
  Bitcoin Core preliminary hardware wallet support


See also


  Partially-Signed Bitcoin Transactions (PSBTs)
  Output script descriptors
  Miniscript
  
    Exfiltration-resistant signing

    
  




Previous Topic:Hash Time Locked Contract (HTLC)




Next Topic:Inbound forwarding fees



Edit page
  Report Issue

## Related Topics

- topics ()
- Partially-Signed Bitcoin Transactions (PSBTs) (psbt)
- Output script descriptors (output-script-descriptors)
- Miniscript (miniscript)
- Exfiltration-resistant signing (exfiltration-resistant-signing)
- Hash Time Locked Contract (HTLC) (htlc)
- Inbound forwarding fees (inbound-forwarding-fees)
