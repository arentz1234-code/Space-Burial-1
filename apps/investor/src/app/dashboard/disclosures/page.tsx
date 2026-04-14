"use client";

import { motion } from "framer-motion";
import StarField from "@/components/shared/StarField";
import SECDisclaimer from "@/components/shared/SECDisclaimer";
import { Users, DollarSign, PieChart, AlertTriangle } from "lucide-react";

export default function DisclosuresPage() {
  return (
    <>
      <StarField />
      <div className="relative z-10 min-h-screen px-6 pt-32 pb-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-8">
              <h1 className="font-heading text-3xl tracking-wider mb-2">
                Material Disclosures
              </h1>
              <p className="text-cosmic-white/60">
                Required SEC Rule 506(c) material disclosures
              </p>
            </div>

            {/* Use of Proceeds */}
            <div className="glass-card p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="w-6 h-6 text-cosmic-gold" />
                <h2 className="font-heading text-xl tracking-wider">
                  USE OF PROCEEDS
                </h2>
              </div>

              <p className="text-sm text-cosmic-white/70 mb-6">
                The following is an estimated allocation of proceeds from this offering.
                Actual allocation may vary based on business needs and market conditions.
              </p>

              <div className="space-y-4">
                {[
                  { category: "Technology & Platform Development", percentage: 40 },
                  { category: "Marketing & Customer Acquisition", percentage: 25 },
                  { category: "Operations & Launch Partnerships", percentage: 20 },
                  { category: "Working Capital & General Corporate", percentage: 15 },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-cosmic-white/80">{item.category}</span>
                      <span className="font-heading text-cosmic-gold">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="h-full bg-gradient-to-r from-cosmic-gold to-cosmic-amber rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Management Team */}
            <div className="glass-card p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-nebula-400" />
                <h2 className="font-heading text-xl tracking-wider">
                  MANAGEMENT & KEY PERSONNEL
                </h2>
              </div>

              <div className="space-y-6">
                {[
                  {
                    name: "Dr. Sarah Chen",
                    title: "Chief Executive Officer & Co-Founder",
                    background: "Former SpaceX payload integration lead. PhD Aerospace Engineering, MIT. 15 years aerospace experience.",
                    compensation: "$180,000 base + equity",
                  },
                  {
                    name: "Michael Torres",
                    title: "Chief Operating Officer & Co-Founder",
                    background: "20+ years funeral services industry. Former VP at Service Corporation International (NYSE: SCI).",
                    compensation: "$165,000 base + equity",
                  },
                  {
                    name: "Jennifer Park",
                    title: "Chief Technology Officer",
                    background: "Built consumer platforms at scale. Former Engineering Director at Airbnb. MS Computer Science, Stanford.",
                    compensation: "$195,000 base + equity",
                  },
                ].map((person, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-xl">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-heading text-lg">{person.name}</h3>
                        <p className="text-sm text-nebula-400">{person.title}</p>
                      </div>
                    </div>
                    <p className="text-sm text-cosmic-white/60 mb-2">{person.background}</p>
                    <p className="text-xs text-cosmic-white/40">Compensation: {person.compensation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Capitalization Table */}
            <div className="glass-card p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <PieChart className="w-6 h-6 text-stellar-400" />
                <h2 className="font-heading text-xl tracking-wider">
                  CAPITALIZATION TABLE
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 text-cosmic-white/50 font-heading tracking-wider">Shareholder</th>
                      <th className="text-right py-3 text-cosmic-white/50 font-heading tracking-wider">Shares</th>
                      <th className="text-right py-3 text-cosmic-white/50 font-heading tracking-wider">Ownership</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Founders (Common)", shares: "5,000,000", ownership: "50.0%" },
                      { name: "Employee Option Pool", shares: "1,500,000", ownership: "15.0%" },
                      { name: "Series A Investors", shares: "2,350,000", ownership: "23.5%" },
                      { name: "This Offering (Available)", shares: "1,150,000", ownership: "11.5%" },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-white/5">
                        <td className="py-3 text-cosmic-white/80">{row.name}</td>
                        <td className="py-3 text-right font-heading">{row.shares}</td>
                        <td className="py-3 text-right text-cosmic-gold font-heading">{row.ownership}</td>
                      </tr>
                    ))}
                    <tr className="font-heading">
                      <td className="py-3 text-cosmic-white">Total Authorized</td>
                      <td className="py-3 text-right">10,000,000</td>
                      <td className="py-3 text-right text-cosmic-gold">100.0%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-xs text-cosmic-white/40">
                * Fully diluted basis. Does not include potential future rounds.
              </p>
            </div>

            {/* Related Party Transactions */}
            <div className="glass-card p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-cosmic-gold" />
                <h2 className="font-heading text-xl tracking-wider">
                  RELATED PARTY TRANSACTIONS
                </h2>
              </div>

              <p className="text-sm text-cosmic-white/70 mb-4">
                The following related party transactions have occurred or are ongoing:
              </p>

              <ul className="space-y-3 text-sm text-cosmic-white/60">
                <li className="flex items-start gap-2">
                  <span className="text-cosmic-gold">•</span>
                  Founders received below-market salary during seed stage ($60,000/year) with deferred compensation arrangements.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cosmic-gold">•</span>
                  The company leases office space from a property owned by CEO Sarah Chen at fair market rates ($3,500/month).
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cosmic-gold">•</span>
                  Co-founder Michael Torres&apos;s former employer (SCI) has a non-exclusive partnership agreement for referrals.
                </li>
              </ul>
            </div>

            {/* Risk Factors Summary */}
            <div className="glass-card p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <h2 className="font-heading text-xl tracking-wider">
                  KEY RISK FACTORS
                </h2>
              </div>

              <p className="text-sm text-cosmic-white/70 mb-4">
                This is a summary of key risks. See the PPM for complete risk disclosures.
              </p>

              <ul className="space-y-3 text-sm text-cosmic-white/60">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <strong className="text-cosmic-white/80">Total Loss Risk:</strong> You may lose your entire investment.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <strong className="text-cosmic-white/80">Illiquidity:</strong> Securities cannot be easily sold or transferred.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <strong className="text-cosmic-white/80">Early Stage:</strong> Company has limited operating history.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <strong className="text-cosmic-white/80">Regulatory:</strong> Space industry subject to significant regulatory oversight.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <strong className="text-cosmic-white/80">Competition:</strong> May face competition from well-funded competitors.
                </li>
              </ul>
            </div>

            <SECDisclaimer />
          </motion.div>
        </div>
      </div>
    </>
  );
}
