---
title: "CVEs (various)"
slug: "cve"
domain: network
difficulty: 4
source: optech
related: ["cve-2018-17144", "consensus-cleanup-soft-fork", "eclipse-attacks", "responsible-disclosures", "dandelion"]
---

Also covering CVE-2012-2459, CVE-2013-2292, CVE-2015-3641, CVE-2015-6031, CVE-2017-12842, CVE-2017-18350, CVE-2018-17145, CVE-2020-14198, CVE-2020-26895, CVE-2020-26896, CVE-2021-31876, and CVE-2023-39910

Common Vulnerabilities and Exposures (CVEs) are serious vulnerabilities that have been cataloged to help developers, researchers, and the public efficiently share information about potential threats.

CVEs with their own topic pages


  CVE-2018-17144  was a bug that could have allowed an attacker to spend the same bitcoins more than once.


Other CVEs


  
    CVE-2012-2459: It’s possible to mutate a valid block into an invalid block that commits to the same merkle root.  When vulnerable versions of Bitcoin Core saw such an invalid block, they cached its rejection and so would later reject the valid version of the block, which could easily lead to short-term network partitions where users could be tricked into accepting invalid bitcoins. Fixed in Bitcoin 0.6.1.

    
      CVE-2012-2459: part of motivation for taproot tagged hashes
      CVE-2012-2459: related to new Bitcoin Core vulnerability disclosure
    
  
  
    CVE-2013-2292: A vulnerability in Bitcoin Core that it was believed could have allowed an attacker to create a block that would take over three minutes to verify.  Proposed to be fixed in the consensus cleanup soft fork, although the suggestion solution encountered controversy.

    
      CVE-2013-2292: poor tx verification performance inspires consensus cleanup
    
  
  
    CVE-2015-3641: Bitcoin Core would accept P2P messages up to about 32 megabytes in size from up to about 130 peers, requiring allocating over 4 gigabytes of memory—enough to result in many nodes being terminated for excessive memory use.

    
      CVE-2015-3641: out-of-memory crash when Bitcoin Core would accept over 4 GB in messages from peers
    
  
  
    CVE-2015-6031: The miniupnpc library used by Bitcoin Core was vulnerable to a remotely triggered crash and (in some cases) remote code execution.

    
      Remote code execution due to bug in miniupnpc, similar to CVE-2015-6031
    
  
  
    CVE-2017-12842: Allows creating an SPV proof for a transaction that doesn’t exist by specially crafting a real 64-byte transaction that gets confirmed in a block.  Can be used to steal from SPV clients, although other known attacks against SPV clients are cheaper. Proposed to be fixed in the consensus cleanup soft fork.

    
      CVE-2017-12842: discussion about minimum transaction size
      CVE-2017-12842: merkle tree fix proposed in consensus cleanup soft fork
      CVE-2017-12842: vulnerability in Bitcoin SPV proofs
      CVE-2017-12842: discussion of lowering minimum relayable transaction size
      CVE-2017-12842: Bitcoin Core PR Review Club discussion about lowering min relayable tx size
    
  
  
    CVE-2017-18350: A vulnerability in Bitcoin Core affecting users of SOCKS proxies.  Fixed in Bitcoin Core 0.16.0.

    
      CVE-2017-18350: full disclosure of SOCKS proxy vulnerability
    
  
  
    CVE-2018-17145: Flooding a node with an excess of inv messages could lead to the node running out of memory and crashing, increasing the risk of eclipse attacks that can steal money.  Affected Bitcoin Core, Btcd, Bcoin, and multiple altcoin nodes.  Fixed in Bitcoin Core 0.16.2, Btcd 0.21.0-beta, and Bcoin 1.0.2.

    
      CVE-2018-17145: full disclosure of inv out-of-memory DoS attack
    
  
  
    CVE-2020-14198: Bitcoin Core’s banlist was unbound and could grow to great size if an attacker controlled many addresses (e.g. easy-to-obtain IPv6 addresses).

    
      CVE-2020-14198: Unbound Bitcoin Core ban list CPU/memory DoS
    
  
  
    CVE-2020-26895: Vulnerability in LND due to accepting non-standard “high-S” signatures, which could have prevented channels from closing in a timely manner and so allowed funds to be stolen.  Fixed in LND 0.10.0-beta.

    
      CVE-2020-26895: BOLTs #807 adds warning about non-standard signatures
      CVE-2020-26895: full disclosure of on-standard signature acceptance
    
  
  
    CVE-2020-26896: Vulnerability in LND due to improperly revealing local preimages in response to foreign routing requests, which could have allowed funds to be stolen.  Fixed in LND 0.11.0-beta.

    
      CVE-2020-26896: LND #4752 updates preimage revelation code
      CVE-2020-26896: BOLTs #808 adds warning about improper preimage revelation
      CVE-2020-26896: full disclosure of improper preimage revelation
    
  
  
    CVE-2021-31876: The BIP125 specification of opt-in Replace By Fee (RBF) says that an unconfirmed parent transaction that signals replaceability makes any child transactions that spend the parent’s outputs also replaceable through inferred inheritance. Bitcoin Core does not implement this behavior; Btcd does implement it.

    
      CVE-2021-31876: discrepancy between BIP125 and Bitcoin Core implementation
    
  
  
    CVE-2023-39910: Vulnerability in Libbitcoin bx command produces insecure entropy when used with the seed parameter, having led to the theft of the full balance of multiple wallets.

    
      Milk Sad team disclosed CVE-2023-39910 insecure entropy in Libbitcoin bx command
