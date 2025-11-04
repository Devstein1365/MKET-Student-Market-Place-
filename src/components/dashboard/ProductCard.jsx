import React from "react";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaMapMarkerAlt, FaEye } from "react-icons/fa";
import { useWishlist } from "../../context/WishlistContext";
import Card from "../shared/Card";
import Avatar from "../shared/Avatar";
import Badge from "../shared/Badge";

const ProductCard = ({ product, onClick }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <Card
      hoverable
      padding="none"
      className="overflow-hidden group"
      onClick={onClick}
    >
      {/* Product image */}
      <div className="p-2">
        <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-lg">
          <img
            src={product.image || "https://via.placeholder.com/400"}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {/* Wishlist button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:shadow-lg transition-all z-10"
          >
            {isWishlisted ? (
              <FaHeart className="text-red-500 text-lg" />
            ) : (
              <FaRegHeart className="text-[#4B5563] text-lg" />
            )}
          </motion.button>

          {/* Condition badge */}
          {product.condition && (
            <div className="absolute top-2 left-2">
              <Badge
                variant={product.condition === "New" ? "success" : "warning"}
                size="sm"
                rounded
              >
                {product.condition}
              </Badge>
            </div>
          )}

          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
              <div className="flex items-center gap-1 text-white text-sm">
                <FaEye />
                <span className="font-instrument">{product.views || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product details */}
      <div className="p-3">
        {/* Title */}
        <h3 className="font-inter font-semibold text-[#111827] text-sm mb-1 line-clamp-2 group-hover:text-[#7E22CE] transition-colors">
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-lg font-bold text-[#7E22CE] font-inter">
            ₦{product.price?.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[#4B5563] line-through font-instrument">
              ₦{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Location */}
        {product.location && (
          <div className="flex items-center gap-1 text-xs text-[#4B5563] mb-3">
            <FaMapMarkerAlt className="text-[#14B8A6]" />
            <span className="font-instrument truncate">{product.location}</span>
          </div>
        )}

        {/* Seller info */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          <Avatar
            src={product.seller?.avatar}
            alt={product.seller?.name}
            size="xs"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-[#111827] font-inter truncate">
              {product.seller?.name}
            </p>
            {product.seller?.verified && (
              <Badge variant="success" size="sm" className="mt-0.5">
                ✓ Verified
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
