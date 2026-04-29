"use client";

/**
 * AnimatedPage
 * ─────────────────────────────────────────────────────────────
 * Wrap every page's root element with this to get consistent
 * fade + slide-up page transitions.
 *
 * Usage:
 *   export default function MyPage() {
 *     return (
 *       <AnimatedPage>
 *         <YourContent />
 *       </AnimatedPage>
 *     );
 *   }
 */

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";

export function AnimatedPage({ children, className = "" }) {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
}
