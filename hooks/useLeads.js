"use client";

/**
 * useLeads — fetch and manage CRM leads (requires auth).
 */

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";

export function useLeads(filters = {}) {
  const { authFetch } = useAuth();
  const [leads, setLeads]         = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, pages: 1 });
  const [isLoading, setIsLoading]   = useState(false);
  const [error, setError]           = useState(null);

  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.status)     params.set("status",     filters.status);
      if (filters.assignedTo) params.set("assignedTo", filters.assignedTo);
      if (filters.page)       params.set("page",       filters.page);
      if (filters.limit)      params.set("limit",      filters.limit);

      const res  = await authFetch(`/api/leads?${params}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load leads");
      setLeads(json.data.leads);
      setPagination(json.data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [authFetch, JSON.stringify(filters)]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const updateLead = useCallback(async (id, updates) => {
    const res  = await authFetch(`/api/leads/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Failed to update lead");
    setLeads((prev) => prev.map((l) => (l.id === id ? json.data : l)));
    return json.data;
  }, [authFetch]);

  return { leads, pagination, isLoading, error, refetch: fetchLeads, updateLead };
}
