# AI interaction

## Voice (derived — HIG Siri guidelines, Material voice)

- **A1.** Every voice action echoes visually within 500ms. Voice without a
  visual receipt is untrustworthy on a shared surface.
- **A2.** Confirmation for irreversible actions, never for navigation
  (borrowed — HIG confirmation philosophy).

## Presence and proactivity (proposed)

- **A3.** The mirror knows who stands before it and adapts density — but
  MUST show whose profile is active, persistently, in a corner. Silent
  personalization on a shared bathroom surface is a privacy defect.
- **A4.** Proactive suggestions (health nudges) are glanceable cards, never
  modal, never spoken unprompted. Health data is never read aloud by default.

## Method coverage (proposed)

- **A5.** Safety-critical and frequent tasks must be completable by at
  least TWO independent methods (e.g. gesture + voice). A single method is a
  single point of failure — wet hands, noise, distance, tremor each kill a
  different one. Document the pair per task (see `interaction-methods.md`).
- **A6.** Any timed commit (dwell, breath-hold, countdown) needs an on-screen
  progress indicator AND an immediate cancel path (derived — WCAG 2.5.2
  pointer cancellation, 2.2.1 timing adjustable).

## Privacy (borrowed — platform privacy norms, HIPAA/GDPR spirit)

- **A7.** Measurement data never leaves the device without explicit,
  per-purpose consent. On-device processing is the default architecture.
- **A8.** No cameras-monitoring indicators that can be disabled. Recording
  state is hardware-visible.
