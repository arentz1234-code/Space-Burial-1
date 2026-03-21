"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Users,
  FileEdit,
  BarChart3,
  Settings,
  TrendingUp,
  Shield,
  Megaphone,
  Plus,
  Trash2,
  Edit2,
  X,
  Send,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useContent } from "@/components/providers/ContentProvider";
import {
  addCompanyUpdate,
  updateCompanyUpdate,
  deleteCompanyUpdate,
  CompanyUpdate,
} from "@/lib/content-store";

const navItems = [
  { href: "/admin/dashboard", label: "Overview", icon: BarChart3 },
  { href: "/admin/dashboard/users", label: "Users", icon: Users },
  { href: "/admin/dashboard/investors", label: "Investors", icon: Megaphone, active: true },
  { href: "/admin/dashboard/cms", label: "CMS", icon: FileEdit },
  { href: "/admin/dashboard/analytics", label: "Analytics", icon: TrendingUp },
  { href: "/admin/dashboard/settings", label: "Settings", icon: Settings },
];

export default function AdminInvestorsPage() {
  const { content } = useContent();
  const [localUpdates, setLocalUpdates] = useState(0); // Force re-render
  const [showModal, setShowModal] = useState(false);
  const [editingUpdate, setEditingUpdate] = useState<CompanyUpdate | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Listen for content updates
  useEffect(() => {
    const handleContentUpdate = () => {
      setLocalUpdates((prev) => prev + 1);
    };
    window.addEventListener("content-updated", handleContentUpdate);
    return () => window.removeEventListener("content-updated", handleContentUpdate);
  }, []);

  const companyUpdates = content.companyUpdates || [];

  const resetForm = () => {
    setFormData({
      title: "",
      body: "",
      date: new Date().toISOString().split("T")[0],
    });
    setEditingUpdate(null);
  };

  const openNewUpdate = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditUpdate = (update: CompanyUpdate) => {
    setEditingUpdate(update);
    setFormData({
      title: update.title,
      body: update.body,
      date: update.date,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingUpdate) {
      updateCompanyUpdate(editingUpdate.id, formData);
      setSuccessMessage("Update saved successfully!");
    } else {
      addCompanyUpdate(formData);
      setSuccessMessage("Update sent to investors!");
    }

    // Content updates automatically via event listener
    setShowModal(false);
    resetForm();

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleDelete = (updateId: string) => {
    deleteCompanyUpdate(updateId);
    // Content updates automatically via event listener
    setDeleteConfirm(null);
    setSuccessMessage("Update deleted.");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="pt-20 sm:pt-24 pb-12 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-nebula-500/20 flex items-center justify-center">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-nebula-400" />
            </div>
            <div>
              <p className="font-heading text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-nebula-400 mb-0.5 sm:mb-1">
                Admin Portal
              </p>
              <h1 className="text-xl sm:text-2xl font-heading font-bold tracking-wider">
                Investor Updates
              </h1>
            </div>
          </div>
          <button
            onClick={openNewUpdate}
            className="btn-primary flex items-center gap-2 text-sm mt-4 md:mt-0"
          >
            <Plus className="w-4 h-4" />
            New Update
          </button>
        </div>

        {/* Navigation */}
        <div className="flex gap-1 sm:gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 -mx-2 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-heading tracking-wider whitespace-nowrap transition-colors ${
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

        {/* Success Message */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl"
            >
              <CheckCircle className="w-5 h-5" />
              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-4">
            <Megaphone className="w-5 h-5 text-cosmic-gold mb-2" />
            <p className="text-2xl font-heading">{companyUpdates.length}</p>
            <p className="text-xs text-cosmic-white/50">Total Updates</p>
          </div>
          <div className="glass-card p-4">
            <Users className="w-5 h-5 text-stellar-400 mb-2" />
            <p className="text-2xl font-heading">89</p>
            <p className="text-xs text-cosmic-white/50">Active Investors</p>
          </div>
          <div className="glass-card p-4">
            <Calendar className="w-5 h-5 text-nebula-400 mb-2" />
            <p className="text-2xl font-heading">
              {companyUpdates[0]?.date
                ? new Date(companyUpdates[0].date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                : "N/A"}
            </p>
            <p className="text-xs text-cosmic-white/50">Last Update</p>
          </div>
          <div className="glass-card p-4">
            <Send className="w-5 h-5 text-green-400 mb-2" />
            <p className="text-2xl font-heading">100%</p>
            <p className="text-xs text-cosmic-white/50">Delivery Rate</p>
          </div>
        </div>

        {/* Updates List */}
        <div className="glass-card p-6">
          <h2 className="font-heading text-sm tracking-wider text-nebula-400 mb-6">
            All Investor Updates
          </h2>

          {companyUpdates.length > 0 ? (
            <div className="space-y-4">
              {companyUpdates.map((update, i) => (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/5 rounded-xl p-5 relative group"
                >
                  {/* Delete confirmation overlay */}
                  <AnimatePresence>
                    {deleteConfirm === update.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-space-900/95 rounded-xl flex items-center justify-center z-10"
                      >
                        <div className="text-center">
                          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                          <p className="text-sm text-cosmic-white mb-4">Delete this update?</p>
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="px-4 py-2 text-xs bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleDelete(update.id)}
                              className="px-4 py-2 text-xs bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs text-cosmic-white/40">
                          {new Date(update.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <h3 className="font-heading text-base tracking-wider mb-2">{update.title}</h3>
                      <p className="text-sm text-cosmic-white/60 leading-relaxed line-clamp-2">
                        {update.body}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEditUpdate(update)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4 text-cosmic-white/70" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(update.id)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Megaphone className="w-12 h-12 text-cosmic-white/20 mx-auto mb-4" />
              <p className="text-cosmic-white/50 mb-4">No updates yet</p>
              <button
                onClick={openNewUpdate}
                className="text-cosmic-gold hover:text-yellow-400 text-sm transition-colors"
              >
                Create your first update →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-space-800 border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cosmic-gold/20 flex items-center justify-center">
                    <Megaphone className="w-5 h-5 text-cosmic-gold" />
                  </div>
                  <div>
                    <h2 className="font-heading text-lg tracking-wider">
                      {editingUpdate ? "Edit Update" : "New Investor Update"}
                    </h2>
                    <p className="text-xs text-cosmic-white/50">
                      {editingUpdate ? "Modify this update" : "Send an update to all investors"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-cosmic-gold/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Q1 2026 Progress Update"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-cosmic-gold/50 transition-colors placeholder:text-cosmic-white/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Write your update message here..."
                    value={formData.body}
                    onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cosmic-white focus:outline-none focus:border-cosmic-gold/50 transition-colors placeholder:text-cosmic-white/30 resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 px-4 rounded-xl border border-white/10 text-sm font-heading tracking-wider hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cosmic-gold to-yellow-500 text-space-black text-sm font-heading tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {editingUpdate ? "Save Changes" : "Send Update"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
