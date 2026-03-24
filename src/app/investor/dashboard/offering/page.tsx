"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  Download,
  AlertTriangle,
  Shield,
  BarChart3,
  DollarSign,
  Bell,
  BookOpen,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { useContent } from "@/components/providers/ContentProvider";

const navItems = [
  { href: "/investor/dashboard", label: "Overview", icon: BarChart3 },
  { href: "/investor/dashboard/documents", label: "Documents", icon: FileText },
  { href: "/investor/dashboard/financials", label: "Financials", icon: DollarSign },
  { href: "/investor/dashboard/updates", label: "Updates", icon: Bell },
  { href: "/investor/dashboard/offering", label: "Offering", icon: BookOpen },
  { href: "/investor/dashboard/disclosures", label: "Disclosures", icon: Shield },
];

// SEC Offering Documents with categories
const offeringDocuments = [
  {
    id: "ppm",
    name: "Private Placement Memorandum (PPM)",
    description: "Complete disclosure document for this securities offering",
    type: "PDF",
    size: "2.4 MB",
    date: "2025-06-01",
    category: "offering",
    required: true,
  },
  {
    id: "subscription",
    name: "Subscription Agreement",
    description: "Investment subscription and acknowledgment of risks",
    type: "PDF",
    size: "890 KB",
    date: "2025-06-01",
    category: "offering",
    required: true,
  },
  {
    id: "questionnaire",
    name: "Investor Questionnaire",
    description: "Accredited investor qualification questionnaire",
    type: "PDF",
    size: "340 KB",
    date: "2025-06-01",
    category: "offering",
    required: true,
  },
  {
    id: "operating",
    name: "Operating Agreement",
    description: "Company operating agreement and governance structure",
    type: "PDF",
    size: "1.3 MB",
    date: "2025-06-01",
    category: "offering",
    required: false,
  },
  {
    id: "risk-factors",
    name: "Risk Factors Disclosure",
    description: "Detailed risk factors associated with this investment",
    type: "PDF",
    size: "520 KB",
    date: "2025-06-01",
    category: "offering",
    required: true,
  },
  {
    id: "form-d",
    name: "SEC Form D Filing",
    description: "Notice of exempt offering filed with the SEC",
    type: "PDF",
    size: "210 KB",
    date: "2025-06-01",
    category: "regulatory",
    required: false,
  },
];

export default function OfferingDocuments() {
  const { content } = useContent();

  const requiredDocs = offeringDocuments.filter((d) => d.required);
  const additionalDocs = offeringDocuments.filter((d) => !d.required);

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
              Offering Documents
            </h1>
          </div>
          {/* Navigation - horizontal scroll on mobile */}
          <div className="flex gap-2 sm:gap-4 mt-4 md:mt-0 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 w-full md:w-auto scrollbar-hide">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs tracking-wider uppercase transition-colors whitespace-nowrap px-2 py-2 sm:px-0 sm:py-0 min-h-[44px] sm:min-h-0 ${
                  item.href === "/investor/dashboard/offering"
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

        {/* SEC Disclaimer Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="font-heading text-sm tracking-wider text-red-400 mb-3">
                IMPORTANT SECURITIES DISCLOSURE
              </h2>
              <div className="text-xs text-cosmic-white/70 space-y-3 leading-relaxed">
                <p>
                  <strong className="text-cosmic-white">UNREGISTERED SECURITIES:</strong> The securities
                  offered by Space Burial, Inc. have NOT been registered under the Securities Act of 1933,
                  as amended, or any state securities laws. This offering is being made in reliance on
                  Rule 506(c) of Regulation D under the Securities Act.
                </p>
                <p>
                  <strong className="text-cosmic-white">ACCREDITED INVESTORS ONLY:</strong> These securities
                  are offered only to persons who qualify as &quot;accredited investors&quot; as defined in
                  Rule 501 of Regulation D. The Company is required to take reasonable steps to verify the
                  accredited investor status of each purchaser.
                </p>
                <p>
                  <strong className="text-cosmic-white">RESTRICTED SECURITIES:</strong> These securities are
                  &quot;restricted securities&quot; and may not be resold without registration under the Securities
                  Act or an applicable exemption from registration. There is no public market for these
                  securities and none is expected to develop.
                </p>
                <p>
                  <strong className="text-cosmic-white">RISK OF LOSS:</strong> Investment in the Company
                  involves a high degree of risk and is suitable only for persons who can afford to lose
                  their entire investment. Please review all risk factors carefully before investing.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Required Reading Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4 sm:p-6 mb-6 sm:mb-8 border border-cosmic-gold/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-cosmic-gold" />
            <h2 className="font-heading text-sm tracking-wider text-cosmic-gold">
              Required Reading Before Investing
            </h2>
          </div>
          <p className="text-xs text-cosmic-white/60 mb-4">
            Before making an investment decision, you must carefully review all offering documents.
            The following documents contain material information about the offering:
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {requiredDocs.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
              >
                <CheckCircle className="w-4 h-4 text-cosmic-gold shrink-0" />
                <span className="text-sm text-cosmic-white">{doc.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Primary Offering Documents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4 sm:p-8 mb-6 sm:mb-8"
        >
          <h2 className="font-heading text-sm tracking-wider text-cosmic-gold mb-4 sm:mb-6">
            Primary Offering Documents
          </h2>

          <div className="space-y-4">
            {requiredDocs.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cosmic-gold/20 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-cosmic-gold" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-cosmic-white">
                        {doc.name}
                      </p>
                      <span className="px-2 py-0.5 text-[10px] font-heading tracking-wider bg-red-500/20 text-red-400 rounded">
                        REQUIRED
                      </span>
                    </div>
                    <p className="text-xs text-cosmic-white/50 mt-1">
                      {doc.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-cosmic-white/30">
                        {doc.type}
                      </span>
                      <span className="text-cosmic-white/20">•</span>
                      <span className="text-xs text-cosmic-white/30">
                        {doc.size}
                      </span>
                      <span className="text-cosmic-white/20">•</span>
                      <span className="text-xs text-cosmic-white/30">
                        {doc.date}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-cosmic-gold/20 hover:bg-cosmic-gold/30 rounded-lg transition-colors">
                  <Download className="w-4 h-4 text-cosmic-gold" />
                  <span className="text-sm text-cosmic-gold">Download</span>
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Additional Documents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-8 mb-8"
        >
          <h2 className="font-heading text-sm tracking-wider text-cosmic-gold mb-6">
            Additional Documents
          </h2>

          <div className="space-y-4">
            {additionalDocs.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-nebula-400" />
                  </div>
                  <div>
                    <p className="text-sm text-cosmic-white">{doc.name}</p>
                    <p className="text-xs text-cosmic-white/50 mt-0.5">
                      {doc.description}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-cosmic-white/30">
                        {doc.type}
                      </span>
                      <span className="text-cosmic-white/20">•</span>
                      <span className="text-xs text-cosmic-white/30">
                        {doc.size}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Download className="w-4 h-4 text-cosmic-white/50" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* SEC Form D Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <div className="flex items-start gap-4">
            <Shield className="w-5 h-5 text-nebula-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-cosmic-white mb-2">
                SEC EDGAR Filing
              </h3>
              <p className="text-xs text-cosmic-white/60 mb-4">
                You can verify our Form D filing directly on the SEC&apos;s EDGAR database.
                Form D is a notice of exempt offering that issuers must file with the SEC.
              </p>
              <a
                href="https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=space+burial&type=D&dateb=&owner=include&count=40"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-nebula-400 hover:text-nebula-300 transition-colors"
              >
                View on SEC EDGAR
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
