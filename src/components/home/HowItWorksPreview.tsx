"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ClipboardList, Package, Rocket, Satellite } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Choose & Reserve", description: "Select your memorial package and complete your reservation online." },
  { icon: Package, title: "Prepare Capsule", description: "We receive the remains and prepare a custom memorial capsule." },
  { icon: Rocket, title: "Launch Day", description: "Witness the launch live or via HD stream as your tribute ascends." },
  { icon: Satellite, title: "Track Forever", description: "Follow the memorial's journey with lifetime mission tracking." },
];

export default function HowItWorksPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <p className="font-heading text-xs tracking-[0.3em] uppercase text-nebula-400 mb-4">
            The Process
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            How It <span className="text-gradient">Works</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="text-center relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-nebula-500/50 to-transparent" />
              )}

              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-nebula-500/20 to-stellar-500/20 flex items-center justify-center border border-nebula-500/30">
                <step.icon className="w-9 h-9 text-nebula-400" />
              </div>

              <span className="font-heading text-xs text-cosmic-gold tracking-widest">
                Step {i + 1}
              </span>
              <h3 className="font-heading text-sm tracking-wider mt-2 mb-3">{step.title}</h3>
              <p className="text-cosmic-white/50 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
