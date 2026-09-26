---
title: "Pattern: ending and clearing personal content"
nav: End & clear
order: 10
group: Patterns
description: Finish, cancel, clear data, reset for the next user — leaving is not an ending.
---

# Ending and clearing personal content

## Usage guide

Use when: any session that captures, personalizes, or changes shared state. Do not use a single "done" button that leaves data behind — leaving is not a clean ending.

## Demonstration

Walk the exit branch in the [Mirror Lab](lab.html#demo-states): finish with receipt, cancel with undo window, walk-away timeout with visible countdown, and the reset state the next user meets.

## Specification

- Finish states: completed (what is kept + how to delete), cancelled (undo window), timed-out (countdown shown, then cleared).
- Unconfirmed leaving deletes by default; confirmed keeps show retention and deletion path.
- Reset state for the next user is a designed screen, not leftover UI.

## Verification and evidence

Exit walkthrough per deployment: abandon mid-flow at every step and confirm no personal residue; measure next-user confusion rate on the reset screen.

## Known gaps

Retention presentation wording across jurisdictions untested; shared-household mirrors (same users daily) need a distinct exit model.
