"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  FileEdit,
  BarChart3,
  Settings,
  Search,
  UserCheck,
  Rocket,
  Shield,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  ChevronDown,
  Star,
  Crown,
  X,
  ExternalLink,
} from "lucide-react";
import { getUsers, deleteUser, StoredUser } from "@/lib/user-store";
import { getTiers } from "@/lib/tiers";

const navItems = [
  { href: "/admin/dashboard", label: "Overview", icon: BarChart3 },
  { href: "/admin/dashboard/users", label: "Users", icon: Users, active: true },
  { href: "/admin/dashboard/investors", label: "Investors", icon: UserCheck },
  { href: "/admin/dashboard/cms", label: "CMS", icon: FileEdit },
  { href: "/admin/dashboard/analytics", label: "Analytics", icon: TrendingUp },
  { href: "/admin/dashboard/settings", label: "Settings", icon: Settings },
];

const tierNames: Record<string, string> = {
  stardust: "Stardust",
  voyager: "Voyager",
  eternal: "Eternal",
};

export default function AdminUsers() {
  const [users, setUsers] = useState<StoredUser[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    // Load users
    setUsers(getUsers());

    // Listen for user updates
    const handleUsersUpdated = () => {
      setUsers(getUsers());
    };
    window.addEventListener("users-updated", handleUsersUpdated);
    return () => window.removeEventListener("users-updated", handleUsersUpdated);
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleDeleteUser = (userId: string, userName: string) => {
    if (confirm(`Are you sure you want to delete ${userName}?`)) {
      deleteUser(userId);
      setSelectedUser(null);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="w-4 h-4 text-nebula-400" />;
      case "investor":
        return <UserCheck className="w-4 h-4 text-cosmic-gold" />;
      case "immortal":
        return <Rocket className="w-4 h-4 text-stellar-400" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  const getRoleBadge = (role: string) => {
    const styles = {
      admin: "bg-nebula-500/20 text-nebula-400",
      investor: "bg-cosmic-gold/20 text-cosmic-gold",
      immortal: "bg-stellar-400/20 text-stellar-400",
    };
    return styles[role as keyof typeof styles] || "bg-white/10 text-white";
  };

  const getTierBadge = (tier?: string) => {
    if (!tier) return null;
    const styles: Record<string, string> = {
      stardust: "bg-nebula-500/20 text-nebula-400",
      voyager: "bg-cosmic-gold/20 text-cosmic-gold",
      eternal: "bg-stellar-400/20 text-stellar-400",
    };
    return styles[tier] || "bg-white/10 text-white";
  };

  const getTierIcon = (tier?: string) => {
    switch (tier) {
      case "stardust":
        return <Star className="w-3 h-3" />;
      case "voyager":
        return <Rocket className="w-3 h-3" />;
      case "eternal":
        return <Crown className="w-3 h-3" />;
      default:
        return null;
    }
  };

  // Count by role
  const counts = {
    all: users.length,
    admin: users.filter(u => u.role === "admin").length,
    investor: users.filter(u => u.role === "investor").length,
    immortal: users.filter(u => u.role === "immortal").length,
  };

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-nebula-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-nebula-400" />
            </div>
            <div>
              <p className="font-heading text-xs tracking-[0.3em] uppercase text-nebula-400 mb-1">
                Admin Portal
              </p>
              <h1 className="text-2xl font-heading font-bold tracking-wider">
                User Management
              </h1>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 mt-4 md:mt-0">
            <div className="text-center">
              <p className="text-2xl font-heading text-cosmic-gold">{counts.immortal}</p>
              <p className="text-xs text-cosmic-white/50">Customers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-heading text-cosmic-gold">{counts.investor}</p>
              <p className="text-xs text-cosmic-white/50">Investors</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-heading text-cosmic-white">{counts.all}</p>
              <p className="text-xs text-cosmic-white/50">Total</p>
            </div>
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

        {/* Filters */}
        <div className="glass-card p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cosmic-white/30" />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
              />
            </div>
            <div className="relative">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-2 pr-10 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
              >
                <option value="all">All Roles ({counts.all})</option>
                <option value="admin">Admins ({counts.admin})</option>
                <option value="investor">Investors ({counts.investor})</option>
                <option value="immortal">Customers ({counts.immortal})</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cosmic-white/30 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-4 text-xs font-heading tracking-wider text-cosmic-white/50">
                    User
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-heading tracking-wider text-cosmic-white/50">
                    Role
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-heading tracking-wider text-cosmic-white/50">
                    Package
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-heading tracking-wider text-cosmic-white/50">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-heading tracking-wider text-cosmic-white/50">
                    Joined
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-heading tracking-wider text-cosmic-white/50">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-cosmic-white/50">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, i) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                            {getRoleIcon(user.role)}
                          </div>
                          <div>
                            <p className="text-sm text-cosmic-white">
                              {user.name}
                            </p>
                            <p className="text-xs text-cosmic-white/40">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-lg text-xs font-heading tracking-wider capitalize ${getRoleBadge(
                            user.role
                          )}`}
                        >
                          {user.role === "immortal" ? "Customer" : user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {user.tier ? (
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-heading tracking-wider ${getTierBadge(user.tier)}`}
                          >
                            {getTierIcon(user.tier)}
                            {tierNames[user.tier] || user.tier}
                          </span>
                        ) : user.role === "investor" ? (
                          <span className="text-sm text-cosmic-white/50">
                            {user.investment || "N/A"}
                          </span>
                        ) : (
                          <span className="text-sm text-cosmic-white/30">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${
                            user.status === "active" ? "bg-green-400" :
                            user.status === "pending" ? "bg-yellow-400" : "bg-red-400"
                          }`} />
                          <span className="text-sm text-cosmic-white/70 capitalize">
                            {user.status}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-cosmic-white/50">
                        {user.joinDate}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-cosmic-white/50 hover:text-cosmic-white"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {user.role !== "admin" && (
                            <button
                              onClick={() => handleDeleteUser(user.id, user.name)}
                              className="p-2 rounded-lg hover:bg-white/10 transition-colors text-cosmic-white/50 hover:text-red-400"
                              title="Delete user"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* User count */}
        <p className="text-sm text-cosmic-white/40 mt-4">
          Showing {filteredUsers.length} of {users.length} users
        </p>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-space-black/80 backdrop-blur-sm"
            onClick={() => setSelectedUser(null)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-lg glass-card p-6"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  selectedUser.role === "admin" ? "bg-nebula-500/20" :
                  selectedUser.role === "investor" ? "bg-cosmic-gold/20" : "bg-stellar-400/20"
                }`}>
                  {getRoleIcon(selectedUser.role)}
                </div>
                <div>
                  <h2 className="font-heading text-xl tracking-wider">{selectedUser.name}</h2>
                  <p className="text-sm text-cosmic-white/50">{selectedUser.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-cosmic-white/50" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="text-xs text-cosmic-white/50 mb-1">Role</p>
                  <p className={`font-heading tracking-wider capitalize ${
                    selectedUser.role === "admin" ? "text-nebula-400" :
                    selectedUser.role === "investor" ? "text-cosmic-gold" : "text-stellar-400"
                  }`}>
                    {selectedUser.role === "immortal" ? "Customer" : selectedUser.role}
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="text-xs text-cosmic-white/50 mb-1">Status</p>
                  <p className="text-cosmic-white capitalize">{selectedUser.status}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="text-xs text-cosmic-white/50 mb-1">Joined</p>
                  <p className="text-cosmic-white">{selectedUser.joinDate}</p>
                </div>
                {selectedUser.phone && (
                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-xs text-cosmic-white/50 mb-1">Phone</p>
                    <p className="text-cosmic-white">{selectedUser.phone}</p>
                  </div>
                )}
              </div>

              {selectedUser.role === "immortal" && (
                <>
                  {selectedUser.tier && (
                    <div className="bg-white/5 rounded-xl p-3">
                      <p className="text-xs text-cosmic-white/50 mb-1">Package Tier</p>
                      <span className={`inline-flex items-center gap-2 font-heading tracking-wider ${
                        selectedUser.tier === "stardust" ? "text-nebula-400" :
                        selectedUser.tier === "voyager" ? "text-cosmic-gold" : "text-stellar-400"
                      }`}>
                        {getTierIcon(selectedUser.tier)}
                        {tierNames[selectedUser.tier]}
                        <span className="text-cosmic-white/50 font-normal">
                          (${getTiers().find(t => t.id === selectedUser.tier)?.price.toLocaleString()})
                        </span>
                      </span>
                    </div>
                  )}
                  {selectedUser.honoreeName && (
                    <div className="bg-white/5 rounded-xl p-3">
                      <p className="text-xs text-cosmic-white/50 mb-1">Honoree Name</p>
                      <p className="text-cosmic-white">{selectedUser.honoreeName}</p>
                    </div>
                  )}
                </>
              )}

              {selectedUser.role === "investor" && (
                <>
                  {selectedUser.investment && (
                    <div className="bg-white/5 rounded-xl p-3">
                      <p className="text-xs text-cosmic-white/50 mb-1">Investment</p>
                      <p className="text-cosmic-gold font-heading text-lg">{selectedUser.investment}</p>
                    </div>
                  )}
                  {selectedUser.shares && (
                    <div className="bg-white/5 rounded-xl p-3">
                      <p className="text-xs text-cosmic-white/50 mb-1">Shares</p>
                      <p className="text-cosmic-white">{selectedUser.shares.toLocaleString()}</p>
                    </div>
                  )}
                </>
              )}
            </div>

            {selectedUser.role !== "admin" && (
              <div className="mt-6 pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  onClick={() => handleDeleteUser(selectedUser.id, selectedUser.name)}
                  className="btn-secondary text-red-400 border-red-400/30 hover:bg-red-400/10"
                >
                  Delete User
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
