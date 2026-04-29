"use client";

/**
 * PropertyGrid — dynamic property listing with filters.
 * Fetches from GET /api/properties and replaces the static Product9 grid.
 */

import { Button } from "@relume_io/relume-ui";
import Link from "next/link";
import React, { useState } from "react";
import { useProperties } from "@/hooks/useProperties";

const TYPES = [
  { label: "All", value: "" },
  { label: "Residential", value: "residential" },
  { label: "Commercial", value: "commercial" },
  { label: "Luxury", value: "luxury" },
  { label: "Land", value: "land" },
  { label: "New Launch", value: "new_launch" },
];

function PropertyCard({ property }) {
  const firstImage =
    Array.isArray(property.media) && property.media.length > 0
      ? property.media[0].url
      : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80&auto=format&fit=crop";

  return (
    <Link
      href={`/property-detail?id=${property.id}`}
      className="text-center font-semibold md:text-md"
    >
      <div className="mb-3 aspect-[5/6] overflow-hidden md:mb-4">
        <img
          src={firstImage}
          alt={property.title}
          className="size-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="mb-2">
        <h3>{property.title}</h3>
        <div className="text-sm font-normal capitalize">
          {property.type} · {property.city || property.address}
        </div>
        {property.bedrooms && (
          <div className="text-sm font-normal text-gray-500">
            {property.bedrooms} bed{property.bedrooms !== 1 ? "s" : ""}
            {property.bathrooms ? ` · ${property.bathrooms} bath` : ""}
          </div>
        )}
      </div>
      <div className="text-md md:text-lg">
        ₦{Number(property.price).toLocaleString()}
      </div>
      <div className="mt-1">
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
            property.status === "available"
              ? "bg-green-100 text-green-700"
              : property.status === "reserved"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {property.status}
        </span>
      </div>
    </Link>
  );
}

export function PropertyGrid() {
  const [filters, setFilters] = useState({ page: 1, limit: 12 });
  const [activeType, setActiveType] = useState("");

  const { properties, pagination, isLoading, error } = useProperties(filters);

  const handleTypeFilter = (type) => {
    setActiveType(type);
    setFilters((prev) => ({ ...prev, type: type || undefined, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <h4 className="font-semibold">Available</h4>
            <h1 className="mt-3 text-5xl font-bold md:mt-4 md:text-7xl lg:text-8xl">
              Properties
            </h1>
            <p className="mt-5 text-base md:mt-6 md:text-md">
              Browse our current listings across the city
            </p>
          </div>

          {/* Type filter tabs */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => handleTypeFilter(t.value)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeType === t.value
                    ? "border-black bg-black text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:border-black"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-black border-t-transparent" />
          </div>
        )}

        {error && (
          <div className="rounded-md bg-red-50 px-6 py-4 text-center text-red-700">
            {error}
          </div>
        )}

        {!isLoading && !error && properties.length === 0 && (
          <div className="py-20 text-center text-gray-500">
            No properties found for the selected filters.
          </div>
        )}

        {!isLoading && properties.length > 0 && (
          <>
            <div className="grid grid-cols-1 justify-items-start gap-x-5 gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-3 lg:gap-x-12">
              {properties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="mt-14 flex items-center justify-center gap-2 md:mt-20 lg:mt-24">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                  className="rounded border px-3 py-1.5 text-sm disabled:opacity-40"
                >
                  ← Prev
                </button>
                <span className="text-sm text-gray-600">
                  Page {pagination.page} of {pagination.pages}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page >= pagination.pages}
                  className="rounded border px-3 py-1.5 text-sm disabled:opacity-40"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
