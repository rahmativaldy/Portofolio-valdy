# Architecture

This repository is currently implemented as a personal portfolio workspace built in Next.js App Router. The application is structured around a workspace shell with section-based content and a sidebar navigation model.

## Root Application

- `app/layout.tsx`
  - Defines application metadata and SEO with `metadata` exports.
  - Loads Google fonts from `next/font/google` using `Geist` and `Geist_Mono`.
  - Injects a theme initializer script that applies the `dark` class from `localStorage` before hydration.
  - Includes JSON-LD structured data for the `Person` schema.
  - Includes Vercel Analytics and optional Google Analytics when `NEXT_PUBLIC_GA_ID` is configured.

- `app/page.tsx`
  - Renders `WorkspaceShell` as the home route.
  - Exports page-level metadata for the root page.

## Application Shell

The portfolio is built around a central client-side shell.

- `components/layout/WorkspaceShell.tsx`
  - Wraps the main content in `WorkspaceProvider`.
  - Chooses which section component to render based on `activeSection`.

- `context/WorkspaceContext.tsx`
  - Provides shared state values:
    - `activeSection`
    - `setActiveSection`
  - Supplies the core application state for section navigation.

- `components/layout/WorkspaceLayout.tsx`
  - Composes the overall layout from `Sidebar`, `Header`, `ContentArea`, and `StatusBar`.
  - Manages the sidebar disclosure state with `isSidebarOpen`.
  - On desktop, the sidebar is open by default and can collapse fully to hide from the layout.
  - On mobile, the sidebar behaves as an off-canvas drawer and closes after section selection.

## Layout Components

- `components/layout/Sidebar.tsx`
  - Renders navigation items from `data/navigation.ts`.
  - Implements keyboard navigation with arrow keys, `Home`, and `End`.
  - Updates the active section and closes the mobile drawer after selection.

- `components/layout/Header.tsx`
  - Includes a responsive menu toggle, a global workspace search field, and a theme toggle.
  - On desktop, the menu toggle is hidden when the sidebar is open and reappears as a minimal top-left hamburger when the sidebar is collapsed.
  - Uses `localStorage` to persist theme selection.
  - Toggles the `dark` class on the document element.

- `components/layout/ContentArea.tsx`
  - Provides the main scrollable region for section content.
  - Applies `role="region"` and `aria-live="polite"` for accessibility.

- `components/layout/StatusBar.tsx`
  - Displays a footer status bar with the current time, live availability, and technology labels.
  - Updates the displayed time once per second.

## Portfolio Sections

The application renders these primary content sections:

- `components/sections/Overview.tsx`
- `components/sections/About.tsx`
- `components/sections/Skills.tsx`
- `components/sections/Projects.tsx`
- `components/sections/Experience.tsx`
- `components/sections/Blog.tsx`
- `components/sections/Contact.tsx`

Each section is a client component with dedicated markup and styling.

- `components/sections/Projects.tsx` now renders an editorial selected work layout for featured projects and opens `ProjectModal.tsx` as a lightweight case-study overlay.

### Overview Interactive Canvas

- `components/visual/InteractiveCanvas.tsx` provides a subtle design-layer canvas behind the Overview content.
- It uses lightweight SVG and CSS transforms for pointer-based parallax and slow idle drift.
- The canvas is decorative only and does not intercept interactive content.
- It is simplified on mobile and disabled when prefers-reduced-motion is active.

## Data Layer

Static portfolio content is authored in the `data/` directory:

- `data/navigation.ts` — navigation items and command metadata
- `data/projects.ts` — project definitions, thumbnails, tech tags, and details
- `data/skills.ts` — categorized skills list
- `data/experience.ts` — experience entries
- `data/blog.ts` — blog notes and short entries
- `data/contact.ts` — contact link definitions

Type definitions live in `types/index.ts`.

## Theme and Style System

- `app/globals.css` defines CSS custom properties for light and dark themes.
- The stylesheet defines color variables, shadow tokens, radius tokens, and motion utilities.
- Theme persistence is enabled with a `theme-init` script in the layout and a toggle in the header.

## Contact API

- `app/api/contact/route.ts` exposes a POST-only contact endpoint.
- It performs server-side validation for `name`, `email`, and `message`.
- On success, it logs the message summary to the server console.
- `GET` requests return `405 Method not allowed`.

## SEO and Analytics

- Metadata includes Open Graph, Twitter cards, keywords, authors, and canonical URL base.
- JSON-LD structured data is injected with a `Script` block in the root layout.
- Vercel Analytics is enabled by default.
- Google Analytics is enabled only when `NEXT_PUBLIC_GA_ID` is provided.

## State Management

- The app uses React `useState`, `useReducer`, and context for UI state.
- There is no external app-wide state library used in the main render path.

## Notes and Observations

- The current active user experience is a workspace-style sidebar shell, not a multi-window desktop environment.
- Legacy desktop/window functionality and helper hooks have been removed from the active source tree.
- The previous desktop/workspace documentation has been archived to `docs/LEGACY_DOCUMENTATION.md` and is no longer the current source of truth.
- The main UI is rendered client-side within the workspace shell.

## Build and Tooling

- `npm run dev` — development server
- `npm run build` — production build
- `npm start` — production runtime
- `npm run lint` — ESLint

- The project uses Next.js 16, React 19, Tailwind CSS 4, and TypeScript.
