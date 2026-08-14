import { Skill } from '@/types';

export interface DetailedSkillItem {
  name: string;
  isPrimary?: boolean;
  context: string;
  projectRef?: string;
}

export interface DetailedSkillGroup {
  id: string;
  category: string;
  description: string;
  footnote: string;
  items: DetailedSkillItem[];
}

export const SKILL_GROUPS: DetailedSkillGroup[] = [
  {
    id: '01',
    category: 'Interface Engineering',
    description:
      'Building reusable web interfaces, responsive layouts, and typed frontend systems for web applications.',
    footnote: 'Applied in Rahmat Workspace to construct the web shell and responsive component architecture.',
    items: [
      {
        name: 'React',
        isPrimary: true,
        context: 'Component-driven user interfaces and reactive state model',
      },
      {
        name: 'Next.js',
        isPrimary: true,
        context: 'App Router, page architecture, and performance optimization',
        projectRef: 'Rahmat Workspace',
      },
      {
        name: 'TypeScript',
        isPrimary: true,
        context: 'Typed frontend architecture, interfaces, and props',
      },
      {
        name: 'Tailwind CSS',
        isPrimary: true,
        context: 'Responsive interface styling and token system',
      },
      {
        name: 'JavaScript',
        isPrimary: false,
        context: 'Core web logic and DOM manipulation',
      },
      {
        name: 'HTML',
        isPrimary: false,
        context: 'Semantic markup structure and accessibility foundation',
      },
      {
        name: 'CSS',
        isPrimary: false,
        context: 'Custom styling properties, layout math, and keyframe motion',
      },
    ],
  },
  {
    id: '02',
    category: 'Mobile Development',
    description:
      'Cross-platform mobile product development focusing on application state management and device-native user flows.',
    footnote: 'Applied in NusaGo Mobile to shape device interactions and structured state logic.',
    items: [
      {
        name: 'Flutter',
        isPrimary: true,
        context: 'Cross-platform mobile interface development and UI components',
        projectRef: 'NusaGo Mobile',
      },
      {
        name: 'Dart',
        isPrimary: true,
        context: 'Object-oriented programming language for mobile applications',
        projectRef: 'NusaGo Mobile',
      },
      {
        name: 'BLoC Pattern',
        isPrimary: false,
        context: 'State management and separation of application business logic',
        projectRef: 'NusaGo Mobile',
      },
      {
        name: 'Android SDK',
        isPrimary: false,
        context: 'Android build configuration and device lifecycle',
      },
      {
        name: 'Firebase Core',
        isPrimary: false,
        context: 'Mobile platform integration and core backend services',
      },
    ],
  },
  {
    id: '03',
    category: 'Backend & Integration',
    description:
      'API and data integration for authentication, data persistence, and application service connectivity.',
    footnote: 'Connects client interfaces to backend endpoints and authentication services.',
    items: [
      {
        name: 'Node.js',
        isPrimary: true,
        context: 'Server-side JavaScript runtime environment',
      },
      {
        name: 'Express',
        isPrimary: true,
        context: 'REST API routing and backend middleware',
      },
      {
        name: 'RESTful APIs',
        isPrimary: true,
        context: 'Client-server payload contracts and HTTP request handling',
      },
      {
        name: 'MySQL',
        isPrimary: false,
        context: 'Relational database schema and persistence',
      },
      {
        name: 'Firebase Auth',
        isPrimary: false,
        context: 'User identity authentication and session management',
      },
    ],
  },
  {
    id: '04',
    category: 'Design & Workflow',
    description:
      'Interface design planning, version control, API testing, and environment tools that keep product work structured.',
    footnote: 'Bridges visual design intent in Figma with technical implementation in code.',
    items: [
      {
        name: 'Figma',
        isPrimary: true,
        context: 'UI/UX design, wireframing, component planning, and interface systems',
        projectRef: 'Design to Code',
      },
      {
        name: 'Git',
        isPrimary: true,
        context: 'Distributed version control and branch workflow',
      },
      {
        name: 'GitHub',
        isPrimary: true,
        context: 'Code hosting, code reviews, and repository history',
      },
      {
        name: 'VS Code',
        isPrimary: false,
        context: 'Primary development workspace and editor',
      },
      {
        name: 'Postman',
        isPrimary: false,
        context: 'API endpoint testing and payload validation',
      },
    ],
  },
];

export const WORKFLOW_PIPELINE = [
  {
    step: '01',
    phase: 'Design',
    tool: 'Figma',
    detail: 'UI/UX wireframes, visual hierarchy, layout systems, and interface prototypes',
  },
  {
    step: '02',
    phase: 'Develop',
    tool: 'VS Code',
    detail: 'Frontend web engineering (Next.js/React) and mobile development (Flutter/Dart)',
  },
  {
    step: '03',
    phase: 'Version',
    tool: 'Git · GitHub',
    detail: 'Source version control, branch isolation, and project commit history',
  },
  {
    step: '04',
    phase: 'Test',
    tool: 'Postman',
    detail: 'API endpoint testing, payload inspection, and backend integration verification',
  },
];

export const SKILLS: Skill[] = SKILL_GROUPS.map((group) => ({
  category: group.category,
  items: group.items.map((item) => item.name),
}));
