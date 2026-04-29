"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { sidebarExpand, sidebarLabel, iconHover } from "@/lib/motion";
import { ToastProvider } from "@/components/ui/Toast";
import {
  RxDashboard, RxFile, RxBarChart, RxGear, RxExit, RxChevronLeft, RxChevronRight,
} from "react-icons/rx";
import {
  BiBuilding, BiMoney, BiCalendar, BiGroup, BiShield, BiMap,
} from "react-icons/bi";
import { MdOutlinePeople } from "react-icons/md";

const NAV = [
  { href: "/admin",            label: "Dashboard",    icon: RxDashboard,      section: null },
  { href: "/admin/properties", label: "Properties",   icon: BiBuilding,       section: "Operations" },
  { href: "/admin/leads",      label: "Leads (CRM)",  icon: MdOutlinePeople,  section: "Operations" },
  { href: "/admin/sales",      label: "Sales",        icon: BiBuilding,       section: "Operations" },
  { href: "/admin/payments",   label: "Payments",     icon: BiMoney,          section: "Finance" },
  { href: "/admin/visits",     label: "Site Visits",  icon: BiCalendar,       section: "Finance" },
  { href: "/admin/staff",      label: "Staff",        icon: BiGroup,          section: "People" },
  { href: "/admin/land",       label: "Land Records", icon: BiMap,            section: "Records" },
  { href: "/admin/documents",  label: "Documents",    icon: RxFile,           section: "Records" },
  { href: "/admin/reports",    label: "Reports",      icon: RxBarChart,       section: "Insights" },
  { href: "/admin/audit-logs", label: "Audit Logs",   icon: BiShield,         section: "Insights" },
  { href: "/admin/settings",   label: "Settings",     icon: RxGear,           section: "System" },
];

export default function AdminLayout({ children }) {
  const { user, isLoading, logout } = useAuth();
  const router   = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) router.replace("/admin/login");
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface-dark">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-action border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  const isActive = (href) =>
    href === "/admin" ? pathname === href : pathname.startsWith(href);

  // Group nav items by section
  const sections = ["Operations", "Finance", "People", "Records", "Insights", "System"];

  return (
    <ToastProvider>
      <div className="flex h-screen overflow-hidden bg-surface-dark">

        {/* ── SIDEBAR ─────────────────────────────────────────── */}
        <motion.aside
          variants={sidebarExpand}
          animate={collapsed ? "collapsed" : "expanded"}
          initial={false}
          className="flex flex-col border-r border-surface-border-dark bg-surface-dark z-sidebar flex-none re-scrollbar overflow-y-auto"
        >
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-surface-border-dark flex-none">
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <Link href="/" className="text-base font-bold text-ink-inverse">RE Portal</Link>
                  <span className="rounded bg-brand px-1.5 py-0.5 text-[10px] font-bold text-white">Admin</span>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => setCollapsed((p) => !p)}
              className="p-1.5 rounded-card text-ink-subtle hover:bg-white/8 hover:text-ink-inverse transition-colors duration-fast flex-none"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <RxChevronRight className="size-4" /> : <RxChevronLeft className="size-4" />}
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 py-4 space-y-0.5">
            {/* Dashboard (no section) */}
            {NAV.filter((n) => !n.section).map((item) => (
              <NavItem key={item.href} item={item} active={isActive(item.href)} collapsed={collapsed} />
            ))}

            {/* Sectioned items */}
            {sections.map((section) => {
              const items = NAV.filter((n) => n.section === section);
              if (!items.length) return null;
              return (
                <div key={section} className="pt-4">
                  {!collapsed && (
                    <p className="px-6 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-ink-subtle">
                      {section}
                    </p>
                  )}
                  {items.map((item) => (
                    <NavItem key={item.href} item={item} active={isActive(item.href)} collapsed={collapsed} />
                  ))}
                </div>
              );
            })}
          </nav>

          {/* User footer */}
          <div className="border-t border-surface-border-dark p-3 flex-none">
            <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
              <div className="flex size-8 flex-none items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                {user.first_name?.[0]}{user.last_name?.[0]}
              </div>
              {!collapsed && (
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink-inverse">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="truncate text-xs capitalize text-ink-subtle">{user.role}</p>
                </div>
              )}
              {!collapsed && (
                <button
                  onClick={logout}
                  className="p-1.5 rounded-card text-ink-subtle hover:bg-white/8 hover:text-error transition-colors duration-fast flex-none"
                  aria-label="Sign out"
                >
                  <RxExit className="size-4" />
                </button>
              )}
            </div>
          </div>
        </motion.aside>

        {/* ── MAIN CONTENT ────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto bg-surface re-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="min-h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </ToastProvider>
  );
}

function NavItem({ item, active, collapsed }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={`
        relative flex items-center gap-3 mx-2 px-3 py-2.5 rounded-card
        text-sm font-medium
        transition-all duration-fast ease-[cubic-bezier(0.4,0,0.2,1)]
        group
        ${active
          ? "bg-brand text-white shadow-card-md"
          : "text-ink-subtle hover:bg-white/8 hover:text-ink-inverse"
        }
        ${collapsed ? "justify-center" : ""}
      `}
      title={collapsed ? item.label : undefined}
    >
      {/* Active indicator bar */}
      {active && !collapsed && (
        <motion.span
          layoutId="sidebar-indicator"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-brand-action rounded-full"
        />
      )}

      <motion.span
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.15 }}
        className="flex-none"
      >
        <Icon className="size-4" />
      </motion.span>

      {!collapsed && (
        <span className="truncate">{item.label}</span>
      )}
    </Link>
  );
}
