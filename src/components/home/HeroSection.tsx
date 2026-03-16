"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dark space background */}
      <div className="absolute inset-0 bg-space-900" />

      {/* Spinning Earth */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          animate={{ rotateY: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="relative w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] opacity-60"
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
        <div className="absolute inset-0 rounded-full bg-stellar-400/20 blur-3xl scale-110" />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-space-900/70 via-space-900/50 to-space-900" />

      {/* Purple glow effect */}
      <div className="absolute inset-0 bg-hero-glow" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pt-24 sm:pt-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-heading text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-cosmic-gold mb-4 sm:mb-6"
        >
          The Ultimate Tribute
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl sm:text-5xl md:text-7xl font-heading font-black leading-tight mb-6 sm:mb-8"
        >
          Send Your Legacy{" "}
          <span className="text-gradient">to the Stars</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-cosmic-white/70 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2"
        >
          Imagine your loved one&apos;s ashes among the stars — forever part of
          the universe. A celestial farewell that celebrates life, passion,
          and memory for generations to come.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/services" className="btn-primary">
            Explore Memorials
          </Link>
          <Link href="/how-it-works" className="btn-secondary">
            How It Works
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-cosmic-white/20 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-cosmic-gold rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
