---
title: "Accessibility"
description: "What WCAG means on a reflective surface."
nav: "Accessibility"
---
# Accessibility on mirrors

WCAG applies in full; these clauses need mirror-specific readings:

- **1.4.3/1.4.6 Contrast.** Read against the backing plate PLUS worst-case
  reflection. Test procedure in `mirror-hardware.md` lighting section.
- **2.5.8 Target size.** 24px minimum is a floor, not a goal; prefer 44px
  (HIG) for primary actions.
- **2.3.3 Animation from interactions.** Reduced-motion variant is
  mandatory, not a setting buried three menus deep.
- **2.5.2 Pointer cancellation.** Dwell/breath activation must be abortable
  mid-gesture.
- **Older adults.** Where the cohort is 65+: 7.0:1 contrast, 16sp floor
  (18sp preferred), no dwell-only actions (tremor + breath control).
