"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Memorials" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isLoggedIn, logout, getDashboardUrl, loading } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-nebula-500/20 text-nebula-400";
      case "investor":
        return "bg-cosmic-gold/20 text-cosmic-gold";
      case "immortal":
        return "bg-stellar-400/20 text-stellar-400";
      default:
        return "bg-white/10 text-white";
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-space-900/80 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Space Burial - Immortality Among the Stars"
            width={180}
            height={60}
            className="h-14 w-auto"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wider uppercase text-cosmic-white/70 hover:text-cosmic-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/checkout" className="btn-primary text-xs">
            Reserve Now
          </Link>

          {/* Auth Section */}
          {!loading && (
            <>
              {isLoggedIn && user ? (
                /* Logged In - User Menu */
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-nebula-500 to-stellar-400 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-cosmic-white/50">Welcome,</p>
                      <p className="text-sm font-heading tracking-wider text-cosmic-white">
                        {user.name.split(" ")[0]}
                      </p>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-cosmic-white/50 transition-transform ${
                        userMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 bg-space-800 border border-white/10 rounded-xl shadow-xl overflow-hidden"
                      >
                        {/* User Info */}
                        <div className="p-4 border-b border-white/10">
                          <p className="text-sm text-cosmic-white font-medium">
                            {user.name}
                          </p>
                          <p className="text-xs text-cosmic-white/50 mt-0.5">
                            {user.email}
                          </p>
                          <span
                            className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-heading tracking-wider capitalize ${getRoleBadgeColor(
                              user.role
                            )}`}
                          >
                            {user.role}
                          </span>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                          <Link
                            href={getDashboardUrl()}
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-cosmic-white/70 hover:bg-white/5 hover:text-cosmic-white transition-colors"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                          </Link>
                          <button
                            onClick={() => {
                              setUserMenuOpen(false);
                              logout();
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Not Logged In */
                <>
                  <Link
                    href="/login"
                    className="text-xs tracking-wider uppercase text-cosmic-white/40 hover:text-cosmic-gold transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/investor/login"
                    className="text-xs tracking-wider uppercase text-cosmic-white/40 hover:text-cosmic-gold transition-colors"
                  >
                    Investors
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-cosmic-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-space-800 border-t border-white/5"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {/* User Info (Mobile) */}
              {isLoggedIn && user && (
                <div className="pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-nebula-500 to-stellar-400 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-cosmic-white/50">Welcome,</p>
                      <p className="text-lg font-heading tracking-wider text-cosmic-white">
                        {user.name}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Link
                      href={getDashboardUrl()}
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 btn-primary text-center text-xs"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        logout();
                      }}
                      className="px-4 py-2 rounded-xl border border-red-500/30 text-red-400 text-xs hover:bg-red-500/10 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg tracking-wider uppercase text-cosmic-white/70 hover:text-cosmic-gold"
                >
                  {link.label}
                </Link>
              ))}

              {/* Login Links (Mobile - only when not logged in) */}
              {!isLoggedIn && (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="text-sm text-cosmic-white/40 hover:text-cosmic-gold"
                  >
                    Login
                  </Link>
                  <Link
                    href="/investor/login"
                    onClick={() => setMobileOpen(false)}
                    className="text-sm text-cosmic-white/40 hover:text-cosmic-gold"
                  >
                    Investor Portal
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
