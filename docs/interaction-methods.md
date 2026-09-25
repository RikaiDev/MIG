# Interaction methods

A mirror mandates no input method. Each method below lists when it fits,
what to watch for, and how it fails. Pick deliberately; document the pick.

## Touch on glass (capacitive foil or IR frame)

- Precedent, not fiction: the Wize Mirror (EU FP7 SEMEOTICONS) shipped a
  touch-screen interface with SUS-rated "good" usability (WiMob 2017).
  Touch on mirrors exists — but no layout was ever validated, so sizes and
  zones below are phone findings applied by analogy, marked as such.
- Fits: short, deliberate confirmations at arm's length.
- Watch: wet hands mis-trigger; glass has no tactile edge — every target
  needs a visible bound plus label (derived — Norman signifiers, WCAG 2.5.8).
- Fails: distance (>1m), gloves, water film. Never the only path for a
  critical action.
- Sizes: 24px floor (borrowed — WCAG 2.5.8); 44px preferred (borrowed —
  HIG 44pt). Retracts the old thumb-zone charts: Hoober's later field work
  (2017, *Touch Design*) superseded his 2013 zones — grips shift constantly
  and people favor CENTER for reading and touching (observed down to 7mm,
  corners needing ~12mm). No fixed x-fraction zones; design for miss rates,
  and never cite the 2013 charts.

## Mid-air gesture (swipe, hold, push)

- Fits: coarse navigation (next/previous/dismiss), hygiene-critical contexts.
- Guidance is mandatory, not decoration: OctoPocus (Bau & Mackay, UIST 2008)
  proved continuous feedforward + feedback beats help menus — ~250ms
  press-and-wait reveals options, paths filter as the gesture proceeds.
  For 3D: no user- or expert-defined set reaches consensus (Delamare 2016),
  so show guide portions not whole paths, keep concurrent feedback early
  then fade it, and make the recognizer intelligible (Gestu-Wan 2015:
  granularity, speed, labeled functional affordances).
- Fails: undiscoverable without a guide; fatigue past ~3 repetitions; false
  triggers from passersby. Dwell/hold needs on-screen progress AND an
  immediate cancel path (derived — WCAG 2.5.2, 2.2.1).
- Never prescribe a specific decorative treatment (pulse, halo, ripple) as
  the signifier — ornament may decorate a clear target, never carry meaning.

## Face and gaze (look, blink, expression)

- Fits: attention confirmation, presence-gated personalization, accessibility
  for users who cannot lift their arms.
- Midas touch is proven, not hypothetical: Jacob (CHI 1990, TOIS 1991)
  showed eyes are "always on" — gaze alone overloads every looked-at item.
  Tested cures: 400ms dwell reveals, 1s dwell executes, 600ms look-away
  cancels — but a separate explicit commit (button, blink, voice) beats long
  dwell. Rule: gaze selects, something else commits.
- Fails: glasses, low light, multi-person scenes. State whose face is
  active, persistently, in a corner.

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
