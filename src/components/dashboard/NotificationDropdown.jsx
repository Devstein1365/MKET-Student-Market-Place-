import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {
  FaEnvelope,
  FaShoppingBag,
  FaHeart,
  FaTag,
  FaComment,
} from "react-icons/fa";
import Card from "../shared/Card";
import Avatar from "../shared/Avatar";
import notificationsService from "../../services/notificationsService";

const NotificationDropdown = ({ isOpen, onClose, buttonRef }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, buttonRef]);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const data = await notificationsService.getRecentNotifications(3);
      setNotifications(data);
    } catch (error) {
      console.error("Error loading notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "message":
        return <FaEnvelope className="text-blue-500" />;
      case "sale":
        return <FaShoppingBag className="text-green-500" />;
      case "like":
        return <FaHeart className="text-red-500" />;
      case "price":
        return <FaTag className="text-orange-500" />;
      case "comment":
        return <FaComment className="text-purple-500" />;
      default:
        return <FaEnvelope className="text-gray-500" />;
    }
  };

  const handleNotificationClick = async (notification) => {
    // Mark as read when clicked
    await notificationsService.markAsRead(notification.id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 mt-2 w-80 sm:w-96 z-50"
          style={{ top: "100%" }}
        >
          <Card className="shadow-xl border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
              <h3 className="font-inter font-bold text-gray-900">
                Notifications
              </h3>
              <Link
                to="/dashboard/notifications"
                className="text-sm text-[#7E22CE] hover:text-[#6B21A8] font-instrument"
                onClick={onClose}
              >
                Mark all as read
              </Link>
            </div>

            {/* Notifications List */}
            {loading ? (
              <div className="py-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#7E22CE] mx-auto"></div>
              </div>
            ) : notifications.length > 0 ? (
              <div className="space-y-2">
                {notifications.map((notification) => (
                  <Link
                    key={notification.id}
                    to={notification.link}
                    onClick={() => handleNotificationClick(notification)}
                    className={`block p-3 rounded-lg transition-colors ${
                      !notification.read
                        ? "bg-purple-50 hover:bg-purple-100"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* Icon or Avatar */}
                      <div className="shrink-0">
                        {notification.avatar ? (
                          <Avatar
                            src={notification.avatar}
                            alt={notification.title}
                            size="sm"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            {getNotificationIcon(notification.type)}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-inter font-semibold text-sm text-gray-900">
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-[#7E22CE] rounded-full shrink-0 mt-1"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 font-instrument line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 font-instrument mt-1">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-600 font-instrument">
                  No notifications yet
                </p>
              </div>
            )}

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="mt-4 pt-3 border-t border-gray-200">
                <Link
                  to="/dashboard/notifications"
                  className="block text-center text-sm text-[#7E22CE] hover:text-[#6B21A8] font-inter font-semibold"
                  onClick={onClose}
                >
                  See All Notifications
                </Link>
              </div>
            )}
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationDropdown;
