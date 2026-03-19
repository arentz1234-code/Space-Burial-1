"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Rocket } from "lucide-react";

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

        {/* Earth Container - centered */}
        <motion.div
          style={{ scale }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          {/* Spinning Earth */}
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

          {/* Rocket launching FROM Earth's surface */}
          <motion.div
            initial={{
              x: "10%",
              y: "15%",
              scale: 0.5,
              opacity: 0
            }}
            animate={{
              x: ["10%", "40%", "120%", "250%", "400%"],
              y: ["15%", "-20%", "-80%", "-180%", "-300%"],
              scale: [0.5, 0.8, 1, 1, 0.8],
              opacity: [0, 1, 1, 1, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatDelay: 4,
              ease: [0.25, 0.1, 0.25, 1],
              times: [0, 0.2, 0.5, 0.8, 1],
            }}
            className="absolute z-10"
            style={{ top: "35%", left: "25%" }}
          >
            {/* Rocket body */}
            <div className="relative">
              <motion.div
                animate={{ rotate: [0, -2, 2, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-cosmic-white via-cosmic-white/90 to-cosmic-white/70 rounded-full flex items-center justify-center shadow-2xl"
              >
                <Rocket className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-space-black -rotate-45" />
              </motion.div>

              {/* Inner glow */}
              <div className="absolute inset-0 bg-cosmic-gold/40 rounded-full blur-md" />

              {/* Rocket flame - main */}
              <motion.div
                animate={{
                  scaleY: [1, 1.5, 1.2, 1.6, 1],
                  scaleX: [1, 0.8, 1.1, 0.9, 1],
                }}
                transition={{
                  duration: 0.08,
                  repeat: Infinity,
                }}
                className="absolute top-full left-1/2 -translate-x-1/2 origin-top"
              >
                <div className="w-4 h-14 sm:w-5 sm:h-18 md:w-6 md:h-20 bg-gradient-to-b from-white via-cosmic-gold via-30% via-orange-500 via-60% to-transparent rounded-full" />
              </motion.div>

              {/* Secondary flame - wider */}
              <motion.div
                animate={{
                  scaleY: [1.2, 0.9, 1.4, 1, 1.2],
                  opacity: [0.7, 0.5, 0.8, 0.6, 0.7],
                }}
                transition={{
                  duration: 0.06,
                  repeat: Infinity,
                }}
                className="absolute top-full left-1/2 -translate-x-1/2 origin-top"
              >
                <div className="w-8 h-12 sm:w-10 sm:h-16 md:w-12 md:h-18 bg-gradient-to-b from-cosmic-gold/60 via-orange-600/40 to-transparent rounded-full blur-[2px]" />
              </motion.div>

              {/* Outer engine glow */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1.1, 1.4, 1],
                  opacity: [0.6, 0.9, 0.7, 1, 0.6],
                }}
                transition={{
                  duration: 0.15,
                  repeat: Infinity,
                }}
                className="absolute -inset-3 bg-cosmic-gold/50 rounded-full blur-xl"
              />
            </div>
          </motion.div>

          {/* Launch smoke at Earth surface */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.6, 0.4, 0.2, 0],
              scale: [0.5, 2, 4, 6, 8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 8,
              ease: "easeOut",
            }}
            className="absolute z-5"
            style={{ top: "40%", left: "30%" }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-white/40 to-white/10 rounded-full blur-xl" />
          </motion.div>

          {/* Exhaust trail particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.5, 0.3, 0],
                scale: [0, 1, 1.5, 2],
                x: [0, i * 15, i * 30, i * 45],
                y: [0, -i * 20, -i * 45, -i * 70],
              }}
              transition={{
                duration: 3,
                delay: 0.5 + i * 0.3,
                repeat: Infinity,
                repeatDelay: 9,
                ease: "easeOut",
              }}
              className="absolute z-5"
              style={{ top: "38%", left: "28%" }}
            >
              <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-white/30 to-orange-500/10 rounded-full blur-md" />
            </motion.div>
          ))}
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
