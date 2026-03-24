"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import StarField from "@/components/shared/StarField";
import { Rocket, AlertCircle, Sparkles, Zap } from "lucide-react";

export default function LoginPage() {
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
        // Refresh to ensure cookie is recognized, then navigate
        router.refresh();
        router.push(data.redirect);
      } else if (data.error === "NDA_REQUIRED") {
        setError("Please sign the NDA before accessing your account.");
      } else {
        setError("Invalid credentials. Use the demo buttons below.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadCredentials = (type: "admin" | "immortal") => {
    if (type === "admin") {
      setEmail("admin@spaceburial.com");
      setPassword("admin123");
    } else {
      setEmail("eternal@example.com");
      setPassword("eternal123");
    }
    setError("");
  };

  return (
    <>
      <StarField />
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-24 sm:pt-28 pb-8">
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
              Sign in to access your Space Burial account
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
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* Demo credentials section */}
            <div className="border-t border-white/10 pt-6">
              <p className="text-center text-xs text-cosmic-white/30 mb-4">
                Demo Accounts
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => loadCredentials("admin")}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cosmic-gold/10 border border-cosmic-gold/30 text-cosmic-gold text-xs font-heading tracking-wider hover:bg-cosmic-gold/20 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => loadCredentials("immortal")}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-nebula-500/10 border border-nebula-500/30 text-nebula-400 text-xs font-heading tracking-wider hover:bg-nebula-500/20 transition-colors"
                >
                  <Rocket className="w-4 h-4" />
                  Immortal
                </button>
              </div>
              <p className="text-center text-xs text-cosmic-white/30 mt-3">
                Click to auto-fill demo credentials
              </p>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/investor/login"
              className="text-sm text-nebula-400 hover:text-nebula-300 transition-colors"
            >
              Investor? Login here &rarr;
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
