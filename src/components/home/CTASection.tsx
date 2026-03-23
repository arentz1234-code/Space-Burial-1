"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

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
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-cosmic-gold font-heading text-sm tracking-[0.2em] uppercase mb-6"
        >
          Begin Their Journey
        </motion.p>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-bold mb-6">
          The stars are waiting.
        </h2>
        <p className="text-cosmic-white/50 text-lg mb-10 max-w-2xl mx-auto">
          Give them the universe. Reserve their place among the stars today,
          or speak with our caring team to learn more.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/checkout" className="btn-primary text-base px-8 py-4 flex items-center gap-2 group">
            Reserve a Memorial
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="tel:+18005551234"
            className="flex items-center gap-2 text-cosmic-white/60 hover:text-cosmic-white transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm">1-800-555-1234</span>
          </a>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 pt-10 border-t border-white/5"
        >
          <p className="text-cosmic-white/30 text-xs tracking-wider uppercase mb-4">
            Trusted By Families Nationwide
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-cosmic-white/20">
            <span className="font-heading text-sm tracking-wider">NASA Certified</span>
            <span className="font-heading text-sm tracking-wider">BBB Accredited</span>
            <span className="font-heading text-sm tracking-wider">Licensed & Insured</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
