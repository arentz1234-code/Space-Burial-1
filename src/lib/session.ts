import { cookies } from "next/headers";
import {
  mockAdmins,
  mockInvestors,
  mockImmortals,
  type AdminUser,
  type InvestorUser,
  type ImmortalUser,
  type UserRole,
} from "./mock-users";

export interface SessionUser {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (!sessionCookie) {
    return null;
  }

  try {
    return JSON.parse(sessionCookie.value) as SessionUser;
  } catch {
    return null;
  }
}

export async function getFullUser(): Promise<
  AdminUser | InvestorUser | ImmortalUser | null
> {
  const session = await getSession();

  if (!session) {
    return null;
  }

  // Find full user data
  if (session.role === "admin") {
    return mockAdmins.find((u) => u.id === session.userId) || null;
  }

  if (session.role === "investor") {
    return mockInvestors.find((u) => u.id === session.userId) || null;
  }

  if (session.role === "immortal") {
    return mockImmortals.find((u) => u.id === session.userId) || null;
  }

  return null;
}

export async function requireAuth(
  allowedRoles?: UserRole[]
): Promise<SessionUser> {
  const session = await getSession();

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  if (allowedRoles && !allowedRoles.includes(session.role)) {
    throw new Error("FORBIDDEN");
  }

  return session;
}
