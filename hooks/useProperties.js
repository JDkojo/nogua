"use client";

/**
 * useProperties — fetch and manage property listings.
 *
 * @param {object} filters  - { type, status, city, minPrice, maxPrice, bedrooms, page, limit }
 */

import { useState, useEffect, useCallback } from "react";

export function useProperties(filters = {}) {
  const [properties, setProperties] = useState([]);
  const [pagination, setPagination]  = useState({ page: 1, limit: 12, total: 0, pages: 1 });
  const [isLoading, setIsLoading]    = useState(false);
  const [error, setError]            = useState(null);

  const buildQuery = (f) => {
    const params = new URLSearchParams();
    if (f.type)     params.set("type",     f.type);
    if (f.status)   params.set("status",   f.status);
    if (f.city)     params.set("city",     f.city);
    if (f.minPrice) params.set("minPrice", f.minPrice);
    if (f.maxPrice) params.set("maxPrice", f.maxPrice);
    if (f.bedrooms) params.set("bedrooms", f.bedrooms);
    if (f.page)     params.set("page",     f.page);
    if (f.limit)    params.set("limit",    f.limit);
    return params.toString();
  };

  const fetchProperties = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const qs = buildQuery(filters);
      const res = await fetch(`/api/properties?${qs}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load properties");
      setProperties(json.data.properties);
      setPagination(json.data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return { properties, pagination, isLoading, error, refetch: fetchProperties };
}

/**
 * useProperty — fetch a single property by ID.
 */
export function useProperty(id) {
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState(null);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    fetch(`/api/properties/${id}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setProperty(json.data);
        else setError(json.error);
      })
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  return { property, isLoading, error };
}
