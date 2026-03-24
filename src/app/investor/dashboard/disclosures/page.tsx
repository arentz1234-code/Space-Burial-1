"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  DollarSign,
  Users,
  AlertTriangle,
  PieChart,
  BarChart3,
  Bell,
  Shield,
  BookOpen,
  Building,
  Briefcase,
  Scale,
} from "lucide-react";

const navItems = [
  { href: "/investor/dashboard", label: "Overview", icon: BarChart3 },
  { href: "/investor/dashboard/documents", label: "Documents", icon: FileText },
  { href: "/investor/dashboard/financials", label: "Financials", icon: DollarSign },
  { href: "/investor/dashboard/updates", label: "Updates", icon: Bell },
  { href: "/investor/dashboard/offering", label: "Offering", icon: BookOpen },
  { href: "/investor/dashboard/disclosures", label: "Disclosures", icon: Shield },
];

// Use of Proceeds Data
const useOfProceeds = [
  { category: "Launch Operations", percentage: 40, amount: 960000, color: "bg-cosmic-gold" },
  { category: "Marketing & Sales", percentage: 20, amount: 480000, color: "bg-nebula-500" },
  { category: "Team Expansion", percentage: 15, amount: 360000, color: "bg-stellar-400" },
  { category: "Technology & R&D", percentage: 10, amount: 240000, color: "bg-green-500" },
  { category: "Operations", percentage: 10, amount: 240000, color: "bg-blue-500" },
  { category: "Working Capital", percentage: 5, amount: 120000, color: "bg-purple-500" },
];

// Management Team
const managementTeam = [
  {
    name: "Dr. Sarah Chen",
    title: "Chief Executive Officer",
    background: "Former SpaceX Payload Integration Manager. PhD in Aerospace Engineering from MIT. 15+ years in commercial space industry. Led 47 successful payload integrations.",
    compensation: "$180,000 base + 2% equity",
    ownership: "12.5%",
  },
  {
    name: "Marcus Webb",
    title: "Chief Technology Officer",
    background: "Former Blue Origin Senior Software Architect. MS in Computer Science from Stanford. Built mission control systems for 23 suborbital flights.",
    compensation: "$165,000 base + 1.5% equity",
    ownership: "8.5%",
  },
  {
    name: "Jennifer Rodriguez",
    title: "Chief Operating Officer",
    background: "Former Director of Operations at Memorial Partners Inc. MBA from Wharton. 20+ years in deathcare industry operations and scaling.",
    compensation: "$155,000 base + 1.5% equity",
    ownership: "7.5%",
  },
];

// Related Party Transactions
const relatedPartyTransactions = [
  {
    description: "Office Lease Agreement",
    party: "Webb Family Holdings LLC (CTO is a member)",
    terms: "3-year lease at $4,500/month for 2,400 sq ft office space",
    fairValue: "Market rate verified by independent appraisal at $4,200-$4,800/month for comparable space",
    status: "Board approved",
  },
  {
    description: "Software Development Services",
    party: "TechBridge Consulting (CEO's spouse is a 15% shareholder)",
    terms: "Fixed-price contract for $85,000 for initial platform development",
    fairValue: "Competitive bids ranged from $75,000 to $110,000 for comparable scope",
    status: "Board approved with CEO recusal",
  },
];

// Conflicts of Interest
const conflictsOfInterest = [
  {
    person: "Dr. Sarah Chen (CEO)",
    conflict: "Serves on advisory board of Celestis Memorial Spaceflight (non-competing service)",
    mitigation: "Board has approved continued involvement; no competing services; recusal on any related decisions",
  },
  {
    person: "Marcus Webb (CTO)",
    conflict: "Family trust holds 8% ownership in Webb Family Holdings LLC, our office landlord",
    mitigation: "Lease terms verified by independent appraisal; CTO recused from lease negotiations",
  },
];

// Capitalization Table
const capTable = [
  { holder: "Founders", shares: 1250000, percentage: 50.0, type: "Common" },
  { holder: "Seed Investors", shares: 480000, percentage: 19.2, type: "Preferred" },
  { holder: "Employee Option Pool", shares: 500000, percentage: 20.0, type: "Options" },
  { holder: "Advisors", shares: 150000, percentage: 6.0, type: "Common" },
  { holder: "Reserved for Future Rounds", shares: 120000, percentage: 4.8, type: "Authorized" },
];

export default function DisclosuresPage() {
  const totalRaised = 2400000;

  return (
    <div className="pt-20 sm:pt-24 pb-12 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8">
          <div>
            <p className="font-heading text-xs tracking-[0.3em] uppercase text-cosmic-gold mb-2">
              Investor Portal
            </p>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold tracking-wider">
              Material Disclosures
            </h1>
          </div>
          {/* Navigation - horizontal scroll on mobile */}
          <div className="flex gap-2 sm:gap-4 mt-4 md:mt-0 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 w-full md:w-auto scrollbar-hide">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs tracking-wider uppercase transition-colors whitespace-nowrap px-2 py-2 sm:px-0 sm:py-0 min-h-[44px] sm:min-h-0 ${
                  item.href === "/investor/dashboard/disclosures"
                    ? "text-cosmic-gold"
                    : "text-cosmic-white/50 hover:text-cosmic-gold"
                }`}
              >
                <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline sm:inline">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Disclosure Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-cosmic-gold/10 border border-cosmic-gold/30 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8"
        >
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-cosmic-gold shrink-0 mt-0.5" />
            <div>
              <h2 className="font-heading text-sm tracking-wider text-cosmic-gold mb-2">
                Material Information Disclosure
              </h2>
              <p className="text-xs text-cosmic-white/70 leading-relaxed">
                The following disclosures contain material information about Space Burial, Inc.
                that may be relevant to your investment decision. This information is provided
                in compliance with SEC regulations governing private securities offerings.
                Please review all sections carefully.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Use of Proceeds */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4 sm:p-8 mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <DollarSign className="w-5 h-5 text-cosmic-gold" />
            <h2 className="font-heading text-base sm:text-lg tracking-wider text-cosmic-gold">
              Use of Proceeds
            </h2>
          </div>

          <p className="text-sm text-cosmic-white/60 mb-6">
            The Company raised $2.4 million in its seed round from 34 accredited investors.
            The following is the anticipated allocation of funds:
          </p>

          {/* Visual Chart */}
          <div className="mb-8">
            <div className="flex h-8 rounded-lg overflow-hidden mb-4">
              {useOfProceeds.map((item) => (
                <div
                  key={item.category}
                  className={`${item.color} relative group`}
                  style={{ width: `${item.percentage}%` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white text-xs font-medium">
                    {item.percentage}%
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {useOfProceeds.map((item) => (
                <div key={item.category} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <div>
                    <p className="text-sm text-cosmic-white">{item.category}</p>
                    <p className="text-xs text-cosmic-white/50">
                      {item.percentage}% — ${item.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-xs text-cosmic-white/50 leading-relaxed">
              <strong className="text-cosmic-white/70">Note:</strong> The above allocation
              represents management&apos;s current intentions and is subject to change based on
              business needs. The Company reserves the right to reallocate funds as circumstances
              require, subject to fiduciary duties to shareholders.
            </p>
          </div>
        </motion.div>

        {/* Management Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-5 h-5 text-cosmic-gold" />
            <h2 className="font-heading text-lg tracking-wider text-cosmic-gold">
              Management Team
            </h2>
          </div>

          <div className="space-y-6">
            {managementTeam.map((person) => (
              <div
                key={person.name}
                className="p-6 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-heading tracking-wider text-cosmic-white">
                      {person.name}
                    </h3>
                    <p className="text-sm text-nebula-400">{person.title}</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-right">
                      <p className="text-xs text-cosmic-white/50">Ownership</p>
                      <p className="text-sm font-heading text-cosmic-gold">
                        {person.ownership}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-cosmic-white/60 mb-4 leading-relaxed">
                  {person.background}
                </p>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-cosmic-white/50">
                    <span className="text-cosmic-white/70">Compensation:</span>{" "}
                    {person.compensation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Related Party Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Building className="w-5 h-5 text-cosmic-gold" />
            <h2 className="font-heading text-lg tracking-wider text-cosmic-gold">
              Related Party Transactions
            </h2>
          </div>

          <p className="text-sm text-cosmic-white/60 mb-6">
            The following transactions involve related parties (officers, directors, or their
            affiliates). All related party transactions have been reviewed and approved by
            disinterested members of the Board of Directors.
          </p>

          <div className="space-y-4">
            {relatedPartyTransactions.map((transaction, index) => (
              <div
                key={index}
                className="p-6 bg-white/5 rounded-xl border border-white/10"
              >
                <h3 className="text-sm font-medium text-cosmic-white mb-3">
                  {transaction.description}
                </h3>

                <div className="grid md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-cosmic-white/50 mb-1">Related Party:</p>
                    <p className="text-cosmic-white/80">{transaction.party}</p>
                  </div>
                  <div>
                    <p className="text-cosmic-white/50 mb-1">Terms:</p>
                    <p className="text-cosmic-white/80">{transaction.terms}</p>
                  </div>
                  <div>
                    <p className="text-cosmic-white/50 mb-1">Fair Value Assessment:</p>
                    <p className="text-cosmic-white/80">{transaction.fairValue}</p>
                  </div>
                  <div>
                    <p className="text-cosmic-white/50 mb-1">Status:</p>
                    <p className="text-green-400">{transaction.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {relatedPartyTransactions.length === 0 && (
            <p className="text-sm text-cosmic-white/50 text-center py-8">
              No related party transactions to disclose.
            </p>
          )}
        </motion.div>

        {/* Conflicts of Interest */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Scale className="w-5 h-5 text-cosmic-gold" />
            <h2 className="font-heading text-lg tracking-wider text-cosmic-gold">
              Conflicts of Interest
            </h2>
          </div>

          <p className="text-sm text-cosmic-white/60 mb-6">
            The following potential conflicts of interest have been identified and disclosed
            to the Board of Directors. Mitigation measures are in place for each.
          </p>

          <div className="space-y-4">
            {conflictsOfInterest.map((conflict, index) => (
              <div
                key={index}
                className="p-6 bg-white/5 rounded-xl border border-amber-500/20"
              >
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-cosmic-white">
                      {conflict.person}
                    </p>
                    <p className="text-xs text-cosmic-white/60 mt-1">
                      {conflict.conflict}
                    </p>
                  </div>
                </div>
                <div className="pl-7">
                  <p className="text-xs text-cosmic-white/50">
                    <span className="text-green-400">Mitigation:</span>{" "}
                    {conflict.mitigation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Capitalization Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <PieChart className="w-5 h-5 text-cosmic-gold" />
            <h2 className="font-heading text-lg tracking-wider text-cosmic-gold">
              Capitalization Table
            </h2>
          </div>

          <p className="text-sm text-cosmic-white/60 mb-6">
            Current ownership structure of Space Burial, Inc. as of the most recent cap table
            (post-seed round closing).
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-heading tracking-wider text-cosmic-white/50 pb-4">
                    Holder
                  </th>
                  <th className="text-right text-xs font-heading tracking-wider text-cosmic-white/50 pb-4">
                    Shares
                  </th>
                  <th className="text-right text-xs font-heading tracking-wider text-cosmic-white/50 pb-4">
                    Ownership
                  </th>
                  <th className="text-right text-xs font-heading tracking-wider text-cosmic-white/50 pb-4">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody>
                {capTable.map((row) => (
                  <tr key={row.holder} className="border-b border-white/5">
                    <td className="py-4 text-sm text-cosmic-white">{row.holder}</td>
                    <td className="py-4 text-sm text-cosmic-white/70 text-right">
                      {row.shares.toLocaleString()}
                    </td>
                    <td className="py-4 text-sm text-cosmic-gold text-right">
                      {row.percentage.toFixed(1)}%
                    </td>
                    <td className="py-4 text-right">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          row.type === "Common"
                            ? "bg-blue-500/20 text-blue-400"
                            : row.type === "Preferred"
                            ? "bg-purple-500/20 text-purple-400"
                            : row.type === "Options"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-white/10 text-cosmic-white/50"
                        }`}
                      >
                        {row.type}
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="bg-white/5">
                  <td className="py-4 text-sm font-medium text-cosmic-white">Total</td>
                  <td className="py-4 text-sm font-medium text-cosmic-white text-right">
                    {capTable
                      .reduce((sum, row) => sum + row.shares, 0)
                      .toLocaleString()}
                  </td>
                  <td className="py-4 text-sm font-medium text-cosmic-gold text-right">
                    100.0%
                  </td>
                  <td className="py-4"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-xs text-cosmic-white/50 leading-relaxed">
              <strong className="text-cosmic-white/70">Note:</strong> This cap table is
              provided for informational purposes and reflects ownership as of the last update.
              Future financing rounds may dilute existing shareholders. The employee option
              pool has been reserved but not fully allocated.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
