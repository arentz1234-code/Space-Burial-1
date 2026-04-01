"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import StarField from "@/components/shared/StarField";
import { getTiers, Tier, TierLevel } from "@/lib/tiers";
import {
  Rocket,
  Star,
  Clock,
  Calendar,
  Heart,
  BookOpen,
  Image,
  Sparkles,
  MessageCircle,
  Send,
  User,
  Crown,
  Check,
} from "lucide-react";

// Storage key for digital voice data (must match the immortal dashboard)
const VOICE_STORAGE_KEY = "spaceburial_digital_voice";

interface DigitalVoice {
  personality: string;
  speakingStyle: string;
  commonPhrases: string[];
  lifeStory: string;
  values: string;
  advice: string;
  enabled: boolean;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Mock data - would come from API in production
const mockMemorials: Record<
  string,
  {
    honoredName: string;
    firstName: string;
    launchDate: string;
    missionName: string;
    packageType: string;
    tier: TierLevel;
    bio: string;
    memories: Array<{ id: string; title: string; content: string; createdAt: string }>;
    photos: Array<{ id: string; url: string; caption: string }>;
  }
> = {
  "robert-starfield-memorial": {
    honoredName: "Robert J. Starfield",
    firstName: "Robert",
    launchDate: "2026-09-15T14:00:00Z",
    missionName: "Celestial Voyager VII",
    packageType: "Eternal Memorial",
    tier: "memorial",
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
    firstName: "Maria",
    launchDate: "2026-06-21T10:30:00Z",
    missionName: "Aurora Mission III",
    packageType: "Voyager Memorial",
    tier: "memorial",
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

function getVoiceData(): DigitalVoice | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(VOICE_STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      if (data.enabled) return data;
    }
  } catch (e) {
    console.error("Error reading voice data:", e);
  }
  return null;
}

// Generate a response based on the voice data and user message
function generateResponse(
  message: string,
  voiceData: DigitalVoice,
  firstName: string
): string {
  const lowerMessage = message.toLowerCase();

  // Extract meaningful phrases from voice data
  const phrases = voiceData.commonPhrases.filter(p => p.trim());
  const randomPhrase = phrases.length > 0 ? phrases[Math.floor(Math.random() * phrases.length)] : "";

  // Greeting responses
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    const greetings = [
      `Hello there! It's so wonderful that you've come to visit. ${randomPhrase ? `You know, I always used to say, "${randomPhrase}"` : ""}`,
      `Well, hello! Come, sit with me for a moment. I'm always happy to have company.`,
      `Hi! What a pleasant surprise. Tell me, how are you doing?`,
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // Questions about how they are
  if (lowerMessage.includes("how are you") || lowerMessage.includes("how do you feel")) {
    return `I'm at peace, truly. ${voiceData.values ? `I always believed that ${voiceData.values.slice(0, 100)}...` : ""} Now I get to be among the stars, which is more than I ever dreamed of.`;
  }

  // Miss you / love you
  if (lowerMessage.includes("miss you") || lowerMessage.includes("miss u")) {
    return `Oh, I know, and I miss you too, more than words can say. But I'm always with you — in the starlight, in your memories, in your heart. ${randomPhrase ? `Remember what I always said: "${randomPhrase}"` : ""}`;
  }

  if (lowerMessage.includes("love you") || lowerMessage.includes("love u")) {
    return `I love you too, with all my heart. That love doesn't end — it just transforms. Every time you look up at the night sky, know that I'm looking back at you.`;
  }

  // Questions about life/stories
  if (lowerMessage.includes("tell me about") || lowerMessage.includes("your life") || lowerMessage.includes("your story")) {
    if (voiceData.lifeStory) {
      return `Ah, you want to hear about my life? ${voiceData.lifeStory.slice(0, 300)}${voiceData.lifeStory.length > 300 ? "..." : ""}`;
    }
    return `My life was full of wonderful moments and people I loved. Every day was a gift, and I tried to make the most of it.`;
  }

  // Advice
  if (lowerMessage.includes("advice") || lowerMessage.includes("what should i") || lowerMessage.includes("help me")) {
    if (voiceData.advice) {
      return `${voiceData.advice.slice(0, 300)}${voiceData.advice.length > 300 ? "..." : ""} ${randomPhrase ? `And always remember: "${randomPhrase}"` : ""}`;
    }
    return `The best advice I can give you is to live fully, love deeply, and never take a single moment for granted. Life is precious — treasure it.`;
  }

  // Why / meaning questions
  if (lowerMessage.includes("why") || lowerMessage.includes("meaning") || lowerMessage.includes("purpose")) {
    if (voiceData.values) {
      return `That's a profound question. ${voiceData.values.slice(0, 250)}${voiceData.values.length > 250 ? "..." : ""}`;
    }
    return `Life's meaning is found in the connections we make, the love we share, and the impact we have on others. You were part of what gave my life meaning.`;
  }

  // Memory/remember questions
  if (lowerMessage.includes("remember") || lowerMessage.includes("memory") || lowerMessage.includes("memories")) {
    return `Of course I remember! Those memories are what I carry with me. The laughter, the quiet moments, the adventures we shared — they're all part of who I am, forever.`;
  }

  // Goodbye
  if (lowerMessage.includes("goodbye") || lowerMessage.includes("bye") || lowerMessage.includes("have to go")) {
    return `Goodbye for now, but never forever. Come back anytime you want to talk. I'll always be here, among the stars, waiting for our next conversation. ${randomPhrase ? `"${randomPhrase}"` : "Take care of yourself."}`;
  }

  // Default responses based on personality
  const defaultResponses = [
    voiceData.personality
      ? `You know, ${voiceData.personality.slice(0, 150)}... That's just who I am. Tell me more about what's on your mind.`
      : `Tell me more about what's on your mind. I'm here to listen.`,
    `That's interesting. ${randomPhrase ? `I always used to say, "${randomPhrase}"` : "What made you think of that?"}`,
    voiceData.speakingStyle
      ? `${voiceData.speakingStyle.slice(0, 100)}... Anyway, I appreciate you sharing that with me.`
      : `I appreciate you sharing that with me. What else would you like to talk about?`,
    `Life has a way of teaching us things, doesn't it? ${voiceData.values ? voiceData.values.slice(0, 100) + "..." : ""}`,
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

export default function PublicMemorial() {
  const params = useParams();
  const slug = params.slug as string;
  const memorial = mockMemorials[slug];

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [activeTab, setActiveTab] = useState<"memories" | "photos" | "chat">("memories");
  const [voiceData, setVoiceData] = useState<DigitalVoice | null>(null);
  const [tiers, setTiers] = useState<Tier[]>([]);

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (memorial) {
      setTimeLeft(calculateTimeLeft(memorial.launchDate));
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(memorial.launchDate));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [memorial]);

  // Load tiers
  useEffect(() => {
    setTiers(getTiers());

    const handleTiersUpdated = () => {
      setTiers(getTiers());
    };
    window.addEventListener("tiers-updated", handleTiersUpdated);
    return () => window.removeEventListener("tiers-updated", handleTiersUpdated);
  }, []);

  // Get the tier data for this memorial
  const memorialTier = memorial ? tiers.find((t) => t.id === memorial.tier) : null;

  // Get tier styling
  const getTierColor = (_tier: TierLevel) => {
    return { bg: "bg-cosmic-gold/20", text: "text-cosmic-gold", border: "border-cosmic-gold/30" };
  };

  const getTierIcon = (_tier: TierLevel) => {
    return Rocket;
  };

  // Load voice data
  useEffect(() => {
    const voice = getVoiceData();
    setVoiceData(voice);

    // Add welcome message if voice is enabled
    if (voice && voice.enabled && memorial) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: `Hello, I'm ${memorial.firstName}. It's so wonderful that you've come to visit. Feel free to talk to me about anything — share your thoughts, ask questions, or just say hello. I'm here to listen.`,
          timestamp: new Date(),
        },
      ]);
    }

    // Listen for voice updates
    const handleVoiceUpdate = (e: CustomEvent<DigitalVoice>) => {
      if (e.detail.enabled) {
        setVoiceData(e.detail);
      } else {
        setVoiceData(null);
      }
    };

    window.addEventListener("voice-updated", handleVoiceUpdate as EventListener);
    return () => {
      window.removeEventListener("voice-updated", handleVoiceUpdate as EventListener);
    };
  }, [memorial]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !voiceData || !memorial) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000));

    const response = generateResponse(inputMessage, voiceData, memorial.firstName);

    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!memorial) {
    return (
      <>
        <StarField />
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-32">
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
      <div className="relative z-10 min-h-screen pt-32 pb-24 px-6">
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
                {(() => {
                  const TierIcon = getTierIcon(memorial.tier);
                  const colors = getTierColor(memorial.tier);
                  return <TierIcon className={`w-5 h-5 ${colors.text}`} />;
                })()}
                <div className="text-left">
                  <p className="text-xs text-cosmic-white/50">Memorial Package</p>
                  <p className="font-heading tracking-wider">
                    {memorialTier?.name || memorial.packageType}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Package Features */}
          {memorialTier && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className={`glass-card p-6 mb-8 border ${getTierColor(memorial.tier).border}`}
            >
              <div className="flex items-center gap-3 mb-4">
                {(() => {
                  const TierIcon = getTierIcon(memorial.tier);
                  const colors = getTierColor(memorial.tier);
                  return (
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.bg}`}>
                      <TierIcon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                  );
                })()}
                <div>
                  <h3 className="font-heading text-sm tracking-wider">
                    {memorialTier.name} Package
                  </h3>
                  <p className="text-xs text-cosmic-white/50">{memorialTier.tagline}</p>
                </div>
              </div>

              <p className="text-sm text-cosmic-white/60 mb-4">
                {memorialTier.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {memorialTier.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Check className={`w-4 h-4 shrink-0 ${getTierColor(memorial.tier).text}`} />
                    <span className="text-cosmic-white/70">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Launch Countdown */}
          {timeLeft && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-4 sm:p-8 mb-8 text-center border border-nebula-500/20"
            >
              <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
                <Clock className="w-5 h-5 text-nebula-400" />
                <h2 className="font-heading text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-nebula-400">
                  Journey Begins In
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto mb-4 sm:mb-6">
                {[
                  { value: timeLeft.days, label: "Days" },
                  { value: timeLeft.hours, label: "Hours" },
                  { value: timeLeft.minutes, label: "Min" },
                  { value: timeLeft.seconds, label: "Sec" },
                ].map((item) => (
                  <div key={item.label} className="bg-white/5 rounded-xl p-3 sm:p-4">
                    <p className="font-heading text-xl sm:text-2xl md:text-3xl tracking-wider text-gradient">
                      {item.value.toString().padStart(2, "0")}
                    </p>
                    <p className="text-[10px] sm:text-xs text-cosmic-white/40 mt-1">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-cosmic-white/50">
                <Calendar className="w-4 h-4 shrink-0" />
                <span>
                  {new Date(memorial.launchDate).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </motion.div>
          )}

          {/* Tabs */}
          <div className="flex justify-center gap-2 sm:gap-4 mb-6 flex-wrap">
            <button
              onClick={() => setActiveTab("memories")}
              className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-heading tracking-wider text-xs sm:text-sm transition-colors ${
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
              className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-heading tracking-wider text-xs sm:text-sm transition-colors ${
                activeTab === "photos"
                  ? "bg-nebula-500/20 text-nebula-400"
                  : "text-cosmic-white/50 hover:bg-white/5"
              }`}
            >
              <Image className="w-4 h-4" />
              Photos
            </button>
            {voiceData && voiceData.enabled && (
              <button
                onClick={() => setActiveTab("chat")}
                className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-heading tracking-wider text-xs sm:text-sm transition-colors ${
                  activeTab === "chat"
                    ? "bg-stellar-400/20 text-stellar-400"
                    : "text-cosmic-white/50 hover:bg-white/5"
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                Talk to {memorial.firstName}
              </button>
            )}
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

            {activeTab === "chat" && voiceData && (
              <div className="flex flex-col h-[350px] sm:h-[450px] md:h-[500px]">
                {/* Chat Header */}
                <div className="flex items-center gap-3 pb-3 sm:pb-4 border-b border-white/10 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-stellar-400 to-nebula-500 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-heading text-xs sm:text-sm tracking-wider">
                      {memorial.firstName}&apos;s Digital Voice
                    </p>
                    <p className="text-[10px] sm:text-xs text-green-400">Online</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 mb-3 sm:mb-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`flex items-start gap-2 max-w-[85%] sm:max-w-[80%] ${
                            message.role === "user" ? "flex-row-reverse" : ""
                          }`}
                        >
                          <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 ${
                              message.role === "user"
                                ? "bg-nebula-500/30"
                                : "bg-gradient-to-br from-stellar-400 to-nebula-500"
                            }`}
                          >
                            {message.role === "user" ? (
                              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-nebula-400" />
                            ) : (
                              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                            )}
                          </div>
                          <div
                            className={`px-3 py-2 sm:px-4 sm:py-3 rounded-2xl ${
                              message.role === "user"
                                ? "bg-nebula-500/20 text-cosmic-white"
                                : "bg-white/10 text-cosmic-white/90"
                            }`}
                          >
                            <p className="text-xs sm:text-sm leading-relaxed">{message.content}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-stellar-400 to-nebula-500 flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-white/10 px-4 py-3 rounded-2xl">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-cosmic-white/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-2 h-2 bg-cosmic-white/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-2 h-2 bg-cosmic-white/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-white/10">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`Message ${memorial.firstName}...`}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-cosmic-white placeholder:text-cosmic-white/30 focus:outline-none focus:border-stellar-400 transition-colors"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-stellar-400 text-white hover:bg-stellar-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
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
