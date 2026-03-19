"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import StarField from "@/components/shared/StarField";
import {
  Phone,
  ClipboardCheck,
  Package,
  Bell,
  Rocket,
  Satellite,
  ChevronDown,
  ChevronRight,
  Play,
  Shield,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Star,
  Globe,
  Clock,
  Heart,
} from "lucide-react";

const journeySteps = [
  {
    id: 1,
    icon: Phone,
    title: "Consultation",
    subtitle: "Week 1",
    headline: "Begin with a Conversation",
    description:
      "Our compassionate team is here to guide you. We'll discuss your vision, answer every question, and help you choose the perfect memorial package for your loved one.",
    details: [
      "Free 30-minute consultation call",
      "No pressure, no obligations",
      "Personalized package recommendations",
      "Payment plan options available",
    ],
    color: "nebula",
  },
  {
    id: 2,
    icon: ClipboardCheck,
    title: "Reservation",
    subtitle: "Week 1-2",
    headline: "Secure Your Place Among the Stars",
    description:
      "Complete your reservation online with a simple deposit. We handle all the logistics, paperwork, and coordination — you focus on what matters most.",
    details: [
      "Secure online reservation system",
      "Flexible payment plans",
      "Mission date selection",
      "Digital memorial page setup",
    ],
    color: "cosmic-gold",
  },
  {
    id: 3,
    icon: Package,
    title: "Capsule Preparation",
    subtitle: "Week 2-4",
    headline: "Crafting the Memorial",
    description:
      "Using our secure, dignified shipping process, send us the cremated remains. Our specialists craft a custom memorial capsule, ready for its eternal journey.",
    details: [
      "Prepaid secure shipping kit",
      "Chain of custody documentation",
      "Custom capsule engraving",
      "Quality verification process",
    ],
    color: "stellar",
  },
  {
    id: 4,
    icon: Bell,
    title: "Pre-Launch Updates",
    subtitle: "Ongoing",
    headline: "Stay Connected to the Mission",
    description:
      "Receive regular updates as launch day approaches. We'll keep you informed with mission briefings, weather updates, and your personalized flight certificate.",
    details: [
      "Weekly mission status updates",
      "Launch window notifications",
      "Personalized flight certificate",
      "VIP viewing access details",
    ],
    color: "nebula",
  },
  {
    id: 5,
    icon: Rocket,
    title: "Launch Day",
    subtitle: "The Moment",
    headline: "Witness the Ascent",
    description:
      "The day arrives. Watch live — in person at the launch site or via HD stream with family worldwide. Share this profound moment as your loved one begins their eternal voyage.",
    details: [
      "Live HD launch stream",
      "In-person viewing option",
      "Professional photography",
      "Commemorative launch video",
    ],
    color: "cosmic-gold",
  },
  {
    id: 6,
    icon: Satellite,
    title: "Eternal Journey",
    subtitle: "Forever",
    headline: "A Legacy Among the Stars",
    description:
      "Access your mission tracking dashboard anytime. Watch as your loved one travels through the cosmos — a journey that continues for generations to come.",
    details: [
      "Real-time orbital tracking",
      "Interactive star map",
      "Annual trajectory reports",
      "Forever-accessible memorial page",
    ],
    color: "stellar",
  },
];

const stats = [
  { value: "47", label: "Successful Missions", icon: Rocket },
  { value: "2,400+", label: "Souls Among Stars", icon: Star },
  { value: "100%", label: "Mission Success Rate", icon: Shield },
  { value: "24/7", label: "Family Support", icon: Heart },
];

const faqs = [
  {
    question: "How long does the entire process take?",
    answer:
      "From initial consultation to launch day typically takes 2-6 months, depending on mission schedules. We work with multiple launch providers to offer flexible timing options.",
  },
  {
    question: "What happens to the remains in space?",
    answer:
      "Depending on the mission type, remains either orbit Earth for years before re-entering (creating a shooting star), travel to deep space permanently, or journey to the lunar surface for eternal rest on the Moon.",
  },
  {
    question: "Can family attend the launch in person?",
    answer:
      "Yes! Voyager and Eternal package holders receive VIP launch viewing access. We coordinate travel and accommodation recommendations for families who wish to attend.",
  },
  {
    question: "Is this legal and safe?",
    answer:
      "Absolutely. We partner with licensed aerospace companies and comply with all FAA and international space regulations. The process is dignified, secure, and legally recognized.",
  },
];

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rocketY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const rocketScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);

  // Update active step based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-step]");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
          const step = parseInt(section.getAttribute("data-step") || "1");
          setActiveStep(step);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getColorClasses = (color: string) => {
    switch (color) {
      case "cosmic-gold":
        return {
          bg: "bg-cosmic-gold/20",
          text: "text-cosmic-gold",
          border: "border-cosmic-gold/30",
          glow: "shadow-cosmic-gold/20",
        };
      case "stellar":
        return {
          bg: "bg-stellar-400/20",
          text: "text-stellar-400",
          border: "border-stellar-400/30",
          glow: "shadow-stellar-400/20",
        };
      default:
        return {
          bg: "bg-nebula-500/20",
          text: "text-nebula-400",
          border: "border-nebula-500/30",
          glow: "shadow-nebula-500/20",
        };
    }
  };

  return (
    <>
      <StarField />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-space-900/50 to-space-900" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-nebula-500/30 to-stellar-500/30 flex items-center justify-center"
          >
            <Globe className="w-10 h-10 sm:w-12 sm:h-12 text-cosmic-gold" />
          </motion.div>

          <p className="font-heading text-[10px] sm:text-xs tracking-[0.3em] uppercase text-cosmic-gold mb-4">
            Your Journey to the Stars
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-black mb-6 leading-tight">
            From Earth
            <br />
            <span className="text-gradient">To Eternity</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-cosmic-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            A dignified, guided process that transforms grief into a celebration of life among the
            cosmos. Here's how we make it happen.
          </p>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-cosmic-white/40"
          >
            <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* Sticky Progress Indicator */}
      <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-50">
        <div className="relative">
          {/* Rocket that moves with scroll */}
          <motion.div
            style={{ top: rocketY, scale: rocketScale }}
            className="absolute -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-cosmic-gold to-orange-500 flex items-center justify-center shadow-lg shadow-cosmic-gold/30"
          >
            <Rocket className="w-5 h-5 text-white -rotate-45" />
          </motion.div>

          {/* Step indicators */}
          <div className="flex flex-col gap-8 ml-6">
            {journeySteps.map((step) => (
              <button
                key={step.id}
                onClick={() => {
                  document.querySelector(`[data-step="${step.id}"]`)?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
                className={`flex items-center gap-3 transition-all duration-300 ${
                  activeStep === step.id
                    ? "opacity-100"
                    : activeStep > step.id
                    ? "opacity-60"
                    : "opacity-30"
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeStep >= step.id ? "bg-cosmic-gold scale-100" : "bg-white/30 scale-75"
                  }`}
                />
                <span
                  className={`text-xs font-heading tracking-wider transition-all ${
                    activeStep === step.id ? "text-cosmic-gold" : "text-cosmic-white/50"
                  }`}
                >
                  {step.title}
                </span>
              </button>
            ))}
          </div>

          {/* Connecting line */}
          <div className="absolute left-[5px] top-0 bottom-0 w-[2px] bg-white/10">
            <motion.div
              className="w-full bg-gradient-to-b from-cosmic-gold to-stellar-400"
              style={{ height: rocketY }}
            />
          </div>
        </div>
      </div>

      {/* Journey Steps */}
      <div ref={containerRef} className="relative z-10">
        {journeySteps.map((step, index) => {
          const colors = getColorClasses(step.color);
          const isEven = index % 2 === 0;

          return (
            <section
              key={step.id}
              data-step={step.id}
              className="min-h-screen flex items-center py-20 px-4 sm:px-6"
            >
              <div className="max-w-6xl mx-auto w-full">
                <div
                  className={`flex flex-col ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-8 lg:gap-16`}
                >
                  {/* Visual Side */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 w-full"
                  >
                    <div
                      className={`relative aspect-square max-w-md mx-auto rounded-3xl ${colors.bg} border ${colors.border} overflow-hidden`}
                    >
                      {/* Animated background pattern */}
                      <div className="absolute inset-0 opacity-30">
                        {[...Array(20)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                              opacity: [0.2, 1, 0.2],
                              scale: [1, 1.5, 1],
                            }}
                            transition={{
                              duration: 2 + Math.random() * 2,
                              repeat: Infinity,
                              delay: Math.random() * 2,
                            }}
                          />
                        ))}
                      </div>

                      {/* Center icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          whileInView={{ scale: [0.8, 1], rotate: [0, 360] }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full ${colors.bg} flex items-center justify-center shadow-2xl ${colors.glow}`}
                        >
                          <step.icon className={`w-12 h-12 sm:w-16 sm:h-16 ${colors.text}`} />
                        </motion.div>
                      </div>

                      {/* Step number */}
                      <div className="absolute top-6 left-6">
                        <span
                          className={`font-heading text-6xl sm:text-8xl font-black ${colors.text} opacity-20`}
                        >
                          {step.id}
                        </span>
                      </div>

                      {/* Timeline badge */}
                      <div className="absolute bottom-6 right-6">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${colors.bg}`}>
                          <Clock className={`w-3 h-3 ${colors.text}`} />
                          <span className={`text-xs font-heading tracking-wider ${colors.text}`}>
                            {step.subtitle}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Content Side */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex-1 text-center lg:text-left"
                  >
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${colors.bg} mb-4`}>
                      <span className={`text-xs font-heading tracking-wider ${colors.text}`}>
                        Step {step.id}
                      </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black mb-4">
                      {step.headline}
                    </h2>

                    <p className="text-base sm:text-lg text-cosmic-white/60 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                      {step.description}
                    </p>

                    {/* Details list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto lg:mx-0">
                      {step.details.map((detail, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle2 className={`w-4 h-4 ${colors.text} shrink-0`} />
                          <span className="text-sm text-cosmic-white/70">{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Stats Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-heading font-black mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-cosmic-white/50">
              Join families worldwide who have chosen the stars for their loved ones.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <stat.icon className="w-6 h-6 text-cosmic-gold mx-auto mb-3" />
                <p className="font-heading text-2xl sm:text-3xl text-cosmic-white mb-1">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-cosmic-white/50">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6">
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
            <h2 className="text-2xl sm:text-3xl font-heading font-black">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-heading text-sm sm:text-base tracking-wider pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-cosmic-gold shrink-0 transition-transform ${
                      expandedFaq === i ? "rotate-180" : ""
                    }`}
                  />
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
                      <p className="px-5 pb-5 text-sm text-cosmic-white/60 leading-relaxed">
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
      <section className="relative z-10 py-20 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card p-8 sm:p-12 text-center border border-cosmic-gold/20 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cosmic-gold/5 via-transparent to-stellar-400/5" />

            <div className="relative z-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-6 rounded-full bg-cosmic-gold/20 flex items-center justify-center"
              >
                <Star className="w-8 h-8 text-cosmic-gold" />
              </motion.div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black mb-4">
                Ready to Begin the Journey?
              </h2>

              <p className="text-cosmic-white/60 mb-8 max-w-xl mx-auto">
                Our team is here to guide you with compassion and care. Schedule a free consultation
                to learn how we can honor your loved one among the stars.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-primary flex items-center justify-center gap-2">
                  Schedule Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/services" className="btn-secondary flex items-center justify-center gap-2">
                  View Memorial Packages
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Bottom spacing */}
      <div className="h-20" />
    </>
  );
}
