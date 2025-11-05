import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaFire } from "react-icons/fa";
import ProductCard from "./ProductCard";
import Button from "../shared/Button";

const ProductsSection = ({
  products,
  loading,
  hasSearched,
  searchQuery,
  activeFiltersCount,
  clearAllFilters,
}) => {
  const navigate = useNavigate();

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

      {/* Loading spinner */}
      {loading && products.length === 0 ? (
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7E22CE]"></div>
        </div>
      ) : products.length > 0 ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-wrap gap-3"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.375rem)] lg:w-[calc(33.333%-0.5rem)] xl:w-[calc(25%-0.5625rem)]"
            >
              <ProductCard
                product={product}
                onClick={() => navigate(`/dashboard/product/${product.id}`)}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        // No products found
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
  );
};

export default ProductsSection;
