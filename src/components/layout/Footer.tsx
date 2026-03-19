import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-space-900 border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo.png"
                alt="Space Burial - Immortality Among the Stars"
                width={150}
                height={50}
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-cosmic-white/50 text-sm leading-relaxed max-w-sm">
              The ultimate tribute. Send your legacy to the stars — forever part of the universe.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xs tracking-widest uppercase text-cosmic-gold mb-4">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3">
              {["Services", "How It Works", "About", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                  className="text-sm text-cosmic-white/50 hover:text-cosmic-white transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-xs tracking-widest uppercase text-cosmic-gold mb-4">
              Contact
            </h4>
            <div className="flex flex-col gap-3 text-sm text-cosmic-white/50">
              <a href="mailto:info@spaceburial.com" className="hover:text-cosmic-white transition-colors">
                info@spaceburial.com
              </a>
              <a href="tel:+18005551234" className="hover:text-cosmic-white transition-colors">
                1-800-555-1234
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cosmic-white/30">
            &copy; {new Date().getFullYear()} Space Burial. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-cosmic-white/30 hover:text-cosmic-white/50">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-cosmic-white/30 hover:text-cosmic-white/50">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
