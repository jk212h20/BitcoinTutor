# Reproducible builds

/ home / topics / 


    Reproducible builds
    
  

  
    




Also covering Gitian and Guix

Reproducible builds are software that was compiled deterministically, making it possible for multiple people to compile the same source code into identical binaries.

This means no one person or computer needs to be trusted to produce
the executable binaries that most people use.  Additionally, people
who compile the software themselves can ensure that they received an
executable that’s identical to what other people received, helping to
ensure their software will remain compatible with other software, e.g.
a full node staying in consensus with the rest of the network.

Primary code and documentation


  Bitcoin Core PR #15277: Enable building in Guix containers


Optech newsletter and website mentions

2022

  New website to monitor the current status of various Bitcoin project’s reproducible builds


2021

  Bitcoin Core #22642 allows concatenation of Guix-based attestations for batch verification
  Question: what’s the purpose of Guix within Gitian?
  Bitcoin Core #21462 adds tooling for attesting to Guix-based builds
  Bitcoin Core #17920 adds Guix support for macOS builds


2020

  Bitcoin Core #17595 adds Guix support for Windows builds
  Eclair #1307 updates packaging to also reproducibly build Eclair GUI
  Eclair #1295 allows the eclair-core module to be reproducibly built


2019

  2019 year-in-review: reproducible builds
  Merged PR for reproducible build of Bitcoin Core using GNU Guix
  Breaking Bitcoin summaries: Bitcoin build system security
  New reproducibly-build architecture and Snap packages for Bitcoin Core
  Notable Bitcoin Core PRs: reproducible builds using GNU Guix


See also


  
    Presentation: Bitcoin Build System Security

    
  




Previous Topic:Replacement cycling




Next Topic:Responsible disclosures



Edit page
  Report Issue

## Related Topics

- topics ()
- Replacement cycling (replacement-cycling)
- Responsible disclosures (responsible-disclosures)
