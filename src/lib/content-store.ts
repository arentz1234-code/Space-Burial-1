// Content Store - Mock CMS that persists to localStorage
// In production, replace with database calls

export interface Package {
  id: string;
  name: string;
  price: number;
  tagline: string;
  description: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  relation: string;
}

export interface SiteContent {
  packages: Package[];
  testimonials: Testimonial[];
  heroTitle: string;
  heroSubtitle: string;
  heroTagline: string;
  aboutTitle: string;
  aboutContent: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
}

// Default content
export const defaultContent: SiteContent = {
  packages: [
    {
      id: "rocket",
      name: "Rocket Memorial",
      price: 3800,
      tagline: "A journey among the stars",
      description:
        "Send a symbolic portion of cremated remains aboard a real space launch. Your loved one becomes part of the cosmos on a suborbital or orbital mission.",
      features: [
        "Portion of ashes launched into space",
        "Personalized flight certificate",
        "Live launch viewing invitation",
        "Mission tracking & updates",
        "HD video of the launch",
      ],
    },
    {
      id: "immortal",
      name: "Immortal Memorial",
      price: 3800,
      tagline: "Forever among the stars",
      description:
        "A permanent celestial tribute. Remains are placed into a lasting orbit or deep space trajectory — an eternal memorial that circles the Earth or voyages beyond.",
      features: [
        "Permanent orbital or deep space placement",
        "Custom memorial capsule",
        "Digital memorial page",
        "Family ceremony coordination",
        "Lifetime mission tracking access",
      ],
    },
  ],
  testimonials: [
    {
      id: "test-1",
      quote:
        "My father dedicated his life to astronomy. Knowing he's among the stars now brings our family incredible peace.",
      name: "Sarah M.",
      relation: "Daughter",
    },
    {
      id: "test-2",
      quote:
        "The ceremony was beautiful, and watching the launch was the most emotional experience of my life. Worth every penny.",
      name: "James K.",
      relation: "Son",
    },
    {
      id: "test-3",
      quote:
        "Space Burial made the entire process seamless during the hardest time of our lives. Truly the ultimate tribute.",
      name: "Maria L.",
      relation: "Spouse",
    },
  ],
  heroTitle: "Send Your Legacy to the Stars",
  heroSubtitle:
    "Imagine your loved one's ashes among the stars — forever part of the universe. A celestial farewell that celebrates life, passion, and memory for generations to come.",
  heroTagline: "The Ultimate Tribute",
  aboutTitle: "A New Chapter in Memorial Services",
  aboutContent:
    "Space Burial was founded on a simple yet profound idea: that the final tribute to a life well-lived should be as extraordinary as the person it honors. We partner with licensed aerospace providers to offer memorial spaceflights that transform remembrance into an eternal journey among the stars.",
  contactEmail: "contact@spaceburial.com",
  contactPhone: "(555) 123-4567",
  contactAddress: "123 Celestial Way, Houston, TX 77001",
};

// Storage key
const STORAGE_KEY = "spaceburial_content";

// Get content from localStorage or return defaults
export function getContent(): SiteContent {
  if (typeof window === "undefined") {
    return defaultContent;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultContent, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error("Error reading content from localStorage:", e);
  }

  return defaultContent;
}

// Save content to localStorage
export function saveContent(content: Partial<SiteContent>): void {
  if (typeof window === "undefined") return;

  try {
    const current = getContent();
    const updated = { ...current, ...content };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Dispatch custom event so other components can react
    window.dispatchEvent(new CustomEvent("content-updated", { detail: updated }));
  } catch (e) {
    console.error("Error saving content to localStorage:", e);
  }
}

// Update a specific package
export function updatePackage(packageId: string, updates: Partial<Package>): void {
  const content = getContent();
  const packageIndex = content.packages.findIndex((p) => p.id === packageId);

  if (packageIndex !== -1) {
    content.packages[packageIndex] = { ...content.packages[packageIndex], ...updates };
    saveContent({ packages: content.packages });
  }
}

// Update a specific testimonial
export function updateTestimonial(testimonialId: string, updates: Partial<Testimonial>): void {
  const content = getContent();
  const index = content.testimonials.findIndex((t) => t.id === testimonialId);

  if (index !== -1) {
    content.testimonials[index] = { ...content.testimonials[index], ...updates };
    saveContent({ testimonials: content.testimonials });
  }
}

// Add a new testimonial
export function addTestimonial(testimonial: Omit<Testimonial, "id">): void {
  const content = getContent();
  const newTestimonial = {
    ...testimonial,
    id: `test-${Date.now()}`,
  };
  content.testimonials.push(newTestimonial);
  saveContent({ testimonials: content.testimonials });
}

// Delete a testimonial
export function deleteTestimonial(testimonialId: string): void {
  const content = getContent();
  content.testimonials = content.testimonials.filter((t) => t.id !== testimonialId);
  saveContent({ testimonials: content.testimonials });
}

// Reset to defaults
export function resetContent(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("content-updated", { detail: defaultContent }));
}
