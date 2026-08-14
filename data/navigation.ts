export interface NavItem {
  id: string;
  label: string;
  icon: string;
  fileName: string;
}

export interface CommandMetadata {
  id: string;
  label: string;
  description: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: '', fileName: 'overview.md' },
  { id: 'about', label: 'About', icon: '', fileName: 'about.tsx' },
  { id: 'projects', label: 'Projects', icon: '', fileName: 'projects.json' },
  { id: 'skills', label: 'Toolkit', icon: '', fileName: 'skills.config' },
  { id: 'experience', label: 'Journey', icon: '', fileName: 'experience.log' },
  { id: 'blog', label: 'Notes', icon: '', fileName: 'notes.md' },
  { id: 'contact', label: 'Contact', icon: '', fileName: 'contact.http' },
];

export const COMMANDS_METADATA: CommandMetadata[] = [
  {
    id: 'overview',
    label: 'Overview',
    description: 'View dashboard overview and statistics',
  },
  {
    id: 'about',
    label: 'About',
    description: 'Read the developer story and biography',
  },
  {
    id: 'projects',
    label: 'Projects',
    description: 'Explore completed and active projects',
  },
  {
    id: 'skills',
    label: 'Toolkit',
    description: 'Review the tools I use to design and build products',
  },
  {
    id: 'experience',
    label: 'Journey',
    description: 'View personal development timeline and product progression',
  },
  {
    id: 'blog',
    label: 'Notes',
    description: 'Read short-form dev notes and learnings',
  },
  {
    id: 'contact',
    label: 'Contact',
    description: 'Find real developer contact channels',
  },
];
