"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

export interface User {
  userId: string;
  email: string;
  name: string;
  role: "admin" | "investor" | "immortal";
}

// Helper to get cookie value by name
function getCookie(name: string): string | null {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [cookieName, ...cookieValueParts] = cookie.trim().split("=");
    if (cookieName === name) {
      // Join back in case value contains = characters
      return cookieValueParts.join("=");
    }
  }
  return null;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const checkSession = useCallback(() => {
    try {
      const sessionValue = getCookie("session");

      if (sessionValue) {
        const decoded = decodeURIComponent(sessionValue);
        const userData = JSON.parse(decoded);
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (e) {
      console.error("Error parsing session:", e);
      setUser(null);
    }
    setLoading(false);
  }, []);

  // Check session on mount and whenever pathname changes
  useEffect(() => {
    checkSession();
  }, [pathname, checkSession]);

  // Also listen for storage events (login/logout in other tabs)
  useEffect(() => {
    window.addEventListener("storage", checkSession);
    return () => window.removeEventListener("storage", checkSession);
  }, [checkSession]);

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/");
      router.refresh();
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  const getDashboardUrl = () => {
    if (!user) return "/login";
    switch (user.role) {
      case "admin":
        return "/admin/dashboard";
      case "investor":
        return "/investor/dashboard";
      case "immortal":
        return "/immortal/dashboard";
      default:
        return "/login";
    }
  };

  return {
    user,
    loading,
    logout,
    isLoggedIn: !!user,
    getDashboardUrl,
  };
}
