"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  companyMetrics,
  revenueByMonth,
  companyUpdates,
} from "@/lib/mock-financials";
import {
  DollarSign,
  Users,
  Rocket,
  TrendingUp,
  FileText,
  BarChart3,
  Bell,
} from "lucide-react";

const metrics = [
  { label: "Total Raised", value: companyMetrics.totalRaised, icon: DollarSign },
  { label: "Valuation", value: companyMetrics.valuation, icon: TrendingUp },
  { label: "Investors", value: companyMetrics.totalInvestors, icon: Users },
  { label: "Reservations", value: companyMetrics.reservations, icon: Rocket },
  { label: "YTD Revenue", value: companyMetrics.revenue.ytd, icon: BarChart3 },
  { label: "QoQ Growth", value: companyMetrics.revenue.growth, icon: TrendingUp },
];

const navItems = [
  { href: "/investor/dashboard", label: "Overview", icon: BarChart3 },
  { href: "/investor/dashboard/documents", label: "Documents", icon: FileText },
  { href: "/investor/dashboard/financials", label: "Financials", icon: DollarSign },
  { href: "/investor/dashboard/updates", label: "Updates", icon: Bell },
];

export default function InvestorDashboard() {
  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <p className="font-heading text-xs tracking-[0.3em] uppercase text-cosmic-gold mb-2">
              Investor Portal
            </p>
            <h1 className="text-3xl font-heading font-bold tracking-wider">Dashboard</h1>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 text-xs tracking-wider uppercase text-cosmic-white/50 hover:text-cosmic-gold transition-colors"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-5"
            >
              <m.icon className="w-5 h-5 text-nebula-400 mb-3" />
              <p className="font-heading text-lg tracking-wider">{m.value}</p>
              <p className="text-cosmic-white/40 text-xs mt-1">{m.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Revenue Chart (simple bar visualization) */}
        <div className="glass-card p-8 mb-12">
          <h2 className="font-heading text-sm tracking-wider text-cosmic-gold mb-6">
            Monthly Revenue — 2026
          </h2>
          <div className="flex items-end gap-3 h-48">
            {revenueByMonth.map((m) => {
              const maxRev = Math.max(...revenueByMonth.map((r) => r.revenue));
              const height = (m.revenue / maxRev) * 100;
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-cosmic-white/50">${(m.revenue / 1000).toFixed(0)}k</span>
                  <div
                    className="w-full bg-gradient-to-t from-nebula-500 to-stellar-400 rounded-t-lg transition-all"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-cosmic-white/30">
                    {m.month.split(" ")[0].slice(0, 3)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Latest Updates */}
        <div className="glass-card p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading text-sm tracking-wider text-cosmic-gold">
              Latest Updates
            </h2>
            <Link
              href="/investor/dashboard/updates"
              className="text-xs text-nebula-400 hover:text-nebula-300"
            >
              View All
            </Link>
          </div>
          <div className="space-y-6">
            {companyUpdates.slice(0, 2).map((update) => (
              <div key={update.date} className="border-l-2 border-nebula-500/30 pl-6">
                <p className="text-xs text-cosmic-white/30 mb-1">{update.date}</p>
                <h3 className="font-heading text-sm tracking-wider mb-2">{update.title}</h3>
                <p className="text-cosmic-white/50 text-sm leading-relaxed">{update.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
