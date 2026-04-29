"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const STATUS_COLORS = {
  valid:    "bg-green-100 text-green-700",
  disputed: "bg-red-100 text-red-700",
  pending:  "bg-yellow-100 text-yellow-700",
  invalid:  "bg-gray-100 text-gray-600",
};

export default function AdminLandPage() {
  const { authFetch } = useAuth();
  const [records, setRecords]     = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [filters, setFilters]     = useState({ page: 1, legalStatus: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState("");
  const [showForm, setShowForm]   = useState(false);
  const [newRecord, setNewRecord] = useState({
    ownerName: "", titleNumber: "", titleType: "", acquisitionDate: "", legalStatus: "valid",
  });
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const fetchRecords = async () => {
    setIsLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (filters.legalStatus) params.set("legalStatus", filters.legalStatus);
      params.set("page",  filters.page);
      params.set("limit", "20");

      const res  = await authFetch(`/api/land?${params}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setRecords(json.data.records);
      setPagination(json.data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchRecords(); }, [filters]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormLoading(true);
    try {
      const res = await authFetch("/api/land", {
        method: "POST",
        body: JSON.stringify(newRecord),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setShowForm(false);
      setNewRecord({ ownerName: "", titleNumber: "", titleType: "", acquisitionDate: "", legalStatus: "valid" });
      fetchRecords();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Land Records</h1>
          <p className="text-sm text-gray-500">{pagination.total} records</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          + Add Record
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
            <h2 className="mb-6 text-xl font-bold">Add Land Record</h2>
            {formError && (
              <div className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{formError}</div>
            )}
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Owner Name *</label>
                <input value={newRecord.ownerName} onChange={(e) => setNewRecord((p) => ({ ...p, ownerName: e.target.value }))}
                  required className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Title Number</label>
                <input value={newRecord.titleNumber} onChange={(e) => setNewRecord((p) => ({ ...p, titleNumber: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Title Type</label>
                <input value={newRecord.titleType} placeholder="e.g. C of O, Deed of Assignment"
                  onChange={(e) => setNewRecord((p) => ({ ...p, titleType: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Acquisition Date</label>
                <input type="date" value={newRecord.acquisitionDate}
                  onChange={(e) => setNewRecord((p) => ({ ...p, acquisitionDate: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Legal Status</label>
                <select value={newRecord.legalStatus} onChange={(e) => setNewRecord((p) => ({ ...p, legalStatus: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
                  <option value="valid">Valid</option>
                  <option value="disputed">Disputed</option>
                  <option value="pending">Pending</option>
                  <option value="invalid">Invalid</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={formLoading}
                  className="rounded-lg bg-black px-5 py-2 text-sm font-medium text-white disabled:opacity-50">
                  {formLoading ? "Saving…" : "Save Record"}
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        {["", "valid", "disputed", "pending", "invalid"].map((s) => (
          <button key={s}
            onClick={() => setFilters((p) => ({ ...p, legalStatus: s, page: 1 }))}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              filters.legalStatus === s ? "border-black bg-black text-white" : "border-gray-300 text-gray-600 hover:border-black"
            }`}>
            {s || "All"}
          </button>
        ))}
      </div>

      {error && <div className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent" />
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Owner</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Title Number</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Title Type</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Property</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Acquired</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {records.length === 0 ? (
                <tr><td colSpan={6} className="py-12 text-center text-gray-400">No land records found.</td></tr>
              ) : (
                records.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{r.owner_name}</td>
                    <td className="px-4 py-3 font-mono text-xs">{r.title_number || "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{r.title_type || "—"}</td>
                    <td className="px-4 py-3 text-gray-500">{r.property_title || "—"}</td>
                    <td className="px-4 py-3 text-xs text-gray-400">
                      {r.acquisition_date ? new Date(r.acquisition_date).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[r.legal_status] || "bg-gray-100"}`}>
                        {r.legal_status}
                      </span>
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
