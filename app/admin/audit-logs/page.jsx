"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const ACTION_COLORS = {
  create: "bg-green-100 text-green-700",
  update: "bg-blue-100 text-blue-700",
  delete: "bg-red-100 text-red-700",
  login:  "bg-purple-100 text-purple-700",
  logout: "bg-gray-100 text-gray-600",
};

export default function AdminAuditLogsPage() {
  const { authFetch } = useAuth();
  const [logs, setLogs]           = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [filters, setFilters]     = useState({ page: 1, module: "", action: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState("");
  const [expanded, setExpanded]   = useState(null);

  const fetchLogs = async () => {
    setIsLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (filters.module) params.set("module", filters.module);
      if (filters.action) params.set("action", filters.action);
      params.set("page",  filters.page);
      params.set("limit", "50");

      const res  = await authFetch(`/api/audit-logs?${params}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setLogs(json.data.logs);
      setPagination(json.data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchLogs(); }, [filters]);

  const MODULES = ["", "properties", "leads", "sales", "payments", "visits", "staff", "documents", "land", "settings", "auth"];
  const ACTIONS = ["", "create", "update", "delete", "login", "logout"];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Audit Logs</h1>
        <p className="text-sm text-gray-500">{pagination.total} total entries</p>
      </div>

      <div className="mb-4 flex flex-wrap gap-3">
        <select
          value={filters.module}
          onChange={(e) => setFilters((p) => ({ ...p, module: e.target.value, page: 1 }))}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
        >
          {MODULES.map((m) => <option key={m} value={m}>{m || "All Modules"}</option>)}
        </select>
        <select
          value={filters.action}
          onChange={(e) => setFilters((p) => ({ ...p, action: e.target.value, page: 1 }))}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
        >
          {ACTIONS.map((a) => <option key={a} value={a}>{a || "All Actions"}</option>)}
        </select>
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
                <th className="px-4 py-3 text-left font-medium text-gray-600">Timestamp</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">User</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Action</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Module</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Record ID</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">IP</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">No audit logs found.</td>
                </tr>
              ) : (
                logs.map((log) => (
                  <React.Fragment key={log.id}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-xs text-gray-400">
                        {new Date(log.created_at).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium">{log.user_name || "System"}</div>
                        <div className="text-xs text-gray-400">{log.user_email}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${ACTION_COLORS[log.action] || "bg-gray-100"}`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="px-4 py-3 capitalize text-gray-600">{log.module}</td>
                      <td className="px-4 py-3 text-gray-500">{log.record_id || "—"}</td>
                      <td className="px-4 py-3 text-xs text-gray-400">{log.ip_address || "—"}</td>
                      <td className="px-4 py-3">
                        {(log.before_value || log.after_value) && (
                          <button
                            onClick={() => setExpanded(expanded === log.id ? null : log.id)}
                            className="text-blue-600 hover:underline"
                          >
                            {expanded === log.id ? "Hide" : "View"}
                          </button>
                        )}
                      </td>
                    </tr>
                    {expanded === log.id && (
                      <tr>
                        <td colSpan={7} className="bg-gray-50 px-4 py-3">
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            {log.before_value && (
                              <div>
                                <p className="mb-1 font-medium text-gray-600">Before</p>
                                <pre className="overflow-auto rounded bg-white p-2 text-gray-700">
                                  {JSON.stringify(log.before_value, null, 2)}
                                </pre>
                              </div>
                            )}
                            {log.after_value && (
                              <div>
                                <p className="mb-1 font-medium text-gray-600">After</p>
                                <pre className="overflow-auto rounded bg-white p-2 text-gray-700">
                                  {JSON.stringify(log.after_value, null, 2)}
                                </pre>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>

          {pagination.pages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
              <span className="text-sm text-gray-500">Page {pagination.page} of {pagination.pages}</span>
              <div className="flex gap-2">
                <button onClick={() => setFilters((p) => ({ ...p, page: p.page - 1 }))}
                  disabled={pagination.page <= 1} className="rounded border px-3 py-1 text-sm disabled:opacity-40">Prev</button>
                <button onClick={() => setFilters((p) => ({ ...p, page: p.page + 1 }))}
                  disabled={pagination.page >= pagination.pages} className="rounded border px-3 py-1 text-sm disabled:opacity-40">Next</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
