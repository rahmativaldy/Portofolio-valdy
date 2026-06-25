'use client';

import { useEffect } from 'react';

interface KeyboardOptions {
  onEscape?: () => void;
  onEnter?: () => void;
  onCommand?: (char: string) => void;
}

export function useKeyboard(options: KeyboardOptions = {}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        options.onEscape?.();
      } else if (e.key === 'Enter') {
        options.onEnter?.();
      } else if (e.metaKey || e.ctrlKey) {
        options.onCommand?.(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [options]);
}
