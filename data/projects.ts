import { Project } from '@/types';

export const PROJECTS: Project[] = [
  {
    id: 'nusago-mobile',
    title: 'NusaGo Mobile',
    description:
      'A Flutter mobile application for discovering and booking properties — hotels, kosts, and villas — in one place. Built from scratch as a real-world capstone project during my learning journey.',
    technologies: ['Flutter', 'Dart', 'BLoC', 'Firebase', 'Dio', 'REST API', 'Clean Architecture'],
    highlights: [
      'Clean Architecture with layered separation',
      'BLoC State Management throughout',
      'Firebase Auth & Firestore integration',
      'Custom bottom sheets and filter system',
      'Property booking flow end-to-end',
      'Kost, Hotel & Villa listing pages',
    ],
    challenges: [
      'Structuring the BLoC pattern without getting lost in boilerplate — learned to keep events/states small and focused.',
      'Designing a flexible filter system that works across three property types (Hotel, Kost, Villa) with different attribute sets.',
      'Navigating the Clean Architecture folder structure for the first time took a few refactors before it felt natural.',
    ],
    learnings: [
      'Flutter\'s widget tree really clicks once you start thinking in composition, not inheritance.',
      'Clean Architecture pays off immediately when adding new features — no spaghetti regressions.',
      'BLoC enforces discipline; you stop reaching for setState everywhere and start thinking in streams.',
      'Firebase is great for prototyping but you hit its limits fast when your data relations get complex.',
    ],
    github: 'https://github.com/rahmativaldy',
    thumbnail: '/projects/nusago/screenshot.webp',
    gallery: ['/projects/nusago/screenshot.webp'],
  },
  {
    id: 'rahmat-workspace',
    title: 'Rahmat Workspace',
    description:
      'A modern developer workspace and portfolio built with Next.js, React, TypeScript, and Tailwind CSS. It presents Rahmat Ivaldy as a Frontend and Mobile Developer, UI/UX Designer.',
    technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'App Router'],
    highlights: [
      'Workspace-style tab navigation',
      'Workspace search with instant section filtering',
      'Dark & Light mode with persistence',
      'Responsive layout with mobile drawer',
      'Type-safe data layer',
    ],
    challenges: [
      'Replicating the workspace layout aesthetic in a web context — getting the spacing, borders, and typography just right.',
      'The global search feature required careful focus management to stay accessible.',
      'Next.js App Router has some sharp edges around client/server component boundaries that caught me off-guard.',
    ],
    learnings: [
      'Designing with constraints (monochromatic palette + one accent) produces more cohesive results than trying to use many colors.',
      'TypeScript really does make refactoring fearless — the compiler catches the regressions before you do.',
      'Shipping a product you\'d actually use every day gives you a completely different level of quality feedback.',
    ],
    github: 'https://github.com/rahmativaldy',
    link: 'https://rahmativaldy.com',
    thumbnail: '/projects/rahmat-workspace/screenshot.webp',
    gallery: ['/projects/rahmat-workspace/screenshot.webp'],
  },
  {
    id: 'nusago-api',
    title: 'NusaGo API',
    description:
      'A robust, type-safe REST API backend supporting the NusaGo mobile ecosystem. Features structured routing, controller-based validation, and clean layered modules.',
    technologies: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'JWT', 'Docker'],
    highlights: [
      'Layered modular architecture (routes, controllers, services)',
      'Relational schema design with PostgreSQL and Prisma',
      'Secure authentication flow with JSON Web Tokens',
      'Robust validation middleware using Zod',
      'Interactive Swagger API documentation',
    ],
    challenges: [
      'Optimizing query performance when fetching property availability with complex date ranges and criteria filters.',
      'Maintaining precise PostgreSQL schema updates with clean migrations under production-like scenarios.',
    ],
    learnings: [
      'An ORM like Prisma speeds up prototyping, but knowing how to read raw SQL queries is crucial for debugging bottlenecks.',
      'Rigorous unit testing of middlewares early on saves countless hours of manual API testing.',
    ],
    github: 'https://github.com/rahmativaldy',
  },
  {
    id: 'taskflow-dashboard',
    title: 'TaskFlow Dashboard',
    description:
      'A sleek, real-time Kanban project management dashboard designed for high-velocity teams, featuring drag-and-drop workspace columns and instant status sync.',
    technologies: ['React', 'TypeScript', 'Zustand', 'Tailwind CSS', 'dnd-kit', 'Local Storage'],
    highlights: [
      'Fully interactive drag-and-drop column boards',
      'Reactive local state management with Zustand',
      'Subtask tracking with dynamic progress bars',
      'Accessible focus layouts matching modern IDEs',
    ],
    challenges: [
      'Preventing stuttering frame rates during item drag gestures with large task arrays — optimized via selective rendering and debounced stores.',
    ],
    learnings: [
      'Zustand provides a much lighter alternative to Redux Toolkit for UI-heavy state synchronizations.',
      'Using specialized headless libraries like @dnd-kit/core provides great accessibility support out-of-the-box.',
    ],
    github: 'https://github.com/rahmativaldy',
  },
];
