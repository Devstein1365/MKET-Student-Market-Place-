import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaClock,
  FaStar,
  FaEnvelope,
} from "react-icons/fa";
import Button from "../../components/shared/Button";
import Card from "../../components/shared/Card";
import Avatar from "../../components/shared/Avatar";
import Badge from "../../components/shared/Badge";
import ProductCard from "../../components/dashboard/ProductCard";
import productsService from "../../services/productsService";

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userProducts, setUserProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("products"); // 'products' or 'reviews'
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      setLoading(true);
      try {
        // Get all products
        const allProducts = await productsService.getAllProducts();

        // Find products by this seller and get seller info from first product
        const sellerProducts = allProducts.filter(
          (product) => product.seller.id.toString() === userId
        );

        if (sellerProducts.length > 0) {
          // Get seller info from the first product
          const sellerInfo = sellerProducts[0].seller;

          // Build user profile from seller data
          setUser({
            id: sellerInfo.id,
            name: sellerInfo.name,
            avatar: sellerInfo.avatar,
            verified: sellerInfo.verified || false,
            bio:
              sellerInfo.bio ||
              "Passionate about providing quality products and excellent service!",
            location: sellerInfo.location || "Minna, Niger State",
            memberSince: sellerInfo.memberSince || "2024-01-15",
            responseTime: sellerInfo.responseTime || "Within 2 hours",
            rating: sellerInfo.rating || 4.5,
            totalReviews: sellerInfo.totalReviews || 12,
            totalProducts: sellerProducts.length,
            totalSales:
              sellerInfo.totalSales || Math.floor(sellerProducts.length * 2.5),
          });

          setUserProducts(sellerProducts);
        } else {
          // If no products found for this seller, show default data
          setUser({
            id: userId,
            name: "User",
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
            verified: false,
            bio: "No bio available",
            location: "Location not specified",
            memberSince: "2024-01-15",
            responseTime: "Response time not available",
            rating: 0,
            totalReviews: 0,
            totalProducts: 0,
            totalSales: 0,
          });
          setUserProducts([]);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [userId]);

  const handleChatWithUser = () => {
    navigate("/dashboard/chat", {
      state: {
        sellerId: user.id,
        sellerName: user.name,
        sellerAvatar: user.avatar,
      },
    });
  };

  const formatMemberSince = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#7E22CE]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 font-instrument mb-4">
            User not found
          </p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-[#7E22CE] transition-colors"
          >
            <FaArrowLeft />
            <span className="font-instrument">Back</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - User Info */}
          <div className="lg:col-span-1 space-y-4">
            {/* Profile Card */}
            <Card>
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <Avatar src={user.avatar} alt={user.name} size="2xl" />
                  {user.verified && (
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#14B8A6] rounded-full flex items-center justify-center border-4 border-white">
                      <FaCheckCircle className="text-white text-sm" />
                    </div>
                  )}
                </div>
                <h1 className="text-2xl font-inter font-bold text-gray-900 mb-1">
                  {user.name}
                </h1>
                {user.verified && (
                  <Badge variant="success" className="mb-3">
                    Verified Seller
                  </Badge>
                )}
                <p className="text-gray-600 font-instrument text-sm mb-4">
                  {user.bio}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-2xl font-inter font-bold text-[#7E22CE]">
                      {user.totalProducts}
                    </p>
                    <p className="text-xs text-gray-600 font-instrument">
                      Products
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-inter font-bold text-[#7E22CE]">
                      {user.totalSales}
                    </p>
                    <p className="text-xs text-gray-600 font-instrument">
                      Sales
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-inter font-bold text-[#7E22CE]">
                      {user.rating}
                    </p>
                    <p className="text-xs text-gray-600 font-instrument">
                      Rating
                    </p>
                  </div>
                </div>

                <Button fullWidth onClick={handleChatWithUser}>
                  <FaEnvelope className="mr-2" />
                  Send Message
                </Button>
              </div>
            </Card>

            {/* Info Card */}
            <Card>
              <h3 className="text-lg font-inter font-semibold text-gray-900 mb-4">
                Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-[#14B8A6] mt-1" />
                  <div>
                    <p className="text-sm font-inter font-semibold text-gray-900">
                      Location
                    </p>
                    <p className="text-sm text-gray-600 font-instrument">
                      {user.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaClock className="text-[#14B8A6] mt-1" />
                  <div>
                    <p className="text-sm font-inter font-semibold text-gray-900">
                      Member Since
                    </p>
                    <p className="text-sm text-gray-600 font-instrument">
                      {formatMemberSince(user.memberSince)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaStar className="text-[#14B8A6] mt-1" />
                  <div>
                    <p className="text-sm font-inter font-semibold text-gray-900">
                      Response Time
                    </p>
                    <p className="text-sm text-gray-600 font-instrument">
                      {user.responseTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaStar className="text-yellow-500 mt-1" />
                  <div>
                    <p className="text-sm font-inter font-semibold text-gray-900">
                      Rating
                    </p>
                    <p className="text-sm text-gray-600 font-instrument">
                      {user.rating} out of 5 ({user.totalReviews} reviews)
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Products & Reviews */}
          <div className="lg:col-span-2 space-y-4">
            {/* Tabs */}
            <Card>
              <div className="flex gap-4 border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("products")}
                  className={`pb-3 px-1 font-inter font-semibold transition-colors relative ${
                    activeTab === "products"
                      ? "text-[#7E22CE]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Products ({user.totalProducts})
                  {activeTab === "products" && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7E22CE]"
                    />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`pb-3 px-1 font-inter font-semibold transition-colors relative ${
                    activeTab === "reviews"
                      ? "text-[#7E22CE]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Reviews ({user.totalReviews})
                  {activeTab === "reviews" && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7E22CE]"
                    />
                  )}
                </button>
              </div>
            </Card>

            {/* Content */}
            {activeTab === "products" ? (
              <div>
                {userProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {userProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onClick={() =>
                          navigate(`/dashboard/product/${product.id}`)
                        }
                      />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <div className="text-center py-12">
                      <p className="text-gray-600 font-instrument">
                        No products available
                      </p>
                    </div>
                  </Card>
                )}
              </div>
            ) : (
              <Card>
                <div className="text-center py-12">
                  <p className="text-gray-600 font-instrument mb-2">
                    Reviews feature coming soon!
                  </p>
                  <p className="text-sm text-gray-500 font-instrument">
                    Users will be able to see ratings and reviews here.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
