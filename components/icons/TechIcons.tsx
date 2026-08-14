import React from 'react';

interface TechIconProps {
  name: string;
  className?: string;
}

export function TechIcon({ name, className = 'w-5 h-5' }: TechIconProps) {
  const normalized = name.toLowerCase().trim();

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
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.5 5.5a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-4.814l5.378 7.395A8.468 8.468 0 0020.5 12a8.5 8.5 0 10-3.328 6.744L10.5 9.176V15.25a.75.75 0 001.5 0v-7.75z"
          />
        </svg>
      );

    case 'typescript':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M7 10h5m-2.5 0v7M14.5 17c.8 0 1.5-.4 2-1 .5-.6.5-1.5 0-2.1l-1.5-.9c-.5-.3-.7-.6-.7-1 0-.5.4-.8.9-.8.6 0 1.1.3 1.3.8" strokeLinecap="round" />
        </svg>
      );

    case 'tailwind css':
    case 'tailwind':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
        </svg>
      );

    case 'javascript':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M11 17v-4a1 1 0 00-1-1H9.5M14 16.5c.5.5 1.1.8 1.8.8 1 0 1.7-.6 1.7-1.4 0-1-.8-1.4-1.8-1.8l-.5-.2c-1.1-.4-1.7-.9-1.7-1.9 0-1.2 1-2 2.3-2 1 0 1.7.3 2.2.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'html':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 3l1.5 17L12 22l6.5-2L20 3H4z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 7.5H7.5l.5 5h7.5l-.5 5-3 1-3-1-.2-2" />
        </svg>
      );

    case 'css':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 3l1.5 17L12 22l6.5-2L20 3H4z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 7.5H7.5l.3 3.5h8.2l-.6 6-3.4 1-3.4-1-.2-2.5" />
        </svg>
      );

    case 'flutter':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.314 0L2.3 12 6 15.7 18 3.7h-3.686zm-3.686 12L6.942 15.686 14.314 23.058H18l-7.372-7.372L18 8.314h-3.686l-3.686 3.686z" />
        </svg>
      );

    case 'dart':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4.1 4.1A2 2 0 015.5 3.5h7a2 2 0 011.4.6l6.6 6.6a2 2 0 010 2.8l-6.6 6.6a2 2 0 01-1.4.6h-7a2 2 0 01-1.4-.6l-2-2a2 2 0 010-2.8L8 12 2.1 6.1a2 2 0 010-2.8l2-2z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'bloc pattern':
    case 'bloc':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="8.5" y="14" width="7" height="7" rx="1.5" />
          <path d="M6.5 10v2a2 2 0 002 2h0M17.5 10v2a2 2 0 01-2 2h0" strokeLinecap="round" />
        </svg>
      );

    case 'android sdk':
    case 'android':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 18c0 1.1.9 2 2 2h8a2 2 0 002-2v-7H6v7zM15.5 3.5l1.3-1.3c.2-.2.2-.5 0-.7-.2-.2-.5-.2-.7 0l-1.4 1.4A8.04 8.04 0 0012 2.2c-1 0-1.9.2-2.7.7L7.9 1.5c-.2-.2-.2-.5 0-.7-.2.2-.2.5 0 .7l1.3 1.3A7.95 7.95 0 005 9h14a7.95 7.95 0 00-3.5-5.5zM9 6.5a.75.75 0 110-1.5.75.75 0 010 1.5zm6 0a.75.75 0 110-1.5.75.75 0 010 1.5z" />
        </svg>
      );

    case 'firebase core':
    case 'firebase auth':
    case 'firebase':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.89 15.672L6.37 3.328a.508.508 0 01.956-.129l2.404 4.54 2.802-5.326a.508.508 0 01.916.03l6.59 13.229-7.29 4.187a1.524 1.524 0 01-1.524 0l-7.234-4.187z" />
        </svg>
      );

    case 'node.js':
    case 'nodejs':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l9 5.2v10.4L12 22l-9-5.2V7.2L12 2zm0 2.3L4.5 8.5v7l7.5 4.3 7.5-4.3v-7L12 4.3z" />
          <path d="M12 8v8m-4-6l4-2 4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );

    case 'express':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 8l4 4-4 4M12 16h8M12 8l4 4-4 4" />
        </svg>
      );

    case 'restful apis':
    case 'rest api':
    case 'api':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="4" width="18" height="6" rx="1.5" />
          <rect x="3" y="14" width="18" height="6" rx="1.5" />
          <circle cx="7" cy="7" r="1" fill="currentColor" />
          <circle cx="7" cy="17" r="1" fill="currentColor" />
          <path d="M12 10v4" strokeLinecap="round" />
        </svg>
      );

    case 'mysql':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <ellipse cx="12" cy="6" rx="8" ry="3" />
          <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" strokeLinecap="round" />
          <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" strokeLinecap="round" />
        </svg>
      );

    case 'figma':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 2h4v4H8V2zm4 0h4a4 4 0 010 8h-4V2zm0 8h4a4 4 0 010 8h-4v-8zm-4-4h4v4H8V6zm0 8h4v4a4 4 0 01-4-4z" />
        </svg>
      );

    case 'git':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.6 10.8l-8.4-8.4a1.8 1.8 0 00-2.5 0L8.4 4.7l3.2 3.2a2.1 2.1 0 012.3 2.3l2.8 2.8a2.1 2.1 0 11-1.3 1.3l-2.6-2.6v3.7a2.1 2.1 0 11-1.8 0V11a2.1 2.1 0 01-1.1-2.8L6.8 5.1 2.4 9.5a1.8 1.8 0 000 2.5l8.4 8.4a1.8 1.8 0 002.5 0l8.3-8.3a1.8 1.8 0 000-2.5z" />
        </svg>
      );

    case 'github':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      );

    case 'vs code':
    case 'vscode':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.5 2.5l-10 9.2L3 8.3 1 9.5l4 3.7-4 3.7 2 1.2 4.5-3.4 10 9.2 4.5-2.2V4.7L17.5 2.5zm.5 15.5l-6.5-6 6.5-6v12z" />
        </svg>
      );

    case 'postman':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2A10 10 0 1022 12 10 10 0 0012 2zm5.7 6.3l-5.3 2.1a1 1 0 00-.5.5l-2.1 5.3a.5.5 0 00.6.6l5.3-2.1a1 1 0 00.5-.5l2.1-5.3a.5.5 0 00-.6-.6zM12 13.5a1.5 1.5 0 111.5-1.5 1.5 1.5 0 01-1.5 1.5z" />
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
