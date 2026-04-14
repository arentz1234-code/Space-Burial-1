"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import StarField from "@/components/shared/StarField";
import { CheckCircle, Mail, Clock, FileText, ArrowRight } from "lucide-react";

export default function ApplicationSuccessPage() {
  return (
    <>
      <StarField />
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>

          <h1 className="font-heading text-3xl tracking-wider mb-4">
            APPLICATION SUBMITTED
          </h1>

          <p className="text-cosmic-white/70 mb-8">
            Thank you for your interest in investing with Space Burial. Your
            application has been received and is being reviewed by our team.
          </p>

          <div className="glass-card p-8 mb-8 text-left">
            <h2 className="font-heading text-lg tracking-wider mb-6 text-center">
              WHAT HAPPENS NEXT
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-stellar-500/20 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-stellar-400" />
                </div>
                <div>
                  <h3 className="font-heading text-sm tracking-wider mb-1">
                    Confirmation Email
                  </h3>
                  <p className="text-sm text-cosmic-white/60">
                    You&apos;ll receive a confirmation email with your application details
                    within a few minutes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-cosmic-gold/20 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-cosmic-gold" />
                </div>
                <div>
                  <h3 className="font-heading text-sm tracking-wider mb-1">
                    Verification Review
                  </h3>
                  <p className="text-sm text-cosmic-white/60">
                    Our team will review your accreditation verification within 2-3
                    business days. We may contact you if additional documentation is needed.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-nebula-500/20 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-nebula-400" />
                </div>
                <div>
                  <h3 className="font-heading text-sm tracking-wider mb-1">
                    Access Granted
                  </h3>
                  <p className="text-sm text-cosmic-white/60">
                    Once approved, you&apos;ll receive login credentials and access to
                    the full investor dashboard, offering documents, and investment portal.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Link href="/" className="btn-secondary inline-flex items-center gap-2">
              Return to Homepage
              <ArrowRight className="w-4 h-4" />
            </Link>

            <p className="text-xs text-cosmic-white/40">
              Questions? Contact us at investors@spaceburial.com
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
