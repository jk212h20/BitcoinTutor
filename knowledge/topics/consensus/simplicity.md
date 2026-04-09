---
title: "Simplicity"
slug: "simplicity"
domain: consensus
difficulty: 5
source: optech
related: ["sighash_anyprevout", "covenants", "basic-bitcoin-lisp-language", "simple-taproot-channels", "soft-fork-activation"]
---

Simplicity is a work-in-progress low-level programming language with greater flexibility and expressiveness than Bitcoin Script. It allows you to verify the safety, security and costs of a program. It also offers native merklized scripting, formal semantics and type checking. To use Simplicity on Bitcoin will require a soft fork and such a proposal has not yet been made.  Currently there is Simplicity support for test branches of the ElementsProject.org and Bitcoin Core codebases.

At its core, Simplicity consists of nine primitive operators called
combinators whose semantics are formally specified. However,
implementing Bitcoin functionality at such a low level results in
large, slow and expensive programs.  Pre-written Simplicity programs
that implement basic functions can be added to Bitcoin consensus so
that other Simplicity programs can inline those functions using a
short identifier, eliminating their size penalty.  The functionality
of the inlined Simplicity code can then be reimplemented in more
efficient languages, such as C, which can be proved to be equivalent
to the pure Simplicity program—eliminating speed or memory
penalties.  These substitutions (called jets) allow an entire
program to be specified in the Simplicity language, including
operations like hash functions and signature verification, and yet
be executed using code from other languages to achieve performance
similar to today’s Bitcoin Script.

Assuming Simplicity is soft forked into Bitcoin with sufficient jets
at some stage, new features such as SIGHASH_ANYPREVOUT—which currently requires a soft fork to
implement—could be used on Bitcoin without needing separate
consensus rule changes.  Although Simplicity provides certain proofs of
correctness, care will still need to be applied in the design of any
contract protocol that relies on more than just bitcoin encumbrances.
