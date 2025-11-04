import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBox, FaEye, FaShoppingBag, FaCog } from "react-icons/fa";
import Button from "../../components/shared/Button";
import Card from "../../components/shared/Card";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ContactInfo from "../../components/profile/ContactInfo";
import StatsCard from "../../components/profile/StatsCard";
import ListingsTab from "../../components/profile/ListingsTab";
import PerformanceStats from "../../components/profile/PerformanceStats";
import productsService from "../../services/productsService";

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("listings");
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
      const allProducts = await productsService.getAllProducts();
      const myProducts = allProducts.slice(0, 4);
      setMyListings(myProducts);

      const totalViews = myProducts.reduce((sum, p) => sum + (p.views || 0), 0);
      setStats({
        totalListings: myProducts.length,
        totalViews: totalViews,
        totalSold: 2,
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
              <ProfileHeader
                profileData={profileData}
                isEditMode={isEditMode}
                onEdit={() => setIsEditMode(true)}
                onSave={handleSaveProfile}
                onCancel={() => setIsEditMode(false)}
                onAvatarChange={handleAvatarChange}
              />
            </Card>

            {/* Contact Info Card */}
            <Card>
              <h3 className="font-inter font-semibold text-gray-900 mb-4">
                Contact Information
              </h3>
              <ContactInfo
                profileData={profileData}
                isEditMode={isEditMode}
                onEdit={setProfileData}
                formatDate={formatDate}
              />
            </Card>

            {/* Stats Card */}
            <Card>
              <h3 className="font-inter font-semibold text-gray-900 mb-4">
                Quick Stats
              </h3>
              <StatsCard stats={stats} />
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
              <ListingsTab
                listings={myListings}
                loading={loading}
                onNavigate={navigate}
              />
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

            {activeTab === "stats" && <PerformanceStats stats={stats} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
