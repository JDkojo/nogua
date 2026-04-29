"use client";

/**
 * useCountUp
 * ─────────────────────────────────────────────────────────────
 * Animates a number from 0 to `end` over `duration` ms.
 * Used in KPI cards for the number count-up animation.
 *
 * Usage:
 *   const count = useCountUp(1240, 1200);
 *   return <span>{count.toLocaleString()}</span>;
 */

import { useState, useEffect, useRef } from "react";

export function useCountUp(end, duration = 1000, start = 0) {
  const [count, setCount] = useState(start);
  const frameRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (end === null || end === undefined || isNaN(Number(end))) {
      setCount(end);
      return;
    }

    const endNum = Number(end);
    const startNum = Number(start);

    const step = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(startNum + (endNum - startNum) * eased));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      }
    };

    frameRef.current = requestAnimationFrame(step);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      startTimeRef.current = null;
    };
  }, [end, duration, start]);

  return count;
}
