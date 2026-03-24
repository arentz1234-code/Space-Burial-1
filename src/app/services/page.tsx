"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import StarField from "@/components/shared/StarField";
import { getTiers, Tier } from "@/lib/tiers";
import { Check, Star, Rocket, Sparkles, Crown, MessageCircle, Video } from "lucide-react";

const tierIcons = {
  stardust: Star,
  voyager: Rocket,
  eternal: Crown,
};

const comparisonFeatures = [
  { feature: "Cremated remains launched to space", stardust: true, voyager: true, eternal: true },
  { feature: "Digital memorial page", stardust: true, voyager: true, eternal: true },
  { feature: "Photo gallery", stardust: "20 photos", voyager: "50 photos", eternal: "Unlimited" },
  { feature: "Written memories & testimonials", stardust: true, voyager: true, eternal: true },
  { feature: "HD launch video", stardust: true, voyager: true, eternal: true },
  { feature: "Mission tracking updates", stardust: true, voyager: true, eternal: true },
  { feature: "VIP live launch viewing", stardust: false, voyager: true, eternal: true },
  { feature: "Video memorial slideshow", stardust: false, voyager: true, eternal: true },
  { feature: "Family ceremony coordination", stardust: false, voyager: true, eternal: true },
  { feature: "Custom capsule engraving", stardust: false, voyager: true, eternal: true },
  { feature: "Physical star map keepsake", stardust: false, voyager: true, eternal: true },
  { feature: "Digital Voice AI companion", stardust: false, voyager: false, eternal: true },
  { feature: "Interactive memorial chat", stardust: false, voyager: false, eternal: true },
  { feature: "Premium memorial design", stardust: false, voyager: false, eternal: true },
  { feature: "Dedicated mission liaison", stardust: false, voyager: false, eternal: true },
];

export default function ServicesPage() {
  const [tiers, setTiers] = useState<Tier[]>(getTiers());

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

  return (
    <>
      <StarField />
      <div className="relative z-10">
        {/* Hero */}
        <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-xs tracking-[0.3em] uppercase text-cosmic-gold mb-4"
          >
            Memorial Packages
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-heading font-black mb-4 sm:mb-6"
          >
            Choose Your <span className="text-gradient">Legacy</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-cosmic-white/60 max-w-xl mx-auto"
          >
            Three memorial tiers, each offering a unique way to honor a life among the stars.
            Select the journey that feels right for your loved one.
          </motion.p>
        </section>

        {/* Tier Cards */}
        <section className="py-8 sm:py-12 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {tiers.map((tier, i) => {
                const Icon = tierIcons[tier.id];
                return (
                  <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className={`relative glass-card p-5 sm:p-8 flex flex-col ${
                      tier.highlighted
                        ? "border-2 border-cosmic-gold/50 glow-border"
                        : "border border-white/10"
                    }`}
                  >
                    {tier.highlighted && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="bg-cosmic-gold text-space-black text-xs font-heading tracking-wider px-4 py-1 rounded-full">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <div
                        className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                          tier.id === "eternal"
                            ? "bg-gradient-to-br from-stellar-400/30 to-nebula-500/30"
                            : tier.id === "voyager"
                            ? "bg-cosmic-gold/20"
                            : "bg-nebula-500/20"
                        }`}
                      >
                        <Icon
                          className={`w-8 h-8 ${
                            tier.id === "eternal"
                              ? "text-stellar-400"
                              : tier.id === "voyager"
                              ? "text-cosmic-gold"
                              : "text-nebula-400"
                          }`}
                        />
                      </div>
                      <p className="text-xs tracking-[0.2em] uppercase text-cosmic-white/50 mb-1">
                        {tier.tagline}
                      </p>
                      <h2 className="font-heading text-2xl tracking-wider mb-2">{tier.name}</h2>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-heading text-cosmic-gold">
                          ${tier.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <p className="text-cosmic-white/60 text-sm text-center mb-6 leading-relaxed">
                      {tier.description}
                    </p>

                    <div className="flex-1">
                      <ul className="space-y-3 mb-8">
                        {tier.features.map((feature, fi) => (
                          <li key={fi} className="flex items-start gap-3 text-sm">
                            <Check
                              className={`w-4 h-4 mt-0.5 shrink-0 ${
                                tier.id === "eternal"
                                  ? "text-stellar-400"
                                  : tier.id === "voyager"
                                  ? "text-cosmic-gold"
                                  : "text-nebula-400"
                              }`}
                            />
                            <span className="text-cosmic-white/70">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={`/checkout?tier=${tier.id}`}
                      className={`w-full py-4 rounded-xl font-heading tracking-wider text-sm text-center transition-all ${
                        tier.highlighted
                          ? "bg-gradient-to-r from-cosmic-gold to-yellow-500 text-space-black hover:opacity-90"
                          : "bg-white/10 text-cosmic-white hover:bg-white/20"
                      }`}
                    >
                      Select {tier.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="py-20 px-6 bg-gradient-to-b from-transparent via-nebula-500/5 to-transparent">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-2xl text-center mb-4 tracking-wider">
              Featured Experiences
            </h2>
            <p className="text-cosmic-white/50 text-center mb-12 max-w-2xl mx-auto">
              Discover the unique features that make each tier special
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-nebula-500/20 flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-nebula-400" />
                </div>
                <h3 className="font-heading text-sm tracking-wider mb-2">Digital Memorial</h3>
                <p className="text-cosmic-white/50 text-sm">
                  A beautiful, shareable memorial page with photos, memories, and mission tracking.
                  Available in all tiers.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6 text-center border border-cosmic-gold/20"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-cosmic-gold/20 flex items-center justify-center">
                  <Video className="w-7 h-7 text-cosmic-gold" />
                </div>
                <h3 className="font-heading text-sm tracking-wider mb-2">VIP Launch Experience</h3>
                <p className="text-cosmic-white/50 text-sm">
                  Live virtual launch viewing, video memorial slideshow, and family ceremony
                  coordination. Voyager & Eternal.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6 text-center border border-stellar-400/20"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-stellar-400/20 flex items-center justify-center">
                  <MessageCircle className="w-7 h-7 text-stellar-400" />
                </div>
                <h3 className="font-heading text-sm tracking-wider mb-2">Digital Voice</h3>
                <p className="text-cosmic-white/50 text-sm">
                  AI-powered conversations that let visitors talk with your loved one&apos;s memory.
                  Exclusive to Eternal.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-12 sm:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-xl sm:text-2xl text-center mb-8 sm:mb-12 tracking-wider">
              Complete Comparison
            </h2>

            {/* Desktop Table */}
            <div className="hidden md:block glass-card overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-4 gap-4 p-6 border-b border-white/10 text-center">
                <div className="text-left">
                  <span className="text-xs text-cosmic-white/50 uppercase tracking-wider">
                    Feature
                  </span>
                </div>
                <div>
                  <span className="font-heading text-sm tracking-wider text-nebula-400">
                    {tiers.find(t => t.id === "stardust")?.name || "Stardust"}
                  </span>
                  <p className="text-xs text-cosmic-white/40">${tiers.find(t => t.id === "stardust")?.price.toLocaleString()}</p>
                </div>
                <div>
                  <span className="font-heading text-sm tracking-wider text-cosmic-gold">
                    {tiers.find(t => t.id === "voyager")?.name || "Voyager"}
                  </span>
                  <p className="text-xs text-cosmic-white/40">${tiers.find(t => t.id === "voyager")?.price.toLocaleString()}</p>
                </div>
                <div>
                  <span className="font-heading text-sm tracking-wider text-stellar-400">
                    {tiers.find(t => t.id === "eternal")?.name || "Eternal"}
                  </span>
                  <p className="text-xs text-cosmic-white/40">${tiers.find(t => t.id === "eternal")?.price.toLocaleString()}</p>
                </div>
              </div>
              {/* Rows */}
              {comparisonFeatures.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-4 gap-4 p-4 text-sm ${
                    i % 2 === 0 ? "bg-white/[0.02]" : ""
                  }`}
                >
                  <span className="text-cosmic-white/70">{row.feature}</span>
                  <div className="text-center">
                    {typeof row.stardust === "string" ? (
                      <span className="text-cosmic-white/50 text-xs">{row.stardust}</span>
                    ) : row.stardust ? (
                      <Check className="w-5 h-5 text-nebula-400 mx-auto" />
                    ) : (
                      <span className="text-cosmic-white/20">—</span>
                    )}
                  </div>
                  <div className="text-center">
                    {typeof row.voyager === "string" ? (
                      <span className="text-cosmic-white/50 text-xs">{row.voyager}</span>
                    ) : row.voyager ? (
                      <Check className="w-5 h-5 text-cosmic-gold mx-auto" />
                    ) : (
                      <span className="text-cosmic-white/20">—</span>
                    )}
                  </div>
                  <div className="text-center">
                    {typeof row.eternal === "string" ? (
                      <span className="text-cosmic-white/50 text-xs">{row.eternal}</span>
                    ) : row.eternal ? (
                      <Check className="w-5 h-5 text-stellar-400 mx-auto" />
                    ) : (
                      <span className="text-cosmic-white/20">—</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {comparisonFeatures.map((row) => (
                <div key={row.feature} className="glass-card p-3 sm:p-4">
                  <p className="text-xs sm:text-sm font-medium text-cosmic-white mb-2 sm:mb-3">{row.feature}</p>
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center">
                    <div className="bg-white/5 rounded-lg py-2 px-1">
                      <p className="text-[9px] sm:text-[10px] text-nebula-400 font-heading tracking-wider mb-1">Star</p>
                      {typeof row.stardust === "string" ? (
                        <span className="text-cosmic-white/50 text-[9px] sm:text-[10px]">{row.stardust}</span>
                      ) : row.stardust ? (
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-nebula-400 mx-auto" />
                      ) : (
                        <span className="text-cosmic-white/20 text-xs">—</span>
                      )}
                    </div>
                    <div className="bg-white/5 rounded-lg py-2 px-1">
                      <p className="text-[9px] sm:text-[10px] text-cosmic-gold font-heading tracking-wider mb-1">Voy</p>
                      {typeof row.voyager === "string" ? (
                        <span className="text-cosmic-white/50 text-[9px] sm:text-[10px]">{row.voyager}</span>
                      ) : row.voyager ? (
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cosmic-gold mx-auto" />
                      ) : (
                        <span className="text-cosmic-white/20 text-xs">—</span>
                      )}
                    </div>
                    <div className="bg-white/5 rounded-lg py-2 px-1">
                      <p className="text-[9px] sm:text-[10px] text-stellar-400 font-heading tracking-wider mb-1">Eter</p>
                      {typeof row.eternal === "string" ? (
                        <span className="text-cosmic-white/50 text-[9px] sm:text-[10px]">{row.eternal}</span>
                      ) : row.eternal ? (
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stellar-400 mx-auto" />
                      ) : (
                        <span className="text-cosmic-white/20 text-xs">—</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 sm:py-20 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-2xl sm:text-3xl tracking-wider mb-3 sm:mb-4">
              Ready to Begin?
            </h2>
            <p className="text-cosmic-white/50 text-sm sm:text-base mb-6 sm:mb-8">
              Choose your memorial tier and create an everlasting tribute among the stars.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/checkout?tier=voyager" className="btn-primary px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base">
                Get Started
              </Link>
              <Link href="/contact" className="btn-secondary px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base">
                Talk to Our Team
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
