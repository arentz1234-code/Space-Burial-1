"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  FileEdit,
  BarChart3,
  Settings,
  TrendingUp,
  Save,
  Bell,
  Shield,
  Mail,
  Globe,
  Database,
  Key,
  UserCheck,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Overview", icon: BarChart3 },
  { href: "/admin/dashboard/users", label: "Users", icon: Users },
  { href: "/admin/dashboard/investors", label: "Investors", icon: UserCheck },
  { href: "/admin/dashboard/cms", label: "CMS", icon: FileEdit },
  { href: "/admin/dashboard/analytics", label: "Analytics", icon: TrendingUp },
  { href: "/admin/dashboard/settings", label: "Settings", icon: Settings, active: true },
];

export default function AdminSettings() {
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "Space Burial",
    siteEmail: "contact@spaceburial.com",
    supportEmail: "support@spaceburial.com",
    timezone: "America/New_York",
    maintenanceMode: false,
    emailNotifications: true,
    slackNotifications: false,
    twoFactorRequired: false,
    sessionTimeout: "24",
    maxLoginAttempts: "5",
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
  };

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cosmic-white/10 flex items-center justify-center">
              <Settings className="w-5 h-5 text-cosmic-white/60" />
            </div>
            <div>
              <p className="font-heading text-xs tracking-[0.3em] uppercase text-nebula-400 mb-1">
                Admin Portal
              </p>
              <h1 className="text-2xl font-heading font-bold tracking-wider">
                Settings
              </h1>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary flex items-center gap-2 mt-4 md:mt-0"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* General Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-5 h-5 text-nebula-400" />
              <h2 className="font-heading text-sm tracking-wider">
                General Settings
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                  Site Name
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) =>
                    setSettings({ ...settings, siteName: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                />
              </div>

              <div>
                <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={settings.siteEmail}
                  onChange={(e) =>
                    setSettings({ ...settings, siteEmail: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                />
              </div>

              <div>
                <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                  Support Email
                </label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) =>
                    setSettings({ ...settings, supportEmail: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                />
              </div>

              <div>
                <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                  Timezone
                </label>
                <select
                  value={settings.timezone}
                  onChange={(e) =>
                    setSettings({ ...settings, timezone: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div>
                  <p className="text-sm text-cosmic-white">Maintenance Mode</p>
                  <p className="text-xs text-cosmic-white/40">
                    Disable public access to the site
                  </p>
                </div>
                <button
                  onClick={() =>
                    setSettings({
                      ...settings,
                      maintenanceMode: !settings.maintenanceMode,
                    })
                  }
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.maintenanceMode ? "bg-red-500" : "bg-white/20"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      settings.maintenanceMode
                        ? "translate-x-6"
                        : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-cosmic-gold" />
              <h2 className="font-heading text-sm tracking-wider">
                Notifications
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-white/5">
                <div>
                  <p className="text-sm text-cosmic-white">Email Notifications</p>
                  <p className="text-xs text-cosmic-white/40">
                    Receive alerts via email
                  </p>
                </div>
                <button
                  onClick={() =>
                    setSettings({
                      ...settings,
                      emailNotifications: !settings.emailNotifications,
                    })
                  }
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.emailNotifications ? "bg-green-500" : "bg-white/20"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      settings.emailNotifications
                        ? "translate-x-6"
                        : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-white/5">
                <div>
                  <p className="text-sm text-cosmic-white">Slack Notifications</p>
                  <p className="text-xs text-cosmic-white/40">
                    Send alerts to Slack channel
                  </p>
                </div>
                <button
                  onClick={() =>
                    setSettings({
                      ...settings,
                      slackNotifications: !settings.slackNotifications,
                    })
                  }
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.slackNotifications ? "bg-green-500" : "bg-white/20"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      settings.slackNotifications
                        ? "translate-x-6"
                        : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Security Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-stellar-400" />
              <h2 className="font-heading text-sm tracking-wider">Security</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-white/5">
                <div>
                  <p className="text-sm text-cosmic-white">Require 2FA</p>
                  <p className="text-xs text-cosmic-white/40">
                    Require two-factor for all admins
                  </p>
                </div>
                <button
                  onClick={() =>
                    setSettings({
                      ...settings,
                      twoFactorRequired: !settings.twoFactorRequired,
                    })
                  }
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.twoFactorRequired ? "bg-green-500" : "bg-white/20"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      settings.twoFactorRequired
                        ? "translate-x-6"
                        : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                  Session Timeout (hours)
                </label>
                <input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) =>
                    setSettings({ ...settings, sessionTimeout: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                />
              </div>

              <div>
                <label className="block text-xs font-heading tracking-wider text-cosmic-white/50 mb-2">
                  Max Login Attempts
                </label>
                <input
                  type="number"
                  value={settings.maxLoginAttempts}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      maxLoginAttempts: e.target.value,
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cosmic-white focus:outline-none focus:border-nebula-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Database Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-5 h-5 text-nebula-400" />
              <h2 className="font-heading text-sm tracking-wider">
                System Info
              </h2>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-sm text-cosmic-white/50">Version</span>
                <span className="text-sm font-mono">v1.0.0</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-sm text-cosmic-white/50">Environment</span>
                <span className="text-sm font-mono text-green-400">
                  Production
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-sm text-cosmic-white/50">Database</span>
                <span className="text-sm font-mono">Mock Data</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-sm text-cosmic-white/50">Auth Provider</span>
                <span className="text-sm font-mono">Local Mock</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-cosmic-white/50">Last Deploy</span>
                <span className="text-sm font-mono">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
