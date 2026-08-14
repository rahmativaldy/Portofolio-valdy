import React from 'react';

interface NavIconProps {
  id: string;
  className?: string;
}

export function NavIcon({ id, className = 'w-[18px] h-[18px]' }: NavIconProps) {
  switch (id) {
    case 'overview':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case 'about':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
        </svg>
      );
    case 'projects':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75A1.75 1.75 0 015.5 8h4.086a1.75 1.75 0 011.237.512l1.328 1.328a1.75 1.75 0 001.237.512H18.5a1.75 1.75 0 011.75 1.75v5.5a1.75 1.75 0 01-1.75 1.75H5.5a1.75 1.75 0 01-1.75-1.75v-7.9z" />
        </svg>
      );
    case 'skills':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.121 2.121 0 0020.25 18L14.42 12.17M11.42 15.17A5.25 5.25 0 005.5 5.5a5.25 5.25 0 00.75 9.67l5.17 0zM14.42 12.17a5.25 5.25 0 00-2.25-6.67M20.25 5.75L18.25 7.75" />
        </svg>
      );
    case 'experience':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75A2.25 2.25 0 116.75 4.5 2.25 2.25 0 019 6.75zM17.25 19.5A2.25 2.25 0 1115 17.25 2.25 2.25 0 0117.25 19.5zM6.75 6.75v7.5a3 3 0 003 3h7.5" />
        </svg>
      );
    case 'blog':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      );
    case 'contact':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.5-9.75-6.5" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}
