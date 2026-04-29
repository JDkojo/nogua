"use client";

/**
 * PropertyCard
 * ─────────────────────────────────────────────────────────────
 * Reusable animated property listing card.
 * Implements the full design system spec:
 *   - translateY(-6px) + scale(1.02) on hover
 *   - Image slow zoom (scale 1.05) on hover
 *   - Soft shadow elevation
 *   - Stagger-ready via custom index prop
 *
 * Usage:
 *   <PropertyCard property={p} index={i} />
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { propertyCardVariants, propertyImageHover } from "@/lib/motion";

const STATUS_STYLES = {
  available: "badge-success",
  reserved:  "badge-warning",
  sold:      "badge-neutral",
  off_market:"badge-neutral",
};

const TYPE_LABELS = {
  residential: "Residential",
  commercial:  "Commercial",
  luxury:      "Luxury",
  land:        "Land",
  new_launch:  "New Launch",
};

export function PropertyCard({ property, index = 0, href }) {
  const {
    id,
    title,
    type,
    status = "available",
    price,
    city,
    address,
    bedrooms,
    bathrooms,
    media = [],
  } = property;

  const image =
    Array.isArray(media) && media.length > 0
      ? media[0].url
      : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=75&auto=format&fit=crop";

  const destination = href || `/property-detail?id=${id}`;

  return (
    <motion.div
      custom={index}
      variants={propertyCardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-card border border-surface-border bg-surface-card shadow-card will-animate"
    >
      <Link href={destination} className="flex flex-col h-full">
        {/* Image */}
        <div className="re-card-image aspect-[5/6] overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="size-full object-cover"
            loading="lazy"
            width={800}
            height={960}
            whileHover={propertyImageHover}
          />
        </div>

        {/* Status badge — absolute over image */}
        <div className="absolute left-3 top-3">
          <span className={`badge ${STATUS_STYLES[status] || "badge-neutral"}`}>
            {status.replace("_", " ")}
          </span>
        </div>

        {/* Luxury badge */}
        {type === "luxury" && (
          <div className="absolute right-3 top-3">
            <span className="luxury-badge">Premium</span>
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          <div className="mb-1 flex items-start justify-between gap-2">
            <h3 className="font-semibold text-ink leading-snug">{title}</h3>
          </div>

          <p className="text-sm text-ink-muted mb-1">
            {TYPE_LABELS[type] || type}
            {city ? ` · ${city}` : address ? ` · ${address}` : ""}
          </p>

          {(bedrooms || bathrooms) && (
            <p className="text-xs text-ink-subtle mb-3">
              {bedrooms ? `${bedrooms} bed` : ""}
              {bedrooms && bathrooms ? " · " : ""}
              {bathrooms ? `${bathrooms} bath` : ""}
            </p>
          )}

          <div className="mt-auto">
            <p className="text-lg font-bold text-ink tabular-nums">
              ₦{Number(price).toLocaleString()}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
