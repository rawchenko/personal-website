# LayerSweep

A Figma plugin that automates bulk style replacement — built to speed up design system migrations.

**Role:** Design Engineer
**Tools:** Figma Plugin API, TypeScript, Claude Code, Codex
**Timeline:** ~2 weeks

---

## The Problem

Our platform was migrating to a completely new token structure. Every text, color, and effect style in the master template had to be swapped for its new counterpart — thousands of layers, no naming overlap between old and new tokens. Manual replacement: 20–30 hours of tedious, error-prone work.

## Overview

I initiated and built a Figma plugin that scans a file for bound styles, lets users configure old-to-new mapping, and applies replacements in bulk. What started as an internal tool to solve a specific migration task became a published plugin with 200+ users on Figma Community.

## Personal Goals

1. **Ship a tool that solves a real team problem** — eliminate manual style replacement and make token migrations painless for any designer on the team.
2. **Design and build end-to-end** — own the full cycle from UX decisions to production code, proving the Design Engineer skillset in practice.
3. **Stress-test AI-assisted development** — use Claude Code and Codex as primary coding tools and form an honest picture of where AI agents accelerate work and where they fall short.

*[Image: plugin overview in Figma]*

---

## Approach: From Hypothesis to Tool

### Validating the Hypothesis (Days 1–2)

Before committing to full development, I needed to confirm that the Figma API actually supported what I had in mind: recursively traversing the layer tree, reading bound styles, and programmatically replacing them. I built a minimal prototype — no UI, pure console logic — and confirmed it was feasible.

The key question at this stage: **can you reliably map old styles to new ones when their names don't match and their structures differ?** The answer: yes, but it requires a well-designed interface for configuring the mapping.

*[Image: early plugin version / first prototype]*

### Working Version (Week 1)

Over the first week, I built the plugin to a state where it solved the core problem: file scanning, replacement configuration, and batch-applying new styles. The token migration task was completed.

### UX/UI Polish (Week 2)

With the instrumental task done, I focused on making the plugin usable not just for myself, but for the team — and potentially for any designer facing a similar challenge. That meant: thoughtful onboarding, clear states, and visual consistency with Figma's own interface.

*[Image: final plugin UI — before and after redesign]*

---

## Key Design Decisions

### 1. Scan Result: Transparency Before Action

**Problem:** Users can't trust a plugin with bulk style replacement if they don't understand the scope of changes.

**Solution:** Before any replacement happens, the plugin shows a full scan of the file — all detected styles, layer counts for each, grouped by category. This isn't just a list: it's a navigable report that gives designers a sense of control over the process.

**Why it matters:** Bulk operations create anxiety. Showing users "what will be affected" before anything changes is a fundamental principle for tools with potentially irreversible actions.

*[Image: scan results screen]*

### 2. Swap: Group-Level Mapping, Not One-by-One

**Problem:** A file can contain dozens of styles. Configuring replacement for each individually is almost as slow as replacing them manually.

**Solution:** Mapping works at the group level: if old styles are grouped under `Paragraph/` and new ones under `body/`, the plugin suggests matching them as a batch. Users can refine individual pairs, but the starting point is already there.

**Alternative I rejected:** Automatic mapping by name similarity. In practice, old and new token names often share nothing in common — an algorithm would create a false sense of confidence.

*[Image: swap configuration screen]*

### 3. Onboarding and Product Tour: Lowering the Entry Barrier

**Problem:** Early users from the team would open the plugin and not know where to start. Scanning, mapping, replacing — three steps that were obvious to the author but not to a new user.

**Solution:** Two layers of guidance. First — an onboarding screen on first launch: a brief explanation of what the plugin does and the expected workflow. Second — an interactive product tour that highlights interface elements in context. Users can skip both, but the first launch no longer causes confusion.

*[Image: onboarding and product tour screens]*

### 4. Swap Result: The Report as a Safety Net

**Problem:** After bulk replacement, users want to know: did everything go correctly? Did anything break?

**Solution:** The result screen shows the number of affected layers, successful replacements, and errors (if a style wasn't found or a layer was protected). This isn't just a "Done" message — it's a report you can review and, if needed, partially roll back.

*[Image: swap results screen]*

---

## Building with AI Agents: What Worked and What Didn't

All of LayerSweep's code was written using Claude Code and OpenAI Codex. This was a deliberate experiment — testing how much AI agents accelerate development for a designer who codes but isn't a full-time developer.

### What Worked Well

**Claude Code** excelled at architectural tasks: structuring the project, writing the Figma tree traversal logic, handling edge cases. I could describe a task at a high level — "scan all layers, group styles, show statistics" — and get working code that just needed adaptation.

**Codex** was useful for quickly generating UI components and utility functions.

### Where It Got Difficult

AI agents struggled with Figma Plugin API context — it's a niche API with limited examples in training data. I had to correct a lot, suggest the right types and methods. Another issue — coordination between two agents: one didn't know what the other had done, and they sometimes generated conflicting solutions.

### Takeaway

AI agents sped up development roughly 2–3x for a project of this scope. But they don't replace domain understanding — I needed to know the Figma API to validate and steer what the agents generated. The "Design Engineer" role in this process isn't just writing prompts — it's being the architect of the solution, using AI as a multiplier.

---

## Results and Impact

**For the task:** The token migration of the master template — estimated at 20–30 hours of manual work — was completed in a few hours (including mapping configuration and result verification).

**For the team:** The plugin became a standard tool for style replacement tasks. Other designers on the team use it when updating components and migrating between design system versions.

**For the community:** The plugin was published on Figma Community and has gained 200+ users — confirming that bulk style replacement is a common pain point beyond our team.

[→ LayerSweep on Figma Community](https://www.figma.com/community/plugin/1602717091443258096/layersweep-bulk-style-swap-for-figma)
*[Image: plugin in action / final replacement result on a real file]*

---

## What I'd Do Differently

**Involve teammates in testing earlier.** The first version of the interface made sense to me but confused new users. If I'd shown the prototype to the team a day sooner, onboarding and the product tour would have been built in from the start — not added at the end.

**Add usage analytics.** Right now I don't know exactly which features the 200+ users rely on most. Built-in analytics would help prioritize further development.

**Establish a stricter AI agent workflow from day one.** Early on, I switched between Claude Code and Codex haphazardly. Over time I realized it's more effective to divide responsibilities: architecture and logic go to Claude Code, UI generation goes to Codex. That principle was worth locking in from the start.
