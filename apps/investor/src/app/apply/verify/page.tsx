"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import StarField from "@/components/shared/StarField";
import { FileText, Users, Briefcase, Upload, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

type VerificationMethod = "document_upload" | "third_party" | "professional_letter";

export default function VerifyPage() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<VerificationMethod | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if we have the previous step data
    const stored = sessionStorage.getItem("investorApplication");
    if (!stored) {
      router.push("/apply");
    }
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = () => {
    if (!selectedMethod) return;

    setLoading(true);

    // Store verification method in session storage
    const stored = sessionStorage.getItem("investorApplication");
    if (stored) {
      const data = JSON.parse(stored);
      data.verificationMethod = selectedMethod;
      data.files = files.map((f) => f.name);
      sessionStorage.setItem("investorApplication", JSON.stringify(data));
    }

    // Navigate to NDA step
    router.push("/apply/nda");
  };

  const methods = [
    {
      id: "document_upload" as VerificationMethod,
      title: "Document Upload",
      description: "Upload tax returns, W-2s, or bank statements",
      details: [
        "Most recent 2 years of tax returns",
        "W-2 forms showing income > $200K ($300K joint)",
        "Bank/brokerage statements showing > $1M net worth",
      ],
      icon: Upload,
    },
    {
      id: "third_party" as VerificationMethod,
      title: "Third-Party Verification",
      description: "Use VerifyInvestor.com or similar service",
      details: [
        "Instant verification through trusted providers",
        "Direct integration with financial institutions",
        "Secure and compliant verification process",
      ],
      icon: Users,
    },
    {
      id: "professional_letter" as VerificationMethod,
      title: "Professional Letter",
      description: "Letter from CPA, attorney, or broker-dealer",
      details: [
        "Written within the last 90 days",
        "On professional letterhead",
        "Confirms accredited investor status",
      ],
      icon: Briefcase,
    },
  ];

  return (
    <>
      <StarField />
      <div className="relative z-10 min-h-screen px-6 pt-32 pb-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-12">
              {["Interest", "Verification", "NDA", "Investment"].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-heading ${
                      i <= 1
                        ? "bg-cosmic-gold text-space-900"
                        : "bg-white/10 text-cosmic-white/50"
                    }`}
                  >
                    {i < 1 ? <CheckCircle className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-xs hidden sm:block ${i === 1 ? "text-cosmic-gold" : "text-cosmic-white/50"}`}>
                    {step}
                  </span>
                  {i < 3 && <div className="w-8 h-px bg-white/20" />}
                </div>
              ))}
            </div>

            <div className="text-center mb-8">
              <h1 className="font-heading text-3xl tracking-wider mb-4">
                ACCREDITATION VERIFICATION
              </h1>
              <p className="text-cosmic-white/60">
                Step 2: Select your verification method
              </p>
            </div>

            <div className="bg-stellar-500/10 border border-stellar-500/30 rounded-xl p-4 mb-8">
              <p className="text-sm text-cosmic-white/70 text-center">
                SEC Rule 506(c) requires verification of accredited investor status.
                Please select one of the following verification methods.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {methods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full text-left glass-card p-6 transition-colors ${
                    selectedMethod === method.id
                      ? "border-cosmic-gold bg-cosmic-gold/10"
                      : "hover:border-white/30"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        selectedMethod === method.id
                          ? "bg-cosmic-gold/20 text-cosmic-gold"
                          : "bg-white/10 text-cosmic-white/50"
                      }`}
                    >
                      <method.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-lg tracking-wider mb-1">
                        {method.title}
                      </h3>
                      <p className="text-sm text-cosmic-white/60 mb-3">
                        {method.description}
                      </p>
                      <ul className="space-y-1">
                        {method.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-cosmic-white/50">
                            <FileText className="w-3 h-3" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedMethod === method.id
                          ? "border-cosmic-gold bg-cosmic-gold"
                          : "border-white/30"
                      }`}
                    >
                      {selectedMethod === method.id && (
                        <CheckCircle className="w-4 h-4 text-space-900" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* File Upload for document method */}
            {selectedMethod === "document_upload" && (
              <div className="glass-card p-6 mb-8">
                <h3 className="font-heading text-sm tracking-wider mb-4">
                  UPLOAD DOCUMENTS
                </h3>
                <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-cosmic-white/30" />
                    <p className="text-sm text-cosmic-white/70 mb-2">
                      Drop files here or click to upload
                    </p>
                    <p className="text-xs text-cosmic-white/40">
                      PDF, JPG, or PNG up to 10MB each
                    </p>
                  </label>
                </div>
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((file, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm text-cosmic-white/70 bg-white/5 px-3 py-2 rounded-lg"
                      >
                        <FileText className="w-4 h-4" />
                        {file.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => router.push("/apply")}
                className="btn-secondary flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selectedMethod || loading}
                className="btn-gold flex-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? "Continuing..." : "Continue to NDA"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
