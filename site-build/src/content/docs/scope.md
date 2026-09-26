---
title: Scope and scenarios
nav: Scope
order: 1
group: Overview
description: First pin down which mirror you build and why the user stands there, then talk rules.
---

# Scope and scenarios

The core of this guide is the **relationship between reflection, digital content, and body movement** — not putting ordinary screen UI on a mirror. Before reading any rule, answer two questions: which mirror are you building? Why is the user standing there?

## Two mirrors, two sets of design conditions

| Type | What the user sees | The difference that matters most |
|---|---|---|
| **Optical mirror**: half-mirror plus display behind it | A real optical reflection | Digital content adds onto the reflection; software alone cannot mask it away; light, parallax, and depth must be handled |
| **Video mirror**: camera plus display | A captured, processed image | Backgrounds can be replaced and bodies occluded; but viewing angle, scale, and latency come from the camera pipeline — not a real mirror |

**The first edition centers on the optical mirror, with the video mirror as contrast. Every rule carries its applicable technology.** Projection, exotic stereoscopic displays, and switchable-transmission materials are extensions, out of scope for v1.

## Scenarios (v1 classification)

Classify by why the user stands there, not by "which features":

| Scenario | Primary design goal | Issues to handle |
|---|---|---|
| **Daily mirror, information glances** | Never block the original task; intervene only when needed | Busy or wet hands, one-second looks, notification interruptions |
| **Shop trial, appearance comparison** | Understand the change, keep control of compare and exit | Original vs augmented distinction, photo sharing, onlookers |
| **Public exhibition, chance encounters** | No instructor needed to start and play | Passersby vs participants, queues, contested control, handover |
| **Movement and task guidance** | Clear feedback, operating load never blocks the main task | Occluded body, recognition failure, latency, held-up-arm fatigue |

## Out of scope

- Uses requiring precise medical diagnosis or measurement: this guide specifies no measurement accuracy.
- Mirroring a phone app onto a big screen: no reflection superposition, this guide not needed.
- Hardware and installation site still unknown: rules without optical conditions can be read, not signed off (see Validation).
