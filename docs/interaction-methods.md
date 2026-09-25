# Interaction methods

A mirror mandates no input method. Each method below lists when it fits,
what to watch for, and how it fails. Pick deliberately; document the pick.

## Touch on glass (capacitive foil or IR frame)

- Fits: short, deliberate confirmations at arm's length.
- Watch: wet hands mis-trigger; glass has no tactile edge — every target
  needs a visible bound plus label (derived — Norman signifiers, WCAG 2.5.8).
- Fails: distance (>1m), gloves, water film. Never the only path for a
  critical action.
- Sizes: 24px floor (borrowed — WCAG 2.5.8); 44px preferred where the user
  stands back (borrowed — HIG 44pt).

## Mid-air gesture (swipe, hold, push)

- Fits: coarse navigation (next/previous/dismiss), hygiene-critical contexts.
- Watch: no hover state exists — every gesture needs an on-screen affordance
  showing it is available PLUS live progress while performed (derived —
  Norman mapping and feedback).
- Fails: discoverability (users don't wave at mirrors unprompted); fatigue
  past ~3 repetitions; false triggers from passersby. Dwell/hold needs an
  on-screen progress indicator AND an immediate cancel path (derived —
  WCAG 2.5.2, 2.2.1).
- Never prescribe a specific decorative treatment (pulse, halo, ripple) as
  the signifier — ornament may decorate a clear target, never carry meaning.

## Face and gaze (look, blink, expression)

- Fits: attention confirmation, presence-gated personalization, accessibility
  for users who cannot lift their arms.
- Watch: looking IS the default state before a mirror — gaze-as-click
  Midas-touches everything. Require an explicit commit step (dwell with
  progress, blink, or voice confirm) before any irreversible action
  (derived — HIG confirmation philosophy).
- Fails: glasses/sunglasses, low light, multi-person scenes. State whose
  face is active, persistently, in a corner.

## Voice

- Fits: hands-busy, distance, accessibility. See `ai-interaction.md`.
- Watch: shared bathrooms — health content is never read aloud by default;
  every voice action echoes visually within 500ms.

## Phone as remote

- Fits: text entry, complex choices, private data. The mirror shows, the
  phone decides.
- Watch: the handoff must be one tap (QR, proximity, same-account auto-pair).
  Every extra setup step halves completion.

## Presence and proximity

- Fits: waking the surface, switching density, ending sessions on walk-away.
- Watch: presence is ambient input — it must never trigger irreversible or
  embarrassing actions (derived — calm technology). Personalization on a
  shared surface must show whose profile is active.

## Choosing

Document: task → candidate methods → pick + rejected alternatives with
reasons. "Touch because phones do it" is not a reason.
