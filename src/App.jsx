import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import NotFound from "./pages/Error";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Wishlist from "./pages/dashboard/Wishlist";
import PostItem from "./pages/dashboard/PostItem";
import ProductDetails from "./pages/dashboard/ProductDetails";
import Messages from "./pages/dashboard/Messages";

const App = () => {
  return (
    <BrowserRouter>
      <WishlistProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />

          {/* Dashboard routes - nested */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="post" element={<PostItem />} />
            <Route path="chat" element={<Messages />} />
            <Route
              path="profile"
              element={
                <div className="p-8 text-center">Profile Page Coming Soon</div>
              }
            />
            <Route
              path="settings"
              element={
                <div className="p-8 text-center">Settings Page Coming Soon</div>
              }
            />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </WishlistProvider>
    </BrowserRouter>
  );
};

export default App;
