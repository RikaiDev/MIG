---
title: Interaction flows and feedback
nav: Flows & feedback
order: 4
group: Guide
description: How to start, select, confirm, cancel, and recover. Journey states, input selection, fatigue.
---

# Interaction flows and feedback

The unit of design is the complete interaction journey, not one operation screen.

## The baseline journey, with branches as first-class design

**Idle / plain mirror → notice the system → understand what is possible → start → operate with feedback → finish or exit → reset.**

Treat these branches as formal design, not engineering exceptions: tracking interruption, uncertain recognition, false triggers, user leaving, a second person joining, user switching, network or device failure.

```rule en
id: FLOW-01
title: Design four distinctions into every flow: notice, detect, track, leave
normative: should
evidence: decision
tech: both
scope: All interactive mirror journeys.
statement: Noticing is not wanting to operate; detecting is not selecting; losing track is not handing over to the next person; leaving is not a clean ending. Each pair gets different feedback and a different recovery path.
why: Collapsing these states causes the classic mirror failures: photographing passersby, stealing sessions, and stranding the next user in someone else's state.
wrong: Proximity alone starts capture and storage; a lost track hands the session to whoever stands nearby.
fix: Notice gets a low-risk response ("interactive here") without consent implications; detection, pointing, and completion each get distinct feedback; tracking loss pauses submission and shows how to resume; leaving triggers explicit cancel, data clearing, and reset for the next user.
verify: Walk through all four transitions with real users; log every state the design cannot name — each unnamed state is a missing design.
gaps: Timing thresholds (how long is a glance vs a stare) are context-dependent; record per deployment, don't freeze globally.
```

## Consent before capture

```rule en
id: PRIV-01
title: Explicit confirmation before photographing, storing, or publishing personal content
normative: must
evidence: decision
tech: both
scope: Any capture, storage, or sharing of identifiable personal content.
statement: Proximity, gaze, or passing by never counts as consent to photograph, store, or publish. Capture requires an explicit, reversible confirmation step.
why: A mirror invites bodies; bodies are not consent. The team sets this as a must, stated plainly as a team decision — not disguised as a lab-derived universal.
wrong: "Stand here to try on" silently saves photos for "improving our service".
fix: Separate the try step from the save step; show what is kept, for how long, and how to delete; leaving without confirming deletes by default.
verify: Privacy walkthrough per deployment: list every stored byte, its reason, its retention, its deletion path.
gaps: Local regulations overlay this rule; teams must map it to their jurisdiction.
```

## No default input method

Touch has a definite contact point but costs reach and cleaning; gesture avoids contact but costs discoverability, recognition, and feedback. Do not declare one method mandatory for all mirrors.

```rule en
id: INP-01
title: Select input methods by task conditions, with a named fallback each
normative: should
evidence: cross-domain
tech: both
scope: Touch, gesture, voice, physical controls, and phone-as-remote on mirrors.
statement: Document per method: which tasks it fits, which environment it needs, and what replaces it on failure. Measure sustained and repeated mid-air operation load (fatigue), not just recognition rate.
why: Each method fails differently — reach and smudges vs discovery and drift vs noise and privacy; one method cannot cover all tasks.
wrong: "Gesture is the most natural" as the whole input strategy, with no answer for recognition failure or tired arms.
fix: Publish a selection table per project; every primary method names its fallback; rest or mixed input for sustained arm-held operation.
verify: Task completion under each method plus failure injection (occluded hand, noisy room, wet hands); record fallback usage, not just primary success.
gaps: Fatigue budgets per gesture vocabulary await measurement; first record perceived exertion alongside task time.
```
