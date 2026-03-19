"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Memorials" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-space-900/80 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Rocket className="w-8 h-8 text-nebula-400 group-hover:text-cosmic-gold transition-colors" />
          <span className="font-heading text-xl tracking-widest uppercase">
            Space<span className="text-nebula-400">Burial</span>
          </span>
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
          <Link href="/services" className="btn-primary text-xs">
            Reserve Now
          </Link>
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
              <Link href="/login" className="text-sm text-cosmic-white/40 hover:text-cosmic-gold">
                Login
              </Link>
              <Link href="/investor/login" className="text-sm text-cosmic-white/40 hover:text-cosmic-gold">
                Investor Portal
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
