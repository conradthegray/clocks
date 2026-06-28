import { useEffect, useRef } from "react";

/**
 * Runs `callback` every `delay` milliseconds. Pass `delay === null` to pause.
 * The latest `callback` is always used without restarting the interval.
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
