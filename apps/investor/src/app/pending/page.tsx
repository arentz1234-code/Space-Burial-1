"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import StarField from "@/components/shared/StarField";
import { Clock, Shield, Mail, ArrowRight } from "lucide-react";

export default function VerificationPendingPage() {
  return (
    <>
      <StarField />
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-cosmic-gold/20 flex items-center justify-center">
            <Clock className="w-10 h-10 text-cosmic-gold animate-pulse" />
          </div>

          <h1 className="font-heading text-3xl tracking-wider mb-4">
            VERIFICATION IN PROGRESS
          </h1>

          <p className="text-cosmic-white/70 mb-8">
            Your accredited investor verification is currently being reviewed.
            This process typically takes 2-3 business days.
          </p>

          <div className="glass-card p-8 mb-8 text-left">
            <h2 className="font-heading text-lg tracking-wider mb-6 text-center">
              VERIFICATION STATUS
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-green-400">Application Received</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-cosmic-gold/10 border border-cosmic-gold/30 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-cosmic-gold/20 flex items-center justify-center animate-pulse">
                  <Clock className="w-4 h-4 text-cosmic-gold" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-cosmic-gold">Verification Under Review</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl opacity-50">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-cosmic-white/50" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-cosmic-white/50">Dashboard Access Pending</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-cosmic-white/40 mt-6 text-center">
              You&apos;ll receive an email notification when your verification is complete.
            </p>
          </div>

          <div className="space-y-4">
            <Link href="/" className="btn-secondary inline-flex items-center gap-2">
              Return to Homepage
              <ArrowRight className="w-4 h-4" />
            </Link>

            <p className="text-xs text-cosmic-white/40">
              Questions about your verification? Contact investors@spaceburial.com
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
