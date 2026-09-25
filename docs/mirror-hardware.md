# Mirror hardware

## Panel types (informative)

Half-mirror (two-way) glass over a display: the brighter side wins. UI
brightness competes with room light reflected back at the user.

## Optical ROI (proposed, calibrating)

rPPG and face-measurement regions of interest sit behind the glass. Until a
panel is calibrated, assume the central `center_fraction` (default 0.60,
see `foundations/layout-grid.md` L2) isNama instrument territory. Calibration
procedure: capture face bounding boxes across user heights 150–190cm at
40–80cm distance; take the union + 10% margin. Record the result per panel
model — it is data, not doctrine.

## Lighting (proposed)

Design review must include: 300-lux bathroom downlight, 50-lux evening, and
direct window backlight. If text fails C1 in any of the three, the design
fails.

## Viewing distance (derived — HIG, Material adaptive)

- 0.5m (arm's length): operate. 16sp floor, 44px targets.
- 2–3m (room): glance. 32sp+ numerals, status only, no interaction expected.
