"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const values = [
  {
    title: "Eternal",
    description: "A tribute beyond the boundaries of Earth.",
  },
  {
    title: "Accessible",
    description: "No hidden fees.",
  },
  {
    title: "Personal",
    description: "We handle everything. You focus on family.",
  },
];

export default function MissionStatement() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 sm:py-36 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-center mb-20"
        >
          The Space Memorial Company
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-12">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="text-center"
            >
              <h3 className="font-heading text-cosmic-gold text-sm tracking-[0.2em] uppercase mb-3">
                {value.title}
              </h3>
              <p className="text-cosmic-white/50 text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
