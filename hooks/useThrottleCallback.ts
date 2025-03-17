import {useRef, useEffect, useCallback} from 'react';

export function useThrottleCallback<T extends (...args: any[]) => void>(callback: T, delay: number) {
  const lastCalledRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastArgsRef = useRef<Parameters<T> | null>(null);

  const throttledFunction = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      lastArgsRef.current = args;

      const remaining = delay - (now - lastCalledRef.current);

      if (remaining <= 0) {
        // Enough time passed, call immediately
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        callback(...args);
        lastCalledRef.current = now;
      } else if (!timeoutRef.current) {
        // Schedule trailing call
        timeoutRef.current = setTimeout(() => {
          if (lastArgsRef.current) {
            callback(...lastArgsRef.current);
            lastCalledRef.current = Date.now();
            timeoutRef.current = null;
          }
        }, remaining);
      }
    },
    [callback, delay],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return throttledFunction;
}
