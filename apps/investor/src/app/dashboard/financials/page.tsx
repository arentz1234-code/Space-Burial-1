"use client";

import { motion } from "framer-motion";
import StarField from "@/components/shared/StarField";
import { TrendingUp, DollarSign, Users, Building } from "lucide-react";

const companyMetrics = {
  totalRaised: 2500000,
  valuation: 15000000,
  totalInvestors: 47,
  reservations: 312,
  monthlyBurnRate: 85000,
  runway: 18,
};

const revenueByMonth = [
  { month: "Jan", revenue: 45000, expenses: 78000 },
  { month: "Feb", revenue: 52000, expenses: 82000 },
  { month: "Mar", revenue: 68000, expenses: 85000 },
  { month: "Apr", revenue: 75000, expenses: 88000 },
  { month: "May", revenue: 92000, expenses: 90000 },
  { month: "Jun", revenue: 108000, expenses: 92000 },
];

export default function FinancialsPage() {
  return (
    <>
      <StarField />
      <div className="relative z-10 min-h-screen px-6 pt-32 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-8">
              <h1 className="font-heading text-3xl tracking-wider mb-2">
                Financial Overview
              </h1>
              <p className="text-cosmic-white/60">
                Company metrics and financial performance
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                {
                  label: "Total Raised",
                  value: `$${(companyMetrics.totalRaised / 1000000).toFixed(1)}M`,
                  icon: DollarSign,
                  color: "text-cosmic-gold",
                  bgColor: "bg-cosmic-gold/20",
                },
                {
                  label: "Current Valuation",
                  value: `$${(companyMetrics.valuation / 1000000).toFixed(0)}M`,
                  icon: TrendingUp,
                  color: "text-nebula-400",
                  bgColor: "bg-nebula-500/20",
                },
                {
                  label: "Total Investors",
                  value: companyMetrics.totalInvestors,
                  icon: Users,
                  color: "text-stellar-400",
                  bgColor: "bg-stellar-500/20",
                },
                {
                  label: "Memorial Reservations",
                  value: companyMetrics.reservations,
                  icon: Building,
                  color: "text-green-400",
                  bgColor: "bg-green-500/20",
                },
                {
                  label: "Monthly Burn Rate",
                  value: `$${(companyMetrics.monthlyBurnRate / 1000).toFixed(0)}K`,
                  icon: TrendingUp,
                  color: "text-red-400",
                  bgColor: "bg-red-500/20",
                },
                {
                  label: "Runway",
                  value: `${companyMetrics.runway} months`,
                  icon: Building,
                  color: "text-cosmic-gold",
                  bgColor: "bg-cosmic-gold/20",
                },
              ].map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6"
                >
                  <div className={`w-12 h-12 rounded-xl ${metric.bgColor} flex items-center justify-center mb-4`}>
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <p className="text-2xl font-heading mb-1">{metric.value}</p>
                  <p className="text-sm text-cosmic-white/50">{metric.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Revenue Chart Placeholder */}
            <div className="glass-card p-8 mb-8">
              <h2 className="font-heading text-xl tracking-wider mb-6">
                REVENUE VS EXPENSES
              </h2>

              <div className="space-y-4">
                {revenueByMonth.map((month, i) => (
                  <div key={month.month} className="flex items-center gap-4">
                    <span className="w-12 text-sm text-cosmic-white/50">{month.month}</span>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex-1 bg-white/5 rounded-full h-4 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cosmic-gold to-cosmic-amber"
                          style={{ width: `${(month.revenue / 120000) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-cosmic-gold w-20 text-right">
                        ${(month.revenue / 1000).toFixed(0)}K
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-8 mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cosmic-gold" />
                  <span className="text-xs text-cosmic-white/50">Revenue</span>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="text-center">
              <p className="text-xs text-cosmic-white/40">
                Financial data is updated quarterly. Past performance is not indicative of future results.
                Consult the full financial reports for detailed information.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
