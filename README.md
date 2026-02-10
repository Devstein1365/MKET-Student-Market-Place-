# MKET - Student Marketplace Platform

<div align="center">
  <h3>🎓 Empowering Campus Commerce at FUTMINNA</h3>
  <p>A modern, AI-powered marketplace connecting students to buy, sell, and trade items within the university community</p>
</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Features in Detail](#features-in-detail)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)

---

## 🎯 Overview

**MKET** (Market) is a comprehensive student marketplace web application specifically designed for students at Federal University of Technology, Minna (FUTMINNA), Nigeria. The platform provides a safe, convenient, and efficient way for students to buy and sell items within the campus community.

### Purpose

- Create a trusted marketplace exclusively for FUTMINNA students
- Facilitate easy buying and selling of student essentials
- Build a community-driven commerce platform
- Reduce transaction costs and improve accessibility

### Target Audience

- Current FUTMINNA students
- Campus community members
- Student entrepreneurs

---

## ✨ Key Features

### 🛍️ Marketplace

- **Multi-Category Listings**: Electronics, Books, Furniture, Fashion, Sports, Home & Kitchen, Beauty, Vehicles, Services, and more
- **Advanced Search & Filtering**: Find items quickly with category filters, price ranges, and location-based search
- **Product Details**: Comprehensive product pages with multiple images, descriptions, pricing, and seller information
- **Wishlist**: Save favorite items for later viewing

### 🤖 AI-Powered Tools

- **Smart Description Generator**: Automatically generate compelling product descriptions using Google Gemini AI
- **Context-Aware Suggestions**: AI understands product category, condition, and pricing to create relevant descriptions

### 👤 User Management

- **Authentication System**: Secure sign-up and login functionality
- **User Profiles**: Personal profiles with avatars, bios, location, and verification badges
- **Seller Profiles**: View detailed seller information, ratings, and listing history
- **Performance Analytics**: Track listing views, sales, and engagement metrics

### 📦 Listing Management

- **Easy Product Posting**: Intuitive interface for creating product listings
- **Image Upload**: Support for multiple product images with drag-and-drop functionality
- **Draft System**: Auto-save drafts with manual save/load capabilities
- **Price Formatting**: Nigerian Naira (₦) formatting with proper validation
- **Location Tags**: Campus-specific location tags (Bosso Campus, Gidan Kwano, Main Campus)

### 💬 Communication

- **In-App Messaging**: Real-time chat system between buyers and sellers
- **Product-Specific Chats**: Conversations linked to specific product listings
- **Online Status**: See when sellers are available
- **Message Notifications**: Stay updated on new messages

### 🔔 Notifications

- **Activity Tracking**: Get notified about messages, product updates, and interactions
- **Notification Center**: Centralized view of all notifications

### 🎨 User Experience

- **Modern UI/UX**: Clean, intuitive interface built with Tailwind CSS
- **Smooth Animations**: Engaging micro-interactions using Framer Motion
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- **Dark Mode Support**: Compatible with system preferences

---

## 🛠️ Tech Stack

### Frontend

- **React 19.1.1** - Latest React with modern hooks and features
- **Vite (Rolldown)** - Lightning-fast build tool and dev server
- **React Router DOM 7.9.4** - Client-side routing
- **Tailwind CSS 4.1.16** - Utility-first CSS framework
- **Framer Motion 12.23.24** - Animation library for React

### Development Tools

- **ESLint** - Code linting and quality checks
- **React Icons 5.5.0** - Comprehensive icon library
- **React Easy Crop 5.5.3** - Image cropping for profile avatars

### AI Integration

- **Google Gemini AI** - Product description generation

### Backend (Current Implementation)

- **LocalStorage API** - Client-side data persistence (mock backend)
- Note: Currently frontend-only; ready for backend integration

### Deployment

- **Vercel** - Serverless deployment platform
- Configured with SPA routing support

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Google Gemini API Key** (for AI features)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/mket-project.git
   cd mket-project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
MKET-Project/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable React components
│   │   ├── dashboard/  # Dashboard-specific components
│   │   ├── profile/    # Profile-related components
│   │   ├── shared/     # Common UI components (Button, Input, Modal, etc.)
│   │   └── ui/         # UI elements (Logo, etc.)
│   ├── context/        # React Context providers
│   │   ├── AuthContext.jsx      # Authentication state
│   │   └── WishlistContext.jsx  # Wishlist management
│   ├── data/           # Static data and constants
│   │   └── categories.js        # Product categories
│   ├── hooks/          # Custom React hooks
│   │   └── useInfiniteScroll.jsx
│   ├── pages/          # Page components
│   │   ├── dashboard/  # Dashboard pages (Products, Profile, Messages, etc.)
│   │   ├── Auth.jsx    # Authentication page
│   │   ├── Home.jsx    # Landing page
│   │   └── Error.jsx   # 404 page
│   ├── services/       # API and service modules
│   │   ├── authService.js           # Authentication logic
│   │   ├── productsService.js       # Product CRUD operations
│   │   ├── chatService.js           # Messaging functionality
│   │   ├── geminiService.js         # AI integration
│   │   └── notificationsService.js  # Notifications
│   ├── utils/          # Utility functions
│   │   ├── passwordStrength.js
│   │   └── price.js    # Price formatting utilities
│   ├── App.jsx         # Main app component with routing
│   ├── main.jsx        # App entry point
│   └── index.css       # Global styles
├── eslint.config.js    # ESLint configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── vite.config.js      # Vite configuration
├── vercel.json         # Vercel deployment config
└── package.json        # Project dependencies
```

---

## 🔍 Features in Detail

### Authentication System

- User registration with email validation
- Secure login/logout functionality
- Password strength validation
- Session persistence using localStorage
- Protected routes for authenticated users only

### Product Posting Workflow

1. **Create Listing**: Fill in product details (title, price, category, condition, location)
2. **Upload Images**: Add multiple product images via drag-and-drop or file picker
3. **AI Description**: Generate professional descriptions with one click using Gemini AI
4. **Save Draft**: Auto-save every 30 seconds or manually save work in progress
5. **Preview**: View how your listing will appear before publishing
6. **Publish**: Make your listing live for other students to see

### Search & Discovery

- **Category Browsing**: Explore products by predefined categories
- **Search Functionality**: Find specific items using keywords
- **Filter Options**: Filter by price range, condition, location
- **Infinite Scroll**: Seamless loading of more products as you scroll

### User Profiles

- **Profile Customization**: Upload avatar, write bio, set location
- **Listing Management**: View and manage all your active listings
- **Performance Metrics**: Track total views, sales, and active listings
- **Reviews System**: Rate and review sellers (UI ready for backend integration)

### Messaging System

- **Conversation List**: View all active chats with buyers/sellers
- **Product Context**: Each chat is linked to a specific product
- **Online Indicators**: See when users are online or their last seen time
- **Unread Badges**: Visual indicators for new messages

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Google Gemini AI API Key (Required for AI description generation)
VITE_GEMINI_API_KEY=your_api_key_here
```

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key"
4. Copy the key and add it to your `.env` file

---

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

### Development Guidelines

1. **Component Structure**: Follow the existing folder structure for new components
2. **Styling**: Use Tailwind CSS utility classes; avoid custom CSS when possible
3. **State Management**: Use React Context for global state, local state for component-specific data
4. **Code Quality**: Run ESLint before committing changes
5. **Responsive Design**: Test on multiple screen sizes
6. **Accessibility**: Ensure all interactive elements are keyboard-accessible

### Mock Data vs Backend

Currently, the app uses **localStorage** to simulate a backend:

- `authService.js` - User authentication (localStorage)
- `productsService.js` - Product CRUD with mock data
- `chatService.js` - Messaging with mock conversations
- `notificationsService.js` - Mock notifications

**For Production**: Replace these services with actual API calls to your backend.

---

## 🚢 Deployment

### Vercel (Recommended)

This project is configured for Vercel deployment:

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Deploy**

   ```bash
   vercel
   ```

3. **Add Environment Variables**
   In Vercel dashboard, add `VITE_GEMINI_API_KEY` under Settings → Environment Variables

### Other Platforms

The built app is a static SPA. Deploy the `dist/` folder to:

- **Netlify**: Drag and drop the `dist/` folder
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3 + CloudFront**: Upload to S3 bucket with static hosting

**Important**: Configure SPA routing (all routes should serve `index.html`)

---

## 🔮 Future Enhancements

### Planned Features

- [ ] **Real Backend Integration** - Replace localStorage with REST API
- [ ] **WebSocket Support** - Real-time messaging updates
- [ ] **Payment Integration** - Paystack/Flutterwave for secure transactions
- [ ] **Email Notifications** - Send email alerts for messages and updates
- [ ] **Phone Verification** - SMS verification for user accounts
- [ ] **Advanced Search** - Elasticsearch integration for better search
- [ ] **Product Reports** - Flag inappropriate listings
- [ ] **Seller Ratings** - Complete review and rating system
- [ ] **Image Optimization** - CDN hosting for product images
- [ ] **Push Notifications** - Browser push notifications
- [ ] **Admin Dashboard** - Moderation and analytics panel
- [ ] **Mobile App** - React Native version for iOS and Android

### Backend Requirements

When building the backend, implement:

- User authentication with JWT tokens
- Product CRUD operations
- File upload handling (images)
- Real-time messaging (Socket.IO or similar)
- Notification system
- Database (PostgreSQL, MongoDB, or similar)
- Search indexing
- Payment processing

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add: brief description of changes"
   ```
4. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style and structure
- Write clear commit messages
- Test your changes thoroughly
- Update documentation if needed
- Add comments for complex logic

---

## 📄 License

This project is licensed under the MIT License. Feel free to use, modify, and distribute as needed.

---

## 👥 Contact & Support

- **Developer**: [Your Name]
- **Email**: [your.email@example.com]
- **GitHub**: [github.com/yourusername]

For questions, issues, or feature requests, please open an issue on GitHub.

---

## 🙏 Acknowledgments

- FUTMINNA student community for inspiration
- Google Gemini AI for description generation capabilities
- Open-source contributors for the amazing tools and libraries

---

<div align="center">
  <p>Built with ❤️ for the FUTMINNA community</p>
  <p>⭐ Star this repo if you find it useful!</p>
</div>
