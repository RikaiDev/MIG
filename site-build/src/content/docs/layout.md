---
title: Information and layout
nav: Information & layout
order: 3
group: Guide
description: Where content goes, how big, how much — without fighting the reflection. Task reflection zones, type, density.
---

# Information and layout

The background is not the designer's choice, so layout starts from the reflection each task needs — not from a screen grid.

## Task reflection zones, not fixed safe areas

Suggested scenario-based practice, not researched fixed numbers:

```rule en
id: ZONE-01
title: Define each task's required reflection zone before placing information
normative: should
evidence: decision
tech: both
scope: All mirror content involving the human body.
statement: Write down the reflection information each task must keep before placing anything; corners dodge the body but may be unreadable and unreachable — keep reflection, legibility, and reachability in one decision.
why: The same UI may sit over white shirts, dark clothes, patterns, windows, or a second person; no fixed clear zone covers that.
wrong: Site-wide "empty middle, info in corners" leaves price tags covering the garment in a try-on task.
do: Try-on task: price and options docked low-right, garment zone from shoulders to knees clear.
fix: Define keep and exclusion zones per task from the table below; keep information out of keep zones, put targets within reach.
impl: Keep and exclusion zones per task go in the spec; verify with three heights and three clothing types on video.
verify: Three users of different heights and clothing perform the task on video; check the keep zone was never covered.
gaps: Quantified keep-zone sizes per task await field data; v1 gives direction, not centimeters.
```

| Task | Reflection information to keep | Design must avoid |
|---|---|---|
| Grooming, appearance check | Face and the area being worked on | Tips or menus permanently covering the spot being checked |
| Try-on, outfit comparison | Garment outline, body proportion, turn-and-compare | Large panels covering the garment under judgment |
| Movement guidance | Posture, joints, range of motion | Decorative animation mixed with guidance marks |
| Exhibition, play | Body or reflection zones the experience depends on | Many effects, no clue which change the user caused |

## Body references for left and right, never mirrored UI

```rule en
id: POS-02
title: Indicate direction with the user's body reference, never flip the whole UI
normative: should
evidence: cross-domain
tech: both
scope: Movement guidance and try-on content with left/right directions.
statement: "Raise your left hand" means the user's bodily left; design with body references, never mirror-flip the entire UI with its text.
why: Mirrors already reverse; screen-coordinate left conflicts with felt left, and flipping mirrors the text into unreadability.
wrong: Mirroring the whole interface to match the reflection, turning instructions into mirror writing.
do: Arrow drawn from the user's viewpoint plus the words your left hand.
fix: Draw arrows from the user's viewpoint; text always reads forward; prefer "your left hand" over "left side".
impl: Text never mirrors; audit every directional asset for screen-coordinate wording.
verify: Ask users to raise hands on instruction; redesign if left/right errors beat chance.
gaps: Children's and older adults' grasp of body-reference wording untested.
```

## Type and targets: record physical conditions, not just px

Record physical size, viewing distance, and test conditions alongside any size. Without hardware and context data, never freeze "at least N px" — record device, distance, lighting, population, task, and results.
