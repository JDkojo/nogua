"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

/**
 * KpiCounter — animates a number from 0 to the target value.
 *
 * Usage:
 *   <KpiCounter value={5200} prefix="₦" suffix="+" decimals={0} />
 */
export function KpiCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.4,
  className = "",
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    const n = decimals > 0 ? latest.toFixed(decimals) : Math.round(latest);
    return `${prefix}${Number(n).toLocaleString()}${suffix}`;
  });

  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const controls = animate(count, value, {
      duration,
      ease: [0.0, 0, 0.2, 1],
    });
    return controls.stop;
  }, [value, duration, count]);

  return (
    <motion.span className={className}>
      {rounded}
    </motion.span>
  );
}
