"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Props {
  label: string;
  title: string;
  highlight: string;
  subtitle?: string;
}

export default function SectionHeading({ label, title, highlight, subtitle }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      className="text-center mb-20"
    >
      <p className="font-heading text-xs tracking-[0.3em] uppercase text-cosmic-gold mb-4">
        {label}
      </p>
      <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
        {title} <span className="text-gradient">{highlight}</span>
      </h2>
      {subtitle && (
        <p className="text-cosmic-white/60 max-w-xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  );
}
