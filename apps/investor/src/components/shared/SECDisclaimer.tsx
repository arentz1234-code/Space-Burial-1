import { AlertTriangle } from "lucide-react";

interface SECDisclaimerProps {
  variant?: "inline" | "box" | "minimal";
}

export default function SECDisclaimer({ variant = "box" }: SECDisclaimerProps) {
  if (variant === "minimal") {
    return (
      <p className="text-xs text-cosmic-white/40 text-center">
        Securities offered pursuant to SEC Rule 506(c). Accredited investors only.
      </p>
    );
  }

  if (variant === "inline") {
    return (
      <div className="flex items-start gap-2 text-xs text-cosmic-white/50">
        <AlertTriangle className="w-4 h-4 text-cosmic-gold shrink-0 mt-0.5" />
        <p>
          This is not an offer to sell securities. Investment involves significant risk,
          including total loss of principal. Available to accredited investors only.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        <div className="space-y-2 text-xs text-cosmic-white/70">
          <p className="font-heading text-red-400 tracking-wider">
            IMPORTANT SECURITIES NOTICE
          </p>
          <p>
            This is not an offer to sell or the solicitation of an offer to buy securities.
            Such offer can only be made through the Private Placement Memorandum.
          </p>
          <p>
            Securities are not FDIC insured and involve significant risk, including the
            risk of total loss of investment. Available to accredited investors only.
          </p>
        </div>
      </div>
    </div>
  );
}
