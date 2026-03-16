"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6 relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-nebula-500/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-6xl font-heading font-black mb-8">
          Ready to Send Your Story{" "}
          <span className="text-gradient">to the Stars?</span>
        </h2>
        <p className="text-cosmic-white/60 text-lg mb-12 max-w-xl mx-auto">
          Begin your journey today. Reserve a memorial that will endure for generations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/services" className="btn-primary text-sm">
            View Memorials
          </Link>
          <Link href="/contact" className="btn-secondary text-sm">
            Speak With Us
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
