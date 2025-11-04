// Categories data for MKET
export const categories = [
  {
    id: "electronics",
    name: "Electronics",
    icon: "📱",
    description: "Phones, laptops, gadgets, and accessories",
    color: "#7E22CE", // Purple
  },
  {
    id: "furniture",
    name: "Furniture",
    icon: "🪑",
    description: "Beds, chairs, tables, and home furniture",
    color: "#14B8A6", // Teal
  },
  {
    id: "books",
    name: "Books & Stationery",
    icon: "📚",
    description: "Textbooks, novels, notes, and stationery",
    color: "#F59E0B", // Amber
  },
  {
    id: "fashion",
    name: "Fashion & Clothing",
    icon: "👕",
    description: "Clothes, shoes, bags, and accessories",
    color: "#EC4899", // Pink
  },
  {
    id: "sports",
    name: "Sports & Fitness",
    icon: "⚽",
    description: "Sports equipment, gym gear, and accessories",
    color: "#10B981", // Green
  },
  {
    id: "home",
    name: "Home & Kitchen",
    icon: "🏠",
    description: "Kitchen items, utensils, and home decor",
    color: "#EF4444", // Red
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    icon: "💄",
    description: "Cosmetics, skincare, and personal care items",
    color: "#8B5CF6", // Violet
  },
  {
    id: "vehicles",
    name: "Vehicles & Parts",
    icon: "🚲",
    description: "Bicycles, motorcycles, and vehicle accessories",
    color: "#3B82F6", // Blue
  },
  {
    id: "food",
    name: "Food & Groceries",
    icon: "🍔",
    description: "Snacks, groceries, and food items",
    color: "#F97316", // Orange
  },
  {
    id: "services",
    name: "Services",
    icon: "🔧",
    description: "Repair, tutoring, and other services",
    color: "#6366F1", // Indigo
  },
  {
    id: "music",
    name: "Music & Instruments",
    icon: "🎸",
    description: "Musical instruments and audio equipment",
    color: "#A855F7", // Purple
  },
  {
    id: "other",
    name: "Other",
    icon: "📦",
    description: "Miscellaneous items",
    color: "#6B7280", // Gray
  },
];

// Get category by ID
export const getCategoryById = (id) => {
  return categories.find((cat) => cat.id === id);
};

// Get category name by ID
export const getCategoryName = (id) => {
  const category = getCategoryById(id);
  return category ? category.name : "Unknown";
};

// Get category icon by ID
export const getCategoryIcon = (id) => {
  const category = getCategoryById(id);
  return category ? category.icon : "📦";
};

// Get category color by ID
export const getCategoryColor = (id) => {
  const category = getCategoryById(id);
  return category ? category.color : "#6B7280";
};
