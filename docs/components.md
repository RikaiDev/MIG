# Components

:::press-target

## Press target (MIG-C1, derived)

- Persistently visible bounded shape + label or universal icon (derived —
  Norman signifiers, WCAG 2.5.8).
- Minimum 24×24 CSS px; 44×44 where the user stands back (borrowed — HIG
  44pt, WCAG 2.5.5).
- Press feedback per `foundations/motion.md` M4. No halo-as-signifier (M3).

## Edge bar (MIG-C2, proposed)

Persistent navigation lives in a top or bottom bar, max 56pt tall, dark
plate, 3–5 destinations. Never on the left/right vignettes (reserved for
status, not navigation).

## Status card (MIG-C3, proposed)

Glanceable information (time, vitals summary, weather) renders as a dark
plate in a corner, max two lines, 32sp+ numerals. Tapping a status card
never navigates — it expands in place or does nothing.

## Transient confirmation (MIG-C4, derived — HIG alerts, Material snackbars)

- Auto-dismiss, no action required, never over the face ROI.
- Errors persist until acknowledged ONLY if the user must act; otherwise
  they are transient too.
