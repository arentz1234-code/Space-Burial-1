// Memorial Tier Configuration
// Supports admin editing via localStorage

export type TierLevel = "stardust" | "voyager" | "eternal";

export interface Tier {
  id: TierLevel;
  name: string;
  tagline: string;
  price: number;
  description: string;
  features: string[];
  highlighted?: boolean;
}

// Default tier configuration
export const defaultTiers: Tier[] = [
  {
    id: "stardust",
    name: "Stardust",
    tagline: "Begin the Journey",
    price: 3800,
    description: "The essential celestial memorial. Your loved one's ashes journey to space aboard a real rocket, with a beautiful digital memorial for family to cherish.",
    features: [
      "Cremated remains launched to space",
      "Personalized flight certificate",
      "Digital memorial page",
      "Photo gallery (up to 20 photos)",
      "Written memories & testimonials",
      "Mission tracking updates",
      "HD launch video",
      "Shareable memorial link",
    ],
  },
  {
    id: "voyager",
    name: "Voyager",
    tagline: "Journey Beyond",
    price: 5000,
    description: "An elevated experience with VIP launch access, a cinematic video memorial, and family ceremony coordination for a truly memorable send-off.",
    features: [
      "Everything in Stardust, plus:",
      "VIP live launch viewing access",
      "Video memorial slideshow with music",
      "Family ceremony coordination",
      "Custom memorial capsule engraving",
      "Priority mission scheduling",
      "Physical star map keepsake",
      "Annual anniversary notifications",
    ],
    highlighted: true,
  },
  {
    id: "eternal",
    name: "Eternal",
    tagline: "Forever Among the Stars",
    price: 7000,
    description: "The ultimate tribute. Includes our Digital Voice technology, allowing loved ones to have meaningful conversations with your memory for generations to come.",
    features: [
      "Everything in Voyager, plus:",
      "Digital Voice AI companion",
      "Personality & voice recording",
      "Interactive chat on memorial page",
      "Unlimited photo storage",
      "Premium memorial design",
      "Dedicated mission liaison",
      "Lifetime memorial hosting",
    ],
  },
];

// Storage key for tiers
const TIERS_STORAGE_KEY = "spaceburial_tiers";

// Get tiers from localStorage or return defaults
export function getTiers(): Tier[] {
  if (typeof window === "undefined") {
    return defaultTiers;
  }

  try {
    const stored = localStorage.getItem(TIERS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to ensure all tier IDs exist
      return defaultTiers.map((defaultTier) => {
        const storedTier = parsed.find((t: Tier) => t.id === defaultTier.id);
        return storedTier ? { ...defaultTier, ...storedTier } : defaultTier;
      });
    }
  } catch (e) {
    console.error("Error reading tiers from localStorage:", e);
  }

  return defaultTiers;
}

// Save tiers to localStorage
export function saveTiers(tiers: Tier[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(TIERS_STORAGE_KEY, JSON.stringify(tiers));
    window.dispatchEvent(new CustomEvent("tiers-updated", { detail: tiers }));
  } catch (e) {
    console.error("Error saving tiers to localStorage:", e);
  }
}

// Update a specific tier
export function updateTier(tierId: TierLevel, updates: Partial<Tier>): void {
  const currentTiers = getTiers();
  const tierIndex = currentTiers.findIndex((t) => t.id === tierId);

  if (tierIndex !== -1) {
    currentTiers[tierIndex] = { ...currentTiers[tierIndex], ...updates };
    saveTiers(currentTiers);
  }
}

// Reset tiers to defaults
export function resetTiers(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TIERS_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("tiers-updated", { detail: defaultTiers }));
}

// Export tiers for backward compatibility (use getTiers() for dynamic access)
export const tiers = defaultTiers;

export function getTierById(id: TierLevel): Tier | undefined {
  return getTiers().find((t) => t.id === id);
}

export function getTierPrice(id: TierLevel): number {
  return getTierById(id)?.price || 0;
}

export function getUpgradePrice(currentTier: TierLevel, targetTier: TierLevel): number {
  const current = getTierPrice(currentTier);
  const target = getTierPrice(targetTier);
  return Math.max(0, target - current);
}

export function canAccessFeature(userTier: TierLevel, requiredTier: TierLevel): boolean {
  const tierOrder: TierLevel[] = ["stardust", "voyager", "eternal"];
  return tierOrder.indexOf(userTier) >= tierOrder.indexOf(requiredTier);
}

// Storage for user's selected tier
const TIER_STORAGE_KEY = "spaceburial_user_tier";

export function getUserTier(): TierLevel {
  if (typeof window === "undefined") return "eternal"; // Default for SSR
  try {
    const stored = localStorage.getItem(TIER_STORAGE_KEY);
    if (stored && ["stardust", "voyager", "eternal"].includes(stored)) {
      return stored as TierLevel;
    }
  } catch (e) {
    console.error("Error reading tier:", e);
  }
  return "eternal"; // Default tier (full-loaded for demo)
}

export function setUserTier(tier: TierLevel): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(TIER_STORAGE_KEY, tier);
    window.dispatchEvent(new CustomEvent("tier-updated", { detail: tier }));
  } catch (e) {
    console.error("Error saving tier:", e);
  }
}
