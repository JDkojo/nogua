"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Button — design-system button with press animation.
 *
 * variants: primary | secondary | action | ghost | danger | link
 * sizes:    sm | md | lg
 */
const VARIANTS = {
  primary:   "bg-brand text-white hover:bg-brand-hover border border-brand hover:border-brand-hover shadow-card hover:shadow-card-md hover:-translate-y-px",
  secondary: "bg-white text-brand border border-brand hover:bg-brand hover:text-white hover:shadow-card-md hover:-translate-y-px",
  action:    "bg-brand-action text-white hover:bg-brand-action-hover border border-brand-action hover:shadow-card-md hover:-translate-y-px",
  ghost:     "bg-transparent text-ink-muted border border-transparent hover:bg-surface-border hover:text-ink",
  danger:    "bg-error text-white hover:bg-red-600 border border-error hover:-translate-y-px",
  link:      "bg-transparent text-brand-action underline-offset-2 hover:underline border-none shadow-none p-0",
};

const SIZES = {
  sm: "px-3.5 py-1.5 text-xs rounded-card",
  md: "px-5    py-2.5 text-sm rounded-card",
  lg: "px-6    py-3   text-base rounded-card",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  iconLeft,
  iconRight,
  className = "",
  onClick,
  type = "button",
  ...props
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      transition={{ duration: 0.1 }}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold
        transition-all duration-fast ease-[cubic-bezier(0.4,0,0.2,1)]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action focus-visible:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
        active:translate-y-0 active:shadow-none
        ${VARIANTS[variant] ?? VARIANTS.primary}
        ${SIZES[size] ?? SIZES.md}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <span className="size-4 rounded-full border-2 border-current border-t-transparent animate-spin flex-none" />
      ) : iconLeft ? (
        <span className="flex-none">{iconLeft}</span>
      ) : null}
      {children}
      {!loading && iconRight && <span className="flex-none">{iconRight}</span>}
    </motion.button>
  );
}
