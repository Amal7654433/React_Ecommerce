
import React from "react";
import axiosInstance from "../../axios/axiosConfig";

import { useNavigate } from "react-router-dom";
const AdminNavbar = () => {
  const navigate = useNavigate()
  const handlelogut = async () => {
    await axiosInstance.post('/admin/logout');
    localStorage.removeItem("token");
    navigate('/admin/login');
  }
  return (
    <>
      <nav className="navbar">
        <div className="logo">Dashboard</div>
        <button onClick={handlelogut} className="logout-btn">Logout</button>
      </nav>
    
    </>
  );
};

export default AdminNavbar;
