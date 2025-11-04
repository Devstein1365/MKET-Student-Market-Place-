import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import NotFound from "./pages/Error";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />

        {/* Dashboard routes - nested */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route
            path="search"
            element={
              <div className="p-8 text-center">Search Page Coming Soon</div>
            }
          />
          <Route
            path="wishlist"
            element={
              <div className="p-8 text-center">Wishlist Page Coming Soon</div>
            }
          />
          <Route
            path="post"
            element={
              <div className="p-8 text-center">Post Item Page Coming Soon</div>
            }
          />
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
    </BrowserRouter>
  );
};

export default App;
