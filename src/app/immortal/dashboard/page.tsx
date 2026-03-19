"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
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
  MessageCircle,
  Mic,
  Save,
  Check,
  Info,
  Lock,
  Video,
  Users,
  Crown,
  ArrowUpRight,
  CreditCard,
  X,
} from "lucide-react";
import { TierLevel, getUserTier, setUserTier, getTiers, Tier, getUpgradePrice, canAccessFeature } from "@/lib/tiers";

// Storage key for digital voice data
const VOICE_STORAGE_KEY = "spaceburial_digital_voice";

// Mock data - would come from API/session in production
const mockImmortal = {
  id: "imm-001",
  name: "Robert Starfield",
  packageType: "immortal",
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

interface DigitalVoice {
  personality: string;
  speakingStyle: string;
  commonPhrases: string[];
  lifeStory: string;
  values: string;
  advice: string;
  enabled: boolean;
}

const defaultVoice: DigitalVoice = {
  personality: "",
  speakingStyle: "",
  commonPhrases: ["", "", "", "", ""],
  lifeStory: "",
  values: "",
  advice: "",
  enabled: false,
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

function getVoiceData(): DigitalVoice {
  if (typeof window === "undefined") return defaultVoice;
  try {
    const stored = localStorage.getItem(VOICE_STORAGE_KEY);
    if (stored) {
      return { ...defaultVoice, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error("Error reading voice data:", e);
  }
  return defaultVoice;
}

function saveVoiceData(data: DigitalVoice): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(VOICE_STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("voice-updated", { detail: data }));
  } catch (e) {
    console.error("Error saving voice data:", e);
  }
}

const tierColors = {
  stardust: { bg: "bg-nebula-500/20", text: "text-nebula-400", border: "border-nebula-500/30" },
  voyager: { bg: "bg-cosmic-gold/20", text: "text-cosmic-gold", border: "border-cosmic-gold/30" },
  eternal: { bg: "bg-stellar-400/20", text: "text-stellar-400", border: "border-stellar-400/30" },
};

export default function ImmortalDashboard() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(mockImmortal.launchDate)
  );
  const [activeTab, setActiveTab] = useState<"memories" | "photos" | "video" | "voice">("memories");
  const [showAddMemory, setShowAddMemory] = useState(false);
  const [newMemory, setNewMemory] = useState({ title: "", content: "" });
  const [userTier, setUserTierState] = useState<TierLevel>("eternal");
  const [tiers, setTiers] = useState<Tier[]>(getTiers());

  // Upgrade modal state
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedUpgrade, setSelectedUpgrade] = useState<TierLevel | null>(null);
  const [upgradeProcessing, setUpgradeProcessing] = useState(false);
  const [upgradeSuccess, setUpgradeSuccess] = useState(false);

  // Digital Voice state
  const [voiceData, setVoiceData] = useState<DigitalVoice>(defaultVoice);
  const [voiceSaving, setVoiceSaving] = useState(false);
  const [voiceSaved, setVoiceSaved] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(mockImmortal.launchDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Load tier, tiers config, and voice data on mount
  useEffect(() => {
    setUserTierState(getUserTier());
    setVoiceData(getVoiceData());
    setTiers(getTiers());

    // Listen for tier updates (user's tier)
    const handleTierUpdate = (e: CustomEvent<TierLevel>) => {
      setUserTierState(e.detail);
    };
    // Listen for tiers config updates (admin changes)
    const handleTiersUpdated = () => {
      setTiers(getTiers());
    };
    window.addEventListener("tier-updated", handleTierUpdate as EventListener);
    window.addEventListener("tiers-updated", handleTiersUpdated);
    return () => {
      window.removeEventListener("tier-updated", handleTierUpdate as EventListener);
      window.removeEventListener("tiers-updated", handleTiersUpdated);
    };
  }, []);

  const handleSaveVoice = async () => {
    setVoiceSaving(true);
    saveVoiceData(voiceData);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setVoiceSaving(false);
    setVoiceSaved(true);
    setTimeout(() => setVoiceSaved(false), 2000);
  };

  // Handle upgrade completion (called after Stripe payment)
  const handleUpgradeComplete = async (newTier: TierLevel) => {
    setUpgradeProcessing(true);
    // Simulate payment processing - in production this would be handled by Stripe webhook
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Update user's tier
    setUserTier(newTier);
    setUserTierState(newTier);

    setUpgradeProcessing(false);
    setUpgradeSuccess(true);

    // Close modal after showing success
    setTimeout(() => {
      setShowUpgradeModal(false);
      setUpgradeSuccess(false);
      setSelectedUpgrade(null);
    }, 2000);
  };

  // Get available upgrade tiers
  const getAvailableUpgrades = () => {
    const tierOrder: TierLevel[] = ["stardust", "voyager", "eternal"];
    const currentIndex = tierOrder.indexOf(userTier);
    return tierOrder.slice(currentIndex + 1);
  };

  // Stripe payment links placeholder - replace with actual Stripe links
  const getStripePaymentLink = (targetTier: TierLevel): string => {
    // TODO: Replace with actual Stripe payment links
    const stripeLinks: Record<string, string> = {
      "stardust-to-voyager": "https://buy.stripe.com/placeholder_stardust_to_voyager",
      "stardust-to-eternal": "https://buy.stripe.com/placeholder_stardust_to_eternal",
      "voyager-to-eternal": "https://buy.stripe.com/placeholder_voyager_to_eternal",
    };
    return stripeLinks[`${userTier}-to-${targetTier}`] || "#";
  };

  const updatePhrase = (index: number, value: string) => {
    const newPhrases = [...voiceData.commonPhrases];
    newPhrases[index] = value;
    setVoiceData({ ...voiceData, commonPhrases: newPhrases });
  };

  const currentTier = tiers.find((t) => t.id === userTier);
  const hasVoyager = canAccessFeature(userTier, "voyager");
  const hasEternal = canAccessFeature(userTier, "eternal");

  const memorialUrl = `https://spaceburial.com/memorial/${mockImmortal.memorialSlug}`;

  const handleShareLink = async () => {
    try {
      await navigator.clipboard.writeText(memorialUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = memorialUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  // For demo purposes - allow changing tier
  const handleDemoTierChange = (tier: TierLevel) => {
    setUserTier(tier);
    setUserTierState(tier);
  };

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

        {/* Tier Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`glass-card p-6 mb-8 border ${tierColors[userTier].border}`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${tierColors[userTier].bg} flex items-center justify-center`}>
                <Crown className={`w-6 h-6 ${tierColors[userTier].text}`} />
              </div>
              <div>
                <p className="text-xs text-cosmic-white/50 uppercase tracking-wider">
                  Your Package
                </p>
                <h2 className={`font-heading text-xl tracking-wider ${tierColors[userTier].text}`}>
                  {currentTier?.name} Memorial
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {userTier !== "eternal" && (
                <button
                  onClick={() => setShowUpgradeModal(true)}
                  className="btn-primary flex items-center gap-2 text-sm"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  Upgrade Package
                </button>
              )}
              <div className="text-right">
                <p className="text-cosmic-white/50 text-xs">Mission</p>
                <p className="font-heading tracking-wider text-sm">
                  {mockImmortal.missionName}
                </p>
              </div>
            </div>
          </div>

          {/* Demo tier switcher */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-xs text-cosmic-white/30 mb-2">Demo: Switch tier to test features</p>
            <div className="flex gap-2">
              {(["stardust", "voyager", "eternal"] as TierLevel[]).map((tier) => (
                <button
                  key={tier}
                  onClick={() => handleDemoTierChange(tier)}
                  className={`px-3 py-1 rounded-lg text-xs font-heading tracking-wider transition-colors ${
                    userTier === tier
                      ? `${tierColors[tier].bg} ${tierColors[tier].text}`
                      : "bg-white/5 text-cosmic-white/50 hover:bg-white/10"
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Launch Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4 md:p-8 mb-8 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-nebula-400" />
            <h2 className="font-heading text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase text-nebula-400">
              Launch Countdown
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto mb-6">
            {[
              { value: timeLeft.days, label: "Days" },
              { value: timeLeft.hours, label: "Hours" },
              { value: timeLeft.minutes, label: "Min" },
              { value: timeLeft.seconds, label: "Sec" },
            ].map((item) => (
              <div key={item.label} className="bg-white/5 rounded-xl p-3 sm:p-4">
                <p className="font-heading text-2xl sm:text-3xl md:text-4xl tracking-wider text-gradient">
                  {item.value.toString().padStart(2, "0")}
                </p>
                <p className="text-[10px] sm:text-xs text-cosmic-white/40 mt-1">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-cosmic-white/50">
            <Calendar className="w-4 h-4 shrink-0" />
            <span className="text-center">
              {new Date(mockImmortal.launchDate).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
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
          className="glass-card p-4 md:p-6 mb-8"
        >
          <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center gap-3">
              <Share2 className="w-5 h-5 text-stellar-400 shrink-0" />
              <div>
                <p className="text-sm font-heading tracking-wider">
                  Public Memorial Page
                </p>
                <p className="text-xs text-cosmic-white/50">
                  Share this link with family and friends
                </p>
              </div>
            </div>

            {/* URL Display */}
            <code className="bg-white/5 px-4 py-3 rounded-lg text-xs md:text-sm text-cosmic-white/70 break-all w-full block">
              {memorialUrl}
            </code>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleShareLink}
                className={`flex-1 md:flex-none btn-primary flex items-center justify-center gap-2 py-3 md:py-2 md:min-w-[120px] ${
                  linkCopied ? "bg-green-500 hover:bg-green-500" : ""
                }`}
              >
                {linkCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    Share
                  </>
                )}
              </button>
              <a
                href={`/memorial/${mockImmortal.memorialSlug}`}
                target="_blank"
                className="flex-1 md:flex-none btn-secondary flex items-center justify-center gap-2 py-3 md:py-2 md:min-w-[120px]"
              >
                <ExternalLink className="w-4 h-4" />
                View
              </a>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 sm:gap-2 mb-6 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
          <button
            onClick={() => setActiveTab("memories")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl font-heading tracking-wider text-xs sm:text-sm transition-colors whitespace-nowrap ${
              activeTab === "memories"
                ? "bg-nebula-500/20 text-nebula-400"
                : "text-cosmic-white/50 hover:bg-white/5"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Memories</span>
            <span className="sm:hidden">Memories</span>
          </button>
          <button
            onClick={() => setActiveTab("photos")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl font-heading tracking-wider text-xs sm:text-sm transition-colors whitespace-nowrap ${
              activeTab === "photos"
                ? "bg-nebula-500/20 text-nebula-400"
                : "text-cosmic-white/50 hover:bg-white/5"
            }`}
          >
            <Image className="w-4 h-4" />
            Photos
          </button>

          {/* Video Memorial - Voyager+ */}
          <button
            onClick={() => hasVoyager && setActiveTab("video")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl font-heading tracking-wider text-xs sm:text-sm transition-colors whitespace-nowrap ${
              activeTab === "video"
                ? "bg-cosmic-gold/20 text-cosmic-gold"
                : hasVoyager
                ? "text-cosmic-white/50 hover:bg-white/5"
                : "text-cosmic-white/30 cursor-not-allowed"
            }`}
          >
            {!hasVoyager && <Lock className="w-3 h-3 sm:w-4 sm:h-4" />}
            <Video className="w-4 h-4" />
            <span className="hidden sm:inline">Video Memorial</span>
            <span className="sm:hidden">Video</span>
            {!hasVoyager && (
              <span className="hidden sm:inline text-[10px] bg-cosmic-gold/20 text-cosmic-gold px-2 py-0.5 rounded-full">
                Voyager+
              </span>
            )}
          </button>

          {/* Digital Voice - Eternal only */}
          <button
            onClick={() => hasEternal && setActiveTab("voice")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl font-heading tracking-wider text-xs sm:text-sm transition-colors whitespace-nowrap ${
              activeTab === "voice"
                ? "bg-stellar-400/20 text-stellar-400"
                : hasEternal
                ? "text-cosmic-white/50 hover:bg-white/5"
                : "text-cosmic-white/30 cursor-not-allowed"
            }`}
          >
            {!hasEternal && <Lock className="w-3 h-3 sm:w-4 sm:h-4" />}
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Digital Voice</span>
            <span className="sm:hidden">Voice</span>
            {!hasEternal && (
              <span className="hidden sm:inline text-[10px] bg-stellar-400/20 text-stellar-400 px-2 py-0.5 rounded-full">
                Eternal
              </span>
            )}
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
                <div>
                  <h3 className="font-heading text-sm tracking-wider text-cosmic-gold">
                    Photo Gallery
                  </h3>
                  <p className="text-xs text-cosmic-white/50 mt-1">
                    {userTier === "stardust" ? "Up to 20 photos" : userTier === "voyager" ? "Up to 50 photos" : "Unlimited photos"}
                  </p>
                </div>
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

                <button className="aspect-square border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-nebula-500/50 transition-colors">
                  <Plus className="w-8 h-8 text-cosmic-white/30" />
                  <span className="text-xs text-cosmic-white/30">
                    Add Photo
                  </span>
                </button>
              </div>
            </>
          )}

          {activeTab === "video" && (
            <>
              {hasVoyager ? (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <Video className="w-5 h-5 text-cosmic-gold" />
                    <div>
                      <h3 className="font-heading text-sm tracking-wider text-cosmic-gold">
                        Video Memorial
                      </h3>
                      <p className="text-xs text-cosmic-white/50">
                        Create a beautiful video slideshow with music
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-8 text-center mb-6">
                    <Video className="w-16 h-16 text-cosmic-white/20 mx-auto mb-4" />
                    <h4 className="font-heading tracking-wider mb-2">Create Your Video Memorial</h4>
                    <p className="text-cosmic-white/50 text-sm mb-6 max-w-md mx-auto">
                      Combine photos with music to create a cinematic tribute that will be shown
                      on your memorial page and during the launch ceremony.
                    </p>
                    <button className="btn-primary">
                      Start Creating
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4">
                      <Users className="w-5 h-5 text-cosmic-gold mb-2" />
                      <h5 className="font-heading text-sm tracking-wider mb-1">Family Ceremony</h5>
                      <p className="text-xs text-cosmic-white/50">
                        Coordinate with our team for a personalized ceremony on launch day.
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <Sparkles className="w-5 h-5 text-cosmic-gold mb-2" />
                      <h5 className="font-heading text-sm tracking-wider mb-1">VIP Launch Access</h5>
                      <p className="text-xs text-cosmic-white/50">
                        Exclusive live stream with commentary and behind-the-scenes footage.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cosmic-gold/10 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-cosmic-gold/50" />
                  </div>
                  <h3 className="font-heading text-xl tracking-wider mb-2">
                    Upgrade to Voyager
                  </h3>
                  <p className="text-cosmic-white/50 text-sm mb-6 max-w-md mx-auto">
                    Unlock Video Memorial, VIP Launch Access, Family Ceremony coordination, and more.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedUpgrade("voyager");
                      setShowUpgradeModal(true);
                    }}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    Upgrade for ${getUpgradePrice(userTier, "voyager").toLocaleString()}
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}

          {activeTab === "voice" && (
            <>
              {hasEternal ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <Mic className="w-5 h-5 text-stellar-400" />
                      <div>
                        <h3 className="font-heading text-sm tracking-wider text-stellar-400">
                          Digital Voice
                        </h3>
                        <p className="text-xs text-cosmic-white/50">
                          Create an AI companion for visitors to chat with
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleSaveVoice}
                      disabled={voiceSaving}
                      className="btn-primary flex items-center gap-2 text-sm"
                    >
                      {voiceSaved ? (
                        <>
                          <Check className="w-4 h-4" />
                          Saved!
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          {voiceSaving ? "Saving..." : "Save Voice"}
                        </>
                      )}
                    </button>
                  </div>

                  {/* Info Banner */}
                  <div className="bg-stellar-400/10 border border-stellar-400/20 rounded-xl p-4 mb-6">
                    <div className="flex gap-3">
                      <Info className="w-5 h-5 text-stellar-400 shrink-0 mt-0.5" />
                      <div className="text-sm text-cosmic-white/70">
                        <p className="mb-2">
                          The Digital Voice feature allows visitors to have meaningful conversations
                          with your loved one&apos;s memory. Fill in the details below to help the AI
                          respond in their voice and personality.
                        </p>
                        <p className="text-stellar-400">
                          The more detail you provide, the more authentic the conversations will feel.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Enable Toggle */}
                  <div className="bg-white/5 rounded-xl p-4 mb-6">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <p className="font-heading text-sm tracking-wider">Enable Digital Voice</p>
                        <p className="text-xs text-cosmic-white/50 mt-1">
                          Allow visitors to chat with your loved one on the memorial page
                        </p>
                      </div>
                      <div
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          voiceData.enabled ? "bg-stellar-400" : "bg-white/20"
                        }`}
                        onClick={() => setVoiceData({ ...voiceData, enabled: !voiceData.enabled })}
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                            voiceData.enabled ? "translate-x-7" : "translate-x-1"
                          }`}
                        />
                      </div>
                    </label>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                        Personality Description
                      </label>
                      <textarea
                        value={voiceData.personality}
                        onChange={(e) => setVoiceData({ ...voiceData, personality: e.target.value })}
                        rows={3}
                        placeholder="Describe their personality... Were they warm and nurturing? Funny and witty? Wise and thoughtful?"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-stellar-400 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                        Speaking Style
                      </label>
                      <textarea
                        value={voiceData.speakingStyle}
                        onChange={(e) => setVoiceData({ ...voiceData, speakingStyle: e.target.value })}
                        rows={2}
                        placeholder="How did they talk? Did they use certain words or expressions? Were they formal or casual?"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-stellar-400 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                        Phrases They Often Said (up to 5)
                      </label>
                      <div className="space-y-2">
                        {voiceData.commonPhrases.map((phrase, i) => (
                          <input
                            key={i}
                            type="text"
                            value={phrase}
                            onChange={(e) => updatePhrase(i, e.target.value)}
                            placeholder={`Phrase ${i + 1}...`}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-stellar-400"
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                        Life Story & Background
                      </label>
                      <textarea
                        value={voiceData.lifeStory}
                        onChange={(e) => setVoiceData({ ...voiceData, lifeStory: e.target.value })}
                        rows={4}
                        placeholder="Share their life story... Where they grew up, their career, their passions..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-stellar-400 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                        Values & Beliefs
                      </label>
                      <textarea
                        value={voiceData.values}
                        onChange={(e) => setVoiceData({ ...voiceData, values: e.target.value })}
                        rows={3}
                        placeholder="What did they believe in? What values did they hold dear?"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-stellar-400 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                        Wisdom & Advice They Would Give
                      </label>
                      <textarea
                        value={voiceData.advice}
                        onChange={(e) => setVoiceData({ ...voiceData, advice: e.target.value })}
                        rows={3}
                        placeholder="What advice would they give? What would they want their loved ones to remember?"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-stellar-400 resize-none"
                      />
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-xs text-cosmic-white/40 text-center">
                      After saving, visitors can chat with {mockImmortal.honoredName} on the{" "}
                      <a
                        href={`/memorial/${mockImmortal.memorialSlug}`}
                        target="_blank"
                        className="text-stellar-400 hover:underline"
                      >
                        public memorial page
                      </a>
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-stellar-400/10 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-stellar-400/50" />
                  </div>
                  <h3 className="font-heading text-xl tracking-wider mb-2">
                    Upgrade to Eternal
                  </h3>
                  <p className="text-cosmic-white/50 text-sm mb-6 max-w-md mx-auto">
                    Unlock the Digital Voice feature, allowing visitors to have meaningful
                    conversations with your loved one&apos;s memory through AI.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedUpgrade("eternal");
                      setShowUpgradeModal(true);
                    }}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    Upgrade for ${getUpgradePrice(userTier, "eternal").toLocaleString()}
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-space-black/80 backdrop-blur-sm"
            onClick={() => !upgradeProcessing && setShowUpgradeModal(false)}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-2xl glass-card p-8"
          >
            {upgradeSuccess ? (
              // Success State
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="w-10 h-10 text-green-400" />
                </div>
                <h2 className="font-heading text-2xl tracking-wider mb-2">
                  Upgrade Complete!
                </h2>
                <p className="text-cosmic-white/60">
                  Your package has been upgraded. Enjoy your new features!
                </p>
              </div>
            ) : upgradeProcessing ? (
              // Processing State
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-cosmic-gold/20 flex items-center justify-center animate-pulse">
                  <Sparkles className="w-8 h-8 text-cosmic-gold" />
                </div>
                <h2 className="font-heading text-xl tracking-wider mb-2">
                  Processing Upgrade...
                </h2>
                <p className="text-cosmic-white/50 text-sm">
                  Please wait while we activate your new features
                </p>
              </div>
            ) : (
              // Selection State
              <>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="font-heading text-2xl tracking-wider mb-1">
                      Upgrade Your Package
                    </h2>
                    <p className="text-cosmic-white/50 text-sm">
                      Unlock more features for your memorial
                    </p>
                  </div>
                  <button
                    onClick={() => setShowUpgradeModal(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-cosmic-white/50"
                  >
                    <span className="text-xl">&times;</span>
                  </button>
                </div>

                {/* Current Tier */}
                <div className="bg-white/5 rounded-xl p-4 mb-6">
                  <p className="text-xs text-cosmic-white/50 uppercase tracking-wider mb-1">
                    Current Package
                  </p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${tierColors[userTier].bg} flex items-center justify-center`}>
                      <Crown className={`w-5 h-5 ${tierColors[userTier].text}`} />
                    </div>
                    <div>
                      <p className={`font-heading tracking-wider ${tierColors[userTier].text}`}>
                        {tiers.find(t => t.id === userTier)?.name}
                      </p>
                      <p className="text-xs text-cosmic-white/50">
                        ${tiers.find(t => t.id === userTier)?.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Available Upgrades */}
                <div className="space-y-4 mb-6">
                  <p className="text-xs text-cosmic-white/50 uppercase tracking-wider">
                    Available Upgrades
                  </p>
                  {getAvailableUpgrades().map((tierId) => {
                    const tier = tiers.find(t => t.id === tierId);
                    if (!tier) return null;
                    const upgradePrice = getUpgradePrice(userTier, tierId);
                    const isSelected = selectedUpgrade === tierId;

                    return (
                      <button
                        key={tierId}
                        onClick={() => setSelectedUpgrade(tierId)}
                        className={`w-full text-left glass-card p-4 transition-all ${
                          isSelected
                            ? `border-2 ${tierColors[tierId].border} ${tierColors[tierId].bg}`
                            : "border border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-xl ${tierColors[tierId].bg} flex items-center justify-center`}>
                              <Crown className={`w-6 h-6 ${tierColors[tierId].text}`} />
                            </div>
                            <div>
                              <p className={`font-heading tracking-wider ${tierColors[tierId].text}`}>
                                {tier.name}
                              </p>
                              <p className="text-xs text-cosmic-white/50">{tier.tagline}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-heading text-lg ${tierColors[tierId].text}`}>
                              +${upgradePrice.toLocaleString()}
                            </p>
                            <p className="text-xs text-cosmic-white/40">to upgrade</p>
                          </div>
                        </div>

                        {/* Features Preview */}
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <p className="text-xs text-cosmic-white/50 mb-2">New features you&apos;ll unlock:</p>
                          <div className="grid grid-cols-2 gap-2">
                            {tier.features.slice(0, 4).map((feature, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-cosmic-white/70">
                                <Check className={`w-3 h-3 ${tierColors[tierId].text}`} />
                                <span className="truncate">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Payment Section */}
                {selectedUpgrade && (
                  <div className="border-t border-white/10 pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-cosmic-white/50 text-sm">Upgrade to {tiers.find(t => t.id === selectedUpgrade)?.name}</p>
                        <p className="font-heading text-2xl text-cosmic-gold">
                          ${getUpgradePrice(userTier, selectedUpgrade).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Stripe Payment Link Button */}
                    <div className="space-y-3">
                      <a
                        href={getStripePaymentLink(selectedUpgrade)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full btn-primary flex items-center justify-center gap-2 py-4"
                        onClick={(e) => {
                          // For demo: prevent navigation and simulate upgrade
                          e.preventDefault();
                          handleUpgradeComplete(selectedUpgrade);
                        }}
                      >
                        <CreditCard className="w-5 h-5" />
                        Pay with Stripe
                      </a>
                      <p className="text-xs text-cosmic-white/40 text-center">
                        Secure payment powered by Stripe. You&apos;ll be redirected to complete payment.
                      </p>
                    </div>

                    {/* Payment Link Info for Admin */}
                    <div className="mt-4 p-3 bg-stellar-400/10 rounded-lg border border-stellar-400/20">
                      <p className="text-xs text-stellar-400">
                        <strong>Note:</strong> Replace the placeholder Stripe links in{" "}
                        <code className="bg-white/10 px-1 rounded">getStripePaymentLink()</code>{" "}
                        with your actual Stripe Payment Links.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
