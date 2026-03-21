"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import StarField from "@/components/shared/StarField";
import {
  Rocket,
  Shield,
  Building2,
  Users,
  BadgeCheck,
  Database,
  DollarSign,
  Sparkles,
  ChevronDown,
  ArrowRight,
  Star,
  Globe,
  MapPin,
  Ship,
  Video,
  Mail,
  Check,
  Play,
  Clock,
  Heart,
  Compass,
} from "lucide-react";

const journeySteps = [
  {
    id: 1,
    icon: Heart,
    title: "Begin Your Journey",
    subtitle: "A Decision of Love",
    content:
      "A part of you or your loved one will embark on a timeless journey through the stars while remaining connected to Earth. This is the ultimate tribute — a memorial that transcends time itself.",
    color: "stellar",
    visual: "heart",
  },
  {
    id: 2,
    icon: Compass,
    title: "Choose Your Package",
    subtitle: "Tailored to Your Wishes",
    content:
      "Select from our carefully crafted memorial packages. From the Stardust experience to our premium Eternal tier, each option offers a unique way to honor your loved one among the cosmos.",
    color: "cosmic-gold",
    visual: "packages",
  },
  {
    id: 3,
    icon: Mail,
    title: "Simple Shipping",
    subtitle: "We Handle Everything",
    content:
      "The U.S. Postal Service provides free shipping containers specifically labeled for cremated remains. Priority Mail Express costs about $30 nationwide to Cape Canaveral. We guide you through every step.",
    color: "nebula",
    visual: "shipping",
  },
  {
    id: 4,
    icon: Building2,
    title: "Professional Care",
    subtitle: "Dignified & Transparent",
    content:
      "Working with local funeral establishments and certified launch providers, we ensure a dignified process. Every step is documented, and you receive a cargo manifest by name for complete peace of mind.",
    color: "stellar",
    visual: "care",
  },
  {
    id: 5,
    icon: Rocket,
    title: "Launch Day",
    subtitle: "Cape Canaveral, Florida",
    content:
      "Your loved one's journey begins from the historic Cape Canaveral Space Force Station or Kennedy Space Center — the same launchpads that sent humanity to the Moon. Family members are welcome to attend.",
    color: "cosmic-gold",
    visual: "launch",
  },
  {
    id: 6,
    icon: Star,
    title: "Among the Stars",
    subtitle: "Forever in the Cosmos",
    content:
      "Once in orbit, their memorial capsule circles Earth, eventually re-entering the atmosphere as a shooting star — a brilliant final tribute visible from below. Their legacy becomes part of the universe itself.",
    color: "nebula",
    visual: "stars",
  },
];

const stats = [
  { value: "100%", label: "Insured Launches" },
  { value: "24/7", label: "Mission Tracking" },
  { value: "Cape Canaveral", label: "Launch Site" },
  { value: "Forever", label: "Digital Memorial" },
];

const faqs = [
  {
    question: "Can I attend the launch?",
    answer:
      "Yes, family members and loved ones are welcome to attend the launch at Cape Canaveral. We provide viewing information and coordinates for the launch date so you can witness this meaningful moment as your loved one begins their eternal journey among the stars.",
  },
  {
    question: "What happens to the ashes in space?",
    answer:
      "Once in orbit, the spacecraft carrying your loved one's remains will orbit Earth, eventually re-entering the atmosphere where it will create a beautiful shooting star – a final, brilliant tribute visible from Earth. Some missions are designed for deep space, traveling beyond Earth's orbit into the cosmos forever.",
  },
  {
    question: "How much ashes are used for Space Burial?",
    answer:
      "Only a symbolic portion of cremated remains (typically 1-7 grams depending on the package) is required for space burial. This allows families to keep the majority of remains for other memorial purposes while still sending a meaningful part of their loved one to space.",
  },
  {
    question: "Can I pre-book a Space Burial?",
    answer:
      "Absolutely. Many customers choose to pre-arrange their own space burial as part of their end-of-life planning. Pre-booking locks in current pricing and ensures your wishes are documented and ready to be fulfilled when the time comes.",
  },
  {
    question: "Can I track the Space Burial?",
    answer:
      "Yes, each customer receives access to our digital memorial platform where you can track the mission status, view launch footage, and access your personalized memorial page. Real-time orbital tracking is available for missions in Earth orbit.",
  },
  {
    question: "What does the scattering of ashes at sea entail?",
    answer:
      "Our Starburst Orbiter package includes a solemn sea burial ceremony off the Cape Canaveral coast. A portion of remains is scattered into the Atlantic Ocean in full compliance with U.S. Coast Guard regulations, while another portion is sent to space – combining two timeless tributes in one meaningful service.",
  },
  {
    question: "How do I ship the cremated remains?",
    answer:
      "The U.S. Postal Service provides free shipping containers specifically labeled for CREMATED REMAINS. The average cost of the required Priority Mail Express is about $30.00 Nationwide to Cape Canaveral. We provide detailed instructions upon booking.",
  },
];

const trustBadges = [
  { icon: Building2, text: "Delaware Corporation" },
  { icon: BadgeCheck, text: "Florida Authorized" },
  { icon: Shield, text: "Fully Insured" },
  { icon: Database, text: "Backup Storage" },
];

function JourneyStep({ step, index }: { step: typeof journeySteps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  const getColorClasses = (color: string) => {
    switch (color) {
      case "cosmic-gold":
        return {
          bg: "bg-cosmic-gold/20",
          text: "text-cosmic-gold",
          border: "border-cosmic-gold/30",
          glow: "shadow-cosmic-gold/20",
          gradient: "from-cosmic-gold/20 to-yellow-500/10",
        };
      case "stellar":
        return {
          bg: "bg-stellar-400/20",
          text: "text-stellar-400",
          border: "border-stellar-400/30",
          glow: "shadow-stellar-400/20",
          gradient: "from-stellar-400/20 to-blue-500/10",
        };
      default:
        return {
          bg: "bg-nebula-500/20",
          text: "text-nebula-400",
          border: "border-nebula-500/30",
          glow: "shadow-nebula-500/20",
          gradient: "from-nebula-500/20 to-purple-500/10",
        };
    }
  };

  const colors = getColorClasses(step.color);
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative min-h-[80vh] flex items-center py-16 sm:py-24">
      {/* Background gradient blob */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`absolute ${isEven ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial ${colors.gradient} blur-3xl opacity-30 pointer-events-none`}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16`}>
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Step indicator */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ type: "spring", delay: 0.1 }}
              className={`inline-flex items-center gap-2 ${colors.bg} ${colors.border} border rounded-full px-4 py-1.5 mb-6`}
            >
              <span className={`text-xs font-heading tracking-wider ${colors.text}`}>
                Step {step.id} of {journeySteps.length}
              </span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black mb-3 leading-tight">
              {step.title}
            </h2>

            <p className={`text-lg sm:text-xl ${colors.text} font-heading tracking-wider mb-6`}>
              {step.subtitle}
            </p>

            <p className="text-cosmic-white/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              {step.content}
            </p>

            {/* Progress dots for mobile */}
            <div className="flex justify-center lg:justify-start gap-2 mt-8">
              {journeySteps.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === index ? `${colors.bg} ${colors.border} border w-8` : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: isEven ? 50 : -50 }}
            animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 w-full max-w-md lg:max-w-none"
          >
            <div className={`relative aspect-square max-w-[400px] mx-auto`}>
              {/* Outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className={`absolute inset-0 rounded-full border-2 ${colors.border} border-dashed`}
              />

              {/* Inner glow */}
              <div className={`absolute inset-8 rounded-full bg-gradient-to-br ${colors.gradient} blur-xl`} />

              {/* Center icon */}
              <div className={`absolute inset-12 rounded-full ${colors.bg} ${colors.border} border-2 flex items-center justify-center backdrop-blur-sm`}>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <step.icon className={`w-16 h-16 sm:w-24 sm:h-24 ${colors.text}`} />
                </motion.div>
              </div>

              {/* Orbiting elements */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                  style={{ rotate: i * 120 }}
                >
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${colors.bg} ${colors.border} border`} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorksPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform scroll progress to rocket position (bottom to top)
  const rocketBottom = useTransform(scrollYProgress, [0, 0.85], ["5%", "85%"]);
  const trailHeight = useTransform(scrollYProgress, [0, 0.85], ["0%", "100%"]);
  const rocketScale = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [1, 1.2, 1.2, 1]);
  const flameOpacity = useTransform(scrollYProgress, [0, 0.05, 0.8, 0.85], [0.3, 1, 1, 0.3]);

  return (
    <div ref={containerRef}>
      <StarField />

      {/* Fixed Sidebar Rocket Launch Progress */}
      <div className="fixed left-4 sm:left-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center h-[70vh]">
        {/* Launch track background */}
        <div className="absolute inset-0 w-1 left-1/2 -translate-x-1/2 bg-white/10 rounded-full" />

        {/* Progress trail (fire trail) */}
        <motion.div
          style={{ height: trailHeight }}
          className="absolute bottom-0 w-1.5 left-1/2 -translate-x-1/2 bg-gradient-to-t from-orange-500 via-cosmic-gold to-transparent rounded-full origin-bottom"
        />

        {/* Glowing trail effect */}
        <motion.div
          style={{ height: trailHeight }}
          className="absolute bottom-0 w-4 left-1/2 -translate-x-1/2 bg-gradient-to-t from-orange-500/30 via-cosmic-gold/20 to-transparent blur-sm rounded-full origin-bottom"
        />

        {/* Step markers */}
        {journeySteps.map((step, i) => {
          const position = (i / (journeySteps.length - 1)) * 100;
          return (
            <div
              key={step.id}
              className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white/30 bg-space-900 z-10"
              style={{ bottom: `${5 + position * 0.8}%` }}
            />
          );
        })}

        {/* Rocket */}
        <motion.div
          style={{ bottom: rocketBottom, scale: rocketScale }}
          className="absolute left-1/2 -translate-x-1/2 z-20"
        >
          <div className="relative">
            {/* Rocket glow */}
            <div className="absolute inset-0 w-12 h-12 -left-3 -top-3 bg-cosmic-gold/30 rounded-full blur-xl" />

            {/* Rocket icon */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <Rocket className="w-6 h-6 text-cosmic-gold rotate-0 drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
            </motion.div>

            {/* Rocket flame */}
            <motion.div
              style={{ opacity: flameOpacity }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
              <motion.div
                animate={{ scaleY: [1, 1.3, 1], opacity: [1, 0.8, 1] }}
                transition={{ duration: 0.15, repeat: Infinity }}
                className="w-2 h-4 bg-gradient-to-b from-cosmic-gold via-orange-500 to-red-500 rounded-full"
              />
              <motion.div
                animate={{ scaleY: [1, 1.5, 1], opacity: [0.8, 0.5, 0.8] }}
                transition={{ duration: 0.1, repeat: Infinity }}
                className="w-1 h-3 -mt-1 bg-gradient-to-b from-orange-500 to-transparent rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Start label */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-[10px] text-cosmic-white/40 font-heading tracking-wider">LAUNCH</span>
        </div>

        {/* End label */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-[10px] text-cosmic-white/40 font-heading tracking-wider">ORBIT</span>
        </div>
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-space-900/50 to-space-900" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          {/* Animated rings */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-cosmic-gold/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full border border-stellar-400/30"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-8 rounded-full border border-nebula-400/30"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={heroInView ? { scale: 1 } : {}}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-cosmic-gold/30 to-stellar-400/30 flex items-center justify-center backdrop-blur-sm">
                <Rocket className="w-8 h-8 sm:w-10 sm:h-10 text-cosmic-gold" />
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="font-heading text-[10px] sm:text-xs tracking-[0.3em] uppercase text-cosmic-gold mb-4"
          >
            Your Journey to the Stars
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-7xl font-heading font-black mb-6 leading-tight"
          >
            How It <span className="text-gradient">Works</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl text-cosmic-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            From your first contact to the moment of launch, we guide you through
            every step of this meaningful journey.
          </motion.p>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12"
          >
            {trustBadges.map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 sm:px-4 py-2"
              >
                <badge.icon className="w-4 h-4 text-cosmic-gold" />
                <span className="text-xs sm:text-sm text-cosmic-white/70">{badge.text}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-cosmic-white/40"
          >
            <span className="text-xs tracking-widest uppercase">Scroll to Explore</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* Journey Steps */}
      {journeySteps.map((step, index) => (
        <JourneyStep key={step.id} step={step} index={index} />
      ))}

      {/* Stats Section */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-cosmic-white/50">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Starburst Orbiter Feature */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-card p-8 sm:p-12 border border-cosmic-gold/30 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-cosmic-gold/10 via-transparent to-stellar-400/10" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-cosmic-gold/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-stellar-400/10 blur-3xl" />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-8 h-8 text-cosmic-gold" />
                </motion.div>
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl tracking-wider text-center">
                  The <span className="text-gradient">Starburst Orbiter</span>
                </h2>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-8 h-8 text-cosmic-gold" />
                </motion.div>
              </div>

              <p className="text-cosmic-white/70 text-sm sm:text-base leading-relaxed mb-8 max-w-3xl mx-auto text-center">
                Our premium package combines two timeless tributes: a solemn sea burial ceremony
                off the majestic Cape Canaveral coast, followed by a space burial among the stars.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: Ship, title: "Sea Ceremony", desc: "Cape Canaveral Coast" },
                  { icon: Rocket, title: "Space Burial", desc: "Among the Stars" },
                  { icon: BadgeCheck, title: "Coast Guard", desc: "Fully Compliant" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/5 rounded-xl p-5 text-center group hover:bg-white/10 transition-colors"
                  >
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-cosmic-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6 text-cosmic-gold" />
                    </div>
                    <p className="text-sm font-heading tracking-wider text-cosmic-white mb-1">{item.title}</p>
                    <p className="text-xs text-cosmic-white/40">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/services"
                  className="btn-primary inline-flex items-center gap-2 group"
                >
                  Explore This Package
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="font-heading text-xs tracking-[0.3em] uppercase text-cosmic-gold mb-4">
              Common Questions
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card overflow-hidden group"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-heading text-sm sm:text-base tracking-wider pr-4 group-hover:text-cosmic-gold transition-colors">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: expandedFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-cosmic-gold shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {expandedFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-cosmic-white/60 leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
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
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-cosmic-gold/5 via-transparent to-stellar-400/5" />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cosmic-gold/10 rounded-full blur-3xl"
            />

            <div className="relative z-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-cosmic-gold/30 to-stellar-400/30 flex items-center justify-center"
              >
                <Star className="w-10 h-10 text-cosmic-gold" />
              </motion.div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black mb-4">
                Ready to Begin?
              </h2>

              <p className="text-cosmic-white/60 mb-10 max-w-xl mx-auto text-base sm:text-lg">
                Take the first step toward an eternal tribute among the stars.
                Our team is here to guide you through every moment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="btn-primary flex items-center justify-center gap-2 text-base px-8 py-4 group"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/services"
                  className="btn-secondary flex items-center justify-center gap-2 text-base px-8 py-4"
                >
                  View All Packages
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="h-20" />
    </div>
  );
}
