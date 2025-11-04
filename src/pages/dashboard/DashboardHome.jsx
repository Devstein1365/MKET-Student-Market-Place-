import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  FaPlus,
  FaBell,
  FaFire,
  FaTags,
} from "react-icons/fa";
import ProductCard from "../../components/dashboard/ProductCard";
import Button from "../../components/shared/Button";
import Input from "../../components/shared/Input";
import Badge from "../../components/shared/Badge";

const DashboardHome = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - will be replaced with API calls
  const categories = [
    { id: 1, name: "Electronics", icon: "📱", count: 245 },
    { id: 2, name: "Books", icon: "📚", count: 189 },
    { id: 3, name: "Fashion", icon: "👕", count: 312 },
    { id: 4, name: "Furniture", icon: "🛋️", count: 78 },
    { id: 5, name: "Sports", icon: "⚽", count: 156 },
  ];

  const products = [
    {
      id: 1,
      title: "iPhone 13 Pro Max 256GB - Excellent Condition",
      price: 450000,
      originalPrice: 520000,
      condition: "Used",
      image:
        "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400",
      location: "Bosso Campus",
      views: 142,
      seller: {
        name: "Aisha Mohammed",
        avatar: null,
        verified: true,
      },
    },
    {
      id: 2,
      title: "MacBook Pro 2021 M1 Chip - Like New",
      price: 780000,
      condition: "New",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      location: "Gidan Kwano",
      views: 289,
      seller: {
        name: "Chukwudi Okafor",
        avatar: null,
        verified: true,
      },
    },
    {
      id: 3,
      title: "Engineering Mathematics Textbook Set",
      price: 15000,
      condition: "Used",
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
      location: "Main Campus",
      views: 67,
      seller: {
        name: "Fatima Yusuf",
        avatar: null,
        verified: false,
      },
    },
    {
      id: 4,
      title: "Gaming Laptop - ASUS ROG Strix G15",
      price: 650000,
      originalPrice: 750000,
      condition: "Used",
      image:
        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400",
      location: "Bosso Campus",
      views: 198,
      seller: {
        name: "Ibrahim Usman",
        avatar: null,
        verified: true,
      },
    },
    {
      id: 5,
      title: "Study Desk with Chair - Wooden",
      price: 25000,
      condition: "Used",
      image:
        "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400",
      location: "Gidan Kwano",
      views: 45,
      seller: {
        name: "Grace Nwankwo",
        avatar: null,
        verified: false,
      },
    },
    {
      id: 6,
      title: "Samsung Galaxy S23 Ultra 512GB",
      price: 520000,
      condition: "New",
      image:
        "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400",
      location: "Main Campus",
      views: 321,
      seller: {
        name: "Daniel Adeyemi",
        avatar: null,
        verified: true,
      },
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - visible on mobile only */}
            <div className="lg:hidden">
              <h1 className="text-2xl font-zen font-bold bg-gradient-to-r from-[#7E22CE] to-[#14B8A6] text-transparent bg-clip-text">
                MKET
              </h1>
            </div>

            {/* Search bar - desktop */}
            <div className="hidden lg:block flex-1 max-w-2xl">
              <Input
                type="search"
                placeholder="Search for products, sellers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<FaSearch />}
                iconPosition="left"
                fullWidth
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link to="/dashboard/post" className="hidden lg:block">
                <Button icon={<FaPlus />} iconPosition="left" size="md">
                  Post Item
                </Button>
              </Link>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <FaBell className="text-xl text-[#4B5563]" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>

          {/* Search bar - mobile */}
          <div className="lg:hidden pb-4">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<FaSearch />}
              iconPosition="left"
              fullWidth
            />
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-inter font-bold text-[#111827] flex items-center gap-2">
              <FaTags className="text-[#7E22CE]" />
              Categories
            </h2>
            <Link
              to="/dashboard/categories"
              className="text-sm font-inter text-[#7E22CE] hover:text-[#6b1fb8] font-medium"
            >
              View All
            </Link>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          >
            {categories.map((category) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={`/dashboard/category/${category.id}`}
                  className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#7E22CE] hover:shadow-md transition-all group"
                >
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h3 className="font-inter font-semibold text-[#111827] text-sm group-hover:text-[#7E22CE] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-[#4B5563] font-instrument mt-1">
                    {category.count} items
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Trending Products */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-inter font-bold text-[#111827] flex items-center gap-2">
              <FaFire className="text-orange-500" />
              Trending Now
            </h2>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:border-[#7E22CE] hover:bg-[#7E22CE]/5 transition-all text-sm font-inter text-[#4B5563] hover:text-[#7E22CE]">
              <FaFilter />
              <span>Filter</span>
            </button>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {products.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard
                  product={product}
                  onClick={() => console.log("Product clicked:", product.id)}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Load more */}
          <div className="flex justify-center mt-8">
            <Button variant="outline" size="lg">
              Load More Products
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardHome;
