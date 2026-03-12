---
title: "Notes on Distributed Systems"
date: 2024-02-10
---

## Overview

A collection of notes from reading papers and building systems at scale.

## CAP Theorem in Practice

The CAP theorem states that a distributed system can only guarantee two of three properties: Consistency, Availability, Partition tolerance.

In practice, partition tolerance is non-negotiable — networks fail. So the real trade-off is between **C** and **A**.

## Lessons Learned

- Eventual consistency is often enough, but requires careful reasoning about your read paths.
- Idempotency is one of the most underrated properties to design for.
- The hardest bugs are the ones that only appear under partial failure.

## References

- Lamport, L. (1978). *Time, Clocks, and the Ordering of Events in a Distributed System.*
- Brewer, E. (2000). *Towards Robust Distributed Systems.* PODC keynote.
