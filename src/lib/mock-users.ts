// Mock user accounts with 3 permission levels
// Replace with real DB in production

export type UserRole = "admin" | "investor" | "immortal";

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export interface AdminUser extends User {
  role: "admin";
  permissions: string[];
}

// Verification status for accredited investor compliance
export type VerificationStatus =
  | "pending"
  | "self_certified"
  | "document_verified"
  | "third_party_verified"
  | "professional_verified";

export type VerificationMethod =
  | "document_upload"
  | "third_party"
  | "professional_letter";

export interface VerificationDocument {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  status: "pending" | "verified" | "rejected";
}

export interface InvestorUser extends User {
  role: "investor";
  accredited: boolean;
  investmentAmount: number;
  shares: number;
  sharePrice: number;
  ndaSigned: boolean;
  ndaSignature: string;
  ndaSignedDate: string;
  documents: InvestorDocument[];
  // SEC Compliance - Accredited Investor Verification
  verificationStatus: VerificationStatus;
  verificationMethod?: VerificationMethod;
  verificationDate?: string;
  verificationDocuments?: VerificationDocument[];
}

export interface ImmortalUser extends User {
  role: "immortal";
  packageType: "rocket" | "immortal";
  subscriptionTier: string;
  launchDate: string;
  missionName: string;
  memorialSlug: string; // Public memorial page URL
  honoredName: string;
  memories: Memory[];
  photos: Photo[];
  familyAccessEnabled: boolean;
}

export interface InvestorDocument {
  id: string;
  name: string;
  type: "nda" | "agreement" | "report" | "certificate";
  url: string;
  uploadedAt: string;
}

export interface Memory {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface Photo {
  id: string;
  url: string;
  caption: string;
  uploadedAt: string;
}

// Mock Admin Users
export const mockAdmins: AdminUser[] = [
  {
    id: "admin-001",
    email: "admin@spaceburial.com",
    passwordHash: "$2a$10$PLACEHOLDER_HASH",
    name: "System Administrator",
    role: "admin",
    createdAt: "2025-01-01",
    permissions: ["users", "cms", "analytics", "settings"],
  },
];

// Mock Investor Users
export const mockInvestors: InvestorUser[] = [
  {
    id: "inv-001",
    email: "investor@example.com",
    passwordHash: "$2a$10$PLACEHOLDER_HASH",
    name: "Alexandra Chen",
    role: "investor",
    createdAt: "2025-06-15",
    accredited: true,
    investmentAmount: 250000,
    shares: 50000,
    sharePrice: 5.0,
    ndaSigned: true,
    ndaSignature: "Alexandra Chen",
    ndaSignedDate: "2025-06-14",
    documents: [
      {
        id: "doc-001",
        name: "Non-Disclosure Agreement",
        type: "nda",
        url: "/documents/nda-signed.pdf",
        uploadedAt: "2025-06-14",
      },
      {
        id: "doc-002",
        name: "Investment Agreement",
        type: "agreement",
        url: "/documents/investment-agreement.pdf",
        uploadedAt: "2025-06-15",
      },
      {
        id: "doc-003",
        name: "Q4 2025 Financial Report",
        type: "report",
        url: "/documents/q4-2025-report.pdf",
        uploadedAt: "2026-01-15",
      },
    ],
    // SEC Compliance - Verified via document upload
    verificationStatus: "document_verified",
    verificationMethod: "document_upload",
    verificationDate: "2025-06-15",
    verificationDocuments: [
      {
        id: "vdoc-001",
        name: "2024 Tax Return",
        type: "tax_return",
        uploadedAt: "2025-06-14",
        status: "verified",
      },
    ],
  },
  {
    id: "inv-002",
    email: "demo@spaceburial.com",
    passwordHash: "$2a$10$PLACEHOLDER_HASH",
    name: "Marcus Webb",
    role: "investor",
    createdAt: "2025-09-01",
    accredited: true,
    investmentAmount: 100000,
    shares: 20000,
    sharePrice: 5.0,
    ndaSigned: true,
    ndaSignature: "Marcus Webb",
    ndaSignedDate: "2025-08-30",
    documents: [
      {
        id: "doc-004",
        name: "Non-Disclosure Agreement",
        type: "nda",
        url: "/documents/nda-signed.pdf",
        uploadedAt: "2025-08-30",
      },
      {
        id: "doc-005",
        name: "Investment Agreement",
        type: "agreement",
        url: "/documents/investment-agreement.pdf",
        uploadedAt: "2025-09-01",
      },
    ],
    // SEC Compliance - Verified via third party service
    verificationStatus: "third_party_verified",
    verificationMethod: "third_party",
    verificationDate: "2025-08-31",
    verificationDocuments: [
      {
        id: "vdoc-002",
        name: "VerifyInvestor.com Confirmation",
        type: "third_party",
        uploadedAt: "2025-08-31",
        status: "verified",
      },
    ],
  },
];

// Mock Immortal Users (purchasers)
export const mockImmortals: ImmortalUser[] = [
  {
    id: "imm-001",
    email: "eternal@example.com",
    passwordHash: "$2a$10$PLACEHOLDER_HASH",
    name: "Robert Starfield",
    role: "immortal",
    createdAt: "2025-11-01",
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
        url: "/uploads/robert-telescope.jpg",
        caption: "Robert with his beloved Celestron telescope, 2018",
        uploadedAt: "2025-11-15",
      },
      {
        id: "photo-002",
        url: "/uploads/robert-family.jpg",
        caption: "Family reunion at Lake Tahoe, 2022",
        uploadedAt: "2025-11-16",
      },
    ],
  },
  {
    id: "imm-002",
    email: "memorial@example.com",
    passwordHash: "$2a$10$PLACEHOLDER_HASH",
    name: "Jennifer Martinez",
    role: "immortal",
    createdAt: "2026-01-10",
    packageType: "rocket",
    subscriptionTier: "Rocket Memorial",
    launchDate: "2026-06-21T10:30:00Z",
    missionName: "Aurora Mission III",
    memorialSlug: "maria-martinez-memorial",
    honoredName: "Maria Elena Martinez",
    familyAccessEnabled: true,
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
      {
        id: "photo-003",
        url: "/uploads/maria-garden.jpg",
        caption: "Maria in her beloved garden, Spring 2024",
        uploadedAt: "2026-01-12",
      },
    ],
  },
];

// Helper function to find user by email
export function findUserByEmail(
  email: string
): AdminUser | InvestorUser | ImmortalUser | undefined {
  const admin = mockAdmins.find((u) => u.email === email);
  if (admin) return admin;

  const investor = mockInvestors.find((u) => u.email === email);
  if (investor) return investor;

  const immortal = mockImmortals.find((u) => u.email === email);
  if (immortal) return immortal;

  return undefined;
}

// Helper to find immortal by memorial slug
export function findImmortalBySlug(slug: string): ImmortalUser | undefined {
  return mockImmortals.find((u) => u.memorialSlug === slug);
}

// NDA Text
export const NDA_TEXT = `
SPACE BURIAL, INC.
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

By typing your full legal name below, you acknowledge that you have read, understood, and agree to be bound by the terms of this Non-Disclosure Agreement.
`;

// Demo credentials
export const DEMO_CREDENTIALS = {
  admin: { email: "admin@spaceburial.com", password: "admin123" },
  investor: { email: "demo@spaceburial.com", password: "investor123" },
  immortal: { email: "eternal@example.com", password: "eternal123" },
};
