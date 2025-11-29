import { useState } from "react";
import { User, Bell, Shield, Palette } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
];

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A2E] dark:text-white">
          Settings
        </h1>
        <p className="text-[#4A4A68] dark:text-[#9CA3AF]">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <div className="lg:w-56 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[#F97316]/10 to-[#EC4899]/10 text-[#F97316]"
                  : "text-[#4A4A68] dark:text-[#9CA3AF] hover:bg-[#F8F9FC] dark:hover:bg-[#2D2D44]"
              }`}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 bg-white dark:bg-[#1A1A2E] rounded-xl border border-[#E5E7EB] dark:border-[#2D2D44] p-6">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-[#1A1A2E] dark:text-white">
                Profile Settings
              </h2>

              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F97316] to-[#EC4899] flex items-center justify-center">
                  <span className="text-white font-semibold text-2xl">JD</span>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-[#F97316] border border-[#F97316] rounded-lg hover:bg-[#F97316]/10 transition-colors">
                  Change Avatar
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] dark:text-white mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#F8F9FC] dark:bg-[#2D2D44] border border-[#E5E7EB] dark:border-[#3D3D54] text-[#1A1A2E] dark:text-white focus:outline-none focus:border-[#F97316]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] dark:text-white mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="john@example.com"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#F8F9FC] dark:bg-[#2D2D44] border border-[#E5E7EB] dark:border-[#3D3D54] text-[#1A1A2E] dark:text-white focus:outline-none focus:border-[#F97316]"
                  />
                </div>
              </div>

              <button className="px-6 py-2.5 text-white font-medium rounded-lg bg-gradient-to-r from-[#F97316] to-[#EC4899] hover:from-[#EA580C] hover:to-[#DB2777] transition-all">
                Save Changes
              </button>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-[#1A1A2E] dark:text-white">
                Appearance
              </h2>

              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] dark:text-white mb-3">
                  Theme
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setTheme("light")}
                    className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                      theme === "light"
                        ? "border-[#F97316] bg-[#F97316]/5"
                        : "border-[#E5E7EB] dark:border-[#2D2D44]"
                    }`}
                  >
                    <div className="w-full h-16 rounded bg-white border border-[#E5E7EB] mb-2" />
                    <span className="text-sm font-medium text-[#1A1A2E] dark:text-white">
                      Light
                    </span>
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                      theme === "dark"
                        ? "border-[#F97316] bg-[#F97316]/5"
                        : "border-[#E5E7EB] dark:border-[#2D2D44]"
                    }`}
                  >
                    <div className="w-full h-16 rounded bg-[#1A1A2E] border border-[#2D2D44] mb-2" />
                    <span className="text-sm font-medium text-[#1A1A2E] dark:text-white">
                      Dark
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-[#1A1A2E] dark:text-white">
                Notification Preferences
              </h2>
              <p className="text-[#6B7280]">
                Notification settings coming soon...
              </p>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-[#1A1A2E] dark:text-white">
                Security Settings
              </h2>
              <p className="text-[#6B7280]">Security settings coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
