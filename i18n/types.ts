export type Locale = 'en' | 'id';

export interface TranslationDictionary {
  navigation: {
    overview: string;
    about: string;
    projects: string;
    toolkit: string;
    journey: string;
    notes: string;
    contact: string;
    overviewDesc: string;
    aboutDesc: string;
    projectsDesc: string;
    toolkitDesc: string;
    journeyDesc: string;
    notesDesc: string;
    contactDesc: string;
  };
  sidebar: {
    workspace: string;
    navigation: string;
    role: string;
    openToWork: string;
    collapseSidebar: string;
  };
  header: {
    searchPlaceholder: string;
    noResults: string;
    noResultsSub: string;
    toggleTheme: string;
    switchToLight: string;
    switchToDark: string;
    toggleNav: string;
    categories: {
      section: string;
      project: string;
      note: string;
      journey: string;
      skill: string;
      toolkit: string;
    };
  };
  statusBar: {
    branch: string;
    openToWork: string;
    ready: string;
  };
  overview: {
    badge: string;
    role: string;
    status: string;
    heroHeading: string;
    heroDescription: string;
    techStackTag: string;
    techStackTitle: string;
    fullToolkitCta: string;
    selectedWorkTag: string;
    selectedWorkTitle: string;
    viewAllProjectsCta: string;
    technologiesTitle: string;
    readCaseStudy: string;
    contactTag: string;
    contactHeading: string;
    contactDescription: string;
    getInTouchCta: string;
    viewJourneyCta: string;
  };
  about: {
    badge: string;
    role: string;
    status: string;
    heroHeading: string;
    heroP1: string;
    heroP2: string;
    disciplinesTag: string;
    disciplinesTitle: string;
    disciplines: {
      webTag: string;
      webTitle: string;
      webTools: string;
      webDesc: string;
      mobileTag: string;
      mobileTitle: string;
      mobileTools: string;
      mobileDesc: string;
      designTag: string;
      designTitle: string;
      designTools: string;
      designDesc: string;
    };
    methodologyTag: string;
    methodologyTitle: string;
    steps: {
      s1Tag: string;
      s1Title: string;
      s1Desc: string;
      s2Tag: string;
      s2Title: string;
      s2Desc: string;
      s3Tag: string;
      s3Title: string;
      s3Desc: string;
      s4Tag: string;
      s4Title: string;
      s4Desc: string;
    };
    toolkitTag: string;
    toolkitTitle: string;
    fullInventoryCta: string;
    footerText: string;
    exploreProjectsCta: string;
    viewJourneyCta: string;
    getInTouchCta: string;
  };
  projects: {
    badge: string;
    title: string;
    subtitle: string;
    statusCount: string;
    heroDescription: string;
    technologiesTitle: string;
    viewCaseStudy: string;
    categories: {
      mobile: string;
      web: string;
      api: string;
      software: string;
    };
    roles: {
      nusagoMobile: string;
      rahmatWorkspace: string;
      nusagoApi: string;
      taskflow: string;
      general: string;
    };
    items: {
      nusagoMobile: {
        description: string;
        highlights: string[];
        challenges: string[];
        learnings: string[];
      };
      rahmatWorkspace: {
        description: string;
        highlights: string[];
        challenges: string[];
        learnings: string[];
      };
      nusagoApi: {
        description: string;
        highlights: string[];
        challenges: string[];
        learnings: string[];
      };
      taskflow: {
        description: string;
        highlights: string[];
        challenges: string[];
        learnings: string[];
      };
    };
  };
  projectModal: {
    caseStudyTag: string;
    technologiesUsed: string;
    highlightsTitle: string;
    challengesTitle: string;
    learningsTitle: string;
    viewRepo: string;
    liveDemo: string;
    closeModal: string;
  };
  skills: {
    badge: string;
    title: string;
    subtitle: string;
    statusCount: string;
    heroDescription: string;
    sections: {
      frontend: { num: string; title: string; category: string; description: string; footnote: string };
      mobile: { num: string; title: string; category: string; description: string; footnote: string };
      backend: { num: string; title: string; category: string; description: string; footnote: string };
      design: { num: string; title: string; category: string; description: string; footnote: string };
    };
    notePrefix: string;
    itemContexts: Record<string, string>;
    workflowTag: string;
    workflowTitle: string;
    workflowSteps: Array<{
      step: string;
      phase: string;
      tool: string;
      detail: string;
    }>;
    footerText: string;
    backToOverviewCta: string;
    exploreProjectsCta: string;
    getInTouchCta: string;
  };
  experience: {
    badge: string;
    title: string;
    subtitle: string;
    status: string;
    heroHeading: string;
    heroDescription: string;
    timelineTag: string;
    timelineTitle: string;
    timelineRange: string;
    workflowSequenceTitle: string;
    responsibilitiesTitle: string;
    milestones: {
      m01: {
        categoryLabel: string;
        title: string;
        role: string;
        summary: string;
        sequence: string[];
        highlights: string[];
      };
      m02: {
        categoryLabel: string;
        title: string;
        role: string;
        summary: string;
        sequence: string[];
        highlights: string[];
      };
      m03: {
        categoryLabel: string;
        title: string;
        role: string;
        summary: string;
        sequence: string[];
        highlights: string[];
      };
    };
    progressionTag: string;
    progressionTitle: string;
    progressionSubtitle: string;
    progressionSteps: Array<{
      step: string;
      title: string;
      tools: string;
      detail: string;
    }>;
    footerText: string;
    exploreProjectsCta: string;
    viewToolkitCta: string;
    getInTouchCta: string;
  };
  blog: {
    badge: string;
    title: string;
    subtitle: string;
    statusCount: string;
    heroHeading: string;
    heroDescription: string;
    indexTag: string;
    indexTitle: string;
    articleCount: string;
    notePrefix: string;
    readNote: string;
    modalObservation: string;
    modalDecision: string;
    modalTakeaway: string;
    closeNote: string;
    closeAria: string;
    footerText: string;
    exploreProjectsCta: string;
    viewJourneyCta: string;
    viewToolkitCta: string;
    notes: {
      cleanArchitecture: {
        category: string;
        projectContext: string;
        title: string;
        summary: string;
        observation: string;
        decision: string;
        takeaway: string;
      };
      nextjsAppRouter: {
        category: string;
        projectContext: string;
        title: string;
        summary: string;
        observation: string;
        decision: string;
        takeaway: string;
      };
      zustandVsBloc: {
        category: string;
        projectContext: string;
        title: string;
        summary: string;
        observation: string;
        decision: string;
        takeaway: string;
      };
    };
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    status: string;
    heroHeading: string;
    heroDescription: string;
    channelsTag: string;
    channelsTitle: string;
    primaryEmail: string;
    primaryEmailDesc: string;
    profilesTitle: string;
    developerLocation: string;
    sendMessageTitle: string;
    sendMessageDesc: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitBtn: string;
      sendingBtn: string;
      successTitle: string;
      successMessage: string;
      sendAnother: string;
      errors: {
        nameRequired: string;
        emailInvalid: string;
        messageRequired: string;
        genericServer: string;
      };
    };
    footerText: string;
    exploreProjectsCta: string;
    viewJourneyCta: string;
    readNotesCta: string;
  };
}
