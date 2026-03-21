"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const steps = [
  { num: "01", title: "Reserve", description: "Choose your memorial and secure your spot." },
  { num: "02", title: "Prepare", description: "We build a custom capsule for the mission." },
  { num: "03", title: "Launch", description: "Watch live as your tribute ascends." },
  { num: "04", title: "Track", description: "Follow the journey forever." },
];

export default function HowItWorksPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 sm:py-36 px-6 bg-space-800/50">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-center mb-20"
        >
          How It Works
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="text-center"
            >
              <span className="block font-heading text-3xl sm:text-4xl text-nebula-400/30 mb-3">
                {step.num}
              </span>
              <h3 className="font-heading text-sm tracking-[0.15em] uppercase mb-2">
                {step.title}
              </h3>
              <p className="text-cosmic-white/40 text-xs sm:text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Link href="/how-it-works" className="text-sm text-cosmic-gold hover:text-cosmic-gold/80 transition-colors font-heading tracking-wider uppercase">
            Learn more about the process
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
