// Shared types for Space Burial monorepo
// Used by both client and investor apps

export type UserRole = "admin" | "investor" | "immortal";

export interface User {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface AdminUser extends User {
  role: "admin";
  permissions: string[];
}

// Verification status for accredited investor compliance (SEC Rule 506(c))
export type VerificationStatus =
  | "pending"
  | "under_review"
  | "approved"
  | "rejected";

export type VerificationMethod =
  | "document_upload"
  | "third_party"
  | "professional_letter";

export type EntityType = "individual" | "trust" | "llc" | "corporation";

export type PaymentStatus = "pending" | "processing" | "completed" | "failed";

// Investor application from the investor site
export interface InvestorApplication {
  id: string;
  user_id?: string;
  email: string;
  name: string;
  phone?: string;
  entity_type: EntityType;
  verification_method?: VerificationMethod;
  verification_status: VerificationStatus;
  nda_signed: boolean;
  nda_signature?: string;
  nda_signed_at?: string;
  investment_amount?: number;
  payment_status: PaymentStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Documents uploaded for verification
export interface InvestorDocument {
  id: string;
  application_id: string;
  document_type: string;
  file_name: string;
  file_url: string;
  status: "pending" | "verified" | "rejected";
  uploaded_at: string;
}

// Approved investor (after application is approved)
export interface Investor {
  id: string;
  user_id: string;
  application_id: string;
  shares: number;
  share_price: number;
  investment_amount: number;
  ownership_percentage?: number;
  verification_date?: string;
  verification_method?: VerificationMethod;
  created_at: string;
}

// Legacy InvestorUser for mock data compatibility
export interface InvestorUser extends User {
  role: "investor";
  accredited: boolean;
  investmentAmount: number;
  shares: number;
  sharePrice: number;
  ndaSigned: boolean;
  ndaSignature: string;
  ndaSignedDate: string;
  documents: LegacyInvestorDocument[];
  verificationStatus: LegacyVerificationStatus;
  verificationMethod?: VerificationMethod;
  verificationDate?: string;
  verificationDocuments?: LegacyVerificationDocument[];
}

export type LegacyVerificationStatus =
  | "pending"
  | "self_certified"
  | "document_verified"
  | "third_party_verified"
  | "professional_verified";

export interface LegacyVerificationDocument {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  status: "pending" | "verified" | "rejected";
}

export interface LegacyInvestorDocument {
  id: string;
  name: string;
  type: "nda" | "agreement" | "report" | "certificate";
  url: string;
  uploadedAt: string;
}

export interface ImmortalUser extends User {
  role: "immortal";
  packageType: "rocket" | "immortal";
  subscriptionTier: string;
  launchDate: string;
  missionName: string;
  memorialSlug: string;
  honoredName: string;
  memories: Memory[];
  photos: Photo[];
  familyAccessEnabled: boolean;
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

// Session user (stored in cookie)
export interface SessionUser {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  verificationStatus?: LegacyVerificationStatus;
}

// Company metrics for investor dashboard
export interface CompanyMetrics {
  totalRaised: number;
  valuation: number;
  totalInvestors: number;
  reservations: number;
  monthlyBurnRate: number;
  runway: number;
}

// Revenue data point
export interface RevenueDataPoint {
  month: string;
  revenue: number;
  expenses: number;
}

// Site content types
export interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  relation?: string;
}

export interface CompanyUpdate {
  id: string;
  title: string;
  content: string;
  date: string;
  category: "announcement" | "milestone" | "financial" | "regulatory";
}

export interface OfferingDocument {
  id: string;
  name: string;
  description: string;
  url: string;
  category: "offering" | "financials" | "regulatory" | "general";
  uploadedAt: string;
}
