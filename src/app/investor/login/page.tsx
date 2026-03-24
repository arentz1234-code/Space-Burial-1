"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import StarField from "@/components/shared/StarField";
import { Lock, AlertCircle, FileText, Zap, AlertTriangle } from "lucide-react";

export default function InvestorLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.redirect) {
        // Only allow investors to access investor dashboard
        if (data.user.role === "investor") {
          router.refresh();
          router.push("/investor/dashboard");
        } else {
          setError("This login is for investors only. Please use the main login.");
        }
      } else if (data.error === "NDA_REQUIRED") {
        router.push(`/investor/signup?userId=${data.userId}`);
      } else {
        setError("Invalid credentials. Click the demo button below to load test credentials.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadDemoCredentials = () => {
    setEmail("demo@spaceburial.com");
    setPassword("investor123");
    setError("");
  };

  return (
    <div className="relative min-h-screen">
      <StarField />
      <div className="relative z-10 px-4 sm:px-6 pt-28 sm:pt-32 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg mx-auto"
        >
          {/* SEC Disclaimer */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h2 className="font-heading text-lg tracking-wider text-cosmic-white mb-1">
                  Accredited Investors Only
                </h2>
                <p className="text-xs text-red-400 mb-4">SEC Rule 506(c) Compliance</p>
                <p className="text-sm text-cosmic-white/70 leading-relaxed mb-4">
                  This portal is available <strong className="text-cosmic-white">only to accredited investors</strong> as defined by SEC Rule 501 of Regulation D.
                </p>
                <div className="bg-white/5 rounded-xl p-4 space-y-2">
                  <p className="text-xs font-heading tracking-wider text-cosmic-gold">REQUIREMENTS</p>
                  <ul className="text-xs text-cosmic-white/60 space-y-1.5">
                    <li>• Income exceeding $200,000 ($300,000 with spouse) in each of the two most recent years</li>
                    <li>• Net worth exceeding $1,000,000, excluding primary residence</li>
                    <li>• Certain financial professionals (Series 7, 65, or 82 license holders)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Login Header */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-cosmic-gold/20 flex items-center justify-center">
              <Lock className="w-7 h-7 text-cosmic-gold" />
            </div>
            <h1 className="font-heading text-xl tracking-wider mb-1">
              Investor Login
            </h1>
            <p className="text-cosmic-white/50 text-sm">
              Enter your credentials to access the portal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-cosmic-gold/50 transition-colors"
                placeholder="investor@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-cosmic-gold/50 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 rounded-xl font-heading tracking-wider text-sm bg-gradient-to-r from-cosmic-gold to-yellow-500 text-space-black hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* Demo credentials button */}
            <div className="border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={loadDemoCredentials}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cosmic-gold/10 border border-cosmic-gold/30 text-cosmic-gold text-sm font-heading tracking-wider hover:bg-cosmic-gold/20 transition-colors"
              >
                <Zap className="w-4 h-4" />
                Load Demo Credentials
              </button>
              <p className="text-center text-xs text-cosmic-white/30 mt-3">
                Click above to auto-fill investor demo login
              </p>
            </div>
          </form>

          <div className="mt-6 space-y-3 text-center">
            <Link
              href="/investor/signup"
              className="flex items-center justify-center gap-2 text-sm text-cosmic-gold hover:text-yellow-400 transition-colors"
            >
              <FileText className="w-4 h-4" />
              New investor? Apply here
            </Link>
            <Link
              href="/login"
              className="block text-sm text-cosmic-white/40 hover:text-cosmic-white/60 transition-colors"
            >
              Not an investor? Go to main login
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
