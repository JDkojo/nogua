"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const ROLE_COLORS = {
  super_admin: "bg-red-100 text-red-700",
  admin:       "bg-purple-100 text-purple-700",
  manager:     "bg-blue-100 text-blue-700",
  agent:       "bg-green-100 text-green-700",
  viewer:      "bg-gray-100 text-gray-600",
};

export default function AdminStaffPage() {
  const { authFetch } = useAuth();
  const [staff, setStaff]         = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [filters, setFilters]     = useState({ page: 1, role: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState("");
  const [showForm, setShowForm]   = useState(false);
  const [newUser, setNewUser]     = useState({ firstName: "", lastName: "", email: "", password: "", phone: "", role: "agent" });
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const fetchStaff = async () => {
    setIsLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (filters.role) params.set("role", filters.role);
      params.set("page",  filters.page);
      params.set("limit", "20");

      const res  = await authFetch(`/api/staff?${params}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setStaff(json.data.staff);
      setPagination(json.data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchStaff(); }, [filters]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormLoading(true);
    try {
      const res = await authFetch("/api/staff", {
        method: "POST",
        body: JSON.stringify(newUser),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setShowForm(false);
      setNewUser({ firstName: "", lastName: "", email: "", password: "", phone: "", role: "agent" });
      fetchStaff();
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
          <h1 className="text-2xl font-bold">Staff & Agents</h1>
          <p className="text-sm text-gray-500">{pagination.total} team members</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          + Add Staff
        </button>
      </div>

      {/* Add staff modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
            <h2 className="mb-6 text-xl font-bold">Add Staff Member</h2>
            {formError && (
              <div className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{formError}</div>
            )}
            <form onSubmit={handleAddUser} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">First name</label>
                  <input value={newUser.firstName} onChange={(e) => setNewUser((p) => ({ ...p, firstName: e.target.value }))}
                    required className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Last name</label>
                  <input value={newUser.lastName} onChange={(e) => setNewUser((p) => ({ ...p, lastName: e.target.value }))}
                    required className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input type="email" value={newUser.email} onChange={(e) => setNewUser((p) => ({ ...p, email: e.target.value }))}
                  required className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Password</label>
                <input type="password" value={newUser.password} onChange={(e) => setNewUser((p) => ({ ...p, password: e.target.value }))}
                  required className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Phone</label>
                <input value={newUser.phone} onChange={(e) => setNewUser((p) => ({ ...p, phone: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Role</label>
                <select value={newUser.role} onChange={(e) => setNewUser((p) => ({ ...p, role: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
                  <option value="agent">Agent</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={formLoading}
                  className="rounded-lg bg-black px-5 py-2 text-sm font-medium text-white disabled:opacity-50">
                  {formLoading ? "Adding…" : "Add Member"}
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
        {["", "super_admin", "admin", "manager", "agent", "viewer"].map((r) => (
          <button
            key={r}
            onClick={() => setFilters((p) => ({ ...p, role: r, page: 1 }))}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              filters.role === r
                ? "border-black bg-black text-white"
                : "border-gray-300 text-gray-600 hover:border-black"
            }`}
          >
            {r || "All"}
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
                <th className="px-4 py-3 text-left font-medium text-gray-600">Email</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Role</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Leads</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Sales</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Last Login</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {staff.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">No staff found.</td>
                </tr>
              ) : (
                staff.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">
                      {u.first_name} {u.last_name}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{u.email}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${ROLE_COLORS[u.role] || "bg-gray-100"}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{u.leads_count}</td>
                    <td className="px-4 py-3 text-gray-500">{u.sales_count}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${u.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {u.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">
                      {u.last_login_at ? new Date(u.last_login_at).toLocaleDateString() : "Never"}
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
