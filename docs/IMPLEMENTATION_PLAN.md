# Portfolio V2 Implementation Plan

This plan is based on a direct audit of the current repository state and the established documentation in `AGENTS.md`, `README.md`, `docs/DESIGN_SYSTEM.md`, `docs/ARCHITECTURE.md`, and `docs/ROADMAP.md`.

## Audit Summary

### Current architecture relevant to Portfolio V2

- `app/page.tsx` renders a single client-side shell: `WorkspaceShell`.
- `WorkspaceShell` (`components/layout/WorkspaceShell.tsx`) uses `WorkspaceProvider` to manage current section selection and renders `WorkspaceLayout` around the chosen section.
- `WorkspaceLayout` (`components/layout/WorkspaceLayout.tsx`) composes the interface from:
  - `Sidebar` (`components/layout/Sidebar.tsx`)
  - `Header` (`components/layout/Header.tsx`)
  - `ContentArea` (`components/layout/ContentArea.tsx`)
  - `StatusBar` (`components/layout/StatusBar.tsx`)
- Navigation state is managed with React context in `context/WorkspaceContext.tsx`.
- Theme state is managed via `app/layout.tsx` theme initializer script plus the header toggle in `Header.tsx`.
- Project presentation lives in `components/sections/Projects.tsx` and `components/sections/ProjectModal.tsx`.
- Responsive behavior is achieved through Tailwind `md:` breakpoints, with the sidebar acting as a drawer on mobile and a persistent panel on desktop.
- Existing motion comes from `app/globals.css` animation utilities (`animate-fadeIn`, `animate-slideInUp`, etc.) and various Tailwind transition utility classes.

### Reusable components and infrastructure

- `app/layout.tsx` should be preserved and reused for metadata, theme initialization, analytics, and SEO.
- `app/page.tsx` should continue to render `WorkspaceShell`.
- `components/layout/ContentArea.tsx` is reusable as the main scrollable content container.
- `components/layout/StatusBar.tsx` and `components/ui/*` primitives (`Badge.tsx`, `Button.tsx`, `Card.tsx`, `Logo.tsx`) are reusable.
- `data/*` and `types/index.ts` are the existing data/content layer and should be preserved.
- The `/api/contact` route is stable infrastructure that must remain intact.

### Components requiring redesign

- `components/layout/WorkspaceLayout.tsx` must be updated to support a true desktop collapse state and smooth content expansion.
- `components/layout/Sidebar.tsx` must be updated so the sidebar can be fully hidden on desktop, while still remaining an overlay drawer on mobile.
- `components/layout/Header.tsx` must be updated so the hamburger control persists in the collapsed desktop state and supports accessibility semantics for the collapse state.
- `components/sections/Overview.tsx` must be redesigned into a stronger editorial home experience.
- `components/sections/Projects.tsx` and `components/sections/ProjectModal.tsx` must be redesigned from generic card grid patterns into a stronger project story/case-study presentation.
- `components/sections/About.tsx`, `Skills.tsx`, `Experience.tsx`, `Blog.tsx`, and `Contact.tsx` also require refinement toward editorial composition and stronger hierarchy.
- `app/globals.css` should be extended with a more explicit reduced motion strategy.

### Legacy / unreferenced code

- `components/apps/Terminal/TerminalApp.tsx` and `components/apps/FileExplorer/FileExplorerApp.tsx` are not imported or referenced in the current `app/page.tsx` render tree or any other source file.
- `hooks/useKeyboard.ts` is not referenced by any current source file.
- There are no direct or indirect references to `components/apps/*` or `hooks/useKeyboard.ts` in the active codebase, based on repository search.

### Documentation consistency

- `AGENTS.md`, `README.md`, `docs/DESIGN_SYSTEM.md`, `docs/ARCHITECTURE.md`, and `docs/ROADMAP.md` now reflect the V2 direction and current source-of-truth guidance.
- `DOCUMENTATION.md` is stale: it describes an older desktop/window-based version that is not the current runtime. It should be archived or replaced rather than treated as authoritative.

## Proposed Portfolio V2 component architecture

### Core shell architecture

- Keep the current root structure:
  - `app/layout.tsx`
  - `app/page.tsx`
  - `WorkspaceShell.tsx`
  - `WorkspaceLayout.tsx`
- Add explicit sidebar disclosure state for all viewports.
- Use a dedicated hook if needed, such as `hooks/useSidebarState.ts`, to manage:
  - `isOpen` on desktop/mobile
  - `isCollapsed` on desktop
  - `persisted` state in `localStorage`
  - `prefersReducedMotion`
- Maintain `WorkspaceContext` for section navigation state.

### Sidebar architecture

- `Sidebar.tsx` should render the full sidebar only when open.
- When closed on desktop, it should be fully hidden and removed from layout flow.
- `Header.tsx` should display the hamburger button in the top-left when collapsed.
- The hamburger should toggle the sidebar open state and carry proper `aria-expanded` and `aria-controls` values.
- On mobile, preserve the existing drawer overlay behavior, but ensure the toggle button remains consistent with desktop.
- `ContentArea.tsx` should expand to fill the full width when the sidebar is hidden.

### Home and editorial layout architecture

- `Overview.tsx` should become the editorial home view:
  - large typographic introduction: `Rahmat Ivaldy`, `UI/UX Designer`, `Frontend Developer`, `Mobile Developer`
  - support copy that is direct, factual, and personal
  - a high-priority project or role summary panel rather than multiple stats cards
  - an introduction to the studio/workspace concept rather than a generic dashboard
- Use a new hero component or split `Overview.tsx` into a hero + content sections.
- Reserve the editorial home for context, not a full feature list.

### Interactive design canvas architecture

- Implement a lightweight interactive background canvas for `Overview`.
- Do not introduce heavy rendering dependencies.
- Preferred stack:
  - static SVG and HTML elements with absolute positioning
  - CSS transforms and opacity transitions
  - `requestAnimationFrame` for pointer-aware parallax movement
  - `window.matchMedia('(prefers-reduced-motion: reduce)')` to disable motion
- The canvas should live behind the overview hero content, with `pointer-events: none` for decoration.
- Example elements:
  - subtle grid or layout guides
  - framing rectangles and label tags
  - anchor points and coordinates
  - restrained code/story references
- Keep motion restrained, slow, and functional.
- Provide a mobile/low-power fallback with reduced motion and fewer elements.

### Work / project presentation architecture

- Redesign `Projects.tsx` into a stronger editorial project page.
- Use real screenshot presentation when available.
- Highlight one or two selected works, especially `NusaGo Mobile` and `Rahmat Workspace`.
- For selected work, provide project context using existing data only:
  - project description
  - role and technical scope
  - technologies used
  - challenges faced
  - learnings
- Avoid invented metrics, clients, or achievements.
- Keep search and filtering if desirable, but make the presentation less dashboard-like and more editorial.
- Keep `ProjectModal.tsx` or rework it into a focused case-study overlay.

## Proposed interactive canvas architecture

- Create a new lightweight component such as `components/sections/InteractiveCanvas.tsx`.
- Architecture:
  - root `div` positioned absolute inside `Overview` hero area
  - render a small set of decorative SVG and HTML nodes
  - use requestAnimationFrame to update transform offsets based on pointer position
  - conditionally disable animations if `prefers-reduced-motion` or on small screens
- Interaction can be purely pointer-based with subtle parallax; avoid continuous React state updates.
- Keep the component decorative and secondary to the hero text.

## Proposed sidebar state architecture

- Use a desktop-first disclosure model:
  - default state: sidebar open on first visit
  - collapsed state: sidebar fully hidden, content width expands
  - mobile state: sidebar hidden until toggled, overlay drawer semantics
- Persist the preferred sidebar state in `localStorage` so returning users see the last state.
- The state should be represented as:
  - `open` — sidebar visible
  - `collapsed` — sidebar hidden on desktop, same as closed drawer on mobile
- Keep the content area flexible so it can animate smoothly when the sidebar toggles.
- Provide a single persistent top-left hamburger toggle in the header while collapsed.

## Implementation phases

### Phase 1: Foundation and legacy reconciliation

Goal:
- Validate the current shell and identify legacy code.
- Preserve stable infrastructure and documentation.

Likely files:
- `docs/ARCHITECTURE.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/ROADMAP.md`
- `docs/IMPLEMENTATION_PLAN.md`
- `DOCUMENTATION.md`
- `components/apps/*`
- `hooks/useKeyboard.ts`

Tasks:
- Confirm the current code path used by the app.
- Mark unreferenced legacy code as archival candidates.
- Clarify `DOCUMENTATION.md` as stale and keep it out of primary reference.
- Keep the current `app/api/contact` route, metadata, and theme init as stable base.

Validation:
- `npm run lint` and `npm run build` should continue passing.
- Manual review of the current app shell to ensure no accidental changes.

### Phase 2: Workspace shell and collapsible sidebar

Goal:
- Implement the core V2 sidebar behavior and stable shell layout.

Likely files:
- `components/layout/WorkspaceLayout.tsx`
- `components/layout/Sidebar.tsx`
- `components/layout/Header.tsx`
- `components/layout/ContentArea.tsx`
- `context/WorkspaceContext.tsx` or new `hooks/useSidebarState.ts`
- `app/globals.css`

Tasks:
- Convert sidebar visibility into a real open/closed state on desktop.
- Maintain the desktop default open state and allow a full collapse.
- Ensure the collapsed state removes the sidebar from the viewport entirely.
- Keep a minimal hamburger toggle in the top-left after collapse.
- Preserve and improve mobile off-canvas drawer behavior.
- Add accessible semantics for collapse state.
- Update global CSS for sidebar transition and reduced-motion handling.

Validation:
- Build and browser verification.
- Desktop open/collapse behavior must match requirements.
- Mobile drawer and overlay must function.
- Keyboard navigation and focus trap behavior should remain stable.

### Phase 3: Home editorial redesign

Goal:
- Redesign the Overview home view into a strong editorial introduction.

Likely files:
- `components/sections/Overview.tsx`
- potentially new component `components/sections/HomeHero.tsx`
- `components/ui/Logo.tsx`
- `app/globals.css`

Tasks:
- Replace the dashboard-style stats presentation with a clearer hero.
- Lead with the role statements and personal introduction.
- Use editorial spacing, hierarchy, and simple visual framing.
- Reserve a subtle visual background canvas placeholder.
- Keep the content grounded and non-marketing.

Validation:
- Visual review for editorial clarity.
- Build and runtime integrity.
- Content should clearly communicate the three roles.

### Phase 4: Interactive design canvas

Goal:
- Add the lightweight background interaction layer to the home view.

Likely files:
- `components/sections/InteractiveCanvas.tsx`
- `components/sections/Overview.tsx`
- `hooks/usePointerMotion.ts` or `hooks/useInteractiveCanvas.ts`
- `app/globals.css`

Tasks:
- Implement a decorational canvas with simple SVG and CSS elements.
- Add pointer-based parallax movement using requestAnimationFrame.
- Respect `prefers-reduced-motion` and reduce effects on mobile.
- Keep motion secondary to the content and safe for performance.

Validation:
- Build and runtime behavior.
- Check reduced motion and mobile fallback.
- Ensure no layout shifts or pointer-interaction issues.

### Phase 5: Work / project presentation redesign

Goal:
- Transform Projects into a more editorial case-study experience.

Likely files:
- `components/sections/Projects.tsx`
- `components/sections/ProjectModal.tsx`
- `data/projects.ts`
- `types/index.ts`
- `app/globals.css`

Tasks:
- Create a larger editorial project presentation with richer hierarchy.
- Feature `NusaGo Mobile` and `Rahmat Workspace` prominently.
- Use existing project context, challenges, and learnings.
- Avoid generic cards and dashboard-style project blocks.
- Keep search/filter functionality if it fits the new layout.

Validation:
- Build and visual review.
- Check content accuracy and that no invented claims are added.

### Phase 6: Profile, Journey, Toolkit, and Connect refinement

Goal:
- Improve About, Skills, Experience, Blog, and Contact with editorial composition.

Likely files:
- `components/sections/About.tsx`
- `components/sections/Skills.tsx`
- `components/sections/Experience.tsx`
- `components/sections/Blog.tsx`
- `components/sections/Contact.tsx`

Tasks:
- Reduce card-heavy presentation in favor of stronger typographic layouts.
- Retain usability, contact form, and section navigation.
- Keep the brand voice direct and factual.

Validation:
- Build and manual review.
- Ensure forms and interactive notes list remain accessible.

### Phase 7: Motion and interaction refinement

Goal:
- Make motion purposeful and consistent across the shell.

Likely files:
- `app/globals.css`
- `components/layout/Sidebar.tsx`
- `components/layout/Header.tsx`
- `components/sections/Overview.tsx`
- `components/sections/Projects.tsx`
- `components/sections/ProjectModal.tsx`
- `components/sections/InteractiveCanvas.tsx`

Tasks:
- Define sidebar open/collapse transitions.
- Add hero entrance transitions.
- Smooth project interactions and modal transitions.
- Ensure `prefers-reduced-motion` is fully respected.

Validation:
- Motion review with reduced-motion enabled.
- Browser runtime and accessibility.

### Phase 8: Responsive and accessibility refinement

Goal:
- Ensure the redesign works well across viewport sizes and assistive modes.

Likely files:
- All shell and section files modified earlier.
- `app/globals.css`

Tasks:
- Test desktop, tablet, and mobile layouts.
- Verify keyboard navigation for sidebar, search workspace, project items, and form controls.
- Add or improve ARIA attributes where needed.
- Confirm content order and focus management in the mobile drawer.

Validation:
- Manual responsive review on major breakpoints.
- Keyboard-only navigation test.
- Screen reader semantics review.

### Phase 9: Performance and production validation

Goal:
- Validate the final redesign with production quality checks.

Likely files:
- same as modified list

Tasks:
- Run `npm run lint` and `npm run build`.
- Test the app in `npm run dev` or a local production server.
- Validate that the contact API still works.
- Check that the theme toggle and persisted theme behavior remain intact.

Validation:
- `npm run lint` passes.
- `npm run build` passes.
- Manual runtime verification of the shell, Sidebar, Overview, Projects, and Contact.

## Recommended phase order

1. Foundation and legacy reconciliation
2. Workspace shell and collapsible sidebar
3. Home editorial redesign
4. Interactive design canvas
5. Work / project presentation redesign
6. Profile, Journey, Toolkit, and Connect refinement
7. Motion and interaction refinement
8. Responsive and accessibility refinement
9. Performance and production validation

This order preserves the stable shell before making major visual changes, keeps the interactive canvas architecture separate from the home redesign, and allows the portfolio content refinements to follow the new visual system.

## Notes on `DOCUMENTATION.md`

`DOCUMENTATION.md` should not remain the primary source of truth in its current form. It should be archived or replaced because it describes an older desktop/window-style version that does not match the current implementation. The new documentation set in `README.md`, `AGENTS.md`, `docs/ARCHITECTURE.md`, `docs/DESIGN_SYSTEM.md`, and `docs/ROADMAP.md` should be the primary references for Portfolio V2.
