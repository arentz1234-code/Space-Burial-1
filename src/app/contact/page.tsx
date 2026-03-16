"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import StarField from "@/components/shared/StarField";
import { Send, Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: POST to /api/contact
    setSubmitted(true);
  };

  return (
    <>
      <StarField />
      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <p className="font-heading text-xs tracking-[0.3em] uppercase text-cosmic-gold mb-4">
              Get in Touch
            </p>
            <h1 className="text-5xl md:text-6xl font-heading font-black mb-6">
              Contact <span className="text-gradient">Us</span>
            </h1>
            <p className="text-cosmic-white/60 max-w-xl mx-auto">
              Have questions about our memorial services? We&apos;re here to help during every step.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              {[
                { icon: Phone, label: "Phone", value: "1-800-555-1234" },
                { icon: Mail, label: "Email", value: "info@spaceburial.com" },
                { icon: MapPin, label: "Location", value: "United States" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-nebula-500/20 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-nebula-400" />
                  </div>
                  <div>
                    <p className="font-heading text-xs tracking-wider text-cosmic-gold">{item.label}</p>
                    <p className="text-cosmic-white/70 text-sm mt-1">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card p-12 text-center"
                >
                  <Send className="w-12 h-12 text-nebula-400 mx-auto mb-4" />
                  <h3 className="font-heading text-xl tracking-wider mb-2">Message Sent</h3>
                  <p className="text-cosmic-white/60 text-sm">
                    We&apos;ll be in touch within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white placeholder-white/20 focus:outline-none focus:border-nebula-500 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white placeholder-white/20 focus:outline-none focus:border-nebula-500 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white placeholder-white/20 focus:outline-none focus:border-nebula-500 transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white placeholder-white/20 focus:outline-none focus:border-nebula-500 transition-colors resize-none"
                      placeholder="Tell us about yourself or your loved one..."
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
