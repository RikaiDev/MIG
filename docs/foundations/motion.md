# Foundations — Motion

:::easing

## Rules

- **M1 (borrowed — WCAG 2.3.3, HIG Reduce Motion).** Every animation ships
  with a reduced-motion variant that communicates the same state change
  statically. No exceptions for "delight".
- **M2 (derived — Material motion easing).** 200–300ms standard easing for
  feedback; nothing ambient loops forever.
- **M3 (proposed).** Decorative pulses, breathing halos, and ripples are
  NEVER signifiers. They may ornament an already-clear target, never carry
  meaning alone. (Rationale: unverifiable by tools, hostile to vestibular
  disorders, and no guideline has ever prescribed them.)
- **M4 (borrowed — HIG feedback).** Press feedback is immediate (<100ms),
  local to the target, and visible without motion (opacity or shape change).
