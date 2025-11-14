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

  // Theme state (dark, light, system)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("mket_theme") || "system";
  });

  // Change password state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

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

  // Apply theme
  React.useEffect(() => {
    const applyTheme = () => {
      const root = window.document.documentElement;

      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        root.classList.remove("light", "dark");
        root.classList.add(systemTheme);
      } else {
        root.classList.remove("light", "dark");
        root.classList.add(theme);
      }
    };

    applyTheme();
    localStorage.setItem("mket_theme", theme);

    // Listen for system theme changes
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme();
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const handleChangePassword = () => {
    setPasswordError("");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = () => {
    setPasswordError("");

    // Validation
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setPasswordError("All fields are required");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    // Verify current password
    if (user.password !== passwordData.currentPassword) {
      setPasswordError("Current password is incorrect");
      return;
    }

    // Update password in authService
    const users = JSON.parse(localStorage.getItem("mket_users") || "[]");
    const userIndex = users.findIndex((u) => u.id === user.id);

    if (userIndex !== -1) {
      users[userIndex].password = passwordData.newPassword;
      localStorage.setItem("mket_users", JSON.stringify(users));

      // Update current user
      const updatedUser = { ...user, password: passwordData.newPassword };
      localStorage.setItem("mket_current_user", JSON.stringify(updatedUser));

      setShowPasswordModal(false);
      showModal("Success", "Password changed successfully!", "success");
    }
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
          action: handleChangePassword,
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
          description: `Current: ${
            theme.charAt(0).toUpperCase() + theme.slice(1)
          }`,
          hasSubmenu: true,
          theme: true,
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
                    onClick={
                      item.toggle || item.theme ? undefined : item.action
                    }
                    className={`${
                      !item.toggle && !item.theme
                        ? "cursor-pointer hover:bg-gray-50 transition-colors"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between p-4">
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
                      ) : item.theme ? null : (
                        <FaChevronRight className="text-gray-400" />
                      )}
                    </div>

                    {/* Theme Selection */}
                    {item.theme && (
                      <div className="px-4 pb-4 space-y-2">
                        {["light", "dark", "system"].map((themeOption) => (
                          <button
                            key={themeOption}
                            onClick={() => handleThemeChange(themeOption)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                              theme === themeOption
                                ? "border-[#7E22CE] bg-[#7E22CE]/5"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <span className="font-instrument font-medium text-gray-900 capitalize">
                              {themeOption}
                            </span>
                            {theme === themeOption && (
                              <div className="w-5 h-5 rounded-full bg-[#7E22CE] flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
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

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
            <h3 className="text-xl font-inter font-bold text-gray-900 mb-4">
              Change Password
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-instrument font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-instrument focus:outline-none focus:ring-2 focus:ring-[#7E22CE] focus:border-transparent"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block text-sm font-instrument font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-instrument focus:outline-none focus:ring-2 focus:ring-[#7E22CE] focus:border-transparent"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="block text-sm font-instrument font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-instrument focus:outline-none focus:ring-2 focus:ring-[#7E22CE] focus:border-transparent"
                  placeholder="Confirm new password"
                />
              </div>

              {passwordError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 font-instrument">
                    {passwordError}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowPasswordModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button onClick={handlePasswordSubmit} className="flex-1">
                Change Password
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
