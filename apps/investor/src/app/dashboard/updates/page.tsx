"use client";

import { motion } from "framer-motion";
import StarField from "@/components/shared/StarField";
import { Calendar, Rocket, TrendingUp, FileText, Users } from "lucide-react";

const updates = [
  {
    id: "upd-001",
    title: "Q1 2026 Investor Update",
    content: "We are pleased to report strong progress in Q1 2026. Memorial reservations increased 45% quarter-over-quarter, and we successfully completed our third launch partnership agreement.",
    date: "2026-04-01",
    category: "financial",
    icon: TrendingUp,
  },
  {
    id: "upd-002",
    title: "New Launch Partner Announcement",
    content: "Space Burial has signed a strategic partnership with Celestial Launch Services for dedicated memorial payload capacity on their 2026-2027 mission manifest.",
    date: "2026-03-15",
    category: "announcement",
    icon: Rocket,
  },
  {
    id: "upd-003",
    title: "Series A Extension Opens",
    content: "Due to strong investor demand, we are extending our Series A round with an additional $1M allocation available to existing investors.",
    date: "2026-02-28",
    category: "financial",
    icon: FileText,
  },
  {
    id: "upd-004",
    title: "Team Expansion",
    content: "We welcome Dr. James Morrison as Chief Science Officer. Dr. Morrison brings 20 years of experience in aerospace engineering from NASA and SpaceX.",
    date: "2026-02-01",
    category: "announcement",
    icon: Users,
  },
];

const categoryColors: Record<string, string> = {
  financial: "text-cosmic-gold bg-cosmic-gold/20",
  announcement: "text-nebula-400 bg-nebula-500/20",
  milestone: "text-green-400 bg-green-500/20",
  regulatory: "text-stellar-400 bg-stellar-500/20",
};

export default function UpdatesPage() {
  return (
    <>
      <StarField />
      <div className="relative z-10 min-h-screen px-6 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-8">
              <h1 className="font-heading text-3xl tracking-wider mb-2">
                Company Updates
              </h1>
              <p className="text-cosmic-white/60">
                Latest news and announcements for investors
              </p>
            </div>

            <div className="space-y-6">
              {updates.map((update, i) => (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${categoryColors[update.category]}`}>
                      <update.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-heading text-lg tracking-wider">
                          {update.title}
                        </h3>
                        <span className="text-xs text-cosmic-white/50 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {update.date}
                        </span>
                      </div>
                      <p className="text-sm text-cosmic-white/70 leading-relaxed">
                        {update.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-cosmic-white/40">
                Updates are published quarterly or as significant events occur.
                Check back regularly for the latest information.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
