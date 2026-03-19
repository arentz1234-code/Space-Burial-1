"use client";

import { useState, useEffect } from "react";
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
  Check,
  RotateCcw,
  Plus,
  Trash2,
} from "lucide-react";
import { useContent } from "@/components/providers/ContentProvider";

const navItems = [
  { href: "/admin/dashboard", label: "Overview", icon: BarChart3 },
  { href: "/admin/dashboard/users", label: "Users", icon: Users },
  { href: "/admin/dashboard/cms", label: "CMS", icon: FileEdit, active: true },
  { href: "/admin/dashboard/analytics", label: "Analytics", icon: TrendingUp },
  { href: "/admin/dashboard/settings", label: "Settings", icon: Settings },
];

const contentSections = [
  { id: "packages", label: "Packages", icon: Package },
  { id: "testimonials", label: "Testimonials", icon: MessageSquare },
  { id: "hero", label: "Hero Section", icon: FileText },
  { id: "contact", label: "Contact Info", icon: FileText },
];

export default function AdminCMS() {
  const { content, updatePackage, updateSiteContent, addTestimonial, deleteTestimonial, resetContent } = useContent();
  const [activeSection, setActiveSection] = useState("packages");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Local state for editing
  const [packages, setPackages] = useState(content.packages);
  const [testimonials, setTestimonials] = useState(content.testimonials);
  const [heroTitle, setHeroTitle] = useState(content.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(content.heroSubtitle);
  const [heroTagline, setHeroTagline] = useState(content.heroTagline);
  const [contactEmail, setContactEmail] = useState(content.contactEmail);
  const [contactPhone, setContactPhone] = useState(content.contactPhone);
  const [contactAddress, setContactAddress] = useState(content.contactAddress);

  // New testimonial form
  const [newTestimonial, setNewTestimonial] = useState({ quote: "", name: "", relation: "" });
  const [showAddTestimonial, setShowAddTestimonial] = useState(false);

  // Sync local state with content store
  useEffect(() => {
    setPackages(content.packages);
    setTestimonials(content.testimonials);
    setHeroTitle(content.heroTitle);
    setHeroSubtitle(content.heroSubtitle);
    setHeroTagline(content.heroTagline);
    setContactEmail(content.contactEmail);
    setContactPhone(content.contactPhone);
    setContactAddress(content.contactAddress);
  }, [content]);

  const handleSave = async () => {
    setSaving(true);

    // Save packages
    packages.forEach((pkg) => {
      updatePackage(pkg.id, pkg);
    });

    // Save other content
    updateSiteContent({
      testimonials,
      heroTitle,
      heroSubtitle,
      heroTagline,
      contactEmail,
      contactPhone,
      contactAddress,
    });

    // Simulate save delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all content to defaults? This cannot be undone.")) {
      resetContent();
    }
  };

  const updateLocalPackage = (id: string, field: string, value: string | number) => {
    setPackages((prev) =>
      prev.map((pkg) => (pkg.id === id ? { ...pkg, [field]: value } : pkg))
    );
  };

  const updatePackageFeature = (pkgId: string, featureIndex: number, value: string) => {
    setPackages((prev) =>
      prev.map((pkg) => {
        if (pkg.id === pkgId) {
          const newFeatures = [...pkg.features];
          newFeatures[featureIndex] = value;
          return { ...pkg, features: newFeatures };
        }
        return pkg;
      })
    );
  };

  const updateLocalTestimonial = (id: string, field: string, value: string) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const handleAddTestimonial = () => {
    if (newTestimonial.quote && newTestimonial.name) {
      addTestimonial(newTestimonial);
      setNewTestimonial({ quote: "", name: "", relation: "" });
      setShowAddTestimonial(false);
    }
  };

  const handleDeleteTestimonial = (id: string) => {
    if (confirm("Delete this testimonial?")) {
      deleteTestimonial(id);
    }
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
            <button
              onClick={handleReset}
              className="btn-secondary flex items-center gap-2 text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <Link href="/" target="_blank" className="btn-secondary flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview Site
            </Link>
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary flex items-center gap-2"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </>
              )}
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
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-xs text-cosmic-white/40 leading-relaxed">
                  Changes are saved to your browser. Click &quot;Save Changes&quot; to update the live site.
                </p>
              </div>
            </div>
          </div>

          {/* Content Editor */}
          <div className="lg:col-span-3">
            {/* Packages Editor */}
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
                      <h3 className="font-heading tracking-wider">{pkg.name}</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                          Package Name
                        </label>
                        <input
                          type="text"
                          value={pkg.name}
                          onChange={(e) => updateLocalPackage(pkg.id, "name", e.target.value)}
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
                          onChange={(e) => updateLocalPackage(pkg.id, "price", parseInt(e.target.value) || 0)}
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
                        onChange={(e) => updateLocalPackage(pkg.id, "tagline", e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                        Description
                      </label>
                      <textarea
                        value={pkg.description}
                        onChange={(e) => updateLocalPackage(pkg.id, "description", e.target.value)}
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                        Features
                      </label>
                      <div className="space-y-2">
                        {pkg.features.map((feature, fi) => (
                          <input
                            key={fi}
                            type="text"
                            value={feature}
                            onChange={(e) => updatePackageFeature(pkg.id, fi, e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Testimonials Editor */}
            {activeSection === "testimonials" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-heading tracking-wider">Testimonials</h3>
                  <button
                    onClick={() => setShowAddTestimonial(true)}
                    className="btn-primary flex items-center gap-2 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Testimonial
                  </button>
                </div>

                {showAddTestimonial && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="glass-card p-6"
                  >
                    <h4 className="font-heading text-sm tracking-wider mb-4">New Testimonial</h4>
                    <div className="space-y-4">
                      <textarea
                        placeholder="Quote..."
                        value={newTestimonial.quote}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, quote: e.target.value })}
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500 resize-none"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Name"
                          value={newTestimonial.name}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                        />
                        <input
                          type="text"
                          placeholder="Relation (e.g., Daughter)"
                          value={newTestimonial.relation}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, relation: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                        />
                      </div>
                      <div className="flex gap-3 justify-end">
                        <button onClick={() => setShowAddTestimonial(false)} className="btn-secondary">
                          Cancel
                        </button>
                        <button onClick={handleAddTestimonial} className="btn-primary">
                          Add
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {testimonials.map((testimonial, i) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <MessageSquare className="w-5 h-5 text-cosmic-gold" />
                      <button
                        onClick={() => handleDeleteTestimonial(testimonial.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-cosmic-white/50 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <textarea
                        value={testimonial.quote}
                        onChange={(e) => updateLocalTestimonial(testimonial.id, "quote", e.target.value)}
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500 resize-none"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                            Name
                          </label>
                          <input
                            type="text"
                            value={testimonial.name}
                            onChange={(e) => updateLocalTestimonial(testimonial.id, "name", e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                            Relation
                          </label>
                          <input
                            type="text"
                            value={testimonial.relation}
                            onChange={(e) => updateLocalTestimonial(testimonial.id, "relation", e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Hero Section Editor */}
            {activeSection === "hero" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-5 h-5 text-nebula-400" />
                  <h3 className="font-heading tracking-wider">Hero Section</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                      Tagline (small text above title)
                    </label>
                    <input
                      type="text"
                      value={heroTagline}
                      onChange={(e) => setHeroTagline(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                      Main Title
                    </label>
                    <input
                      type="text"
                      value={heroTitle}
                      onChange={(e) => setHeroTitle(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                      Subtitle / Description
                    </label>
                    <textarea
                      value={heroSubtitle}
                      onChange={(e) => setHeroSubtitle(e.target.value)}
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500 resize-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Contact Info Editor */}
            {activeSection === "contact" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-5 h-5 text-nebula-400" />
                  <h3 className="font-heading tracking-wider">Contact Information</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                      Address
                    </label>
                    <textarea
                      value={contactAddress}
                      onChange={(e) => setContactAddress(e.target.value)}
                      rows={2}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500 resize-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
