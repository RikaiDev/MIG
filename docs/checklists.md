# Checklists

## Design review (per screen)

- [ ] Center clear zone respected (L2; parameter recorded, not assumed)?
- [ ] Body text 7.0:1 on plate (C1)? Tested under three lightings?
- [ ] Primary action is one, bounded, labeled, ≥24px (MIG-C1)?
- [ ] Every touch action has a zero-touch twin (A5)?
- [ ] Motion has a static twin (M1)? No halo-as-signifier (M3)?
- [ ] Face ROI never covered, even transiently (M3 in principles → MIG-C4)?
- [ ] Active profile shown when personalized (A3)?

## Tool mapping (mesen rule IDs)

| Checklist item | mesen rule |
|---|---|
| Overlaid contrast | `accessibility/contrast-ratio-insufficient` |
| Small text | `accessibility/font-size-insufficient` |
| Press target | `cognitive/interaction-affordance-deficit` |
| Center occlusion | `physical/optical-center-obstruction` (provisional) |
| Narrow column | `layout/horizontal-space-desert` |
| Thumb reach | `ergonomics/thumb-zone-unreachable` |

Tools may cite `borrowed`/`derived` rules at full severity; `proposed`
rules cap at `info` until validated (see `validation.md`).
