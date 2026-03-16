"use client";

import { motion } from "framer-motion";
import StarField from "@/components/shared/StarField";
import { ClipboardList, Package, Rocket, Satellite, Phone, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: Phone,
    title: "1. Consultation",
    description: "Reach out to our team. We'll walk you through the options, answer every question, and help you choose the right memorial package for your loved one.",
  },
  {
    icon: ClipboardList,
    title: "2. Reservation",
    description: "Complete your reservation online. A deposit secures your spot on an upcoming mission. We handle all logistics and paperwork.",
  },
  {
    icon: Package,
    title: "3. Capsule Preparation",
    description: "Send us the cremated remains via our secure shipping process. Our team prepares a custom memorial capsule for the mission.",
  },
  {
    icon: ShieldCheck,
    title: "4. Pre-Launch Updates",
    description: "Receive regular mission updates, launch window notifications, and your personalized flight certificate as the launch date approaches.",
  },
  {
    icon: Rocket,
    title: "5. Launch Day",
    description: "Watch the launch live — in person or via HD stream. Share the moment with family as your loved one's tribute ascends to the stars.",
  },
  {
    icon: Satellite,
    title: "6. Eternal Tracking",
    description: "Access your mission tracking dashboard for real-time location updates. Your loved one's journey continues — and you can follow it forever.",
  },
];

export default function HowItWorksPage() {
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
              The Process
            </p>
            <h1 className="text-5xl md:text-6xl font-heading font-black mb-6">
              How It <span className="text-gradient">Works</span>
            </h1>
            <p className="text-cosmic-white/60 max-w-xl mx-auto">
              From consultation to launch day, we guide you through every step.
            </p>
          </motion.div>

          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 flex flex-col md:flex-row items-start gap-6"
              >
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-nebula-500/20 to-stellar-500/20 flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-nebula-400" />
                </div>
                <div>
                  <h3 className="font-heading text-lg tracking-wider mb-3">{step.title}</h3>
                  <p className="text-cosmic-white/60 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
