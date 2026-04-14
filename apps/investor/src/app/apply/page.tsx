"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import StarField from "@/components/shared/StarField";
import SECDisclaimer from "@/components/shared/SECDisclaimer";
import { User, Building, AlertCircle, ArrowRight } from "lucide-react";

type EntityType = "individual" | "trust" | "llc" | "corporation";

export default function ApplyPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    entityType: "individual" as EntityType,
    selfCertified: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.selfCertified) {
      setError("You must certify that you believe you qualify as an accredited investor.");
      return;
    }

    setLoading(true);
    setError("");

    // Store form data in session storage for next steps
    sessionStorage.setItem("investorApplication", JSON.stringify(formData));

    // Navigate to verification step
    router.push("/apply/verify");
  };

  return (
    <>
      <StarField />
      <div className="relative z-10 min-h-screen px-6 pt-32 pb-16">
        <div className="max-w-2xl mx-auto">
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
                      i === 0
                        ? "bg-cosmic-gold text-space-900"
                        : "bg-white/10 text-cosmic-white/50"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span className={`text-xs hidden sm:block ${i === 0 ? "text-cosmic-gold" : "text-cosmic-white/50"}`}>
                    {step}
                  </span>
                  {i < 3 && <div className="w-8 h-px bg-white/20" />}
                </div>
              ))}
            </div>

            <div className="text-center mb-8">
              <h1 className="font-heading text-3xl tracking-wider mb-4">
                REQUEST INVESTOR ACCESS
              </h1>
              <p className="text-cosmic-white/60">
                Step 1: Tell us about yourself
              </p>
            </div>

            <SECDisclaimer variant="inline" />

            <form onSubmit={handleSubmit} className="glass-card p-8 mt-8 space-y-6">
              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-xl">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                  Full Legal Name *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cosmic-white/30" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-cosmic-gold transition-colors"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-cosmic-gold transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-cosmic-gold transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                  Entity Type *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "individual", label: "Individual", icon: User },
                    { value: "trust", label: "Trust", icon: Building },
                    { value: "llc", label: "LLC", icon: Building },
                    { value: "corporation", label: "Corporation", icon: Building },
                  ].map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, entityType: type.value as EntityType })}
                      className={`flex items-center gap-2 p-3 rounded-xl border transition-colors ${
                        formData.entityType === type.value
                          ? "bg-cosmic-gold/20 border-cosmic-gold text-cosmic-gold"
                          : "bg-white/5 border-white/10 text-cosmic-white/70 hover:border-white/30"
                      }`}
                    >
                      <type.icon className="w-4 h-4" />
                      <span className="text-sm">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Self-Certification */}
              <div className="bg-cosmic-gold/10 border border-cosmic-gold/30 rounded-xl p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.selfCertified}
                    onChange={(e) => setFormData({ ...formData, selfCertified: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-cosmic-gold/50 bg-transparent text-cosmic-gold focus:ring-cosmic-gold"
                  />
                  <span className="text-xs text-cosmic-white/70 leading-relaxed">
                    I certify that I believe I may qualify as an accredited investor as
                    defined under SEC Rule 501(a). I understand this is not a commitment
                    to invest and that I will need to verify my accreditation status.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !formData.selfCertified}
                className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? "Continuing..." : "Continue to Verification"}
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-xs text-cosmic-white/40 text-center">
                Your information is kept confidential and used only for investor verification.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
}
