"use client";

import { useState } from "react";
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
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Overview", icon: BarChart3 },
  { href: "/admin/dashboard/users", label: "Users", icon: Users, active: true },
  { href: "/admin/dashboard/cms", label: "CMS", icon: FileEdit },
  { href: "/admin/dashboard/analytics", label: "Analytics", icon: TrendingUp },
  { href: "/admin/dashboard/settings", label: "Settings", icon: Settings },
];

// Mock users data
const mockUsers = [
  {
    id: "admin-001",
    name: "System Administrator",
    email: "admin@spaceburial.com",
    role: "admin",
    status: "active",
    joinDate: "2025-01-01",
  },
  {
    id: "inv-001",
    name: "Alexandra Chen",
    email: "investor@example.com",
    role: "investor",
    status: "active",
    joinDate: "2025-06-15",
    shares: 50000,
    investment: "$250,000",
  },
  {
    id: "inv-002",
    name: "Marcus Webb",
    email: "demo@spaceburial.com",
    role: "investor",
    status: "active",
    joinDate: "2025-09-01",
    shares: 20000,
    investment: "$100,000",
  },
  {
    id: "imm-001",
    name: "Robert Starfield",
    email: "eternal@example.com",
    role: "immortal",
    status: "active",
    joinDate: "2025-11-01",
    package: "Immortal Memorial",
    launchDate: "2026-09-15",
  },
  {
    id: "imm-002",
    name: "Jennifer Martinez",
    email: "memorial@example.com",
    role: "immortal",
    status: "active",
    joinDate: "2026-01-10",
    package: "Rocket Memorial",
    launchDate: "2026-06-21",
  },
];

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

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
                <option value="all">All Roles</option>
                <option value="admin">Admins</option>
                <option value="investor">Investors</option>
                <option value="immortal">Immortals</option>
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
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-heading tracking-wider text-cosmic-white/50">
                    Joined
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-heading tracking-wider text-cosmic-white/50">
                    Details
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-heading tracking-wider text-cosmic-white/50">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, i) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
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
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400" />
                        <span className="text-sm text-cosmic-white/70 capitalize">
                          {user.status}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-cosmic-white/50">
                      {user.joinDate}
                    </td>
                    <td className="px-6 py-4 text-sm text-cosmic-white/50">
                      {user.role === "investor" && (
                        <span>{user.investment}</span>
                      )}
                      {user.role === "immortal" && (
                        <span>{user.package}</span>
                      )}
                      {user.role === "admin" && <span>Full Access</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedUser(user.id)}
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-cosmic-white/50 hover:text-cosmic-white"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-cosmic-white/50 hover:text-nebula-400">
                          <Edit className="w-4 h-4" />
                        </button>
                        {user.role !== "admin" && (
                          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-cosmic-white/50 hover:text-red-400">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User count */}
        <p className="text-sm text-cosmic-white/40 mt-4">
          Showing {filteredUsers.length} of {mockUsers.length} users
        </p>
      </div>
    </div>
  );
}
