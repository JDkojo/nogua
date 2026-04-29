"use client";

import React from "react";
import { motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";

/**
 * PageTransition — wraps page content with a fade-up entry animation.
 *
 * Usage in any page:
 *   export default function MyPage() {
 *     return (
 *       <PageTransition>
 *         <YourContent />
 *       </PageTransition>
 *     );
 *   }
 */
export function PageTransition({ children, className = "" }) {
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

/**
 * SectionReveal — animates a section into view on scroll.
 *
 * Usage:
 *   <SectionReveal>
 *     <YourSection />
 *   </SectionReveal>
 */
export function SectionReveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerList — stagger-animates a list of children.
 *
 * Usage:
 *   <StaggerList>
 *     {items.map(item => <StaggerItem key={item.id}><Card /></StaggerItem>)}
 *   </StaggerList>
 */
export function StaggerList({ children, className = "" }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }) {
  return (
    <motion.div
      variants={{
        hidden:  { opacity: 0, y: 14 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
