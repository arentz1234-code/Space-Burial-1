"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import StarField from "@/components/shared/StarField";
import SECDisclaimer from "@/components/shared/SECDisclaimer";
import {
  Rocket,
  Heart,
  Star,
  Users,
  Shield,
  FileText,
  CheckCircle,
  ArrowRight,
  Download,
  Lock,
  BadgeCheck,
  Building2,
  ShieldCheck,
  Sparkles,
  Globe,
  QrCode,
  Camera,
  Video,
  Mic,
  BookOpen,
  TreePine,
  Waves,
  DollarSign,
  Handshake,
  MapPin,
} from "lucide-react";

export default function InvestorLandingPage() {
  return (
    <>
      <StarField />

      {/* ========== HERO SECTION ========== */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Emotional Story */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* SEC Badge - Required */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs mb-6">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-heading tracking-wider">SEC Rule 506(c) Private Placement</span>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </div>

              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl tracking-wide mb-6 leading-tight">
                <span className="text-cosmic-white">Every life deserves to be</span>
                <br />
                <span className="text-gradient-vibrant">remembered forever.</span>
              </h1>

              <div className="flex flex-col sm:flex-row gap-4 mb-8 mt-2">
                <Link href="/apply" className="btn-gold group text-center">
                  Request Investor Access
                  <ArrowRight className="w-4 h-4 inline ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/login" className="btn-secondary text-center">
                  Investor Login
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-cosmic-white/60">
                  <Lock className="w-3.5 h-3.5 text-green-400" />
                  Encrypted
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-cosmic-white/60">
                  <BadgeCheck className="w-3.5 h-3.5 text-sailfish-cyan" />
                  Accredited Only
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-cosmic-white/60">
                  <Building2 className="w-3.5 h-3.5 text-nebula-400" />
                  Delaware C-Corp
                </div>
              </div>
            </motion.div>

            {/* Right: Visual Impact Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sailfish-cyan/20 via-nebula-500/20 to-cosmic-coral/20 blur-3xl" />
              <div className="relative glass-card p-10 md:p-14 border-2 border-white/10 overflow-hidden">
                {/* Gradient overlay */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sailfish-cyan via-nebula-500 to-cosmic-coral" />

                <div className="text-center">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-sailfish-cyan font-heading text-sm tracking-[0.3em] mb-6"
                  >
                    ONE LIFE. ONE DASH.
                  </motion.p>

                  {/* The Dash - Animated focal point */}
                  <div className="flex items-center justify-center gap-4 md:gap-6 mb-6">
                    <motion.span
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                      className="font-heading text-4xl md:text-5xl text-cosmic-white/50"
                    >
                      1952
                    </motion.span>

                    {/* Animated Dash */}
                    <div className="relative flex items-center justify-center" style={{ width: '120px' }}>
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: '100%', opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                        style={{ height: '4px' }}
                        className="bg-gradient-to-r from-sailfish-cyan via-nebula-500 to-cosmic-coral rounded-full"
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.8, 0.4, 0.8] }}
                        transition={{ delay: 2, duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        style={{ height: '4px', position: 'absolute', width: '100%' }}
                        className="bg-gradient-to-r from-sailfish-cyan via-nebula-500 to-cosmic-coral rounded-full blur-md"
                      />
                    </div>

                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                      className="font-heading text-4xl md:text-5xl text-cosmic-white/50"
                    >
                      2042
                    </motion.span>
                  </div>

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="font-heading text-4xl md:text-5xl tracking-wider text-gradient-vibrant"
                  >
                    What is yours?
                  </motion.h2>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sailfish-cyan/30 to-transparent" />
      </section>

      {/* ========== THE OPPORTUNITY (Problem We Solve) ========== */}
      <section id="opportunity" className="relative z-10 py-20 px-6 scroll-mt-32">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-heading tracking-[0.2em] mb-6">
              <Heart className="w-3 h-3" />
              THE PROBLEM
            </div>
            <h2 className="font-heading text-3xl md:text-5xl tracking-wider mb-6">
              Memory has an <span className="text-rose-400">expiration date.</span>
            </h2>
            <p className="text-cosmic-white/60 max-w-2xl mx-auto text-lg">
              After just 3 generations, most people are forgotten. Names fade. Stories disappear.
              Voices are lost forever.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Traditional */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="glass-card p-8 text-center border-rose-500/20"
            >
              <div className="font-heading text-7xl text-rose-400 mb-4">3</div>
              <div className="text-xl font-heading tracking-wider mb-2">Generations</div>
              <p className="text-cosmic-white/50">Then forgotten.</p>
            </motion.div>

            {/* Immortal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8 text-center border-sailfish-cyan/30 glow-border"
            >
              <div className="font-heading text-7xl text-gradient mb-4">∞</div>
              <div className="text-xl font-heading tracking-wider mb-2">Forever</div>
              <p className="text-sailfish-cyan">Always remembered.</p>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mt-12 text-2xl font-heading tracking-wider"
          >
            We make life memorable. <span className="text-gradient-vibrant">Forever.</span>
          </motion.p>
        </div>
      </section>

      {/* ========== THE PRODUCT ========== */}
      <section id="product" className="relative z-10 py-20 px-6 bg-gradient-to-b from-transparent via-space-800/50 to-transparent scroll-mt-32">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nebula-500/30 to-transparent" />

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sailfish-cyan/10 border border-sailfish-cyan/20 text-sailfish-cyan text-xs font-heading tracking-[0.2em] mb-6">
              <Sparkles className="w-3 h-3" />
              THE PRODUCT
            </div>
            <h2 className="font-heading text-3xl md:text-5xl tracking-wider mb-4">
              <span className="text-gradient-vibrant">Immortal Memorial</span>
            </h2>
            <p className="text-cosmic-white/60 max-w-2xl mx-auto text-lg">
              A digital portal to someone&apos;s entire life. Scan a QR code on a headstone,
              urn, or keepsake — and open a life.
            </p>
          </motion.div>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {[
              { icon: Camera, label: "Photos", description: "A lifetime of moments", color: "from-amber-400 to-orange-500" },
              { icon: Video, label: "Video", description: "See them. Hear them.", color: "from-pink-400 to-rose-500" },
              { icon: Mic, label: "Voice", description: "Their voice, preserved", color: "from-cyan-400 to-blue-500" },
              { icon: BookOpen, label: "Story", description: "The full biography", color: "from-green-400 to-emerald-500" },
              { icon: TreePine, label: "Family", description: "The legacy continues", color: "from-purple-400 to-violet-500" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-5 text-center group hover:border-white/30 transition-all duration-300"
              >
                <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading text-base mb-1">{feature.label}</h3>
                <p className="text-xs text-cosmic-white/50">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* The Ceremonies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            {/* Space Burial */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="glass-card p-8 border-sailfish-cyan/30"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sailfish-cyan to-blue-600 flex items-center justify-center shrink-0">
                  <Rocket className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sailfish-cyan text-xs font-heading tracking-wider mb-1">TO THE STARS</p>
                  <h3 className="font-heading text-2xl tracking-wider">Space Burial</h3>
                </div>
              </div>
              <p className="text-cosmic-white/70 mb-4">
                2g of ashes launched aboard a commercial spacecraft. Live launch footage.
                Authenticated certificate. A celebration beyond Earth.
              </p>
              <div className="flex items-center gap-3 text-sm text-cosmic-white/50">
                <Globe className="w-4 h-4 text-sailfish-cyan" />
                <span>Real-time orbital tracking included</span>
              </div>
            </motion.div>

            {/* Sea Burial */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="glass-card p-8 border-cosmic-coral/30"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cosmic-coral to-amber-500 flex items-center justify-center shrink-0">
                  <Waves className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-cosmic-coral text-xs font-heading tracking-wider mb-1">TO THE SEA</p>
                  <h3 className="font-heading text-2xl tracking-wider">Sea Burial</h3>
                </div>
              </div>
              <p className="text-cosmic-white/70 mb-4">
                4g of remaining ashes released at sea in a beautiful ceremony.
                The full story, completed. Both experiences feed the eternal memorial.
              </p>
              <div className="flex items-center gap-3 text-sm text-cosmic-white/50">
                <Heart className="w-4 h-4 text-cosmic-coral" />
                <span>Optional. Beautiful. Meaningful.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== MARTIN COUNTY ROOTS ========== */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-heading tracking-[0.2em] mb-6">
              <MapPin className="w-3 h-3" />
              OUR ROOTS
            </div>
            <h2 className="font-heading text-3xl md:text-5xl tracking-wider mb-4">
              Built here. Raised here. <span className="text-green-400">Rooted here.</span>
            </h2>
            <p className="text-cosmic-white/60 max-w-2xl mx-auto text-lg">
              A Martin County company, raising Martin County capital. Local investors,
              local jobs, local launches, local legacy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Star,
                label: "FOUNDER",
                title: "Steven Ferris",
                description: "Martin County resident. Aerospace background. 25 years building this vision.",
                color: "from-amber-400 to-orange-500"
              },
              {
                icon: Heart,
                label: "COMMUNITY",
                title: "Sailfish Point",
                description: "Proudly based in Sailfish Point, Martin County. Local roots, global vision.",
                color: "from-rose-400 to-pink-500"
              },
              {
                icon: Users,
                label: "CAPITAL",
                title: "Neighbors First",
                description: "Local investors lead the round. Building something together.",
                color: "from-sailfish-cyan to-blue-500"
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <p className="text-cosmic-white/40 text-xs font-heading tracking-wider mb-2">{item.label}</p>
                <h3 className="font-heading text-xl tracking-wider mb-3">{item.title}</h3>
                <p className="text-sm text-cosmic-white/60">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== THE PROCESS ========== */}
      <section id="process" className="relative z-10 py-20 px-6 scroll-mt-32">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nebula-500/10 border border-nebula-500/20 text-nebula-400 text-xs font-heading tracking-[0.2em] mb-6">
              <FileText className="w-3 h-3" />
              INVESTMENT PROCESS
            </div>
            <h2 className="font-heading text-3xl md:text-5xl tracking-wider mb-4">
              How to <span className="text-gradient">Invest</span>
            </h2>
            <p className="text-cosmic-white/60 max-w-2xl mx-auto text-lg">
              SEC Rule 506(c) compliant process for accredited investors.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Request Access", description: "Submit your interest and basic information", icon: FileText },
              { step: "2", title: "Verification", description: "Complete accredited investor verification", icon: Shield },
              { step: "3", title: "Review Materials", description: "Access PPM and offering documents", icon: BookOpen },
              { step: "4", title: "Invest", description: "Complete subscription and fund", icon: DollarSign },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="glass-card p-6 text-center h-full">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-sailfish-cyan to-nebula-500 flex items-center justify-center">
                    <span className="font-heading text-lg text-white">{item.step}</span>
                  </div>
                  <h3 className="font-heading text-sm tracking-wider mb-2">{item.title}</h3>
                  <p className="text-xs text-cosmic-white/60">{item.description}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-sailfish-cyan/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== THE INVESTMENT ========== */}
      <section className="relative z-10 py-20 px-6 bg-gradient-to-b from-transparent via-space-800/50 to-transparent">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cosmic-coral/30 to-transparent" />

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cosmic-coral/10 border border-cosmic-coral/20 text-cosmic-coral text-xs font-heading tracking-[0.2em] mb-6">
              <DollarSign className="w-3 h-3" />
              THE ASK
            </div>
            <h2 className="font-heading text-3xl md:text-5xl tracking-wider mb-4">
              Join the <span className="text-gradient-vibrant">Founding Round</span>
            </h2>
            <p className="text-cosmic-white/60 max-w-2xl mx-auto text-lg">
              Be part of something meaningful. Help us build the future of remembrance.
            </p>
          </motion.div>

          {/* Investment Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto mb-12">
            {[
              { value: "$1M", label: "Target Raise" },
              { value: "$1", label: "Per Share" },
              { value: "1M", label: "Shares" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="font-heading text-3xl md:text-4xl text-gradient-vibrant mb-2">{stat.value}</div>
                <p className="text-xs md:text-sm text-cosmic-white/50 font-heading tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Terms Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {[
              { label: "STRUCTURE", value: "SAFE", icon: FileText },
              { label: "ELIGIBILITY", value: "Accredited", icon: BadgeCheck },
              { label: "REGULATION", value: "Reg D 506(c)", icon: Shield },
              { label: "PROTECTION", value: "Co-signed*", icon: Handshake },
            ].map((term, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-4 text-center"
              >
                <term.icon className="w-5 h-5 mx-auto mb-2 text-sailfish-cyan" />
                <p className="text-[10px] text-cosmic-white/40 tracking-wider mb-1">{term.label}</p>
                <p className="text-sm font-heading text-cosmic-white">{term.value}</p>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-xs text-cosmic-white/40 max-w-xl mx-auto">
            *Investors co-sign the bank account on the first $1M raised, providing
            additional oversight and transparency.
          </p>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative"
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-sailfish-cyan/20 via-nebula-500/20 to-cosmic-coral/20 blur-3xl scale-110" />

            <div className="relative glass-card p-10 md:p-16 border-2 border-white/10 text-center overflow-hidden">
              {/* Top gradient line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sailfish-cyan via-nebula-500 to-cosmic-coral" />

              <h2 className="font-heading text-3xl md:text-5xl tracking-wider mb-4">
                Be part of the <span className="text-gradient-vibrant">dash.</span>
              </h2>
              <p className="text-xl md:text-2xl text-cosmic-white/60 mb-8">
                A $1M company → A $1B legacy
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <Link href="/apply" className="btn-gold group">
                  Request Investor Access
                  <ArrowRight className="w-4 h-4 inline ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="/Sailfish Space Services Pitch Deck.pdf"
                  download
                  target="_blank"
                  className="btn-secondary"
                >
                  <Download className="w-4 h-4 inline mr-2" />
                  Download Pitch Deck
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-sm text-cosmic-white/50">
                  <ShieldCheck className="w-5 h-5 text-green-400" />
                  SEC Compliant
                </div>
                <div className="flex items-center gap-2 text-sm text-cosmic-white/50">
                  <Lock className="w-5 h-5 text-sailfish-cyan" />
                  256-bit Encrypted
                </div>
                <div className="flex items-center gap-2 text-sm text-cosmic-white/50">
                  <BadgeCheck className="w-5 h-5 text-nebula-400" />
                  Verified Process
                </div>
              </div>

              <SECDisclaimer />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== FOUNDER SECTION ========== */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-sailfish-cyan to-nebula-500 flex items-center justify-center text-3xl font-heading">
              SF
            </div>
            <p className="text-cosmic-white/40 text-sm font-heading tracking-wider mb-2">FOUNDER</p>
            <h3 className="font-heading text-2xl tracking-wider mb-4">Steven Ferris</h3>
            <p className="text-cosmic-white/60 mb-6">
              25 years in aerospace. Martin County resident. Building the future of
              how we remember those we love.
            </p>
            <p className="text-sailfish-cyan text-sm">spaceburial.ai</p>
          </motion.div>
        </div>
      </section>

      {/* ========== FINAL SEC DISCLAIMER ========== */}
      <section className="relative z-10 py-12 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <SECDisclaimer />
        </div>
      </section>
    </>
  );
}
