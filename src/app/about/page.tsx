"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import StarField from "@/components/shared/StarField";
import {
  Globe,
  Users,
  Shield,
  Award,
  Rocket,
  Building2,
  MapPin,
  Heart,
  Star,
  CheckCircle,
  ArrowRight,
  BadgeCheck,
  Target,
  Sparkles,
  Clock,
  DollarSign,
  Database,
  FileCheck,
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Compassion First",
    text: "Every decision we make is guided by empathy and respect for families during their most difficult moments.",
    color: "text-red-400",
    bg: "bg-red-400/20",
  },
  {
    icon: Globe,
    title: "Universal Access",
    text: "We believe space memorials should be accessible to everyone, not just the ultra-wealthy.",
    color: "text-stellar-400",
    bg: "bg-stellar-400/20",
  },
  {
    icon: Shield,
    title: "Trust & Transparency",
    text: "We partner only with licensed launch providers and maintain complete transparency throughout the process.",
    color: "text-nebula-400",
    bg: "bg-nebula-400/20",
  },
  {
    icon: Award,
    title: "Excellence",
    text: "We deliver the highest quality service at the most competitive prices in the industry.",
    color: "text-cosmic-gold",
    bg: "bg-cosmic-gold/20",
  },
];

const milestones = [
  {
    year: "Founded",
    title: "Delaware Corporation",
    description: "Spaceburial.com Corporation established as a registered Delaware Corporation.",
  },
  {
    year: "Authorized",
    title: "Florida Operations",
    description: "Approved as a Foreign Corporation Authorized to Transact Business in Florida.",
  },
  {
    year: "Licensed",
    title: "Cape Canaveral",
    description: "Registered and approved to conduct business in Cape Canaveral.",
  },
  {
    year: "Launching",
    title: "First Missions",
    description: "Partnering with premier launch providers to send memorials to the stars.",
  },
];

const whyChooseUs = [
  {
    icon: DollarSign,
    title: "Unbeatable Prices",
    description: "Starting at just $3,800 — the most competitive space memorial pricing available.",
  },
  {
    icon: MapPin,
    title: "Premier Launch Site",
    description: "All launches from Cape Canaveral or Kennedy Space Center — historic spaceports.",
  },
  {
    icon: Shield,
    title: "Fully Insured",
    description: "Every launch is financially insured in the unlikely event of a mission failure.",
  },
  {
    icon: Database,
    title: "Backup Samples",
    description: "We store backup samples to ensure your loved one reaches the stars.",
  },
  {
    icon: FileCheck,
    title: "Documented Process",
    description: "Cargo manifest by name and digital recording for complete peace of mind.",
  },
  {
    icon: Users,
    title: "Family Welcome",
    description: "Attend the launch in person and witness your loved one's journey begin.",
  },
];

const partnerships = [
  "Licensed Launch Providers",
  "Local Funeral Establishments",
  "Aerospace Engineers",
  "U.S. Coast Guard Compliant",
];

export default function AboutPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      <StarField />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center justify-center px-4 sm:px-6 pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-space-900/50 to-space-900" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={heroInView ? { scale: 1 } : {}}
            transition={{ delay: 0.3, type: "spring" }}
            className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-nebula-500/30 to-stellar-500/30 flex items-center justify-center"
          >
            <Building2 className="w-12 h-12 text-cosmic-gold" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="font-heading text-[10px] sm:text-xs tracking-[0.3em] uppercase text-cosmic-gold mb-4"
          >
            Our Story
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="text-4xl sm:text-5xl md:text-7xl font-heading font-black mb-6 leading-tight"
          >
            About <span className="text-gradient">Space Burial</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-cosmic-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            The ultimate tribute for those who dreamed of the stars. We make space memorials
            accessible to everyone, honoring legacies among the cosmos.
          </motion.p>
        </motion.div>
      </section>

      {/* Mission Statement */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 sm:p-12 border border-cosmic-gold/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cosmic-gold/5 via-transparent to-stellar-400/5" />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-8">
                <Sparkles className="w-6 h-6 text-cosmic-gold" />
                <h2 className="font-heading text-xl sm:text-2xl tracking-wider text-center">
                  Our Mission
                </h2>
                <Sparkles className="w-6 h-6 text-cosmic-gold" />
              </div>

              <p className="text-cosmic-white/80 text-base sm:text-lg leading-relaxed mb-6 text-center max-w-3xl mx-auto">
                Space Burial was founded on a simple belief: that the way we remember those we love
                should be as extraordinary as the lives they lived. For the dreamers, scientists,
                explorers, and stargazers — a traditional memorial doesn't capture who they were.
              </p>

              <p className="text-cosmic-white/70 text-sm sm:text-base leading-relaxed mb-6 text-center max-w-3xl mx-auto">
                We combine expertise from the aerospace and memorial industries to offer the most
                accessible space burial service on Earth. Our team works with licensed launch providers
                to create a seamless, respectful, and awe-inspiring experience for families.
              </p>

              <p className="text-cosmic-gold text-center font-heading tracking-wider">
                Because the stars belong to all of us.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Credentials */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="font-heading text-xs tracking-[0.3em] uppercase text-cosmic-gold mb-4">
              Credentials
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black">
              Registered & <span className="text-gradient">Authorized</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center group hover:border-cosmic-gold/30 transition-colors"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-cosmic-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="font-heading text-cosmic-gold text-sm">{milestone.year}</span>
                </div>
                <h3 className="font-heading text-base tracking-wider mb-2 text-cosmic-white">
                  {milestone.title}
                </h3>
                <p className="text-xs text-cosmic-white/50 leading-relaxed">
                  {milestone.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Location highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 glass-card p-8 sm:p-10 flex flex-col md:flex-row items-center gap-8"
          >
            <div className="w-24 h-24 shrink-0 rounded-full bg-stellar-400/20 flex items-center justify-center">
              <MapPin className="w-12 h-12 text-stellar-400" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-heading text-xl sm:text-2xl tracking-wider mb-3">
                Cape Canaveral, Florida
              </h3>
              <p className="text-cosmic-white/70 text-sm sm:text-base leading-relaxed">
                All our missions launch from either Cape Canaveral Space Force Station or Kennedy Space Center —
                the same historic launchpads that sent humanity to the Moon. Our headquarters are strategically
                located to work with multiple premier launch providers, ensuring competitive pricing and
                reliable scheduling.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="font-heading text-xs tracking-[0.3em] uppercase text-cosmic-gold mb-4">
              What We Believe
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black">
              Our Core <span className="text-gradient">Values</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 flex items-start gap-5 group hover:border-white/20 transition-colors"
              >
                <div className={`w-14 h-14 shrink-0 rounded-2xl ${value.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <value.icon className={`w-7 h-7 ${value.color}`} />
                </div>
                <div>
                  <h3 className="font-heading text-lg tracking-wider mb-2">{value.title}</h3>
                  <p className="text-cosmic-white/60 text-sm leading-relaxed">{value.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="font-heading text-xs tracking-[0.3em] uppercase text-cosmic-gold mb-4">
              The Space Burial Difference
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black">
              Why Choose <span className="text-gradient">Us</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center group"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-nebula-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-nebula-500/30 transition-all">
                  <item.icon className="w-6 h-6 text-nebula-400" />
                </div>
                <h3 className="font-heading text-sm tracking-wider mb-2">{item.title}</h3>
                <p className="text-xs text-cosmic-white/50 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 sm:p-12 text-center"
          >
            <h2 className="font-heading text-xl sm:text-2xl tracking-wider mb-6">
              Trusted Partnerships
            </h2>
            <p className="text-cosmic-white/70 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              We work with carefully vetted partners to ensure the highest standards of care,
              safety, and professionalism throughout the entire process.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {partnerships.map((partner, i) => (
                <motion.div
                  key={partner}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-center gap-2 bg-white/5 rounded-xl px-4 py-3"
                >
                  <CheckCircle className="w-4 h-4 text-cosmic-gold shrink-0" />
                  <span className="text-xs text-cosmic-white/70">{partner}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 sm:p-12 border border-stellar-400/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-stellar-400/5 via-transparent to-nebula-500/5" />

            <div className="relative z-10 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-6 rounded-full bg-stellar-400/20 flex items-center justify-center"
              >
                <Target className="w-8 h-8 text-stellar-400" />
              </motion.div>

              <h2 className="font-heading text-xl sm:text-2xl tracking-wider mb-6">
                Our Promise to You
              </h2>

              <div className="space-y-4 text-left max-w-2xl mx-auto">
                {[
                  "A dignified, transparent process from start to finish",
                  "The most competitive pricing in the space memorial industry",
                  "Financially insured launches with backup sample storage",
                  "A lasting digital memorial for generations to come",
                  "Compassionate support every step of the way",
                ].map((promise, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-stellar-400 shrink-0 mt-0.5" />
                    <span className="text-cosmic-white/70 text-sm sm:text-base">{promise}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-16 sm:py-32 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card p-8 sm:p-16 text-center border border-cosmic-gold/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cosmic-gold/5 via-transparent to-stellar-400/5" />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cosmic-gold/10 rounded-full blur-3xl"
            />

            <div className="relative z-10">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-cosmic-gold/30 to-stellar-400/30 flex items-center justify-center"
              >
                <Rocket className="w-10 h-10 text-cosmic-gold" />
              </motion.div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black mb-4">
                Join Us Among the Stars
              </h2>

              <p className="text-cosmic-white/60 mb-10 max-w-xl mx-auto text-base sm:text-lg">
                Let us help you create an eternal tribute that honors your loved one's
                spirit of wonder and adventure.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="btn-primary flex items-center justify-center gap-2 text-base px-8 py-4 group"
                >
                  Get in Touch
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/services"
                  className="btn-secondary flex items-center justify-center gap-2 text-base px-8 py-4"
                >
                  Explore Packages
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="h-20" />
    </>
  );
}
