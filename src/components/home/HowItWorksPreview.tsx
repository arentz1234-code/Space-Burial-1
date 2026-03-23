"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ClipboardCheck, Package, Rocket, Orbit, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: ClipboardCheck,
    num: "01",
    title: "Reserve",
    description: "Choose your memorial tier and create your account. We'll guide you through every step.",
    color: "from-nebula-500 to-nebula-600"
  },
  {
    icon: Package,
    num: "02",
    title: "Prepare",
    description: "Send us the cremated remains. We craft a custom capsule engraved with their name.",
    color: "from-stellar-400 to-stellar-500"
  },
  {
    icon: Rocket,
    num: "03",
    title: "Launch",
    description: "Watch the live launch from anywhere in the world. VIP tickets available for in-person viewing.",
    color: "from-cosmic-gold to-yellow-500"
  },
  {
    icon: Orbit,
    num: "04",
    title: "Remember",
    description: "Track their orbit in real-time. Share their memorial page with family for generations.",
    color: "from-green-400 to-emerald-500"
  },
];

export default function HowItWorksPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 sm:py-36 px-6 bg-gradient-to-b from-space-800/50 to-space-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-cosmic-gold font-heading text-sm tracking-[0.2em] uppercase mb-4">
            Simple Process
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4">
            Your Journey to the Stars
          </h2>
          <p className="text-cosmic-white/50 max-w-xl mx-auto">
            From reservation to launch, we handle everything with care and precision.
          </p>
        </motion.div>

        {/* Steps with connecting line */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-20 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-nebula-500/50 via-cosmic-gold/50 to-green-400/50" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.15 }}
                  className="relative text-center"
                >
                  {/* Icon circle */}
                  <div className="relative z-10 mx-auto mb-6">
                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${step.color} p-0.5`}>
                      <div className="w-full h-full rounded-2xl bg-space-900 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-space-900 border-2 border-cosmic-gold flex items-center justify-center text-xs font-heading text-cosmic-gold">
                      {step.num.replace("0", "")}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg tracking-wider mb-3">
                    {step.title}
                  </h3>
                  <p className="text-cosmic-white/50 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-cosmic-gold hover:text-cosmic-gold/80 transition-colors font-heading tracking-wider text-sm group"
          >
            See the Full Process
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
