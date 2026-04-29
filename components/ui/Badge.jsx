"use client";

import React from "react";
import { getStatusStyle } from "@/lib/tokens";

/**
 * Badge — status indicator pill.
 *
 * Usage:
 *   <Badge status="available" />
 *   <Badge variant="gold" label="Premium" />
 *   <Badge variant="brand" label="New" dot />
 */
export function Badge({ status, variant, label, dot = false, className = "" }) {
  // If a status string is passed, derive colors from tokens
  if (status) {
    const style = getStatusStyle(status);
    const text = label ?? status.replace(/_/g, " ");
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-badge border capitalize ${className}`}
        style={{ backgroundColor: style.bg, color: style.text, borderColor: style.border }}
      >
        {dot && (
          <span
            className="size-1.5 rounded-full flex-none"
            style={{ backgroundColor: style.text }}
          />
        )}
        {text}
      </span>
    );
  }

  // Variant-based badges
  const variants = {
    success: "bg-emerald-50 text-success border-emerald-200",
    warning: "bg-orange-50  text-warning border-orange-200",
    error:   "bg-red-50     text-error   border-red-200",
    info:    "bg-sky-50     text-info    border-sky-200",
    gold:    "bg-amber-50   text-gold    border-amber-200 shadow-gold",
    brand:   "bg-blue-50    text-brand   border-blue-200",
    neutral: "bg-surface    text-ink-muted border-surface-border",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-badge border ${variants[variant] ?? variants.neutral} ${className}`}
    >
      {dot && <span className="size-1.5 rounded-full flex-none bg-current" />}
      {label}
    </span>
  );
}
