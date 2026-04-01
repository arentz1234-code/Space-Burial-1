// Memorial Tier Configuration
// Supports admin editing via localStorage

export type TierLevel = "memorial";

export interface Tier {
  id: TierLevel;
  name: string;
  tagline: string;
  price: number;
  description: string;
  features: string[];
  highlighted?: boolean;
}

// Single tier configuration
export const defaultTiers: Tier[] = [
  {
    id: "memorial",
    name: "Space Memorial",
    tagline: "Eternal Journey Among the Stars",
    price: 3800,
    description: "A complete celestial memorial experience. Your loved one's ashes journey to space aboard a real rocket, with a beautiful digital memorial for family to cherish forever.",
    features: [
      "Cremated remains launched to space",
      "Personalized flight certificate",
      "Digital memorial page",
      "Photo gallery (unlimited photos)",
      "Written memories & testimonials",
      "Mission tracking updates",
      "HD launch video",
      "Shareable memorial link for family",
      "Launch viewing access",
      "Custom memorial capsule",
      "Lifetime memorial hosting",
    ],
    highlighted: true,
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
  // With single tier, all users have full access
  return true;
}

// Storage for user's selected tier
const TIER_STORAGE_KEY = "spaceburial_user_tier";

export function getUserTier(): TierLevel {
  if (typeof window === "undefined") return "memorial"; // Default for SSR
  try {
    const stored = localStorage.getItem(TIER_STORAGE_KEY);
    if (stored && stored === "memorial") {
      return stored as TierLevel;
    }
  } catch (e) {
    console.error("Error reading tier:", e);
  }
  return "memorial"; // Single tier
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
