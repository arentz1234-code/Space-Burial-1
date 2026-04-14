"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import StarField from "@/components/shared/StarField";
import SECDisclaimer from "@/components/shared/SECDisclaimer";
import { Shield, AlertCircle, CheckCircle } from "lucide-react";

export default function InvestorLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acknowledged) {
      setError("You must acknowledge the securities disclosures to continue.");
      return;
    }

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
      } else if (data.error === "VERIFICATION_REQUIRED") {
        router.push("/pending");
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Demo credentials auto-fill
  const loadDemo = () => {
    setEmail("demo@spaceburial.com");
    setPassword("investor123");
    setError("");
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
          {/* SEC Warning Banner */}
          <SECDisclaimer />

          <div className="mt-8 text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-cosmic-gold/20 flex items-center justify-center">
              <Shield className="w-8 h-8 text-cosmic-gold" />
            </div>
            <h1 className="font-heading text-2xl tracking-wider mb-2">
              Investor Login
            </h1>
            <p className="text-cosmic-white/50 text-sm">
              Access your Space Burial investor dashboard
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
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-cosmic-gold transition-colors"
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
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-cosmic-gold transition-colors"
                placeholder="Enter your password"
              />
            </div>

            {/* Mandatory Acknowledgment */}
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acknowledged}
                  onChange={(e) => setAcknowledged(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-red-500/50 bg-transparent text-cosmic-gold focus:ring-cosmic-gold"
                />
                <span className="text-xs text-cosmic-white/70 leading-relaxed">
                  I acknowledge that this portal contains securities information available
                  only to accredited investors. I understand that investments in private
                  securities involve significant risk, including the possible loss of my
                  entire investment. I confirm that I am an accredited investor as defined
                  under SEC Rule 501(a).
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !acknowledged}
              className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* Demo Account */}
            <div className="border-t border-white/10 pt-6">
              <p className="text-center text-xs text-cosmic-white/30 mb-4">
                Demo Account
              </p>
              <button
                type="button"
                onClick={loadDemo}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-cosmic-gold/10 border border-cosmic-gold/30 text-cosmic-gold text-xs font-heading tracking-wider hover:bg-cosmic-gold/20 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                Load Demo Credentials
              </button>
            </div>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-xs text-cosmic-white/40">
              Don&apos;t have an account?
            </p>
            <Link
              href="/apply"
              className="text-sm text-cosmic-gold hover:text-cosmic-gold/80 transition-colors"
            >
              Request investor access
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
