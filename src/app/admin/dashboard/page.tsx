"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  FileEdit,
  BarChart3,
  Settings,
  Rocket,
  DollarSign,
  TrendingUp,
  UserCheck,
  Clock,
  Shield,
} from "lucide-react";

const stats = [
  { label: "Total Users", value: "1,247", icon: Users, change: "+12%" },
  { label: "Active Investors", value: "89", icon: UserCheck, change: "+5%" },
  { label: "Immortal Accounts", value: "1,158", icon: Rocket, change: "+18%" },
  { label: "Total Revenue", value: "$4.2M", icon: DollarSign, change: "+23%" },
  { label: "Pending Missions", value: "47", icon: Clock, change: "" },
  { label: "This Month", value: "$380K", icon: TrendingUp, change: "+8%" },
];

const navItems = [
  { href: "/admin/dashboard", label: "Overview", icon: BarChart3, active: true },
  { href: "/admin/dashboard/users", label: "Users", icon: Users },
  { href: "/admin/dashboard/investors", label: "Investors", icon: UserCheck },
  { href: "/admin/dashboard/cms", label: "CMS", icon: FileEdit },
  { href: "/admin/dashboard/analytics", label: "Analytics", icon: TrendingUp },
  { href: "/admin/dashboard/settings", label: "Settings", icon: Settings },
];

const recentActivity = [
  { action: "New investor signup", user: "Sarah Johnson", time: "5 min ago", type: "investor" },
  { action: "Package purchased", user: "Michael Chen", time: "23 min ago", type: "immortal" },
  { action: "NDA signed", user: "David Williams", time: "1 hour ago", type: "investor" },
  { action: "Memorial updated", user: "Jennifer Smith", time: "2 hours ago", type: "immortal" },
  { action: "Document uploaded", user: "Robert Brown", time: "3 hours ago", type: "investor" },
];

export default function AdminDashboard() {
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
                Dashboard
              </h1>
            </div>
          </div>
          <p className="text-cosmic-white/50 text-xs sm:text-sm mt-2 md:mt-0">
            Welcome back, Administrator
          </p>
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

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 mb-6 sm:mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-3 sm:p-5"
            >
              <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-nebula-400 mb-2 sm:mb-3" />
              <p className="font-heading text-base sm:text-xl tracking-wider">{stat.value}</p>
              <div className="flex items-center justify-between mt-1 gap-1">
                <p className="text-cosmic-white/40 text-[10px] sm:text-xs truncate">{stat.label}</p>
                {stat.change && (
                  <span className="text-green-400 text-[10px] sm:text-xs shrink-0">{stat.change}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-8">
          {/* Recent Activity */}
          <div className="glass-card p-4 sm:p-6">
            <h2 className="font-heading text-sm tracking-wider text-nebula-400 mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        activity.type === "investor"
                          ? "bg-cosmic-gold/20"
                          : "bg-nebula-500/20"
                      }`}
                    >
                      {activity.type === "investor" ? (
                        <UserCheck className="w-4 h-4 text-cosmic-gold" />
                      ) : (
                        <Rocket className="w-4 h-4 text-nebula-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-cosmic-white">
                        {activity.action}
                      </p>
                      <p className="text-xs text-cosmic-white/40">
                        {activity.user}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-cosmic-white/30">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-card p-4 sm:p-6">
            <h2 className="font-heading text-sm tracking-wider text-nebula-400 mb-4 sm:mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Link
                href="/admin/dashboard/users"
                className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
              >
                <Users className="w-6 h-6 text-nebula-400 mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-heading text-sm tracking-wider">
                  Manage Users
                </p>
                <p className="text-xs text-cosmic-white/40 mt-1">
                  View, edit, delete accounts
                </p>
              </Link>
              <Link
                href="/admin/dashboard/cms"
                className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
              >
                <FileEdit className="w-6 h-6 text-stellar-400 mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-heading text-sm tracking-wider">Edit Content</p>
                <p className="text-xs text-cosmic-white/40 mt-1">
                  Update pages, packages
                </p>
              </Link>
              <Link
                href="/admin/dashboard/analytics"
                className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
              >
                <BarChart3 className="w-6 h-6 text-cosmic-gold mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-heading text-sm tracking-wider">
                  View Analytics
                </p>
                <p className="text-xs text-cosmic-white/40 mt-1">
                  Reports & insights
                </p>
              </Link>
              <Link
                href="/admin/dashboard/settings"
                className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
              >
                <Settings className="w-6 h-6 text-cosmic-white/60 mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-heading text-sm tracking-wider">Settings</p>
                <p className="text-xs text-cosmic-white/40 mt-1">
                  System configuration
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
