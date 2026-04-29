"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { kpiContainer, kpiCard, staggerContainer, staggerItem, chartEntry } from "@/lib/motion";
import { KpiCounter } from "@/components/ui/KpiCounter";
import { Badge } from "@/components/ui/Badge";
import { Skeleton, SkeletonKpi } from "@/components/ui/Skeleton";
import { BiBuilding, BiMoney, BiCalendar, BiTrendingUp } from "react-icons/bi";
import { MdOutlinePeople } from "react-icons/md";

function AlertBanner({ count, label, href, type = "warning" }) {
  if (!count || Number(count) === 0) return null;
  const styles = {
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    error:   "bg-red-50   border-red-200   text-red-800",
    info:    "bg-blue-50  border-blue-200  text-blue-800",
  };
  return (
    <Link
      href={href}
      className={`flex items-center justify-between rounded-card border px-4 py-3 text-sm transition-all duration-fast hover:shadow-card-md ${styles[type]}`}
    >
      <span className="font-medium">{label}</span>
      <span className="rounded-pill bg-current/20 px-2.5 py-0.5 text-xs font-bold">
        {count}
      </span>
    </Link>
  );
}

function QuickAction({ label, href, icon: Icon }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-card border border-surface-border bg-white px-4 py-3 text-sm font-medium text-ink
                 transition-all duration-fast ease-[cubic-bezier(0.4,0,0.2,1)]
                 hover:border-brand hover:text-brand hover:shadow-card-md hover:-translate-y-px"
    >
      {Icon && <Icon className="size-4 text-brand flex-none" />}
      <span>+ {label}</span>
    </Link>
  );
}

export default function AdminDashboard() {
  const { authFetch, user } = useAuth();
  const [overview, setOverview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authFetch("/api/reports?type=overview")
      .then((r) => r.json())
      .then((json) => { if (json.success) setOverview(json.data); })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [authFetch]);

  const fmt = (n) => (n !== undefined && n !== null ? Number(n) : 0);

  return (
    <div className="p-8 max-w-7xl mx-auto">

      {/* ── HEADER ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-ink">
          Welcome back, {user?.first_name} 👋
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          Here's what's happening in your portfolio today.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {[1,2,3].map((i) => <Skeleton key={i} className="h-14 rounded-card" />)}
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1,2,3,4].map((i) => <SkeletonKpi key={i} />)}
          </div>
        </div>
      ) : (
        <>
          {/* ── ALERTS ────────────────────────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-3"
          >
            <motion.div variants={staggerItem}>
              <AlertBanner
                count={overview?.leads?.new_leads}
                label="New leads awaiting action"
                href="/admin/leads?status=new"
                type="info"
              />
            </motion.div>
            <motion.div variants={staggerItem}>
              <AlertBanner
                count={overview?.payments?.pending_count}
                label="Payments pending confirmation"
                href="/admin/payments?status=pending"
                type="warning"
              />
            </motion.div>
            <motion.div variants={staggerItem}>
              <AlertBanner
                count={overview?.visits?.scheduled}
                label="Upcoming site visits"
                href="/admin/visits?status=scheduled"
                type="info"
              />
            </motion.div>
          </motion.div>

          {/* ── KPI CARDS ─────────────────────────────────────── */}
          <motion.div
            variants={kpiContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-5"
          >
            {[
              {
                label: "Total Properties",
                value: fmt(overview?.properties?.total),
                sub: `${fmt(overview?.properties?.available)} available`,
                icon: <BiBuilding className="size-5" />,
                href: "/admin/properties",
                color: "bg-blue-600",
              },
              {
                label: "Leads (30 days)",
                value: fmt(overview?.leads?.total),
                sub: `${fmt(overview?.leads?.converted)} converted`,
                icon: <MdOutlinePeople className="size-5" />,
                href: "/admin/leads",
                color: "bg-purple-600",
              },
              {
                label: "Revenue (30 days)",
                value: fmt(overview?.sales?.revenue),
                sub: `${fmt(overview?.sales?.completed)} deals closed`,
                icon: <BiTrendingUp className="size-5" />,
                href: "/admin/sales",
                color: "bg-success",
                isCurrency: true,
              },
              {
                label: "Payments Confirmed",
                value: fmt(overview?.payments?.confirmed_total),
                sub: `${fmt(overview?.payments?.total)} total transactions`,
                icon: <BiMoney className="size-5" />,
                href: "/admin/payments",
                color: "bg-warning",
                isCurrency: true,
              },
            ].map((kpi) => (
              <motion.div key={kpi.label} variants={kpiCard}>
                <Link href={kpi.href} className="block">
                  <div className="kpi-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-slow cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="kpi-label">{kpi.label}</p>
                        <p className="kpi-value mt-1">
                          {kpi.isCurrency && "₦"}
                          <KpiCounter value={kpi.value} />
                        </p>
                        {kpi.sub && <p className="text-xs text-ink-subtle mt-1">{kpi.sub}</p>}
                      </div>
                      <div className={`flex-none ml-3 p-2.5 rounded-card ${kpi.color} text-white`}>
                        {kpi.icon}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* ── SECONDARY STATS ───────────────────────────────── */}
          <motion.div
            variants={kpiContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8"
          >
            {[
              { label: "Properties Sold",    value: fmt(overview?.properties?.sold),      href: "/admin/properties?status=sold",     color: "bg-slate-600" },
              { label: "Site Visits (30d)",  value: fmt(overview?.visits?.total),         href: "/admin/visits",                     color: "bg-teal-600"  },
              { label: "Active Sales",       value: fmt(overview?.sales?.total),          href: "/admin/sales",                      color: "bg-red-500"   },
            ].map((s) => (
              <motion.div key={s.label} variants={kpiCard}>
                <Link href={s.href} className="block">
                  <div className="kpi-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-slow cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="kpi-label">{s.label}</p>
                        <p className="kpi-value mt-1">
                          <KpiCounter value={s.value} />
                        </p>
                      </div>
                      <div className={`size-10 rounded-card ${s.color} flex items-center justify-center`}>
                        <BiBuilding className="size-5 text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* ── QUICK ACTIONS ─────────────────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <h2 className="mb-4 text-base font-semibold text-ink">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Add Property",   href: "/admin/properties/new", icon: BiBuilding },
                { label: "Add Lead",       href: "/admin/leads/new",      icon: MdOutlinePeople },
                { label: "Record Payment", href: "/admin/payments/new",   icon: BiMoney },
                { label: "Book Visit",     href: "/admin/visits/new",     icon: BiCalendar },
              ].map((action) => (
                <motion.div key={action.href} variants={staggerItem}>
                  <QuickAction {...action} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
