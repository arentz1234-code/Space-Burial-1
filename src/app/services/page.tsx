"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import StarField from "@/components/shared/StarField";
import { getTiers, Tier } from "@/lib/tiers";
import { Check, Rocket, Sparkles, Video, Globe, Camera, Calendar, Award } from "lucide-react";

export default function ServicesPage() {
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
    <>
      <StarField />
      <div className="relative z-10">
        {/* Hero */}
        <section className="pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-xs tracking-[0.3em] uppercase text-cosmic-gold mb-4"
          >
            Memorial Service
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-heading font-black mb-4 sm:mb-6"
          >
            Your <span className="text-gradient">Eternal Journey</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-cosmic-white/60 max-w-xl mx-auto"
          >
            A complete celestial memorial experience. Honor your loved one with a journey among the stars.
          </motion.p>
        </section>

        {/* Main Package Card */}
        <section className="py-8 sm:py-12 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8 sm:p-12 border-2 border-cosmic-gold/30"
            >
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-cosmic-gold/20 flex items-center justify-center">
                  <Rocket className="w-10 h-10 text-cosmic-gold" />
                </div>
                <p className="text-xs tracking-[0.2em] uppercase text-cosmic-white/50 mb-2">
                  {tier.tagline}
                </p>
                <h2 className="font-heading text-3xl tracking-wider mb-4">{tier.name}</h2>
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span className="text-5xl font-heading text-cosmic-gold">
                    ${tier.price.toLocaleString()}
                  </span>
                </div>
                <p className="text-cosmic-white/60 text-sm max-w-lg mx-auto">
                  {tier.description}
                </p>
              </div>

              <div className="border-t border-white/10 pt-8">
                <h3 className="font-heading text-sm tracking-wider text-cosmic-gold mb-6 text-center">
                  Everything Included
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <Check className="w-5 h-5 mt-0.5 shrink-0 text-cosmic-gold" />
                      <span className="text-cosmic-white/70">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 text-center">
                <Link
                  href="/checkout"
                  className="inline-block w-full sm:w-auto px-12 py-4 rounded-xl font-heading tracking-wider text-sm bg-gradient-to-r from-cosmic-gold to-yellow-500 text-space-black hover:opacity-90 transition-opacity"
                >
                  Reserve Your Memorial
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="py-20 px-6 bg-gradient-to-b from-transparent via-nebula-500/5 to-transparent">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-2xl text-center mb-4 tracking-wider">
              The Complete Experience
            </h2>
            <p className="text-cosmic-white/50 text-center mb-12 max-w-2xl mx-auto">
              Every memorial includes these meaningful features
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-cosmic-gold/20 flex items-center justify-center">
                  <Rocket className="w-7 h-7 text-cosmic-gold" />
                </div>
                <h3 className="font-heading text-sm tracking-wider mb-2">Space Launch</h3>
                <p className="text-cosmic-white/50 text-sm">
                  Cremated remains launched to space aboard a real rocket with FAA-licensed providers.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-nebula-500/20 flex items-center justify-center">
                  <Globe className="w-7 h-7 text-nebula-400" />
                </div>
                <h3 className="font-heading text-sm tracking-wider mb-2">Digital Memorial</h3>
                <p className="text-cosmic-white/50 text-sm">
                  Beautiful memorial page with photos, memories, and mission tracking to share with family.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-stellar-400/20 flex items-center justify-center">
                  <Video className="w-7 h-7 text-stellar-400" />
                </div>
                <h3 className="font-heading text-sm tracking-wider mb-2">HD Launch Video</h3>
                <p className="text-cosmic-white/50 text-sm">
                  Professional video of the launch to treasure and share with loved ones forever.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-cosmic-gold/20 flex items-center justify-center">
                  <Award className="w-7 h-7 text-cosmic-gold" />
                </div>
                <h3 className="font-heading text-sm tracking-wider mb-2">Flight Certificate</h3>
                <p className="text-cosmic-white/50 text-sm">
                  Personalized certificate documenting your loved one&apos;s journey to the stars.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Additional Features */}
        <section className="py-12 sm:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 sm:p-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-nebula-500/20 flex items-center justify-center">
                    <Camera className="w-6 h-6 text-nebula-400" />
                  </div>
                  <h3 className="font-heading text-lg tracking-wider">Unlimited Photos</h3>
                </div>
                <p className="text-cosmic-white/60 text-sm leading-relaxed">
                  Upload unlimited photos to the memorial page. Create a beautiful gallery of memories
                  that family and friends can visit anytime.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 sm:p-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-stellar-400/20 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-stellar-400" />
                  </div>
                  <h3 className="font-heading text-lg tracking-wider">Mission Updates</h3>
                </div>
                <p className="text-cosmic-white/60 text-sm leading-relaxed">
                  Receive updates throughout the mission journey, from preparation to launch and beyond.
                  Track the memorial&apos;s path among the stars.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 sm:p-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-cosmic-gold/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-cosmic-gold" />
                  </div>
                  <h3 className="font-heading text-lg tracking-wider">Custom Capsule</h3>
                </div>
                <p className="text-cosmic-white/60 text-sm leading-relaxed">
                  Your loved one&apos;s remains are placed in a custom memorial capsule,
                  designed to withstand the journey to space.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 sm:p-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-nebula-500/20 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-nebula-400" />
                  </div>
                  <h3 className="font-heading text-lg tracking-wider">Lifetime Hosting</h3>
                </div>
                <p className="text-cosmic-white/60 text-sm leading-relaxed">
                  The digital memorial page is hosted forever. Family and friends can always
                  visit and add new memories.
                </p>
              </motion.div>
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
              Create an everlasting tribute among the stars for ${tier.price.toLocaleString()}.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/checkout" className="btn-primary px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base">
                Reserve Your Memorial
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
