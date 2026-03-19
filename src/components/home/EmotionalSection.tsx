"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const words = [
  { text: "Remember", delay: 0 },
  { text: "the moments", delay: 0.1 },
  { text: "that made them", delay: 0.2 },
  { text: "who they were.", delay: 0.3 },
];

export default function EmotionalSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-space-900"
    >
      {/* Parallax star field */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0"
      >
        {/* Stars */}
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              transform: `scale(${Math.random() * 1.5 + 0.5})`,
            }}
          />
        ))}
      </motion.div>

      {/* Nebula glow */}
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-nebula-500/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 -left-1/4 w-[400px] h-[400px] bg-stellar-400/20 rounded-full blur-[100px]" />

      {/* Content */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Emotional quote */}
        <div className="space-y-4 mb-16">
          {words.map((word, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: word.delay }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-heading font-light text-cosmic-white/80"
            >
              {word.text}
            </motion.p>
          ))}
        </div>

        {/* The message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <p className="text-lg sm:text-xl text-cosmic-white/50 leading-relaxed max-w-2xl mx-auto">
            The laugh that filled a room. The wisdom they shared. The love they gave.
            These moments deserve more than a stone in the ground.
          </p>

          <p className="text-xl sm:text-2xl text-gradient font-heading tracking-wider">
            They deserve the universe.
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-space-800/50 to-transparent" />
    </section>
  );
}
