import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import NotFound from "./pages/Error";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Wishlist from "./pages/dashboard/Wishlist";
import PostItem from "./pages/dashboard/PostItem";

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
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="post" element={<PostItem />} />
            <Route
              path="chat"
              element={
                <div className="p-8 text-center">Chat Page Coming Soon</div>
              }
            />
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
