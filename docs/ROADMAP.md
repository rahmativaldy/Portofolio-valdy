# Roadmap

This repository represents the current baseline implementation. Portfolio V2 is the next major phase and should focus on refining the personal workspace experience.

## Completed Work

- Workspace-inspired portfolio shell with sidebar navigation.
- Content sections for Overview, About, Projects, Skills, Experience, Notes, and Contact.
- Global workspace search with instant section filtering.
- Dark-first visual theme with light mode support and persisted preference.
- Contact form with client-side validation and a working `/api/contact` route.
- Projects page with a stronger selected work presentation and a refined case-study modal.
- Toolkit page redesigned as an editorial technical inventory with real product context.
- About section redesigned as a stronger personal profile with a name-first hero and design-aware narrative.
- Accessible keyboard interactions in the sidebar and layout controls.
- SEO metadata, Open Graph, Twitter card, and JSON-LD schema support.
- Responsive layout with mobile drawer sidebar behavior.

## Portfolio V2 Priorities

1. Visual redesign for a stronger, more polished personal studio identity.
2. True collapsible sidebar behavior:
   - open by default on first visit,
   - collapsible to fully hidden,
   - only a minimal hamburger remains when collapsed.
3. Home/Overview redesign to make the entrypoint more purposeful.
4. Interactive design canvas as a future personal studio feature.
5. Stronger project presentation with clearer hierarchy and hero moments.
6. Responsive refinement for tablet and small-screen behavior.
7. Purposeful motion and transition design.
8. Accessibility improvements across keyboard, focus, aria labels, and forms.
9. Performance and final production validation.

## Near-Term Work

- Phase 1: foundation and legacy reconciliation — completed. The current source tree has been reconciled with the active shell architecture and legacy desktop/window artifacts have been archived or removed.
- Phase 2: workspace shell and collapsible sidebar — completed. The desktop sidebar now opens by default on larger screens, collapses fully into a hidden state, and restores with a minimal top-left hamburger. Mobile navigation continues as an off-canvas drawer.
- Phase 3: home editorial redesign — completed. The Overview view now uses an editorial name-first hero, discipline-led composition, concise personal context, selective work CTA, and compact project/technology metadata.
- Phase 4: interactive design canvas — completed. The Overview section now includes a lightweight SVG canvas behind the hero content with subtle parallax and idle drift.
- Phase 5: selected work presentation redesign — completed. The Projects section now presents two focused case studies with larger visuals, editorial hierarchy, and a lightweight case-study overlay.
- Phase 6A: profile/about editorial redesign — completed. The About section now uses a stronger personal profile layout with a name-first hero, design/development narrative, and subtle editorial metadata.
- Phase 6B: toolkit editorial redesign — completed. The Toolkit section now uses an editorial technical inventory with contextual groupings and workflow detail.
- Phase 6C: journey editorial redesign — completed. The Journey section now uses an un-boxed editorial chronology with explicit milestone types, design-to-code progression flows, and quiet typographic metadata.
- Phase 6D: notes editorial redesign — completed. The Notes section now uses an editorial notebook index with grounded project reflections, sequence markers, and a focused reading panel.
- Phase 6E: contact editorial redesign — completed. The Contact section now uses an asymmetric closing layout with structured contact hierarchy, un-boxed input styling, and a personal closing signature.
- Phase 7: interactive design canvas & motion system — completed. The Overview section now includes an interface blueprint SVG canvas with 3 depth layers, signature hero selection frame parallax, localized proximity LERP, RAF idle auto-pause, document visibility handling, and reduced-motion support.
- Phase 8: global visual polish & scale system — completed. Implemented a 3-tiered responsive content width system (Wide Visual Tier `max-w-[1400px]`, Standard Editorial Tier `max-w-7xl`, Reading Tier `max-w-6xl`) separating outer composition width from paragraph text measure, enhancing project screenshot scale on 1920px displays while preserving 1366×768 laptop density and typography hierarchy.
- Phase 8.1: color system & visual identity — completed. Introduced a restrained Electric Blue / Indigo visual identity (`blue-400`, `blue-500`), semantic workspace depth CSS variables (`--workspace-bg`, `--workspace-surface`, `--accent`), active sidebar navigation identity, blueprint proximity node accents, and WCAG-compliant light/dark theme parity.
- Phase 8.2: sidebar iconography consistency — completed. Replaced all emoji-based navigation icons with a unified 18px outline SVG icon family (`NavIcons.tsx`) with consistent 1.75 stroke-width, fixed `w-5 h-5` container alignment, and active interaction states.
- Phase 8.3: visual depth & motion enhancement — completed. Enhanced dark workspace background depth (`#080a0f` root, `#111520` cards), hero pointer spotlight gradient tracking, 6–8px blueprint parallax displacement visibility, centralized motion tokens in `globals.css`, 300ms section transition choreography, project media hover micro-interactions, sleek scrollbar styling, and `prefers-reduced-motion` compliance.
- Audit and consolidate any stale or unused code paths before redesign work.
- Keep the current workspace shell intact while iterating toward Portfolio V2.
- Use data-driven content from the `data/` directory.
- Preserve the personal brand voice and avoid generic portfolio clichés.

## Longer-Term Goals

- Shape the portfolio as a personal designer workspace rather than a generic developer site.
- Surface real project stories without inventing fabricated work.
- Maintain a calm visual language with deliberate typography and spacing.
- Validate every release with lint, build, runtime, responsive, and accessibility checks.
