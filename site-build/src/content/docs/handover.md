---
title: "Pattern: deciding who controls when several approach"
nav: Control handover
order: 9
group: Patterns
description: Queue, request, or restart — never silent inheritance.
---

# Deciding who controls when several approach

## Usage guide

Use when: any mirror visible or reachable by more than one person. Do not use proximity ranking as control ("closest person wins") — it misfires constantly and cannot be explained to users.

## Demonstration

Role-play in the [Mirror Lab](/lab.html#demo-states): a second participant joins mid-task and gets queue / request-takeover / restart choices; the controller indicator never moves without an explicit action.

## Specification

- Exactly one visible controller; joining offers queue, confirmed takeover, or fresh restart.
- Takeover requires confirmation from both sides where feasible; otherwise the newcomer starts fresh.
- Idle control times out back to attract state; leaving ends the session by default.

## Verification and evidence

Two-person test with a confederate joining mid-task; any silent control transfer fails the trial. Related framework: Proxemic Interactions (2011) gives distance/orientation/movement relations for approach–engage–leave states — a design scaffold, not proof that any fixed distance means consent.

## Known gaps

Fair queuing under crowding is deployment-specific; group consent (families, classes) flows are undesigned.
