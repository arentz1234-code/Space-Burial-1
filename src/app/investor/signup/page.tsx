"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import StarField from "@/components/shared/StarField";
import { FileText, AlertCircle, CheckCircle, Shield, CreditCard, ExternalLink, DollarSign, Upload, UserCheck, Building, FileCheck } from "lucide-react";
import { useContent } from "@/components/providers/ContentProvider";
import VerificationUpload from "@/components/investor/VerificationUpload";

type VerificationMethod = "document_upload" | "third_party" | "professional_letter";

export default function InvestorSignup() {
  const router = useRouter();
  const { content } = useContent();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get NDA text from content store
  const ndaText = content.ndaText || "";

  // Step 1: Personal info
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accredited: false,
  });

  // Step 2: Verification method (NEW)
  const [verificationMethod, setVerificationMethod] = useState<VerificationMethod | "">("");
  const [verificationDocuments, setVerificationDocuments] = useState<unknown[]>([]);
  const [thirdPartyConfirmed, setThirdPartyConfirmed] = useState(false);
  const [professionalName, setProfessionalName] = useState("");
  const [professionalFirm, setProfessionalFirm] = useState("");
  const [professionalConfirmed, setProfessionalConfirmed] = useState(false);

  // Step 3: NDA signature
  const [ndaScrolled, setNdaScrolled] = useState(false);
  const [signature, setSignature] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Step 4: Investment amount
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const investmentTiers = [
    { amount: 10000, label: "$10,000", shares: "1,000 shares" },
    { amount: 25000, label: "$25,000", shares: "2,500 shares" },
    { amount: 50000, label: "$50,000", shares: "5,000 shares" },
    { amount: 100000, label: "$100,000", shares: "10,000 shares" },
  ];

  // Stripe payment link - replace with your actual Stripe payment link
  const stripePaymentLink = "https://buy.stripe.com/test_yourlink";

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const scrolledToBottom =
      target.scrollHeight - target.scrollTop <= target.clientHeight + 50;
    if (scrolledToBottom) {
      setNdaScrolled(true);
    }
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.accredited) {
      setError("You must be an accredited investor to continue");
      return;
    }

    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!verificationMethod) {
      setError("Please select a verification method");
      return;
    }

    if (verificationMethod === "document_upload" && verificationDocuments.length === 0) {
      setError("Please upload at least one verification document");
      return;
    }

    if (verificationMethod === "third_party" && !thirdPartyConfirmed) {
      setError("Please confirm you will complete third-party verification");
      return;
    }

    if (verificationMethod === "professional_letter") {
      if (!professionalName.trim() || !professionalFirm.trim()) {
        setError("Please provide the professional's name and firm");
        return;
      }
      if (!professionalConfirmed) {
        setError("Please confirm the professional letter will be submitted");
        return;
      }
    }

    setStep(3);
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!ndaScrolled) {
      setError("Please read the entire NDA before signing");
      return;
    }

    if (signature.trim().toLowerCase() !== formData.name.trim().toLowerCase()) {
      setError("Signature must match your full legal name");
      return;
    }

    if (!agreedToTerms) {
      setError("You must agree to the terms to continue");
      return;
    }

    setStep(4);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!investmentAmount) {
      setError("Please select an investment amount");
      return;
    }

    if (!paymentConfirmed) {
      setError("Please confirm your payment method");
      return;
    }

    setLoading(true);

    // Mock signup - in production, call API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Redirect to success page
    router.push("/investor/signup/success");
  };

  const handleStripePayment = () => {
    // Open Stripe payment link in new tab
    // In production, you'd pass the selected amount as a parameter
    window.open(`${stripePaymentLink}?amount=${investmentAmount}`, "_blank");
    setPaymentConfirmed(true);
  };

  const openThirdPartyVerification = () => {
    window.open("https://verifyinvestor.com", "_blank");
    setThirdPartyConfirmed(true);
  };

  return (
    <>
      <StarField />
      <div className="relative z-10 min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Progress indicator - Now 4 steps */}
          <div className="flex items-center justify-center gap-3 mb-12">
            {[1, 2, 3, 4].map((num, i) => (
              <div key={num} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-heading ${
                    step >= num
                      ? "bg-cosmic-gold text-space-black"
                      : "bg-white/10 text-cosmic-white/50"
                  }`}
                >
                  {num}
                </div>
                {i < 3 && (
                  <div
                    className={`w-8 md:w-12 h-0.5 ${
                      step > num ? "bg-cosmic-gold" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {/* STEP 1: Personal Info & Accreditation Certification */}
            {step === 1 && (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-cosmic-gold/20 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-cosmic-gold" />
                  </div>
                  <h1 className="font-heading text-2xl tracking-wider mb-2">
                    Investor Application
                  </h1>
                  <p className="text-cosmic-white/50 text-sm">
                    Join Space Burial as an accredited investor
                  </p>
                </div>

                <form
                  onSubmit={handleStep1Submit}
                  className="glass-card p-8 space-y-6"
                >
                  {error && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-xl">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-cosmic-gold/50 transition-colors"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-cosmic-gold/50 transition-colors"
                      placeholder="investor@example.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-cosmic-gold/50 transition-colors"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-cosmic-gold/50 transition-colors"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.accredited}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            accredited: e.target.checked,
                          })
                        }
                        className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-cosmic-gold focus:ring-cosmic-gold"
                      />
                      <span className="text-sm text-cosmic-white/70">
                        I certify that I am an{" "}
                        <span className="text-cosmic-gold">
                          accredited investor
                        </span>{" "}
                        as defined by SEC Rule 501 of Regulation D (net worth
                        exceeding $1M or income exceeding $200K).
                      </span>
                    </label>
                  </div>

                  {/* SEC Compliance Disclosures */}
                  <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 space-y-4">
                    <h3 className="text-xs font-heading tracking-wider text-red-400 uppercase">
                      Important Investment Disclosures
                    </h3>

                    {/* Securities Exemption */}
                    <div className="text-xs text-cosmic-white/60 leading-relaxed">
                      <p className="font-semibold text-cosmic-white/80 mb-1">Securities Offering Notice</p>
                      <p>This offering is made in reliance on Rule 506(c) of Regulation D under the Securities Act of 1933. These securities have not been registered with the U.S. Securities and Exchange Commission (SEC) or any state securities regulatory authority. The Company will verify your accredited investor status before accepting your investment.</p>
                    </div>

                    {/* Risk Disclosures */}
                    <div className="text-xs text-cosmic-white/60 leading-relaxed">
                      <p className="font-semibold text-cosmic-white/80 mb-1">Risk Factors</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>This is a speculative investment with a high degree of risk</li>
                        <li>You may lose your entire investment</li>
                        <li>The Company has limited operating history</li>
                        <li>Space launch operations involve significant regulatory, technical, and operational risks</li>
                        <li>There is no public market for these securities and none is expected to develop</li>
                        <li>Your investment will be illiquid for an indefinite period</li>
                        <li>The Company may require additional capital and your ownership may be diluted</li>
                      </ul>
                    </div>

                    {/* Restricted Securities Legend */}
                    <div className="text-xs text-cosmic-white/60 leading-relaxed">
                      <p className="font-semibold text-cosmic-white/80 mb-1">Restricted Securities</p>
                      <p>The securities offered hereby are &quot;restricted securities&quot; under federal securities laws. They may not be resold without registration under the Securities Act or an applicable exemption. Investors should be prepared to hold these securities indefinitely. Transfer restrictions apply pursuant to Rule 144.</p>
                    </div>

                    {/* Bad Actor Disclosure */}
                    <div className="text-xs text-cosmic-white/60 leading-relaxed">
                      <p className="font-semibold text-cosmic-white/80 mb-1">Bad Actor Certification</p>
                      <p>The Company certifies that no &quot;bad actors&quot; as defined in Rule 506(d) of Regulation D are associated with this offering. No covered persons have been subject to disqualifying events including certain criminal convictions, court injunctions, or regulatory orders.</p>
                    </div>

                    {/* State Notice */}
                    <div className="text-xs text-cosmic-white/60 leading-relaxed">
                      <p className="font-semibold text-cosmic-white/80 mb-1">State Securities Law Notice</p>
                      <p>This offering is available only in states where the Company has filed required notices or where an exemption from state registration applies. Form D has been filed with the SEC. Residents of certain states may have additional rights under their state securities laws.</p>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    Continue to Verification
                  </button>
                </form>
              </>
            )}

            {/* STEP 2: Verification Method Selection (NEW) */}
            {step === 2 && (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-cosmic-gold/20 flex items-center justify-center">
                    <UserCheck className="w-8 h-8 text-cosmic-gold" />
                  </div>
                  <h1 className="font-heading text-2xl tracking-wider mb-2">
                    Verify Accredited Status
                  </h1>
                  <p className="text-cosmic-white/50 text-sm">
                    SEC Rule 506(c) requires verification of accredited investor status
                  </p>
                </div>

                <form
                  onSubmit={handleStep2Submit}
                  className="glass-card p-8 space-y-6"
                >
                  {error && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-xl">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {error}
                    </div>
                  )}

                  {/* SEC Compliance Notice */}
                  <div className="bg-cosmic-gold/10 border border-cosmic-gold/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-cosmic-gold shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-heading tracking-wider text-cosmic-gold mb-1">
                          SEC Regulation D Compliance
                        </p>
                        <p className="text-xs text-cosmic-white/60 leading-relaxed">
                          Under Rule 506(c), self-certification alone is not sufficient.
                          We must take reasonable steps to verify your accredited investor status.
                          Choose one of the verification methods below.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Verification Method Selection */}
                  <div className="space-y-4">
                    <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                      Select Verification Method
                    </label>

                    {/* Option A: Document Upload */}
                    <button
                      type="button"
                      onClick={() => setVerificationMethod("document_upload")}
                      className={`w-full p-5 rounded-xl border transition-all text-left ${
                        verificationMethod === "document_upload"
                          ? "border-cosmic-gold bg-cosmic-gold/10"
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          verificationMethod === "document_upload"
                            ? "bg-cosmic-gold/20"
                            : "bg-white/10"
                        }`}>
                          <Upload className={`w-5 h-5 ${
                            verificationMethod === "document_upload"
                              ? "text-cosmic-gold"
                              : "text-cosmic-white/50"
                          }`} />
                        </div>
                        <div className="flex-1">
                          <p className="font-heading text-sm tracking-wider text-cosmic-white">
                            Document Upload
                          </p>
                          <p className="text-xs text-cosmic-white/50 mt-1">
                            Upload tax returns, W-2s, or bank statements showing you meet income or net worth requirements
                          </p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          verificationMethod === "document_upload"
                            ? "border-cosmic-gold"
                            : "border-white/30"
                        }`}>
                          {verificationMethod === "document_upload" && (
                            <div className="w-2.5 h-2.5 rounded-full bg-cosmic-gold" />
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Option B: Third-Party Service */}
                    <button
                      type="button"
                      onClick={() => setVerificationMethod("third_party")}
                      className={`w-full p-5 rounded-xl border transition-all text-left ${
                        verificationMethod === "third_party"
                          ? "border-cosmic-gold bg-cosmic-gold/10"
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          verificationMethod === "third_party"
                            ? "bg-cosmic-gold/20"
                            : "bg-white/10"
                        }`}>
                          <Building className={`w-5 h-5 ${
                            verificationMethod === "third_party"
                              ? "text-cosmic-gold"
                              : "text-cosmic-white/50"
                          }`} />
                        </div>
                        <div className="flex-1">
                          <p className="font-heading text-sm tracking-wider text-cosmic-white">
                            Third-Party Verification Service
                          </p>
                          <p className="text-xs text-cosmic-white/50 mt-1">
                            Use VerifyInvestor.com or similar SEC-compliant verification service (Recommended)
                          </p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          verificationMethod === "third_party"
                            ? "border-cosmic-gold"
                            : "border-white/30"
                        }`}>
                          {verificationMethod === "third_party" && (
                            <div className="w-2.5 h-2.5 rounded-full bg-cosmic-gold" />
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Option C: Professional Letter */}
                    <button
                      type="button"
                      onClick={() => setVerificationMethod("professional_letter")}
                      className={`w-full p-5 rounded-xl border transition-all text-left ${
                        verificationMethod === "professional_letter"
                          ? "border-cosmic-gold bg-cosmic-gold/10"
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          verificationMethod === "professional_letter"
                            ? "bg-cosmic-gold/20"
                            : "bg-white/10"
                        }`}>
                          <FileCheck className={`w-5 h-5 ${
                            verificationMethod === "professional_letter"
                              ? "text-cosmic-gold"
                              : "text-cosmic-white/50"
                          }`} />
                        </div>
                        <div className="flex-1">
                          <p className="font-heading text-sm tracking-wider text-cosmic-white">
                            Professional Letter
                          </p>
                          <p className="text-xs text-cosmic-white/50 mt-1">
                            Verification letter from your CPA, attorney, or registered broker-dealer
                          </p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          verificationMethod === "professional_letter"
                            ? "border-cosmic-gold"
                            : "border-white/30"
                        }`}>
                          {verificationMethod === "professional_letter" && (
                            <div className="w-2.5 h-2.5 rounded-full bg-cosmic-gold" />
                          )}
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Conditional content based on selection */}
                  {verificationMethod === "document_upload" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="border-t border-white/10 pt-6"
                    >
                      <VerificationUpload
                        onDocumentsChange={(docs) => setVerificationDocuments(docs)}
                        maxFiles={5}
                      />
                    </motion.div>
                  )}

                  {verificationMethod === "third_party" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="border-t border-white/10 pt-6 space-y-4"
                    >
                      <p className="text-sm text-cosmic-white/60">
                        Click below to open VerifyInvestor.com in a new window. Complete their verification process
                        and they will send us confirmation of your accredited status.
                      </p>

                      <button
                        type="button"
                        onClick={openThirdPartyVerification}
                        className={`w-full py-4 px-6 rounded-xl font-heading tracking-wider text-sm flex items-center justify-center gap-3 transition-all ${
                          thirdPartyConfirmed
                            ? "bg-green-500/20 border border-green-500/30 text-green-400"
                            : "bg-nebula-500 hover:bg-nebula-600 text-white"
                        }`}
                      >
                        {thirdPartyConfirmed ? (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            Verification Started
                          </>
                        ) : (
                          <>
                            <ExternalLink className="w-5 h-5" />
                            Open VerifyInvestor.com
                          </>
                        )}
                      </button>

                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={thirdPartyConfirmed}
                          onChange={(e) => setThirdPartyConfirmed(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-cosmic-gold focus:ring-cosmic-gold"
                        />
                        <span className="text-sm text-cosmic-white/70">
                          I will complete verification through VerifyInvestor.com within 5 business days
                        </span>
                      </label>
                    </motion.div>
                  )}

                  {verificationMethod === "professional_letter" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="border-t border-white/10 pt-6 space-y-4"
                    >
                      <p className="text-sm text-cosmic-white/60">
                        Provide the contact information for your CPA, attorney, or broker-dealer
                        who will submit a verification letter on your behalf.
                      </p>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                            Professional&apos;s Name
                          </label>
                          <input
                            type="text"
                            value={professionalName}
                            onChange={(e) => setProfessionalName(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-cosmic-gold/50 transition-colors"
                            placeholder="Jane Doe, CPA"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                            Firm Name
                          </label>
                          <input
                            type="text"
                            value={professionalFirm}
                            onChange={(e) => setProfessionalFirm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-cosmic-gold/50 transition-colors"
                            placeholder="Smith & Associates"
                          />
                        </div>
                      </div>

                      <div className="p-4 bg-white/5 rounded-xl">
                        <p className="text-xs text-cosmic-white/50">
                          <span className="text-cosmic-white/70 font-medium">Letter Requirements:</span> The verification
                          letter must be dated within 90 days, on firm letterhead, and state that the professional has
                          reviewed your financial situation and determined you meet the accredited investor requirements
                          under SEC Rule 501.
                        </p>
                      </div>

                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={professionalConfirmed}
                          onChange={(e) => setProfessionalConfirmed(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-cosmic-gold focus:ring-cosmic-gold"
                        />
                        <span className="text-sm text-cosmic-white/70">
                          I confirm that the above professional will submit a verification letter within 10 business days
                        </span>
                      </label>
                    </motion.div>
                  )}

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn-secondary flex-1"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-full flex-1 py-3 px-6 rounded-xl font-heading tracking-wider text-sm bg-gradient-to-r from-cosmic-gold to-yellow-500 text-space-black hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      Continue to NDA
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* STEP 3: NDA (was Step 2) */}
            {step === 3 && (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-cosmic-gold/20 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-cosmic-gold" />
                  </div>
                  <h1 className="font-heading text-2xl tracking-wider mb-2">
                    Non-Disclosure Agreement
                  </h1>
                  <p className="text-cosmic-white/50 text-sm">
                    Please read and sign the NDA to continue
                  </p>
                </div>

                <form
                  onSubmit={handleStep3Submit}
                  className="glass-card p-8 space-y-6"
                >
                  {error && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-xl">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {error}
                    </div>
                  )}

                  {/* NDA Text */}
                  <div
                    onScroll={handleScroll}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 h-64 overflow-y-auto text-sm text-cosmic-white/70 leading-relaxed whitespace-pre-wrap"
                  >
                    {ndaText}
                  </div>

                  {ndaScrolled && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-green-400 text-sm"
                    >
                      <CheckCircle className="w-4 h-4" />
                      NDA read - you may now sign below
                    </motion.div>
                  )}

                  {/* Signature field */}
                  <div>
                    <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                      Type Your Full Legal Name to Sign
                    </label>
                    <input
                      type="text"
                      required
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      disabled={!ndaScrolled}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-cosmic-gold/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-serif italic"
                      placeholder={
                        ndaScrolled
                          ? formData.name
                          : "Scroll to read entire NDA first"
                      }
                    />
                    <p className="text-xs text-cosmic-white/30 mt-2">
                      Must match: {formData.name}
                    </p>
                  </div>

                  {/* Terms checkbox */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      disabled={!ndaScrolled}
                      className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-cosmic-gold focus:ring-cosmic-gold disabled:opacity-50"
                    />
                    <span className="text-sm text-cosmic-white/70">
                      I acknowledge that by typing my name above, I am providing
                      my electronic signature, which is legally binding and
                      equivalent to a handwritten signature.
                    </span>
                  </label>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="btn-secondary flex-1"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!ndaScrolled || !agreedToTerms}
                      className="w-full flex-1 py-3 px-6 rounded-xl font-heading tracking-wider text-sm bg-gradient-to-r from-cosmic-gold to-yellow-500 text-space-black hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      Continue to Investment
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* STEP 4: Investment Amount (was Step 3) */}
            {step === 4 && (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-cosmic-gold/20 flex items-center justify-center">
                    <DollarSign className="w-8 h-8 text-cosmic-gold" />
                  </div>
                  <h1 className="font-heading text-2xl tracking-wider mb-2">
                    Investment Amount
                  </h1>
                  <p className="text-cosmic-white/50 text-sm">
                    Select your investment tier and complete payment
                  </p>
                </div>

                <form
                  onSubmit={handleFinalSubmit}
                  className="glass-card p-8 space-y-6"
                >
                  {error && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-xl">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {error}
                    </div>
                  )}

                  {/* Investment Tiers */}
                  <div className="space-y-3">
                    <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-3">
                      Select Investment Amount
                    </label>
                    {investmentTiers.map((tier) => (
                      <button
                        key={tier.amount}
                        type="button"
                        onClick={() => {
                          setInvestmentAmount(tier.amount.toString());
                          setPaymentConfirmed(false);
                        }}
                        className={`w-full p-4 rounded-xl border transition-all text-left ${
                          investmentAmount === tier.amount.toString()
                            ? "border-cosmic-gold bg-cosmic-gold/10"
                            : "border-white/10 bg-white/5 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-heading text-xl text-cosmic-white">
                              {tier.label}
                            </span>
                            <p className="text-sm text-cosmic-white/50 mt-1">
                              {tier.shares}
                            </p>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              investmentAmount === tier.amount.toString()
                                ? "border-cosmic-gold"
                                : "border-white/30"
                            }`}
                          >
                            {investmentAmount === tier.amount.toString() && (
                              <div className="w-2.5 h-2.5 rounded-full bg-cosmic-gold" />
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div>
                    <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                      Or Enter Custom Amount (Min. $10,000)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cosmic-white/50">
                        $
                      </span>
                      <input
                        type="number"
                        min="10000"
                        step="1000"
                        value={investmentAmount}
                        onChange={(e) => {
                          setInvestmentAmount(e.target.value);
                          setPaymentConfirmed(false);
                        }}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-cosmic-gold/50 transition-colors"
                        placeholder="10000"
                      />
                    </div>
                  </div>

                  {/* Stripe Payment Button */}
                  {investmentAmount && parseInt(investmentAmount) >= 10000 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="border-t border-white/10 pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-cosmic-white/70">Investment Amount:</span>
                          <span className="font-heading text-2xl text-cosmic-gold">
                            ${parseInt(investmentAmount).toLocaleString()}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={handleStripePayment}
                          className={`w-full py-4 px-6 rounded-xl font-heading tracking-wider text-sm flex items-center justify-center gap-3 transition-all ${
                            paymentConfirmed
                              ? "bg-green-500/20 border border-green-500/30 text-green-400"
                              : "bg-[#635BFF] hover:bg-[#5851ea] text-white"
                          }`}
                        >
                          {paymentConfirmed ? (
                            <>
                              <CheckCircle className="w-5 h-5" />
                              Payment Link Opened
                            </>
                          ) : (
                            <>
                              <CreditCard className="w-5 h-5" />
                              Pay with Stripe
                              <ExternalLink className="w-4 h-4" />
                            </>
                          )}
                        </button>

                        {paymentConfirmed && (
                          <p className="text-xs text-cosmic-white/50 mt-3 text-center">
                            Complete your payment in the Stripe window, then click Submit below
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Payment confirmation checkbox */}
                  {investmentAmount && parseInt(investmentAmount) >= 10000 && (
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={paymentConfirmed}
                        onChange={(e) => setPaymentConfirmed(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-cosmic-gold focus:ring-cosmic-gold"
                      />
                      <span className="text-sm text-cosmic-white/70">
                        I have completed my payment through Stripe or will complete wire transfer
                        within 5 business days.
                      </span>
                    </label>
                  )}

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="btn-secondary flex-1"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !investmentAmount || parseInt(investmentAmount) < 10000 || !paymentConfirmed}
                      className="w-full flex-1 py-3 px-6 rounded-xl font-heading tracking-wider text-sm bg-gradient-to-r from-cosmic-gold to-yellow-500 text-space-black hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {loading ? "Submitting..." : "Complete Application"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
