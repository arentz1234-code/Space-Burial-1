"use client";

import { motion } from "framer-motion";
import StarField from "@/components/shared/StarField";
import SECDisclaimer from "@/components/shared/SECDisclaimer";
import { FileText, Download, Shield, AlertTriangle } from "lucide-react";

const offeringDocuments = [
  {
    id: "ppm",
    name: "Private Placement Memorandum (PPM)",
    description: "Complete offering document with risk factors, business description, and financial projections",
    category: "offering",
    required: true,
  },
  {
    id: "subscription",
    name: "Subscription Agreement",
    description: "Investment subscription form and terms",
    category: "offering",
    required: true,
  },
  {
    id: "questionnaire",
    name: "Investor Questionnaire",
    description: "Accredited investor qualification questionnaire",
    category: "offering",
    required: true,
  },
  {
    id: "formd",
    name: "SEC Form D Filing",
    description: "Notice of exempt offering of securities filed with SEC",
    category: "regulatory",
    required: false,
  },
  {
    id: "articles",
    name: "Articles of Incorporation",
    description: "Company formation documents",
    category: "regulatory",
    required: false,
  },
  {
    id: "bylaws",
    name: "Company Bylaws",
    description: "Corporate governance documents",
    category: "regulatory",
    required: false,
  },
];

export default function OfferingPage() {
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
                Offering Documents
              </h1>
              <p className="text-cosmic-white/60">
                SEC Rule 506(c) private placement offering materials
              </p>
            </div>

            {/* Warning Banner */}
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 mb-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-red-400 font-heading tracking-wider mb-1">
                    IMPORTANT NOTICE
                  </p>
                  <p className="text-xs text-cosmic-white/70">
                    These documents contain material information about Space Burial, Inc.
                    and its securities offering. Please read all documents carefully before
                    making an investment decision. Consult with your legal, tax, and financial
                    advisors.
                  </p>
                </div>
              </div>
            </div>

            {/* Required Documents */}
            <div className="mb-8">
              <h2 className="font-heading text-xl tracking-wider mb-4">
                REQUIRED READING
              </h2>
              <div className="space-y-4">
                {offeringDocuments
                  .filter((doc) => doc.required)
                  .map((doc, i) => (
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
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-heading text-sm tracking-wider">
                              {doc.name}
                            </h3>
                            <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs">
                              Required
                            </span>
                          </div>
                          <p className="text-xs text-cosmic-white/50">
                            {doc.description}
                          </p>
                        </div>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cosmic-gold/20 border border-cosmic-gold/30 text-sm text-cosmic-gold hover:bg-cosmic-gold/30 transition-colors">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* Additional Documents */}
            <div className="mb-8">
              <h2 className="font-heading text-xl tracking-wider mb-4">
                ADDITIONAL DOCUMENTS
              </h2>
              <div className="space-y-4">
                {offeringDocuments
                  .filter((doc) => !doc.required)
                  .map((doc, i) => (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="glass-card p-6 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-stellar-500/20 flex items-center justify-center">
                          <Shield className="w-6 h-6 text-stellar-400" />
                        </div>
                        <div>
                          <h3 className="font-heading text-sm tracking-wider mb-1">
                            {doc.name}
                          </h3>
                          <p className="text-xs text-cosmic-white/50">
                            {doc.description}
                          </p>
                        </div>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-cosmic-white/70 hover:bg-white/10 transition-colors">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </motion.div>
                  ))}
              </div>
            </div>

            <SECDisclaimer />
          </motion.div>
        </div>
      </div>
    </>
  );
}
