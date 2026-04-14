"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StarField from "@/components/shared/StarField";
import {
  TrendingUp,
  DollarSign,
  PieChart,
  FileText,
  Calendar,
  ArrowUpRight,
  Presentation,
} from "lucide-react";
import Link from "next/link";

interface InvestorData {
  name: string;
  shares: number;
  sharePrice: number;
  investmentAmount: number;
  ownershipPercentage: number;
  verificationDate: string;
}

export default function InvestorDashboard() {
  const [investor, setInvestor] = useState<InvestorData | null>(null);

  useEffect(() => {
    // In production, fetch from API
    // For demo, use mock data
    setInvestor({
      name: "Marcus Webb",
      shares: 20000,
      sharePrice: 5.0,
      investmentAmount: 100000,
      ownershipPercentage: 0.85,
      verificationDate: "2025-08-31",
    });
  }, []);

  if (!investor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-cosmic-gold border-t-transparent rounded-full" />
      </div>
    );
  }

  const currentValue = investor.shares * investor.sharePrice;
  const gain = currentValue - investor.investmentAmount;
  const gainPercentage = ((gain / investor.investmentAmount) * 100).toFixed(1);

  const stats = [
    {
      label: "Total Shares",
      value: investor.shares.toLocaleString(),
      icon: PieChart,
      color: "text-nebula-400",
      bgColor: "bg-nebula-500/20",
    },
    {
      label: "Share Price",
      value: `$${investor.sharePrice.toFixed(2)}`,
      icon: DollarSign,
      color: "text-stellar-400",
      bgColor: "bg-stellar-500/20",
    },
    {
      label: "Current Value",
      value: `$${currentValue.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-cosmic-gold",
      bgColor: "bg-cosmic-gold/20",
    },
    {
      label: "Ownership",
      value: `${investor.ownershipPercentage}%`,
      icon: PieChart,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
    },
  ];

  return (
    <>
      <StarField />
      <div className="relative z-10 min-h-screen px-6 pt-32 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Header */}
            <div className="mb-8">
              <h1 className="font-heading text-3xl tracking-wider mb-2">
                Welcome, {investor.name.split(" ")[0]}
              </h1>
              <p className="text-cosmic-white/60">
                Your investment overview and portfolio summary
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    {stat.label === "Current Value" && gain > 0 && (
                      <span className="text-xs text-green-400 flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" />
                        +{gainPercentage}%
                      </span>
                    )}
                  </div>
                  <p className="text-2xl font-heading mb-1">{stat.value}</p>
                  <p className="text-sm text-cosmic-white/50">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: "Documents",
                  description: "View and download your investment documents",
                  href: "/dashboard/documents",
                  icon: FileText,
                },
                {
                  title: "Financials",
                  description: "Review company financial reports",
                  href: "/dashboard/financials",
                  icon: TrendingUp,
                },
                {
                  title: "Updates",
                  description: "Latest company news and announcements",
                  href: "/dashboard/updates",
                  icon: Calendar,
                },
                {
                  title: "Pitch Deck",
                  description: "View the investor presentation",
                  href: "/dashboard/pitch-deck",
                  icon: Presentation,
                },
              ].map((link, i) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="glass-card p-6 block hover:border-cosmic-gold/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-cosmic-gold/20 flex items-center justify-center mb-4">
                      <link.icon className="w-5 h-5 text-cosmic-gold" />
                    </div>
                    <h3 className="font-heading text-lg tracking-wider mb-2">
                      {link.title}
                    </h3>
                    <p className="text-sm text-cosmic-white/50">{link.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Investment Details */}
            <div className="glass-card p-8">
              <h2 className="font-heading text-xl tracking-wider mb-6">
                INVESTMENT DETAILS
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-cosmic-white/60">Original Investment</span>
                    <span className="font-heading">${investor.investmentAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-cosmic-white/60">Shares Acquired</span>
                    <span className="font-heading">{investor.shares.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-cosmic-white/60">Cost Per Share</span>
                    <span className="font-heading">${investor.sharePrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-cosmic-white/60">Verification Status</span>
                    <span className="text-green-400">Verified</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-cosmic-white/60">Verification Date</span>
                    <span className="font-heading">{investor.verificationDate}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-cosmic-white/60">Investment Type</span>
                    <span className="font-heading">Series A Preferred</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
