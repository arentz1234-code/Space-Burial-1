"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { companyMetrics, capTable, revenueByMonth } from "@/lib/mock-financials";
import { ArrowLeft } from "lucide-react";

export default function FinancialsPage() {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/investor/dashboard"
          className="inline-flex items-center gap-2 text-sm text-cosmic-white/50 hover:text-cosmic-gold transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="mb-12">
          <p className="font-heading text-xs tracking-[0.3em] uppercase text-cosmic-gold mb-2">
            Investor Portal
          </p>
          <h1 className="text-3xl font-heading font-bold tracking-wider">Financials</h1>
        </div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 mb-8"
        >
          <h2 className="font-heading text-sm tracking-wider text-cosmic-gold mb-6">Key Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { label: "Total Raised", value: companyMetrics.totalRaised },
              { label: "Valuation", value: companyMetrics.valuation },
              { label: "YTD Revenue", value: companyMetrics.revenue.ytd },
              { label: "Last Quarter", value: companyMetrics.revenue.lastQuarter },
              { label: "QoQ Growth", value: companyMetrics.revenue.growth },
              { label: "Runway", value: companyMetrics.runway },
            ].map((m) => (
              <div key={m.label}>
                <p className="text-cosmic-white/40 text-xs mb-1">{m.label}</p>
                <p className="font-heading text-xl tracking-wider">{m.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cap Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 mb-8"
        >
          <h2 className="font-heading text-sm tracking-wider text-cosmic-gold mb-6">Cap Table</h2>
          <div className="space-y-1">
            <div className="grid grid-cols-3 text-xs text-cosmic-white/40 pb-3 border-b border-white/10">
              <span>Holder</span>
              <span className="text-right">Shares</span>
              <span className="text-right">Ownership</span>
            </div>
            {capTable.map((row) => (
              <div key={row.holder} className="grid grid-cols-3 py-3 text-sm border-b border-white/5">
                <span className="text-cosmic-white/70">{row.holder}</span>
                <span className="text-right text-cosmic-white/50">
                  {row.shares.toLocaleString()}
                </span>
                <span className="text-right font-heading text-sm tracking-wider">
                  {row.percentage}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Revenue Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8"
        >
          <h2 className="font-heading text-sm tracking-wider text-cosmic-gold mb-6">
            Monthly Revenue
          </h2>
          <div className="space-y-1">
            <div className="grid grid-cols-2 text-xs text-cosmic-white/40 pb-3 border-b border-white/10">
              <span>Month</span>
              <span className="text-right">Revenue</span>
            </div>
            {revenueByMonth.map((row) => (
              <div key={row.month} className="grid grid-cols-2 py-3 text-sm border-b border-white/5">
                <span className="text-cosmic-white/70">{row.month}</span>
                <span className="text-right font-heading tracking-wider">
                  ${row.revenue.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
