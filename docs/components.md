# Components

Components are examples of the principles applied, not a mandate. Each names
the methods it assumes — change the method, change the component. Default
posture is distance: the user stands before the mirror, not pressed against
glass. Anything requiring approach must justify itself.

## Glanceable status (MIG-C1, derived)

Assumes: any method, close or passing glance. Dark plate in a corner, max two lines,
32sp+ numerals. Tapping a status card never navigates — it expands in place
or does nothing. This is the default component of the medium; start here.

## Method-neutral commit (MIG-C2, derived — Norman signifiers, WCAG 2.5.8)

Assumes: whichever method the product chose (see `interaction-methods.md`).
Whatever "confirm" looks like in that method — bounded button, voice keyword
with visual receipt, gesture with progress — it must be unambiguous BEFORE
commit and acknowledged AFTER. Press feedback immediate and visible without
motion (derived — HIG feedback, WCAG 2.3.3).

## Touch target, only with touch hardware (MIG-C3, derived)

Assumes: the product physically mounts touch sensing AND the task expects
arm's-length use. Then and only then: persistently visible bounded shape +
label or universal icon, minimum 24px, 44px preferred. A mirror without
touch hardware has no press targets at all — do not draw buttons for a
medium that cannot feel them.

:::anatomy-edgebar

## Edge bar (MIG-C4, proposed)

Assumes: glance-first usage. Persistent navigation in a top or bottom bar,
max 56pt tall, dark plate, 3–5 destinations. Never on the side vignettes
(reserved for status, not navigation).

## Transient confirmation (MIG-C5, derived — HIG alerts, Material snackbars)

Assumes: any method. Auto-dismiss, no action required, never over the face
region. Errors persist until acknowledged ONLY if the user must act.
