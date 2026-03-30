"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

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
      <div className="absolute inset-0 bg-gradient-to-b from-space-900/70 via-space-900/50 to-space-900" />

      {/* Purple glow effect */}
      <div className="absolute inset-0 bg-hero-glow" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-cosmic-white/70 font-heading tracking-wider">
            NEXT MISSION: SPRING 2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-heading font-black leading-tight mb-4 sm:mb-6"
        >
          Send Your Legacy{" "}
          <span className="text-gradient">to the Stars</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8 sm:mt-10"
        >
          <Link href="/checkout" className="btn-primary text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4">
            Reserve Your Memorial
          </Link>
          <Link href="/how-it-works" className="btn-secondary text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4">
            See How It Works
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cosmic-white/40 hover:text-cosmic-white/70 transition-colors cursor-pointer"
      >
        <span className="text-xs font-heading tracking-wider">EXPLORE</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
