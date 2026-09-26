---
title: "History"
description: "From calm computing to bathroom mirrors."
nav: "History"
---
# History: from calm computing to bathroom mirrors

A mirror guideline with no history is an opinion. This is the lineage each
borrowed claim descends from. Every entry resolves to `references.md`.

## 1991–1998: the periphery years

- **1991 — Weiser, "The Computer for the 21st Century" (Scientific
  American).** Hundreds of computers per room; tabs, pads, boards; technology
  that "disappears" into the background. The founding text of ubicomp.
- **1995/1996 — Weiser & Brown, "Designing Calm Technology" / "The Coming
  Age of Calm Technology".** Center vs periphery of attention; the Dangling
  String (Jeremijenko): network traffic as a twirling string nobody must
  watch. "Offer, not demand." MIG P5 descends directly from this.
- **1997/1998 — Ishii et al., ambientROOM (CHI 1998).** Background awareness
  through light, sound, airflow; graspable controls. Two hard findings MIG
  keeps: (1) looped sounds become annoying within months — abstraction must
  be non-repetitive; (2) literal camera mappings feel intrusive and violate
  privacy — abstract the mapping (direct ancestor of MIG's camera restraint).

## 1990–2016: gaze and gesture get their numbers

- **1990/1991 — Jacob, CHI/TOIS.** Midas touch; 400ms reveal, 1s execute,
  600ms cancel; button beats long dwell. See `interaction-methods.md`.
- **2008 — Bau & Mackay, OctoPocus (UIST).** Feedforward + feedback,
  ~250ms activation. Still the reference design for gesture guidance.
- **2015–2021 — Gestu-Wan, OctoPocus3D, OctoPocus-in-VR.** Walk-up
  disclosure, no-consensus sets, intelligible recognizers.

## 2013–2017: the first mirror wave

- **2013–2017 — SEMEOTICONS / Wize Mirror (EU FP7).** Multisensory mirror
  with touch-screen interface, wellness index, coaching messages. Validation:
  SUS "good" (WiMob 2017); clinical correlation (CVIU 2016, IEEE T-MM 2017).
  Proof that touchscreens ship on mirrors — and that no layout was ever
  validated.
- **2013 — Anderson et al., YouMove (UIST).** AR mirror for movement
  training. Proof that mirrors instruct bodies, not just faces.
- **2016 — HiMirror (New Kinpo, Taiwan).** First mass-market smart beauty
  mirror: skin analysis, tracking over time. 2017: "world's first
  voice-interactive smart mirror" (Alexa), later Google Assistant. Proof
  that voice belongs on mirrors — and the start of the bathroom-privacy
  problem below.

## 2018–2024: fitness mirrors and the bathroom problem

- **2018–2022 — Mirror (Lululemon), Tonal, Vaha, NordicTrack, Portl.**
  6-foot touch-screen mirrors for live classes (BBC 2022). Proof that
  full-body mirror interaction works at 1–2m — the only validated
  distance data point in this whole document.
- **CareOS (France).** Sink mirrors with camera + IR/UV skin and temperature
  sensing. The bathroom as a sensing site goes mainstream.
- **2018–2023 — voice privacy literature.** Lau et al. (CSCW 2018):
  incomplete mental models, privacy resignation. Huang et al. (CHI 2020):
  housemate/visitor concerns, voice-match false positives. "Owning and
  Sharing" (CSCW 2021): visitors are indirect users without consent; smart
  speakers explicitly disliked in bathrooms — "who else is listening".
  Marky et al. (2020): owners mute output for visitors; visitors want
  awareness and control. Huang et al. (PACM 2020): physical mute controls
  trusted more than software ones. Meng et al. (CHI 2023 review, 20 papers):
  responses are audible to the room — calendar readouts get overheard.

## What history does not give us

No study validates a mirror layout, a distance tier, or a gesture set.
Section "What history does not give us" is the entire `validation.md`.
The honest position: strong foundations (calm, gaze, gesture, privacy),
zero validated mirror specifics. That is why proposed rules cap at info.
