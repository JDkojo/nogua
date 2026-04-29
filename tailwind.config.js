const relumePlugin = require("@relume_io/relume-tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./home/**/*.{js,ts,jsx,tsx}",
    "./about-us/**/*.{js,ts,jsx,tsx}",
    "./contact/**/*.{js,ts,jsx,tsx}",
    "./book-site-visit/**/*.{js,ts,jsx,tsx}",
    "./commercial-properties/**/*.{js,ts,jsx,tsx}",
    "./commercial-sales/**/*.{js,ts,jsx,tsx}",
    "./featured-properties/**/*.{js,ts,jsx,tsx}",
    "./investment-advisory/**/*.{js,ts,jsx,tsx}",
    "./luxury-properties/**/*.{js,ts,jsx,tsx}",
    "./map-view/**/*.{js,ts,jsx,tsx}",
    "./new-launches/**/*.{js,ts,jsx,tsx}",
    "./privacy-policy/**/*.{js,ts,jsx,tsx}",
    "./property-detail/**/*.{js,ts,jsx,tsx}",
    "./property-filter-results/**/*.{js,ts,jsx,tsx}",
    "./property-listings/**/*.{js,ts,jsx,tsx}",
    "./property-management/**/*.{js,ts,jsx,tsx}",
    "./residential-sales/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
    "./testimonials/**/*.{js,ts,jsx,tsx}",
    "./whatsapp-integration/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      // ─── BRAND COLORS ──────────────────────────────────────────────
      colors: {
        // Primary brand
        brand: {
          DEFAULT:  "#1E3A8A",   // Deep Trust Blue — nav, primary buttons, active states
          hover:    "#1e40af",   // slightly lighter on hover
          action:   "#2563EB",   // Secondary Action Blue — links, CTAs, interactive
          "action-hover": "#1d4ed8",
        },

        // Semantic status
        success:  "#10B981",   // payments confirmed, approved, growth
        warning:  "#F97316",   // pending, inspections due
        error:    "#EF4444",   // failed payments, overdue, critical
        info:     "#38BDF8",   // system notifications, updates
        gold:     "#F59E0B",   // premium / luxury / featured badges

        // Neutral foundation
        surface: {
          DEFAULT:  "#F8FAFC",   // page background (light)
          dark:     "#0F172A",   // dashboard background (dark)
          card:     "#FFFFFF",   // card background (light)
          "card-dark": "#1E293B", // card background (dark)
          border:   "#E2E8F0",   // borders, dividers
          "border-dark": "#334155",
        },

        // Text
        ink: {
          DEFAULT:  "#0F172A",   // primary text
          muted:    "#64748B",   // secondary / muted text
          subtle:   "#94A3B8",   // placeholder, disabled
          inverse:  "#F8FAFC",   // text on dark backgrounds
        },

        // Overlay
        overlay: "rgba(15,23,42,0.65)",
      },

      // ─── TYPOGRAPHY ────────────────────────────────────────────────
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },

      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
      },

      // ─── SPACING / RADIUS ──────────────────────────────────────────
      borderRadius: {
        card:  "12px",
        modal: "16px",
        badge: "6px",
        pill:  "9999px",
      },

      // ─── SHADOWS (soft elevation — no harsh edges) ─────────────────
      boxShadow: {
        card:       "0 1px 3px 0 rgba(15,23,42,0.06), 0 1px 2px -1px rgba(15,23,42,0.06)",
        "card-md":  "0 4px 6px -1px rgba(15,23,42,0.08), 0 2px 4px -2px rgba(15,23,42,0.06)",
        "card-lg":  "0 10px 15px -3px rgba(15,23,42,0.08), 0 4px 6px -4px rgba(15,23,42,0.05)",
        "card-hover":"0 20px 25px -5px rgba(15,23,42,0.10), 0 8px 10px -6px rgba(15,23,42,0.06)",
        "input-focus":"0 0 0 3px rgba(37,99,235,0.15)",
        "gold":     "0 4px 14px 0 rgba(245,158,11,0.25)",
        "modal":    "0 25px 50px -12px rgba(15,23,42,0.25)",
      },

      // ─── ANIMATION DURATIONS ───────────────────────────────────────
      transitionDuration: {
        micro:  "150ms",
        fast:   "200ms",
        base:   "250ms",
        slow:   "350ms",
        page:   "300ms",
      },

      // ─── EASING CURVES ─────────────────────────────────────────────
      transitionTimingFunction: {
        "re-standard": "cubic-bezier(0.4, 0, 0.2, 1)",
        "re-decel":    "cubic-bezier(0.0, 0, 0.2, 1)",
        "re-accel":    "cubic-bezier(0.4, 0, 1, 1)",
        "re-spring":   "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },

      // ─── KEYFRAME ANIMATIONS ───────────────────────────────────────
      keyframes: {
        // Page / section entry
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-down": {
          "0%":   { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%":   { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-left": {
          "0%":   { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        // Modal
        "scale-in": {
          "0%":   { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "scale-out": {
          "0%":   { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.95)" },
        },
        // KPI number count shimmer
        "shimmer": {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        // Stagger children helper
        "stagger-fade-up": {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Input error shake
        "shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "20%":      { transform: "translateX(-4px)" },
          "40%":      { transform: "translateX(4px)" },
          "60%":      { transform: "translateX(-3px)" },
          "80%":      { transform: "translateX(3px)" },
        },
        // Pulse dot (live indicator)
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%":      { opacity: "0.5", transform: "scale(0.85)" },
        },
        // Sidebar active indicator slide
        "slide-indicator": {
          "0%":   { transform: "scaleX(0)", opacity: "0" },
          "100%": { transform: "scaleX(1)", opacity: "1" },
        },
        // Chart draw-in
        "draw-in": {
          "0%":   { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        // Skeleton loading
        "skeleton": {
          "0%":   { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        // Toast slide-in
        "toast-in": {
          "0%":   { opacity: "0", transform: "translateX(100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "toast-out": {
          "0%":   { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "0", transform: "translateX(100%)" },
        },
      },

      // ─── ANIMATION UTILITIES ───────────────────────────────────────
      animation: {
        "fade-up":          "fade-up 0.35s cubic-bezier(0.4,0,0.2,1) both",
        "fade-up-fast":     "fade-up 0.2s cubic-bezier(0.4,0,0.2,1) both",
        "fade-in":          "fade-in 0.25s cubic-bezier(0.4,0,0.2,1) both",
        "fade-down":        "fade-down 0.25s cubic-bezier(0.4,0,0.2,1) both",
        "slide-in-right":   "slide-in-right 0.3s cubic-bezier(0.4,0,0.2,1) both",
        "slide-in-left":    "slide-in-left 0.3s cubic-bezier(0.4,0,0.2,1) both",
        "scale-in":         "scale-in 0.25s cubic-bezier(0.4,0,0.2,1) both",
        "scale-out":        "scale-out 0.2s cubic-bezier(0.4,0,1,1) both",
        "shake":            "shake 0.35s cubic-bezier(0.4,0,0.2,1)",
        "pulse-dot":        "pulse-dot 1.8s ease-in-out infinite",
        "shimmer":          "shimmer 1.6s linear infinite",
        "skeleton":         "skeleton 1.4s ease-in-out infinite",
        "slide-indicator":  "slide-indicator 0.2s cubic-bezier(0.4,0,0.2,1) both",
        "toast-in":         "toast-in 0.3s cubic-bezier(0.4,0,0.2,1) both",
        "toast-out":        "toast-out 0.2s cubic-bezier(0.4,0,1,1) both",
        // Stagger delays (apply via style={{ animationDelay }})
        "stagger-1":        "stagger-fade-up 0.35s 0.05s cubic-bezier(0.4,0,0.2,1) both",
        "stagger-2":        "stagger-fade-up 0.35s 0.10s cubic-bezier(0.4,0,0.2,1) both",
        "stagger-3":        "stagger-fade-up 0.35s 0.15s cubic-bezier(0.4,0,0.2,1) both",
        "stagger-4":        "stagger-fade-up 0.35s 0.20s cubic-bezier(0.4,0,0.2,1) both",
        "stagger-5":        "stagger-fade-up 0.35s 0.25s cubic-bezier(0.4,0,0.2,1) both",
        "stagger-6":        "stagger-fade-up 0.35s 0.30s cubic-bezier(0.4,0,0.2,1) both",
      },

      // ─── BACKDROP BLUR ─────────────────────────────────────────────
      backdropBlur: {
        modal: "8px",
      },

      // ─── Z-INDEX SCALE ─────────────────────────────────────────────
      zIndex: {
        navbar:  "100",
        sidebar: "90",
        modal:   "200",
        toast:   "300",
        tooltip: "400",
      },
    },
  },

  plugins: [relumePlugin],
};
