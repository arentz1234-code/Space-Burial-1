"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import StarField from "@/components/shared/StarField";
import SECDisclaimer from "@/components/shared/SECDisclaimer";
import {
  Rocket,
  TrendingUp,
  Users,
  DollarSign,
  Shield,
  FileText,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function InvestorLandingPage() {
  return (
    <>
      <StarField />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-32 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nebula-500/20 border border-nebula-500/30 text-nebula-400 text-sm mb-8">
              <Shield className="w-4 h-4" />
              SEC Rule 506(c) Private Placement
            </div>

            <p className="text-cosmic-gold font-heading text-lg md:text-xl tracking-[0.3em] mb-4 animate-pulse">
              IMMORTALITY IS HERE
            </p>

            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl tracking-wider mb-6">
              INVEST IN
              <span className="block text-gradient">IMMORTALITY</span>
            </h1>

            <p className="text-xl text-cosmic-white/70 max-w-2xl mx-auto mb-8">
              Join a select group of accredited investors in Space Burial&apos;s private
              placement offering. Transforming a $23B industry with eternal space
              memorials.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/apply" className="btn-gold">
                Request Investor Access
                <ArrowRight className="w-4 h-4 inline ml-2" />
              </Link>
              <Link href="/login" className="btn-secondary">
                Existing Investor Login
              </Link>
            </div>

            <SECDisclaimer variant="inline" />
          </motion.div>
        </div>
      </section>

      {/* Opportunity Section */}
      <section id="opportunity" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl tracking-wider mb-4">
              THE OPPORTUNITY
            </h2>
            <p className="text-cosmic-white/60 max-w-2xl mx-auto">
              Be part of something unprecedented. We&apos;re creating an entirely
              new way to honor and remember loved ones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: Rocket,
                stat: "New",
                label: "Category Creation",
                description: "Pioneering space memorials as a service",
              },
              {
                icon: TrendingUp,
                stat: "Early",
                label: "Stage Opportunity",
                description: "Ground floor investment in a visionary company",
              },
              {
                icon: Users,
                stat: "Growing",
                label: "Interest",
                description: "Building waitlist and early customer demand",
              },
              {
                icon: DollarSign,
                stat: "Premium",
                label: "Positioning",
                description: "High-value service in the memorial space",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-nebula-500/20 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-nebula-400" />
                </div>
                <div className="font-heading text-3xl text-cosmic-gold mb-2">
                  {item.stat}
                </div>
                <div className="font-heading text-sm tracking-wider mb-2">
                  {item.label}
                </div>
                <p className="text-xs text-cosmic-white/50">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Vision & Use of Proceeds */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-card p-8">
              <h3 className="font-heading text-xl tracking-wider mb-6">
                WHY NOW
              </h3>
              <ul className="space-y-4">
                {[
                  "Commercial spaceflight is now accessible and reliable",
                  "Growing desire for meaningful, personalized memorials",
                  "No established competitors in space memorial services",
                  "Technology enables real-time orbital tracking",
                  "Opportunity to define and lead a new industry",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <span className="text-cosmic-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-8">
              <h3 className="font-heading text-xl tracking-wider mb-6">
                USE OF PROCEEDS
              </h3>
              <ul className="space-y-4">
                {[
                  { label: "Product Development & Technology", pct: "35%" },
                  { label: "Launch Provider Partnerships", pct: "25%" },
                  { label: "Marketing & Brand Building", pct: "25%" },
                  { label: "Operations & Working Capital", pct: "15%" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <span className="text-cosmic-white/80">{item.label}</span>
                    <span className="font-heading text-cosmic-gold">{item.pct}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-cosmic-white/40">
                * Estimated allocation. Actual use may vary based on business needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="relative z-10 py-24 px-6 bg-space-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl tracking-wider mb-4">
              LEADERSHIP
            </h2>
            <p className="text-cosmic-white/60 max-w-2xl mx-auto">
              Visionary leadership driving the future of memorial services.
            </p>
          </div>

          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="glass-card p-8 text-center max-w-sm"
            >
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-nebula-500 to-stellar-500 flex items-center justify-center">
                <span className="font-heading text-4xl">S</span>
              </div>
              <h3 className="font-heading text-2xl tracking-wider mb-2">
                Steven Ferris
              </h3>
              <p className="text-cosmic-gold text-lg mb-4">Founder & CEO</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl tracking-wider mb-4">
              INVESTMENT PROCESS
            </h2>
            <p className="text-cosmic-white/60 max-w-2xl mx-auto">
              SEC Rule 506(c) compliant process for accredited investors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Request Access",
                description: "Submit your interest and basic information",
                icon: FileText,
              },
              {
                step: "2",
                title: "Verification",
                description: "Complete accredited investor verification",
                icon: Shield,
              },
              {
                step: "3",
                title: "Review Materials",
                description: "Access PPM and offering documents after NDA",
                icon: FileText,
              },
              {
                step: "4",
                title: "Invest",
                description: "Complete subscription and fund your investment",
                icon: DollarSign,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="glass-card p-6 text-center h-full">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-cosmic-gold/20 flex items-center justify-center">
                    <span className="font-heading text-lg text-cosmic-gold">{item.step}</span>
                  </div>
                  <h3 className="font-heading text-sm tracking-wider mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-cosmic-white/60">{item.description}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-cosmic-white/20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="relative z-10 py-24 px-6 bg-space-800/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl tracking-wider mb-4">
              THE PRODUCT
            </h2>
            <p className="text-cosmic-white/60 max-w-2xl mx-auto">
              Our flagship memorial service - sending loved ones to the eternal cosmos.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass-card p-8 md:p-12 glow-border"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cosmic-gold/20 text-cosmic-gold text-xs font-heading tracking-wider mb-4">
                  FLAGSHIP OFFERING
                </div>
                <h3 className="font-heading text-3xl md:text-4xl tracking-wider mb-4">
                  SPACE MEMORIAL
                </h3>
                <p className="text-cosmic-white/70 mb-6">
                  A portion of cremated remains is launched into Earth orbit aboard a
                  commercial spacecraft, creating an eternal memorial among the stars.
                  Families can track their loved one&apos;s journey through our dedicated app.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Launch aboard FAA-licensed commercial spacecraft",
                    "Personalized memorial capsule with engraving",
                    "Real-time orbital tracking via mobile app",
                    "Digital memorial page for family sharing",
                    "Certificate of launch with mission details",
                    "Lifetime access to memorial platform",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="w-4 h-4 text-cosmic-gold shrink-0 mt-0.5" />
                      <span className="text-cosmic-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center lg:text-right">
                <div className="inline-block bg-gradient-to-br from-space-700 to-space-800 rounded-2xl p-8 border border-cosmic-gold/30">
                  <p className="text-cosmic-white/50 text-sm mb-2">Starting at</p>
                  <div className="font-heading text-5xl md:text-6xl text-cosmic-gold mb-2">
                    $3,800
                  </div>
                  <p className="text-cosmic-white/50 text-sm mb-6">per memorial</p>

                  <div className="space-y-2 text-left">
                    <div className="flex justify-between text-sm">
                      <span className="text-cosmic-white/50">Gross Margin</span>
                      <span className="text-green-400 font-heading">65%+</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-cosmic-white/50">Current Reservations</span>
                      <span className="text-cosmic-gold font-heading">312</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-cosmic-white/50">Pipeline Value</span>
                      <span className="text-cosmic-gold font-heading">$1.2M</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-card p-12 glow-border">
            <h2 className="font-heading text-3xl md:text-4xl tracking-wider mb-4">
              REQUEST INVESTOR ACCESS
            </h2>
            <p className="text-cosmic-white/60 mb-8">
              This offering is only available to accredited investors as defined under
              SEC Rule 501(a). Start your verification process today.
            </p>

            <Link href="/apply" className="btn-gold inline-block mb-8">
              Begin Application
              <ArrowRight className="w-4 h-4 inline ml-2" />
            </Link>

            <SECDisclaimer />
          </div>
        </div>
      </section>
    </>
  );
}
