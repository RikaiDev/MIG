# Foundations — Layout grid

:::clear-zone

## Rules

- **L1 (derived — Material 8dp grid).** 8pt base unit, 16pt gutters.
  Touch targets live on the grid; text baselines may break it, buttons may not.
- **L2 (proposed).** The center clear zone: a configurable fraction of the
  panel reserved for reflection and optical measurement. Default
  `center_fraction = 0.60` is a PLACEHOLDER pending optical calibration
  (see `mirror-hardware.md`). Never hardcode it as law.
- **L3 (derived — HIG full-screen content).** Edge zones (corners, top/bottom
  bars) are the only persistent UI regions. Side vignettes for navigation,
  bottom bar for the primary action.
- **L4 (proposed).** Landscape panels wider than 1.7:1 use split layout:
  glanceable status left, actions right. Single narrow columns are banned
  above that ratio.
