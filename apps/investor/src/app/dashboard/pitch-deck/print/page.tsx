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
} from "lucide-react";

export default function PrintPitchDeck() {
  useEffect(() => {
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

      {/* Slide 1: Title */}
      <div className="slide bg-gradient-to-br from-[#0a0a1a] to-[#1a1a3a] min-h-[100vh] p-12 flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full text-center">
          <p className="text-[#d4af37]/50 text-sm mb-4">1 / 11</p>
          <p className="text-[#d4af37] text-xl tracking-[0.3em] mb-4">IMMORTALITY IS HERE</p>
          <h1 className="text-7xl font-bold tracking-wider mb-4">Space Burial</h1>
          <p className="text-4xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">
            Eternal Memorials Among the Stars
          </p>
          <p className="text-white/50 text-lg">Investor Pitch Deck | Series A Private Placement</p>
        </div>
      </div>

      {/* Slide 2: Problem */}
      <div className="slide bg-gradient-to-br from-[#0a0a1a] to-[#1a1a3a] min-h-[100vh] p-12 flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full">
          <p className="text-[#d4af37]/50 text-sm mb-4">2 / 11</p>
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-2">THE PROBLEM</h2>
              <p className="text-[#d4af37] text-xl mb-8">Traditional Memorials Are Limiting</p>
              <ul className="space-y-4">
                {["Cemetery space is finite and expensive", "Traditional burials lack personalization", "No way to create eternal tributes", "Families want meaningful alternatives", "Growing demand for premium options"].map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2" />
                    <span className="text-lg text-white/80">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center">
              <div className="inline-block bg-[#1a1a3a] rounded-2xl p-10 border border-[#d4af37]/30">
                <div className="text-6xl font-bold text-[#d4af37] mb-2">$23B</div>
                <p className="text-white/60 text-lg">Death Care Industry</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 3: Solution */}
      <div className="slide bg-gradient-to-br from-[#0a0a1a] to-[#1a1a3a] min-h-[100vh] p-12 flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full text-center">
          <p className="text-[#d4af37]/50 text-sm mb-4">3 / 11</p>
          <h2 className="text-4xl font-bold mb-2">THE SOLUTION</h2>
          <p className="text-[#d4af37] text-xl mb-6">Eternal Memorials in Orbit</p>
          <p className="text-white/70 text-xl max-w-3xl mx-auto mb-12">
            We launch cremated remains into Earth orbit aboard commercial spacecraft, creating eternal memorials among the stars.
          </p>
          <div className="grid grid-cols-4 gap-6">
            {["FAA-licensed spacecraft", "Real-time orbital tracking", "Digital memorial pages", "Personalized capsules"].map((feature, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <p className="text-white/80">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide 4: Product */}
      <div className="slide bg-gradient-to-br from-[#0a0a1a] to-[#1a1a3a] min-h-[100vh] p-12 flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full">
          <p className="text-[#d4af37]/50 text-sm mb-4">4 / 11</p>
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-2">THE PRODUCT</h2>
              <p className="text-[#d4af37] text-xl mb-8">Premium Space Memorial</p>
              <div className="space-y-4">
                {[
                  { label: "Memorial Capsule", desc: "Spacecraft-grade capsule" },
                  { label: "Orbital Launch", desc: "Commercial spacecraft" },
                  { label: "Tracking App", desc: "Real-time position" },
                  { label: "Digital Memorial", desc: "Family sharing" },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#d4af37] mt-1" />
                    <div>
                      <span className="font-bold">{f.label}</span>
                      <span className="text-white/50"> - {f.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <div className="inline-block bg-[#1a1a3a] rounded-2xl p-10 border border-[#d4af37]/30">
                <p className="text-white/50 mb-2">Starting at</p>
                <div className="text-6xl font-bold text-[#d4af37] mb-2">$3,800</div>
                <p className="text-white/50">per memorial</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 5: Market */}
      <div className="slide bg-gradient-to-br from-[#0a0a1a] to-[#1a1a3a] min-h-[100vh] p-12 flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full">
          <p className="text-[#d4af37]/50 text-sm mb-4">5 / 11</p>
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-2">MARKET</h2>
            <p className="text-[#d4af37] text-xl">Massive Opportunity</p>
          </div>
          <div className="grid grid-cols-4 gap-6 mb-10">
            {[
              { value: "$23B", label: "Market Size" },
              { value: "2.8M", label: "Annual Deaths" },
              { value: "56%", label: "Cremation Rate" },
              { value: "$500M+", label: "Target Market" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6 text-center border border-white/10">
                <div className="text-4xl font-bold text-[#d4af37] mb-2">{stat.value}</div>
                <p className="text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/20 text-center">
            <p className="text-white/80 text-lg">Cremation rate grew from 27% to 56%, creating massive opportunity.</p>
          </div>
        </div>
      </div>

      {/* Slide 6: Business Model */}
      <div className="slide bg-gradient-to-br from-[#0a0a1a] to-[#1a1a3a] min-h-[100vh] p-12 flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full">
          <p className="text-[#d4af37]/50 text-sm mb-4">6 / 11</p>
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">BUSINESS MODEL</h2>
              <p className="text-[#d4af37] text-xl mb-8">Premium Economics</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Avg Sale", value: "$4,500" },
                  { label: "Margin", value: "65%+" },
                  { label: "LTV", value: "$5,200" },
                  { label: "CAC", value: "$800" },
                ].map((m, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-5 border border-white/10">
                    <p className="text-white/50 text-sm mb-1">{m.label}</p>
                    <p className="text-3xl font-bold text-[#d4af37]">{m.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Revenue Mix</h3>
              <div className="space-y-5">
                {[
                  { label: "Memorial Services", pct: 70 },
                  { label: "Premium Add-ons", pct: 20 },
                  { label: "Subscriptions", pct: 10 },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white/70">{item.label}</span>
                      <span className="font-bold text-[#d4af37]">{item.pct}%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 7: Traction */}
      <div className="slide bg-gradient-to-br from-[#0a0a1a] to-[#1a1a3a] min-h-[100vh] p-12 flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full">
          <p className="text-[#d4af37]/50 text-sm mb-4">7 / 11</p>
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-2">TRACTION</h2>
            <p className="text-[#d4af37] text-xl">Strong Momentum</p>
          </div>
          <div className="grid grid-cols-4 gap-6 mb-10">
            {[
              { value: "312", label: "Reservations", Icon: Users },
              { value: "$1.2M", label: "Pipeline", Icon: DollarSign },
              { value: "65%", label: "Margin", Icon: TrendingUp },
              { value: "3", label: "Partners", Icon: Rocket },
            ].map((m, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6 text-center border border-white/10">
                <m.Icon className="w-8 h-8 text-[#d4af37] mx-auto mb-3" />
                <div className="text-4xl font-bold text-[#d4af37] mb-1">{m.value}</div>
                <p className="text-white/60">{m.label}</p>
              </div>
            ))}
          </div>
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold mb-4">Milestones</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "FAA partnerships", done: true },
                { label: "Platform built", done: true },
                { label: "First reservations", done: true },
                { label: "First launch", done: false },
              ].map((m, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className={`w-5 h-5 ${m.done ? "text-green-400" : "text-white/30"}`} />
                  <span className={m.done ? "text-white/80" : "text-white/40"}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide 8: Competitive */}
      <div className="slide bg-gradient-to-br from-[#0a0a1a] to-[#1a1a3a] min-h-[100vh] p-12 flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full">
          <p className="text-[#d4af37]/50 text-sm mb-4">8 / 11</p>
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-2">COMPETITIVE EDGE</h2>
            <p className="text-[#d4af37] text-xl">First Mover Advantage</p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {[
              { title: "Category Creation", desc: "Leading a new category", Icon: Zap },
              { title: "Launch Partners", desc: "FAA-licensed providers", Icon: Rocket },
              { title: "Technology", desc: "Proprietary platform", Icon: Globe },
              { title: "Brand", desc: "Premium positioning", Icon: Target },
            ].map((a, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-8 border border-white/10">
                <div className="w-14 h-14 rounded-xl bg-[#d4af37]/20 flex items-center justify-center mb-4">
                  <a.Icon className="w-7 h-7 text-[#d4af37]" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{a.title}</h3>
                <p className="text-white/60">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide 9: Team */}
      <div className="slide bg-gradient-to-br from-[#0a0a1a] to-[#1a1a3a] min-h-[100vh] p-12 flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full text-center">
          <p className="text-[#d4af37]/50 text-sm mb-4">9 / 11</p>
          <h2 className="text-4xl font-bold mb-2">LEADERSHIP</h2>
          <p className="text-[#d4af37] text-xl mb-16">Visionary Team</p>
          <div className="flex justify-center mb-8">
            <div className="text-center">
              <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-6xl font-bold">S</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">Steven Ferris</h3>
              <p className="text-[#d4af37] text-lg">Founder & CEO</p>
            </div>
          </div>
          <p className="text-white/50">Building team to scale</p>
        </div>
      </div>

      {/* Slide 10: Investment */}
      <div className="slide bg-gradient-to-br from-[#0a0a1a] to-[#1a1a3a] min-h-[100vh] p-12 flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full">
          <p className="text-[#d4af37]/50 text-sm mb-4">10 / 11</p>
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">THE OPPORTUNITY</h2>
              <p className="text-[#d4af37] text-xl mb-8">Series A Private Placement</p>
              <h3 className="text-2xl font-bold mb-6">Use of Proceeds</h3>
              <div className="space-y-5">
                {[
                  { label: "Product & Tech", pct: 35 },
                  { label: "Partnerships", pct: 25 },
                  { label: "Marketing", pct: 25 },
                  { label: "Operations", pct: 15 },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white/70">{item.label}</span>
                      <span className="font-bold text-[#d4af37]">{item.pct}%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-[#d4af37] rounded-full" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Terms</h3>
              <div className="bg-white/5 rounded-xl p-8 border border-white/10 space-y-5">
                {[
                  { label: "Security", value: "Series A Preferred" },
                  { label: "Compliance", value: "SEC 506(c)" },
                  { label: "Investors", value: "Accredited Only" },
                ].map((t, i) => (
                  <div key={i} className="flex justify-between py-3 border-b border-white/10 last:border-0">
                    <span className="text-white/60">{t.label}</span>
                    <span className="font-bold text-[#d4af37]">{t.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 11: CTA */}
      <div className="slide bg-gradient-to-br from-[#0a0a1a] to-[#1a1a3a] min-h-[100vh] p-12 flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full text-center">
          <p className="text-[#d4af37]/50 text-sm mb-4">11 / 11</p>
          <h2 className="text-6xl font-bold mb-4">JOIN US</h2>
          <p className="text-4xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">
            Invest in Immortality
          </p>
          <p className="text-white/70 text-2xl max-w-3xl mx-auto mb-12">
            Be part of something unprecedented - eternal memorials among the stars.
          </p>
          <div className="inline-block bg-[#d4af37] text-black font-bold px-10 py-4 rounded-xl text-xl">
            Contact Us to Learn More
          </div>
        </div>
      </div>
    </div>
  );
}
