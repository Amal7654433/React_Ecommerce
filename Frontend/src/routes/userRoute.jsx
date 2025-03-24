import { Routes, Route } from "react-router-dom";
import UserSignup from "../pages/user-view/userSignup";
import UserLogin from "../pages/user-view/userLogin";
import UserHomePage from "../pages/user-view/userHome";
import UserCart from "../pages/user-view/userCart";
import UserOrder from "../pages/user-view/userOrders";
import UserNavbar from "../components/user-components/userNavbar";

export default function UserRoutes() {
  return (
    <>
      <UserNavbar />
      <Routes>
        <Route path="/register" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/" element={<UserHomePage />} />
        <Route path="/home" element={<UserHomePage />} />
        <Route path="/cart" element={<UserCart />} />
        <Route path="/order" element={<UserOrder />} />
      </Routes>
    </>
  );
}

