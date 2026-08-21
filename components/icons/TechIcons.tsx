import React from 'react';
import {
  siNextdotjs,
  siTailwindcss,
  siFlutter,
  siAndroid,
  siFirebase,
  siNodedotjs,
  siExpress,
  siMysql,
  siGit,
  siGithub,
  siPostman,
} from 'simple-icons';

export interface TechIconProps {
  name: string;
  className?: string;
  mono?: boolean;
}

export function TechIcon({ name, className = 'w-4 h-4', mono = false }: TechIconProps) {
  const normalized = name.toLowerCase().trim();

  // If explicitly requested as monochrome (fallback utility)
  if (mono) {
    return renderMonochrome(normalized, className);
  }

  // Authentic Brand Colors & Shapes
  switch (normalized) {
    // ----------------------------------------------------
    // INTERFACE ENGINEERING
    // ----------------------------------------------------
    case 'react':
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          aria-hidden="true"
          fill="none"
          stroke="#61DAFB"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
        </svg>
      );

    case 'next.js':
    case 'nextjs':
    case 'next':
      return (
        <svg
          viewBox="0 0 24 24"
          className={`${className} fill-zinc-950 dark:fill-white`}
          aria-hidden="true"
        >
          <path d={siNextdotjs.path} />
        </svg>
      );

    case 'typescript':
    case 'ts':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect width="22" height="22" x="1" y="1" rx="3.5" fill="#3178C6" />
          <path
            fill="#FFFFFF"
            d="M14.4 17.5c1.2 0 2.2-.6 2.8-1.5l-1.3-.9c-.3.5-.8.9-1.5.9-.9 0-1.5-.5-1.5-1.3 0-.6.4-1 1.2-1.3l.8-.3c1.6-.6 2.4-1.3 2.4-2.6 0-1.5-1.2-2.5-2.8-2.5-1.4 0-2.4.7-2.9 1.6l1.3.8c.4-.6.9-.9 1.6-.9.8 0 1.4.5 1.4 1.2 0 .5-.4.9-1.1 1.2l-.8.3c-1.7.6-2.5 1.4-2.5 2.7 0 1.6 1.1 2.6 2.9 2.6zm-8.8-.2h2.2v-7.2h2.5V8.5H3.1v1.6h2.5v7.2z"
          />
        </svg>
      );

    case 'tailwind css':
    case 'tailwindcss':
    case 'tailwind':
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          aria-hidden="true"
          fill="#06B6D4"
        >
          <path d={siTailwindcss.path} />
        </svg>
      );

    case 'javascript':
    case 'js':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect width="22" height="22" x="1" y="1" rx="3.5" fill="#F7DF1E" />
          <path
            fill="#000000"
            d="M12.4 16.5c0 1.6-.9 2.5-2.5 2.5-1.2 0-2.1-.6-2.6-1.5l1.4-.9c.3.5.7.8 1.2.8.6 0 1-.3 1-.9v-6.3h1.5v6.3zm5.7-.3c-.4.8-1.2 1.3-2.3 1.3-1.6 0-2.6-1-2.6-2.5 0-1.4.9-2.1 2.3-2.6l.6-.2c.8-.3 1.2-.6 1.2-1.1 0-.5-.4-.9-1.1-.9-.7 0-1.2.3-1.5.8l-1.3-.9c.6-1 1.6-1.5 2.8-1.5 1.6 0 2.6.9 2.6 2.4 0 1.2-.7 1.9-2.1 2.4l-.6.2c-.9.3-1.4.7-1.4 1.3 0 .6.5 1 1.2 1 .7 0 1.2-.4 1.6-.9l1.2.9z"
          />
        </svg>
      );

    case 'html':
    case 'html5':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="#E34F26" d="M2.5 1.5l1.8 19.8 7.7 2.2 7.7-2.2 1.8-19.8H2.5z" />
          <path fill="#EF652A" d="M12 21.6l6.2-1.7 1.5-16.7H12v18.4z" />
          <path fill="#EBEBEB" d="M12 9.2H8.3l-.2-2.3H12V4.6H5.8l.6 6.9H12V9.2zm0 6.6l-3.3-.9-.2-2.4H6.2l.4 4.5 5.4 1.5V15.8z" />
          <path fill="#FFFFFF" d="M12 9.2h3.7l-.4 3.8-3.3.9v2.3l5.4-1.5.7-7.8H12v2.3zm0-4.6v2.3h5.9l.2-2.3H12z" />
        </svg>
      );

    case 'css':
    case 'css3':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="#1572B6" d="M2.5 1.5l1.8 19.8 7.7 2.2 7.7-2.2 1.8-19.8H2.5z" />
          <path fill="#33A9DC" d="M12 21.6l6.2-1.7 1.5-16.7H12v18.4z" />
          <path fill="#EBEBEB" d="M12 9.2H8.3l-.2-2.3H12V4.6H5.8l.6 6.9H12V9.2zm0 6.6l-3.3-.9-.2-2.4H6.2l.4 4.5 5.4 1.5V15.8z" />
          <path fill="#FFFFFF" d="M12 9.2h3.7l-.4 3.8-3.3.9v2.3l5.4-1.5.7-7.8H12v2.3zm0-4.6v2.3h5.9l.2-2.3H12z" />
        </svg>
      );

    // ----------------------------------------------------
    // MOBILE DEVELOPMENT
    // ----------------------------------------------------
    case 'flutter':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="#54C5F8" d="M14.314 0L2.3 12l3.686 3.686L17.971 3.7h-3.657z" />
          <path fill="#29B6F6" d="M14.314 24h3.686L10.629 16.63l-3.687-3.687 7.372-12.943" />
          <path fill="#02569B" d="M14.314 24l-7.372-7.371 3.687-3.687 7.371 7.372h-3.686z" />
          <path fill="#01579B" d="M10.629 16.629l3.685-3.686 3.686 3.686-3.686 3.686-3.685-3.686z" />
        </svg>
      );

    case 'dart':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="#0175C2" d="M4.1 4.1A2 2 0 015.5 3.5h7a2 2 0 011.4.6l6.6 6.6a2 2 0 010 2.8l-6.6 6.6a2 2 0 01-1.4.6h-7a2 2 0 01-1.4-.6l-2-2a2 2 0 010-2.8L8 12 2.1 6.1a2 2 0 010-2.8l2-2z" />
          <path fill="#00B4AB" opacity="0.85" d="M12.5 3.5L20.5 11.5l-3 3L9.5 6.5l3-3z" />
          <path fill="#54C5F8" opacity="0.6" d="M4.1 4.1l4 4-2 2-4-4 2-2z" />
        </svg>
      );

    case 'bloc pattern':
    case 'bloc':
      // Subtle generic technical icon for state architecture
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          aria-hidden="true"
          fill="none"
          stroke="#6366F1"
          strokeWidth="1.75"
        >
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="8.5" y="14" width="7" height="7" rx="1.5" />
          <path d="M6.5 10v2a2 2 0 002 2h0M17.5 10v2a2 2 0 01-2 2h0" strokeLinecap="round" />
        </svg>
      );

    case 'android sdk':
    case 'android':
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          aria-hidden="true"
          fill="#3DDC84"
        >
          <path d={siAndroid.path} />
        </svg>
      );

    case 'firebase core':
    case 'firebase auth':
    case 'firebase':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="#FFA000" d="M3.89 15.672L6.37 3.328a.508.508 0 01.956-.129l2.404 4.54L3.89 15.672z" />
          <path fill="#F57C00" d="M13.53 7.742l-3.8-7.214a.508.508 0 00-.916.03L3.89 15.672l9.64-7.93z" />
          <path fill="#FFCA28" d="M20.11 15.672l-2.48-12.344a.508.508 0 00-.956-.129L3.89 15.672l7.35 4.141a1.524 1.524 0 001.52 0l7.35-4.141z" />
        </svg>
      );

    // ----------------------------------------------------
    // BACKEND & INTEGRATION
    // ----------------------------------------------------
    case 'node.js':
    case 'nodejs':
    case 'node':
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          aria-hidden="true"
          fill="#5FA04E"
        >
          <path d={siNodedotjs.path} />
        </svg>
      );

    case 'express':
    case 'express.js':
    case 'expressjs':
      // Express brand commonly represented in monochrome
      return (
        <svg
          viewBox="0 0 24 24"
          className={`${className} fill-zinc-950 dark:fill-white`}
          aria-hidden="true"
        >
          <path d={siExpress.path} />
        </svg>
      );

    case 'restful apis':
    case 'rest api':
    case 'api':
    case 'apis':
      // Subtle generic technical icon for API contracts
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          aria-hidden="true"
          fill="none"
          stroke="#10B981"
          strokeWidth="1.75"
        >
          <rect x="3" y="4" width="18" height="6" rx="1.5" />
          <rect x="3" y="14" width="18" height="6" rx="1.5" />
          <circle cx="7" cy="7" r="1" fill="#10B981" />
          <circle cx="7" cy="17" r="1" fill="#10B981" />
          <path d="M12 10v4" strokeLinecap="round" />
        </svg>
      );

    case 'mysql':
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          aria-hidden="true"
          fill="#4479A1"
        >
          <path d={siMysql.path} />
        </svg>
      );

    // ----------------------------------------------------
    // DESIGN & WORKFLOW
    // ----------------------------------------------------
    case 'figma':
      // Authentic 5-color Figma brand mark
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="#F24E1E" d="M8 2h4v4H8V2z" />
          <path fill="#FF7262" d="M12 2h4a4 4 0 010 8h-4V2z" />
          <path fill="#A259FF" d="M8 6h4v4H8V6z" />
          <path fill="#1ABCFE" d="M12 10h4a4 4 0 010 8h-4v-8z" />
          <path fill="#0ACF83" d="M8 14h4v4a4 4 0 01-4-4z" />
        </svg>
      );

    case 'git':
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          aria-hidden="true"
          fill="#F05032"
        >
          <path d={siGit.path} />
        </svg>
      );

    case 'github':
      return (
        <svg
          viewBox="0 0 24 24"
          className={`${className} fill-zinc-950 dark:fill-white`}
          aria-hidden="true"
        >
          <path d={siGithub.path} />
        </svg>
      );

    case 'vs code':
    case 'vscode':
    case 'visual studio code':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="#007ACC"
            d="M17.5 2.5l-10 9.2L3 8.3 1 9.5l4 3.7-4 3.7 2 1.2 4.5-3.4 10 9.2 4.5-2.2V4.7L17.5 2.5zm.5 15.5l-6.5-6 6.5-6v12z"
          />
        </svg>
      );

    case 'postman':
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          aria-hidden="true"
          fill="#FF6C37"
        >
          <path d={siPostman.path} />
        </svg>
      );

    default:
      return (
        <svg
          className={`${className} stroke-zinc-400 dark:stroke-zinc-500`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M9 9l6 6M15 9l-6 6" strokeLinecap="round" />
        </svg>
      );
  }
}

function renderMonochrome(normalized: string, className: string) {
  switch (normalized) {
    case 'react':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
        </svg>
      );
    case 'next.js':
    case 'nextjs':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d={siNextdotjs.path} />
        </svg>
      );
    case 'tailwind css':
    case 'tailwind':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d={siTailwindcss.path} />
        </svg>
      );
    case 'flutter':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d={siFlutter.path} />
        </svg>
      );
    case 'android sdk':
    case 'android':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d={siAndroid.path} />
        </svg>
      );
    case 'firebase core':
    case 'firebase auth':
    case 'firebase':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d={siFirebase.path} />
        </svg>
      );
    case 'node.js':
    case 'nodejs':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d={siNodedotjs.path} />
        </svg>
      );
    case 'express':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d={siExpress.path} />
        </svg>
      );
    case 'mysql':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d={siMysql.path} />
        </svg>
      );
    case 'git':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d={siGit.path} />
        </svg>
      );
    case 'github':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d={siGithub.path} />
        </svg>
      );
    case 'postman':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d={siPostman.path} />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M9 9l6 6M15 9l-6 6" strokeLinecap="round" />
        </svg>
      );
  }
}
