# Redundant overpayments

/ home / topics / 


    Redundant overpayments
    
  

  
    




Also covering Stuckless payments and Boomerang payments

Redundant overpayments are LN payments split into parts where the spender sends a greater amount and more parts than necessary to pay the receiver’s invoice.

Even if some of the parts fail to arrive at the receiver’s node on the
first try due to forwarding failures, enough of the other parts may
arrive to allow the receiver to claim their invoiced amount.  Protocol
features prevent the receiver from claiming more than the invoiced
amount.  Compared to sending an exact amount, over paying initially can
eliminate the latency of resending failed payments in most cases.

An overpayment requires a mechanism that prevents the receiver from
claiming more than the invoiced amount.  The simplest mechanism for
implementing that is for the spender to not provide the receiver with
all the information necessary to claim each payment part until the
receiver indicates which payment parts have been received.  The spender
can then send the claim information for only the number of parts needed
to claim the invoiced amount.  A downside of this approach is that it
requires an extra roundtrip of communication between the receiver and
spender, which may be roughly equivalent to the time needed to handle
one round of payment failures.  By comparison, in the best case, an
exact payment will complete on the first try.  That means this type of
redundant overpayments can, in most cases, put a low ceiling on
the worst-case payment time at the cost of roughly doubling the
best-case time it would take to send a non-overpayment.

Other mechanisms may be able to use cryptography to eliminate the
roundtrip communication overhead, allowing overpayments to complete in
the same best-case amount of time as non-overpayments.  However, that
approach may come with additional complexity and may require a
significant number of forwarding nodes upgrade to support the new
protocol before it can become widely used.

Primary code and documentation


  Stuckless payments
  Boomerang


Optech newsletter and website mentions

2023

  LN developer discussion about protocol changes to support redundant overpayments
  Using redundant overpayments instead of a quality-of-service flag


2022

  Speeding up payment delivery with algorithms and stuckless payments


2021

  LN summit 2021: stuckless payments


2020

  Presentation summary: Boomerang


2019

  Stuckless payments proposed


See also


  Simplified multipath payments
  
    Atomic multipath payments

    
  




Previous Topic:Quantum resistance




Next Topic:Rendez-vous routing



Edit page
  Report Issue

## Related Topics

- topics ()
- Simplified multipath payments (multipath-payments)
- Atomic multipath payments (atomic-multipath)
- Quantum resistance (quantum-resistance)
- Rendez-vous routing (rendez-vous-routing)
