"use client";

import { motion } from "framer-motion";
import StarField from "@/components/shared/StarField";
import { FileText, Download, Calendar, Shield } from "lucide-react";

const documents = [
  {
    id: "doc-001",
    name: "Non-Disclosure Agreement (Signed)",
    type: "nda",
    date: "2025-08-30",
    status: "signed",
  },
  {
    id: "doc-002",
    name: "Subscription Agreement",
    type: "agreement",
    date: "2025-09-01",
    status: "signed",
  },
  {
    id: "doc-003",
    name: "Accredited Investor Certificate",
    type: "certificate",
    date: "2025-08-31",
    status: "verified",
  },
  {
    id: "doc-004",
    name: "Private Placement Memorandum",
    type: "offering",
    date: "2025-09-01",
    status: "available",
  },
  {
    id: "doc-005",
    name: "Q4 2025 Investor Report",
    type: "report",
    date: "2026-01-15",
    status: "available",
  },
];

export default function DocumentsPage() {
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
                Documents
              </h1>
              <p className="text-cosmic-white/60">
                View and download your investment documents
              </p>
            </div>

            <div className="space-y-4">
              {documents.map((doc, i) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card p-6 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cosmic-gold/20 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-cosmic-gold" />
                    </div>
                    <div>
                      <h3 className="font-heading text-sm tracking-wider mb-1">
                        {doc.name}
                      </h3>
                      <div className="flex items-center gap-4 text-xs text-cosmic-white/50">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {doc.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          {doc.status === "signed" && "Signed"}
                          {doc.status === "verified" && "Verified"}
                          {doc.status === "available" && "Available"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-cosmic-white/70 hover:bg-white/10 transition-colors">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-cosmic-white/40">
                All documents are stored securely and available for download at any time.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
