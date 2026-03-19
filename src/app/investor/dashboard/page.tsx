"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  DollarSign,
  Users,
  Rocket,
  TrendingUp,
  FileText,
  BarChart3,
  Bell,
  PieChart,
  Briefcase,
  Download,
} from "lucide-react";
import {
  companyMetrics,
  revenueByMonth,
  companyUpdates,
} from "@/lib/mock-financials";

// Mock investor data - would come from session in production
const mockInvestor = {
  name: "Marcus Webb",
  shares: 20000,
  sharePrice: 5.0,
  investmentAmount: 100000,
  ownershipPercentage: 0.8,
  documents: [
    {
      id: "doc-001",
      name: "Non-Disclosure Agreement",
      type: "nda",
      date: "2025-08-30",
    },
    {
      id: "doc-002",
      name: "Investment Agreement",
      type: "agreement",
      date: "2025-09-01",
    },
    {
      id: "doc-003",
      name: "Q4 2025 Financial Report",
      type: "report",
      date: "2026-01-15",
    },
    {
      id: "doc-004",
      name: "2025 Annual Report",
      type: "report",
      date: "2026-02-15",
    },
  ],
};

const companyStats = [
  { label: "Total Raised", value: companyMetrics.totalRaised, icon: DollarSign },
  { label: "Valuation", value: companyMetrics.valuation, icon: TrendingUp },
  { label: "Investors", value: companyMetrics.totalInvestors, icon: Users },
  { label: "Reservations", value: companyMetrics.reservations, icon: Rocket },
];

const navItems = [
  { href: "/investor/dashboard", label: "Overview", icon: BarChart3 },
  { href: "/investor/dashboard/documents", label: "Documents", icon: FileText },
  { href: "/investor/dashboard/financials", label: "Financials", icon: DollarSign },
  { href: "/investor/dashboard/updates", label: "Updates", icon: Bell },
];

export default function InvestorDashboard() {
  const currentValue = mockInvestor.shares * mockInvestor.sharePrice;
  const gain = currentValue - mockInvestor.investmentAmount;
  const gainPercentage = ((gain / mockInvestor.investmentAmount) * 100).toFixed(1);

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <p className="font-heading text-xs tracking-[0.3em] uppercase text-cosmic-gold mb-2">
              Investor Portal
            </p>
            <h1 className="text-3xl font-heading font-bold tracking-wider">
              Welcome, {mockInvestor.name}
            </h1>
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

        {/* Your Investment Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {/* Shares Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 border border-cosmic-gold/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cosmic-gold/20 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-cosmic-gold" />
              </div>
              <div>
                <p className="text-xs text-cosmic-white/50">Your Shares</p>
                <p className="font-heading text-2xl tracking-wider">
                  {mockInvestor.shares.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-white/10">
              <div className="flex justify-between text-sm">
                <span className="text-cosmic-white/50">Price per share</span>
                <span className="text-cosmic-gold">
                  ${mockInvestor.sharePrice.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Value Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 border border-nebula-500/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-nebula-500/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-nebula-400" />
              </div>
              <div>
                <p className="text-xs text-cosmic-white/50">Current Value</p>
                <p className="font-heading text-2xl tracking-wider">
                  ${currentValue.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-white/10">
              <div className="flex justify-between text-sm">
                <span className="text-cosmic-white/50">Total gain</span>
                <span className="text-green-400">
                  +${gain.toLocaleString()} ({gainPercentage}%)
                </span>
              </div>
            </div>
          </motion.div>

          {/* Ownership Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 border border-stellar-400/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-stellar-400/20 flex items-center justify-center">
                <PieChart className="w-5 h-5 text-stellar-400" />
              </div>
              <div>
                <p className="text-xs text-cosmic-white/50">Ownership</p>
                <p className="font-heading text-2xl tracking-wider">
                  {mockInvestor.ownershipPercentage}%
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-white/10">
              <div className="flex justify-between text-sm">
                <span className="text-cosmic-white/50">Initial investment</span>
                <span>${mockInvestor.investmentAmount.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Company Metrics Grid */}
        <h2 className="font-heading text-sm tracking-wider text-cosmic-gold mb-4">
          Company Performance
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {companyStats.map((m, i) => (
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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Revenue Chart */}
          <div className="glass-card p-8">
            <h2 className="font-heading text-sm tracking-wider text-cosmic-gold mb-6">
              Monthly Revenue — 2026
            </h2>
            <div className="flex items-end gap-3 h-48">
              {revenueByMonth.map((m) => {
                const maxRev = Math.max(...revenueByMonth.map((r) => r.revenue));
                const height = (m.revenue / maxRev) * 100;
                return (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-xs text-cosmic-white/50">
                      ${(m.revenue / 1000).toFixed(0)}k
                    </span>
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

          {/* Documents */}
          <div className="glass-card p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading text-sm tracking-wider text-cosmic-gold">
                Your Documents
              </h2>
              <Link
                href="/investor/dashboard/documents"
                className="text-xs text-nebula-400 hover:text-nebula-300"
              >
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {mockInvestor.documents.slice(0, 4).map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-nebula-400" />
                    <div>
                      <p className="text-sm">{doc.name}</p>
                      <p className="text-xs text-cosmic-white/40">{doc.date}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Download className="w-4 h-4 text-cosmic-white/50" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Latest Updates */}
        <div className="glass-card p-8 mt-8">
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
                <h3 className="font-heading text-sm tracking-wider mb-2">
                  {update.title}
                </h3>
                <p className="text-cosmic-white/50 text-sm leading-relaxed">
                  {update.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
