"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const STAGE_COLORS = {
  prospect:    "bg-blue-100 text-blue-700",
  negotiation: "bg-yellow-100 text-yellow-700",
  agreement:   "bg-purple-100 text-purple-700",
  payment:     "bg-orange-100 text-orange-700",
  completed:   "bg-green-100 text-green-700",
  cancelled:   "bg-red-100 text-red-700",
};

const STAGES = ["prospect","negotiation","agreement","payment","completed","cancelled"];

export default function AdminSalesPage() {
  const { authFetch } = useAuth();
  const [sales, setSales]         = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [filters, setFilters]     = useState({ page: 1, stage: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState("");

  const fetchSales = async () => {
    setIsLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (filters.stage) params.set("stage", filters.stage);
      params.set("page",  filters.page);
      params.set("limit", "20");

      const res  = await authFetch(`/api/sales?${params}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setSales(json.data.sales);
      setPagination(json.data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchSales(); }, [filters]);

  const updateStage = async (id, stage) => {
    try {
      const res = await authFetch(`/api/sales/${id}`, {
        method: "PUT",
        body: JSON.stringify({ stage }),
      });
      if (!res.ok) throw new Error("Update failed");
      setSales((prev) => prev.map((s) => (s.id === id ? { ...s, stage } : s)));
    } catch (err) {
      alert(err.message);
    }
  };

  const totalRevenue = sales
    .filter((s) => s.stage === "completed")
    .reduce((sum, s) => sum + Number(s.sale_price || 0), 0);

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Sales Pipeline</h1>
          <p className="text-sm text-gray-500">
            {pagination.total} deals · ₦{totalRevenue.toLocaleString()} closed revenue on page
          </p>
        </div>
        <Link
          href="/admin/sales/new"
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          + New Deal
        </Link>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {["", ...STAGES].map((s) => (
          <button
            key={s}
            onClick={() => setFilters((p) => ({ ...p, stage: s, page: 1 }))}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              filters.stage === s
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
                <th className="px-4 py-3 text-left font-medium text-gray-600">Property</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Client</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Agent</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Sale Price</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Commission</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Stage</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Expected Close</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sales.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">No sales found.</td>
                </tr>
              ) : (
                sales.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{s.property_title || "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{s.client_name || "—"}</td>
                    <td className="px-4 py-3 text-gray-500">{s.agent_name || "—"}</td>
                    <td className="px-4 py-3">
                      {s.sale_price ? `₦${Number(s.sale_price).toLocaleString()}` : "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {s.commission_amt ? `₦${Number(s.commission_amt).toLocaleString()}` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={s.stage}
                        onChange={(e) => updateStage(s.id, e.target.value)}
                        className={`rounded-full border-0 px-2 py-0.5 text-xs font-medium ${STAGE_COLORS[s.stage] || "bg-gray-100"}`}
                      >
                        {STAGES.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">
                      {s.expected_close ? new Date(s.expected_close).toLocaleDateString() : "—"}
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
