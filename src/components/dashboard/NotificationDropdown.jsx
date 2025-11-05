import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const NotificationDropdown = ({ isOpen, onClose, onUpdateCount }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen]);

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

  const handleNotificationClick = async (notification, e) => {
    e.stopPropagation(); // Stop event bubbling
    console.log("Notification clicked:", notification.id);
    // Mark as read when clicked
    await notificationsService.markAsRead(notification.id);
    // Reload notifications to update UI
    loadNotifications();
    // Update unread count in parent
    if (onUpdateCount) onUpdateCount();
  };

  const handleMarkAllAsRead = async (e) => {
    e.stopPropagation(); // Stop event bubbling
    console.log("Mark all as read clicked");
    try {
      await notificationsService.markAllAsRead();
      loadNotifications();
      // Update unread count in parent
      if (onUpdateCount) onUpdateCount();
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="absolute right-0 mt-2 w-80 sm:w-96 z-50"
      style={{ top: "100%" }}
      onClick={(e) => e.stopPropagation()}
    >
      <Card className="shadow-xl border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
          <h3 className="font-inter font-bold text-gray-900">Notifications</h3>
          <button
            onClick={handleMarkAllAsRead}
            className="text-sm text-[#7E22CE] hover:text-[#6B21A8] font-instrument cursor-pointer"
          >
            Mark all as read
          </button>
        </div>

        {/* Notifications List */}
        {loading ? (
          <div className="py-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#7E22CE] mx-auto"></div>
          </div>
        ) : notifications.length > 0 ? (
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg transition-colors cursor-pointer ${
                  !notification.read
                    ? "bg-purple-50 hover:bg-purple-100"
                    : "hover:bg-gray-50"
                }`}
                onClick={(e) => handleNotificationClick(notification, e)}
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
              </div>
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
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log("See all notifications clicked");
                navigate("/dashboard/notifications");
                // Close dropdown after navigation
                setTimeout(() => onClose(), 0);
              }}
              className="w-full text-center text-sm text-[#7E22CE] hover:text-[#6B21A8] font-inter font-semibold py-2 cursor-pointer"
            >
              See All Notifications
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default NotificationDropdown;
