"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import StarField from "@/components/shared/StarField";
import { Rocket, Infinity, Check, CreditCard } from "lucide-react";

const packages = [
  { id: "rocket", name: "Rocket Memorial", price: 3800, icon: Rocket },
  { id: "immortal", name: "Immortal Memorial", price: 3800, icon: Infinity },
];

export default function CheckoutPage() {
  const [selected, setSelected] = useState("rocket");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <StarField />
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 text-center max-w-md"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
              <Check className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="font-heading text-2xl tracking-wider mb-4">Reservation Confirmed</h2>
            <p className="text-cosmic-white/60 text-sm leading-relaxed">
              Thank you. We&apos;ll be in touch within 24 hours with next steps.
              Your loved one&apos;s journey to the stars begins now.
            </p>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <StarField />
      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-heading font-black mb-4">
              Reserve Your <span className="text-gradient">Memorial</span>
            </h1>
            <p className="text-cosmic-white/60 text-sm">
              Select your package and provide your details to secure your reservation.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Package Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setSelected(pkg.id)}
                  className={`glass-card p-6 text-left transition-all ${
                    selected === pkg.id ? "glow-border border-nebula-400/50" : "hover:border-white/20"
                  }`}
                >
                  <pkg.icon className={`w-8 h-8 mb-3 ${selected === pkg.id ? "text-cosmic-gold" : "text-cosmic-white/30"}`} />
                  <h3 className="font-heading text-sm tracking-wider mb-1">{pkg.name}</h3>
                  <p className="font-heading text-2xl text-cosmic-gold">${pkg.price.toLocaleString()}</p>
                </button>
              ))}
            </div>

            {/* Contact Details */}
            <div className="glass-card p-8 space-y-6">
              <h3 className="font-heading text-sm tracking-wider text-cosmic-gold">Your Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
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
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                  Name of Honoree (optional)
                </label>
                <input
                  type="text"
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
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500 transition-colors resize-none"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="glass-card p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-cosmic-white/40 text-xs">Total</p>
                <p className="font-heading text-3xl text-cosmic-gold">
                  ${packages.find((p) => p.id === selected)?.price.toLocaleString()}
                </p>
                <p className="text-cosmic-white/30 text-xs mt-1">
                  Payment details will be collected after reservation confirmation
                </p>
              </div>
              <button type="submit" className="btn-primary flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Complete Reservation
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
