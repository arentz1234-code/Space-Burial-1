"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Infinity, Heart, Sparkles, Users } from "lucide-react";

const values = [
  {
    icon: Infinity,
    title: "Eternal",
    description: "A tribute that orbits Earth forever — visible in the night sky for generations.",
  },
  {
    icon: Heart,
    title: "Personal",
    description: "We handle every detail with care. You focus on honoring their memory.",
  },
  {
    icon: Sparkles,
    title: "Meaningful",
    description: "Create a living memorial with photos, stories, and even their voice preserved forever.",
  },
];

const stats = [
  { value: "500+", label: "Families Served" },
  { value: "12", label: "Successful Missions" },
  { value: "100%", label: "Mission Success Rate" },
  { value: "24/7", label: "Family Support" },
];

export default function MissionStatement() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 sm:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-cosmic-gold font-heading text-sm tracking-[0.2em] uppercase mb-4">
            Why Space Burial
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-6">
            More Than a Memorial.{" "}
            <span className="text-gradient">A Legacy.</span>
          </h2>
          <p className="text-cosmic-white/50 max-w-2xl mx-auto">
            When words aren&apos;t enough, give them the universe. A space burial transforms
            grief into something beautiful — a permanent place among the stars.
          </p>
        </motion.div>

        {/* Value cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="glass-card p-8 text-center group hover:border-cosmic-gold/30 transition-colors"
              >
                <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-nebula-500/20 to-stellar-400/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-cosmic-gold" />
                </div>
                <h3 className="font-heading text-lg tracking-wider mb-3">
                  {value.title}
                </h3>
                <p className="text-cosmic-white/50 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass-card p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                className="text-center"
              >
                <p className="font-heading text-3xl sm:text-4xl text-cosmic-gold mb-1">
                  {stat.value}
                </p>
                <p className="text-cosmic-white/40 text-xs tracking-wider uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
          <p className="text-cosmic-white/30 text-[10px] text-center mt-6 leading-relaxed max-w-2xl mx-auto">
            *Statistics reflect cumulative data through our partner launch providers. &quot;Mission Success Rate&quot; refers to successful orbital insertion of memorial payloads on launches we have participated in. Past performance is not indicative of future results. Launch services are subject to technical, regulatory, and scheduling factors beyond our control. All services are provided in partnership with licensed commercial launch providers.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
