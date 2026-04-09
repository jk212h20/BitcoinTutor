# Attributable failures

/ home / topics / 


    Attributable failures
    
  

  
    




Attributable failures are LN payment forwarding failures or delays that can be attributed to a pair of nodes (who may have one or more channels between each other), allowing spenders to avoid using slow or failure-prone nodes for future payments.  Additional fields in LN messages for tracking failures and delays are in the process of being standardized as of 2025.



  This topic description is a stub.  We would welcome a pull
request
providing more background information about the topic.


Primary code and documentation


  BOLTs #1044: attributable failures


Optech newsletter and website mentions

2025

  LDK #3801 extends attributable failures to the payment success path
  LDK #3868 reduces the precision of HTLC hold time for attributable failures from 1ms to 100ms units
  Eclair #3109 extends its attributable failures support to trampoline payments
  LDK #3817 puts attributable failures under a test-only flag until broader adoption is achieved
  Discussion about whether attributable failures reduce LN privacy
  LDK #2256 and LDK #3709 improve attributable failures
  LDK #3629 improves logging of remote failures that can’t be attributed


2022

  Updated proposal for attributing payment forwarding failures and delays


2019

  
    Proposal to authenticate messages about LN payment forwarding delays

    
  




Previous Topic:Atomic multipath payments (AMPs)




Next Topic:Basic Bitcoin Lisp Language (bll)



Edit page
  Report Issue

## Related Topics

- topics ()
- Atomic multipath payments (AMPs) (atomic-multipath)
- Basic Bitcoin Lisp Language (bll) (basic-bitcoin-lisp-language)
