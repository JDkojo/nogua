"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const STATUS_COLORS = {
  scheduled:  "bg-blue-100 text-blue-700",
  confirmed:  "bg-purple-100 text-purple-700",
  completed:  "bg-green-100 text-green-700",
  cancelled:  "bg-red-100 text-red-700",
  no_show:    "bg-gray-100 text-gray-600",
};

export default function AdminVisitsPage() {
  const { authFetch } = useAuth();
  const [visits, setVisits]       = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [filters, setFilters]     = useState({ page: 1, status: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState("");

  const fetchVisits = async () => {
    setIsLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (filters.status) params.set("status", filters.status);
      params.set("page",  filters.page);
      params.set("limit", "20");

      const res  = await authFetch(`/api/visits?${params}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setVisits(json.data.visits);
      setPagination(json.data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchVisits(); }, [filters]);

  const updateStatus = async (id, status) => {
    try {
      const res = await authFetch(`/api/visits/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Update failed");
      setVisits((prev) => prev.map((v) => (v.id === id ? { ...v, status } : v)));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Site Visits</h1>
        <p className="text-sm text-gray-500">{pagination.total} total visits</p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {["", "scheduled", "confirmed", "completed", "cancelled", "no_show"].map((s) => (
          <button
            key={s}
            onClick={() => setFilters((p) => ({ ...p, status: s, page: 1 }))}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              filters.status === s
                ? "border-black bg-black text-white"
                : "border-gray-300 text-gray-600 hover:border-black"
            }`}
          >
            {s || "All"}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent" />
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Client</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Property</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Date & Time</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Agent</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {visits.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">No visits found.</td>
                </tr>
              ) : (
                visits.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium">{v.client_name}</div>
                      <div className="text-xs text-gray-400">{v.client_email || v.client_phone}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{v.property_title || "—"}</td>
                    <td className="px-4 py-3">
                      <div>{new Date(v.visit_date).toLocaleDateString()}</div>
                      {v.visit_time && <div className="text-xs text-gray-400">{v.visit_time}</div>}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{v.agent_name || "—"}</td>
                    <td className="px-4 py-3">
                      <select
                        value={v.status}
                        onChange={(e) => updateStatus(v.id, e.target.value)}
                        className={`rounded-full border-0 px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[v.status] || "bg-gray-100"}`}
                      >
                        <option value="scheduled">Scheduled</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="no_show">No Show</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">
                      {new Date(v.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
