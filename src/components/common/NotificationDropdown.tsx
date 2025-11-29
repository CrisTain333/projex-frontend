import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, CheckCheck, Settings, X } from "lucide-react";
import { useNotifications, useMarkNotificationRead, useMarkAllNotificationsRead } from "@/hooks/api/useNotifications";
import { useClickOutside } from "@/hooks";
import { Avatar, Spinner } from "@/components/ui";
import { formatRelativeTime } from "@/utils/formatters";
import { Notification } from "@/types";

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const { data: notificationsData, isLoading } = useNotifications();
  const markReadMutation = useMarkNotificationRead();
  const markAllReadMutation = useMarkAllNotificationsRead();

  const notifications = notificationsData?.data || [];
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkRead = (id: string) => {
    markReadMutation.mutate(id);
  };

  const handleMarkAllRead = () => {
    markAllReadMutation.mutate();
  };

  const getNotificationIcon = (notification: Notification) => {
    // Customize based on notification type if needed
    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F97316]/20 to-[#EC4899]/20 flex items-center justify-center">
        <Bell size={14} className="text-[#F97316]" />
      </div>
    );
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-[#4A4A68] dark:text-[#9CA3AF] hover:text-[#1A1A2E] dark:hover:text-white transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 text-[10px] font-bold text-white bg-[#F97316] rounded-full flex items-center justify-center">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white dark:bg-[#1A1A2E] rounded-xl shadow-xl border border-[#E5E7EB] dark:border-[#2D2D44] overflow-hidden z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB] dark:border-[#2D2D44]">
              <h3 className="font-semibold text-[#1A1A2E] dark:text-white">
                Notifications
              </h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-xs text-[#F97316] hover:text-[#EA580C] font-medium"
                  >
                    Mark all read
                  </button>
                )}
                <Link
                  to="/dashboard/settings/notifications"
                  className="p-1 text-[#6B7280] hover:text-[#1A1A2E] dark:hover:text-white"
                >
                  <Settings size={16} />
                </Link>
              </div>
            </div>

            {/* Content */}
            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Spinner size="md" />
                </div>
              ) : notifications.length > 0 ? (
                <div className="divide-y divide-[#E5E7EB] dark:divide-[#2D2D44]">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-3 p-4 hover:bg-[#F8F9FC] dark:hover:bg-[#2D2D44]/50 transition-colors ${
                        !notification.isRead ? "bg-[#F97316]/5" : ""
                      }`}
                    >
                      {getNotificationIcon(notification)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#1A1A2E] dark:text-white">
                          {notification.title}
                        </p>
                        {notification.message && (
                          <p className="text-xs text-[#6B7280] mt-0.5 line-clamp-2">
                            {notification.message}
                          </p>
                        )}
                        <p className="text-xs text-[#9CA3AF] mt-1">
                          {formatRelativeTime(notification.createdAt)}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <button
                          onClick={() => handleMarkRead(notification.id)}
                          className="p-1 text-[#6B7280] hover:text-[#F97316] transition-colors"
                          title="Mark as read"
                        >
                          <Check size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#F3F4F6] dark:bg-[#2D2D44] flex items-center justify-center mb-3">
                    <Bell size={24} className="text-[#6B7280]" />
                  </div>
                  <p className="text-sm font-medium text-[#1A1A2E] dark:text-white">
                    No notifications
                  </p>
                  <p className="text-xs text-[#6B7280] mt-1">
                    You're all caught up!
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="px-4 py-3 border-t border-[#E5E7EB] dark:border-[#2D2D44]">
                <Link
                  to="/dashboard/notifications"
                  className="text-sm text-[#F97316] hover:text-[#EA580C] font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  View all notifications
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
