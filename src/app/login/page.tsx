"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import StarField from "@/components/shared/StarField";
import { Rocket, AlertCircle, Sparkles, Shield } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadCredentials = (type: "admin" | "immortal" | "investor") => {
    if (type === "admin") {
      setEmail("admin@spaceburial.com");
      setPassword("admin123");
    } else if (type === "immortal") {
      setEmail("eternal@example.com");
      setPassword("eternal123");
    } else {
      setEmail("demo@spaceburial.com");
      setPassword("investor123");
    }
    setError("");
  };

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
        router.refresh();
        router.push(data.redirect);
      } else if (data.error === "NDA_REQUIRED") {
        setError("Please complete your account setup before accessing your account.");
      } else {
        setError("Invalid credentials. Please check your email and password.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StarField />
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-32 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-nebula-500/20 flex items-center justify-center">
              <Rocket className="w-8 h-8 text-nebula-400" />
            </div>
            <h1 className="font-heading text-2xl tracking-wider mb-2">
              Welcome Back
            </h1>
            <p className="text-cosmic-white/50 text-sm">
              Sign in to access your Space Burial memorial account
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
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500 transition-colors"
                placeholder="you@example.com"
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
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500 transition-colors"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* Demo Accounts */}
            <div className="border-t border-white/10 pt-6">
              <p className="text-center text-xs text-cosmic-white/30 mb-4">
                Demo Accounts
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => loadCredentials("admin")}
                  className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl bg-nebula-500/10 border border-nebula-500/30 text-nebula-400 text-xs font-heading tracking-wider hover:bg-nebula-500/20 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => loadCredentials("immortal")}
                  className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl bg-stellar-400/10 border border-stellar-400/30 text-stellar-400 text-xs font-heading tracking-wider hover:bg-stellar-400/20 transition-colors"
                >
                  <Rocket className="w-4 h-4" />
                  Immortal
                </button>
                <button
                  type="button"
                  onClick={() => loadCredentials("investor")}
                  className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl bg-cosmic-gold/10 border border-cosmic-gold/30 text-cosmic-gold text-xs font-heading tracking-wider hover:bg-cosmic-gold/20 transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  Investor
                </button>
              </div>
              <p className="text-center text-xs text-cosmic-white/30 mt-3">
                Click to auto-fill credentials
              </p>
            </div>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-xs text-cosmic-white/40">
              This portal is for memorial account holders only.
            </p>
            <Link
              href="/checkout"
              className="text-sm text-nebula-400 hover:text-nebula-300 transition-colors"
            >
              Reserve your memorial
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
