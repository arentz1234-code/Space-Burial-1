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

export interface InvestorDocument {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
  url?: string;
}

export interface CompanyUpdate {
  id: string;
  date: string;
  title: string;
  body: string;
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
  // Investor content
  investorDocuments: InvestorDocument[];
  companyUpdates: CompanyUpdate[];
  ndaText: string;
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
  // Investor documents
  investorDocuments: [
    { id: "doc-1", name: "Pitch Deck — Q1 2026", type: "PDF", date: "2026-01-15", size: "4.2 MB" },
    { id: "doc-2", name: "Financial Projections", type: "XLSX", date: "2026-01-15", size: "1.1 MB" },
    { id: "doc-3", name: "Subscription Agreement", type: "PDF", date: "2025-06-01", size: "890 KB" },
    { id: "doc-4", name: "Operating Agreement", type: "PDF", date: "2025-06-01", size: "1.3 MB" },
    { id: "doc-5", name: "Cap Table — Current", type: "PDF", date: "2026-03-01", size: "320 KB" },
    { id: "doc-6", name: "SEC Form D Filing", type: "PDF", date: "2025-06-01", size: "210 KB" },
  ],
  // Company updates
  companyUpdates: [
    {
      id: "update-1",
      date: "2026-03-10",
      title: "Q1 Launch Partnership Secured",
      body: "We've signed a multi-launch agreement with a licensed provider for 4 missions in 2026. This reduces our per-unit cost by 30% and enables us to scale to 500+ memorials per year.",
    },
    {
      id: "update-2",
      date: "2026-02-18",
      title: "187 Reservations Milestone",
      body: "We've crossed 187 total reservations — a 3x increase over Q3 2025. Marketing spend efficiency improved to $42 CAC through organic search and partnerships with funeral homes.",
    },
    {
      id: "update-3",
      date: "2026-01-22",
      title: "Seed Round Closed — $2.4M Raised",
      body: "Our seed round is officially closed at $2.4M from 34 accredited investors. Funds will be deployed toward launch operations, marketing, and team expansion.",
    },
  ],
  // NDA Text
  ndaText: `SPACE BURIAL, INC.
NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into as of the date of electronic signature below.

1. CONFIDENTIAL INFORMATION
The undersigned ("Receiving Party") agrees to hold in strict confidence all proprietary information, business plans, financial data, customer information, technical data, and any other confidential information disclosed by Space Burial, Inc. ("Disclosing Party").

2. NON-DISCLOSURE
The Receiving Party agrees not to disclose any Confidential Information to any third parties without prior written consent from Space Burial, Inc.

3. TERM
This Agreement shall remain in effect for a period of five (5) years from the date of signature.

4. RETURN OF MATERIALS
Upon request, the Receiving Party shall return all materials containing Confidential Information.

5. NO LICENSE
Nothing in this Agreement grants any rights to the Receiving Party in the Confidential Information.

6. GOVERNING LAW
This Agreement shall be governed by the laws of the State of Delaware.

By typing your full legal name below, you acknowledge that you have read, understood, and agree to be bound by the terms of this Non-Disclosure Agreement.`,
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

// Document management
export function addDocument(document: Omit<InvestorDocument, "id">): void {
  const content = getContent();
  const newDoc = {
    ...document,
    id: `doc-${Date.now()}`,
  };
  content.investorDocuments.push(newDoc);
  saveContent({ investorDocuments: content.investorDocuments });
}

export function updateDocument(docId: string, updates: Partial<InvestorDocument>): void {
  const content = getContent();
  const index = content.investorDocuments.findIndex((d) => d.id === docId);

  if (index !== -1) {
    content.investorDocuments[index] = { ...content.investorDocuments[index], ...updates };
    saveContent({ investorDocuments: content.investorDocuments });
  }
}

export function deleteDocument(docId: string): void {
  const content = getContent();
  content.investorDocuments = content.investorDocuments.filter((d) => d.id !== docId);
  saveContent({ investorDocuments: content.investorDocuments });
}

// Company updates management
export function addCompanyUpdate(update: Omit<CompanyUpdate, "id">): void {
  const content = getContent();
  const newUpdate = {
    ...update,
    id: `update-${Date.now()}`,
  };
  content.companyUpdates.unshift(newUpdate); // Add to beginning (newest first)
  saveContent({ companyUpdates: content.companyUpdates });
}

export function updateCompanyUpdate(updateId: string, updates: Partial<CompanyUpdate>): void {
  const content = getContent();
  const index = content.companyUpdates.findIndex((u) => u.id === updateId);

  if (index !== -1) {
    content.companyUpdates[index] = { ...content.companyUpdates[index], ...updates };
    saveContent({ companyUpdates: content.companyUpdates });
  }
}

export function deleteCompanyUpdate(updateId: string): void {
  const content = getContent();
  content.companyUpdates = content.companyUpdates.filter((u) => u.id !== updateId);
  saveContent({ companyUpdates: content.companyUpdates });
}

// NDA management
export function updateNDA(ndaText: string): void {
  saveContent({ ndaText });
}
