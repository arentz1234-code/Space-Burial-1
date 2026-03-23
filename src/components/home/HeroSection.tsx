"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dark space background (fallback while video loads) */}
      <div className="absolute inset-0 bg-space-900" />

      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/memorial.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-space-900/60 via-space-900/40 to-space-900" />

      {/* Purple glow effect */}
      <div className="absolute inset-0 bg-hero-glow" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-4xl sm:text-6xl md:text-8xl font-heading font-black leading-tight mb-10 sm:mb-14"
        >
          Send Your Legacy{" "}
          <span className="text-gradient">to the Stars</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/services" className="btn-primary">
            Explore Memorials
          </Link>
          <Link href="/how-it-works" className="btn-secondary">
            How It Works
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
