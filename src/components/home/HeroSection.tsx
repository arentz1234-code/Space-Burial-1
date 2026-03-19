"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section ref={ref} className="relative min-h-[200vh]">
      {/* Fixed hero that fades on scroll */}
      <motion.div
        style={{ opacity }}
        className="fixed inset-0 flex items-center justify-center overflow-hidden"
      >
        {/* Dark space background */}
        <div className="absolute inset-0 bg-space-900" />

        {/* Spinning Earth */}
        <motion.div
          style={{ scale }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            animate={{ rotateY: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            className="relative w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] lg:w-[900px] lg:h-[900px] opacity-50"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Image
              src="/images/earth-from-space.jpg"
              alt="Earth"
              fill
              className="object-cover rounded-full"
              priority
            />
          </motion.div>
          {/* Earth glow */}
          <div className="absolute inset-0 rounded-full bg-stellar-400/30 blur-[100px] scale-125" />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-space-900/80 via-space-900/40 to-space-900" />
        <div className="absolute inset-0 bg-hero-glow opacity-60" />

        {/* Content */}
        <motion.div style={{ y }} className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
          {/* Dramatic opening */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="mb-8"
          >
            <p className="font-heading text-[10px] sm:text-xs tracking-[0.4em] uppercase text-cosmic-white/40 mb-6">
              Life is fleeting
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-4xl sm:text-6xl md:text-8xl font-heading font-black leading-[0.9] mb-8"
          >
            <span className="block text-cosmic-white/90">Legacy</span>
            <span className="block text-gradient mt-2">Is Forever</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-lg sm:text-xl md:text-2xl text-cosmic-white/60 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
          >
            When our time ends, the stars remain. Send your loved one on an eternal journey through the cosmos —
            a memorial that will outlast generations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/services" className="btn-primary text-sm px-8 py-4">
              Begin the Journey
            </Link>
            <Link href="/how-it-works" className="btn-secondary text-sm px-8 py-4">
              Learn More
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="absolute -bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs tracking-widest uppercase text-cosmic-white/30">Discover</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6 text-cosmic-gold/50" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Spacer for scroll effect */}
      <div className="h-screen" />
    </section>
  );
}
