"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const STATUS_COLORS = {
  new:       "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  qualified: "bg-purple-100 text-purple-700",
  converted: "bg-green-100 text-green-700",
  lost:      "bg-red-100 text-red-700",
};

export default function AdminLeadsPage() {
  const { authFetch } = useAuth();
  const [leads, setLeads]         = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [filters, setFilters]     = useState({ page: 1, status: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState("");

  const fetchLeads = async () => {
    setIsLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (filters.status) params.set("status", filters.status);
      params.set("page",  filters.page);
      params.set("limit", "20");

      const res  = await authFetch(`/api/leads?${params}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setLeads(json.data.leads);
      setPagination(json.data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchLeads(); }, [filters]);

  const updateStatus = async (id, status) => {
    try {
      const res = await authFetch(`/api/leads/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Update failed");
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Leads (CRM)</h1>
          <p className="text-sm text-gray-500">{pagination.total} total leads</p>
        </div>
      </div>

      {/* Status filter */}
      <div className="mb-4 flex flex-wrap gap-2">
        {["", "new", "contacted", "qualified", "converted", "lost"].map((s) => (
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
                <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Contact</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Interest</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Source</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Assigned</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Date</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">No leads found.</td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">
                      {lead.first_name} {lead.last_name}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs text-gray-500">{lead.email}</div>
                      <div className="text-xs text-gray-500">{lead.phone}</div>
                    </td>
                    <td className="px-4 py-3 capitalize text-gray-600">{lead.interest || "—"}</td>
                    <td className="px-4 py-3 text-gray-500">{lead.source}</td>
                    <td className="px-4 py-3">
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                        className={`rounded-full border-0 px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[lead.status] || "bg-gray-100"}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="converted">Converted</option>
                        <option value="lost">Lost</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{lead.assigned_to_name || "—"}</td>
                    <td className="px-4 py-3 text-xs text-gray-400">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/leads/${lead.id}`} className="text-blue-600 hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {pagination.pages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
              <span className="text-sm text-gray-500">
                Page {pagination.page} of {pagination.pages}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilters((p) => ({ ...p, page: p.page - 1 }))}
                  disabled={pagination.page <= 1}
                  className="rounded border px-3 py-1 text-sm disabled:opacity-40"
                >Prev</button>
                <button
                  onClick={() => setFilters((p) => ({ ...p, page: p.page + 1 }))}
                  disabled={pagination.page >= pagination.pages}
                  className="rounded border px-3 py-1 text-sm disabled:opacity-40"
                >Next</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
