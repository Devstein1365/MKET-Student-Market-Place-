import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  FaPlus,
  FaBell,
  FaFire,
  FaTags,
  FaTimes,
  FaSlidersH,
  FaMapMarkerAlt,
  FaSortAmountDown,
  FaSpinner,
} from "react-icons/fa";
import ProductCard from "../../components/dashboard/ProductCard";
import Button from "../../components/shared/Button";
import Input from "../../components/shared/Input";
import Badge from "../../components/shared/Badge";
import productsService from "../../services/productsService";
import { categories as categoriesData } from "../../data/categories";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const DashboardHome = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showDesktopFilters, setShowDesktopFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "all",
    condition: "all",
    priceRange: [0, 1000000],
    location: "all",
    sortBy: "relevance",
  });

  // Use infinite scroll hook
  const {
    data: products,
    loading,
    hasMore,
    error,
  } = useInfiniteScroll(productsService.getAllProducts, 12);

  const [filteredProducts, setFilteredProducts] = useState([]);

  // Handle search and filters
  useEffect(() => {
    // If no products loaded yet, don't do anything
    if (products.length === 0) return;

    // If search is cleared and all filters are default, show all products immediately
    if (
      !searchQuery &&
      filters.category === "all" &&
      filters.condition === "all" &&
      filters.location === "all" &&
      filters.sortBy === "relevance"
    ) {
      setFilteredProducts(products); // Reset to show all products
      return;
    }

    // Apply search and filters with debounce
    const applySearchAndFilters = async () => {
      try {
        const results = await productsService.searchProducts(
          searchQuery,
          filters
        );
        setFilteredProducts(results);
      } catch (error) {
        console.error("Error filtering products:", error);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(() => {
      applySearchAndFilters();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, filters, products]);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      category: "all",
      condition: "all",
      priceRange: [0, 1000000],
      location: "all",
      sortBy: "relevance",
    });
    setSearchQuery("");
  };

  const activeFiltersCount = Object.values(filters).filter(
    (value) =>
      value !== "all" && value !== "relevance" && value !== filters.priceRange
  ).length;

  // Filter options data
  const conditions = [
    { id: "all", name: "All Conditions" },
    { id: "new", name: "Brand New" },
    { id: "used", name: "Used - Like New" },
    { id: "fairly-used", name: "Fairly Used" },
  ];

  const locations = [
    { id: "all", name: "All Locations" },
    { id: "bosso", name: "Bosso Campus" },
    { id: "main", name: "Main Campus" },
    { id: "gidan-kwano", name: "Gidan Kwano" },
    { id: "tunga", name: "Tunga" },
    { id: "maitumbi", name: "Maitumbi" },
  ];

  const sortOptions = [
    { id: "relevance", name: "Most Relevant" },
    { id: "newest", name: "Newest First" },
    { id: "price-low", name: "Price: Low to High" },
    { id: "price-high", name: "Price: High to Low" },
    { id: "popular", name: "Most Popular" },
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
            {categoriesData.slice(0, 5).map((category) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={`/dashboard/categories/${category.id}`}
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

          {/* Show loading spinner only on initial load */}
          {loading && products.length === 0 ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7E22CE]"></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="flex flex-wrap gap-3"
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    className="w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.375rem)] lg:w-[calc(33.333%-0.5rem)] xl:w-[calc(25%-0.5625rem)]"
                  >
                    <ProductCard
                      product={product}
                      onClick={() =>
                        navigate(`/dashboard/product/${product.id}`)
                      }
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Loading indicator for infinite scroll */}
              {loading && (
                <div className="flex items-center justify-center py-8">
                  <FaSpinner className="animate-spin text-3xl text-[#7E22CE]" />
                  <span className="ml-3 text-[#4B5563] font-instrument">
                    Loading more products...
                  </span>
                </div>
              )}

              {/* No more products message */}
              {!hasMore && !loading && products.length > 0 && (
                <div className="text-center py-8">
                  <p className="text-[#6B7280] font-instrument">
                    🎉 You've seen all {products.length} products!
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaSearch className="text-4xl text-[#4B5563]" />
              </div>
              <h3 className="text-xl font-inter font-bold text-[#111827] mb-2">
                No products found
              </h3>
              <p className="text-[#4B5563] font-instrument mb-4 max-w-md">
                {searchQuery
                  ? `No results for "${searchQuery}". Try different keywords.`
                  : "Try adjusting your filters to see more products."}
              </p>
              <Button variant="outline" onClick={clearAllFilters}>
                Clear Filters
              </Button>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-red-600 font-instrument">{error}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default DashboardHome;
