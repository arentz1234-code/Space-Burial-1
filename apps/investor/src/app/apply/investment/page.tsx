"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import StarField from "@/components/shared/StarField";
import SECDisclaimer from "@/components/shared/SECDisclaimer";
import { DollarSign, CheckCircle, ArrowRight, ArrowLeft, AlertCircle, CreditCard } from "lucide-react";

const investmentTiers = [
  { amount: 10000, label: "$10,000", description: "Minimum investment" },
  { amount: 25000, label: "$25,000", description: "Standard tier" },
  { amount: 50000, label: "$50,000", description: "Premium tier" },
  { amount: 100000, label: "$100,000+", description: "Strategic investor" },
];

export default function InvestmentPage() {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    // Check if we have the previous step data
    const stored = sessionStorage.getItem("investorApplication");
    if (!stored) {
      router.push("/apply");
    }
  }, [router]);

  const handleSubmit = async () => {
    const amount = selectedAmount === 100000 && customAmount
      ? parseInt(customAmount.replace(/,/g, ""))
      : selectedAmount;

    if (!amount || amount < 10000) {
      setError("Please select or enter an investment amount of at least $10,000.");
      return;
    }

    if (!accepted) {
      setError("You must accept the subscription agreement terms.");
      return;
    }

    setLoading(true);
    setError("");

    // Get all application data
    const stored = sessionStorage.getItem("investorApplication");
    if (!stored) {
      router.push("/apply");
      return;
    }

    const applicationData = JSON.parse(stored);
    applicationData.investmentAmount = amount;

    try {
      // Submit application to API
      const res = await fetch("/api/auth/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });

      const data = await res.json();

      if (res.ok) {
        // Clear session storage
        sessionStorage.removeItem("investorApplication");
        // Navigate to success page
        router.push("/apply/success");
      } else {
        setError(data.message || "Failed to submit application. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const formatCurrency = (value: string) => {
    const num = value.replace(/\D/g, "");
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
                      i <= 3
                        ? "bg-cosmic-gold text-space-900"
                        : "bg-white/10 text-cosmic-white/50"
                    }`}
                  >
                    {i < 3 ? <CheckCircle className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-xs hidden sm:block ${i === 3 ? "text-cosmic-gold" : "text-cosmic-white/50"}`}>
                    {step}
                  </span>
                  {i < 3 && <div className="w-8 h-px bg-white/20" />}
                </div>
              ))}
            </div>

            <div className="text-center mb-8">
              <h1 className="font-heading text-3xl tracking-wider mb-4">
                INVESTMENT AMOUNT
              </h1>
              <p className="text-cosmic-white/60">
                Step 4: Select your investment amount
              </p>
            </div>

            <div className="glass-card p-8 mb-8">
              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-xl mb-6">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <h2 className="font-heading text-lg tracking-wider mb-6">
                SELECT INVESTMENT TIER
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {investmentTiers.map((tier) => (
                  <button
                    key={tier.amount}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(tier.amount);
                      if (tier.amount !== 100000) {
                        setCustomAmount("");
                      }
                    }}
                    className={`text-left p-4 rounded-xl border transition-colors ${
                      selectedAmount === tier.amount
                        ? "bg-cosmic-gold/20 border-cosmic-gold"
                        : "bg-white/5 border-white/10 hover:border-white/30"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className={`w-5 h-5 ${selectedAmount === tier.amount ? "text-cosmic-gold" : "text-cosmic-white/50"}`} />
                      <span className={`font-heading text-xl ${selectedAmount === tier.amount ? "text-cosmic-gold" : "text-cosmic-white"}`}>
                        {tier.label}
                      </span>
                    </div>
                    <p className="text-xs text-cosmic-white/50">{tier.description}</p>
                  </button>
                ))}
              </div>

              {/* Custom Amount for $100k+ tier */}
              {selectedAmount === 100000 && (
                <div className="mb-8">
                  <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                    CUSTOM AMOUNT (OPTIONAL)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cosmic-white/50">$</span>
                    <input
                      type="text"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(formatCurrency(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-lg text-cosmic-white focus:outline-none focus:border-cosmic-gold transition-colors"
                      placeholder="Enter custom amount"
                    />
                  </div>
                </div>
              )}

              {/* Payment Method Notice */}
              <div className="bg-stellar-500/10 border border-stellar-500/30 rounded-xl p-4 mb-8">
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-stellar-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-cosmic-white/80 mb-1">
                      Payment Options
                    </p>
                    <p className="text-xs text-cosmic-white/50">
                      After your application is approved, you can fund your investment via
                      ACH transfer, wire transfer, or credit card through our secure payment
                      partner.
                    </p>
                  </div>
                </div>
              </div>

              {/* Subscription Agreement Acceptance */}
              <div className="bg-cosmic-gold/10 border border-cosmic-gold/30 rounded-xl p-4 mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-cosmic-gold/50 bg-transparent text-cosmic-gold focus:ring-cosmic-gold"
                  />
                  <span className="text-xs text-cosmic-white/70 leading-relaxed">
                    I understand this is an application to invest, not a commitment.
                    Upon approval, I will receive the Private Placement Memorandum and
                    Subscription Agreement for review. I acknowledge that I have read and
                    understood all risk disclosures and that this investment involves
                    significant risk, including the possible loss of my entire investment.
                  </span>
                </label>
              </div>

              <SECDisclaimer variant="minimal" />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => router.push("/apply/nda")}
                className="btn-secondary flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selectedAmount || !accepted || loading}
                className="btn-gold flex-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? "Submitting Application..." : "Submit Application"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
