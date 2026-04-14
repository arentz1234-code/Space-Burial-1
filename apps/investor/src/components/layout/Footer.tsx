import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-space-800 border-t border-white/5">
      {/* SEC Disclaimers */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="glass-card p-6 mb-8">
          <h3 className="font-heading text-xs tracking-wider text-red-400 mb-4">
            IMPORTANT SECURITIES DISCLOSURES
          </h3>
          <div className="space-y-4 sec-disclaimer">
            <p>
              <strong>NOT AN OFFER TO SELL:</strong> This website and its contents do not constitute an offer to sell or the solicitation of an offer to buy any securities. Any such offer can only be made through the Private Placement Memorandum (PPM) and related offering documents.
            </p>
            <p>
              <strong>ACCREDITED INVESTORS ONLY:</strong> Securities offered through this portal are available only to accredited investors as defined under SEC Rule 501(a) of Regulation D. Prospective investors must verify their accredited investor status before accessing offering materials.
            </p>
            <p>
              <strong>RISK OF LOSS:</strong> Investment in private securities involves significant risk, including the possible loss of your entire investment. Past performance is not indicative of future results. Securities are illiquid and may not be easily sold or transferred.
            </p>
            <p>
              <strong>FORWARD-LOOKING STATEMENTS:</strong> This website may contain forward-looking statements about Space Burial, Inc. that involve risks and uncertainties. Actual results may differ materially from those projected.
            </p>
            <p>
              <strong>NO INVESTMENT ADVICE:</strong> Nothing on this website should be construed as investment, legal, or tax advice. Prospective investors should consult their own advisors before making investment decisions.
            </p>
          </div>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Company */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="Space Burial - Cape Canaveral"
                width={56}
                height={56}
                className="h-14 w-14"
              />
              <span className="text-xs text-cosmic-white/50 tracking-wider uppercase">Investor Portal</span>
            </div>
            <p className="text-xs text-cosmic-white/50">
              SEC Rule 506(c) Private Placement
            </p>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading text-xs tracking-wider mb-4">LEGAL</h4>
            <ul className="space-y-2 text-sm text-cosmic-white/50">
              <li><Link href="/privacy" className="hover:text-cosmic-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-cosmic-white">Terms of Use</Link></li>
              <li><a href="https://www.sec.gov/cgi-bin/browse-edgar" target="_blank" rel="noopener noreferrer" className="hover:text-cosmic-white">SEC EDGAR Filing</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-xs tracking-wider mb-4">CONTACT</h4>
            <ul className="space-y-2 text-sm text-cosmic-white/50">
              <li>investors@spaceburial.com</li>
              <li>1-800-SPACE-00</li>
            </ul>
          </div>

          {/* Main Site */}
          <div>
            <h4 className="font-heading text-xs tracking-wider mb-4">MAIN SITE</h4>
            <p className="text-sm text-cosmic-white/50 mb-2">
              Visit our customer site at:
            </p>
            <a
              href="https://spaceburial.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-nebula-400 hover:text-nebula-300 text-sm"
            >
              spaceburial.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cosmic-white/30">
            © {new Date().getFullYear()} Space Burial, Inc. All rights reserved.
          </p>
          <p className="text-xs text-cosmic-white/30 text-center">
            Securities offered pursuant to SEC Rule 506(c) of Regulation D
          </p>
        </div>
      </div>
    </footer>
  );
}
