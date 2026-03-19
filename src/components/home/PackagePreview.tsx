"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Rocket, Infinity } from "lucide-react";
import { useContent } from "@/components/providers/ContentProvider";

const iconMap: Record<string, React.ElementType> = {
  rocket: Rocket,
  immortal: Infinity,
};

export default function PackagePreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useContent();

  return (
    <section ref={ref} className="py-16 sm:py-32 px-4 sm:px-6 bg-space-800/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12 sm:mb-20"
        >
          <p className="font-heading text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-cosmic-gold mb-3 sm:mb-4">
            Memorial Packages
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold">
            Choose Your <span className="text-gradient">Tribute</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {content.packages.map((pkg, i) => {
            const IconComponent = iconMap[pkg.id] || Rocket;
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.2 }}
                className="glass-card p-6 sm:p-10 group hover:glow-border transition-all duration-500 flex flex-col"
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-nebula-500/30 to-stellar-500/30 flex items-center justify-center shrink-0">
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-cosmic-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl tracking-wider">{pkg.name}</h3>
                    <p className="text-xs sm:text-sm text-cosmic-white/40">{pkg.tagline}</p>
                  </div>
                </div>

                <p className="text-cosmic-white/60 text-sm leading-relaxed mb-6 sm:mb-8">
                  {pkg.description}
                </p>

                <ul className="space-y-2 sm:space-y-3 mb-8 sm:mb-10 flex-1">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-cosmic-white/70">
                      <span className="w-1.5 h-1.5 mt-1.5 sm:mt-2 bg-nebula-400 rounded-full shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between gap-4">
                  <span className="font-heading text-2xl sm:text-3xl text-cosmic-gold">
                    ${pkg.price.toLocaleString()}
                  </span>
                  <Link href="/checkout" className="btn-primary text-xs whitespace-nowrap">
                    Reserve
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
