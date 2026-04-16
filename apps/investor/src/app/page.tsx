"use client";

import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
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
  Presentation,
  Info,
  ChevronLeft,
  ChevronRight,
  Circle,
  Download,
  Target,
  Zap,
  Globe,
  LucideIcon,
} from "lucide-react";

// ============ PITCH DECK DATA ============
const titleSlide = {
  id: "title",
  type: "title" as const,
  tagline: "IMMORTALITY IS HERE",
  title: "Space Burial",
  subtitle: "Eternal Memorials Among the Stars",
  description: "Investor Pitch Deck | Series A Private Placement",
};

const problemSlide = {
  id: "problem",
  type: "problem" as const,
  title: "THE PROBLEM",
  subtitle: "Traditional Memorials Are Limiting",
  points: [
    "Cemetery space is finite and expensive",
    "Traditional burials lack personalization",
    "No way to create eternal tributes",
    "Families want meaningful alternatives",
    "Growing demand for premium options",
  ],
  statValue: "$23B",
  statLabel: "Death Care Industry",
};

const solutionSlide = {
  id: "solution",
  type: "solution" as const,
  title: "THE SOLUTION",
  subtitle: "Eternal Memorials in Orbit",
  description:
    "We launch cremated remains into Earth orbit aboard commercial spacecraft, creating eternal memorials among the stars.",
  features: [
    "FAA-licensed spacecraft",
    "Real-time orbital tracking",
    "Digital memorial pages",
    "Personalized capsules",
  ],
};

const productSlide = {
  id: "product",
  type: "product" as const,
  title: "THE PRODUCT",
  subtitle: "Premium Space Memorial",
  price: "$3,800",
  priceNote: "Starting price",
  features: [
    { label: "Memorial Capsule", description: "Spacecraft-grade capsule" },
    { label: "Orbital Launch", description: "Commercial spacecraft" },
    { label: "Tracking App", description: "Real-time position" },
    { label: "Digital Memorial", description: "Family sharing" },
  ],
};

const marketSlide = {
  id: "market",
  type: "market" as const,
  title: "MARKET",
  subtitle: "Massive Opportunity",
  stats: [
    { value: "$23B", label: "Market Size" },
    { value: "2.8M", label: "Annual Deaths" },
    { value: "56%", label: "Cremation Rate" },
    { value: "$500M+", label: "Target Market" },
  ],
  insight: "Cremation rate grew from 27% to 56%, creating massive opportunity.",
};

const businessSlide = {
  id: "business",
  type: "business" as const,
  title: "BUSINESS MODEL",
  subtitle: "Premium Economics",
  metrics: [
    { label: "Avg Sale", value: "$4,500" },
    { label: "Margin", value: "65%+" },
    { label: "LTV", value: "$5,200" },
    { label: "CAC", value: "$800" },
  ],
  revenue: [
    { label: "Memorial Services", pct: 70 },
    { label: "Premium Add-ons", pct: 20 },
    { label: "Subscriptions", pct: 10 },
  ],
};

const tractionSlide = {
  id: "traction",
  type: "traction" as const,
  title: "TRACTION",
  subtitle: "Strong Momentum",
  metrics: [
    { value: "312", label: "Reservations", icon: Users },
    { value: "$1.2M", label: "Pipeline", icon: DollarSign },
    { value: "65%", label: "Margin", icon: TrendingUp },
    { value: "3", label: "Partners", icon: Rocket },
  ] as { value: string; label: string; icon: LucideIcon }[],
  milestones: [
    { label: "FAA partnerships", completed: true },
    { label: "Platform built", completed: true },
    { label: "First reservations", completed: true },
    { label: "First launch", completed: false },
  ],
};

const competitiveSlide = {
  id: "competitive",
  type: "competitive" as const,
  title: "COMPETITIVE EDGE",
  subtitle: "First Mover Advantage",
  advantages: [
    { title: "Category Creation", description: "Leading a new category", icon: Zap },
    { title: "Launch Partners", description: "FAA-licensed providers", icon: Rocket },
    { title: "Technology", description: "Proprietary platform", icon: Globe },
    { title: "Brand", description: "Premium positioning", icon: Target },
  ] as { title: string; description: string; icon: LucideIcon }[],
};

const teamSlide = {
  id: "team",
  type: "team" as const,
  title: "LEADERSHIP",
  subtitle: "Visionary Team",
  members: [{ name: "Steven Ferris", role: "Founder & CEO", initial: "S" }],
  note: "Building team to scale",
};

const investmentSlide = {
  id: "investment",
  type: "investment" as const,
  title: "THE OPPORTUNITY",
  subtitle: "Series A Private Placement",
  useOfProceeds: [
    { label: "Product & Tech", pct: 35, color: "bg-nebula-500" },
    { label: "Partnerships", pct: 25, color: "bg-stellar-500" },
    { label: "Marketing", pct: 25, color: "bg-cosmic-gold" },
    { label: "Operations", pct: 15, color: "bg-green-500" },
  ],
  terms: [
    { label: "Security", value: "Series A Preferred" },
    { label: "Compliance", value: "SEC 506(c)" },
    { label: "Investors", value: "Accredited Only" },
  ],
};

const ctaSlide = {
  id: "cta",
  type: "cta" as const,
  title: "JOIN US",
  subtitle: "Invest in Immortality",
  description: "Be part of something unprecedented - eternal memorials among the stars.",
  cta: "Request Investor Access",
};

const slides = [
  titleSlide,
  problemSlide,
  solutionSlide,
  productSlide,
  marketSlide,
  businessSlide,
  tractionSlide,
  competitiveSlide,
  teamSlide,
  investmentSlide,
  ctaSlide,
];

// ============ PITCH DECK COMPONENT ============
function PitchDeckViewer() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold && currentSlide < slides.length - 1) {
      nextSlide();
    } else if (info.offset.x > threshold && currentSlide > 0) {
      prevSlide();
    }
  };

  const slide = slides[currentSlide];

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
  };

  return (
    <section className="relative z-10 min-h-screen px-4 sm:px-6 pt-32 pb-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-4 sm:mb-8"
        >
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-cosmic-gold/20 flex items-center justify-center">
                <Presentation className="w-4 h-4 sm:w-5 sm:h-5 text-cosmic-gold" />
              </div>
              <h1 className="font-heading text-xl sm:text-2xl tracking-wider">Pitch Deck</h1>
            </div>
            <p className="text-cosmic-white/60 text-xs sm:text-sm">
              {currentSlide + 1} / {slides.length}
            </p>
          </div>
          <a
            href="/dashboard/pitch-deck/print"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-cosmic-gold/20 border border-cosmic-gold/30 text-xs sm:text-sm text-cosmic-gold hover:bg-cosmic-gold/30 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download PDF</span>
          </a>
        </motion.div>

        {/* Slide Content */}
        <motion.div
          className="glass-card p-4 sm:p-8 md:p-12 min-h-[400px] sm:min-h-[500px] relative overflow-hidden touch-pan-y"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {slide.type === "title" && (
                <div className="h-full flex flex-col items-center justify-center text-center py-4 sm:py-8">
                  <p className="text-cosmic-gold font-heading text-sm sm:text-lg tracking-[0.2em] sm:tracking-[0.3em] mb-2 sm:mb-4 animate-pulse">
                    {titleSlide.tagline}
                  </p>
                  <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl tracking-wider mb-2 sm:mb-4">
                    {titleSlide.title}
                  </h2>
                  <p className="text-xl sm:text-2xl md:text-3xl text-gradient mb-4 sm:mb-8">
                    {titleSlide.subtitle}
                  </p>
                  <p className="text-cosmic-white/50 text-xs sm:text-sm tracking-wider">
                    {titleSlide.description}
                  </p>
                </div>
              )}

              {slide.type === "problem" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 items-center">
                  <div>
                    <h2 className="font-heading text-2xl sm:text-3xl tracking-wider mb-1 sm:mb-2">
                      {problemSlide.title}
                    </h2>
                    <p className="text-cosmic-gold text-sm sm:text-base mb-4 sm:mb-8">{problemSlide.subtitle}</p>
                    <ul className="space-y-2 sm:space-y-4">
                      {problemSlide.points.map((point, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-2 sm:gap-3"
                        >
                          <div className="w-2 h-2 rounded-full bg-red-400 mt-1.5 sm:mt-2 shrink-0" />
                          <span className="text-cosmic-white/80 text-sm sm:text-base">{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-center mt-4 lg:mt-0">
                    <div className="inline-block bg-gradient-to-br from-space-700 to-space-800 rounded-2xl p-6 sm:p-8 border border-cosmic-gold/30">
                      <div className="font-heading text-4xl sm:text-6xl text-cosmic-gold mb-1 sm:mb-2">
                        {problemSlide.statValue}
                      </div>
                      <p className="text-cosmic-white/60 text-sm sm:text-base">{problemSlide.statLabel}</p>
                    </div>
                  </div>
                </div>
              )}

              {slide.type === "solution" && (
                <div className="text-center">
                  <h2 className="font-heading text-2xl sm:text-3xl tracking-wider mb-1 sm:mb-2">
                    {solutionSlide.title}
                  </h2>
                  <p className="text-cosmic-gold text-sm sm:text-base mb-3 sm:mb-6">{solutionSlide.subtitle}</p>
                  <p className="text-cosmic-white/70 max-w-2xl mx-auto mb-6 sm:mb-10 text-sm sm:text-lg">
                    {solutionSlide.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:gap-4">
                    {solutionSlide.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10"
                      >
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mx-auto mb-1 sm:mb-2" />
                        <p className="text-xs sm:text-sm text-cosmic-white/80">{feature}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {slide.type === "product" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 items-center">
                  <div>
                    <h2 className="font-heading text-2xl sm:text-3xl tracking-wider mb-1 sm:mb-2">
                      {productSlide.title}
                    </h2>
                    <p className="text-cosmic-gold text-sm sm:text-base mb-4 sm:mb-8">{productSlide.subtitle}</p>
                    <div className="space-y-2 sm:space-y-4">
                      {productSlide.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-2 sm:gap-3"
                        >
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-cosmic-gold shrink-0 mt-0.5" />
                          <div>
                            <span className="font-heading text-xs sm:text-sm">{feature.label}</span>
                            <span className="text-cosmic-white/50 text-xs sm:text-sm"> - {feature.description}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="text-center mt-4 lg:mt-0">
                    <div className="inline-block bg-gradient-to-br from-space-700 to-space-800 rounded-2xl p-6 sm:p-8 border border-cosmic-gold/30">
                      <p className="text-cosmic-white/50 text-xs sm:text-sm mb-1 sm:mb-2">Starting at</p>
                      <div className="font-heading text-4xl sm:text-6xl text-cosmic-gold mb-1 sm:mb-2">
                        {productSlide.price}
                      </div>
                      <p className="text-cosmic-white/50 text-xs sm:text-sm">{productSlide.priceNote}</p>
                    </div>
                  </div>
                </div>
              )}

              {slide.type === "market" && (
                <div>
                  <div className="text-center mb-4 sm:mb-8">
                    <h2 className="font-heading text-2xl sm:text-3xl tracking-wider mb-1 sm:mb-2">
                      {marketSlide.title}
                    </h2>
                    <p className="text-cosmic-gold text-sm sm:text-base">{marketSlide.subtitle}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-8">
                    {marketSlide.stats.map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/5 rounded-xl p-3 sm:p-4 text-center border border-white/10"
                      >
                        <div className="font-heading text-2xl sm:text-3xl text-cosmic-gold mb-0.5 sm:mb-1">
                          {stat.value}
                        </div>
                        <p className="text-xs sm:text-sm font-heading">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="bg-nebula-500/10 rounded-xl p-4 sm:p-6 border border-nebula-500/20 text-center">
                    <p className="text-cosmic-white/80 text-sm sm:text-base">{marketSlide.insight}</p>
                  </div>
                </div>
              )}

              {slide.type === "business" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                  <div>
                    <h2 className="font-heading text-2xl sm:text-3xl tracking-wider mb-1 sm:mb-2">
                      {businessSlide.title}
                    </h2>
                    <p className="text-cosmic-gold text-sm sm:text-base mb-4 sm:mb-8">{businessSlide.subtitle}</p>
                    <div className="grid grid-cols-2 gap-2 sm:gap-4">
                      {businessSlide.metrics.map((metric, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10"
                        >
                          <p className="text-[10px] sm:text-xs text-cosmic-white/50 mb-0.5 sm:mb-1">{metric.label}</p>
                          <p className="font-heading text-xl sm:text-2xl text-cosmic-gold">{metric.value}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading text-base sm:text-lg tracking-wider mb-2 sm:mb-4">Revenue Mix</h3>
                    <div className="space-y-3 sm:space-y-4">
                      {businessSlide.revenue.map((item, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-xs sm:text-sm mb-1">
                            <span className="text-cosmic-white/70">{item.label}</span>
                            <span className="font-heading text-cosmic-gold">{item.pct}%</span>
                          </div>
                          <div className="h-2 sm:h-3 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.pct}%` }}
                              transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }}
                              className="h-full bg-gradient-to-r from-nebula-500 to-stellar-500 rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {slide.type === "traction" && (
                <div>
                  <div className="text-center mb-4 sm:mb-8">
                    <h2 className="font-heading text-2xl sm:text-3xl tracking-wider mb-1 sm:mb-2">
                      {tractionSlide.title}
                    </h2>
                    <p className="text-cosmic-gold text-sm sm:text-base">{tractionSlide.subtitle}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-8">
                    {tractionSlide.metrics.map((metric, i) => {
                      const Icon = metric.icon;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-white/5 rounded-xl p-3 sm:p-4 text-center border border-white/10"
                        >
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-cosmic-gold mx-auto mb-1 sm:mb-2" />
                          <div className="font-heading text-2xl sm:text-3xl text-cosmic-gold mb-0.5">
                            {metric.value}
                          </div>
                          <p className="text-[10px] sm:text-xs text-cosmic-white/60">{metric.label}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10">
                    <h3 className="font-heading text-base sm:text-lg tracking-wider mb-2 sm:mb-4">Milestones</h3>
                    <div className="space-y-2 sm:space-y-3">
                      {tractionSlide.milestones.map((milestone, i) => (
                        <div key={i} className="flex items-center gap-2 sm:gap-3">
                          <CheckCircle
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${
                              milestone.completed ? "text-green-400" : "text-cosmic-white/30"
                            }`}
                          />
                          <span
                            className={`text-sm sm:text-base ${
                              milestone.completed ? "text-cosmic-white/80" : "text-cosmic-white/40"
                            }`}
                          >
                            {milestone.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {slide.type === "competitive" && (
                <div>
                  <div className="text-center mb-4 sm:mb-8">
                    <h2 className="font-heading text-2xl sm:text-3xl tracking-wider mb-1 sm:mb-2">
                      {competitiveSlide.title}
                    </h2>
                    <p className="text-cosmic-gold text-sm sm:text-base">{competitiveSlide.subtitle}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-6">
                    {competitiveSlide.advantages.map((advantage, i) => {
                      const Icon = advantage.icon;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-white/5 rounded-xl p-3 sm:p-6 border border-white/10"
                        >
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-cosmic-gold/20 flex items-center justify-center mb-2 sm:mb-4">
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-cosmic-gold" />
                          </div>
                          <h3 className="font-heading text-sm sm:text-lg tracking-wider mb-1 sm:mb-2">
                            {advantage.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-cosmic-white/60">{advantage.description}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {slide.type === "team" && (
                <div className="text-center">
                  <h2 className="font-heading text-2xl sm:text-3xl tracking-wider mb-1 sm:mb-2">
                    {teamSlide.title}
                  </h2>
                  <p className="text-cosmic-gold text-sm sm:text-base mb-8 sm:mb-12">{teamSlide.subtitle}</p>
                  <div className="flex justify-center gap-8 mb-4 sm:mb-8">
                    {teamSlide.members.map((member, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-center"
                      >
                        <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-br from-nebula-500 to-stellar-500 flex items-center justify-center">
                          <span className="font-heading text-3xl sm:text-4xl">{member.initial}</span>
                        </div>
                        <h3 className="font-heading text-lg sm:text-xl tracking-wider mb-0.5 sm:mb-1">
                          {member.name}
                        </h3>
                        <p className="text-cosmic-gold text-sm sm:text-base">{member.role}</p>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-cosmic-white/50 text-xs sm:text-sm">{teamSlide.note}</p>
                </div>
              )}

              {slide.type === "investment" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                  <div>
                    <h2 className="font-heading text-2xl sm:text-3xl tracking-wider mb-1 sm:mb-2">
                      {investmentSlide.title}
                    </h2>
                    <p className="text-cosmic-gold text-sm sm:text-base mb-4 sm:mb-8">{investmentSlide.subtitle}</p>
                    <h3 className="font-heading text-base sm:text-lg tracking-wider mb-2 sm:mb-4">Use of Proceeds</h3>
                    <div className="space-y-3 sm:space-y-4">
                      {investmentSlide.useOfProceeds.map((item, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-xs sm:text-sm mb-1">
                            <span className="text-cosmic-white/70">{item.label}</span>
                            <span className="font-heading text-cosmic-gold">{item.pct}%</span>
                          </div>
                          <div className="h-2 sm:h-3 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.pct}%` }}
                              transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                              className={`h-full ${item.color} rounded-full`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading text-base sm:text-lg tracking-wider mb-2 sm:mb-4">Terms</h3>
                    <div className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10 space-y-3 sm:space-y-4">
                      {investmentSlide.terms.map((term, i) => (
                        <div key={i} className="flex justify-between py-1 sm:py-2 border-b border-white/10 last:border-0">
                          <span className="text-cosmic-white/60 text-sm">{term.label}</span>
                          <span className="font-heading text-cosmic-gold text-sm">{term.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {slide.type === "cta" && (
                <div className="h-full flex flex-col items-center justify-center text-center py-4 sm:py-8">
                  <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl tracking-wider mb-2 sm:mb-4">
                    {ctaSlide.title}
                  </h2>
                  <p className="text-xl sm:text-2xl md:text-3xl text-gradient mb-4 sm:mb-6">
                    {ctaSlide.subtitle}
                  </p>
                  <p className="text-cosmic-white/70 max-w-2xl mx-auto mb-6 sm:mb-10 text-sm sm:text-lg">
                    {ctaSlide.description}
                  </p>
                  <Link href="/apply" className="btn-gold text-sm sm:text-base px-6 py-3">
                    {ctaSlide.cta}
                  </Link>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Swipe hint for mobile */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-cosmic-white/30 text-xs sm:hidden">
            Swipe to navigate
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-4 sm:mt-6">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl transition-colors text-sm ${
              currentSlide === 0
                ? "bg-white/5 text-cosmic-white/30 cursor-not-allowed"
                : "bg-white/10 text-cosmic-white hover:bg-white/20 active:bg-white/30"
            }`}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Slide Indicators */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`transition-all p-1 ${
                  i === currentSlide
                    ? "text-cosmic-gold"
                    : "text-cosmic-white/30 hover:text-cosmic-white/50"
                }`}
              >
                <Circle className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${i === currentSlide ? "fill-current" : ""}`} />
              </button>
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl transition-colors text-sm ${
              currentSlide === slides.length - 1
                ? "bg-white/5 text-cosmic-white/30 cursor-not-allowed"
                : "bg-white/10 text-cosmic-white hover:bg-white/20 active:bg-white/30"
            }`}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

// ============ OVERVIEW CONTENT ============
function OverviewContent() {
  return (
    <>

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

// ============ MAIN PAGE COMPONENT ============
export default function InvestorLandingPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "pitch-deck">("overview");

  return (
    <>
      <StarField />

      {/* Tab Navigation */}
      <div className="fixed top-28 left-0 right-0 z-40 bg-space-900/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === "overview"
                  ? "text-cosmic-gold border-cosmic-gold"
                  : "text-cosmic-white/60 border-transparent hover:text-cosmic-white/80"
              }`}
            >
              <Info className="w-4 h-4" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab("pitch-deck")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === "pitch-deck"
                  ? "text-cosmic-gold border-cosmic-gold"
                  : "text-cosmic-white/60 border-transparent hover:text-cosmic-white/80"
              }`}
            >
              <Presentation className="w-4 h-4" />
              Pitch Deck
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "overview" ? (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="pt-12">
              <OverviewContent />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="pitch-deck"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="pt-12">
              <PitchDeckViewer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
