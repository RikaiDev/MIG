---
title: Mirror optics and hardware foundations
nav: Optics & hardware
order: 2
group: Guide
description: What can be built? What software cannot fix? Additive light, depth parallax, hardware sign-off table.
---

# Mirror optics and hardware foundations

Limit or problem → why it happens → how design avoids it → which conditions need testing. Every rule in this chapter follows these four steps.

## Additive light, not layer compositing

A half-mirror reflects the front environment while letting the display's light through. Reflectance and transmittance differ per glass, and some products target strong ambient light — never assume 50:50. A working model:

> **Seen brightness ≈ reflected brightness of environment and body × reflectance ＋ screen brightness × transmittance**

```rule en
id: OPT-01
title: Never use black screen areas to mask the real reflection
normative: must
evidence: physical
tech: optical
scope: Passive half-mirror plus display behind it; does not directly apply to camera compositing or hardware with physical masking.
statement: Never treat a digital black region as an opaque plate that hides the scene.
why: Black only lowers display emission; front-environment reflection remains. A direct consequence of additive optics, not a visual style preference.
wrong: A mockup covers the face with a black card and assumes the physical mirror will do the same.
fix: Reposition content and reduce information; test on the physical mirror; if still unreadable, revisit lighting and hardware.
verify: Show a full-black region, move a bright object before the mirror, confirm how its reflection still appears there; then check whether the design wrongly depends on black masking.
gaps: Residual contrast figures per coating ratio not yet collected; field measurement required.
```

```rule en
id: OPT-02
title: Test legibility on reflection backgrounds, not just hex codes
normative: should
evidence: physical
tech: optical
scope: All optical-mirror content containing text and icons.
statement: Legibility tests must run on at least three reflection backgrounds (light clothing, dark clothing, bright window or a second person); passing mockup color contrast does not count as passing.
why: The background belongs to the user and the room, not the designer; visual competition changes drastically with it.
wrong: Testing white text only against a dark lab coat, then signing off for all venues.
fix: Build a background matrix (clothing lightness × ambient level × second person present); record readable / marginal / unreadable per cell.
verify: Swap three backgrounds on site and measure task legibility success; "white on black" is a candidate, not a universal answer.
gaps: Minimum acceptable legibility thresholds per task not yet established; v1 requires recording, sets no universal number.
```

## Mirror, screen, and reflection are not coplanar

In common laminated builds the digital image sits near the mirror surface, but the reflection carries behind-mirror depth. When content must register on a face or body, viewpoint and binocular parallax become the problem — "the camera sees the face" does not mean "the user sees the marker on the face".

```rule en
id: POS-01
title: Separate three positioning modes, with their own calibration and feedback
normative: should
evidence: cross-domain
tech: both
scope: Any design registering digital markers to bodies or space.
statement: Pick exactly one: fixed on screen (time, instructions, status), following body parts (face effects, posture cues), located in mirror space (reflected hand operating virtual objects behind the mirror); each gets its own calibration and feedback, never one shared flat-layout rulebook.
why: Error sources differ (screen coordinates vs body tracking vs viewing parallax); mixing them makes alignment failures undebuggable.
wrong: One left/top scheme drives both the clock and face stickers; step sideways and it breaks.
fix: Label every dynamic element with its positioning mode; body-following items note tracking source and rate, mirror-space items note viewpoint assumptions.
verify: User steps 30 cm sideways; check markers still register; record the viewing range where they fail.
gaps: End-to-end error envelopes per tracking stack must be measured by each team.
```

## Hardware assembly is a design input, not a later constraint

Second-surface reflections can ghost; touch compatibility depends on glass and coating — no two half-mirrors are the same touch surface.

```rule en
id: HW-01
title: Confirm five hardware conditions before visual design
normative: should
evidence: physical
tech: optical
scope: Design kickoff for optical-mirror projects.
statement: All five items below need written confirmation before visual design starts; any unknown marks its design decisions as assumptions, never sign-off.
why: None of these can be fixed in UI alone; discovering them late means redoing the work.
wrong: Assuming all half-mirror glass is touch-compatible, learning otherwise at launch.
fix: Sign off item by item with the hardware side; log unknowns as known gaps with verification dates.
verify: Check each item against the acceptance table on the checklists page.
gaps: Per-supplier compatibility matrices are each team's own; this guide endorses no vendor.
```

| Item | What to confirm |
|---|---|
| Glass and display stack | Coating direction, gap, ghosting, whether displayable area matches mirror area |
| Sensor placement | Reliable operation under real glass, lighting, angles, and occlusion |
| Motion effects | End-to-end latency from user movement to digital feedback, not just frame rate |
| Cleaning and environment | Fingerprints, accidental touches while cleaning, fog; whether a cleaning mode is needed |
| Mounting and safety | Whether operation demands uncomfortable reaching, stepping back, or turning; clearance around the unit |
