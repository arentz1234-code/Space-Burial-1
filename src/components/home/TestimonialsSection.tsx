"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "My father dedicated his life to astronomy. Knowing he's among the stars now brings our family incredible peace.",
    name: "Sarah M.",
    relation: "Daughter",
  },
  {
    quote: "The ceremony was beautiful, and watching the launch was the most emotional experience of my life. Worth every penny.",
    name: "James K.",
    relation: "Son",
  },
  {
    quote: "Space Burial made the entire process seamless during the hardest time of our lives. Truly the ultimate tribute.",
    name: "Maria L.",
    relation: "Spouse",
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6 bg-space-800/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <p className="font-heading text-xs tracking-[0.3em] uppercase text-cosmic-gold mb-4">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            Stories from <span className="text-gradient">Families</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2 }}
              className="glass-card p-8"
            >
              <Quote className="w-8 h-8 text-nebula-400/30 mb-4" />
              <p className="text-cosmic-white/70 text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="font-heading text-sm tracking-wider">{t.name}</p>
                <p className="text-cosmic-white/40 text-xs">{t.relation}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
