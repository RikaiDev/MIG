---
title: "Overview"
description: "Mirror Interface Guidelines: design rules for interactive half-mirror ambient displays."
nav: "Overview"
---
# Mirror Interface Guidelines (MIG)

Version 0.1.0 — DRAFT. Provisional, not ratified. See `changelog.md`.

Design guidelines for interactive half-mirror ambient displays: surfaces that
are simultaneously a mirror, an optical measurement instrument, and a
touch/voice interface.

## Start here

- New to mirrors? Read `human.md` first (rituals, recognition, glance),
  then `interaction-methods.md` (pick an input method deliberately).
- Designing a screen? `checklists.md` is the review gate.
- Challenging a rule? Every rule carries status — `validation.md` explains
  how proposed rules graduate by evidence.

## How to read a rule

Each rule shows an ID (`P1`, `C1`, `MIG-C2`), a status, a statement, and its
grounds. Status meanings: `borrowed` restates HIG / Material / WCAG;
`derived` applies an established principle by analogy; `proposed` has no
precedent and caps at `info` until validated.

## Foundations

Token tables with measured values: `foundations/color.md` (roles),
`foundations/typography.md` (scale), `foundations/motion.md` (tokens);
`foundations/layout-grid.md`, `foundations/iconography.md`.

## Method catalog

No input method is mandatory: `interaction-methods.md` covers touch on
glass, mid-air gesture, face and gaze, voice, phone as remote, presence —
each with fits, watch-fors, and failure modes.

## Research behind it

`history.md` traces calm computing to bathroom mirrors; `references.md`
is the bibliography. Every citation is machine-verified
(`bun site-build/check-citations.mjs`).

## Versioning

Semantic. Minor = new proposed rules. Major = a validation graduates a rule
or revokes one. Tools must record which MIG version they cite.
