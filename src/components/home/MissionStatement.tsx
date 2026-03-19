"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Clock, Infinity } from "lucide-react";

export default function MissionStatement() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  return (
    <section ref={containerRef} className="relative py-32 sm:py-48 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-nebula-500/10 rounded-full blur-[150px]" />

      <motion.div style={{ opacity, scale }} className="relative z-10 max-w-5xl mx-auto">
        {/* The Contrast */}
        <div ref={textRef} className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cosmic-white/20" />
            <Clock className="w-5 h-5 text-cosmic-white/30" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cosmic-white/20" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-6xl font-heading font-black leading-tight mb-8"
          >
            <span className="text-cosmic-white/40 block mb-2">Death is imminent.</span>
            <span className="text-gradient block">Immortality is forever.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg sm:text-xl text-cosmic-white/50 max-w-3xl mx-auto leading-relaxed"
          >
            We cannot escape our mortality. But we can choose how we&apos;re remembered.
            A space burial transforms the end into a beginning — a journey among the stars
            that will continue for millennia.
          </motion.p>
        </div>

        {/* Three Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {[
            {
              icon: Sparkles,
              title: "Beyond Earth",
              stat: "∞",
              description:
                "Your remains orbit Earth or voyage into deep space — a presence in the cosmos for generations uncounted.",
            },
            {
              icon: Clock,
              title: "Against Time",
              stat: "1000+",
              unit: "years",
              description:
                "While earthly memorials decay, your celestial tribute endures for over a thousand years in orbit.",
            },
            {
              icon: Infinity,
              title: "Into Eternity",
              stat: "8B",
              unit: "miles",
              description:
                "Deep space memorials travel billions of miles, becoming humanity's farthest-reaching monuments.",
            },
          ].map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.2 }}
              className="text-center group"
            >
              <div className="relative mb-8">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-nebula-500/20 to-stellar-500/20 flex items-center justify-center group-hover:from-nebula-500/40 group-hover:to-stellar-500/40 transition-all duration-500">
                  <pillar.icon className="w-10 h-10 text-nebula-400" />
                </div>
                <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full bg-nebula-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="mb-4">
                <span className="font-heading text-4xl sm:text-5xl text-gradient">{pillar.stat}</span>
                {pillar.unit && (
                  <span className="text-cosmic-white/40 text-sm ml-1">{pillar.unit}</span>
                )}
              </div>

              <h3 className="font-heading text-sm tracking-[0.2em] uppercase text-cosmic-gold mb-4">
                {pillar.title}
              </h3>

              <p className="text-cosmic-white/50 text-sm leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
