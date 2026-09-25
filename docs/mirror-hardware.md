# Mirror hardware

## Panel types (informative)

Half-mirror (two-way) glass over a display: the brighter side wins. UI
brightness competes with room light reflected back at the user.

## The face region (derived — HIG Deference)

Keep faces unobstructed: no persistent UI over the face region, transient
confirmations never cover it. The exact fraction is panel- and
distance-dependent — measure it per product (procedure below), never
hardcode a universal number.

## Calibration procedure (proposed)

Capture face bounding boxes across user heights 150–190cm at 40–80cm
distance; take the union + 10% margin. Record the result per panel model —
it is product data, not doctrine. A measurement instrument product (e.g.
rPPG) records its own optical ROI the same way, in its own docs — not here.

## Lighting (proposed)

Design review must include: 300-lux bathroom downlight, 50-lux evening, and
direct window backlight. If text fails C1 in any of the three, the design
fails.

## Viewing distance (derived — HIG, Material adaptive)

- 0.5m (arm's length): operate. 16sp floor, 44px targets.
- 1–2m (passing): glance only. 32sp+ numerals, status only, no interaction expected.
