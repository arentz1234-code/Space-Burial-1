"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import StarField from "@/components/shared/StarField";
import { CheckCircle, Mail, Clock, Shield, AlertTriangle } from "lucide-react";

export default function SignupSuccess() {
  return (
    <>
      <StarField />
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg"
        >
          <div className="glass-card p-10">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
            >
              <CheckCircle className="w-10 h-10 text-green-400" />
            </motion.div>

            <h1 className="font-heading text-2xl tracking-wider mb-4 text-center">
              Application Submitted
            </h1>

            <p className="text-cosmic-white/60 text-sm leading-relaxed mb-8 text-center">
              Thank you for your interest in investing with Space Burial. Your
              application has been received and is being processed.
            </p>

            {/* Verification Pending Notice */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-cosmic-gold/10 border border-cosmic-gold/30 rounded-xl p-5 mb-6"
            >
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-cosmic-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-heading tracking-wider text-cosmic-gold mb-2">
                    Verification In Progress
                  </p>
                  <p className="text-xs text-cosmic-white/60 leading-relaxed">
                    Per SEC Rule 506(c) requirements, we must verify your accredited
                    investor status before granting full access to the investor portal.
                    This process typically takes <strong className="text-cosmic-white/80">2-3 business days</strong>.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4 mb-8"
            >
              <h2 className="text-xs font-heading tracking-wider text-cosmic-white/50">
                WHAT HAPPENS NEXT
              </h2>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-cosmic-white">Application Received</p>
                    <p className="text-xs text-cosmic-white/40">Just now</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cosmic-gold/20 flex items-center justify-center shrink-0 animate-pulse">
                    <Shield className="w-3 h-3 text-cosmic-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-cosmic-white">Verification Review</p>
                    <p className="text-xs text-cosmic-white/40">2-3 business days</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-3 opacity-50">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-3 h-3 text-cosmic-white/50" />
                  </div>
                  <div>
                    <p className="text-sm text-cosmic-white">Access Granted</p>
                    <p className="text-xs text-cosmic-white/40">Email notification</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Email Confirmation */}
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3 mb-6">
              <Mail className="w-5 h-5 text-cosmic-gold shrink-0" />
              <p className="text-sm text-cosmic-white/70 text-left">
                Check your email for a confirmation message with additional details.
              </p>
            </div>

            {/* Important Notice */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-cosmic-white/60 leading-relaxed">
                  <span className="text-amber-400 font-medium">Important:</span> Until
                  verification is complete, you will have limited access to the investor
                  portal. Do not share any confidential information from this application
                  with third parties.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <Link
                href="/investor/verification-pending"
                className="btn-primary text-center"
              >
                Check Verification Status
              </Link>
              <Link
                href="/"
                className="btn-secondary text-center"
              >
                Return Home
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
