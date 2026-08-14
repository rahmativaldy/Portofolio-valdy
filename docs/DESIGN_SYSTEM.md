# Design System

This portfolio is a personal workspace for **Rahmat Ivaldy**. It should feel calm, precise, and design-aware, with an emphasis on readable sections, comfortable spacing, and subtle interaction.

## Typography Philosophy

- Primary font: Geist Sans for clean headings and body copy.
- Secondary font: Geist Mono for badges, code-like labels, and compact keyboard shortcuts.
- Use strong hierarchy with tight tracking on headings and generous line-height for body text.
- Keep copy conversational, direct, and personal.
- Avoid dense text blocks; use short paragraphs, lists, and callouts.

## Spacing and Layout

- Favor generous padding and whitespace over cramped layouts.
- Use consistent section margins and card gutters.
- Section content should feel intentional, not crowded.
- Maintain comfortable hit targets on mobile and touch devices.

## Color Philosophy & Semantic System

- Dark mode is the primary visual identity (`--workspace-bg: #090b10`, `--workspace-surface: #111520`, `--workspace-border: #1e2638`).
- Restrained color distribution: 80–85% neutral surfaces, 10–15% tinted depth/panels, 5% Electric Blue / Indigo accents (`blue-400`, `blue-500`, `indigo-500`).
- Accent color is applied selectively: active navigation indicator, section eyebrows, proximity nodes in `InteractiveCanvas`, timeline milestones, READ NOTE actions, and submit buttons.
- Heading text remains crisp solid white/zinc; rainbow gradients, text gradients, and glowing card cards are explicitly prohibited.
- Semantic CSS variables (`--workspace-bg`, `--workspace-surface`, `--workspace-surface-elevated`, `--workspace-border`, `--accent`, `--accent-glow`) maintain light and dark theme parity with WCAG-compliant contrast.

## Sidebar Behavior & Iconography

- Navigation uses a unified 18px outline SVG icon family (`NavIcons.tsx`) with consistent `1.75` stroke-width and fixed `w-5 h-5` containers.
- All emoji-based icons have been removed to preserve a clean, professional developer-workspace aesthetic.
- Inactive icons use neutral zinc (`text-zinc-500 dark:text-zinc-400`); active icons transition to Electric Blue (`text-blue-600 dark:text-blue-400`).
- Icon mapping is shared identically between the Sidebar navigation and the Command Palette.
- The sidebar is open by default on first visit in the intended Portfolio V2 direction.
- Users may collapse the sidebar completely.
- When collapsed, the sidebar disappears entirely and content uses the available viewport.
- The only remaining navigation control should be a minimal three-line hamburger button at the top-left.
- On mobile, the sidebar behaves as an overlay drawer.

## Editorial Composition

- Use section labels, simple headings, and concise paragraphs.
- Prioritize clarity over flourish.
- Present work as real work, not as generic case-study copy.
- Use strong editorial hierarchy with large typographic names, discipline labels, and compact supporting details.
- Design the About/Profile page as a personal editorial spread, not a resume or dashboard.
- Keep the profile page expressive through typography, spacing, and small metadata; avoid large cards or badge grids.
- Show the relationship between design and development through narrative and practical detail.
- Avoid generic dashboard widget layouts, equal statistic cards, and rounded containers for every element.
- Use subtle panels or text-led blocks as needed, but keep the hero composition open and spacious.
- Avoid marketing superlatives, sales language, and vague bullet lists.

## Project Presentation

- Project presentation should feel like selected work, not a generic developer dashboard.
- Use editorial spreads with strong asymmetry, significant visuals, and focused project statements.
- Highlight real projects and surface only the work that is genuinely available.
- Avoid overloading the page with search, filter controls, or many small cards when there are only a few case studies.
- Use technology as supporting metadata, not the primary hero.
- Keep the detail experience lighter and more narrative: overview, key highlights, challenge, and learning.
- Toolkit and skills presentation should read as an editorial technical inventory, not a logo wall, proficiency meter, or dashboard chart.
- Make tool names part of the composition through typography, grounded context, and authentic project metadata (`USED IN NusaGo Mobile`, `USED IN Rahmat Workspace`), while preserving a grounded product voice.
- Integrate Figma visibly within Design & Workflow to express the connection between UI/UX design and code implementation.
- Structure workflow sequence as a linear pipeline (`Design → Develop → Version → Test`) with subtle borders instead of dashboard grids.
- Journey presentation should read as an editorial chronology of personal growth, engineering discipline, and design-to-code progression, rather than a generic resume timeline or card wall.
- Clearly distinguish milestone types through explicit category badges: `PERSONAL PROJECT / WEB INTERFACE SYSTEM`, `CAPSTONE / PRODUCT ENGINEERING PROJECT`, `SELF-DIRECTED LEARNING / FOUNDATIONS`.
- Express the Design-to-Code progression as a visual sequence (e.g., `Figma → BLoC / Architecture → Flutter`) to connect UI/UX design with software engineering.
- Display technologies as quiet inline metadata (`Flutter · Dart · BLoC`), avoiding badges, rounded pills, or skill meters.
- Notes presentation should read as an editorial working notebook of technical observations, implementation decisions, and project reflections.
- Avoid fake publication dates, blog archives, news feeds, or pill-heavy card grids. Use sequence numbers (`01`, `02`, `03`), clean typography, and project context (`USED IN NUSAGO MOBILE`, `USED IN RAHMAT WORKSPACE`).
- The reading view should open as a focused editorial reading panel structured into Observation, Decision / Approach, Key Takeaway, and Related Technologies, with keyboard focus management and `Escape` key close handling.
- Contact presentation should serve as the editorial closing statement of Portfolio V2, pairing an asymmetric layout with grounded status metadata (`Open to opportunities`), structured contact hierarchy (Direct Email, Professional GitHub/LinkedIn, Secondary Instagram), un-boxed input styling, and a personal closing signature.
- Avoid large card containers around form fields, generic SaaS copy, or celebratory submit animations; prefer transparent inputs with clean bottom borders, restrained inline confirmation, and specific error messages.

## Motion Principles

- Motion should be subtle and functional.
- Prefer fade, scale, and gentle slide transitions.
- Avoid heavy parallax, large animated backgrounds, or distracting motion.
- Use motion to support clarity, not to draw attention away from content.

## Interactive Design Canvas & Motion System

- The design canvas serves as a purposeful studio atmosphere layer, featuring an ambient blue/indigo radial field (`radial-gradient`), interface grid lines, blueprint selection frames with open corner handles, dimension indicators, and alignment coordinate metadata.
- **Hero Pointer Spotlight**: Includes a smooth cursor-reactive spotlight (`--pointer-spot-x`, `--pointer-spot-y`) that softly illuminates the canvas on mouse interaction and fades smoothly on mouse leave.
- **Perceptible Blueprint Parallax**: Motion is interpolated via RAF + LERP factor `0.10` with 6–8px selection frame displacement, 8px coordinate displacement, and enhanced SVG stroke contrast (`0.35` in dark mode).
- **Section Transition Choreography**: Switching between workspace sections (`Overview`, `About`, `Projects`, `Toolkit`, `Journey`, `Notes`, `Contact`) triggers a lightweight 300ms section transition (`animate-sectionReveal`, `translateY(12px) -> 0`, `opacity: 0 -> 1`).
- **Centralized Motion Tokens**: Defined in `globals.css` (`--motion-fast: 180ms`, `--motion-base: 320ms`, `--motion-slow: 600ms`, `--ease-smooth: cubic-bezier(0.16, 1, 0.3, 1)`).
- **Reduced Motion Compliance**: `(prefers-reduced-motion: reduce)` disables pointer parallax, spotlight gradient tracking, ambient drift, and section reveal transforms while keeping content fully accessible.

## Global Scale System & Composition Tiers

- **Separation of Composition Width & Text Measure**: Large desktop viewports (1920px) allow outer composition grids to expand while narrative paragraph text measure remains strictly constrained (`max-w-2xl` / `max-w-xl`, ~60-75 chars per line) for optimal reading comfort.
- **Three Composition Width Tiers**:
  1. **Wide Visual Tier (`max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px]`)**: Overview, Projects, Contact. Enhances screenshot evidence scale, 2-column asymmetric layouts, and interactive canvas breathing room.
  2. **Standard Editorial Tier (`max-w-6xl xl:max-w-7xl` ~1280px)**: About, Toolkit, Journey. Provides rich, balanced multi-column grid balance.
  3. **Reading / Notebook Tier (`max-w-6xl` ~1152px)**: Notes. Preserves comfortable reading density for technical observations.
- **Responsive Width Interpolation**: 1366×768 laptop viewports preserve current successful density; wider max-widths become active at 1536px and 1920px breakpoints without forcing artificial scale hacks.
- **Selective Typography & Metadata Legibility**: Page titles use section-specific typography (`text-4xl md:text-5xl lg:text-[3.25rem]`). Informational metadata (periods, technologies, status) uses legible `text-xs font-mono` with high contrast, keeping `text-[10px]` strictly for minor decorative annotations.

## Responsive Behavior

- Desktop: visible sidebar, clear workspace grid, multi-tiered container scaling, and stable header.
- Tablet: ensure touch-friendly spacing, readable text, and accessible controls.
- Mobile: stacked content, drawer navigation, and full-width cards.
- Maintain keyboard focus and screen reader semantics across breakpoints.

## Patterns to Avoid

- Generic SaaS dashboards, admin panels, and data-heavy analytics screens.
- Mini-nav rails, persistent breadcrumbs, or stale app chrome when the sidebar is hidden.
- Overly loud gradients, neon colors, or unnecessary decorative flourishes.
- Invented fictional products presented as real work.
