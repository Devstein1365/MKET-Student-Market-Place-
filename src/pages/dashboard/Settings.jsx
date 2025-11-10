import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaLock,
  FaUser,
  FaPalette,
  FaLanguage,
  FaSignOutAlt,
  FaChevronRight,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import Card from "../../components/shared/Card";
import Button from "../../components/shared/Button";
import Modal from "../../components/shared/Modal";

const Settings = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    messages: true,
    updates: false,
  });

  // Modal state
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
    showCancel: false,
    onConfirm: null,
  });

  const showModal = (
    title,
    message,
    type = "info",
    showCancel = false,
    onConfirm = null
  ) => {
    setModal({ isOpen: true, title, message, type, showCancel, onConfirm });
  };

  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
  };

  const handleLogout = () => {
    showModal(
      "Confirm Logout",
      "Are you sure you want to logout?",
      "confirm",
      true,
      () => {
        logout();
        navigate("/auth", { replace: true });
      }
    );
  };

  const settingsSections = [
    {
      title: "Account",
      items: [
        {
          icon: FaUser,
          label: "Edit Profile",
          description: "Update your personal information",
          action: () => navigate("/dashboard/profile"),
        },
        {
          icon: FaLock,
          label: "Change Password",
          description: "Update your password",
          action: () =>
            showModal(
              "Coming Soon",
              "Password change feature coming soon!",
              "info"
            ),
        },
      ],
    },
    {
      title: "Notifications",
      items: [
        {
          icon: FaBell,
          label: "Email Notifications",
          description: "Receive updates via email",
          toggle: true,
          value: notifications.email,
          onChange: () =>
            setNotifications({ ...notifications, email: !notifications.email }),
        },
        {
          icon: FaBell,
          label: "Push Notifications",
          description: "Get push notifications on your device",
          toggle: true,
          value: notifications.push,
          onChange: () =>
            setNotifications({ ...notifications, push: !notifications.push }),
        },
        {
          icon: FaBell,
          label: "Message Notifications",
          description: "Get notified for new messages",
          toggle: true,
          value: notifications.messages,
          onChange: () =>
            setNotifications({
              ...notifications,
              messages: !notifications.messages,
            }),
        },
        {
          icon: FaBell,
          label: "Product Updates",
          description: "Notify me about platform updates",
          toggle: true,
          value: notifications.updates,
          onChange: () =>
            setNotifications({
              ...notifications,
              updates: !notifications.updates,
            }),
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: FaPalette,
          label: "Theme",
          description: "Light mode (Dark mode coming soon)",
          action: () =>
            showModal("Coming Soon", "Dark mode feature coming soon!", "info"),
        },
        {
          icon: FaLanguage,
          label: "Language",
          description: "English (More languages coming soon)",
          action: () =>
            showModal("Coming Soon", "More languages coming soon!", "info"),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-inter font-bold text-gray-900">
            Settings
          </h1>
          <p className="text-sm text-gray-600 font-instrument mt-1">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* User Info Card */}
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7E22CE] to-[#14B8A6] flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="flex-1">
              <h3 className="font-inter font-semibold text-gray-900">
                {user?.name || "User"}
              </h3>
              <p className="text-sm text-gray-600 font-instrument">
                {user?.email || "email@example.com"}
              </p>
            </div>
          </div>
        </Card>

        {/* Settings Sections */}
        {settingsSections.map((section) => (
          <div key={section.title}>
            <h2 className="text-sm font-inter font-semibold text-gray-500 uppercase tracking-wide mb-3 px-1">
              {section.title}
            </h2>
            <Card padding="none">
              <div className="divide-y divide-gray-200">
                {section.items.map((item, index) => (
                  <div
                    key={index}
                    onClick={item.toggle ? undefined : item.action}
                    className={`flex items-center justify-between p-4 ${
                      !item.toggle
                        ? "cursor-pointer hover:bg-gray-50 transition-colors"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-[#7E22CE]">
                        <item.icon className="text-lg" />
                      </div>
                      <div className="flex-1">
                        <p className="font-inter font-medium text-gray-900">
                          {item.label}
                        </p>
                        <p className="text-sm text-gray-600 font-instrument">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    {item.toggle ? (
                      <button
                        onClick={item.onChange}
                        className="text-3xl focus:outline-none"
                      >
                        {item.value ? (
                          <FaToggleOn className="text-[#7E22CE]" />
                        ) : (
                          <FaToggleOff className="text-gray-400" />
                        )}
                      </button>
                    ) : (
                      <FaChevronRight className="text-gray-400" />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        ))}

        {/* Logout Button */}
        <Card>
          <Button
            fullWidth
            variant="outline"
            icon={<FaSignOutAlt />}
            onClick={handleLogout}
            className="text-red-500 border-red-500 hover:bg-red-50"
          >
            Logout
          </Button>
        </Card>

        {/* App Info */}
        <div className="text-center text-sm text-gray-500 font-instrument py-4">
          <p>MKET Student Marketplace</p>
          <p className="mt-1">Version 1.0.0</p>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        showCancel={modal.showCancel}
        onConfirm={modal.onConfirm}
      />
    </div>
  );
};

export default Settings;
