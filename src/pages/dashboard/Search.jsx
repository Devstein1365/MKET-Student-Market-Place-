import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaFilter,
  FaTimes,
  FaSlidersH,
  FaMapMarkerAlt,
  FaSortAmountDown,
  FaThLarge,
  FaList,
} from "react-icons/fa";
import ProductCard from "../../components/dashboard/ProductCard";
import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";
import Badge from "../../components/shared/Badge";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showDesktopFilters, setShowDesktopFilters] = useState(true); // Desktop filter sidebar toggle
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [filters, setFilters] = useState({
    category: "all",
    condition: "all",
    priceRange: [0, 1000000],
    location: "all",
    sortBy: "relevance",
  });

  // Mock data - categories
  const categories = [
    { id: "all", name: "All Categories", count: 1234 },
    { id: "electronics", name: "Electronics", count: 245 },
    { id: "books", name: "Books & Stationery", count: 189 },
    { id: "fashion", name: "Fashion & Apparel", count: 312 },
    { id: "furniture", name: "Furniture", count: 78 },
    { id: "sports", name: "Sports & Fitness", count: 156 },
    { id: "accessories", name: "Accessories", count: 92 },
    { id: "gadgets", name: "Tech Gadgets", count: 203 },
  ];

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

  // Mock search results
  const searchResults = [
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
  ];

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
  };

  const activeFiltersCount = Object.values(filters).filter(
    (value) =>
      value !== "all" && value !== "relevance" && value !== filters.priceRange
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Search */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Search bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Search for products, sellers, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<FaSearch />}
                iconPosition="left"
                fullWidth
              />
            </div>

            {/* Filter toggle button - Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden relative p-3 rounded-lg border-2 border-gray-200 hover:border-[#7E22CE] transition-colors"
            >
              <FaSlidersH className="text-[#7E22CE] text-lg" />
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#7E22CE] text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Results info and view toggle */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm text-[#4B5563] font-instrument">
                Found{" "}
                <span className="font-semibold text-[#111827]">
                  {searchResults.length}
                </span>{" "}
                results
              </p>
              {searchQuery && (
                <span className="text-sm text-[#4B5563] font-instrument">
                  for "
                  <span className="font-semibold text-[#7E22CE]">
                    {searchQuery}
                  </span>
                  "
                </span>
              )}
            </div>

            {/* View mode and filter toggles */}
            <div className="flex items-center gap-2">
              {/* Desktop filter toggle */}
              <button
                onClick={() => setShowDesktopFilters(!showDesktopFilters)}
                className={`hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg transition-all font-inter text-sm ${
                  showDesktopFilters
                    ? "bg-[#7E22CE] text-white"
                    : "bg-gray-100 text-[#4B5563] hover:bg-gray-200"
                }`}
                title={showDesktopFilters ? "Hide filters" : "Show filters"}
              >
                <FaSlidersH />
                <span className="hidden xl:inline">Filters</span>
                {activeFiltersCount > 0 && !showDesktopFilters && (
                  <span className="w-5 h-5 bg-[#7E22CE] text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <div className="w-px h-6 bg-gray-300 hidden lg:block"></div>

              {/* View mode toggles */}
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-[#7E22CE] text-white"
                    : "bg-gray-100 text-[#4B5563] hover:bg-gray-200"
                }`}
              >
                <FaThLarge />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-[#7E22CE] text-white"
                    : "bg-gray-100 text-[#4B5563] hover:bg-gray-200"
                }`}
              >
                <FaList />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar - Desktop with collapse */}
          <AnimatePresence mode="wait">
            {showDesktopFilters && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "16rem", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="hidden lg:block shrink-0 overflow-hidden"
              >
                <div className="sticky top-24 space-y-6 w-64">
                  {/* Filter header */}
                  <div className="flex items-center justify-between bg-white rounded-lg p-4 border border-gray-200">
                    <h2 className="text-lg font-inter font-bold text-[#111827] flex items-center gap-2">
                      <FaFilter className="text-[#7E22CE]" />
                      Filters
                    </h2>
                    <div className="flex items-center gap-2">
                      {activeFiltersCount > 0 && (
                        <button
                          onClick={clearAllFilters}
                          className="text-xs text-[#7E22CE] hover:text-[#6b1fb8] font-inter font-medium"
                        >
                          Clear All
                        </button>
                      )}
                      <button
                        onClick={() => setShowDesktopFilters(false)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        title="Hide filters"
                      >
                        <FaTimes className="text-[#4B5563] text-sm" />
                      </button>
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h3 className="font-inter font-semibold text-[#111827] mb-3 text-sm">
                      Category
                    </h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {categories.map((category) => (
                        <label
                          key={category.id}
                          className="flex items-center justify-between cursor-pointer group"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="category"
                              value={category.id}
                              checked={filters.category === category.id}
                              onChange={(e) =>
                                handleFilterChange("category", e.target.value)
                              }
                              className="w-4 h-4 text-[#7E22CE] border-gray-300 focus:ring-[#7E22CE]"
                            />
                            <span className="text-sm text-[#4B5563] group-hover:text-[#111827] font-instrument">
                              {category.name}
                            </span>
                          </div>
                          <Badge variant="gray" size="sm">
                            {category.count}
                          </Badge>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Condition Filter */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h3 className="font-inter font-semibold text-[#111827] mb-3 text-sm">
                      Condition
                    </h3>
                    <div className="space-y-2">
                      {conditions.map((condition) => (
                        <label
                          key={condition.id}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          <input
                            type="radio"
                            name="condition"
                            value={condition.id}
                            checked={filters.condition === condition.id}
                            onChange={(e) =>
                              handleFilterChange("condition", e.target.value)
                            }
                            className="w-4 h-4 text-[#7E22CE] border-gray-300 focus:ring-[#7E22CE]"
                          />
                          <span className="text-sm text-[#4B5563] group-hover:text-[#111827] font-instrument">
                            {condition.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h3 className="font-inter font-semibold text-[#111827] mb-3 text-sm">
                      Price Range
                    </h3>
                    <div className="space-y-3">
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-instrument focus:ring-2 focus:ring-[#7E22CE] focus:border-transparent outline-none"
                        />
                        <span className="text-[#4B5563]">-</span>
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-instrument focus:ring-2 focus:ring-[#7E22CE] focus:border-transparent outline-none"
                        />
                      </div>
                      <div className="text-xs text-[#4B5563] font-instrument">
                        ₦{filters.priceRange[0].toLocaleString()} - ₦
                        {filters.priceRange[1].toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Location Filter */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h3 className="font-inter font-semibold text-[#111827] mb-3 text-sm flex items-center gap-2">
                      <FaMapMarkerAlt className="text-[#14B8A6]" />
                      Location
                    </h3>
                    <div className="space-y-2">
                      {locations.map((location) => (
                        <label
                          key={location.id}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          <input
                            type="radio"
                            name="location"
                            value={location.id}
                            checked={filters.location === location.id}
                            onChange={(e) =>
                              handleFilterChange("location", e.target.value)
                            }
                            className="w-4 h-4 text-[#7E22CE] border-gray-300 focus:ring-[#7E22CE]"
                          />
                          <span className="text-sm text-[#4B5563] group-hover:text-[#111827] font-instrument">
                            {location.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Sort By */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h3 className="font-inter font-semibold text-[#111827] mb-3 text-sm flex items-center gap-2">
                      <FaSortAmountDown className="text-[#7E22CE]" />
                      Sort By
                    </h3>
                    <div className="space-y-2">
                      {sortOptions.map((option) => (
                        <label
                          key={option.id}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          <input
                            type="radio"
                            name="sortBy"
                            value={option.id}
                            checked={filters.sortBy === option.id}
                            onChange={(e) =>
                              handleFilterChange("sortBy", e.target.value)
                            }
                            className="w-4 h-4 text-[#7E22CE] border-gray-300 focus:ring-[#7E22CE]"
                          />
                          <span className="text-sm text-[#4B5563] group-hover:text-[#111827] font-instrument">
                            {option.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Filter toggle button when hidden - Desktop */}
          {!showDesktopFilters && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setShowDesktopFilters(true)}
              className="hidden lg:flex items-center gap-2 px-4 py-3 bg-white border-2 border-[#7E22CE] rounded-lg hover:bg-[#7E22CE] hover:text-white text-[#7E22CE] transition-all font-inter font-medium sticky top-24 h-fit"
              title="Show filters"
            >
              <FaFilter />
              <span>Show Filters</span>
              {activeFiltersCount > 0 && (
                <Badge variant="primary" size="sm" rounded>
                  {activeFiltersCount}
                </Badge>
              )}
            </motion.button>
          )}

          {/* Mobile Filter Drawer */}
          <AnimatePresence>
            {showFilters && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowFilters(false)}
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                />

                {/* Drawer */}
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 lg:hidden overflow-y-auto"
                >
                  <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                    <h2 className="text-lg font-inter font-bold text-[#111827] flex items-center gap-2">
                      <FaFilter className="text-[#7E22CE]" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <Badge variant="primary" size="sm" rounded>
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </h2>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <FaTimes className="text-[#4B5563]" />
                    </button>
                  </div>

                  <div className="p-4 space-y-6">
                    {/* Same filter content as desktop sidebar */}
                    {/* Category Filter */}
                    <div>
                      <h3 className="font-inter font-semibold text-[#111827] mb-3">
                        Category
                      </h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <label
                            key={category.id}
                            className="flex items-center justify-between cursor-pointer group"
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="category-mobile"
                                value={category.id}
                                checked={filters.category === category.id}
                                onChange={(e) =>
                                  handleFilterChange("category", e.target.value)
                                }
                                className="w-4 h-4 text-[#7E22CE] border-gray-300 focus:ring-[#7E22CE]"
                              />
                              <span className="text-sm text-[#4B5563] group-hover:text-[#111827] font-instrument">
                                {category.name}
                              </span>
                            </div>
                            <Badge variant="gray" size="sm">
                              {category.count}
                            </Badge>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Condition Filter */}
                    <div>
                      <h3 className="font-inter font-semibold text-[#111827] mb-3">
                        Condition
                      </h3>
                      <div className="space-y-2">
                        {conditions.map((condition) => (
                          <label
                            key={condition.id}
                            className="flex items-center gap-2 cursor-pointer group"
                          >
                            <input
                              type="radio"
                              name="condition-mobile"
                              value={condition.id}
                              checked={filters.condition === condition.id}
                              onChange={(e) =>
                                handleFilterChange("condition", e.target.value)
                              }
                              className="w-4 h-4 text-[#7E22CE] border-gray-300 focus:ring-[#7E22CE]"
                            />
                            <span className="text-sm text-[#4B5563] group-hover:text-[#111827] font-instrument">
                              {condition.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Price Range Filter */}
                    <div>
                      <h3 className="font-inter font-semibold text-[#111827] mb-3">
                        Price Range
                      </h3>
                      <div className="space-y-3">
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-instrument focus:ring-2 focus:ring-[#7E22CE] focus:border-transparent outline-none"
                          />
                          <span className="text-[#4B5563]">-</span>
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-instrument focus:ring-2 focus:ring-[#7E22CE] focus:border-transparent outline-none"
                          />
                        </div>
                        <div className="text-xs text-[#4B5563] font-instrument">
                          ₦{filters.priceRange[0].toLocaleString()} - ₦
                          {filters.priceRange[1].toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Location Filter */}
                    <div>
                      <h3 className="font-inter font-semibold text-[#111827] mb-3 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-[#14B8A6]" />
                        Location
                      </h3>
                      <div className="space-y-2">
                        {locations.map((location) => (
                          <label
                            key={location.id}
                            className="flex items-center gap-2 cursor-pointer group"
                          >
                            <input
                              type="radio"
                              name="location-mobile"
                              value={location.id}
                              checked={filters.location === location.id}
                              onChange={(e) =>
                                handleFilterChange("location", e.target.value)
                              }
                              className="w-4 h-4 text-[#7E22CE] border-gray-300 focus:ring-[#7E22CE]"
                            />
                            <span className="text-sm text-[#4B5563] group-hover:text-[#111827] font-instrument">
                              {location.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Sort By */}
                    <div>
                      <h3 className="font-inter font-semibold text-[#111827] mb-3 flex items-center gap-2">
                        <FaSortAmountDown className="text-[#7E22CE]" />
                        Sort By
                      </h3>
                      <div className="space-y-2">
                        {sortOptions.map((option) => (
                          <label
                            key={option.id}
                            className="flex items-center gap-2 cursor-pointer group"
                          >
                            <input
                              type="radio"
                              name="sortBy-mobile"
                              value={option.id}
                              checked={filters.sortBy === option.id}
                              onChange={(e) =>
                                handleFilterChange("sortBy", e.target.value)
                              }
                              className="w-4 h-4 text-[#7E22CE] border-gray-300 focus:ring-[#7E22CE]"
                            />
                            <span className="text-sm text-[#4B5563] group-hover:text-[#111827] font-instrument">
                              {option.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex gap-3">
                    <Button
                      variant="outline"
                      onClick={clearAllFilters}
                      fullWidth
                    >
                      Clear All
                    </Button>
                    <Button onClick={() => setShowFilters(false)} fullWidth>
                      Apply Filters
                    </Button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Results Grid */}
          <div className="flex-1 min-w-0">
            {/* Active filters badges */}
            {activeFiltersCount > 0 && (
              <div className="mb-4 flex items-center gap-2 flex-wrap">
                <span className="text-sm font-instrument text-[#4B5563]">
                  Active filters:
                </span>
                {filters.category !== "all" && (
                  <Badge variant="primary" className="flex items-center gap-1">
                    {categories.find((c) => c.id === filters.category)?.name}
                    <button
                      onClick={() => handleFilterChange("category", "all")}
                      className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                    >
                      <FaTimes className="text-xs" />
                    </button>
                  </Badge>
                )}
                {filters.condition !== "all" && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {conditions.find((c) => c.id === filters.condition)?.name}
                    <button
                      onClick={() => handleFilterChange("condition", "all")}
                      className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                    >
                      <FaTimes className="text-xs" />
                    </button>
                  </Badge>
                )}
                {filters.location !== "all" && (
                  <Badge variant="success" className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-xs" />
                    {locations.find((l) => l.id === filters.location)?.name}
                    <button
                      onClick={() => handleFilterChange("location", "all")}
                      className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                    >
                      <FaTimes className="text-xs" />
                    </button>
                  </Badge>
                )}
              </div>
            )}

            {/* Products grid */}
            {searchResults.length > 0 ? (
              <motion.div
                layout
                className={`grid gap-4 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {searchResults.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProductCard
                      product={product}
                      onClick={() =>
                        console.log("Product clicked:", product.id)
                      }
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FaSearch className="text-4xl text-[#4B5563]" />
                </div>
                <h3 className="text-xl font-inter font-bold text-[#111827] mb-2">
                  No products found
                </h3>
                <p className="text-[#4B5563] font-instrument mb-4 max-w-md">
                  Try adjusting your search or filters to find what you're
                  looking for.
                </p>
                <Button variant="outline" onClick={clearAllFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Load more */}
            {searchResults.length > 0 && (
              <div className="flex justify-center mt-8">
                <Button variant="outline" size="lg">
                  Load More Results
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
