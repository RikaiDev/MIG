# Checklists

## Design review (per screen)

- [ ] Center clear zone respected (L2; parameter measured, not assumed)?
- [ ] Body text 7.0:1 on plate (C1)? Tested under three lightings?
- [ ] Input method chosen deliberately, with rejected alternatives (P2)?
- [ ] Every method's failure modes described (P4)? Critical tasks covered by two methods (A5)?
- [ ] Motion has a static twin (M1)? No decoration-as-signifier (M3)?
- [ ] Face region never covered, even transiently (MIG-C4)?
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
