"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import StarField from "@/components/shared/StarField";
import { FileText, AlertCircle, CheckCircle, Shield, CreditCard, ExternalLink, DollarSign } from "lucide-react";
import { useContent } from "@/components/providers/ContentProvider";

export default function InvestorSignup() {
  const router = useRouter();
  const { content } = useContent();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get NDA text from content store
  const ndaText = content.ndaText || "";

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

  // Step 3: Investment amount
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const investmentTiers = [
    { amount: 10000, label: "$10,000", shares: "1,000 shares" },
    { amount: 25000, label: "$25,000", shares: "2,500 shares" },
    { amount: 50000, label: "$50,000", shares: "5,000 shares" },
    { amount: 100000, label: "$100,000", shares: "10,000 shares" },
  ];

  // Stripe payment link - replace with your actual Stripe payment link
  const stripePaymentLink = "https://buy.stripe.com/test_yourlink";

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

  const handleStep2Submit = (e: React.FormEvent) => {
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

    setStep(3);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!investmentAmount) {
      setError("Please select an investment amount");
      return;
    }

    if (!paymentConfirmed) {
      setError("Please confirm your payment method");
      return;
    }

    setLoading(true);

    // Mock signup - in production, call API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Redirect to success page
    router.push("/investor/signup/success");
  };

  const handleStripePayment = () => {
    // Open Stripe payment link in new tab
    // In production, you'd pass the selected amount as a parameter
    window.open(`${stripePaymentLink}?amount=${investmentAmount}`, "_blank");
    setPaymentConfirmed(true);
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
              className={`w-12 h-0.5 ${
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
            <div
              className={`w-12 h-0.5 ${
                step >= 3 ? "bg-cosmic-gold" : "bg-white/10"
              }`}
            />
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-heading ${
                step >= 3
                  ? "bg-cosmic-gold text-space-black"
                  : "bg-white/10 text-cosmic-white/50"
              }`}
            >
              3
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
                  onSubmit={handleStep2Submit}
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
                    {ndaText}
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
                      disabled={!ndaScrolled || !agreedToTerms}
                      className="w-full flex-1 py-3 px-6 rounded-xl font-heading tracking-wider text-sm bg-gradient-to-r from-cosmic-gold to-yellow-500 text-space-black hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      Continue to Investment
                    </button>
                  </div>
                </form>
              </>
            )}

            {step === 3 && (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-cosmic-gold/20 flex items-center justify-center">
                    <DollarSign className="w-8 h-8 text-cosmic-gold" />
                  </div>
                  <h1 className="font-heading text-2xl tracking-wider mb-2">
                    Investment Amount
                  </h1>
                  <p className="text-cosmic-white/50 text-sm">
                    Select your investment tier and complete payment
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

                  {/* Investment Tiers */}
                  <div className="space-y-3">
                    <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-3">
                      Select Investment Amount
                    </label>
                    {investmentTiers.map((tier) => (
                      <button
                        key={tier.amount}
                        type="button"
                        onClick={() => {
                          setInvestmentAmount(tier.amount.toString());
                          setPaymentConfirmed(false);
                        }}
                        className={`w-full p-4 rounded-xl border transition-all text-left ${
                          investmentAmount === tier.amount.toString()
                            ? "border-cosmic-gold bg-cosmic-gold/10"
                            : "border-white/10 bg-white/5 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-heading text-xl text-cosmic-white">
                              {tier.label}
                            </span>
                            <p className="text-sm text-cosmic-white/50 mt-1">
                              {tier.shares}
                            </p>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              investmentAmount === tier.amount.toString()
                                ? "border-cosmic-gold"
                                : "border-white/30"
                            }`}
                          >
                            {investmentAmount === tier.amount.toString() && (
                              <div className="w-2.5 h-2.5 rounded-full bg-cosmic-gold" />
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div>
                    <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                      Or Enter Custom Amount (Min. $10,000)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cosmic-white/50">
                        $
                      </span>
                      <input
                        type="number"
                        min="10000"
                        step="1000"
                        value={investmentAmount}
                        onChange={(e) => {
                          setInvestmentAmount(e.target.value);
                          setPaymentConfirmed(false);
                        }}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-cosmic-gold/50 transition-colors"
                        placeholder="10000"
                      />
                    </div>
                  </div>

                  {/* Stripe Payment Button */}
                  {investmentAmount && parseInt(investmentAmount) >= 10000 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="border-t border-white/10 pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-cosmic-white/70">Investment Amount:</span>
                          <span className="font-heading text-2xl text-cosmic-gold">
                            ${parseInt(investmentAmount).toLocaleString()}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={handleStripePayment}
                          className={`w-full py-4 px-6 rounded-xl font-heading tracking-wider text-sm flex items-center justify-center gap-3 transition-all ${
                            paymentConfirmed
                              ? "bg-green-500/20 border border-green-500/30 text-green-400"
                              : "bg-[#635BFF] hover:bg-[#5851ea] text-white"
                          }`}
                        >
                          {paymentConfirmed ? (
                            <>
                              <CheckCircle className="w-5 h-5" />
                              Payment Link Opened
                            </>
                          ) : (
                            <>
                              <CreditCard className="w-5 h-5" />
                              Pay with Stripe
                              <ExternalLink className="w-4 h-4" />
                            </>
                          )}
                        </button>

                        {paymentConfirmed && (
                          <p className="text-xs text-cosmic-white/50 mt-3 text-center">
                            Complete your payment in the Stripe window, then click Submit below
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Payment confirmation checkbox */}
                  {investmentAmount && parseInt(investmentAmount) >= 10000 && (
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={paymentConfirmed}
                        onChange={(e) => setPaymentConfirmed(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-cosmic-gold focus:ring-cosmic-gold"
                      />
                      <span className="text-sm text-cosmic-white/70">
                        I have completed my payment through Stripe or will complete wire transfer
                        within 5 business days.
                      </span>
                    </label>
                  )}

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="btn-secondary flex-1"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !investmentAmount || parseInt(investmentAmount) < 10000 || !paymentConfirmed}
                      className="w-full flex-1 py-3 px-6 rounded-xl font-heading tracking-wider text-sm bg-gradient-to-r from-cosmic-gold to-yellow-500 text-space-black hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {loading ? "Submitting..." : "Complete Application"}
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
