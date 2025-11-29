import { useEffect, useCallback } from 'react';

type KeyboardModifiers = {
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  meta?: boolean; // Command key on Mac, Windows key on Windows
};

type KeyboardShortcutOptions = KeyboardModifiers & {
  preventDefault?: boolean;
  stopPropagation?: boolean;
  enabled?: boolean;
};

export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options: KeyboardShortcutOptions = {}
): void {
  const {
    ctrl = false,
    alt = false,
    shift = false,
    meta = false,
    preventDefault = true,
    stopPropagation = false,
    enabled = true,
  } = options;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      // Check if the key matches (case-insensitive)
      if (event.key.toLowerCase() !== key.toLowerCase()) return;

      // Check modifiers
      if (ctrl !== event.ctrlKey) return;
      if (alt !== event.altKey) return;
      if (shift !== event.shiftKey) return;
      if (meta !== event.metaKey) return;

      // Check if we're in an input field
      const target = event.target as HTMLElement;
      const isEditable =
        target.isContentEditable ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT';

      // Allow escape key in editable fields, but block others
      if (isEditable && key.toLowerCase() !== 'escape') return;

      if (preventDefault) {
        event.preventDefault();
      }

      if (stopPropagation) {
        event.stopPropagation();
      }

      callback();
    },
    [key, ctrl, alt, shift, meta, preventDefault, stopPropagation, enabled, callback]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

// Preset hooks for common shortcuts
export function useEscapeKey(callback: () => void, enabled = true): void {
  useKeyboardShortcut('Escape', callback, { enabled });
}

export function useCommandK(callback: () => void, enabled = true): void {
  useKeyboardShortcut('k', callback, { meta: true, enabled });
}

export function useCommandS(callback: () => void, enabled = true): void {
  useKeyboardShortcut('s', callback, { meta: true, enabled });
}

export function useEnterKey(callback: () => void, enabled = true): void {
  useKeyboardShortcut('Enter', callback, { enabled, preventDefault: false });
}
