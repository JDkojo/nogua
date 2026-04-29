"use client";

/**
 * KpiCard
 * ─────────────────────────────────────────────────────────────
 * Dashboard KPI / stat card with:
 *   - Staggered fade-in + slide-up entry
 *   - Animated number count-up
 *   - Hover lift
 *   - Color-coded icon background
 *
 * Usage:
 *   <KpiCard
 *     label="Total Properties"
 *     value="1,240"
 *     sub="48 added this month"
 *     icon={BiBuilding}
 *     color="brand"
 *     index={0}
 *     href="/admin/properties"
 *   />
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { kpiCardVariants } from "@/lib/motion";
import { useCountUp } from "@/hooks/useCountUp";

const COLOR_MAP = {
  brand:   { bg: "bg-brand-800",   text: "text-white" },
  blue:    { bg: "bg-brand-600",   text: "text-white" },
  success: { bg: "bg-success",     text: "text-white" },
  gold:    { bg: "bg-gold",        text: "text-white" },
  error:   { bg: "bg-error",       text: "text-white" },
  warning: { bg: "bg-warning",     text: "text-white" },
  info:    { bg: "bg-info",        text: "text-white" },
  neutral: { bg: "bg-surface-border", text: "text-ink-muted" },
};

export function KpiCard({
  label,
  value,
  sub,
  icon: Icon,
  color = "brand",
  index = 0,
  href,
  trend,       // { value: "+12%", direction: "up" | "down" }
  isLoading = false,
}) {
  const colors = COLOR_MAP[color] || COLOR_MAP.brand;

  const card = (
    <motion.div
      custom={index}
      variants={kpiCardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(15,23,42,0.10)" }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="kpi-card will-animate"
    >
      {isLoading ? (
        <div className="space-y-3">
          <div className="skeleton h-4 w-24" />
          <div className="skeleton h-8 w-32" />
          <div className="skeleton h-3 w-20" />
        </div>
      ) : (
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <p className="text-sm font-medium text-ink-muted mb-1 truncate">{label}</p>
            <p className="text-3xl font-bold text-ink tabular-nums leading-none mb-1">
              {value ?? "—"}
            </p>
            {sub && (
              <p className="text-xs text-ink-subtle mt-1">{sub}</p>
            )}
            {trend && (
              <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${
                trend.direction === "up" ? "text-success" : "text-error"
              }`}>
                <span>{trend.direction === "up" ? "↑" : "↓"}</span>
                <span>{trend.value}</span>
              </div>
            )}
          </div>
          {Icon && (
            <div className={`flex-none rounded-lg p-2.5 ${colors.bg}`}>
              <Icon className={`size-5 ${colors.text}`} />
            </div>
          )}
        </div>
      )}
    </motion.div>
  );

  return href ? (
    <Link href={href} className="block">{card}</Link>
  ) : card;
}
