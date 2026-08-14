import { BlogNote } from '@/types';

export interface EditorialNote {
  id: string;
  sequence: string;
  category: string;
  projectContext: string;
  title: string;
  summary: string;
  observation: string;
  decision: string;
  takeaway: string;
  technologies: string[];
}

export const EDITORIAL_NOTES: EditorialNote[] = [
  {
    id: 'clean-architecture-flutter',
    sequence: '01',
    category: 'MOBILE ARCHITECTURE',
    projectContext: 'USED IN NUSAGO MOBILE',
    title: 'Clean Architecture in Practice: Lessons from NusaGo Mobile',
    summary:
      'Observations on balancing clean architectural boundaries with practical iteration speed when building Flutter mobile applications.',
    observation:
      'Following strict Clean Architecture rules created unnecessary ceremony. Creating separate entity, model, and mapper classes for identical data structures added code churn without adding safety.',
    decision:
      'Kept repository data-source abstractions and single-purpose use cases, but inlined JSON transformations directly on entities for simple data models. Used BLoC to enforce explicit event-to-state stream mapping.',
    takeaway:
      'Clean Architecture is a spectrum, not a rigid checklist. Apply the layers that solve genuine complexity in your codebase.',
    technologies: ['Flutter', 'Dart', 'BLoC Pattern', 'Clean Architecture'],
  },
  {
    id: 'nextjs-app-router-gotchas',
    sequence: '02',
    category: 'WEB ARCHITECTURE',
    projectContext: 'USED IN RAHMAT WORKSPACE',
    title: 'App Router Patterns: Lessons from Building Rahmat Workspace',
    summary:
      'Architectural observations on managing component boundaries, client hydration state, and layout metadata in Next.js.',
    observation:
      'Mixing client-side state hooks with page-level metadata exports caused hydration warnings and forced parent layouts into client rendering unnecessarily.',
    decision:
      'Separated page entry points into thin Server Component wrappers for metadata injection, delegating interactive workspace state to deeply nested Client Components.',
    takeaway:
      'Keep client boundaries as deep and localized as possible in the React component tree to maintain server-rendering benefits.',
    technologies: ['Next.js', 'React', 'TypeScript', 'App Router'],
  },
  {
    id: 'zustand-vs-bloc',
    sequence: '03',
    category: 'STATE MANAGEMENT',
    projectContext: 'USED IN NUSAGO MOBILE & TASKFLOW',
    title: 'State Management Across Web and Mobile: BLoC and Zustand',
    summary:
      'Comparing state management paradigms between explicit event streams in Flutter (BLoC) and reactive state stores in React (Zustand).',
    observation:
      'Mobile property booking flows in NusaGo required strict, predictable multi-step state transitions (loading, error, partial results), whereas TaskFlow web UI required rapid, low-friction state mutations for drag-and-drop actions.',
    decision:
      'Applied BLoC in Flutter to guarantee predictable stream state transitions, and adopted Zustand in React for lightweight, zero-boilerplate local store synchronization.',
    takeaway:
      'Match state management ceremony to state complexity — strict streams for multi-step async flows, minimal stores for frequent UI state.',
    technologies: ['React', 'Flutter', 'BLoC Pattern', 'Zustand'],
  },
];

export const BLOG_NOTES: BlogNote[] = EDITORIAL_NOTES.map((n) => ({
  id: n.id,
  title: n.title,
  date: '',
  summary: n.summary,
  tags: n.technologies,
  content: `${n.observation}\n\n${n.decision}\n\nKey Takeaway: ${n.takeaway}`,
}));
