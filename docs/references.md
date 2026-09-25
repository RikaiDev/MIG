# References

Borrowed rules cite these. Nothing here is paraphrased from memory; quotes
and numbers below are the claim as published.

## Interaction foundations

- Goffman, E. *The Presentation of Self in Everyday Life* (1959). Social
  life as performance; the mirror as backstage rehearsal room.
- Gallup, G. (1970); Amsterdam (1972, humans). Mirror self-recognition
  from ~18 months. The mirror showed humans themselves first.
- Norman, D. *The Design of Everyday Things* (revised). Signifiers and
  perceived affordances; gulfs of execution and evaluation. Basis for all
  "visible commit point" rules.
- Nielsen, J. *10 Usability Heuristics*. Visibility of system status;
  user control and freedom (explicit cancel); consistency; error prevention.
- Apple Human Interface Guidelines. Deference, clarity, feedback; 44pt
  minimum touch target; confirmation philosophy (confirm destructive acts,
  never navigation).
- Material Design. Touch feedback (ripples as *feedback*, not affordance);
  dark theme; motion easing and duration tokens.
- WCAG 2.1/2.2. 1.4.3 contrast 4.5:1; 1.4.6 enhanced 7.0:1; 2.5.8 target
  size 24px; 2.5.5 extended target 44px (AAA); 2.3.3 animation from
  interactions; 2.5.2 pointer cancellation; 2.2.1 timing adjustable.

## Gaze (Midas touch and its cures)

- Jacob, R.J.K. "What You Look At Is What You Get" (CHI 1990) and "The Use
  of Eye Movements in HCI Techniques" (TOIS 1991). The Midas touch problem:
  eyes are always on, so gaze alone cannot be the commit. Tested cures:
  400ms dwell pops a menu, 1s dwell executes, 600ms look-away cancels —
  but executing by button confirm beats long dwell. Gaze selects, something
  else commits.
- Jacob & Stellmach, "Gaze-Based User Interfaces" (interactions 2016).
  Engage/disengage transition design; gaze + touch/foot multimodality.

## Touch truth (Hoober, corrected)

- Hoober, S. "How Do Users Really Hold Mobile Devices?" (UXmatters 2013) —
  SUPERSEDED by the author. Do not cite its thumb-sweep charts.
- Hoober, S. "Design for Fingers, Touch, and People" (UXmatters 2017) and
  *Touch Design for Mobile Interfaces* (Smashing). Corrected findings:
  grips shift constantly; 75% touch with one thumb; people prefer CENTER
  for reading and touching; center targets observed down to 7mm, corners
  need ~12mm; nobody taps menu icons dead-center, design for miss rates.
  All phone data — applied to mirrors by analogy, never as mirror facts.

## Gesture guidance

- Bau & Mackay, "OctoPocus" (UIST 2008). Dynamic guide: continuous
  feedforward + feedback; ~250ms press-and-wait activation; faster than
  help menus, improves learning and recall.
- Delamare et al., OctoPocus3D (AVI 2016). No gesture set (user- or
  expert-defined) reaches consensus; concurrent feedback helps early then
  should fade; show guide portions, not whole paths.
- Rubaiat et al., "Gestu-Wan" (2015). Walk-up-and-use displays: reveal the
  initial gesture first (cf. Walter et al. teapot gesture); make the
  recognizer intelligible (granularity, speed); label functional affordances.

## Mirror precedents

- SEMEOTICONS / Wize Mirror (EU FP7, 2013–2017). Multisensory mirror with
  touch-screen interface, unobtrusive monitoring, wellness index, tailored
  coaching messages. Validation: SUS "good" (WiMob 2017); clinical
  correlation ongoing (CVIU 2016; IEEE T-MM 2017 Henríquez et al.).
  Precedent that touchscreens ship on mirrors — not that any layout does.
- Anderson et al., "YouMove" (UIST 2013). AR mirror enhancing movement
  training. Precedent for mirror-as-instructor with body tracking.
