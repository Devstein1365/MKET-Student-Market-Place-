import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaTags, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { categories as categoriesData } from "../../data/categories";

const CategoryGrid = () => {
  const scrollContainerRef = React.useRef(null);
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(true);

  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  React.useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScroll);
      checkScroll(); // Initial check
      return () => scrollContainer.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 280; // Width of card + gap
      const newPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section className="relative overflow-hidden">
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

      <div className="relative">
        {/* Left Arrow - Always visible when there's content to scroll */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg border border-gray-200 transition-all hover:scale-110"
            aria-label="Scroll left"
          >
            <FaChevronLeft className="text-[#7E22CE]" />
          </button>
        )}

        {/* Right Arrow - Always visible when there's content to scroll */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg border border-gray-200 transition-all hover:scale-110"
            aria-label="Scroll right"
          >
            <FaChevronRight className="text-[#7E22CE]" />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-scroll scrollbar-hide scroll-smooth pb-2 px-1"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {categoriesData.map((category, index) => (
            <motion.div
              key={category.id}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              transition={{ delay: index * 0.05 }}
              className="flex-shrink-0 w-[130px] sm:w-[140px]"
            >
              <Link
                to={`/dashboard/categories/${category.id}`}
                className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#7E22CE] hover:shadow-md transition-all group/card h-full"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-inter font-semibold text-[#111827] text-sm group-hover/card:text-[#7E22CE] transition-colors line-clamp-1">
                  {category.name}
                </h3>
                <p className="text-xs text-[#4B5563] font-instrument mt-1">
                  {category.count} items
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Gradient Overlays */}
        {showLeftArrow && (
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
        )}
        {showRightArrow && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
        )}
      </div>
    </section>
  );
};

export default CategoryGrid;
