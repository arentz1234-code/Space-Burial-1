"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import StarField from "@/components/shared/StarField";
import { CheckCircle, Mail } from "lucide-react";

export default function SignupSuccess() {
  return (
    <>
      <StarField />
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center"
        >
          <div className="glass-card p-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
            >
              <CheckCircle className="w-10 h-10 text-green-400" />
            </motion.div>

            <h1 className="font-heading text-2xl tracking-wider mb-4">
              Application Submitted
            </h1>

            <p className="text-cosmic-white/60 text-sm leading-relaxed mb-8">
              Thank you for your interest in investing with Space Burial. Our
              team will review your application and NDA within 24-48 hours.
            </p>

            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3 mb-8">
              <Mail className="w-5 h-5 text-cosmic-gold shrink-0" />
              <p className="text-sm text-cosmic-white/70 text-left">
                You will receive a confirmation email with next steps.
              </p>
            </div>

            <Link href="/" className="btn-primary inline-block">
              Return Home
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
