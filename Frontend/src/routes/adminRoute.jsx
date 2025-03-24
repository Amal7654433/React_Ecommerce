import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/admin-view/adminLogin";
import AdminDashboard from "../pages/admin-view/adminDashboard";
import AdminOrders from "../pages/admin-view/adminOrders";
import AdminProducts from "../pages/admin-view/adminProducts";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/product" element={<AdminProducts />} />
      <Route path="/admin/order" element={<AdminOrders />} />
    </Routes>
  );
}

