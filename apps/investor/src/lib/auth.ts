import type { SessionUser, UserRole } from "./types";

// Cookie name for session
export const SESSION_COOKIE_NAME = "session";

// Parse session from cookie value
export function parseSession(cookieValue: string): SessionUser | null {
  try {
    return JSON.parse(cookieValue) as SessionUser;
  } catch {
    return null;
  }
}

// Serialize session to cookie value
export function serializeSession(session: SessionUser): string {
  return JSON.stringify(session);
}

// Check if a verification status allows dashboard access
export function isVerifiedInvestor(
  verificationStatus?: string
): boolean {
  const verifiedStatuses = [
    "document_verified",
    "third_party_verified",
    "professional_verified",
    "approved",
  ];
  return verificationStatus ? verifiedStatuses.includes(verificationStatus) : false;
}

// Get dashboard URL based on role
export function getDashboardUrl(role: UserRole): string {
  switch (role) {
    case "admin":
      return "/admin/dashboard";
    case "investor":
      return "/dashboard"; // On investor site, dashboard is at root
    case "immortal":
      return "/immortal/dashboard";
    default:
      return "/";
  }
}

// Check if role is allowed to access a route
export function isRoleAllowed(role: UserRole, allowedRoles: UserRole[]): boolean {
  return allowedRoles.includes(role);
}

// NDA text for investor applications
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

// SEC disclaimer text
export const SEC_DISCLAIMER = `
IMPORTANT: This is a private placement offering available only to accredited investors as defined under SEC Rule 501(a). This is not an offer to sell or a solicitation of an offer to buy securities. Such offer can only be made through the Private Placement Memorandum. Securities are not FDIC insured and involve significant risk, including the risk of total loss of investment.
`;

// SEC banner text
export const SEC_BANNER_TEXT = "PRIVATE PLACEMENT - ACCREDITED INVESTORS ONLY";

// Demo credentials
export const DEMO_CREDENTIALS = {
  admin: { email: "admin@spaceburial.com", password: "admin123" },
  investor: { email: "demo@spaceburial.com", password: "investor123" },
  immortal: { email: "eternal@example.com", password: "eternal123" },
};
