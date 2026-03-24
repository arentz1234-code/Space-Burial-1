"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  FileEdit,
  BarChart3,
  Settings,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Rocket,
  Globe,
  Clock,
  UserCheck,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Overview", icon: BarChart3 },
  { href: "/admin/dashboard/users", label: "Users", icon: Users },
  { href: "/admin/dashboard/investors", label: "Investors", icon: UserCheck },
  { href: "/admin/dashboard/cms", label: "CMS", icon: FileEdit },
  { href: "/admin/dashboard/analytics", label: "Analytics", icon: TrendingUp, active: true },
  { href: "/admin/dashboard/settings", label: "Settings", icon: Settings },
];

const kpis = [
  {
    label: "Monthly Revenue",
    value: "$380,000",
    change: "+23%",
    trend: "up",
    icon: DollarSign,
  },
  {
    label: "New Customers",
    value: "127",
    change: "+18%",
    trend: "up",
    icon: Users,
  },
  {
    label: "Conversion Rate",
    value: "4.2%",
    change: "+0.8%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    label: "Avg. Order Value",
    value: "$3,650",
    change: "-2%",
    trend: "down",
    icon: Rocket,
  },
];

const monthlyData = [
  { month: "Jan", revenue: 280000, customers: 74 },
  { month: "Feb", revenue: 310000, customers: 82 },
  { month: "Mar", revenue: 290000, customers: 77 },
  { month: "Apr", revenue: 340000, customers: 90 },
  { month: "May", revenue: 360000, customers: 95 },
  { month: "Jun", revenue: 380000, customers: 127 },
];

const trafficSources = [
  { source: "Organic Search", percentage: 42, color: "bg-nebula-400" },
  { source: "Direct", percentage: 28, color: "bg-stellar-400" },
  { source: "Referral", percentage: 18, color: "bg-cosmic-gold" },
  { source: "Social", percentage: 12, color: "bg-green-400" },
];

const topPages = [
  { page: "/", views: 12450, bounce: "32%" },
  { page: "/services", views: 8320, bounce: "28%" },
  { page: "/how-it-works", views: 5210, bounce: "35%" },
  { page: "/checkout", views: 3180, bounce: "15%" },
  { page: "/about", views: 2890, bounce: "42%" },
];

export default function AdminAnalytics() {
  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cosmic-gold/20 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-cosmic-gold" />
            </div>
            <div>
              <p className="font-heading text-xs tracking-[0.3em] uppercase text-nebula-400 mb-1">
                Admin Portal
              </p>
              <h1 className="text-2xl font-heading font-bold tracking-wider">
                Analytics
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0 text-sm text-cosmic-white/50">
            <Clock className="w-4 h-4" />
            Last 30 days
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

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <kpi.icon className="w-5 h-5 text-cosmic-gold" />
                <span
                  className={`flex items-center gap-1 text-xs ${
                    kpi.trend === "up" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {kpi.trend === "up" ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {kpi.change}
                </span>
              </div>
              <p className="font-heading text-2xl tracking-wider mb-1">
                {kpi.value}
              </p>
              <p className="text-xs text-cosmic-white/40">{kpi.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 glass-card p-6">
            <h3 className="font-heading text-sm tracking-wider text-cosmic-gold mb-6">
              Revenue Trend
            </h3>
            <div className="flex items-end gap-4 h-48">
              {monthlyData.map((data) => (
                <div
                  key={data.month}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <span className="text-xs text-cosmic-white/50">
                    ${(data.revenue / 1000).toFixed(0)}k
                  </span>
                  <div
                    className="w-full bg-gradient-to-t from-nebula-500 to-stellar-400 rounded-t-lg transition-all hover:opacity-80"
                    style={{
                      height: `${(data.revenue / maxRevenue) * 100}%`,
                    }}
                  />
                  <span className="text-xs text-cosmic-white/30">
                    {data.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="glass-card p-6">
            <h3 className="font-heading text-sm tracking-wider text-cosmic-gold mb-6">
              Traffic Sources
            </h3>
            <div className="space-y-4">
              {trafficSources.map((source) => (
                <div key={source.source}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-cosmic-white/70">{source.source}</span>
                    <span className="text-cosmic-white/50">
                      {source.percentage}%
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${source.color} rounded-full transition-all`}
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Pages */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-sm tracking-wider text-cosmic-gold">
              Top Pages
            </h3>
            <Globe className="w-4 h-4 text-cosmic-white/30" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left pb-3 text-xs font-heading tracking-wider text-cosmic-white/50">
                    Page
                  </th>
                  <th className="text-right pb-3 text-xs font-heading tracking-wider text-cosmic-white/50">
                    Views
                  </th>
                  <th className="text-right pb-3 text-xs font-heading tracking-wider text-cosmic-white/50">
                    Bounce Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((page, i) => (
                  <tr
                    key={page.page}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="py-3 text-sm text-cosmic-white">
                      {page.page}
                    </td>
                    <td className="py-3 text-sm text-cosmic-white/70 text-right">
                      {page.views.toLocaleString()}
                    </td>
                    <td className="py-3 text-sm text-cosmic-white/50 text-right">
                      {page.bounce}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
