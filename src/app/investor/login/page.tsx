"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import StarField from "@/components/shared/StarField";
import { Lock, AlertCircle, FileText, AlertTriangle, Shield, ExternalLink, Zap } from "lucide-react";

export default function InvestorLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  const loadDemoCredentials = () => {
    setEmail("demo@spaceburial.com");
    setPassword("investor123");
    setAcknowledged(true);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acknowledged) {
      setError("You must acknowledge the securities disclosure before proceeding.");
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
        if (data.user.role === "investor") {
          router.refresh();
          router.push("/investor/dashboard");
        } else {
          setError("This login is for verified investors only.");
        }
      } else if (data.error === "NDA_REQUIRED") {
        router.push(`/investor/signup?userId=${data.userId}`);
      } else {
        setError("Invalid credentials. Please contact investor relations if you need assistance.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-space-900">
      <StarField />
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-32 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* CRITICAL SEC DISCLOSURE - Issue #4 */}
          <div className="bg-red-500/10 border-2 border-red-500/40 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-red-400 shrink-0" />
              <div>
                <h2 className="font-heading text-lg tracking-wider text-red-400 mb-3">
                  IMPORTANT SECURITIES NOTICE
                </h2>
                <div className="text-xs text-cosmic-white/80 space-y-3 leading-relaxed">
                  <p>
                    <strong className="text-cosmic-white">NO OFFER OR SOLICITATION:</strong> This website does not constitute an offer to sell or a solicitation of an offer to buy any securities. Any offer of securities will be made only by means of a formal offering document (Private Placement Memorandum) provided to qualified investors.
                  </p>
                  <p>
                    <strong className="text-cosmic-white">UNREGISTERED SECURITIES:</strong> Securities offered by Space Burial, Inc. have not been registered under the Securities Act of 1933, as amended, or any state securities laws. Such securities may not be offered or sold except pursuant to an exemption from registration.
                  </p>
                  <p>
                    <strong className="text-cosmic-white">RESTRICTED ACCESS:</strong> Access to investor materials is restricted to persons who qualify as accredited investors under SEC Rule 501 of Regulation D. The Company is required to verify accredited investor status before providing access to offering materials.
                  </p>
                  <p>
                    <strong className="text-cosmic-white">JURISDICTIONAL LIMITATIONS:</strong> This offering may not be available in all jurisdictions. It is the responsibility of any person accessing this information to satisfy themselves as to compliance with applicable laws and regulations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RISK DISCLOSURE - Issue #8 */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-heading text-sm tracking-wider text-amber-400 mb-3">
                  INVESTMENT RISK DISCLOSURE
                </h3>
                <ul className="text-xs text-cosmic-white/70 space-y-2 leading-relaxed">
                  <li><strong className="text-cosmic-white">Total Loss Risk:</strong> Investment in early-stage companies involves a high degree of risk. You should be prepared to lose your entire investment.</li>
                  <li><strong className="text-cosmic-white">Illiquidity:</strong> These securities are illiquid. There is no public market and none is expected to develop. You may not be able to sell your investment.</li>
                  <li><strong className="text-cosmic-white">Transfer Restrictions:</strong> Securities are subject to significant transfer restrictions and may only be resold in compliance with applicable securities laws.</li>
                  <li><strong className="text-cosmic-white">Speculative Nature:</strong> The Company is dependent on factors including third-party launch providers, regulatory approvals, and market conditions.</li>
                  <li><strong className="text-cosmic-white">No Guarantees:</strong> Forward-looking statements involve risks and uncertainties. Actual results may differ materially from projections.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ACCREDITED INVESTOR DEFINITION - Issue #3 (Complete Definition) */}
          <div className="bg-space-800 border border-white/10 rounded-2xl p-6 mb-6">
            <h3 className="font-heading text-sm tracking-wider text-cosmic-gold mb-4">
              ACCREDITED INVESTOR QUALIFICATION (SEC RULE 501)
            </h3>
            <p className="text-xs text-cosmic-white/60 mb-4">
              You must qualify under at least one of the following categories:
            </p>
            <div className="space-y-3 text-xs text-cosmic-white/70">
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-cosmic-white font-medium mb-1">Individual Income</p>
                <p>Income exceeding $200,000 (or $300,000 jointly with spouse/partner) in each of the two most recent years, with reasonable expectation of the same in the current year.</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-cosmic-white font-medium mb-1">Net Worth</p>
                <p>Individual or joint net worth exceeding $1,000,000, excluding the value of your primary residence.</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-cosmic-white font-medium mb-1">Professional Certifications</p>
                <p>Holders in good standing of Series 7, Series 65, or Series 82 licenses.</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-cosmic-white font-medium mb-1">Knowledgeable Employees</p>
                <p>Directors, executive officers, or general partners of the issuer, or knowledgeable employees of a private fund.</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-cosmic-white font-medium mb-1">Entities</p>
                <p>Entities with total assets exceeding $5,000,000 not formed for the purpose of investing, or entities in which all equity owners are accredited investors. This includes certain trusts, corporations, partnerships, and family offices.</p>
              </div>
            </div>
            <p className="text-[10px] text-cosmic-white/40 mt-4">
              For a complete definition, see SEC Rule 501 of Regulation D at{" "}
              <a href="https://www.ecfr.gov/current/title-17/chapter-II/part-230/subject-group-ECFR6e651a4c86c0174/section-230.501" target="_blank" rel="noopener noreferrer" className="text-nebula-400 hover:underline">
                17 CFR 230.501
              </a>
            </p>
          </div>

          {/* SEC Form D Reference - Issue #5 */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-nebula-400" />
              <div className="flex-1">
                <p className="text-xs text-cosmic-white/70">
                  <strong className="text-cosmic-white">SEC Filings:</strong> Verify our Form D filing on the SEC EDGAR database.
                </p>
              </div>
              <a
                href="https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&type=D&dateb=&owner=include&count=40"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-nebula-400 hover:text-nebula-300"
              >
                SEC EDGAR <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* LOGIN FORM */}
          <div className="glass-card p-8">
            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-cosmic-gold/20 flex items-center justify-center">
                <Lock className="w-7 h-7 text-cosmic-gold" />
              </div>
              <h1 className="font-heading text-xl tracking-wider mb-1">
                Existing Investor Login
              </h1>
              <p className="text-cosmic-white/50 text-xs">
                For verified accredited investors with existing accounts
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="Enter your password"
                />
              </div>

              {/* Required Acknowledgment - Issue #4 */}
              <div className="bg-white/5 rounded-xl p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acknowledged}
                    onChange={(e) => setAcknowledged(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-cosmic-gold focus:ring-cosmic-gold/50"
                  />
                  <span className="text-xs text-cosmic-white/70 leading-relaxed">
                    I acknowledge that I have read and understood the securities disclosure above. I confirm that I am an accredited investor as defined by SEC Rule 501 and that I am accessing this portal for my own investment evaluation purposes.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !acknowledged}
                className="w-full py-3 px-6 rounded-xl font-heading tracking-wider text-sm bg-gradient-to-r from-cosmic-gold to-yellow-500 text-space-black hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Access Investor Portal"}
              </button>

              {/* Demo Credentials */}
              <div className="border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={loadDemoCredentials}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cosmic-gold/10 border border-cosmic-gold/30 text-cosmic-gold text-sm font-heading tracking-wider hover:bg-cosmic-gold/20 transition-colors"
                >
                  <Zap className="w-4 h-4" />
                  Load Demo Investor
                </button>
                <p className="text-center text-xs text-cosmic-white/30 mt-2">
                  Click to auto-fill demo credentials
                </p>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10 text-center space-y-3">
              <Link
                href="/investor/signup"
                className="flex items-center justify-center gap-2 text-sm text-cosmic-gold hover:text-yellow-400 transition-colors"
              >
                <FileText className="w-4 h-4" />
                Request Investor Access
              </Link>
              <p className="text-[10px] text-cosmic-white/40">
                New investors must complete verification before accessing materials
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-cosmic-white/40">
              Questions? Contact Investor Relations at{" "}
              <a href="mailto:investors@spaceburial.com" className="text-nebula-400 hover:underline">
                investors@spaceburial.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
