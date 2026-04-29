/**
 * lib/motion.js — Centralised Framer Motion variants
 * Real Estate Portal Design System
 *
 * Usage:
 *   import { fadeUp, staggerContainer, cardHover } from "@/lib/motion";
 *   <motion.div variants={fadeUp} initial="hidden" animate="visible" />
 */

// ─── EASING ──────────────────────────────────────────────────
export const ease = {
  standard: [0.4, 0, 0.2, 1],
  decel:    [0.0, 0, 0.2, 1],
  accel:    [0.4, 0, 1, 1],
};

// ─── PAGE TRANSITIONS ─────────────────────────────────────────
export const pageTransition = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.3,  ease: [0.4,0,0.2,1] } },
  exit:    { opacity: 0,        transition: { duration: 0.2,  ease: [0.4,0,1,1]   } },
};

// ─── FADE UP ──────────────────────────────────────────────────
export const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.4,0,0.2,1] } },
};

export const fadeUpFast = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2,  ease: [0.4,0,0.2,1] } },
};

// ─── FADE IN ──────────────────────────────────────────────────
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: [0.4,0,0.2,1] } },
};

// ─── SLIDE IN ─────────────────────────────────────────────────
export const slideInRight = {
  hidden:  { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.4,0,0.2,1] } },
};

export const slideInLeft = {
  hidden:  { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.4,0,0.2,1] } },
};

// ─── STAGGER CONTAINER ────────────────────────────────────────
export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export const staggerContainerFast = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0 } },
};

export const staggerItem = {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.4,0,0.2,1] } },
};

// ─── KPI CARDS ────────────────────────────────────────────────
export const kpiContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const kpiCard = {
  hidden:  { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1,   transition: { duration: 0.35, ease: [0.4,0,0.2,1] } },
};

// ─── PROPERTY CARD HOVER ──────────────────────────────────────
export const cardHover = {
  rest:  { y: 0,  scale: 1,    boxShadow: "0 1px 3px 0 rgba(15,23,42,0.06)",                                                                  transition: { duration: 0.25, ease: [0.4,0,0.2,1] } },
  hover: { y: -6, scale: 1.01, boxShadow: "0 20px 25px -5px rgba(15,23,42,0.10), 0 8px 10px -6px rgba(15,23,42,0.06)", transition: { duration: 0.25, ease: [0.4,0,0.2,1] } },
};

export const cardImageHover = {
  rest:  { scale: 1,    transition: { duration: 0.35, ease: [0.4,0,0.2,1] } },
  hover: { scale: 1.05, transition: { duration: 0.35, ease: [0.4,0,0.2,1] } },
};

// ─── MODAL ────────────────────────────────────────────────────
export const modalOverlay = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2,  ease: [0.4,0,0.2,1] } },
  exit:    { opacity: 0, transition: { duration: 0.15, ease: [0.4,0,1,1]   } },
};

export const modalContent = {
  hidden:  { opacity: 0, scale: 0.95, y: 8 },
  visible: { opacity: 1, scale: 1,    y: 0, transition: { duration: 0.25, ease: [0.0,0,0.2,1] } },
  exit:    { opacity: 0, scale: 0.95, y: 4, transition: { duration: 0.15, ease: [0.4,0,1,1]   } },
};

// ─── SIDEBAR ──────────────────────────────────────────────────
export const sidebarExpand = {
  collapsed: { width: "64px",  transition: { duration: 0.3, ease: [0.4,0,0.2,1] } },
  expanded:  { width: "256px", transition: { duration: 0.3, ease: [0.4,0,0.2,1] } },
};

export const sidebarLabel = {
  collapsed: { opacity: 0, x: -8 },
  expanded:  { opacity: 1, x: 0,  transition: { duration: 0.2, delay: 0.1, ease: [0.4,0,0.2,1] } },
};

// ─── DROPDOWN ─────────────────────────────────────────────────
export const dropdown = {
  hidden:  { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.15, ease: [0.4,0,1,1]   } },
  visible: { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.2,  ease: [0.0,0,0.2,1] } },
};

// ─── TOAST ────────────────────────────────────────────────────
export const toast = {
  hidden:  { opacity: 0, x: 60,  scale: 0.95 },
  visible: { opacity: 1, x: 0,   scale: 1,   transition: { duration: 0.3,  ease: [0.0,0,0.2,1] } },
  exit:    { opacity: 0, x: 60,              transition: { duration: 0.2,  ease: [0.4,0,1,1]   } },
};

// ─── PIPELINE CARD ────────────────────────────────────────────
export const pipelineCard = {
  rest:  { scale: 1,    rotate: 0,   boxShadow: "0 1px 3px 0 rgba(15,23,42,0.06)",                  transition: { duration: 0.2, ease: [0.4,0,0.2,1] } },
  hover: { scale: 1.01, rotate: 0,   boxShadow: "0 10px 15px -3px rgba(15,23,42,0.08)",             transition: { duration: 0.2, ease: [0.4,0,0.2,1] } },
  drag:  { scale: 1.04, rotate: 1.5, boxShadow: "0 25px 50px -12px rgba(15,23,42,0.25)",            transition: { duration: 0.15 } },
};

// ─── CHART ENTRY ──────────────────────────────────────────────
export const chartEntry = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.5, ease: [0.0,0,0.2,1], delay: 0.1 } },
};

// ─── BUTTON PRESS ─────────────────────────────────────────────
export const buttonPress = {
  tap: { scale: 0.97, transition: { duration: 0.1 } },
};

// ─── ICON HOVER ───────────────────────────────────────────────
export const iconHover = {
  rest:  { scale: 1,    transition: { duration: 0.15, ease: [0.4,0,0.2,1] } },
  hover: { scale: 1.12, transition: { duration: 0.15, ease: [0.4,0,0.2,1] } },
};

// ─── COUNT-UP CONFIG ──────────────────────────────────────────
export const countUpConfig = { duration: 1.2, ease: [0.0,0,0.2,1] };

// ─── ACCORDION ────────────────────────────────────────────────
export const accordionContent = {
  collapsed: { height: 0,      opacity: 0, transition: { duration: 0.25, ease: [0.4,0,0.2,1] } },
  expanded:  { height: "auto", opacity: 1, transition: { duration: 0.3,  ease: [0.0,0,0.2,1] } },
};

// ─── NOTIFICATION BADGE ───────────────────────────────────────
export const notifBadge = {
  hidden:  { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 400, damping: 20 } },
};

// ─── SCROLL-TRIGGERED SECTION ─────────────────────────────────
export const sectionReveal = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.5, ease: [0.4,0,0.2,1] } },
};

export const sectionRevealFast = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.35, ease: [0.4,0,0.2,1] } },
};
