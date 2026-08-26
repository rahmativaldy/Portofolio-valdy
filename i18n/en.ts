import { TranslationDictionary } from './types';

export const en: TranslationDictionary = {
  navigation: {
    overview: 'Overview',
    about: 'About',
    projects: 'Projects',
    toolkit: 'Toolkit',
    journey: 'Journey',
    notes: 'Notes',
    contact: 'Contact',
    overviewDesc: 'View dashboard overview and statistics',
    aboutDesc: 'Read the developer story and biography',
    projectsDesc: 'Explore completed and active projects',
    toolkitDesc: 'Review the tools I use to design and build products',
    journeyDesc: 'View personal development timeline and product progression',
    notesDesc: 'Read short-form dev notes and learnings',
    contactDesc: 'Find real developer contact channels',
  },
  sidebar: {
    workspace: 'Workspace',
    navigation: 'Navigation',
    role: 'Frontend Developer · Mobile Developer · UI/UX Designer',
    openToWork: 'Open to opportunities',
    collapseSidebar: 'Collapse sidebar',
  },
  header: {
    searchPlaceholder: 'Search workspace...',
    noResults: 'No results found for',
    noResultsSub: 'Search across sections, projects, notes, milestones, or skills',
    toggleTheme: 'Toggle theme',
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
    toggleNav: 'Toggle navigation',
    categories: {
      section: 'Section',
      project: 'Project',
      note: 'Note',
      journey: 'Journey',
      skill: 'Skill',
      toolkit: 'Toolkit',
    },
  },
  statusBar: {
    branch: 'main',
    openToWork: 'Open to opportunities',
    ready: 'Ready',
  },
  overview: {
    badge: 'Portfolio · Developer & Designer',
    role: 'Frontend Developer · Mobile Developer · UI/UX Designer',
    status: 'Indonesia · Open to opportunities',
    heroHeading: 'I design interfaces and build the products behind them.',
    heroDescription:
      'Specializing in structured web interfaces, cross-platform mobile applications, and polished user experiences using React, Next.js, TypeScript, and Flutter. Focused on clean architecture, responsive design systems, and thoughtful engineering.',
    techStackTag: '01 / Technology Stack',
    techStackTitle: 'Technologies & Tools',
    fullToolkitCta: 'Full Toolkit',
    selectedWorkTag: '02 / Selected Work',
    selectedWorkTitle: 'Featured Case Studies',
    viewAllProjectsCta: 'View all projects',
    technologiesTitle: 'Technologies',
    readCaseStudy: 'Read case study',
    contactTag: '03 / Get in Touch',
    contactHeading: 'Have something worth building together?',
    contactDescription:
      "Let's connect and discuss the next product, interface system, or mobile application.",
    getInTouchCta: 'Get in touch',
    viewJourneyCta: 'View journey',
  },
  about: {
    badge: '01 / Biography & Identity',
    role: 'Frontend Developer · Mobile Developer · UI/UX Designer',
    status: 'Indonesia · Open to opportunities',
    heroHeading: 'Designing with structure. Building with purpose.',
    heroP1:
      'I specialize in frontend engineering with Next.js, React, and TypeScript, mobile application development with Flutter and Dart, and user interface design. My approach bridges the gap between interface design and software engineering—building structured design systems, clean state architecture, and responsive user experiences.',
    heroP2:
      'Whether architecting a mobile property booking app with BLoC and Clean Architecture, or developing a custom developer portfolio shell with Next.js App Router, I treat code and design as equal disciplines.',
    disciplinesTag: '02 / Core Disciplines',
    disciplinesTitle: 'What I Do',
    disciplines: {
      webTag: '01 — Web',
      webTitle: 'Frontend Engineering',
      webTools: 'React · Next.js · TypeScript · Tailwind',
      webDesc:
        'Building responsive, accessible web interfaces and component systems with strict TypeScript contracts and reusable UI patterns.',
      mobileTag: '02 — Mobile',
      mobileTitle: 'Mobile Development',
      mobileTools: 'Flutter · Dart · BLoC Architecture',
      mobileDesc:
        'Developing cross-platform mobile apps for Android and iOS using Clean Architecture and stream-based state management.',
      designTag: '03 — Design',
      designTitle: 'UI/UX Design',
      designTools: 'Figma · Design Systems · Tokens',
      designDesc:
        'Designing modular UI kits, wireframes, and developer-ready mockups that map directly into code components.',
    },
    methodologyTag: '03 / Methodology',
    methodologyTitle: 'Engineering Approach',
    steps: {
      s1Tag: '01 —',
      s1Title: 'Understand',
      s1Desc:
        'Analyze product requirements, define data flow, and clarify technical constraints upfront.',
      s2Tag: '02 —',
      s2Title: 'Design',
      s2Desc:
        'Construct high-fidelity wireframes, interface layouts, and consistent spacing rules in Figma.',
      s3Tag: '03 —',
      s3Title: 'Build',
      s3Desc:
        'Develop clean, modular frontend and mobile code using typed structures and predictable state patterns.',
      s4Tag: '04 —',
      s4Title: 'Refine',
      s4Desc:
        'Test responsiveness, polish interaction details, verify API endpoints, and ensure build stability.',
    },
    toolkitTag: '04 / Technical Toolkit',
    toolkitTitle: 'Technologies & Tools',
    fullInventoryCta: 'Full Inventory',
    footerText: 'Rahmat Workspace · Developer Biography & Systems',
    exploreProjectsCta: 'Explore Projects',
    viewJourneyCta: 'View Journey',
    getInTouchCta: 'Get In Touch',
  },
  projects: {
    badge: '01 / Selected Projects',
    title: 'Selected Work',
    subtitle: 'Personal projects and technical case studies across mobile and web',
    statusCount: 'Built Projects · Case Studies',
    heroDescription:
      'A collection of real-world products and software projects built with Next.js, React, TypeScript, Flutter, and Node.js. Select any project to explore architectural decisions, state management patterns, and technical takeaways.',
    technologiesTitle: 'Technologies & Tools',
    viewCaseStudy: 'View case study',
    categories: {
      mobile: 'Mobile Application',
      web: 'Web Application',
      api: 'Backend REST API',
      software: 'Software Project',
    },
    roles: {
      nusagoMobile: 'Mobile Engineering · UI/UX Design',
      rahmatWorkspace: 'Frontend Engineering · UI/UX Design',
      nusagoApi: 'Backend Engineering · Architecture',
      taskflow: 'Frontend Engineering · State Systems',
      general: 'Engineering & Design',
    },
    items: {
      nusagoMobile: {
        description:
          'A Flutter mobile application for discovering and booking properties — hotels, kosts, and villas — in one place. Built from scratch as a real-world capstone project during my learning journey.',
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
          "Flutter's widget tree really clicks once you start thinking in composition, not inheritance.",
          'Clean Architecture pays off immediately when adding new features — no spaghetti regressions.',
          'BLoC enforces discipline; you stop reaching for setState everywhere and start thinking in streams.',
          'Firebase is great for prototyping but you hit its limits fast when your data relations get complex.',
        ],
      },
      rahmatWorkspace: {
        description:
          'A modern developer workspace and portfolio built with Next.js, React, TypeScript, and Tailwind CSS. It presents Rahmat Ivaldy as a Frontend and Mobile Developer, UI/UX Designer.',
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
          "Shipping a product you'd actually use every day gives you a completely different level of quality feedback.",
        ],
      },
      nusagoApi: {
        description:
          'A robust, type-safe REST API backend supporting the NusaGo mobile ecosystem. Features structured routing, controller-based validation, and clean layered modules.',
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
      },
      taskflow: {
        description:
          'A sleek, real-time Kanban project management dashboard designed for high-velocity teams, featuring drag-and-drop workspace columns and instant status sync.',
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
      },
    },
  },
  projectModal: {
    caseStudyTag: 'Technical Case Study',
    technologiesUsed: 'Technologies Used',
    highlightsTitle: 'Selected Features & Architecture Highlights',
    challengesTitle: 'Challenges Overcome',
    learningsTitle: 'Key Learnings',
    viewRepo: 'View Repository →',
    liveDemo: 'Live Demo ↗',
    closeModal: 'Close modal',
  },
  skills: {
    badge: '01 / Full Toolkit',
    title: 'Technologies & Tools',
    subtitle: 'Categorized technical inventory and workflow architecture',
    statusCount: 'Core Technologies · Authentic Marks',
    heroDescription:
      'A structured inventory of the languages, frameworks, state architectures, and developer tools used across my frontend, mobile, and UI design practice.',
    sections: {
      frontend: {
        num: '02',
        title: 'Frontend Engineering',
        category: 'Interface Engineering',
        description:
          'Building reusable web interfaces, responsive layouts, and typed frontend systems for web applications.',
        footnote:
          'Applied in Rahmat Workspace to construct the web shell and responsive component architecture.',
      },
      mobile: {
        num: '03',
        title: 'Mobile Development',
        category: 'Mobile Development',
        description:
          'Cross-platform mobile product development focusing on application state management and device-native user flows.',
        footnote:
          'Applied in NusaGo Mobile to shape device interactions and structured state logic.',
      },
      backend: {
        num: '04',
        title: 'Backend & Integration',
        category: 'Backend & Integration',
        description:
          'API and data integration for authentication, data persistence, and application service connectivity.',
        footnote:
          'Connects client interfaces to backend endpoints and authentication services.',
      },
      design: {
        num: '05',
        title: 'Design & Workflow',
        category: 'Design & Workflow',
        description:
          'Interface design planning, version control, API testing, and environment tools that keep product work structured.',
        footnote:
          'Bridges visual design intent in Figma with technical implementation in code.',
      },
    },
    notePrefix: 'Note:',
    itemContexts: {
      React: 'Component-driven user interfaces and reactive state model',
      'Next.js': 'App Router, page architecture, and performance optimization',
      TypeScript: 'Typed frontend architecture, interfaces, and props',
      'Tailwind CSS': 'Responsive interface styling and token system',
      JavaScript: 'Core web logic and DOM manipulation',
      HTML: 'Semantic markup structure and accessibility foundation',
      CSS: 'Custom styling properties, layout math, and keyframe motion',
      Flutter: 'Cross-platform mobile interface development and UI components',
      Dart: 'Object-oriented programming language for mobile applications',
      'BLoC Pattern': 'State management and separation of application business logic',
      'Android SDK': 'Android build configuration and device lifecycle',
      'Firebase Core': 'Mobile platform integration and core backend services',
      'Node.js': 'Server-side JavaScript runtime environment',
      Express: 'REST API routing and backend middleware',
      'RESTful APIs': 'Client-server payload contracts and HTTP request handling',
      MySQL: 'Relational database schema and persistence',
      'Firebase Auth': 'User identity authentication and session management',
      Figma: 'UI/UX design, wireframing, component planning, and interface systems',
      Git: 'Distributed version control and branch workflow',
      GitHub: 'Code hosting, code reviews, and repository history',
      'VS Code': 'Primary development workspace and editor',
      Postman: 'API endpoint testing and payload validation',
    },
    workflowTag: '06 / Workflow Pipeline',
    workflowTitle: 'Development & Design Lifecycle',
    workflowSteps: [
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
        detail:
          'Frontend web engineering (Next.js/React) and mobile development (Flutter/Dart)',
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
        detail:
          'API endpoint testing, payload inspection, and backend integration verification',
      },
    ],
    footerText: 'Rahmat Workspace · Toolkit & Workflow Architecture',
    backToOverviewCta: 'Back to Overview',
    exploreProjectsCta: 'Explore Projects',
    getInTouchCta: 'Get In Touch',
  },
  experience: {
    badge: '01 / Career & Experience',
    title: 'Development Journey',
    subtitle: 'Frontend Developer · Mobile Developer · UI/UX Designer',
    status: 'Indonesia · Open to opportunities',
    heroHeading: 'Evolution across design, web systems, and mobile engineering.',
    heroDescription:
      'A chronological record of personal development, UI/UX design practice, and software engineering discipline. From exploring core computer science fundamentals to engineering mobile ecosystems with Flutter and building structured web interfaces with Next.js and TypeScript.',
    timelineTag: '02 / Timeline',
    timelineTitle: 'Chronological Experience',
    timelineRange: '2023 — Present',
    workflowSequenceTitle: 'Workflow Sequence',
    responsibilitiesTitle: 'Scope & Responsibilities',
    milestones: {
      m01: {
        categoryLabel: 'PERSONAL PROJECT / WEB INTERFACE SYSTEM',
        title: 'Rahmat Workspace & Interface Systems',
        role: 'Frontend Engineering & UI/UX Design',
        summary:
          'Designing and implementing a personal developer workspace shell with Next.js App Router, React 19, TypeScript, and Tailwind CSS. Focused on clean workspace layout patterns, keyboard-driven navigation, and accessible UI component architecture.',
        sequence: [
          'Workspace System Thinking',
          'Typed React / Next.js Components',
          'Responsive Tailwind Styling',
        ],
        highlights: [
          'Workspace-style tab navigation and persistent state',
          'Workspace search and section navigation',
          'Custom theme engine with dark/light mode persistence',
        ],
      },
      m02: {
        categoryLabel: 'CAPSTONE / PRODUCT ENGINEERING PROJECT',
        title: 'NusaGo Mobile & API Ecosystem',
        role: 'Mobile Development & UI/UX Design',
        summary:
          'End-to-end design and mobile development of property discovery and booking application for hotels, kosts, and villas. Built from scratch as a real-world capstone project, applying BLoC state architecture, Firebase services, and a structured Node.js REST API backend.',
        sequence: [
          'Figma (UX & Wireframes)',
          'BLoC / Clean Architecture',
          'Flutter & Dart Implementation',
        ],
        highlights: [
          'Multi-category property filter system across hotels, kosts, and villas',
          'BLoC stream state management and Clean Architecture separation',
          'Node.js & Express REST API with relational data modeling',
        ],
      },
      m03: {
        categoryLabel: 'SELF-DIRECTED LEARNING / FOUNDATIONS',
        title: 'Core Software Development Foundations',
        role: 'Foundational Software & Web Basics',
        summary:
          'Self-directed exploration of computer science fundamentals, data structures, algorithms, relational database modeling, and foundational web standards. Established the mental models and core logic required for frontend and mobile engineering.',
        sequence: [
          'CS & Web Fundamentals',
          'Relational Schemas',
          'Core DOM & JS Logic',
        ],
        highlights: [
          'Data structures, algorithmic problem solving, and object-oriented concepts',
          'Relational database modeling and SQL queries',
          'Vanilla JavaScript, HTML5 semantic structure, and CSS layout fundamentals',
        ],
      },
    },
    progressionTag: '03 / Progression',
    progressionTitle: 'Skill Acquisition Path',
    progressionSubtitle: 'UI/UX → Web → Mobile → Product',
    progressionSteps: [
      {
        step: '01 —',
        title: 'UI/UX Design',
        tools: 'Figma · Design Systems',
        detail:
          'Crafting visual hierarchies, user flows, and systematic design tokens that transition cleanly into code.',
      },
      {
        step: '02 —',
        title: 'Web Development',
        tools: 'React · Next.js · TypeScript',
        detail:
          'Building structured, responsive web applications with reusable component systems and strict type safety.',
      },
      {
        step: '03 —',
        title: 'Mobile Development',
        tools: 'Flutter · Dart · BLoC',
        detail:
          'Engineering cross-platform mobile applications backed by clean architecture and predictable state management.',
      },
      {
        step: '04 —',
        title: 'Product Engineering',
        tools: 'REST APIs · Node.js · Integration',
        detail:
          'Connecting client applications with backend REST services, database modeling, and end-to-end delivery.',
      },
    ],
    footerText: 'Rahmat Workspace · Chronological Experience',
    exploreProjectsCta: 'Explore Projects',
    viewToolkitCta: 'View Toolkit',
    getInTouchCta: 'Get In Touch',
  },
  blog: {
    badge: '01 / Technical Notes',
    title: 'Technical Journal',
    subtitle: 'Architectural observations, technical decisions, and engineering reflections',
    statusCount: 'Published Notes',
    heroHeading: 'Architectural observations, technical decisions, and engineering takeaways.',
    heroDescription:
      'A collection of short technical notes, architectural tradeoffs, and practical engineering reflections written while building mobile applications with Flutter and web interface systems with Next.js and TypeScript.',
    indexTag: '02 / Technical Index',
    indexTitle: 'Published Notes',
    articleCount: 'Articles',
    notePrefix: 'NOTE',
    readNote: 'Read Note',
    modalObservation: '01 / Observation',
    modalDecision: '02 / Decision & Implementation',
    modalTakeaway: 'Key Takeaway',
    closeNote: 'Close Note',
    closeAria: 'Close note panel',
    footerText: 'Rahmat Workspace · Technical Notebook',
    exploreProjectsCta: 'Explore Projects',
    viewJourneyCta: 'View Journey',
    viewToolkitCta: 'View Toolkit',
    notes: {
      cleanArchitecture: {
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
      },
      nextjsAppRouter: {
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
      },
      zustandVsBloc: {
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
      },
    },
  },
  contact: {
    badge: '01 / Communication',
    title: "Let's build something useful.",
    subtitle: 'Frontend Developer · Mobile Developer · UI/UX Designer',
    status: 'Indonesia · Open to opportunities',
    heroHeading: 'Direct channels and inquiry form.',
    heroDescription:
      'Open to discussions around frontend engineering, Flutter mobile development, UI/UX design systems, and product development. Reach out directly via email, connect on professional networks, or send a message below.',
    channelsTag: '02 / Direct Channels & Inquiry',
    channelsTitle: 'Connect & Collaborate',
    primaryEmail: 'Primary Email',
    primaryEmailDesc: 'Direct inbox · Fast response',
    profilesTitle: 'Profiles & Networks',
    developerLocation: 'Indonesia · Remote & Project Collaborations',
    sendMessageTitle: 'Send a Message',
    sendMessageDesc: 'Direct inquiry form backed by server validation',
    form: {
      nameLabel: 'Name *',
      namePlaceholder: 'Your Name',
      emailLabel: 'Email Address *',
      emailPlaceholder: 'you@example.com',
      messageLabel: 'Message *',
      messagePlaceholder: 'Details about your inquiry, project scope, or questions...',
      submitBtn: 'Submit Message',
      sendingBtn: 'Sending Message…',
      successTitle: '✓ Message Received',
      successMessage:
        'Thank you for reaching out! Your message has been received. I will review it and respond to your email address shortly.',
      sendAnother: 'Send Another Message →',
      errors: {
        nameRequired: 'Name is required (at least 2 characters).',
        emailInvalid: 'Enter a valid email address.',
        messageRequired: 'Write a message before sending (at least 10 characters).',
        genericServer:
          "Message couldn't be sent. Please try again or contact me directly by email.",
      },
    },
    footerText: 'Rahmat Workspace · Communication Channels',
    exploreProjectsCta: 'Explore Projects',
    viewJourneyCta: 'View Journey',
    readNotesCta: 'Read Notes',
  },
};
