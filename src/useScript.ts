import { useState, useEffect } from 'react';

type ScriptStatus = 'loading' | 'ready' | 'error';

// Module-level: survives re-renders and is shared across all NanatriButton instances
const statusCache = new Map<string, ScriptStatus>();
const subscribers = new Map<string, Set<(s: ScriptStatus) => void>>();

function notify(src: string, status: ScriptStatus): void {
  statusCache.set(src, status);
  subscribers.get(src)?.forEach((cb) => cb(status));
}

function loadScript(src: string): void {
  if (statusCache.has(src)) return;
  statusCache.set(src, 'loading');

  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  script.addEventListener('load', () => notify(src, 'ready'), { once: true });
  script.addEventListener('error', () => notify(src, 'error'), { once: true });
  document.head.appendChild(script);
}

export function useScript(src: string): ScriptStatus {
  const [status, setStatus] = useState<ScriptStatus>(() => {
    if (typeof window === 'undefined') return 'loading';
    return statusCache.get(src) ?? 'loading';
  });

  useEffect(() => {
    const cached = statusCache.get(src);
    if (cached === 'ready' || cached === 'error') {
      setStatus(cached);
      return;
    }

    if (!subscribers.has(src)) subscribers.set(src, new Set());
    const cb = (s: ScriptStatus) => setStatus(s);
    subscribers.get(src)!.add(cb);

    loadScript(src);

    return () => {
      subscribers.get(src)?.delete(cb);
    };
  }, [src]);

  return status;
}
