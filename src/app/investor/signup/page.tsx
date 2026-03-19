"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import StarField from "@/components/shared/StarField";
import { FileText, AlertCircle, CheckCircle, Shield } from "lucide-react";
import { NDA_TEXT } from "@/lib/mock-users";

export default function InvestorSignup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1: Personal info
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accredited: false,
  });

  // Step 2: NDA signature
  const [ndaScrolled, setNdaScrolled] = useState(false);
  const [signature, setSignature] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const scrolledToBottom =
      target.scrollHeight - target.scrollTop <= target.clientHeight + 50;
    if (scrolledToBottom) {
      setNdaScrolled(true);
    }
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.accredited) {
      setError("You must be an accredited investor to continue");
      return;
    }

    setStep(2);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!ndaScrolled) {
      setError("Please read the entire NDA before signing");
      return;
    }

    if (signature.trim().toLowerCase() !== formData.name.trim().toLowerCase()) {
      setError("Signature must match your full legal name");
      return;
    }

    if (!agreedToTerms) {
      setError("You must agree to the terms to continue");
      return;
    }

    setLoading(true);

    // Mock signup - in production, call API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Redirect to success page
    router.push("/investor/signup/success");
  };

  return (
    <>
      <StarField />
      <div className="relative z-10 min-h-screen py-24 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-heading ${
                step >= 1
                  ? "bg-cosmic-gold text-space-black"
                  : "bg-white/10 text-cosmic-white/50"
              }`}
            >
              1
            </div>
            <div
              className={`w-16 h-0.5 ${
                step >= 2 ? "bg-cosmic-gold" : "bg-white/10"
              }`}
            />
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-heading ${
                step >= 2
                  ? "bg-cosmic-gold text-space-black"
                  : "bg-white/10 text-cosmic-white/50"
              }`}
            >
              2
            </div>
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {step === 1 && (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-cosmic-gold/20 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-cosmic-gold" />
                  </div>
                  <h1 className="font-heading text-2xl tracking-wider mb-2">
                    Investor Application
                  </h1>
                  <p className="text-cosmic-white/50 text-sm">
                    Join Space Burial as an accredited investor
                  </p>
                </div>

                <form
                  onSubmit={handleStep1Submit}
                  className="glass-card p-8 space-y-6"
                >
                  {error && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-xl">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-cosmic-gold/50 transition-colors"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-cosmic-gold/50 transition-colors"
                      placeholder="investor@example.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-cosmic-gold/50 transition-colors"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-cosmic-gold/50 transition-colors"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.accredited}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            accredited: e.target.checked,
                          })
                        }
                        className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-cosmic-gold focus:ring-cosmic-gold"
                      />
                      <span className="text-sm text-cosmic-white/70">
                        I certify that I am an{" "}
                        <span className="text-cosmic-gold">
                          accredited investor
                        </span>{" "}
                        as defined by SEC Rule 501 of Regulation D (net worth
                        exceeding $1M or income exceeding $200K).
                      </span>
                    </label>
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    Continue to NDA
                  </button>
                </form>
              </>
            )}

            {step === 2 && (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-cosmic-gold/20 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-cosmic-gold" />
                  </div>
                  <h1 className="font-heading text-2xl tracking-wider mb-2">
                    Non-Disclosure Agreement
                  </h1>
                  <p className="text-cosmic-white/50 text-sm">
                    Please read and sign the NDA to continue
                  </p>
                </div>

                <form
                  onSubmit={handleFinalSubmit}
                  className="glass-card p-8 space-y-6"
                >
                  {error && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-xl">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {error}
                    </div>
                  )}

                  {/* NDA Text */}
                  <div
                    onScroll={handleScroll}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 h-64 overflow-y-auto text-sm text-cosmic-white/70 leading-relaxed whitespace-pre-wrap"
                  >
                    {NDA_TEXT}
                  </div>

                  {ndaScrolled && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-green-400 text-sm"
                    >
                      <CheckCircle className="w-4 h-4" />
                      NDA read - you may now sign below
                    </motion.div>
                  )}

                  {/* Signature field */}
                  <div>
                    <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                      Type Your Full Legal Name to Sign
                    </label>
                    <input
                      type="text"
                      required
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      disabled={!ndaScrolled}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-cosmic-gold/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-serif italic"
                      placeholder={
                        ndaScrolled
                          ? formData.name
                          : "Scroll to read entire NDA first"
                      }
                    />
                    <p className="text-xs text-cosmic-white/30 mt-2">
                      Must match: {formData.name}
                    </p>
                  </div>

                  {/* Terms checkbox */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      disabled={!ndaScrolled}
                      className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-cosmic-gold focus:ring-cosmic-gold disabled:opacity-50"
                    />
                    <span className="text-sm text-cosmic-white/70">
                      I acknowledge that by typing my name above, I am providing
                      my electronic signature, which is legally binding and
                      equivalent to a handwritten signature.
                    </span>
                  </label>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn-secondary flex-1"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !ndaScrolled || !agreedToTerms}
                      className="w-full flex-1 py-3 px-6 rounded-xl font-heading tracking-wider text-sm bg-gradient-to-r from-cosmic-gold to-yellow-500 text-space-black hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {loading ? "Submitting..." : "Sign & Submit"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
