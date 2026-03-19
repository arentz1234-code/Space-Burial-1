"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface User {
  userId: string;
  email: string;
  name: string;
  role: "admin" | "investor" | "immortal";
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for session in cookie (client-side)
    const checkSession = () => {
      try {
        // Get all cookies
        const cookies = document.cookie.split(";");
        const sessionCookie = cookies.find((c) => c.trim().startsWith("session="));

        if (sessionCookie) {
          const sessionValue = sessionCookie.split("=")[1];
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
    };

    checkSession();

    // Listen for storage events (login/logout in other tabs)
    window.addEventListener("storage", checkSession);
    return () => window.removeEventListener("storage", checkSession);
  }, []);

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
