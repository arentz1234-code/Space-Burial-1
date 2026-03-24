"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown, Shield, AlertTriangle } from "lucide-react";
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
  const [investorDisclaimerOpen, setInvestorDisclaimerOpen] = useState(false);
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
      <div className="max-w-7xl mx-auto px-6 h-24 sm:h-28 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Space Burial - Immortality Among the Stars"
            width={240}
            height={80}
            className="h-16 sm:h-20 w-auto"
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
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors min-h-[44px]"
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
                  <button
                    onClick={() => setInvestorDisclaimerOpen(true)}
                    className="text-xs tracking-wider uppercase text-cosmic-white/40 hover:text-cosmic-gold transition-colors flex items-center gap-1"
                  >
                    <Shield className="w-3 h-3" />
                    Investors
                  </button>
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
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setInvestorDisclaimerOpen(true);
                    }}
                    className="text-sm text-cosmic-white/40 hover:text-cosmic-gold text-left flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    Investor Portal
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accredited Investor Disclaimer Modal */}
      <AnimatePresence>
        {investorDisclaimerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setInvestorDisclaimerOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-space-800 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-red-500/10 border-b border-red-500/20 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h2 className="font-heading text-lg tracking-wider text-cosmic-white">
                      Accredited Investors Only
                    </h2>
                    <p className="text-xs text-red-400">SEC Rule 506(c) Compliance</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <p className="text-sm text-cosmic-white/70 leading-relaxed">
                  The investor portal and investment opportunity are available{" "}
                  <strong className="text-cosmic-white">only to accredited investors</strong> as
                  defined by SEC Rule 501 of Regulation D.
                </p>

                <div className="bg-white/5 rounded-xl p-4 space-y-3">
                  <p className="text-xs font-heading tracking-wider text-cosmic-gold">
                    ACCREDITED INVESTOR REQUIREMENTS
                  </p>
                  <ul className="text-xs text-cosmic-white/60 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-cosmic-gold">•</span>
                      <span>
                        Individual income exceeding $200,000 ($300,000 with spouse) in
                        each of the two most recent years
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cosmic-gold">•</span>
                      <span>
                        Net worth exceeding $1,000,000, excluding primary residence
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cosmic-gold">•</span>
                      <span>
                        Certain financial professionals (Series 7, 65, or 82 license holders)
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                  <p className="text-xs text-cosmic-white/60 leading-relaxed">
                    <span className="text-amber-400 font-medium">Important:</span> Under Rule
                    506(c), we are required to verify your accredited investor status before
                    accepting any investment. Self-certification alone is not sufficient.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setInvestorDisclaimerOpen(false)}
                  className="flex-1 py-3 px-6 rounded-xl border border-white/10 text-sm text-cosmic-white/70 hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <Link
                  href="/investor/login"
                  onClick={() => setInvestorDisclaimerOpen(false)}
                  className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-cosmic-gold to-yellow-500 text-space-black font-heading text-sm tracking-wider text-center hover:opacity-90 transition-opacity"
                >
                  I Am an Accredited Investor
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
