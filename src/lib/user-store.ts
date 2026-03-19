// User Store - Persists user registrations to localStorage
// In production, replace with database calls

import { TierLevel } from "./tiers";

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "admin" | "investor" | "immortal";
  status: "active" | "pending" | "inactive";
  joinDate: string;
  // Immortal-specific fields
  tier?: TierLevel;
  honoreeName?: string;
  // Investor-specific fields
  shares?: number;
  investment?: string;
  ndaSigned?: boolean;
}

// Default users (system accounts)
export const defaultUsers: StoredUser[] = [
  {
    id: "admin-001",
    name: "System Administrator",
    email: "admin@spaceburial.com",
    role: "admin",
    status: "active",
    joinDate: "2025-01-01",
  },
  {
    id: "inv-001",
    name: "Alexandra Chen",
    email: "investor@example.com",
    role: "investor",
    status: "active",
    joinDate: "2025-06-15",
    shares: 50000,
    investment: "$250,000",
    ndaSigned: true,
  },
  {
    id: "inv-002",
    name: "Marcus Webb",
    email: "demo@spaceburial.com",
    role: "investor",
    status: "active",
    joinDate: "2025-09-01",
    shares: 20000,
    investment: "$100,000",
    ndaSigned: true,
  },
  {
    id: "imm-001",
    name: "Robert Starfield",
    email: "eternal@example.com",
    role: "immortal",
    status: "active",
    joinDate: "2025-11-01",
    tier: "eternal",
    honoreeName: "Robert J. Starfield",
  },
  {
    id: "imm-002",
    name: "Jennifer Martinez",
    email: "memorial@example.com",
    role: "immortal",
    status: "active",
    joinDate: "2026-01-10",
    tier: "voyager",
    honoreeName: "Thomas Martinez",
  },
];

// Storage key
const USERS_STORAGE_KEY = "spaceburial_users";

// Get all users from localStorage
export function getUsers(): StoredUser[] {
  if (typeof window === "undefined") {
    return defaultUsers;
  }

  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    if (stored) {
      const customUsers = JSON.parse(stored) as StoredUser[];
      // Merge default users with custom users, avoiding duplicates by email
      const allEmails = new Set(customUsers.map(u => u.email));
      const uniqueDefaults = defaultUsers.filter(u => !allEmails.has(u.email));
      return [...uniqueDefaults, ...customUsers];
    }
  } catch (e) {
    console.error("Error reading users from localStorage:", e);
  }

  return defaultUsers;
}

// Get only registered users (not default system users)
export function getRegisteredUsers(): StoredUser[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as StoredUser[];
    }
  } catch (e) {
    console.error("Error reading users from localStorage:", e);
  }

  return [];
}

// Add a new user
export function addUser(user: Omit<StoredUser, "id" | "joinDate" | "status">): StoredUser {
  const newUser: StoredUser = {
    ...user,
    id: `${user.role}-${Date.now()}`,
    joinDate: new Date().toISOString().split("T")[0],
    status: "active",
  };

  if (typeof window !== "undefined") {
    try {
      const currentUsers = getRegisteredUsers();
      const updatedUsers = [...currentUsers, newUser];
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
      window.dispatchEvent(new CustomEvent("users-updated", { detail: updatedUsers }));
    } catch (e) {
      console.error("Error saving user to localStorage:", e);
    }
  }

  return newUser;
}

// Update a user
export function updateUser(userId: string, updates: Partial<StoredUser>): void {
  if (typeof window === "undefined") return;

  try {
    const currentUsers = getRegisteredUsers();
    const updatedUsers = currentUsers.map(u =>
      u.id === userId ? { ...u, ...updates } : u
    );
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    window.dispatchEvent(new CustomEvent("users-updated", { detail: updatedUsers }));
  } catch (e) {
    console.error("Error updating user:", e);
  }
}

// Delete a user
export function deleteUser(userId: string): void {
  if (typeof window === "undefined") return;

  try {
    const currentUsers = getRegisteredUsers();
    const updatedUsers = currentUsers.filter(u => u.id !== userId);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    window.dispatchEvent(new CustomEvent("users-updated", { detail: updatedUsers }));
  } catch (e) {
    console.error("Error deleting user:", e);
  }
}

// Find user by email
export function findUserByEmail(email: string): StoredUser | undefined {
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
}

// Check if email exists
export function emailExists(email: string): boolean {
  return getUsers().some(u => u.email.toLowerCase() === email.toLowerCase());
}

// Reset to defaults (clear registered users)
export function resetUsers(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(USERS_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("users-updated", { detail: [] }));
}
