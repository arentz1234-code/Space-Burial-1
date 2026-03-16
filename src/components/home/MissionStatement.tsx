"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Globe, Heart } from "lucide-react";

const features = [
  {
    icon: Star,
    title: "Eternal Legacy",
    description: "Your memory becomes part of the cosmos — a tribute that transcends time and space.",
  },
  {
    icon: Globe,
    title: "Best Pricing in the Galaxy",
    description: "Starting at $3,800, we offer the most accessible space memorial services available.",
  },
  {
    icon: Heart,
    title: "More Than a Farewell",
    description: "A celebration of life that honors scientists, dreamers, explorers, and everyone in between.",
  },
];

export default function MissionStatement() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-heading text-xs tracking-[0.3em] uppercase text-nebula-400 mb-4">
            Why Space Burial
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Imagineering Your <span className="text-gradient">Immortality</span>
          </h2>
          <p className="text-cosmic-white/60 max-w-2xl mx-auto">
            A final journey that keeps your memory alive for generations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="glass-card p-8 text-center group hover:glow-border transition-all duration-500"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-nebula-500/20 to-stellar-500/20 flex items-center justify-center group-hover:from-nebula-500/40 group-hover:to-stellar-500/40 transition-all">
                <feature.icon className="w-8 h-8 text-nebula-400" />
              </div>
              <h3 className="font-heading text-lg tracking-wider mb-4">{feature.title}</h3>
              <p className="text-cosmic-white/50 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
