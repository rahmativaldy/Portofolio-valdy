'use client';

import React from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { useLanguage } from '@/context/LanguageContext';
import { PROJECTS } from '@/data/projects';
import { EDITORIAL_NOTES } from '@/data/blog';
import { JOURNEY_MILESTONES } from '@/data/experience';
import { SKILL_GROUPS } from '@/data/skills';

interface HeaderProps {
  isSidebarOpen: boolean;
  onMenuToggle: () => void;
}

type ThemeMode = 'dark' | 'light';

type HeaderState = {
  mounted: boolean;
  theme: ThemeMode;
};

type HeaderAction =
  | { type: 'hydrate'; theme: ThemeMode }
  | { type: 'toggle'; theme: ThemeMode };

function headerReducer(state: HeaderState, action: HeaderAction): HeaderState {
  switch (action.type) {
    case 'hydrate':
      return { mounted: true, theme: action.theme };
    case 'toggle':
      return { ...state, theme: action.theme };
    default:
      return state;
  }
}

const initialHeaderState: HeaderState = {
  mounted: false,
  theme: 'dark',
};

interface SearchItem {
  id: string;
  title: string;
  category: string;
  sectionId: string;
  sectionLabel: string;
  description?: string;
  keywords?: string[];
}

export function Header({ isSidebarOpen, onMenuToggle }: HeaderProps) {
  const { setActiveSection } = useWorkspace();
  const { locale, setLocale, t } = useLanguage();
  const [state, dispatch] = React.useReducer(headerReducer, initialHeaderState);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const searchContainerRef = React.useRef<HTMLDivElement>(null);
  const resultsListRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem('theme') as ThemeMode | null;
      let theme: ThemeMode;
      if (stored === 'dark' || stored === 'light') {
        theme = stored;
      } else {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      dispatch({ type: 'hydrate', theme });
    } catch {
      dispatch({ type: 'hydrate', theme: 'dark' });
    }
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchItems: SearchItem[] = React.useMemo(() => {
    return [
      // 1. Navigation / Main Sections
      {
        id: 'nav-overview',
        title: t.navigation.overview,
        category: t.header.categories.section,
        sectionId: 'overview',
        sectionLabel: t.navigation.overview,
        description: t.navigation.overviewDesc,
        keywords: ['overview', 'ringkasan', 'home', 'beranda', 'dashboard', 'statistic', 'section', 'view', 'navigate'],
      },
      {
        id: 'nav-about',
        title: t.navigation.about,
        category: t.header.categories.section,
        sectionId: 'about',
        sectionLabel: t.navigation.about,
        description: t.navigation.aboutDesc,
        keywords: ['about', 'tentang', 'biography', 'profil', 'developer', 'story', 'section', 'view', 'navigate'],
      },
      {
        id: 'nav-projects',
        title: t.navigation.projects,
        category: t.header.categories.section,
        sectionId: 'projects',
        sectionLabel: t.navigation.projects,
        description: t.navigation.projectsDesc,
        keywords: ['projects', 'proyek', 'work', 'karya', 'case study', 'studi kasus', 'portfolio', 'section', 'view', 'navigate'],
      },
      {
        id: 'nav-skills',
        title: t.navigation.toolkit,
        category: t.header.categories.section,
        sectionId: 'skills',
        sectionLabel: t.navigation.toolkit,
        description: t.navigation.toolkitDesc,
        keywords: ['toolkit', 'skills', 'keahlian', 'tools', 'alat', 'technology', 'teknologi', 'stack', 'section', 'view', 'navigate'],
      },
      {
        id: 'nav-experience',
        title: t.navigation.journey,
        category: t.header.categories.section,
        sectionId: 'experience',
        sectionLabel: t.navigation.journey,
        description: t.navigation.journeyDesc,
        keywords: ['journey', 'experience', 'pengalaman', 'linimasa', 'timeline', 'career', 'karir', 'history', 'section', 'view', 'navigate'],
      },
      {
        id: 'nav-blog',
        title: t.navigation.notes,
        category: t.header.categories.section,
        sectionId: 'blog',
        sectionLabel: t.navigation.notes,
        description: t.navigation.notesDesc,
        keywords: ['notes', 'blog', 'catatan', 'jurnal', 'artikel', 'learnings', 'pembelajaran', 'decisions', 'section', 'view', 'navigate'],
      },
      {
        id: 'nav-contact',
        title: t.navigation.contact,
        category: t.header.categories.section,
        sectionId: 'contact',
        sectionLabel: t.navigation.contact,
        description: t.navigation.contactDesc,
        keywords: ['contact', 'kontak', 'email', 'pesan', 'message', 'inquiry', 'reach', 'section', 'view', 'navigate'],
      },

      // 2. Project Titles & Case Studies
      ...PROJECTS.map((project) => {
        let localizedDesc = project.description;
        if (project.id === 'nusago-mobile') localizedDesc = t.projects.items.nusagoMobile.description;
        else if (project.id === 'rahmat-workspace') localizedDesc = t.projects.items.rahmatWorkspace.description;
        else if (project.id === 'nusago-api') localizedDesc = t.projects.items.nusagoApi.description;
        else if (project.id === 'taskflow-dashboard') localizedDesc = t.projects.items.taskflow.description;

        return {
          id: `project-${project.id}`,
          title: project.title,
          category: t.header.categories.project,
          sectionId: 'projects',
          sectionLabel: t.navigation.projects,
          description: localizedDesc,
          keywords: [
            ...(project.technologies || []),
            ...(project.highlights || []),
            'project',
            'proyek',
            'case study',
            'studi kasus',
            'work',
            'karya',
          ],
        };
      }),

      // 3. Editorial Notes
      ...EDITORIAL_NOTES.map((note) => {
        let localizedTitle = note.title;
        let localizedSummary = note.summary;
        if (note.id === 'clean-architecture-flutter') {
          localizedTitle = t.blog.notes.cleanArchitecture.title;
          localizedSummary = t.blog.notes.cleanArchitecture.summary;
        } else if (note.id === 'nextjs-app-router-gotchas') {
          localizedTitle = t.blog.notes.nextjsAppRouter.title;
          localizedSummary = t.blog.notes.nextjsAppRouter.summary;
        } else if (note.id === 'zustand-vs-bloc') {
          localizedTitle = t.blog.notes.zustandVsBloc.title;
          localizedSummary = t.blog.notes.zustandVsBloc.summary;
        }

        return {
          id: `note-${note.id}`,
          title: localizedTitle,
          category: t.header.categories.note,
          sectionId: 'blog',
          sectionLabel: t.navigation.notes,
          description: localizedSummary,
          keywords: [
            ...(note.technologies || []),
            note.category,
            note.projectContext,
            'note',
            'catatan',
            'blog',
            'article',
            'artikel',
            'learning',
            'pembelajaran',
            'decision',
            'keputusan',
          ],
        };
      }),

      // 4. Journey Milestones
      ...JOURNEY_MILESTONES.map((journey) => {
        let localizedTitle = journey.title;
        let localizedSummary = journey.summary;
        let localizedRole = journey.role;
        if (journey.id === '01') {
          localizedTitle = t.experience.milestones.m01.title;
          localizedSummary = t.experience.milestones.m01.summary;
          localizedRole = t.experience.milestones.m01.role;
        } else if (journey.id === '02') {
          localizedTitle = t.experience.milestones.m02.title;
          localizedSummary = t.experience.milestones.m02.summary;
          localizedRole = t.experience.milestones.m02.role;
        } else if (journey.id === '03') {
          localizedTitle = t.experience.milestones.m03.title;
          localizedSummary = t.experience.milestones.m03.summary;
          localizedRole = t.experience.milestones.m03.role;
        }

        return {
          id: `journey-${journey.id}`,
          title: localizedTitle,
          category: t.header.categories.journey,
          sectionId: 'experience',
          sectionLabel: t.navigation.journey,
          description: localizedSummary,
          keywords: [
            ...(journey.technologies || []),
            localizedRole,
            journey.period,
            journey.categoryLabel,
            'experience',
            'pengalaman',
            'milestone',
            'timeline',
            'linimasa',
            'history',
            'riwayat',
          ],
        };
      }),

      // 5. Skill Groups (Toolkit categories)
      ...SKILL_GROUPS.map((group) => {
        const sectionMeta =
          group.id === '01'
            ? t.skills.sections.frontend
            : group.id === '02'
            ? t.skills.sections.mobile
            : group.id === '03'
            ? t.skills.sections.backend
            : t.skills.sections.design;

        return {
          id: `skill-group-${group.id}`,
          title: sectionMeta.category,
          category: t.header.categories.toolkit,
          sectionId: 'skills',
          sectionLabel: t.navigation.toolkit,
          description: sectionMeta.description,
          keywords: [
            ...group.items.map((i) => i.name),
            'toolkit',
            'skill',
            'keahlian',
            'tools',
            'alat',
            'group',
            'kategori',
          ],
        };
      }),

      // 6. Individual Skills & Technologies
      ...SKILL_GROUPS.flatMap((group) =>
        group.items.map((skill) => {
          const itemCtx = t.skills.itemContexts[skill.name] || skill.context;
          return {
            id: `skill-${group.id}-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
            title: skill.name,
            category: t.header.categories.skill,
            sectionId: 'skills',
            sectionLabel: t.navigation.toolkit,
            description: itemCtx + (skill.projectRef ? ` · Used in ${skill.projectRef}` : ''),
            keywords: [
              group.category,
              skill.projectRef || '',
              'skill',
              'keahlian',
              'technology',
              'teknologi',
              'tool',
              'alat',
              'tech',
            ].filter(Boolean),
          };
        })
      ),
    ];
  }, [t]);

  const filteredResults = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    const terms = q.split(/\s+/).filter(Boolean);

    const scored = searchItems.map((item) => {
      const titleLower = item.title.toLowerCase();
      const catLower = item.category.toLowerCase();
      const secLabelLower = item.sectionLabel.toLowerCase();
      const descLower = (item.description || '').toLowerCase();
      const keywordsLower = (item.keywords || []).map((k) => k.toLowerCase());

      let score = 0;

      // Exact title match
      if (titleLower === q) {
        score += 120;
      } else if (titleLower.startsWith(q)) {
        score += 80;
      } else if (titleLower.includes(q)) {
        score += 60;
      }

      // Exact section/category match
      if (secLabelLower === q || catLower === q) {
        score += 50;
      } else if (secLabelLower.startsWith(q) || catLower.startsWith(q)) {
        score += 35;
      }

      // Keywords match
      for (const kw of keywordsLower) {
        if (kw === q) {
          score += 45;
          break;
        } else if (kw.startsWith(q)) {
          score += 30;
          break;
        } else if (kw.includes(q)) {
          score += 20;
          break;
        }
      }

      // Description match
      if (descLower.includes(q)) {
        score += 15;
      }

      // Multi-word support
      if (terms.length > 1) {
        const allTermsMatch = terms.every(
          (term) =>
            titleLower.includes(term) ||
            descLower.includes(term) ||
            catLower.includes(term) ||
            secLabelLower.includes(term) ||
            keywordsLower.some((kw) => kw.includes(term))
        );
        if (allTermsMatch) {
          score += 25;
        }
      }

      return { item, score };
    });

    return scored
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.item)
      .slice(0, 8);
  }, [searchQuery, searchItems]);

  // Derive clamped active index cleanly to avoid state synchronization in effects
  const activeIndex =
    filteredResults.length > 0 && selectedIndex < filteredResults.length ? selectedIndex : 0;

  // Scroll active item into view during keyboard navigation
  React.useEffect(() => {
    if (isDropdownOpen && resultsListRef.current) {
      const selectedEl = resultsListRef.current.children[activeIndex] as HTMLElement | undefined;
      if (selectedEl && typeof selectedEl.scrollIntoView === 'function') {
        selectedEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [activeIndex, isDropdownOpen]);

  const handleSelect = (item: SearchItem) => {
    setActiveSection(item.sectionId);
    setIsDropdownOpen(false);
    setSearchQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setIsDropdownOpen(false);
      return;
    }

    if (!isDropdownOpen || filteredResults.length === 0) {
      if (e.key === 'ArrowDown' && searchQuery.trim() !== '') {
        e.preventDefault();
        setIsDropdownOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[activeIndex]) {
        handleSelect(filteredResults[activeIndex]);
      }
    }
  };

  const themeIcon = state.mounted ? (
    state.theme === 'dark' ? (
      <svg className="w-4 h-4 animate-fadeIn" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    ) : (
      <svg className="w-4 h-4 animate-fadeIn" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    )
  ) : (
    <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  );

  const themeLabel = state.mounted
    ? state.theme === 'dark'
      ? t.header.switchToLight
      : t.header.switchToDark
    : t.header.toggleTheme;

  const toggleTheme = () => {
    const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('theme', nextTheme);
    } catch {
      // Ignore localStorage errors
    }
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    dispatch({ type: 'toggle', theme: nextTheme });
  };

  return (
    <header className="h-14 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0f0f11] flex items-center justify-between px-4 md:px-6 select-none transition-colors duration-150">
      {/* Left side: Hamburger control */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className={`p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition cursor-pointer ${
            isSidebarOpen ? 'md:hidden' : 'md:inline-flex'
          }`}
          aria-label={t.header.toggleNav}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Right side: Search workspace field, Language switcher & Theme switcher */}
      <div className="flex items-center gap-3">
        {/* Global Search Workspace Field */}
        <div ref={searchContainerRef} className="relative flex items-center">
          <svg className="w-3.5 h-3.5 absolute left-3 text-zinc-400 dark:text-zinc-500 pointer-events-none z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsDropdownOpen(true);
              setSelectedIndex(0);
            }}
            onFocus={() => {
              if (searchQuery.trim() !== '') {
                setIsDropdownOpen(true);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder={t.header.searchPlaceholder}
            role="combobox"
            aria-expanded={isDropdownOpen && searchQuery.trim() !== ''}
            aria-autocomplete="list"
            aria-controls="search-workspace-dropdown"
            className="w-40 sm:w-56 md:w-64 pl-8 pr-3 py-1.5 bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 rounded-md text-xs font-sans text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
          />

          {/* Search Dropdown */}
          {isDropdownOpen && searchQuery.trim() !== '' && (
            <div
              id="search-workspace-dropdown"
              ref={resultsListRef}
              role="listbox"
              className="absolute top-full right-0 mt-1.5 w-72 sm:w-80 md:w-96 max-w-[calc(100vw-2rem)] max-h-80 overflow-y-auto bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 rounded-md shadow-2xl z-50 py-1 font-mono text-xs animate-fadeIn"
            >
              {filteredResults.length > 0 ? (
                filteredResults.map((item, idx) => (
                  <button
                    key={`${item.id}-${idx}`}
                    role="option"
                    aria-selected={idx === activeIndex}
                    type="button"
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full text-left px-3 py-2 flex flex-col gap-0.5 transition-colors cursor-pointer border-b border-zinc-100 dark:border-zinc-900/60 last:border-b-0 ${
                      idx === activeIndex
                        ? 'bg-zinc-100 dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 min-w-0">
                      <span className="font-medium truncate text-zinc-900 dark:text-zinc-100">
                        {item.title}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0 text-[10px] font-mono">
                        <span className="uppercase px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                          {item.category}
                        </span>
                        <span className="text-zinc-400 dark:text-zinc-500">
                          → {item.sectionLabel}
                        </span>
                      </div>
                    </div>
                    {item.description && (
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1 font-sans">
                        {item.description}
                      </p>
                    )}
                  </button>
                ))
              ) : (
                <div className="px-4 py-5 text-center text-zinc-500 dark:text-zinc-400">
                  <p className="font-mono text-xs">
                    {t.header.noResults} &ldquo;<span className="text-zinc-800 dark:text-zinc-200 font-medium">{searchQuery.trim()}</span>&rdquo;
                  </p>
                  <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1 font-sans">
                    {t.header.noResultsSub}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Compact EN | ID Language Switcher */}
        <div className="flex items-center rounded-md border border-zinc-200 dark:border-zinc-800 p-0.5 bg-zinc-50 dark:bg-zinc-900/80 font-mono text-[11px] shrink-0">
          <button
            type="button"
            onClick={() => setLocale('en')}
            aria-label="Switch to English"
            aria-pressed={locale === 'en'}
            className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
              locale === 'en'
                ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-xs'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            EN
          </button>
          <span className="text-zinc-300 dark:text-zinc-700 px-0.5 select-none" aria-hidden="true">
            |
          </span>
          <button
            type="button"
            onClick={() => setLocale('id')}
            aria-label="Beralih ke Bahasa Indonesia"
            aria-pressed={locale === 'id'}
            className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
              locale === 'id'
                ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-xs'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            ID
          </button>
        </div>

        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition cursor-pointer shrink-0"
          aria-label={themeLabel}
          title={themeLabel}
        >
          {themeIcon}
        </button>
      </div>
    </header>
  );
}

