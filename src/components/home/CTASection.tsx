"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

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
        {/* Gradient orbs */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-nebula-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-stellar-400/15 rounded-full blur-[100px]" />
      </div>

      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Stars decoration */}
        <div className="flex justify-center gap-2 mb-8">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Star
                className="w-4 h-4 text-cosmic-gold"
                fill="currentColor"
              />
            </motion.div>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-7xl font-heading font-black mb-8 leading-tight"
        >
          <span className="block text-cosmic-white/90">The stars</span>
          <span className="block text-gradient">are waiting.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl text-cosmic-white/50 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Don&apos;t let their story end. Give them a memorial that will shine
          across the heavens for a thousand years.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/services"
            className="group btn-primary text-sm px-8 py-4 flex items-center gap-2"
          >
            Reserve Your Memorial
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="text-cosmic-white/50 hover:text-cosmic-gold transition-colors text-sm"
          >
            Have questions? Let&apos;s talk
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t border-white/5"
        >
          <p className="text-xs text-cosmic-white/30 tracking-wider uppercase mb-6">
            Trusted by families worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-cosmic-white/20">
            <span className="font-heading text-sm">500+ Memorials</span>
            <span className="font-heading text-sm">10+ Missions</span>
            <span className="font-heading text-sm">100% Success Rate</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
