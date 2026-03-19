"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  FileEdit,
  BarChart3,
  Settings,
  Save,
  Eye,
  TrendingUp,
  Package,
  FileText,
  Image,
  MessageSquare,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Overview", icon: BarChart3 },
  { href: "/admin/dashboard/users", label: "Users", icon: Users },
  { href: "/admin/dashboard/cms", label: "CMS", icon: FileEdit, active: true },
  { href: "/admin/dashboard/analytics", label: "Analytics", icon: TrendingUp },
  { href: "/admin/dashboard/settings", label: "Settings", icon: Settings },
];

const contentSections = [
  { id: "packages", label: "Packages", icon: Package, count: 2 },
  { id: "pages", label: "Pages", icon: FileText, count: 6 },
  { id: "testimonials", label: "Testimonials", icon: MessageSquare, count: 3 },
  { id: "media", label: "Media", icon: Image, count: 24 },
];

export default function AdminCMS() {
  const [activeSection, setActiveSection] = useState("packages");
  const [saving, setSaving] = useState(false);

  // Mock package data for editing
  const [packages, setPackages] = useState([
    {
      id: "rocket",
      name: "Rocket Memorial",
      price: 3800,
      tagline: "A journey among the stars",
      description:
        "Send a symbolic portion of cremated remains aboard a real space launch. Your loved one becomes part of the cosmos on a suborbital or orbital mission.",
      features: [
        "Portion of ashes launched into space",
        "Personalized flight certificate",
        "Live launch viewing invitation",
        "Mission tracking & updates",
        "HD video of the launch",
      ],
    },
    {
      id: "immortal",
      name: "Immortal Memorial",
      price: 3800,
      tagline: "Forever among the stars",
      description:
        "A permanent celestial tribute. Remains are placed into a lasting orbit or deep space trajectory — an eternal memorial that circles the Earth or voyages beyond.",
      features: [
        "Permanent orbital or deep space placement",
        "Custom memorial capsule",
        "Digital memorial page",
        "Family ceremony coordination",
        "Lifetime mission tracking access",
      ],
    },
  ]);

  const handleSave = async () => {
    setSaving(true);
    // Mock save
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
  };

  const updatePackage = (id: string, field: string, value: string | number) => {
    setPackages((prev) =>
      prev.map((pkg) => (pkg.id === id ? { ...pkg, [field]: value } : pkg))
    );
  };

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stellar-400/20 flex items-center justify-center">
              <FileEdit className="w-5 h-5 text-stellar-400" />
            </div>
            <div>
              <p className="font-heading text-xs tracking-[0.3em] uppercase text-nebula-400 mb-1">
                Admin Portal
              </p>
              <h1 className="text-2xl font-heading font-bold tracking-wider">
                Content Management
              </h1>
            </div>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <button className="btn-secondary flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-heading tracking-wider whitespace-nowrap transition-colors ${
                item.active
                  ? "bg-nebula-500/20 text-nebula-400"
                  : "text-cosmic-white/50 hover:bg-white/5 hover:text-cosmic-white"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-4">
              <h3 className="font-heading text-xs tracking-wider text-cosmic-white/50 mb-4">
                Content Sections
              </h3>
              <div className="space-y-2">
                {contentSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? "bg-nebula-500/20 text-nebula-400"
                        : "text-cosmic-white/70 hover:bg-white/5"
                    }`}
                  >
                    <span className="flex items-center gap-2 text-sm">
                      <section.icon className="w-4 h-4" />
                      {section.label}
                    </span>
                    <span className="text-xs text-cosmic-white/30">
                      {section.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Editor */}
          <div className="lg:col-span-3">
            {activeSection === "packages" && (
              <div className="space-y-6">
                {packages.map((pkg, i) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-6"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <Package className="w-5 h-5 text-nebula-400" />
                      <h3 className="font-heading tracking-wider">
                        {pkg.name}
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                          Package Name
                        </label>
                        <input
                          type="text"
                          value={pkg.name}
                          onChange={(e) =>
                            updatePackage(pkg.id, "name", e.target.value)
                          }
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                          Price ($)
                        </label>
                        <input
                          type="number"
                          value={pkg.price}
                          onChange={(e) =>
                            updatePackage(
                              pkg.id,
                              "price",
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                        Tagline
                      </label>
                      <input
                        type="text"
                        value={pkg.tagline}
                        onChange={(e) =>
                          updatePackage(pkg.id, "tagline", e.target.value)
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                        Description
                      </label>
                      <textarea
                        value={pkg.description}
                        onChange={(e) =>
                          updatePackage(pkg.id, "description", e.target.value)
                        }
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500 resize-none"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeSection !== "packages" && (
              <div className="glass-card p-12 text-center">
                <FileEdit className="w-12 h-12 text-cosmic-white/20 mx-auto mb-4" />
                <h3 className="font-heading tracking-wider mb-2">
                  {contentSections.find((s) => s.id === activeSection)?.label}{" "}
                  Editor
                </h3>
                <p className="text-sm text-cosmic-white/50">
                  Content editor for this section coming soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
