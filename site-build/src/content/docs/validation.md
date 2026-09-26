---
title: Validation and deployment
nav: Validation
order: 11
group: Build
description: Does the mockup still hold on site? Optics tests, environment matrix, calibration, acceptance.
---

# Validation and deployment

```rule en
id: VAL-01
title: Sign off on site, never on mockups alone
normative: should
evidence: decision
tech: both
scope: Every mirror deployment before launch and after any hardware, lighting, or placement change.
statement: Acceptance requires the optics test, the environment matrix, and the field checklist on the checklists page — all run on the installed unit, with recorded conditions.
why: Mockups cannot reproduce additive brightness, behind-mirror depth, or sensing quality; signing off in the studio signs off a different device.
wrong: Figma-approved, shipped; on site nobody can read it and nobody can start it.
fix: Gate launch on the three checklists; re-run the affected subset after any physical change.
verify: The checklists themselves are the verification; a launch without completed tables is a process failure, not a design opinion.
gaps: Cross-site comparability of results needs a shared reporting template — the checklists page is its first draft.
```

## Two validations

**Validate the mirror design**: under specified lighting, backgrounds, distances, and user conditions, measure legibility, false operations, task completion, recovery, and bodily load; public settings also test "starts alone with no instructor".

**Validate the guideline site**: give a designer a real problem and watch whether they find the rule, judge applicability, pick a reasonable approach, and state how to verify. Page views are not the success metric.
