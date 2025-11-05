import React, { useState, useEffect, useRef } from "react";
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

const DashboardHome = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // Committed search query
  const [searchInput, setSearchInput] = useState(""); // What user is typing
  const [hasSearched, setHasSearched] = useState(false); // Has user performed a search
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState({
    products: [],
    categories: [],
  });
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showDesktopFilters, setShowDesktopFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "all",
    condition: "all",
    priceRange: [0, 1000000],
    location: "all",
    sortBy: "relevance",
  });

  const searchRef = useRef(null);
  const suggestionTimeoutRef = useRef(null);

  // Load all products on mount
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await productsService.getAllProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Generate suggestions as user types (NO auto-search)
  useEffect(() => {
    if (suggestionTimeoutRef.current) {
      clearTimeout(suggestionTimeoutRef.current);
    }

    if (searchInput.trim().length < 2) {
      setSuggestions({ products: [], categories: [] });
      setShowSuggestions(false);
      return;
    }

    suggestionTimeoutRef.current = setTimeout(() => {
      const query = searchInput.toLowerCase().trim();

      // Get matching products (limit to 5 for suggestions)
      const matchingProducts = products
        .filter(
          (product) =>
            product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        )
        .slice(0, 5);

      // Get matching categories
      const matchingCategories = categoriesData
        .filter((cat) => cat.name.toLowerCase().includes(query))
        .slice(0, 3);

      setSuggestions({
        products: matchingProducts,
        categories: matchingCategories,
      });
      setShowSuggestions(true);
    }, 300);

    return () => {
      if (suggestionTimeoutRef.current) {
        clearTimeout(suggestionTimeoutRef.current);
      }
    };
  }, [searchInput, products]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Apply filters to search results AFTER search
  useEffect(() => {
    if (hasSearched && searchQuery) {
      performSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // Perform actual search
  const performSearch = async () => {
    if (!searchInput.trim() && !hasSearched) return; // Don't search if input is empty and no previous search

    setSearchLoading(true);
    setHasSearched(true);
    setShowSuggestions(false);
    setSearchQuery(searchInput);

    try {
      const results = await productsService.searchProducts(
        searchInput,
        filters
      );
      setFilteredProducts(results);
    } catch (error) {
      console.error("Search error:", error);
      setFilteredProducts([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = async (suggestion, type) => {
    if (type === "product") {
      setSearchInput(suggestion.title);
      setShowSuggestions(false);
      setSearchQuery(suggestion.title);
      setHasSearched(true);
      setSearchLoading(true);

      try {
        const results = await productsService.searchProducts(
          suggestion.title,
          filters
        );
        setFilteredProducts(results);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setSearchLoading(false);
      }
    } else if (type === "category") {
      const newFilters = { ...filters, category: suggestion.id };
      setSearchInput(suggestion.name);
      setFilters(newFilters);
      setShowSuggestions(false);
      setSearchQuery(suggestion.name);
      setHasSearched(true);
      setSearchLoading(true);

      try {
        const results = await productsService.searchProducts(
          suggestion.name,
          newFilters
        );
        setFilteredProducts(results);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setSearchLoading(false);
      }
    }
  };

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
    setSearchInput("");
    setHasSearched(false);
    setFilteredProducts(products); // Show all products
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
    setHasSearched(false);
    setSuggestions({ products: [], categories: [] });
    setShowSuggestions(false);
    setFilteredProducts(products); // Show all products
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
            <div
              className="hidden lg:flex flex-1 max-w-2xl items-center gap-2"
              ref={searchRef}
            >
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Search for products, sellers, categories..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() =>
                    searchInput.length >= 2 && setShowSuggestions(true)
                  }
                  icon={<FaSearch />}
                  iconPosition="left"
                  fullWidth
                />
                {searchInput && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <FaTimes className="text-gray-400 hover:text-gray-600" />
                  </button>
                )}

                {/* Suggestions Dropdown - Desktop */}
                <AnimatePresence>
                  {showSuggestions &&
                    (suggestions.products.length > 0 ||
                      suggestions.categories.length > 0) && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden max-h-96 overflow-y-auto"
                      >
                        {/* Categories */}
                        {suggestions.categories.length > 0 && (
                          <div className="border-b border-gray-100">
                            <div className="px-4 py-2 bg-gray-50">
                              <p className="text-xs font-semibold text-gray-500 uppercase">
                                Categories
                              </p>
                            </div>
                            {suggestions.categories.map((category) => (
                              <button
                                key={category.id}
                                onClick={() =>
                                  handleSuggestionClick(category, "category")
                                }
                                className="w-full px-4 py-3 hover:bg-purple-50 transition-colors text-left flex items-center gap-3"
                              >
                                <span className="text-2xl">
                                  {category.icon}
                                </span>
                                <div>
                                  <p className="font-inter font-medium text-gray-900">
                                    {category.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {category.count} products
                                  </p>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Products */}
                        {suggestions.products.length > 0 && (
                          <div>
                            <div className="px-4 py-2 bg-gray-50">
                              <p className="text-xs font-semibold text-gray-500 uppercase">
                                Products
                              </p>
                            </div>
                            {suggestions.products.map((product) => (
                              <button
                                key={product.id}
                                onClick={() =>
                                  handleSuggestionClick(product, "product")
                                }
                                className="w-full px-4 py-3 hover:bg-purple-50 transition-colors text-left flex items-center gap-3"
                              >
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="font-inter font-medium text-gray-900 truncate">
                                    {product.title}
                                  </p>
                                  <p className="text-sm text-[#7E22CE] font-semibold">
                                    ₦{product.price.toLocaleString()}
                                  </p>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Hint */}
                        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                          <p className="text-xs text-gray-500 text-center">
                            Press{" "}
                            <kbd className="px-2 py-1 bg-white rounded border border-gray-300 font-mono">
                              Enter
                            </kbd>{" "}
                            to search
                          </p>
                        </div>
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>

              <Button
                onClick={performSearch}
                disabled={searchLoading || !searchInput.trim()}
                size="md"
              >
                {searchLoading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  "Search"
                )}
              </Button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Filter button - Only show after search */}
              {hasSearched && (
                <button
                  onClick={() => setShowDesktopFilters(!showDesktopFilters)}
                  className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-gray-200 hover:border-[#7E22CE] transition-colors relative"
                >
                  <FaSlidersH className="text-[#7E22CE]" />
                  {activeFiltersCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#7E22CE] text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              )}

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
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  icon={<FaSearch />}
                  iconPosition="left"
                  fullWidth
                />
                {searchInput && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                  >
                    <FaTimes className="text-gray-400" />
                  </button>
                )}
              </div>

              {/* Mobile search & filter buttons */}
              <Button
                onClick={performSearch}
                disabled={searchLoading || !searchInput.trim()}
                size="sm"
              >
                {searchLoading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaSearch />
                )}
              </Button>

              {hasSearched && (
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-2 rounded-lg border-2 border-gray-200 hover:border-[#7E22CE] transition-colors relative"
                >
                  <FaSlidersH className="text-[#7E22CE]" />
                  {activeFiltersCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#7E22CE] text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Desktop Filter Sidebar - Only show after search */}
          {hasSearched && showDesktopFilters && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "16rem", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="hidden lg:block shrink-0"
            >
              <div className="sticky top-24 space-y-4 w-64">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-inter font-bold text-[#111827]">
                      Filters
                    </h3>
                    {activeFiltersCount > 0 && (
                      <button
                        onClick={clearAllFilters}
                        className="text-xs text-[#7E22CE] hover:text-[#6b1fb8] font-medium"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  {/* Category */}
                  <div className="mb-4">
                    <h4 className="font-inter font-semibold text-sm mb-2">
                      Category
                    </h4>
                    <select
                      value={filters.category}
                      onChange={(e) =>
                        handleFilterChange("category", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#7E22CE] focus:border-transparent"
                    >
                      <option value="all">All Categories</option>
                      {categoriesData.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Condition */}
                  <div className="mb-4">
                    <h4 className="font-inter font-semibold text-sm mb-2">
                      Condition
                    </h4>
                    <div className="space-y-2">
                      {conditions.map((condition) => (
                        <label
                          key={condition.id}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="condition"
                            value={condition.id}
                            checked={filters.condition === condition.id}
                            onChange={(e) =>
                              handleFilterChange("condition", e.target.value)
                            }
                            className="w-4 h-4 text-[#7E22CE]"
                          />
                          <span className="text-sm text-[#4B5563]">
                            {condition.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-4">
                    <h4 className="font-inter font-semibold text-sm mb-2">
                      Price Range
                    </h4>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.priceRange[0]}
                        onChange={(e) =>
                          handleFilterChange("priceRange", [
                            parseInt(e.target.value) || 0,
                            filters.priceRange[1],
                          ])
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                      <span>-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.priceRange[1]}
                        onChange={(e) =>
                          handleFilterChange("priceRange", [
                            filters.priceRange[0],
                            parseInt(e.target.value) || 1000000,
                          ])
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="mb-4">
                    <h4 className="font-inter font-semibold text-sm mb-2">
                      Location
                    </h4>
                    <select
                      value={filters.location}
                      onChange={(e) =>
                        handleFilterChange("location", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#7E22CE] focus:border-transparent"
                    >
                      {locations.map((loc) => (
                        <option key={loc.id} value={loc.id}>
                          {loc.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort */}
                  <div>
                    <h4 className="font-inter font-semibold text-sm mb-2">
                      Sort By
                    </h4>
                    <select
                      value={filters.sortBy}
                      onChange={(e) =>
                        handleFilterChange("sortBy", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#7E22CE] focus:border-transparent"
                    >
                      {sortOptions.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.aside>
          )}

          {/* Mobile Filter Overlay */}
          <AnimatePresence>
            {showFilters && hasSearched && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowFilters(false)}
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 lg:hidden overflow-y-auto"
                >
                  <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
                    <h3 className="font-inter font-bold text-[#111827]">
                      Filters
                    </h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-2"
                    >
                      <FaTimes className="text-[#4B5563]" />
                    </button>
                  </div>

                  <div className="p-4 space-y-4">
                    {/* Same filters as desktop */}
                    <div>
                      <h4 className="font-inter font-semibold text-sm mb-2">
                        Category
                      </h4>
                      <select
                        value={filters.category}
                        onChange={(e) =>
                          handleFilterChange("category", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="all">All Categories</option>
                        {categoriesData.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <h4 className="font-inter font-semibold text-sm mb-2">
                        Condition
                      </h4>
                      <div className="space-y-2">
                        {conditions.map((condition) => (
                          <label
                            key={condition.id}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="condition-mobile"
                              value={condition.id}
                              checked={filters.condition === condition.id}
                              onChange={(e) =>
                                handleFilterChange("condition", e.target.value)
                              }
                              className="w-4 h-4 text-[#7E22CE]"
                            />
                            <span className="text-sm text-[#4B5563]">
                              {condition.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-inter font-semibold text-sm mb-2">
                        Price Range
                      </h4>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={filters.priceRange[0]}
                          onChange={(e) =>
                            handleFilterChange("priceRange", [
                              parseInt(e.target.value) || 0,
                              filters.priceRange[1],
                            ])
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                        <span>-</span>
                        <input
                          type="number"
                          placeholder="Max"
                          value={filters.priceRange[1]}
                          onChange={(e) =>
                            handleFilterChange("priceRange", [
                              filters.priceRange[0],
                              parseInt(e.target.value) || 1000000,
                            ])
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-inter font-semibold text-sm mb-2">
                        Location
                      </h4>
                      <select
                        value={filters.location}
                        onChange={(e) =>
                          handleFilterChange("location", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        {locations.map((loc) => (
                          <option key={loc.id} value={loc.id}>
                            {loc.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <h4 className="font-inter font-semibold text-sm mb-2">
                        Sort By
                      </h4>
                      <select
                        value={filters.sortBy}
                        onChange={(e) =>
                          handleFilterChange("sortBy", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        {sortOptions.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="sticky bottom-0 bg-white border-t p-4 flex gap-3">
                    <Button
                      variant="outline"
                      onClick={clearAllFilters}
                      fullWidth
                    >
                      Clear All
                    </Button>
                    <Button onClick={() => setShowFilters(false)} fullWidth>
                      Apply
                    </Button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Only show categories if no search has been performed */}
            {!hasSearched && (
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
            )}

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
                  {hasSearched ? (
                    <>
                      <FaSearch className="text-[#7E22CE]" />
                      Search Results
                      {searchQuery && (
                        <span className="text-sm font-normal text-[#4B5563]">
                          for "{searchQuery}"
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      <FaFire className="text-orange-500" />
                      Trending Now
                    </>
                  )}
                </h2>
                {hasSearched && activeFiltersCount > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#4B5563]">
                      {activeFiltersCount} filters active
                    </span>
                  </div>
                )}
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
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
