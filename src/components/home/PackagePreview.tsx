"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Rocket, Check, ArrowRight, Sparkles } from "lucide-react";
import { getTiers, Tier } from "@/lib/tiers";

export default function PackagePreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [tier, setTier] = useState<Tier | null>(null);

  useEffect(() => {
    const tiers = getTiers();
    setTier(tiers[0] || null);

    const handleTiersUpdated = () => {
      const updatedTiers = getTiers();
      setTier(updatedTiers[0] || null);
    };
    window.addEventListener("tiers-updated", handleTiersUpdated);
    return () => window.removeEventListener("tiers-updated", handleTiersUpdated);
  }, []);

  if (!tier) return null;

  return (
    <section ref={ref} className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-space-900 via-space-800/50 to-space-900" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-nebula-500/20 to-stellar-500/20 flex items-center justify-center"
          >
            <Sparkles className="w-8 h-8 text-cosmic-gold" />
          </motion.div>

          <p className="font-heading text-[10px] sm:text-xs tracking-[0.3em] uppercase text-cosmic-gold mb-4">
            Memorial Service
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black mb-4">
            The <span className="text-gradient">Complete</span> Experience
          </h2>
          <p className="text-cosmic-white/50 max-w-xl mx-auto text-sm sm:text-base">
            Everything you need to honor your loved one among the stars
          </p>
        </motion.div>

        {/* Single Package Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 sm:p-12 border-2 border-cosmic-gold/30 hover:shadow-cosmic-gold/20 hover:shadow-2xl transition-all duration-500"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-2xl bg-cosmic-gold/20 flex items-center justify-center"
            >
              <Rocket className="w-10 h-10 sm:w-12 sm:h-12 text-cosmic-gold" />
            </motion.div>

            <h3 className="font-heading text-2xl sm:text-3xl tracking-wider mb-2 text-cosmic-gold">
              {tier.name}
            </h3>
            <p className="text-sm text-cosmic-white/40 mb-4">{tier.tagline}</p>

            <div className="mb-4">
              <span className="font-heading text-5xl sm:text-6xl text-cosmic-white">
                ${tier.price.toLocaleString()}
              </span>
              <p className="text-xs text-cosmic-white/40 mt-2">one-time payment</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-cosmic-white/60 text-sm sm:text-base leading-relaxed mb-8 text-center max-w-2xl mx-auto">
            {tier.description}
          </p>

          {/* Features Grid */}
          <div className="border-t border-white/10 pt-8 mb-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {tier.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="flex items-start gap-3 text-sm"
                >
                  <Check className="w-5 h-5 mt-0.5 shrink-0 text-cosmic-gold" />
                  <span className="text-cosmic-white/70">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-heading text-sm tracking-wider bg-gradient-to-r from-cosmic-gold to-yellow-500 text-space-black hover:shadow-lg hover:shadow-cosmic-gold/30 transition-all"
            >
              Reserve Your Memorial
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 sm:mt-16"
        >
          <p className="text-cosmic-white/40 text-sm mb-4">
            Have questions? We&apos;re here to help.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-cosmic-gold hover:text-cosmic-gold/80 transition-colors text-sm font-heading tracking-wider"
          >
            Schedule a free consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
