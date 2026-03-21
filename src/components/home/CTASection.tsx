"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function CTASection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={ref} className="relative py-32 sm:py-48 px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-nebula-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-stellar-400/15 rounded-full blur-[100px]" />
      </div>

      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-10">
          The stars are waiting.
        </h2>
        <Link href="/services" className="btn-primary">
          Reserve a Memorial
        </Link>
      </motion.div>
    </section>
  );
}
