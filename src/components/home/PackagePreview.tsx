"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Star, Rocket, Crown, Check, ArrowRight, Sparkles } from "lucide-react";
import { getTiers, Tier, TierLevel } from "@/lib/tiers";

const tierIcons: Record<TierLevel, React.ElementType> = {
  stardust: Star,
  voyager: Rocket,
  eternal: Crown,
};

const tierColors: Record<TierLevel, { bg: string; text: string; border: string; glow: string }> = {
  stardust: {
    bg: "bg-nebula-500/20",
    text: "text-nebula-400",
    border: "border-nebula-500/30",
    glow: "hover:shadow-nebula-500/20",
  },
  voyager: {
    bg: "bg-cosmic-gold/20",
    text: "text-cosmic-gold",
    border: "border-cosmic-gold/30",
    glow: "hover:shadow-cosmic-gold/20",
  },
  eternal: {
    bg: "bg-stellar-400/20",
    text: "text-stellar-400",
    border: "border-stellar-400/30",
    glow: "hover:shadow-stellar-400/20",
  },
};

export default function PackagePreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [tiers, setTiers] = useState<Tier[]>([]);

  useEffect(() => {
    setTiers(getTiers());

    const handleTiersUpdated = () => {
      setTiers(getTiers());
    };
    window.addEventListener("tiers-updated", handleTiersUpdated);
    return () => window.removeEventListener("tiers-updated", handleTiersUpdated);
  }, []);

  return (
    <section ref={ref} className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-space-900 via-space-800/50 to-space-900" />

      <div className="relative z-10 max-w-7xl mx-auto">
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
            Memorial Packages
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black mb-4">
            Choose Your <span className="text-gradient">Tribute</span>
          </h2>
          <p className="text-cosmic-white/50 max-w-xl mx-auto text-sm sm:text-base">
            Three meaningful ways to honor your loved one among the stars
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, i) => {
            const IconComponent = tierIcons[tier.id];
            const colors = tierColors[tier.id];
            const isPopular = tier.highlighted;

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.15 }}
                className={`relative glass-card p-6 sm:p-8 flex flex-col transition-all duration-500 hover:scale-[1.02] ${colors.glow} hover:shadow-2xl ${
                  isPopular ? `border-2 ${colors.border} ring-1 ring-cosmic-gold/20` : "border border-white/10"
                }`}
              >
                {/* Popular badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-cosmic-gold to-yellow-500 text-space-black text-[10px] sm:text-xs font-heading tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-6">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-2xl ${colors.bg} flex items-center justify-center`}
                  >
                    <IconComponent className={`w-8 h-8 sm:w-10 sm:h-10 ${colors.text}`} />
                  </motion.div>

                  <h3 className={`font-heading text-xl sm:text-2xl tracking-wider mb-1 ${colors.text}`}>
                    {tier.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-cosmic-white/40">{tier.tagline}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-6 pb-6 border-b border-white/10">
                  <span className="font-heading text-4xl sm:text-5xl text-cosmic-white">
                    ${tier.price.toLocaleString()}
                  </span>
                  <p className="text-xs text-cosmic-white/40 mt-1">one-time payment</p>
                </div>

                {/* Description */}
                <p className="text-cosmic-white/60 text-sm leading-relaxed mb-6 text-center">
                  {tier.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.slice(0, 6).map((feature, fi) => (
                    <motion.li
                      key={fi}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.1 + fi * 0.05 }}
                      className="flex items-start gap-3 text-sm"
                    >
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${colors.text}`} />
                      <span className="text-cosmic-white/70">{feature}</span>
                    </motion.li>
                  ))}
                  {tier.features.length > 6 && (
                    <li className="text-xs text-cosmic-white/40 pl-7">
                      +{tier.features.length - 6} more features
                    </li>
                  )}
                </ul>

                {/* CTA Button */}
                <Link
                  href={`/checkout?tier=${tier.id}`}
                  className={`w-full py-3 sm:py-4 rounded-xl font-heading text-sm tracking-wider flex items-center justify-center gap-2 transition-all ${
                    isPopular
                      ? "bg-gradient-to-r from-cosmic-gold to-yellow-500 text-space-black hover:shadow-lg hover:shadow-cosmic-gold/30"
                      : `${colors.bg} ${colors.text} border ${colors.border} hover:bg-opacity-30`
                  }`}
                >
                  Select {tier.name}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 sm:mt-16"
        >
          <p className="text-cosmic-white/40 text-sm mb-4">
            Not sure which package is right? We're here to help.
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
