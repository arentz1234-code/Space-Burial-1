"use client";

import { useEffect } from "react";
import {
  Rocket,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Zap,
  Globe,
  CheckCircle,
  LucideIcon,
} from "lucide-react";

// Slide data (same as main pitch deck)
const slides = [
  {
    type: "title",
    tagline: "IMMORTALITY IS HERE",
    title: "Space Burial",
    subtitle: "Eternal Memorials Among the Stars",
    description: "Investor Pitch Deck | Series A Private Placement",
  },
  {
    type: "problem",
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
  },
  {
    type: "solution",
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
  },
  {
    type: "product",
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
  },
  {
    type: "market",
    title: "MARKET",
    subtitle: "Massive Opportunity",
    stats: [
      { value: "$23B", label: "Market Size" },
      { value: "2.8M", label: "Annual Deaths" },
      { value: "56%", label: "Cremation Rate" },
      { value: "$500M+", label: "Target Market" },
    ],
    insight: "Cremation rate grew from 27% to 56%, creating massive opportunity.",
  },
  {
    type: "business",
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
  },
  {
    type: "traction",
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
  },
  {
    type: "competitive",
    title: "COMPETITIVE EDGE",
    subtitle: "First Mover Advantage",
    advantages: [
      { title: "Category Creation", description: "Leading a new category", icon: Zap },
      { title: "Launch Partners", description: "FAA-licensed providers", icon: Rocket },
      { title: "Technology", description: "Proprietary platform", icon: Globe },
      { title: "Brand", description: "Premium positioning", icon: Target },
    ] as { title: string; description: string; icon: LucideIcon }[],
  },
  {
    type: "team",
    title: "LEADERSHIP",
    subtitle: "Visionary Team",
    members: [{ name: "Steven Ferris", role: "Founder & CEO", initial: "S" }],
    note: "Building team to scale",
  },
  {
    type: "investment",
    title: "THE OPPORTUNITY",
    subtitle: "Series A Private Placement",
    useOfProceeds: [
      { label: "Product & Tech", pct: 35 },
      { label: "Partnerships", pct: 25 },
      { label: "Marketing", pct: 25 },
      { label: "Operations", pct: 15 },
    ],
    terms: [
      { label: "Security", value: "Series A Preferred" },
      { label: "Compliance", value: "SEC 506(c)" },
      { label: "Investors", value: "Accredited Only" },
    ],
  },
  {
    type: "cta",
    title: "JOIN US",
    subtitle: "Invest in Immortality",
    description: "Be part of something unprecedented - eternal memorials among the stars.",
  },
];

export default function PrintPitchDeck() {
  useEffect(() => {
    // Auto-trigger print dialog after page loads
    setTimeout(() => {
      window.print();
    }, 500);
  }, []);

  return (
    <div className="print-deck bg-[#0a0a1a] text-white min-h-screen">
      <style jsx global>{`
        @media print {
          @page {
            size: landscape;
            margin: 0.5in;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .slide {
            page-break-after: always;
            page-break-inside: avoid;
          }
          .slide:last-child {
            page-break-after: auto;
          }
        }
      `}</style>

      {slides.map((slide, index) => (
        <div
          key={index}
          className="slide bg-gradient-to-br from-[#0a0a1a] to-[#1a1a3a] min-h-[100vh] p-12 flex flex-col justify-center"
        >
          <div className="max-w-5xl mx-auto w-full">
            {/* Slide number */}
            <div className="text-[#d4af37]/50 text-sm mb-4">
              {index + 1} / {slides.length}
            </div>

            {slide.type === "title" && (
              <div className="text-center py-16">
                <p className="text-[#d4af37] text-xl tracking-[0.3em] mb-4">
                  {slide.tagline}
                </p>
                <h1 className="text-7xl font-bold tracking-wider mb-4">
                  {slide.title}
                </h1>
                <p className="text-4xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">
                  {slide.subtitle}
                </p>
                <p className="text-white/50 text-lg">{slide.description}</p>
              </div>
            )}

            {slide.type === "problem" && (
              <div className="grid grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                  <p className="text-[#d4af37] text-xl mb-8">{slide.subtitle}</p>
                  <ul className="space-y-4">
                    {slide.points?.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-400 mt-2" />
                        <span className="text-lg text-white/80">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center">
                  <div className="inline-block bg-[#1a1a3a] rounded-2xl p-10 border border-[#d4af37]/30">
                    <div className="text-6xl font-bold text-[#d4af37] mb-2">
                      {slide.statValue}
                    </div>
                    <p className="text-white/60 text-lg">{slide.statLabel}</p>
                  </div>
                </div>
              </div>
            )}

            {slide.type === "solution" && (
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                <p className="text-[#d4af37] text-xl mb-6">{slide.subtitle}</p>
                <p className="text-white/70 text-xl max-w-3xl mx-auto mb-12">
                  {slide.description}
                </p>
                <div className="grid grid-cols-4 gap-6">
                  {slide.features?.map((feature, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
                      <p className="text-white/80">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {slide.type === "product" && (
              <div className="grid grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                  <p className="text-[#d4af37] text-xl mb-8">{slide.subtitle}</p>
                  <div className="space-y-4">
                    {slide.features?.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#d4af37] mt-1" />
                        <div>
                          <span className="font-bold">{(feature as {label: string; description: string}).label}</span>
                          <span className="text-white/50"> - {(feature as {label: string; description: string}).description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <div className="inline-block bg-[#1a1a3a] rounded-2xl p-10 border border-[#d4af37]/30">
                    <p className="text-white/50 mb-2">Starting at</p>
                    <div className="text-6xl font-bold text-[#d4af37] mb-2">
                      {slide.price}
                    </div>
                    <p className="text-white/50">{slide.priceNote}</p>
                  </div>
                </div>
              </div>
            )}

            {slide.type === "market" && (
              <div>
                <div className="text-center mb-10">
                  <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                  <p className="text-[#d4af37] text-xl">{slide.subtitle}</p>
                </div>
                <div className="grid grid-cols-4 gap-6 mb-10">
                  {slide.stats?.map((stat, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-6 text-center border border-white/10">
                      <div className="text-4xl font-bold text-[#d4af37] mb-2">{stat.value}</div>
                      <p className="text-white/80">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/20 text-center">
                  <p className="text-white/80 text-lg">{slide.insight}</p>
                </div>
              </div>
            )}

            {slide.type === "business" && (
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                  <p className="text-[#d4af37] text-xl mb-8">{slide.subtitle}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {slide.metrics?.map((metric, i) => (
                      <div key={i} className="bg-white/5 rounded-xl p-5 border border-white/10">
                        <p className="text-white/50 text-sm mb-1">{metric.label}</p>
                        <p className="text-3xl font-bold text-[#d4af37]">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-6">Revenue Mix</h3>
                  <div className="space-y-5">
                    {slide.revenue?.map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-2">
                          <span className="text-white/70">{item.label}</span>
                          <span className="font-bold text-[#d4af37]">{item.pct}%</span>
                        </div>
                        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                            style={{ width: `${item.pct}%` }}
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
                <div className="text-center mb-10">
                  <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                  <p className="text-[#d4af37] text-xl">{slide.subtitle}</p>
                </div>
                <div className="grid grid-cols-4 gap-6 mb-10">
                  {slide.metrics?.map((metric, i) => {
                    const Icon = metric.icon;
                    return (
                      <div key={i} className="bg-white/5 rounded-xl p-6 text-center border border-white/10">
                        <Icon className="w-8 h-8 text-[#d4af37] mx-auto mb-3" />
                        <div className="text-4xl font-bold text-[#d4af37] mb-1">{metric.value}</div>
                        <p className="text-white/60">{metric.label}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold mb-4">Milestones</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {slide.milestones?.map((milestone, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle className={`w-5 h-5 ${milestone.completed ? "text-green-400" : "text-white/30"}`} />
                        <span className={milestone.completed ? "text-white/80" : "text-white/40"}>
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
                <div className="text-center mb-10">
                  <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                  <p className="text-[#d4af37] text-xl">{slide.subtitle}</p>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  {slide.advantages?.map((adv, i) => {
                    const Icon = adv.icon;
                    return (
                      <div key={i} className="bg-white/5 rounded-xl p-8 border border-white/10">
                        <div className="w-14 h-14 rounded-xl bg-[#d4af37]/20 flex items-center justify-center mb-4">
                          <Icon className="w-7 h-7 text-[#d4af37]" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{adv.title}</h3>
                        <p className="text-white/60">{adv.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {slide.type === "team" && (
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                <p className="text-[#d4af37] text-xl mb-16">{slide.subtitle}</p>
                <div className="flex justify-center gap-12 mb-8">
                  {slide.members?.map((member, i) => (
                    <div key={i} className="text-center">
                      <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <span className="text-6xl font-bold">{member.initial}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                      <p className="text-[#d4af37] text-lg">{member.role}</p>
                    </div>
                  ))}
                </div>
                <p className="text-white/50">{slide.note}</p>
              </div>
            )}

            {slide.type === "investment" && (
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                  <p className="text-[#d4af37] text-xl mb-8">{slide.subtitle}</p>
                  <h3 className="text-2xl font-bold mb-6">Use of Proceeds</h3>
                  <div className="space-y-5">
                    {slide.useOfProceeds?.map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-2">
                          <span className="text-white/70">{item.label}</span>
                          <span className="font-bold text-[#d4af37]">{item.pct}%</span>
                        </div>
                        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-[#d4af37] rounded-full"
                            style={{ width: `${item.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-6">Terms</h3>
                  <div className="bg-white/5 rounded-xl p-8 border border-white/10 space-y-5">
                    {slide.terms?.map((term, i) => (
                      <div key={i} className="flex justify-between py-3 border-b border-white/10 last:border-0">
                        <span className="text-white/60">{term.label}</span>
                        <span className="font-bold text-[#d4af37]">{term.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {slide.type === "cta" && (
              <div className="text-center py-16">
                <h2 className="text-6xl font-bold mb-4">{slide.title}</h2>
                <p className="text-4xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">
                  {slide.subtitle}
                </p>
                <p className="text-white/70 text-2xl max-w-3xl mx-auto mb-12">
                  {slide.description}
                </p>
                <div className="inline-block bg-[#d4af37] text-black font-bold px-10 py-4 rounded-xl text-xl">
                  Contact Us to Learn More
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
