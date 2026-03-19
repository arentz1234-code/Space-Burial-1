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
  MessageSquare,
  Check,
  RotateCcw,
  Plus,
  Trash2,
  FolderOpen,
  ScrollText,
  Megaphone,
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
  { id: "documents", label: "Investor Documents", icon: FolderOpen },
  { id: "updates", label: "Company Updates", icon: Megaphone },
  { id: "nda", label: "NDA Agreement", icon: ScrollText },
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
  const [investorDocuments, setInvestorDocuments] = useState(content.investorDocuments || []);
  const [companyUpdates, setCompanyUpdates] = useState(content.companyUpdates || []);
  const [ndaText, setNdaText] = useState(content.ndaText || "");

  // New item forms
  const [newTestimonial, setNewTestimonial] = useState({ quote: "", name: "", relation: "" });
  const [showAddTestimonial, setShowAddTestimonial] = useState(false);
  const [newDocument, setNewDocument] = useState({ name: "", type: "PDF", date: "", size: "" });
  const [showAddDocument, setShowAddDocument] = useState(false);
  const [newUpdate, setNewUpdate] = useState({ title: "", body: "", date: "" });
  const [showAddUpdate, setShowAddUpdate] = useState(false);

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
    setInvestorDocuments(content.investorDocuments || []);
    setCompanyUpdates(content.companyUpdates || []);
    setNdaText(content.ndaText || "");
  }, [content]);

  const handleSave = async () => {
    setSaving(true);

    // Save packages
    packages.forEach((pkg) => {
      updatePackage(pkg.id, pkg);
    });

    // Save all content
    updateSiteContent({
      testimonials,
      heroTitle,
      heroSubtitle,
      heroTagline,
      contactEmail,
      contactPhone,
      contactAddress,
      investorDocuments,
      companyUpdates,
      ndaText,
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

  // Package helpers
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

  // Testimonial helpers
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

  // Document helpers
  const handleAddDocument = () => {
    if (newDocument.name && newDocument.type) {
      const doc = {
        id: `doc-${Date.now()}`,
        name: newDocument.name,
        type: newDocument.type,
        date: newDocument.date || new Date().toISOString().split("T")[0],
        size: newDocument.size || "1.0 MB",
      };
      setInvestorDocuments((prev) => [...prev, doc]);
      setNewDocument({ name: "", type: "PDF", date: "", size: "" });
      setShowAddDocument(false);
    }
  };

  const updateLocalDocument = (id: string, field: string, value: string) => {
    setInvestorDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    );
  };

  const handleDeleteDocument = (id: string) => {
    if (confirm("Delete this document?")) {
      setInvestorDocuments((prev) => prev.filter((d) => d.id !== id));
    }
  };

  // Company update helpers
  const handleAddUpdate = () => {
    if (newUpdate.title && newUpdate.body) {
      const update = {
        id: `update-${Date.now()}`,
        title: newUpdate.title,
        body: newUpdate.body,
        date: newUpdate.date || new Date().toISOString().split("T")[0],
      };
      setCompanyUpdates((prev) => [update, ...prev]);
      setNewUpdate({ title: "", body: "", date: "" });
      setShowAddUpdate(false);
    }
  };

  const updateLocalUpdate = (id: string, field: string, value: string) => {
    setCompanyUpdates((prev) =>
      prev.map((u) => (u.id === id ? { ...u, [field]: value } : u))
    );
  };

  const handleDeleteUpdate = (id: string) => {
    if (confirm("Delete this update?")) {
      setCompanyUpdates((prev) => prev.filter((u) => u.id !== id));
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

            {/* Documents Editor */}
            {activeSection === "documents" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-heading tracking-wider">Investor Documents</h3>
                    <p className="text-xs text-cosmic-white/50 mt-1">
                      Manage documents visible to investors in their dashboard
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddDocument(true)}
                    className="btn-primary flex items-center gap-2 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Document
                  </button>
                </div>

                {showAddDocument && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="glass-card p-6"
                  >
                    <h4 className="font-heading text-sm tracking-wider mb-4">New Document</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                          Document Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Q2 2026 Financial Report"
                          value={newDocument.name}
                          onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                            Type
                          </label>
                          <select
                            value={newDocument.type}
                            onChange={(e) => setNewDocument({ ...newDocument, type: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                          >
                            <option value="PDF">PDF</option>
                            <option value="XLSX">XLSX</option>
                            <option value="DOCX">DOCX</option>
                            <option value="PPT">PPT</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                            Date
                          </label>
                          <input
                            type="date"
                            value={newDocument.date}
                            onChange={(e) => setNewDocument({ ...newDocument, date: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                            File Size
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., 2.5 MB"
                            value={newDocument.size}
                            onChange={(e) => setNewDocument({ ...newDocument, size: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 justify-end">
                        <button onClick={() => setShowAddDocument(false)} className="btn-secondary">
                          Cancel
                        </button>
                        <button onClick={handleAddDocument} className="btn-primary">
                          Add Document
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {investorDocuments.map((doc, i) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass-card p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <FolderOpen className="w-5 h-5 text-cosmic-gold" />
                      <button
                        onClick={() => handleDeleteDocument(doc.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-cosmic-white/50 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                          Document Name
                        </label>
                        <input
                          type="text"
                          value={doc.name}
                          onChange={(e) => updateLocalDocument(doc.id, "name", e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                          Type
                        </label>
                        <select
                          value={doc.type}
                          onChange={(e) => updateLocalDocument(doc.id, "type", e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                        >
                          <option value="PDF">PDF</option>
                          <option value="XLSX">XLSX</option>
                          <option value="DOCX">DOCX</option>
                          <option value="PPT">PPT</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                          Size
                        </label>
                        <input
                          type="text"
                          value={doc.size}
                          onChange={(e) => updateLocalDocument(doc.id, "size", e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}

                {investorDocuments.length === 0 && (
                  <div className="glass-card p-12 text-center">
                    <FolderOpen className="w-12 h-12 text-cosmic-white/20 mx-auto mb-4" />
                    <p className="text-cosmic-white/50">No documents yet. Add your first document above.</p>
                  </div>
                )}
              </div>
            )}

            {/* Company Updates Editor */}
            {activeSection === "updates" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-heading tracking-wider">Company Updates</h3>
                    <p className="text-xs text-cosmic-white/50 mt-1">
                      News and updates visible to investors
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddUpdate(true)}
                    className="btn-primary flex items-center gap-2 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Update
                  </button>
                </div>

                {showAddUpdate && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="glass-card p-6"
                  >
                    <h4 className="font-heading text-sm tracking-wider mb-4">New Company Update</h4>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                            Title
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., Q2 Launch Partnership Announced"
                            value={newUpdate.title}
                            onChange={(e) => setNewUpdate({ ...newUpdate, title: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                            Date
                          </label>
                          <input
                            type="date"
                            value={newUpdate.date}
                            onChange={(e) => setNewUpdate({ ...newUpdate, date: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                          Content
                        </label>
                        <textarea
                          placeholder="Write your update here..."
                          value={newUpdate.body}
                          onChange={(e) => setNewUpdate({ ...newUpdate, body: e.target.value })}
                          rows={4}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500 resize-none"
                        />
                      </div>
                      <div className="flex gap-3 justify-end">
                        <button onClick={() => setShowAddUpdate(false)} className="btn-secondary">
                          Cancel
                        </button>
                        <button onClick={handleAddUpdate} className="btn-primary">
                          Add Update
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {companyUpdates.map((update, i) => (
                  <motion.div
                    key={update.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass-card p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <Megaphone className="w-5 h-5 text-stellar-400" />
                        <span className="text-xs text-cosmic-white/50">{update.date}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteUpdate(update.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-cosmic-white/50 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={update.title}
                          onChange={(e) => updateLocalUpdate(update.id, "title", e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                          Content
                        </label>
                        <textarea
                          value={update.body}
                          onChange={(e) => updateLocalUpdate(update.id, "body", e.target.value)}
                          rows={3}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500 resize-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}

                {companyUpdates.length === 0 && (
                  <div className="glass-card p-12 text-center">
                    <Megaphone className="w-12 h-12 text-cosmic-white/20 mx-auto mb-4" />
                    <p className="text-cosmic-white/50">No updates yet. Add your first company update above.</p>
                  </div>
                )}
              </div>
            )}

            {/* NDA Editor */}
            {activeSection === "nda" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <ScrollText className="w-5 h-5 text-nebula-400" />
                    <div>
                      <h3 className="font-heading tracking-wider">NDA Agreement</h3>
                      <p className="text-xs text-cosmic-white/50 mt-1">
                        This document is shown to investors during signup
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                        NDA Text
                      </label>
                      <textarea
                        value={ndaText}
                        onChange={(e) => setNdaText(e.target.value)}
                        rows={20}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500 resize-none font-mono leading-relaxed"
                        placeholder="Enter the NDA agreement text here..."
                      />
                    </div>

                    <div className="p-4 bg-stellar-400/10 rounded-xl border border-stellar-400/20">
                      <p className="text-xs text-stellar-400 leading-relaxed">
                        <strong>Note:</strong> The signature prompt &quot;By typing your full legal name below...&quot;
                        should be included at the end of the NDA text. Investors must scroll to the bottom and
                        type their full legal name to sign.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h4 className="font-heading text-sm tracking-wider mb-4">Preview</h4>
                  <div className="bg-white/5 rounded-xl p-6 max-h-64 overflow-y-auto">
                    <pre className="text-xs text-cosmic-white/70 whitespace-pre-wrap font-mono leading-relaxed">
                      {ndaText || "No NDA text entered yet."}
                    </pre>
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
