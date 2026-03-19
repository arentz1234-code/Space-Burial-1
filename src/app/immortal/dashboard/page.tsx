"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Star,
  Image,
  BookOpen,
  Clock,
  Share2,
  Plus,
  ExternalLink,
  Calendar,
  Sparkles,
} from "lucide-react";

// Mock data - would come from API/session in production
const mockImmortal = {
  id: "imm-001",
  name: "Robert Starfield",
  packageType: "immortal",
  subscriptionTier: "Immortal Memorial",
  launchDate: "2026-09-15T14:00:00Z",
  missionName: "Celestial Voyager VII",
  memorialSlug: "robert-starfield-memorial",
  honoredName: "Robert J. Starfield",
  familyAccessEnabled: true,
  memories: [
    {
      id: "mem-001",
      title: "A Life of Wonder",
      content:
        "Robert always looked up at the stars with wonder. From his first telescope at age 8, to teaching astronomy at the local community college, the cosmos was his greatest passion.",
      createdAt: "2025-11-15",
    },
    {
      id: "mem-002",
      title: "The Fishing Trips",
      content:
        "Every summer, Dad would take us to Lake Tahoe. He'd point out constellations while we waited for the fish to bite. Those nights under the stars are my most treasured memories.",
      createdAt: "2025-11-20",
    },
  ],
  photos: [
    {
      id: "photo-001",
      url: "/images/placeholder-1.jpg",
      caption: "Robert with his beloved Celestron telescope, 2018",
      uploadedAt: "2025-11-15",
    },
    {
      id: "photo-002",
      url: "/images/placeholder-2.jpg",
      caption: "Family reunion at Lake Tahoe, 2022",
      uploadedAt: "2025-11-16",
    },
  ],
};

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(launchDate: string): TimeLeft {
  const difference = +new Date(launchDate) - +new Date();

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
}

export default function ImmortalDashboard() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(mockImmortal.launchDate)
  );
  const [activeTab, setActiveTab] = useState<"memories" | "photos">("memories");
  const [showAddMemory, setShowAddMemory] = useState(false);
  const [newMemory, setNewMemory] = useState({ title: "", content: "" });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(mockImmortal.launchDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const memorialUrl = `https://spaceburial.com/memorial/${mockImmortal.memorialSlug}`;

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-nebula-500 to-stellar-400 flex items-center justify-center"
          >
            <Rocket className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="font-heading text-3xl tracking-wider mb-2">
            Welcome Back
          </h1>
          <p className="text-cosmic-white/50">
            Managing memorial for{" "}
            <span className="text-cosmic-gold">{mockImmortal.honoredName}</span>
          </p>
        </div>

        {/* Subscription Tier Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-8 border border-cosmic-gold/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cosmic-gold/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-cosmic-gold" />
              </div>
              <div>
                <p className="text-xs text-cosmic-white/50 uppercase tracking-wider">
                  Your Package
                </p>
                <h2 className="font-heading text-xl tracking-wider text-cosmic-gold">
                  {mockImmortal.subscriptionTier}
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <p className="text-cosmic-white/50">Mission</p>
                <p className="font-heading tracking-wider">
                  {mockImmortal.missionName}
                </p>
              </div>
              <div className="text-center">
                <p className="text-cosmic-white/50">Status</p>
                <p className="text-green-400 font-heading tracking-wider">
                  Active
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Launch Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 mb-8 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-nebula-400" />
            <h2 className="font-heading text-sm tracking-[0.3em] uppercase text-nebula-400">
              Launch Countdown
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto mb-6">
            {[
              { value: timeLeft.days, label: "Days" },
              { value: timeLeft.hours, label: "Hours" },
              { value: timeLeft.minutes, label: "Minutes" },
              { value: timeLeft.seconds, label: "Seconds" },
            ].map((item) => (
              <div key={item.label} className="bg-white/5 rounded-xl p-4">
                <p className="font-heading text-3xl md:text-4xl tracking-wider text-gradient">
                  {item.value.toString().padStart(2, "0")}
                </p>
                <p className="text-xs text-cosmic-white/40 mt-1">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-cosmic-white/50">
            <Calendar className="w-4 h-4" />
            <span>
              Scheduled:{" "}
              {new Date(mockImmortal.launchDate).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </motion.div>

        {/* Public Memorial Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Share2 className="w-5 h-5 text-stellar-400" />
              <div>
                <p className="text-sm font-heading tracking-wider">
                  Public Memorial Page
                </p>
                <p className="text-xs text-cosmic-white/50">
                  Share this link with family and friends
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <code className="bg-white/5 px-4 py-2 rounded-lg text-sm text-cosmic-white/70">
                {memorialUrl}
              </code>
              <a
                href={`/memorial/${mockImmortal.memorialSlug}`}
                target="_blank"
                className="btn-secondary flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View
              </a>
            </div>
          </div>
        </motion.div>

        {/* Memories & Photos Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("memories")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-heading tracking-wider text-sm transition-colors ${
              activeTab === "memories"
                ? "bg-nebula-500/20 text-nebula-400"
                : "text-cosmic-white/50 hover:bg-white/5"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Memories ({mockImmortal.memories.length})
          </button>
          <button
            onClick={() => setActiveTab("photos")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-heading tracking-wider text-sm transition-colors ${
              activeTab === "photos"
                ? "bg-nebula-500/20 text-nebula-400"
                : "text-cosmic-white/50 hover:bg-white/5"
            }`}
          >
            <Image className="w-4 h-4" />
            Photos ({mockImmortal.photos.length})
          </button>
        </div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card p-6"
        >
          {activeTab === "memories" && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-heading text-sm tracking-wider text-cosmic-gold">
                  Treasured Memories
                </h3>
                <button
                  onClick={() => setShowAddMemory(true)}
                  className="btn-primary flex items-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Memory
                </button>
              </div>

              {showAddMemory && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-white/5 rounded-xl p-6 mb-6"
                >
                  <h4 className="font-heading text-sm tracking-wider mb-4">
                    New Memory
                  </h4>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Memory title..."
                      value={newMemory.title}
                      onChange={(e) =>
                        setNewMemory({ ...newMemory, title: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                    />
                    <textarea
                      placeholder="Share your memory..."
                      value={newMemory.content}
                      onChange={(e) =>
                        setNewMemory({ ...newMemory, content: e.target.value })
                      }
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500 resize-none"
                    />
                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => setShowAddMemory(false)}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                      <button className="btn-primary">Save Memory</button>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="space-y-6">
                {mockImmortal.memories.map((memory) => (
                  <div
                    key={memory.id}
                    className="border-l-2 border-nebula-500/30 pl-6"
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="font-heading tracking-wider mb-2">
                        {memory.title}
                      </h4>
                      <span className="text-xs text-cosmic-white/30">
                        {memory.createdAt}
                      </span>
                    </div>
                    <p className="text-cosmic-white/60 text-sm leading-relaxed">
                      {memory.content}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "photos" && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-heading text-sm tracking-wider text-cosmic-gold">
                  Photo Gallery
                </h3>
                <button className="btn-primary flex items-center gap-2 text-sm">
                  <Plus className="w-4 h-4" />
                  Upload Photo
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {mockImmortal.photos.map((photo) => (
                  <div key={photo.id} className="group relative">
                    <div className="aspect-square bg-white/10 rounded-xl overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center text-cosmic-white/20">
                        <Star className="w-12 h-12" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-space-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-end p-4">
                      <p className="text-xs text-cosmic-white/80">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Upload placeholder */}
                <button className="aspect-square border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-nebula-500/50 transition-colors">
                  <Plus className="w-8 h-8 text-cosmic-white/30" />
                  <span className="text-xs text-cosmic-white/30">
                    Add Photo
                  </span>
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
