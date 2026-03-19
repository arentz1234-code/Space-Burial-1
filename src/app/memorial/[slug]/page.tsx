"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import StarField from "@/components/shared/StarField";
import {
  Rocket,
  Star,
  Clock,
  Calendar,
  Heart,
  BookOpen,
  Image,
  Sparkles,
} from "lucide-react";

// Mock data - would come from API in production
const mockMemorials: Record<
  string,
  {
    honoredName: string;
    launchDate: string;
    missionName: string;
    packageType: string;
    bio: string;
    memories: Array<{ id: string; title: string; content: string; createdAt: string }>;
    photos: Array<{ id: string; url: string; caption: string }>;
  }
> = {
  "robert-starfield-memorial": {
    honoredName: "Robert J. Starfield",
    launchDate: "2026-09-15T14:00:00Z",
    missionName: "Celestial Voyager VII",
    packageType: "Immortal Memorial",
    bio: "Robert J. Starfield (1952-2025) was a beloved father, husband, and amateur astronomer. His passion for the cosmos inspired everyone around him. Robert spent 30 years teaching astronomy at the local community college, introducing thousands of students to the wonders of the universe. Now, he embarks on his final journey among the stars he loved so dearly.",
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
      { id: "photo-001", url: "", caption: "Robert with his beloved telescope, 2018" },
      { id: "photo-002", url: "", caption: "Family reunion at Lake Tahoe, 2022" },
      { id: "photo-003", url: "", caption: "Teaching at the observatory, 2019" },
    ],
  },
  "maria-martinez-memorial": {
    honoredName: "Maria Elena Martinez",
    launchDate: "2026-06-21T10:30:00Z",
    missionName: "Aurora Mission III",
    packageType: "Rocket Memorial",
    bio: "Maria Elena Martinez (1940-2025) was the heart of her family. Her garden was her sanctuary, and she always said the flowers reached toward the heavens. Now she will too.",
    memories: [
      {
        id: "mem-003",
        title: "Abuela's Garden",
        content:
          "Abuela spent countless hours in her garden, always saying the flowers reached toward the heavens. Now she will too.",
        createdAt: "2026-01-12",
      },
    ],
    photos: [
      { id: "photo-003", url: "", caption: "Maria in her beloved garden, Spring 2024" },
    ],
  },
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

export default function PublicMemorial() {
  const params = useParams();
  const slug = params.slug as string;
  const memorial = mockMemorials[slug];

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [activeTab, setActiveTab] = useState<"memories" | "photos">("memories");

  useEffect(() => {
    if (memorial) {
      setTimeLeft(calculateTimeLeft(memorial.launchDate));
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(memorial.launchDate));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [memorial]);

  if (!memorial) {
    return (
      <>
        <StarField />
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <div className="text-center">
            <Star className="w-16 h-16 text-cosmic-white/20 mx-auto mb-6" />
            <h1 className="font-heading text-2xl tracking-wider mb-4">
              Memorial Not Found
            </h1>
            <p className="text-cosmic-white/50">
              This memorial page does not exist or has been removed.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <StarField />
      <div className="relative z-10 min-h-screen py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-nebula-500/30 to-stellar-400/30 border border-white/10 flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-cosmic-gold" />
            </div>

            <p className="text-cosmic-gold font-heading text-xs tracking-[0.3em] uppercase mb-3">
              In Loving Memory
            </p>

            <h1 className="font-heading text-4xl md:text-5xl tracking-wider mb-4 text-gradient">
              {memorial.honoredName}
            </h1>

            <p className="text-cosmic-white/60 max-w-2xl mx-auto leading-relaxed">
              {memorial.bio}
            </p>
          </motion.div>

          {/* Mission Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 mb-8 text-center"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="flex items-center gap-3">
                <Rocket className="w-5 h-5 text-nebula-400" />
                <div className="text-left">
                  <p className="text-xs text-cosmic-white/50">Mission</p>
                  <p className="font-heading tracking-wider">
                    {memorial.missionName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-cosmic-gold" />
                <div className="text-left">
                  <p className="text-xs text-cosmic-white/50">Memorial Type</p>
                  <p className="font-heading tracking-wider">
                    {memorial.packageType}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Launch Countdown */}
          {timeLeft && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8 mb-8 text-center border border-nebula-500/20"
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-nebula-400" />
                <h2 className="font-heading text-sm tracking-[0.3em] uppercase text-nebula-400">
                  Journey Begins In
                </h2>
              </div>

              <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-6">
                {[
                  { value: timeLeft.days, label: "Days" },
                  { value: timeLeft.hours, label: "Hours" },
                  { value: timeLeft.minutes, label: "Minutes" },
                  { value: timeLeft.seconds, label: "Seconds" },
                ].map((item) => (
                  <div key={item.label} className="bg-white/5 rounded-xl p-4">
                    <p className="font-heading text-2xl md:text-3xl tracking-wider text-gradient">
                      {item.value.toString().padStart(2, "0")}
                    </p>
                    <p className="text-xs text-cosmic-white/40 mt-1">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-cosmic-white/50">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(memorial.launchDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </motion.div>
          )}

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setActiveTab("memories")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-heading tracking-wider text-sm transition-colors ${
                activeTab === "memories"
                  ? "bg-nebula-500/20 text-nebula-400"
                  : "text-cosmic-white/50 hover:bg-white/5"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Memories
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
              Photos
            </button>
          </div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-8"
          >
            {activeTab === "memories" && (
              <div className="space-y-8">
                {memorial.memories.map((memory, i) => (
                  <motion.div
                    key={memory.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="border-l-2 border-cosmic-gold/30 pl-6"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className="w-4 h-4 text-cosmic-gold" />
                      <h3 className="font-heading tracking-wider">
                        {memory.title}
                      </h3>
                    </div>
                    <p className="text-cosmic-white/60 leading-relaxed">
                      {memory.content}
                    </p>
                    <p className="text-xs text-cosmic-white/30 mt-3">
                      Shared on {memory.createdAt}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "photos" && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {memorial.photos.map((photo, i) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative"
                  >
                    <div className="aspect-square bg-white/10 rounded-xl overflow-hidden flex items-center justify-center">
                      <Star className="w-12 h-12 text-cosmic-white/20" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-space-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-end p-4">
                      <p className="text-xs text-cosmic-white/80">
                        {photo.caption}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Footer */}
          <div className="text-center mt-12">
            <p className="text-cosmic-white/30 text-sm">
              This memorial is powered by{" "}
              <a href="/" className="text-nebula-400 hover:text-nebula-300">
                Space Burial
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
