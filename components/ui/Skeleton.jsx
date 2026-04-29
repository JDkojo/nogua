"use client";

import React from "react";

/**
 * Skeleton — shimmer loading placeholder.
 *
 * Usage:
 *   <Skeleton className="h-6 w-48" />
 *   <SkeletonCard />
 *   <SkeletonTable rows={5} />
 */
export function Skeleton({ className = "" }) {
  return (
    <div
      className={`re-skeleton ${className}`}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-card border border-surface-border p-4 space-y-3" aria-hidden="true">
      <Skeleton className="h-48 w-full rounded-card" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-5 w-1/3" />
    </div>
  );
}

export function SkeletonKpi() {
  return (
    <div className="kpi-card" aria-hidden="true">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-8 w-32 mt-2" />
      <Skeleton className="h-3 w-20 mt-2" />
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 5 }) {
  return (
    <div className="overflow-hidden rounded-xl border border-surface-border bg-white" aria-hidden="true">
      <div className="border-b border-surface-border bg-surface px-4 py-3 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-3 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="border-b border-surface-border px-4 py-3 flex gap-4">
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} className="h-3 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}
