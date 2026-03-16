"use client";

import { motion } from "framer-motion";
import StarField from "@/components/shared/StarField";
import { Globe, Users, Shield, Award } from "lucide-react";

const values = [
  { icon: Globe, title: "Universal Access", text: "We believe space memorials should be accessible to everyone, not just the ultra-wealthy." },
  { icon: Users, title: "Family First", text: "Every decision we make is guided by empathy and respect for families during their most difficult moments." },
  { icon: Shield, title: "Trust & Safety", text: "We partner only with licensed launch providers and follow all regulatory requirements." },
  { icon: Award, title: "Best in Galaxy", text: "Our $3,800 packages are the most competitively priced space memorial services available." },
];

export default function AboutPage() {
  return (
    <>
      <StarField />
      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <p className="font-heading text-xs tracking-[0.3em] uppercase text-cosmic-gold mb-4">
              Our Story
            </p>
            <h1 className="text-5xl md:text-6xl font-heading font-black mb-6">
              About <span className="text-gradient">Space Burial</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-10 mb-16"
          >
            <p className="text-cosmic-white/70 leading-relaxed mb-6">
              Space Burial was founded on a simple belief: that the way we remember
              those we love should be as extraordinary as the lives they lived. For
              the dreamers, scientists, explorers, and stargazers — a traditional
              memorial doesn&apos;t capture who they were.
            </p>
            <p className="text-cosmic-white/70 leading-relaxed mb-6">
              We combine experience from the aerospace and memorial industries to
              offer the most accessible space burial service on Earth. Our team has
              worked with licensed launch providers to create a seamless, respectful,
              and awe-inspiring experience for families.
            </p>
            <p className="text-cosmic-white/70 leading-relaxed">
              Starting at just $3,800, our Rocket Memorial and Immortal Memorial
              packages open the cosmos to everyone — not just astronauts and
              billionaires. Because the stars belong to all of us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass-card p-8 flex items-start gap-4"
              >
                <v.icon className="w-8 h-8 text-nebula-400 shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading text-sm tracking-wider mb-2">{v.title}</h3>
                  <p className="text-cosmic-white/50 text-sm leading-relaxed">{v.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
