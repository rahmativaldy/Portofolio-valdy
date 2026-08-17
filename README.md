# Rahmat Workspace

Rahmat Workspace is the public portfolio repository for **Rahmat Ivaldy** — a UI/UX Designer, Frontend Developer, and Mobile Developer. The current implementation is a workspace-inspired portfolio experience built with modern Next.js, React, TypeScript, and Tailwind CSS.

## Overview

This repository is the source for a personal portfolio that emphasizes:
- a design-forward personal brand,
- a clean developer workspace layout,
- portfolio sections for Overview, About, Projects, Toolkit, Experience, Notes, and Contact,
- accessible navigation and quick command search,
- a dark-first visual system with subtle light support.

## Technology Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Vercel Analytics**
- **ESLint**

## Project Structure

- `app/`
  - `layout.tsx` — root layout, SEO metadata, analytics, theme initializer
  - `page.tsx` — main page entrypoint rendering the workspace shell
  - `api/contact/route.ts` — contact form API route with server validation
- `components/layout/` — the workspace shell, header, sidebar, content area, and status bar
- `components/sections/` — portfolio content sections and project modal UI
- `components/ui/` — reusable UI primitives like badges, buttons, cards, and logo
- `context/` — application state for active section
- `data/` — static content for navigation, projects, skills, experience, blog notes, and contact links
- `types/` — TypeScript models for portfolio data
- `public/` — static assets, thumbnails, favicon

## Major Features

- workspace-style sidebar navigation with keyboard support
- global workspace search field in header
- theme persistence via `localStorage`
- Projects section with search, filters, and detail modal
- Contact channel cards and working submit form backed by `/api/contact`
- responsive layout for desktop and mobile
- accessible focus states, aria roles, and form validation
- metadata and JSON-LD structured data for SEO

## Development

Install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev
```

Open http://localhost:3000

## Production

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Validation

The repository should be validated with:

- `npm run lint`
- `npm run build`
- runtime verification in the browser
- responsive testing across viewport sizes
- accessibility checks for keyboard navigation and aria attributes

## Deployment

Recommended deployment target:

- Vercel

The project can also be hosted on any Node.js platform that supports Next.js.

### Optional environment variables

- `NEXT_PUBLIC_GA_ID` — Google Analytics measurement ID

## Documentation

Primary documentation lives in this repository:

- `README.md` — public repository overview and setup
- `AGENTS.md` — rules for AI agents working in this repository
- `docs/ARCHITECTURE.md` — current application architecture and implementation details
- `docs/DESIGN_SYSTEM.md` — visual direction and design guidelines for Portfolio V2
- `docs/ROADMAP.md` — completed work, intended next phase, and priorities for Portfolio V2
