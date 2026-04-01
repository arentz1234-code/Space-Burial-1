"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { getTiers, Tier } from "@/lib/tiers";
import { Rocket, Check, ArrowRight } from "lucide-react";

export default function PricingPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [tier, setTier] = useState<Tier | null>(null);

  useEffect(() => {
    const tiers = getTiers();
    setTier(tiers[0] || null);
  }, []);

  if (!tier) return null;

  return (
    <section ref={ref} className="py-24 sm:py-36 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <p className="text-cosmic-gold font-heading text-sm tracking-[0.2em] uppercase mb-4">
            Memorial Service
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4">
            Honor Their Legacy
          </h2>
          <p className="text-cosmic-white/50 max-w-xl mx-auto">
            A complete celestial memorial experience with everything included.
          </p>
        </motion.div>

        {/* Single Package Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 sm:p-10 border-2 border-cosmic-gold/30"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            {/* Left side - Icon and Title */}
            <div className="text-center md:text-left md:flex-1">
              <div className="w-16 h-16 mb-4 mx-auto md:mx-0 rounded-2xl bg-gradient-to-br from-cosmic-gold to-yellow-500 p-0.5">
                <div className="w-full h-full rounded-2xl bg-space-900 flex items-center justify-center">
                  <Rocket className="w-8 h-8 text-cosmic-gold" />
                </div>
              </div>

              <h3 className="font-heading text-2xl tracking-wider mb-1">{tier.name}</h3>
              <p className="text-cosmic-white/40 text-sm mb-4">{tier.tagline}</p>

              <div className="mb-4">
                <span className="font-heading text-5xl text-cosmic-gold">
                  ${tier.price.toLocaleString()}
                </span>
                <p className="text-xs text-cosmic-white/40 mt-1">one-time payment</p>
              </div>

              <Link
                href="/checkout"
                className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 rounded-xl font-heading tracking-wider text-sm bg-gradient-to-r from-cosmic-gold to-yellow-500 text-space-black hover:opacity-90 transition-all"
              >
                Reserve Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right side - Features */}
            <div className="md:flex-1 md:border-l md:border-white/10 md:pl-8">
              <p className="text-xs font-heading tracking-wider text-cosmic-white/50 mb-4">
                EVERYTHING INCLUDED
              </p>
              <ul className="space-y-3">
                {tier.features.slice(0, 6).map((feature, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-cosmic-white/60">
                    <Check className="w-4 h-4 text-cosmic-gold shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
                {tier.features.length > 6 && (
                  <li className="text-sm text-cosmic-white/40">
                    + {tier.features.length - 6} more features
                  </li>
                )}
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-cosmic-gold hover:text-cosmic-gold/80 transition-colors font-heading tracking-wider text-sm group"
          >
            View Full Details
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
