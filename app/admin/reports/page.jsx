"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

function MetricCard({ label, value, sub }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-3xl font-bold">{value ?? "—"}</p>
      {sub && <p className="mt-1 text-xs text-gray-400">{sub}</p>}
    </div>
  );
}

export default function AdminReportsPage() {
  const { authFetch } = useAuth();
  const [overview, setOverview] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [paymentsData, setPaymentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10),
    to:   new Date().toISOString().slice(0, 10),
  });

  const fetchAll = async () => {
    setIsLoading(true);
    try {
      const qs = `from=${dateRange.from}&to=${dateRange.to}`;
      const [ovRes, salesRes, payRes] = await Promise.all([
        authFetch(`/api/reports?type=overview&${qs}`),
        authFetch(`/api/reports?type=sales&${qs}`),
        authFetch(`/api/reports?type=payments&${qs}`),
      ]);
      const [ov, sales, pay] = await Promise.all([ovRes.json(), salesRes.json(), payRes.json()]);
      if (ov.success)    setOverview(ov.data);
      if (sales.success) setSalesData(sales.data.data);
      if (pay.success)   setPaymentsData(pay.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, [dateRange]);

  const fmt = (n) => (n !== undefined && n !== null ? Number(n).toLocaleString() : "—");

  return (
    <div className="p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <div className="flex items-center gap-3">
          <div>
            <label className="mr-1 text-xs text-gray-500">From</label>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange((p) => ({ ...p, from: e.target.value }))}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
            />
          </div>
          <div>
            <label className="mr-1 text-xs text-gray-500">To</label>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange((p) => ({ ...p, to: e.target.value }))}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent" />
        </div>
      ) : (
        <>
          {/* Overview KPIs */}
          <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <MetricCard
              label="Total Properties"
              value={fmt(overview?.properties?.total)}
              sub={`${fmt(overview?.properties?.available)} available`}
            />
            <MetricCard
              label="Leads"
              value={fmt(overview?.leads?.total)}
              sub={`${fmt(overview?.leads?.converted)} converted`}
            />
            <MetricCard
              label="Revenue"
              value={`₦${fmt(overview?.sales?.revenue)}`}
              sub={`${fmt(overview?.sales?.completed)} deals closed`}
            />
            <MetricCard
              label="Payments Confirmed"
              value={`₦${fmt(overview?.payments?.confirmed_total)}`}
              sub={`${fmt(overview?.payments?.pending_count)} pending`}
            />
          </div>

          {/* Sales breakdown table */}
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold">Sales by Week</h2>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Week</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Stage</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Count</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {salesData.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gray-400">No data for this period.</td>
                    </tr>
                  ) : (
                    salesData.map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-4 py-3">{new Date(row.week).toLocaleDateString()}</td>
                        <td className="px-4 py-3 capitalize">{row.stage}</td>
                        <td className="px-4 py-3">{row.count}</td>
                        <td className="px-4 py-3">₦{Number(row.revenue).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payments breakdown */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Payments by Month</h2>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Month</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Confirmed</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Pending</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Count</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paymentsData.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gray-400">No data for this period.</td>
                    </tr>
                  ) : (
                    paymentsData.map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-4 py-3">{new Date(row.month).toLocaleDateString("en", { month: "long", year: "numeric" })}</td>
                        <td className="px-4 py-3 text-green-700">₦{Number(row.confirmed).toLocaleString()}</td>
                        <td className="px-4 py-3 text-yellow-700">₦{Number(row.pending).toLocaleString()}</td>
                        <td className="px-4 py-3">{row.count}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
