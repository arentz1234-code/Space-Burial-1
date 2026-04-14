"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import StarField from "@/components/shared/StarField";
import { FileText, CheckCircle, ArrowRight, ArrowLeft, AlertCircle } from "lucide-react";
import { NDA_TEXT } from "@/lib/auth";

export default function NDAPage() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [signature, setSignature] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if we have the previous step data
    const stored = sessionStorage.getItem("investorApplication");
    if (!stored) {
      router.push("/apply");
    }
  }, [router]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setHasScrolledToBottom(true);
      }
    }
  };

  const handleSubmit = () => {
    if (!signature.trim()) {
      setError("Please type your full legal name as your signature.");
      return;
    }

    if (!agreed) {
      setError("You must agree to the terms of the NDA.");
      return;
    }

    setLoading(true);
    setError("");

    // Store NDA data in session storage
    const stored = sessionStorage.getItem("investorApplication");
    if (stored) {
      const data = JSON.parse(stored);
      data.ndaSigned = true;
      data.ndaSignature = signature;
      data.ndaSignedAt = new Date().toISOString();
      sessionStorage.setItem("investorApplication", JSON.stringify(data));
    }

    // Navigate to investment step
    router.push("/apply/investment");
  };

  return (
    <>
      <StarField />
      <div className="relative z-10 min-h-screen px-6 pt-32 pb-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-12">
              {["Interest", "Verification", "NDA", "Investment"].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-heading ${
                      i <= 2
                        ? "bg-cosmic-gold text-space-900"
                        : "bg-white/10 text-cosmic-white/50"
                    }`}
                  >
                    {i < 2 ? <CheckCircle className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-xs hidden sm:block ${i === 2 ? "text-cosmic-gold" : "text-cosmic-white/50"}`}>
                    {step}
                  </span>
                  {i < 3 && <div className="w-8 h-px bg-white/20" />}
                </div>
              ))}
            </div>

            <div className="text-center mb-8">
              <h1 className="font-heading text-3xl tracking-wider mb-4">
                NON-DISCLOSURE AGREEMENT
              </h1>
              <p className="text-cosmic-white/60">
                Step 3: Review and sign the NDA
              </p>
            </div>

            <div className="glass-card p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 text-cosmic-gold" />
                <h2 className="font-heading text-lg tracking-wider">
                  CONFIDENTIALITY AGREEMENT
                </h2>
              </div>

              <p className="text-sm text-cosmic-white/60 mb-4">
                Please read the entire agreement. You must scroll to the bottom to enable signing.
              </p>

              {/* Scrollable NDA Text */}
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="bg-white/5 rounded-xl p-6 h-64 overflow-y-auto text-sm text-cosmic-white/80 leading-relaxed whitespace-pre-wrap"
              >
                {NDA_TEXT}
              </div>

              {!hasScrolledToBottom && (
                <p className="text-xs text-cosmic-gold mt-2 text-center animate-pulse">
                  Please scroll to read the entire agreement
                </p>
              )}
            </div>

            {/* Signature Section */}
            <div className="glass-card p-8 mb-8">
              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-xl mb-6">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <div className="mb-6">
                <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                  ELECTRONIC SIGNATURE
                </label>
                <p className="text-xs text-cosmic-white/40 mb-3">
                  Type your full legal name exactly as it appears on your ID to sign this agreement.
                </p>
                <input
                  type="text"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  disabled={!hasScrolledToBottom}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-lg text-cosmic-white font-body italic focus:outline-none focus:border-cosmic-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Your Full Legal Name"
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  disabled={!hasScrolledToBottom}
                  className="mt-1 w-4 h-4 rounded border-cosmic-gold/50 bg-transparent text-cosmic-gold focus:ring-cosmic-gold disabled:opacity-50"
                />
                <span className="text-xs text-cosmic-white/70 leading-relaxed">
                  I have read and understood the Non-Disclosure Agreement. By typing my
                  name above, I acknowledge that this constitutes my legally binding
                  electronic signature and I agree to be bound by the terms of this agreement.
                </span>
              </label>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => router.push("/apply/verify")}
                className="btn-secondary flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!hasScrolledToBottom || !signature || !agreed || loading}
                className="btn-gold flex-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? "Processing..." : "Sign and Continue"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
