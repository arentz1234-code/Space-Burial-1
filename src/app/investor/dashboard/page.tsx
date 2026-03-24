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
import { companyMetrics, revenueByMonth } from "@/lib/mock-financials";
import { useContent } from "@/components/providers/ContentProvider";

// Mock investor data - would come from session in production
const mockInvestor = {
  name: "Marcus Webb",
  shares: 20000,
  sharePrice: 5.0,
  investmentAmount: 100000,
  ownershipPercentage: 0.8,
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
  { href: "/investor/dashboard/offering", label: "Offering", icon: Briefcase },
  { href: "/investor/dashboard/disclosures", label: "Disclosures", icon: PieChart },
];

export default function InvestorDashboard() {
  const { content } = useContent();
  const documents = content.investorDocuments || [];
  const companyUpdates = content.companyUpdates || [];

  const currentValue = mockInvestor.shares * mockInvestor.sharePrice;
  const gain = currentValue - mockInvestor.investmentAmount;
  const gainPercentage = ((gain / mockInvestor.investmentAmount) * 100).toFixed(1);

  return (
    <div className="pt-20 sm:pt-24 pb-12 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 sm:mb-12">
          <div>
            <p className="font-heading text-xs tracking-[0.3em] uppercase text-cosmic-gold mb-2">
              Investor Portal
            </p>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold tracking-wider">
              Welcome, {mockInvestor.name}
            </h1>
          </div>
          {/* Navigation - horizontal scroll on mobile */}
          <div className="flex gap-2 sm:gap-4 mt-4 md:mt-0 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 w-full md:w-auto scrollbar-hide">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs tracking-wider uppercase text-cosmic-white/50 hover:text-cosmic-gold transition-colors whitespace-nowrap px-2 py-2 sm:px-0 sm:py-0 min-h-[44px] sm:min-h-0"
              >
                <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline sm:inline">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Your Investment Section */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
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
        <h2 className="font-heading text-sm tracking-wider text-cosmic-gold mb-3 sm:mb-4">
          Company Performance
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
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

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-8">
          {/* Revenue Chart */}
          <div className="glass-card p-4 sm:p-8">
            <h2 className="font-heading text-sm tracking-wider text-cosmic-gold mb-6">
              Monthly Revenue — 2026 (Projected)
            </h2>
            <div className="flex items-end gap-2 sm:gap-3 h-40 sm:h-48">
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
            <p className="text-[10px] text-cosmic-white/30 mt-4 leading-relaxed">
              FORWARD-LOOKING STATEMENTS: These projections are estimates based on current expectations and assumptions. Actual results may differ materially due to risks including market conditions, launch delays, regulatory changes, and other factors. Past performance does not guarantee future results. These statements are made pursuant to the safe harbor provisions of the Private Securities Litigation Reform Act of 1995.
            </p>
          </div>

          {/* Documents */}
          <div className="glass-card p-4 sm:p-8">
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
              {documents.slice(0, 4).map((doc) => (
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
              {documents.length === 0 && (
                <p className="text-cosmic-white/40 text-sm text-center py-4">
                  No documents available yet.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Latest Updates */}
        <div className="glass-card p-4 sm:p-8 mt-4 sm:mt-8">
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
          {companyUpdates.length > 0 ? (
            <div className="space-y-6">
              {companyUpdates.slice(0, 2).map((update) => (
                <div key={update.id} className="border-l-2 border-nebula-500/30 pl-6">
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
          ) : (
            <p className="text-cosmic-white/40 text-sm text-center py-4">
              No updates available yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
