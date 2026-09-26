---
title: "Pattern: helping a first-time user start"
nav: Start interacting
order: 7
group: Patterns
description: Attract, guide to position, teach the action — as designed work, not a splash screen.
---

# Helping a first-time user start

## Usage guide

Use when: public or semi-public mirrors where nobody teaches. Do not use as a generic splash screen on personal mirrors — daily users need restraint, not onboarding (see scenarios). Never treat approach, gaze, or passing by as consent to capture.

## Demonstration

Show the behavior, don't just describe it: the attract loop responds to movement with a clearly digital, causal cue (e.g. a marker that follows the hand with visible cause and effect) — because on a real mirror, "a reflection that moves with you" alone does not say "interactive". Guide to a marked standing zone, then teach exactly one action. Try it in the [Mirror Lab](lab.html#demo-states).

## Specification

- States: idle-mirror → noticing → position-guidance → single-action-teach → engaged. Each state names its exit back to idle.
- Feedback per state: noticing (ambient, low-risk), guidance (directional, body-referenced), teach (one action, confirm visibly).
- Parameters to tune per deployment: trigger distance, guidance timing, teach-act complexity (exactly one).

## Verification and evidence

Test with zero instruction: can a visitor start alone? Measure time-to-first-successful-action and false-start rate. Related research: Looking Glass (CHI 2012) showed real-time response to passersby conveys interactivity — but it studied video-based public displays, not optical half-mirrors, so treat as cross-domain evidence, not a spec.

## Known gaps

Which single teach-action works per scenario is unmeasured; attract-loop brightness budgets under strong ambient light are deployment-specific.
