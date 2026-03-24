"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useContent } from "@/components/providers/ContentProvider";
import { ArrowLeft, Megaphone } from "lucide-react";

export default function UpdatesPage() {
  const { content, isLoading } = useContent();
  const companyUpdates = content.companyUpdates || [];

  if (isLoading) {
    return (
      <div className="pt-32 pb-20 px-6 min-h-screen flex items-center justify-center">
        <div className="text-cosmic-white/50">Loading...</div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-heading font-bold tracking-wider">Company Updates</h1>
        </div>

        {companyUpdates.length > 0 ? (
          <div className="space-y-8">
            {companyUpdates.map((update, i) => (
              <motion.div
                key={update.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8"
              >
                <p className="text-xs text-cosmic-white/30 mb-2">{update.date}</p>
                <h3 className="font-heading text-lg tracking-wider mb-4">{update.title}</h3>
                <p className="text-cosmic-white/60 text-sm leading-relaxed">{update.body}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center">
            <Megaphone className="w-12 h-12 text-cosmic-white/20 mx-auto mb-4" />
            <p className="text-cosmic-white/50">No company updates available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
