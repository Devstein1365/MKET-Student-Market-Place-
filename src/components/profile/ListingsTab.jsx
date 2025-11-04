import React from "react";
import { FaBox } from "react-icons/fa";
import ProductCard from "../dashboard/ProductCard";
import Card from "../shared/Card";
import Button from "../shared/Button";
import { motion } from "framer-motion";

const ListingsTab = ({ listings, loading, onNavigate }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7E22CE]"></div>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <Card>
        <div className="text-center py-12">
          <FaBox className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-inter font-semibold text-gray-900 mb-2">
            No listings yet
          </h3>
          <p className="text-gray-600 font-instrument mb-4">
            Start selling by posting your first item
          </p>
          <Button onClick={() => onNavigate("/dashboard/post")}>
            Post an Item
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {listings.map((product) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ProductCard
            product={product}
            onClick={() => onNavigate(`/dashboard/product/${product.id}`)}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ListingsTab;
