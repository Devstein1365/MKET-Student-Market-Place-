// Mock Products Data Service
// This simulates API calls and will be replaced with real backend later

const mockProducts = [
  {
    id: 1,
    title: "iPhone 13 Pro Max 256GB - Excellent Condition",
    price: 450000,
    originalPrice: 520000,
    condition: "Used",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400",
    location: "Bosso Campus",
    views: 142,
    description:
      "iPhone 13 Pro Max in excellent condition. Battery health 95%. Comes with original charger and box. No scratches on screen.",
    seller: {
      id: 1,
      name: "Aisha Mohammed",
      avatar: null,
      verified: true,
    },
    createdAt: "2025-10-15T10:30:00Z",
  },
  {
    id: 2,
    title: "MacBook Pro 2021 M1 Chip - Like New",
    price: 780000,
    condition: "New",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    location: "Gidan Kwano",
    views: 289,
    description:
      "Brand new MacBook Pro M1. 8GB RAM, 256GB SSD. Still under warranty. Perfect for students and professionals.",
    seller: {
      id: 2,
      name: "Chukwudi Okafor",
      avatar: null,
      verified: true,
    },
    createdAt: "2025-10-20T14:20:00Z",
  },
  {
    id: 3,
    title: "Engineering Mathematics Textbook Set",
    price: 15000,
    condition: "Used",
    category: "books",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
    location: "Main Campus",
    views: 67,
    description:
      "Complete set of Engineering Mathematics books for MTH courses. Includes solution manuals.",
    seller: {
      id: 3,
      name: "Fatima Yusuf",
      avatar: null,
      verified: false,
    },
    createdAt: "2025-10-25T09:15:00Z",
  },
  {
    id: 4,
    title: "Gaming Laptop - ASUS ROG Strix G15",
    price: 650000,
    originalPrice: 750000,
    condition: "Used",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400",
    location: "Bosso Campus",
    views: 198,
    description:
      "ASUS ROG Strix G15 gaming laptop. RTX 3060, 16GB RAM, 512GB SSD. Perfect for gaming and heavy tasks.",
    seller: {
      id: 4,
      name: "Ibrahim Usman",
      avatar: null,
      verified: true,
    },
    createdAt: "2025-11-01T16:45:00Z",
  },
  {
    id: 5,
    title: "Study Desk with Chair - Wooden",
    price: 25000,
    condition: "Used",
    category: "furniture",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400",
    location: "Gidan Kwano",
    views: 45,
    description:
      "Sturdy wooden study desk with matching chair. Good condition. Ideal for hostel rooms.",
    seller: {
      id: 5,
      name: "Grace Nwankwo",
      avatar: null,
      verified: false,
    },
    createdAt: "2025-10-28T11:30:00Z",
  },
  {
    id: 6,
    title: "Samsung Galaxy S23 Ultra 512GB",
    price: 520000,
    condition: "New",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400",
    location: "Main Campus",
    views: 321,
    description:
      "Brand new Samsung Galaxy S23 Ultra. 512GB storage, 12GB RAM. Factory sealed with full warranty.",
    seller: {
      id: 6,
      name: "Daniel Adeyemi",
      avatar: null,
      verified: true,
    },
    createdAt: "2025-11-02T13:00:00Z",
  },
  {
    id: 7,
    title: "Nike Air Max 270 - Size 43",
    price: 35000,
    originalPrice: 45000,
    condition: "Used",
    category: "fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    location: "Bosso Campus",
    views: 89,
    description:
      "Original Nike Air Max 270 in great condition. Size 43 (US 9.5). Worn only a few times.",
    seller: {
      id: 7,
      name: "Emeka Johnson",
      avatar: null,
      verified: true,
    },
    createdAt: "2025-10-18T08:20:00Z",
  },
  {
    id: 8,
    title: "HP ProBook 450 G8 Laptop",
    price: 280000,
    condition: "Used",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400",
    location: "Main Campus",
    views: 156,
    description:
      "HP ProBook 450 G8. Intel i5 11th Gen, 8GB RAM, 512GB SSD. Perfect for students.",
    seller: {
      id: 8,
      name: "Sarah Ibrahim",
      avatar: null,
      verified: true,
    },
    createdAt: "2025-10-22T15:10:00Z",
  },
  {
    id: 9,
    title: "Calculus and Analytic Geometry - Thomas",
    price: 8000,
    condition: "Used",
    category: "books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    location: "Gidan Kwano",
    views: 43,
    description:
      "Thomas Calculus textbook in good condition. Perfect for MTH 101/102 courses.",
    seller: {
      id: 9,
      name: "Abdul Rahman",
      avatar: null,
      verified: false,
    },
    createdAt: "2025-10-30T10:05:00Z",
  },
  {
    id: 10,
    title: "PlayStation 5 with 2 Controllers",
    price: 450000,
    condition: "Used",
    category: "gadgets",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400",
    location: "Bosso Campus",
    views: 267,
    description:
      "PS5 disk version with 2 DualSense controllers. Includes FIFA 24 and COD. Excellent condition.",
    seller: {
      id: 10,
      name: "Victor Okonkwo",
      avatar: null,
      verified: true,
    },
    createdAt: "2025-11-03T12:30:00Z",
  },
  {
    id: 11,
    title: "Adidas Predator Football Boots - Size 42",
    price: 28000,
    condition: "New",
    category: "sports",
    image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=400",
    location: "Main Campus",
    views: 72,
    description:
      "Brand new Adidas Predator football boots. Size 42, perfect for the pitch.",
    seller: {
      id: 11,
      name: "Hassan Musa",
      avatar: null,
      verified: false,
    },
    createdAt: "2025-10-26T14:40:00Z",
  },
  {
    id: 12,
    title: "Office Chair - Ergonomic Design",
    price: 35000,
    condition: "Used",
    category: "furniture",
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400",
    location: "Gidan Kwano",
    views: 91,
    description:
      "Comfortable ergonomic office chair with lumbar support. Great for long study sessions.",
    seller: {
      id: 12,
      name: "Blessing Okoro",
      avatar: null,
      verified: true,
    },
    createdAt: "2025-10-29T09:50:00Z",
  },
];

// Categories data
export const categories = [
  { id: "all", name: "All Categories", icon: "🏪", count: mockProducts.length },
  {
    id: "electronics",
    name: "Electronics",
    icon: "📱",
    count: mockProducts.filter((p) => p.category === "electronics").length,
  },
  {
    id: "books",
    name: "Books & Stationery",
    icon: "📚",
    count: mockProducts.filter((p) => p.category === "books").length,
  },
  {
    id: "fashion",
    name: "Fashion & Apparel",
    icon: "👕",
    count: mockProducts.filter((p) => p.category === "fashion").length,
  },
  {
    id: "furniture",
    name: "Furniture",
    icon: "🛋️",
    count: mockProducts.filter((p) => p.category === "furniture").length,
  },
  {
    id: "sports",
    name: "Sports & Fitness",
    icon: "⚽",
    count: mockProducts.filter((p) => p.category === "sports").length,
  },
  {
    id: "accessories",
    name: "Accessories",
    icon: "⌚",
    count: mockProducts.filter((p) => p.category === "accessories").length,
  },
  {
    id: "gadgets",
    name: "Tech Gadgets",
    icon: "🎮",
    count: mockProducts.filter((p) => p.category === "gadgets").length,
  },
];

// Service functions
export const productsService = {
  // Get all products
  getAllProducts: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockProducts]), 300);
    });
  },

  // Get product by ID
  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = mockProducts.find((p) => p.id === parseInt(id));
        if (product) {
          resolve(product);
        } else {
          reject(new Error("Product not found"));
        }
      }, 300);
    });
  },

  // Search products
  searchProducts: (query, filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let results = [...mockProducts];

        // Search by query
        if (query && query.trim() !== "") {
          const searchTerm = query.toLowerCase();
          results = results.filter(
            (p) =>
              p.title.toLowerCase().includes(searchTerm) ||
              p.description.toLowerCase().includes(searchTerm) ||
              p.category.toLowerCase().includes(searchTerm)
          );
        }

        // Filter by category
        if (filters.category && filters.category !== "all") {
          results = results.filter((p) => p.category === filters.category);
        }

        // Filter by condition
        if (filters.condition && filters.condition !== "all") {
          const conditionMap = {
            new: "New",
            used: "Used",
            "fairly-used": "Used",
          };
          results = results.filter(
            (p) => p.condition === conditionMap[filters.condition]
          );
        }

        // Filter by price range
        if (filters.priceRange && filters.priceRange.length === 2) {
          const [min, max] = filters.priceRange;
          results = results.filter((p) => p.price >= min && p.price <= max);
        }

        // Filter by location
        if (filters.location && filters.location !== "all") {
          const locationMap = {
            bosso: "Bosso Campus",
            main: "Main Campus",
            "gidan-kwano": "Gidan Kwano",
            tunga: "Tunga",
            maitumbi: "Maitumbi",
          };
          results = results.filter(
            (p) => p.location === locationMap[filters.location]
          );
        }

        // Sort results
        if (filters.sortBy) {
          switch (filters.sortBy) {
            case "newest":
              results.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
              );
              break;
            case "price-low":
              results.sort((a, b) => a.price - b.price);
              break;
            case "price-high":
              results.sort((a, b) => b.price - a.price);
              break;
            case "popular":
              results.sort((a, b) => b.views - a.views);
              break;
            default:
              // relevance - keep current order
              break;
          }
        }

        resolve(results);
      }, 500);
    });
  },

  // Get products by category
  getProductsByCategory: (categoryId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (categoryId === "all") {
          resolve([...mockProducts]);
        } else {
          const results = mockProducts.filter((p) => p.category === categoryId);
          resolve(results);
        }
      }, 300);
    });
  },

  // Get trending products (most viewed)
  getTrendingProducts: (limit = 6) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const trending = [...mockProducts]
          .sort((a, b) => b.views - a.views)
          .slice(0, limit);
        resolve(trending);
      }, 300);
    });
  },
};

export default productsService;
