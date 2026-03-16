"use client";

import { motion } from "framer-motion";
import StarField from "@/components/shared/StarField";
import PackagePreview from "@/components/home/PackagePreview";
import { Check } from "lucide-react";

const comparisonFeatures = [
  { feature: "Cremated remains launched to space", rocket: true, immortal: true },
  { feature: "Personalized flight certificate", rocket: true, immortal: true },
  { feature: "Live launch viewing invitation", rocket: true, immortal: true },
  { feature: "HD launch video", rocket: true, immortal: true },
  { feature: "Mission tracking & updates", rocket: true, immortal: true },
  { feature: "Custom memorial capsule", rocket: false, immortal: true },
  { feature: "Permanent orbital placement", rocket: false, immortal: true },
  { feature: "Digital memorial page", rocket: false, immortal: true },
  { feature: "Family ceremony coordination", rocket: false, immortal: true },
  { feature: "Lifetime tracking access", rocket: false, immortal: true },
];

export default function ServicesPage() {
  return (
    <>
      <StarField />
      <div className="relative z-10">
        {/* Hero */}
        <section className="pt-32 pb-16 px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-xs tracking-[0.3em] uppercase text-cosmic-gold mb-4"
          >
            Memorial Services
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-heading font-black mb-6"
          >
            Choose Your <span className="text-gradient">Tribute</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-cosmic-white/60 max-w-xl mx-auto"
          >
            Two memorial packages, each offering a unique way to honor a life among the stars.
          </motion.p>
        </section>

        {/* Reuse the package cards */}
        <PackagePreview />

        {/* Comparison Table */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl text-center mb-12 tracking-wider">
              Package Comparison
            </h2>
            <div className="glass-card overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 gap-4 p-6 border-b border-white/10 text-center">
                <div />
                <span className="font-heading text-sm tracking-wider text-cosmic-gold">Rocket</span>
                <span className="font-heading text-sm tracking-wider text-cosmic-gold">Immortal</span>
              </div>
              {/* Rows */}
              {comparisonFeatures.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-3 gap-4 p-4 text-sm ${
                    i % 2 === 0 ? "bg-white/[0.02]" : ""
                  }`}
                >
                  <span className="text-cosmic-white/70">{row.feature}</span>
                  <div className="text-center">
                    {row.rocket && <Check className="w-5 h-5 text-nebula-400 mx-auto" />}
                  </div>
                  <div className="text-center">
                    {row.immortal && <Check className="w-5 h-5 text-nebula-400 mx-auto" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
