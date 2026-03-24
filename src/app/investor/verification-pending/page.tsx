"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import StarField from "@/components/shared/StarField";
import { Clock, FileCheck, Upload, Phone, Mail, Shield, AlertCircle } from "lucide-react";

export default function VerificationPending() {
  return (
    <>
      <StarField />
      <div className="relative z-10 min-h-screen py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-cosmic-gold/20 flex items-center justify-center">
              <Clock className="w-10 h-10 text-cosmic-gold" />
            </div>
            <h1 className="font-heading text-3xl tracking-wider mb-4">
              Verification In Progress
            </h1>
            <p className="text-cosmic-white/60 text-sm leading-relaxed max-w-md mx-auto">
              Your accredited investor status is being verified. This process typically takes 2-3 business days.
            </p>
          </motion.div>

          {/* SEC Compliance Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 mb-8 border border-cosmic-gold/20"
          >
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-cosmic-gold shrink-0 mt-0.5" />
              <div>
                <h2 className="font-heading text-sm tracking-wider text-cosmic-gold mb-2">
                  SEC Regulation D Compliance
                </h2>
                <p className="text-xs text-cosmic-white/60 leading-relaxed">
                  Under Rule 506(c) of Regulation D, we are required to take reasonable steps to verify
                  that all investors in this offering are accredited investors. Self-certification alone
                  is not sufficient. This verification protects both you and our company.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Status Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 mb-8"
          >
            <h2 className="font-heading text-sm tracking-wider text-cosmic-gold mb-6">
              Verification Status
            </h2>

            <div className="space-y-6">
              {/* Step 1 - Complete */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                  <FileCheck className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-cosmic-white">Application Submitted</p>
                  <p className="text-xs text-cosmic-white/50 mt-1">
                    Your investor application and NDA have been received.
                  </p>
                </div>
                <span className="text-xs text-green-400">Complete</span>
              </div>

              {/* Step 2 - In Progress */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-cosmic-gold/20 flex items-center justify-center shrink-0 animate-pulse">
                  <Clock className="w-4 h-4 text-cosmic-gold" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-cosmic-white">Verification Review</p>
                  <p className="text-xs text-cosmic-white/50 mt-1">
                    Our team is reviewing your accreditation documentation.
                  </p>
                </div>
                <span className="text-xs text-cosmic-gold">In Progress</span>
              </div>

              {/* Step 3 - Pending */}
              <div className="flex items-start gap-4 opacity-50">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-cosmic-white/50" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-cosmic-white">Access Granted</p>
                  <p className="text-xs text-cosmic-white/50 mt-1">
                    Full dashboard access once verification is complete.
                  </p>
                </div>
                <span className="text-xs text-cosmic-white/50">Pending</span>
              </div>
            </div>
          </motion.div>

          {/* Additional Documents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Upload className="w-5 h-5 text-cosmic-gold" />
              <h2 className="font-heading text-sm tracking-wider text-cosmic-gold">
                Need to Upload Additional Documents?
              </h2>
            </div>

            <p className="text-sm text-cosmic-white/60 mb-6">
              If our verification team requests additional documentation, you can upload it here:
            </p>

            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-cosmic-gold/30 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-cosmic-white/30 mx-auto mb-3" />
              <p className="text-sm text-cosmic-white/50">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-xs text-cosmic-white/30 mt-2">
                Accepted: PDF, JPG, PNG (max 10MB)
              </p>
            </div>

            <div className="mt-4 p-4 bg-white/5 rounded-xl">
              <p className="text-xs text-cosmic-white/50 leading-relaxed">
                <span className="text-cosmic-white/70 font-medium">Accepted documents:</span> Tax returns (past 2 years),
                W-2 forms, bank/brokerage statements, CPA letter, attorney verification letter,
                or third-party verification service confirmation.
              </p>
            </div>
          </motion.div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 mb-8"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-amber-400 mb-2">Important Notice</h3>
                <p className="text-xs text-cosmic-white/60 leading-relaxed">
                  Until your accredited investor status is verified, you will not have access to the investor
                  dashboard, offering documents, or financial information. This is required by SEC regulations
                  to ensure compliance with Rule 506(c) of Regulation D.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-8"
          >
            <h2 className="font-heading text-sm tracking-wider text-cosmic-gold mb-6">
              Need Assistance?
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="mailto:investors@spaceburial.com"
                className="flex items-center gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <Mail className="w-5 h-5 text-nebula-400" />
                <div>
                  <p className="text-sm text-cosmic-white">Email Support</p>
                  <p className="text-xs text-cosmic-white/50">investors@spaceburial.com</p>
                </div>
              </a>

              <a
                href="tel:+15551234567"
                className="flex items-center gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <Phone className="w-5 h-5 text-nebula-400" />
                <div>
                  <p className="text-sm text-cosmic-white">Phone Support</p>
                  <p className="text-xs text-cosmic-white/50">(555) 123-4567</p>
                </div>
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex justify-center">
              <Link href="/" className="btn-secondary text-sm">
                Return to Homepage
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
