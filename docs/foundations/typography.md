# Foundations — Typography

## Scale

| Role | Size | Line height | Tracking | Use |
|---|---|---|---|---|
| glance | 48sp | 1.15 | -2% | numerals at a glance |
| status | 32sp | 1.25 | -1% | status lines |
| arm | 24sp | 1.35 | 0 | minimum for passing-glance text |
| title | 20sp | 1.4 | 0 | titles |
| body | 16sp | 1.6 | 0 | body floor, never below |

:::type-scale

## Rules

- **T1 (derived — HIG legibility, Material type scale).** Minimum 16sp body
  for arm's-length reading; minimum 24sp for any text meant to be read
  in a passing glance (time, weather, single status line).
- **T2 (borrowed — HIG Dynamic Type philosophy).** One scale, no per-screen
  snowflakes. Sizes: 16 / 20 / 24 / 32 / 48sp.
- **T3 (derived — WCAG 1.4.12).** No text inside containers that clip at
  200% scale. Mirror UI cannot offer pinch-zoom as the escape hatch.
- **T4 (proposed).** Prefer grotesque sans with open apertures (reflection
  halves effective stroke contrast). No light weights below 20sp.
