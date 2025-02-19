import React from "react";
import "./userNavbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken"); // Check if user is logged in

    const handleLogout = () => {
        localStorage.removeItem("userToken"); // Remove token on logout
        navigate("/login"); // Redirect to login page
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <span className="brand-name">Ecommerce</span>
            </div>
            <div className="navbar-right">
                {token ? (
                    <>
                        <button className="nav-btn" onClick={() => navigate("/order")}>
                            Orders
                        </button>
                        <button className="nav-btn" onClick={() => navigate("/cart")}>
                            Cart
                        </button>
                        <button className="nav-btn" onClick={() => navigate("/profile")}>
                            Profile
                        </button>
                        <button className="nav-btn logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <button className="nav-btn login-btn" onClick={() => navigate("/login")}>
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
