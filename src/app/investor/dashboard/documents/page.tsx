"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { documents } from "@/lib/mock-financials";
import { FileText, Download, ArrowLeft } from "lucide-react";

export default function DocumentsPage() {
  return (
    <div className="pt-24 pb-20 px-6">
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
          <h1 className="text-3xl font-heading font-bold tracking-wider">Documents</h1>
          <p className="text-cosmic-white/50 text-sm mt-2">
            Confidential materials for accredited investors only.
          </p>
        </div>

        <div className="space-y-4">
          {documents.map((doc, i) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-6 flex items-center justify-between group hover:glow-border transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <FileText className="w-8 h-8 text-nebula-400" />
                <div>
                  <p className="font-heading text-sm tracking-wider">{doc.name}</p>
                  <p className="text-cosmic-white/30 text-xs mt-1">
                    {doc.type} &middot; {doc.size} &middot; {doc.date}
                  </p>
                </div>
              </div>
              <Download className="w-5 h-5 text-cosmic-white/20 group-hover:text-cosmic-gold transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
