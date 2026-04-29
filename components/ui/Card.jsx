"use client";

import React from "react";
import { motion } from "framer-motion";
import { cardHover, cardImageHover } from "@/lib/motion";

/**
 * Card — base card with optional hover lift animation.
 */
export function Card({ children, hover = false, className = "", onClick }) {
  if (hover) {
    return (
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={cardHover}
        onClick={onClick}
        className={`bg-white rounded-card border border-surface-border overflow-hidden cursor-pointer ${className}`}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-card border border-surface-border shadow-card overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * PropertyCard — card with image zoom on hover.
 */
export function PropertyCard({ image, imageAlt, children, href, className = "" }) {
  const Tag = href ? "a" : "div";

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardHover}
      className={`bg-white rounded-card border border-surface-border overflow-hidden ${className}`}
    >
      <Tag href={href} className="block">
        {image && (
          <div className="overflow-hidden">
            <motion.img
              variants={cardImageHover}
              src={image}
              alt={imageAlt ?? ""}
              className="w-full object-cover"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-4">{children}</div>
      </Tag>
    </motion.div>
  );
}

/**
 * KpiCard — dashboard metric card with stagger animation.
 */
export function KpiCard({ label, value, sub, icon, delta, deltaType = "up", className = "" }) {
  return (
    <div className={`kpi-card ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="kpi-label">{label}</p>
          <p className="kpi-value mt-1">{value ?? "—"}</p>
          {sub && <p className="text-xs text-ink-subtle mt-1">{sub}</p>}
          {delta && (
            <p className={deltaType === "up" ? "kpi-delta-up mt-2" : "kpi-delta-down mt-2"}>
              {deltaType === "up" ? "↑" : "↓"} {delta}
            </p>
          )}
        </div>
        {icon && (
          <div className="flex-none ml-4 p-2.5 rounded-card bg-brand/10 text-brand">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * AdminCard — dark-themed card for admin dashboard.
 */
export function AdminCard({ children, className = "" }) {
  return (
    <div className={`admin-card p-6 ${className}`}>
      {children}
    </div>
  );
}
