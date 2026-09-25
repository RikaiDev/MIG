# Mirror Interface Guidelines (MIG)

Version 0.1.0 — DRAFT. Provisional, not ratified. See `CHANGELOG.md`.

Design guidelines for interactive half-mirror ambient displays: surfaces that
are simultaneously a mirror, an optical measurement instrument, and a
touch/voice interface.

## Status contract

Every rule carries one status. Unmarked rules do not exist.

- `borrowed` — restates Apple HIG, Material Design, or WCAG. Citation given.
- `derived` — an established principle applied to mirrors by analogy.
- `proposed` — no precedent. Must not be cited above `info` severity by any
  tool until validated (see `validation.md`).

## Contents

- `principles.md` — the five principles everything else hangs from.
- `foundations/` — color, typography, layout grid, iconography, motion.
- `components.md` — buttons, edge bars, cards, transient confirmations.
- `mirror-hardware.md` — panels, optical ROI, lighting, viewing distance.
- `ai-interaction.md` — voice, presence, proactivity, privacy, zero-touch.
- `accessibility.md` — what WCAG means on a reflective surface.
- `checklists.md` — design-review checklists, mapped to mesen rule IDs.
- `validation.md` — open questions and how each gets resolved.
- `glossary.md` — terms.

## Versioning

Semantic. Minor = new proposed rules. Major = a validation graduates a rule
or revokes one. Tools must record which MIG version they cite.
