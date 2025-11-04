import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaCalendar,
  FaCheckCircle,
  FaBox,
  FaEye,
  FaHeart,
  FaShoppingBag,
  FaCog,
  FaCamera,
} from "react-icons/fa";
import Button from "../../components/shared/Button";
import Card from "../../components/shared/Card";
import Avatar from "../../components/shared/Avatar";
import Badge from "../../components/shared/Badge";
import ProductCard from "../../components/dashboard/ProductCard";
import productsService from "../../services/productsService";

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("listings"); // listings, sold, stats
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Oligwu Michael",
    email: "oligwu.m2203183@st.futminna.edu.ng",
    phone: "+234 814 567 8901",
    location: "Bosso Campus",
    bio: "Engineering student | Tech enthusiast | Looking to buy and sell quality items on campus",
    avatar: null,
    verified: false,
    joinedDate: "2024-09-15",
  });

  const [stats, setStats] = useState({
    totalListings: 0,
    totalViews: 0,
    totalSold: 0,
    activeListings: 0,
  });

  useEffect(() => {
    loadMyListings();
  }, []);

  const loadMyListings = async () => {
    setLoading(true);
    try {
      // In a real app, this would fetch only the current user's listings
      // For now, we'll simulate by getting random products
      const allProducts = await productsService.getAllProducts();
      const myProducts = allProducts.slice(0, 4); // Simulate user having 4 listings
      setMyListings(myProducts);

      // Calculate stats
      const totalViews = myProducts.reduce((sum, p) => sum + (p.views || 0), 0);
      setStats({
        totalListings: myProducts.length,
        totalViews: totalViews,
        totalSold: 2, // Simulated
        activeListings: myProducts.length,
      });
    } catch (error) {
      console.error("Error loading listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // In a real app, this would save to backend
    setIsEditMode(false);
    alert("Profile updated successfully!");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const tabs = [
    { id: "listings", label: "My Listings", icon: FaBox, count: stats.totalListings },
    { id: "sold", label: "Sold Items", icon: FaShoppingBag, count: stats.totalSold },
    { id: "stats", label: "Statistics", icon: FaEye, count: null },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-inter font-bold text-gray-900">
              My Profile
            </h1>
            <Button
              variant="outline"
              size="sm"
              icon={<FaCog />}
              onClick={() => navigate("/dashboard/settings")}
            >
              Settings
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <div className="text-center">
                {/* Avatar */}
                <div className="relative inline-block mb-4">
                  <Avatar
                    src={profileData.avatar}
                    alt={profileData.name}
                    size="2xl"
                  />
                  {isEditMode && (
                    <label className="absolute bottom-0 right-0 w-10 h-10 bg-[#7E22CE] text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-[#6B1FB8] transition-colors">
                      <FaCamera />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Name & Verification */}
                <div className="flex items-center justify-center gap-2 mb-2">
                  {isEditMode ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                      className="text-xl font-inter font-bold text-gray-900 border-b-2 border-[#7E22CE] focus:outline-none text-center"
                    />
                  ) : (
                    <h2 className="text-xl font-inter font-bold text-gray-900">
                      {profileData.name}
                    </h2>
                  )}
                  {profileData.verified && (
                    <FaCheckCircle className="text-[#14B8A6] text-lg" />
                  )}
                </div>

                {/* Bio */}
                {isEditMode ? (
                  <textarea
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                    className="w-full text-sm text-gray-600 font-instrument border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#7E22CE]"
                    rows={3}
                  />
                ) : (
                  <p className="text-sm text-gray-600 font-instrument mb-4">
                    {profileData.bio}
                  </p>
                )}

                {/* Verification Badge */}
                {!profileData.verified && (
                  <div className="mb-4">
                    <Badge variant="warning">Not Verified</Badge>
                    <p className="text-xs text-gray-500 font-instrument mt-2">
                      Verify your account to build trust
                    </p>
                  </div>
                )}

                {/* Edit/Save Button */}
                <div className="mt-4">
                  {isEditMode ? (
                    <div className="flex gap-2">
                      <Button
                        fullWidth
                        size="sm"
                        onClick={handleSaveProfile}
                      >
                        Save Changes
                      </Button>
                      <Button
                        fullWidth
                        size="sm"
                        variant="outline"
                        onClick={() => setIsEditMode(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      fullWidth
                      variant="outline"
                      size="sm"
                      icon={<FaEdit />}
                      onClick={() => setIsEditMode(true)}
                    >
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </Card>

            {/* Contact Info Card */}
            <Card>
              <h3 className="font-inter font-semibold text-gray-900 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <FaEnvelope className="text-gray-400 mt-1 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 font-instrument">Email</p>
                    {isEditMode ? (
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({ ...profileData, email: e.target.value })
                        }
                        className="w-full text-sm text-gray-900 font-instrument border-b border-gray-300 focus:outline-none focus:border-[#7E22CE]"
                      />
                    ) : (
                      <p className="text-sm text-gray-900 font-instrument truncate">
                        {profileData.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <FaPhone className="text-gray-400 mt-1 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 font-instrument">Phone</p>
                    {isEditMode ? (
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({ ...profileData, phone: e.target.value })
                        }
                        className="w-full text-sm text-gray-900 font-instrument border-b border-gray-300 focus:outline-none focus:border-[#7E22CE]"
                      />
                    ) : (
                      <p className="text-sm text-gray-900 font-instrument">
                        {profileData.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-gray-400 mt-1 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 font-instrument">Location</p>
                    {isEditMode ? (
                      <select
                        value={profileData.location}
                        onChange={(e) =>
                          setProfileData({ ...profileData, location: e.target.value })
                        }
                        className="w-full text-sm text-gray-900 font-instrument border-b border-gray-300 focus:outline-none focus:border-[#7E22CE]"
                      >
                        <option>Bosso Campus</option>
                        <option>Gidan Kwano</option>
                        <option>Main Campus</option>
                        <option>Tunga</option>
                        <option>Minna Town</option>
                      </select>
                    ) : (
                      <p className="text-sm text-gray-900 font-instrument">
                        {profileData.location}
                      </p>
                    )}
                  </div>
                </div>

                {/* Joined Date */}
                <div className="flex items-start gap-3">
                  <FaCalendar className="text-gray-400 mt-1 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 font-instrument">Member Since</p>
                    <p className="text-sm text-gray-900 font-instrument">
                      {formatDate(profileData.joinedDate)}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Stats Card */}
            <Card>
              <h3 className="font-inter font-semibold text-gray-900 mb-4">
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-[#7E22CE]/5 rounded-lg">
                  <p className="text-2xl font-inter font-bold text-[#7E22CE]">
                    {stats.totalListings}
                  </p>
                  <p className="text-xs text-gray-600 font-instrument">
                    Total Listings
                  </p>
                </div>
                <div className="text-center p-3 bg-[#14B8A6]/5 rounded-lg">
                  <p className="text-2xl font-inter font-bold text-[#14B8A6]">
                    {stats.totalSold}
                  </p>
                  <p className="text-xs text-gray-600 font-instrument">
                    Items Sold
                  </p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-inter font-bold text-blue-600">
                    {stats.totalViews}
                  </p>
                  <p className="text-xs text-gray-600 font-instrument">
                    Total Views
                  </p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <p className="text-2xl font-inter font-bold text-orange-600">
                    {stats.activeListings}
                  </p>
                  <p className="text-xs text-gray-600 font-instrument">
                    Active
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <Card padding="none">
              <div className="flex border-b border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-4 py-3 font-instrument font-semibold transition-colors ${
                      activeTab === tab.id
                        ? "text-[#7E22CE] border-b-2 border-[#7E22CE]"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <tab.icon />
                      {tab.label}
                      {tab.count !== null && (
                        <span className="ml-1 px-2 py-0.5 bg-gray-100 rounded-full text-xs">
                          {tab.count}
                        </span>
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </Card>

            {/* Tab Content */}
            {activeTab === "listings" && (
              <div>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7E22CE]"></div>
                  </div>
                ) : myListings.length === 0 ? (
                  <Card>
                    <div className="text-center py-12">
                      <FaBox className="text-6xl text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-inter font-semibold text-gray-900 mb-2">
                        No listings yet
                      </h3>
                      <p className="text-gray-600 font-instrument mb-4">
                        Start selling by posting your first item
                      </p>
                      <Button onClick={() => navigate("/dashboard/post")}>
                        Post an Item
                      </Button>
                    </div>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {myListings.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <ProductCard
                          product={product}
                          onClick={() => navigate(`/dashboard/product/${product.id}`)}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "sold" && (
              <Card>
                <div className="text-center py-12">
                  <FaShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-inter font-semibold text-gray-900 mb-2">
                    No sold items yet
                  </h3>
                  <p className="text-gray-600 font-instrument">
                    Your sold items will appear here
                  </p>
                </div>
              </Card>
            )}

            {activeTab === "stats" && (
              <div className="space-y-6">
                {/* Detailed Stats */}
                <Card>
                  <h3 className="font-inter font-semibold text-gray-900 mb-4">
                    Performance Overview
                  </h3>
                  <div className="space-y-4">
                    {/* Total Views */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-instrument text-gray-600">
                          Total Profile Views
                        </span>
                        <span className="text-sm font-inter font-bold text-gray-900">
                          {stats.totalViews}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#7E22CE] h-2 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>

                    {/* Response Rate */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-instrument text-gray-600">
                          Response Rate
                        </span>
                        <span className="text-sm font-inter font-bold text-gray-900">
                          95%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#14B8A6] h-2 rounded-full"
                          style={{ width: "95%" }}
                        ></div>
                      </div>
                    </div>

                    {/* Success Rate */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-instrument text-gray-600">
                          Success Rate
                        </span>
                        <span className="text-sm font-inter font-bold text-gray-900">
                          {stats.totalListings > 0
                            ? Math.round((stats.totalSold / stats.totalListings) * 100)
                            : 0}
                          %
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{
                            width: `${
                              stats.totalListings > 0
                                ? (stats.totalSold / stats.totalListings) * 100
                                : 0
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Activity Chart Placeholder */}
                <Card>
                  <h3 className="font-inter font-semibold text-gray-900 mb-4">
                    Activity This Month
                  </h3>
                  <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500 font-instrument">
                      Chart coming soon
                    </p>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
