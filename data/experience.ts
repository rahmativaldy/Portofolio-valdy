import { Experience } from '@/types';

export interface DetailedJourneyMilestone {
  id: string;
  sequence: string;
  period: string;
  categoryLabel: string;
  title: string;
  role: string;
  summary: string;
  designToCodeSequence: string[];
  highlights: string[];
  technologies: string[];
}

export const JOURNEY_MILESTONES: DetailedJourneyMilestone[] = [
  {
    id: '01',
    sequence: '01',
    period: '2024 — Present',
    categoryLabel: 'PERSONAL PROJECT / WEB INTERFACE SYSTEM',
    title: 'Rahmat Workspace & Interface Systems',
    role: 'Frontend Engineering & UI/UX Design',
    summary:
      'Designing and implementing a personal developer workspace shell with Next.js App Router, React 19, TypeScript, and Tailwind CSS. Focused on clean workspace layout patterns, keyboard-driven navigation, and accessible UI component architecture.',
    designToCodeSequence: [
      'Workspace System Thinking',
      'Typed React / Next.js Components',
      'Responsive Tailwind Styling',
    ],
    highlights: [
      'Workspace-style tab navigation and persistent state',
      'Command Palette (⌘K) keyboard overlay',
      'Custom theme engine with dark/light mode persistence',
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'App Router'],
  },
  {
    id: '02',
    sequence: '02',
    period: '2023 — 2024',
    categoryLabel: 'CAPSTONE / PRODUCT ENGINEERING PROJECT',
    title: 'NusaGo Mobile & API Ecosystem',
    role: 'Mobile Development & UI/UX Design',
    summary:
      'End-to-end design and mobile development of property discovery and booking application for hotels, kosts, and villas. Built from scratch as a real-world capstone project, applying BLoC state architecture, Firebase services, and a structured Node.js REST API backend.',
    designToCodeSequence: [
      'Figma (UX & Wireframes)',
      'BLoC / Clean Architecture',
      'Flutter & Dart Implementation',
    ],
    highlights: [
      'Multi-category property filter system across hotels, kosts, and villas',
      'BLoC stream state management and Clean Architecture separation',
      'Node.js & Express REST API with relational data modeling',
    ],
    technologies: ['Flutter', 'Dart', 'BLoC Pattern', 'REST API', 'Node.js', 'Express', 'Figma'],
  },
  {
    id: '03',
    sequence: '03',
    period: '2020 — 2022',
    categoryLabel: 'SELF-DIRECTED LEARNING / FOUNDATIONS',
    title: 'Core Software Development Foundations',
    role: 'Foundational Software & Web Basics',
    summary:
      'Self-directed exploration of computer science fundamentals, data structures, algorithms, relational database modeling, and foundational web standards. Established the mental models and core logic required for frontend and mobile engineering.',
    designToCodeSequence: [
      'CS & Web Fundamentals',
      'Relational Schemas',
      'Core DOM & JS Logic',
    ],
    highlights: [
      'Data structures, algorithmic problem solving, and object-oriented concepts',
      'Relational database modeling and SQL queries',
      'Vanilla JavaScript, HTML5 semantic structure, and CSS layout fundamentals',
    ],
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Node.js', 'MySQL', 'Git'],
  },
];

export const EXPERIENCE: Experience[] = JOURNEY_MILESTONES.map((m) => ({
  id: m.id,
  company: `${m.categoryLabel} · ${m.title}`,
  role: m.role,
  period: m.period,
  description: m.summary,
  technologies: m.technologies,
}));
