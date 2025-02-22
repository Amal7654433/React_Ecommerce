

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateRoute from './private/privateRoute';
import AdminLogin from './admin/adminLogin'
import AdminDashboard from './admin/adminDashboard'
import AdminOrders from './admin/adminOrders'
import AdminProducts from './admin/adminProducts'
import { Route, Routes } from 'react-router-dom'
import UserSignup from './user/userSignup'
import UserLogin from './user/userLogin'
import UserHomePage from './user/userHome'
import UserCart from './user/userCart';
import UserOrder from './user/userOrders';
function App() {


  return (
    <>
    

      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<PrivateRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/product" element={<AdminProducts />} />
          <Route path="/admin/order" element={<AdminOrders />} />
        </Route>

        <Route path="/register" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/home" element={<UserHomePage />} />
        <Route path="/cart" element={<UserCart />} />
        <Route path="/order" element={<UserOrder />} />



      </Routes>


    </>
  )
}

export default App
