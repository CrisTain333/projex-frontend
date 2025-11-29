import { useState } from "react";
import { User, Bell, Shield, Palette, Camera, Check } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useAuthStore } from "@/stores";
import { Button, Input } from "@/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
];

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(8, "Password must be at least 8 characters"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { theme, setTheme } = useTheme();
  const { user } = useAuthStore();

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    issueAssigned: true,
    issueCommented: true,
    projectUpdates: false,
    weeklyDigest: true,
  });

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onProfileSubmit = (data: ProfileFormData) => {
    console.log("Profile update:", data);
    toast.success("Profile updated successfully!");
  };

  const onPasswordSubmit = (data: PasswordFormData) => {
    console.log("Password update:", data);
    toast.success("Password changed successfully!");
    resetPassword();
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const toggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F97316] to-[#EC4899] flex items-center justify-center">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-semibold text-2xl">
                        {getInitials(user?.name)}
                      </span>
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white dark:bg-[#2D2D44] border border-[#E5E7EB] dark:border-[#3D3D54] flex items-center justify-center text-[#6B7280] hover:text-[#F97316] transition-colors">
                    <Camera size={16} />
                  </button>
                </div>
                <div>
                  <p className="font-medium text-[#1A1A2E] dark:text-white">
                    {user?.name || "User"}
                  </p>
                  <p className="text-sm text-[#6B7280]">{user?.email}</p>
                </div>
              </div>

              <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="Your name"
                    error={profileErrors.name?.message}
                    {...registerProfile("name")}
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    error={profileErrors.email?.message}
                    {...registerProfile("email")}
                  />
                </div>

                <Button type="submit">Save Changes</Button>
              </form>
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
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setTheme("light")}
                    className={`relative p-4 rounded-xl border-2 transition-all ${
                      theme === "light"
                        ? "border-[#F97316] bg-[#F97316]/5"
                        : "border-[#E5E7EB] dark:border-[#2D2D44] hover:border-[#F97316]/30"
                    }`}
                  >
                    {theme === "light" && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#F97316] flex items-center justify-center">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                    <div className="w-full aspect-video rounded-lg bg-white border border-[#E5E7EB] mb-3 flex items-center justify-center">
                      <div className="w-3/4 h-3/4 bg-[#F8F9FC] rounded flex flex-col gap-1 p-2">
                        <div className="h-2 bg-[#E5E7EB] rounded w-1/2" />
                        <div className="h-2 bg-[#E5E7EB] rounded w-3/4" />
                        <div className="h-2 bg-[#E5E7EB] rounded w-1/3" />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-[#1A1A2E] dark:text-white">
                      Light
                    </span>
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`relative p-4 rounded-xl border-2 transition-all ${
                      theme === "dark"
                        ? "border-[#F97316] bg-[#F97316]/5"
                        : "border-[#E5E7EB] dark:border-[#2D2D44] hover:border-[#F97316]/30"
                    }`}
                  >
                    {theme === "dark" && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#F97316] flex items-center justify-center">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                    <div className="w-full aspect-video rounded-lg bg-[#1A1A2E] border border-[#2D2D44] mb-3 flex items-center justify-center">
                      <div className="w-3/4 h-3/4 bg-[#2D2D44] rounded flex flex-col gap-1 p-2">
                        <div className="h-2 bg-[#3D3D54] rounded w-1/2" />
                        <div className="h-2 bg-[#3D3D54] rounded w-3/4" />
                        <div className="h-2 bg-[#3D3D54] rounded w-1/3" />
                      </div>
                    </div>
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

              <div className="space-y-4">
                {[
                  {
                    key: "emailNotifications" as const,
                    label: "Email Notifications",
                    description: "Receive notifications via email",
                  },
                  {
                    key: "issueAssigned" as const,
                    label: "Issue Assigned",
                    description: "When an issue is assigned to you",
                  },
                  {
                    key: "issueCommented" as const,
                    label: "Issue Comments",
                    description: "When someone comments on your issues",
                  },
                  {
                    key: "projectUpdates" as const,
                    label: "Project Updates",
                    description: "Updates about projects you're part of",
                  },
                  {
                    key: "weeklyDigest" as const,
                    label: "Weekly Digest",
                    description: "Weekly summary of your activity",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between py-3 border-b border-[#E5E7EB] dark:border-[#2D2D44] last:border-0"
                  >
                    <div>
                      <p className="font-medium text-[#1A1A2E] dark:text-white">
                        {item.label}
                      </p>
                      <p className="text-sm text-[#6B7280]">{item.description}</p>
                    </div>
                    <button
                      onClick={() => toggleNotification(item.key)}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        notificationSettings[item.key]
                          ? "bg-[#F97316]"
                          : "bg-[#E5E7EB] dark:bg-[#2D2D44]"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          notificationSettings[item.key]
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-[#1A1A2E] dark:text-white">
                Security Settings
              </h2>

              <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-4">
                <h3 className="font-medium text-[#1A1A2E] dark:text-white">
                  Change Password
                </h3>

                <Input
                  label="Current Password"
                  type="password"
                  placeholder="Enter current password"
                  error={passwordErrors.currentPassword?.message}
                  {...registerPassword("currentPassword")}
                />
                <Input
                  label="New Password"
                  type="password"
                  placeholder="Enter new password"
                  error={passwordErrors.newPassword?.message}
                  {...registerPassword("newPassword")}
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  placeholder="Confirm new password"
                  error={passwordErrors.confirmPassword?.message}
                  {...registerPassword("confirmPassword")}
                />

                <Button type="submit">Update Password</Button>
              </form>

              <div className="pt-6 border-t border-[#E5E7EB] dark:border-[#2D2D44]">
                <h3 className="font-medium text-[#1A1A2E] dark:text-white mb-2">
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-[#6B7280] mb-4">
                  Add an extra layer of security to your account
                </p>
                <Button variant="outline">Enable 2FA</Button>
              </div>

              <div className="pt-6 border-t border-[#E5E7EB] dark:border-[#2D2D44]">
                <h3 className="font-medium text-red-600 mb-2">Danger Zone</h3>
                <p className="text-sm text-[#6B7280] mb-4">
                  Permanently delete your account and all data
                </p>
                <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                  Delete Account
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
