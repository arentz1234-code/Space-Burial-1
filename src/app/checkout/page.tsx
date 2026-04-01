"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import StarField from "@/components/shared/StarField";
import { getTiers, Tier, TierLevel, setUserTier } from "@/lib/tiers";
import { addUser } from "@/lib/user-store";
import { Check, CreditCard, Rocket, Loader2, Shield, CheckCircle, ExternalLink } from "lucide-react";

function CheckoutLoading() {
  return (
    <>
      <StarField />
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-cosmic-gold animate-spin mx-auto mb-4" />
          <p className="text-cosmic-white/60 text-sm">Loading checkout...</p>
        </div>
      </div>
    </>
  );
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [tiers, setTiers] = useState<Tier[]>(getTiers());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    honoreeName: "",
    specialRequests: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  // Stripe payment link
  const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/9B66oG8jL2mvdcFcrzeUU00";

  useEffect(() => {
    // Load tiers on client side
    setTiers(getTiers());

    // Listen for tier updates from admin CMS
    const handleTiersUpdated = () => {
      setTiers(getTiers());
    };
    window.addEventListener("tiers-updated", handleTiersUpdated);
    return () => window.removeEventListener("tiers-updated", handleTiersUpdated);
  }, []);

  // Single tier - always use first (and only) tier
  const selectedTier = tiers[0];
  const selected: TierLevel = "memorial";

  // Suppress unused warning
  void searchParams;

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Move to payment step
    setStep(2);
  };

  const handlePaymentClick = () => {
    // Open Stripe payment link in new tab
    window.open(STRIPE_PAYMENT_LINK, "_blank");
  };

  const handleConfirmPayment = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      // Call signup API
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          honoreeName: formData.honoreeName,
          tier: selected,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create account");
        setIsSubmitting(false);
        return;
      }

      // Save the user to local store (for admin to see)
      addUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        role: "immortal",
        tier: selected,
        honoreeName: formData.honoreeName || undefined,
      });

      // Save the selected tier to localStorage
      setUserTier(selected);

      setPaymentComplete(true);

      // Redirect to dashboard after short delay
      setTimeout(() => {
        router.refresh();
        router.push("/immortal/dashboard");
      }, 2000);
    } catch {
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <StarField />
      <div className="relative z-10 pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-4 mb-8 sm:mb-12">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-heading text-sm ${
                step >= 1
                  ? "bg-cosmic-gold text-space-black"
                  : "bg-white/10 text-cosmic-white/50"
              }`}
            >
              1
            </div>
            <div
              className={`w-12 sm:w-16 h-0.5 ${
                step >= 2 ? "bg-cosmic-gold" : "bg-white/10"
              }`}
            />
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-heading text-sm ${
                step >= 2
                  ? "bg-cosmic-gold text-space-black"
                  : "bg-white/10 text-cosmic-white/50"
              }`}
            >
              2
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-2xl sm:text-4xl font-heading font-black mb-3 sm:mb-4">
              {step === 1 ? (
                <>Complete Your <span className="text-gradient">Reservation</span></>
              ) : (
                <>Secure <span className="text-gradient">Payment</span></>
              )}
            </h1>
            <p className="text-cosmic-white/60 text-xs sm:text-sm">
              {step === 1
                ? "Select your memorial tier and create your account to get started."
                : "Complete your payment to finalize your reservation."}
            </p>
          </motion.div>

          {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-8">
            {/* Package Overview */}
            {selectedTier && (
              <div className="glass-card p-6 sm:p-8 border-2 border-cosmic-gold/30">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-cosmic-gold/20 flex items-center justify-center">
                    <Rocket className="w-7 h-7 text-cosmic-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl tracking-wider">{selectedTier.name}</h3>
                    <p className="text-sm text-cosmic-white/50">{selectedTier.tagline}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="font-heading text-3xl text-cosmic-gold">
                      ${selectedTier.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-cosmic-white/70 mb-6">{selectedTier.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedTier.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 shrink-0 text-cosmic-gold" />
                      <span className="text-cosmic-white/70">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Details */}
            <div className="glass-card p-8 space-y-6">
              <h3 className="font-heading text-sm tracking-wider text-cosmic-gold">
                Create Your Account
              </h3>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500 transition-colors"
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
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500 transition-colors"
                    placeholder="Min 6 characters"
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
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                  Name of Honoree (optional)
                </label>
                <input
                  type="text"
                  value={formData.honoreeName}
                  onChange={(e) => setFormData({ ...formData, honoreeName: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500 transition-colors"
                  placeholder="If pre-arranging for yourself, leave blank"
                />
              </div>

              <div>
                <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                  Special Requests
                </label>
                <textarea
                  rows={3}
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500 transition-colors resize-none"
                />
              </div>
            </div>

            {/* Submit Step 1 */}
            <div className="glass-card p-4 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="text-center md:text-left w-full md:w-auto">
                <p className="text-cosmic-white/40 text-xs">Total for {selectedTier?.name}</p>
                <p className="font-heading text-2xl sm:text-3xl text-cosmic-gold">
                  ${selectedTier?.price.toLocaleString()}
                </p>
              </div>
              <button
                type="submit"
                className="btn-primary w-full md:w-auto flex items-center justify-center gap-2 py-3 sm:py-4"
              >
                <CreditCard className="w-4 h-4" />
                <span>Continue to Payment</span>
              </button>
            </div>
          </form>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              {/* Order Summary */}
              <div className="glass-card p-6 sm:p-8">
                <h3 className="font-heading text-sm tracking-wider text-cosmic-gold mb-6">
                  Order Summary
                </h3>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-cosmic-gold/20">
                      <Rocket className="w-6 h-6 text-cosmic-gold" />
                    </div>
                    <div>
                      <p className="font-heading tracking-wider">{selectedTier?.name}</p>
                      <p className="text-sm text-cosmic-white/50">{selectedTier?.tagline}</p>
                    </div>
                  </div>
                  <p className="font-heading text-xl text-cosmic-gold">
                    ${selectedTier?.price.toLocaleString()}
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between">
                  <p className="text-cosmic-white/50">Account</p>
                  <p className="text-sm">{formData.email}</p>
                </div>
              </div>

              {/* Payment Section */}
              <div className="glass-card p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cosmic-gold/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-cosmic-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm tracking-wider">Secure Payment</h3>
                    <p className="text-xs text-cosmic-white/50">Powered by Stripe</p>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm mb-6">
                    {error}
                  </div>
                )}

                {paymentComplete ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="font-heading text-xl tracking-wider mb-2">Payment Confirmed!</h3>
                    <p className="text-cosmic-white/50 text-sm">
                      Redirecting to your dashboard...
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <p className="text-sm text-cosmic-white/70 mb-6">
                      Click the button below to complete your payment securely through Stripe.
                      After payment, return here and click &quot;I&apos;ve Completed Payment&quot; to activate your account.
                    </p>

                    <div className="space-y-4">
                      <button
                        type="button"
                        onClick={handlePaymentClick}
                        className="w-full py-4 px-6 rounded-xl font-heading tracking-wider text-sm bg-gradient-to-r from-cosmic-gold to-yellow-500 text-space-black hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      >
                        <CreditCard className="w-5 h-5" />
                        Pay ${selectedTier?.price.toLocaleString()} with Stripe
                        <ExternalLink className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={handleConfirmPayment}
                        disabled={isSubmitting}
                        className="w-full py-4 px-6 rounded-xl font-heading tracking-wider text-sm border-2 border-green-500/50 text-green-400 hover:bg-green-500/10 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Confirming...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            I&apos;ve Completed Payment
                          </>
                        )}
                      </button>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-sm text-cosmic-white/50 hover:text-cosmic-white transition-colors"
                      >
                        &larr; Back to details
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutContent />
    </Suspense>
  );
}
