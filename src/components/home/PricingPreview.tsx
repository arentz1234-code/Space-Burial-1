"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { getTiers, Tier } from "@/lib/tiers";
import { Star, Rocket, Crown, Check, ArrowRight } from "lucide-react";

const tierIcons = {
  stardust: Star,
  voyager: Rocket,
  eternal: Crown,
};

const tierColors = {
  stardust: "from-nebula-500 to-nebula-600",
  voyager: "from-cosmic-gold to-yellow-500",
  eternal: "from-stellar-400 to-stellar-500",
};

export default function PricingPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [tiers, setTiers] = useState<Tier[]>([]);

  useEffect(() => {
    setTiers(getTiers());
  }, []);

  return (
    <section ref={ref} className="py-24 sm:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-cosmic-gold font-heading text-sm tracking-[0.2em] uppercase mb-4">
            Memorial Tiers
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4">
            Choose Their Legacy
          </h2>
          <p className="text-cosmic-white/50 max-w-xl mx-auto">
            Three tiers designed to honor every life. All include a real space launch.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => {
            const Icon = tierIcons[tier.id];
            const colorClass = tierColors[tier.id];
            const isHighlighted = tier.highlighted;

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15 }}
                className={`relative glass-card p-8 ${
                  isHighlighted ? "border-cosmic-gold/50 scale-105 md:scale-110" : ""
                }`}
              >
                {isHighlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-cosmic-gold text-space-black text-xs font-heading tracking-wider px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br ${colorClass} p-0.5`}>
                  <div className="w-full h-full rounded-2xl bg-space-900 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                <h3 className="font-heading text-xl tracking-wider mb-1">{tier.name}</h3>
                <p className="text-cosmic-white/40 text-sm mb-4">{tier.tagline}</p>

                <div className="mb-6">
                  <span className="font-heading text-4xl text-cosmic-gold">
                    ${tier.price.toLocaleString()}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.slice(0, 4).map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-cosmic-white/60">
                      <Check className="w-4 h-4 text-cosmic-gold shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {tier.features.length > 4 && (
                    <li className="text-sm text-cosmic-white/40">
                      + {tier.features.length - 4} more features
                    </li>
                  )}
                </ul>

                <Link
                  href={`/checkout?tier=${tier.id}`}
                  className={`block w-full text-center py-3 px-6 rounded-xl font-heading tracking-wider text-sm transition-all ${
                    isHighlighted
                      ? "bg-gradient-to-r from-cosmic-gold to-yellow-500 text-space-black hover:opacity-90"
                      : "border border-white/20 text-cosmic-white hover:bg-white/5"
                  }`}
                >
                  Select {tier.name}
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-cosmic-gold hover:text-cosmic-gold/80 transition-colors font-heading tracking-wider text-sm group"
          >
            Compare All Features
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
