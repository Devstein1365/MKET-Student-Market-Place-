import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaTags, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { categories as categoriesData } from "../../data/categories";

const CategoryGrid = () => {
  const scrollContainerRef = React.useRef(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  // Check scroll position and available scroll space
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;

      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  React.useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      // Check scroll on mount and after render
      const timer = setTimeout(() => {
        checkScroll();
      }, 200);

      scrollContainer.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);

      return () => {
        clearTimeout(timer);
        scrollContainer.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative">
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

      <div className="relative px-0">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2.5 shadow-lg border border-gray-200 transition-all items-center justify-center ${
            canScrollLeft
              ? "opacity-100 hover:bg-gray-50 hover:scale-110 cursor-pointer"
              : "opacity-30 cursor-not-allowed"
          }`}
          aria-label="Scroll left"
        >
          <FaChevronLeft className="text-[#7E22CE] text-sm" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2.5 shadow-lg border border-gray-200 transition-all items-center justify-center ${
            canScrollRight
              ? "opacity-100 hover:bg-gray-50 hover:scale-110 cursor-pointer"
              : "opacity-30 cursor-not-allowed"
          }`}
          aria-label="Scroll right"
        >
          <FaChevronRight className="text-[#7E22CE] text-sm" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {categoriesData.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex-shrink-0 w-[130px] sm:w-[140px]"
            >
              <Link
                to={`/dashboard/categories/${category.id}`}
                className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#7E22CE] hover:shadow-md transition-all h-full"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-inter font-semibold text-[#111827] text-sm hover:text-[#7E22CE] transition-colors line-clamp-1">
                  {category.name}
                </h3>
                <p className="text-xs text-[#4B5563] font-instrument mt-1">
                  {category.count} items
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
