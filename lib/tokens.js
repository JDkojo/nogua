/**
 * lib/tokens.js — Design Tokens (JS)
 * Single source of truth for all design values.
 * Used in Tailwind config, Framer Motion, and inline styles.
 */

export const colors = {
  // Brand
  brand:            "#1E3A8A",
  brandHover:       "#1e40af",
  brandAction:      "#2563EB",
  brandActionHover: "#1d4ed8",

  // Status
  success: "#10B981",
  warning: "#F97316",
  error:   "#EF4444",
  info:    "#38BDF8",
  gold:    "#F59E0B",

  // Surfaces
  surface:      "#F8FAFC",
  surfaceDark:  "#0F172A",
  card:         "#FFFFFF",
  cardDark:     "#1E293B",
  border:       "#E2E8F0",
  borderDark:   "#334155",

  // Text
  ink:        "#0F172A",
  inkMuted:   "#64748B",
  inkSubtle:  "#94A3B8",
  inkInverse: "#F8FAFC",
};

export const radius = {
  card:  "12px",
  modal: "16px",
  badge: "6px",
  pill:  "9999px",
};

export const shadow = {
  card:      "0 1px 3px 0 rgba(15,23,42,0.06), 0 1px 2px -1px rgba(15,23,42,0.06)",
  cardMd:    "0 4px 6px -1px rgba(15,23,42,0.08), 0 2px 4px -2px rgba(15,23,42,0.06)",
  cardLg:    "0 10px 15px -3px rgba(15,23,42,0.08), 0 4px 6px -4px rgba(15,23,42,0.05)",
  cardHover: "0 20px 25px -5px rgba(15,23,42,0.10), 0 8px 10px -6px rgba(15,23,42,0.06)",
  inputFocus:"0 0 0 3px rgba(37,99,235,0.15)",
  gold:      "0 4px 14px 0 rgba(245,158,11,0.25)",
  modal:     "0 25px 50px -12px rgba(15,23,42,0.25)",
};

export const duration = {
  micro: 150,
  fast:  200,
  base:  250,
  slow:  350,
  page:  300,
};

export const easing = {
  standard: [0.4, 0, 0.2, 1],
  decel:    [0.0, 0, 0.2, 1],
  accel:    [0.4, 0, 1, 1],
};

// Status → color mapping (for dynamic badge/row coloring)
export const statusColors = {
  // Property status
  available:  { bg: "#ecfdf5", text: "#10B981", border: "#a7f3d0" },
  reserved:   { bg: "#fffbeb", text: "#F59E0B", border: "#fde68a" },
  sold:       { bg: "#f1f5f9", text: "#64748B", border: "#e2e8f0" },
  off_market: { bg: "#fef2f2", text: "#EF4444", border: "#fecaca" },

  // Lead status
  new:        { bg: "#eff6ff", text: "#2563EB", border: "#bfdbfe" },
  contacted:  { bg: "#fffbeb", text: "#F59E0B", border: "#fde68a" },
  qualified:  { bg: "#f5f3ff", text: "#7c3aed", border: "#ddd6fe" },
  converted:  { bg: "#ecfdf5", text: "#10B981", border: "#a7f3d0" },
  lost:       { bg: "#fef2f2", text: "#EF4444", border: "#fecaca" },

  // Sale stages
  prospect:    { bg: "#eff6ff", text: "#2563EB", border: "#bfdbfe" },
  negotiation: { bg: "#fffbeb", text: "#F59E0B", border: "#fde68a" },
  agreement:   { bg: "#f5f3ff", text: "#7c3aed", border: "#ddd6fe" },
  payment:     { bg: "#fff7ed", text: "#F97316", border: "#fed7aa" },
  completed:   { bg: "#ecfdf5", text: "#10B981", border: "#a7f3d0" },
  cancelled:   { bg: "#fef2f2", text: "#EF4444", border: "#fecaca" },

  // Payment status
  pending:   { bg: "#fffbeb", text: "#F59E0B", border: "#fde68a" },
  confirmed: { bg: "#ecfdf5", text: "#10B981", border: "#a7f3d0" },
  failed:    { bg: "#fef2f2", text: "#EF4444", border: "#fecaca" },
  refunded:  { bg: "#f1f5f9", text: "#64748B", border: "#e2e8f0" },

  // Visit status
  scheduled: { bg: "#eff6ff", text: "#2563EB", border: "#bfdbfe" },
  confirmed: { bg: "#f5f3ff", text: "#7c3aed", border: "#ddd6fe" },
  completed: { bg: "#ecfdf5", text: "#10B981", border: "#a7f3d0" },
  no_show:   { bg: "#f1f5f9", text: "#64748B", border: "#e2e8f0" },

  // Land legal status
  valid:    { bg: "#ecfdf5", text: "#10B981", border: "#a7f3d0" },
  disputed: { bg: "#fef2f2", text: "#EF4444", border: "#fecaca" },
  invalid:  { bg: "#f1f5f9", text: "#64748B", border: "#e2e8f0" },

  // User roles
  super_admin: { bg: "#fef2f2", text: "#dc2626", border: "#fecaca" },
  admin:       { bg: "#f5f3ff", text: "#7c3aed", border: "#ddd6fe" },
  manager:     { bg: "#eff6ff", text: "#2563EB", border: "#bfdbfe" },
  agent:       { bg: "#ecfdf5", text: "#10B981", border: "#a7f3d0" },
  viewer:      { bg: "#f1f5f9", text: "#64748B", border: "#e2e8f0" },
};

/**
 * Get status badge styles for any status string.
 * Returns { bg, text, border } or a neutral fallback.
 */
export function getStatusStyle(status) {
  return statusColors[status] ?? { bg: "#f1f5f9", text: "#64748B", border: "#e2e8f0" };
}
