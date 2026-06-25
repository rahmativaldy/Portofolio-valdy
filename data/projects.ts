export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  highlights?: string[];
  challenges?: string[];
  learnings?: string[];
  link?: string;
  github?: string;
  /** Path relative to /public */
  thumbnail?: string;
  /** Additional gallery images relative to /public */
  gallery?: string[];
}

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
    thumbnail: '/projects/nusago/screenshot.png',
    gallery: ['/projects/nusago/screenshot.png'],
  },
  {
    id: 'rahmat-os',
    title: 'RahmatOS',
    description:
      'This portfolio — a Personal Developer Workspace built to feel like a minimal OS rather than a typical portfolio site. Heavily inspired by Raycast, Linear, and Vercel\'s design language.',
    technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'App Router'],
    highlights: [
      'Workspace-style tab navigation',
      'Command Palette (⌘K) with fuzzy search',
      'Dark & Light mode with persistence',
      'Responsive layout with mobile drawer',
      'Type-safe data layer',
    ],
    challenges: [
      'Replicating the Raycast aesthetic in a web context — getting the spacing, shadows and border-radius just right.',
      'The Command Palette required careful keyboard trap management to stay accessible.',
      'Next.js App Router has some sharp edges around client/server component boundaries that caught me off-guard.',
    ],
    learnings: [
      'Designing with constraints (monochromatic palette + one accent) produces more cohesive results than trying to use many colors.',
      'TypeScript really does make refactoring fearless — the compiler catches the regressions before you do.',
      'Shipping a product you\'d actually use every day gives you a completely different level of quality feedback.',
    ],
    github: 'https://github.com/rahmativaldy/rahmat-os',
    link: 'https://rahmat-os.vercel.app',
    thumbnail: '/projects/rahmatos/screenshot.png',
    gallery: ['/projects/rahmatos/screenshot.png'],
  },
];
