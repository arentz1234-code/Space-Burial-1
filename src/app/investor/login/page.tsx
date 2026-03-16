"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import StarField from "@/components/shared/StarField";
import { Lock, AlertCircle } from "lucide-react";

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
      const res = await fetch("/api/auth/investor-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/investor/dashboard");
      } else {
        setError("Invalid credentials. Try demo@spaceburial.com / investor123");
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
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-nebula-500/20 flex items-center justify-center">
              <Lock className="w-8 h-8 text-nebula-400" />
            </div>
            <h1 className="font-heading text-2xl tracking-wider mb-2">Investor Portal</h1>
            <p className="text-cosmic-white/50 text-sm">
              Accredited investors only. Enter your credentials.
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

            <p className="text-center text-xs text-cosmic-white/30">
              Demo: demo@spaceburial.com / investor123
            </p>
          </form>
        </motion.div>
      </div>
    </>
  );
}
