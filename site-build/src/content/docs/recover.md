---
title: "Pattern: recovering after tracking loss"
nav: Recover tracking
order: 8
group: Patterns
description: Pause submission, show how to resume, never hand the session to a bystander.
---

# Recovering after tracking loss

## Usage guide

Use when: any body-following or mirror-space interaction. Do not use as a silent retry loop — invisible retries teach users the system is random.

## Demonstration

Simulate hand-leave, recognition failure, and re-acquire in the [Mirror Lab](/lab.html#demo-states): submission pauses, the last good state freezes visibly, and a resume cue names the exact recovery action ("raise your hand into the frame").

## Specification

- On loss: pause submission immediately; freeze UI in the last confirmed state; show loss reason in plain words, never a spinner alone.
- Resume requires the original party's re-acquiring action; a different body never continues the session (see PPL-01).
- Parameters: loss grace period before declaring interruption; resume window before session reset.

## Verification and evidence

Inject tracking failures mid-task; measure resume success rate, time-to-resume, and abandonment. Pass criterion: zero silent session transfers across all trials.

## Known gaps

Optimal grace periods per scenario unmeasured; reason classification (occlusion vs exit vs lighting) accuracy is sensor-specific.
