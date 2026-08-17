<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Rahmat Workspace AI Agent Guide

This repository belongs to **Rahmat Ivaldy** and represents a personal portfolio for a UI/UX Designer, Frontend Developer, and Mobile Developer. Any work in this repository must preserve the personal brand and workspace-inspired direction.

## Core Agent Principles

- Preserve the personal identity of **Rahmat Ivaldy**. Do not invent experience, projects, or roles that are not grounded in repository content.
- Preserve the current working infrastructure and the portfolio's functional behavior. Do not remove or replace existing contact, project, or navigation mechanisms unless explicitly requested.
- Respect the portfolio's personal designer workspace direction. Avoid generic SaaS, admin dashboard, enterprise, or product marketing patterns.
- Review `README.md`, `docs/ARCHITECTURE.md`, `docs/DESIGN_SYSTEM.md`, and `docs/ROADMAP.md` before making major changes.
- Validate changes with lint, build, runtime, responsive, and accessibility checks before concluding a task.

## What to Validate

For any code changes, validate at least:
- `npm run lint`
- `npm run build`
- browser runtime for the affected pages
- responsive behavior on desktop, tablet, and mobile breakpoints
- keyboard navigation and basic accessibility semantics where applicable

## UI and Design Rules

- Keep the look and feel personal, clean, and workspace-inspired.
- Use calm neutral surfaces, restrained blue accents, and strong typographic hierarchy.
- Avoid:
  - SaaS-style analytics dashboards, charts, and metric-heavy cards
  - admin-style tables, data grids, or enterprise control panels
  - bright multi-color marketing gradients and unnecessary illustration clutter
  - mini sidebars, navigation rails, breadcrumbs, or persistent branding text beside the hamburger when the sidebar is collapsed
- When modifying navigation or layout, preserve the existing sidebar structure unless the work explicitly targets Portfolio V2 redesign.

## Sidebar and Navigation Guidance

- The portfolio should feel like a workspace with a clear sidebar on desktop and a mobile-friendly drawer on smaller screens.
- For Portfolio V2, the sidebar target behavior is:
  - open by default on first visit,
  - user may collapse it completely,
  - when collapsed, the sidebar disappears entirely and content fills the viewport,
  - the only remaining navigation control is a minimal three-line hamburger button in the top-left.
- Do not leave a partial mini sidebar, navigation rail, active page label, breadcrumb, or branding text beside the collapsed hamburger.

## Content and Copy Guidance

- Keep section copy factual, direct, and personal.
- Avoid generic product marketing language, invented startup projects, or fictitious enterprise case studies.
- Use existing content and the static data sources in `/data/` whenever possible.

## Documentation Behavior

- Update documentation when making architecture, design, or roadmap changes.
- Add new docs under `docs/` and keep `README.md` focused on public repository details.
- Preserve existing accurate documentation rather than overwriting it blindly.

## Deployment and Runtime

- The project is a Next.js App Router application.
- `npm run dev` starts the app locally at `http://localhost:3000` by default.
- `npm run build` verifies production readiness.

## When in Doubt

- Ask for explicit clarification before changing the portfolio's visual language, navigation model, or personal branding.
- If a requested change conflicts with the defined design system or roadmap, document the conflict and request guidance.
