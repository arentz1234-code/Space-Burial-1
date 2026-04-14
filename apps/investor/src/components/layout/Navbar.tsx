"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Check for session cookie
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return null;
    };

    const sessionCookie = getCookie("investor_session");
    if (sessionCookie) {
      try {
        const session = JSON.parse(decodeURIComponent(sessionCookie));
        setUser({ name: session.name, email: session.email });
      } catch {
        setUser(null);
      }
    }
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.href = "/";
  };

  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <nav className="fixed top-8 left-0 right-0 z-50 bg-space-900/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Space Burial - Cape Canaveral"
            width={56}
            height={56}
            className="h-14 w-14"
            priority
          />
          <span className="text-xs text-cosmic-white/50 tracking-wider uppercase">Investor Portal</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {isDashboard ? (
            <>
              <Link
                href="/dashboard"
                className={`text-sm ${pathname === "/dashboard" ? "text-nebula-400" : "text-cosmic-white/70 hover:text-cosmic-white"}`}
              >
                Overview
              </Link>
              <Link
                href="/dashboard/documents"
                className={`text-sm ${pathname === "/dashboard/documents" ? "text-nebula-400" : "text-cosmic-white/70 hover:text-cosmic-white"}`}
              >
                Documents
              </Link>
              <Link
                href="/dashboard/financials"
                className={`text-sm ${pathname === "/dashboard/financials" ? "text-nebula-400" : "text-cosmic-white/70 hover:text-cosmic-white"}`}
              >
                Financials
              </Link>
              <Link
                href="/dashboard/updates"
                className={`text-sm ${pathname === "/dashboard/updates" ? "text-nebula-400" : "text-cosmic-white/70 hover:text-cosmic-white"}`}
              >
                Updates
              </Link>
              <Link
                href="/dashboard/pitch-deck"
                className={`text-sm ${pathname === "/dashboard/pitch-deck" ? "text-nebula-400" : "text-cosmic-white/70 hover:text-cosmic-white"}`}
              >
                Pitch Deck
              </Link>
            </>
          ) : (
            <>
              <a href="#opportunity" className="text-sm text-cosmic-white/70 hover:text-cosmic-white">
                Opportunity
              </a>
              <a href="#team" className="text-sm text-cosmic-white/70 hover:text-cosmic-white">
                Team
              </a>
              <a href="#process" className="text-sm text-cosmic-white/70 hover:text-cosmic-white">
                Process
              </a>
            </>
          )}
        </div>

        {/* Auth Section */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-nebula-400" />
                <span className="text-cosmic-white/70">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm text-cosmic-white/50 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-cosmic-white/70 hover:text-cosmic-white"
              >
                Login
              </Link>
              <Link href="/apply" className="btn-primary py-2 px-4 text-xs">
                Request Access
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-cosmic-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-space-800 border-t border-white/5 px-6 py-4 space-y-4">
          {isDashboard ? (
            <>
              <Link href="/dashboard" className="block text-sm text-cosmic-white/70">Overview</Link>
              <Link href="/dashboard/documents" className="block text-sm text-cosmic-white/70">Documents</Link>
              <Link href="/dashboard/financials" className="block text-sm text-cosmic-white/70">Financials</Link>
              <Link href="/dashboard/updates" className="block text-sm text-cosmic-white/70">Updates</Link>
              <Link href="/dashboard/pitch-deck" className="block text-sm text-cosmic-white/70">Pitch Deck</Link>
            </>
          ) : (
            <>
              <a href="#opportunity" className="block text-sm text-cosmic-white/70">Opportunity</a>
              <a href="#team" className="block text-sm text-cosmic-white/70">Team</a>
              <a href="#process" className="block text-sm text-cosmic-white/70">Process</a>
            </>
          )}
          <div className="pt-4 border-t border-white/10 space-y-2">
            {user ? (
              <button onClick={handleLogout} className="text-sm text-red-400">Logout</button>
            ) : (
              <>
                <Link href="/login" className="block text-sm text-cosmic-white/70">Login</Link>
                <Link href="/apply" className="btn-primary py-2 px-4 text-xs inline-block">Request Access</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
