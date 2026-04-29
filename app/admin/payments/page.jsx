"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const STATUS_COLORS = {
  pending:   "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  failed:    "bg-red-100 text-red-700",
  refunded:  "bg-gray-100 text-gray-600",
};

export default function AdminPaymentsPage() {
  const { authFetch } = useAuth();
  const [payments, setPayments]   = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [filters, setFilters]     = useState({ page: 1, status: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState("");

  const fetchPayments = async () => {
    setIsLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (filters.status) params.set("status", filters.status);
      params.set("page",  filters.page);
      params.set("limit", "20");

      const res  = await authFetch(`/api/payments?${params}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setPayments(json.data.payments);
      setPagination(json.data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchPayments(); }, [filters]);

  const confirmPayment = async (id) => {
    try {
      const res = await authFetch(`/api/payments/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status: "confirmed", paymentDate: new Date().toISOString().slice(0, 10) }),
      });
      if (!res.ok) throw new Error("Update failed");
      setPayments((prev) => prev.map((p) => (p.id === id ? { ...p, status: "confirmed" } : p)));
    } catch (err) {
      alert(err.message);
    }
  };

  const totalConfirmed = payments
    .filter((p) => p.status === "confirmed")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Payments</h1>
          <p className="text-sm text-gray-500">
            {pagination.total} total · ₦{totalConfirmed.toLocaleString()} confirmed on this page
          </p>
        </div>
        <Link
          href="/admin/payments/new"
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          + Record Payment
        </Link>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {["", "pending", "confirmed", "failed", "refunded"].map((s) => (
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
                <th className="px-4 py-3 text-left font-medium text-gray-600">Reference</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Payer</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Property</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Amount</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Type</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Date</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">No payments found.</td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs">{p.reference}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{p.payer_name}</div>
                      <div className="text-xs text-gray-400">{p.payer_email}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{p.property_title || "—"}</td>
                    <td className="px-4 py-3 font-medium">₦{Number(p.amount).toLocaleString()}</td>
                    <td className="px-4 py-3 capitalize text-gray-500">{p.payment_type}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[p.status] || "bg-gray-100"}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">
                      {p.payment_date ? new Date(p.payment_date).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {p.status === "pending" && (
                        <button
                          onClick={() => confirmPayment(p.id)}
                          className="text-green-600 hover:underline"
                        >
                          Confirm
                        </button>
                      )}
                    </td>
                  </tr>
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
