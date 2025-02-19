import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const navigate = useNavigate();

    // Check if token exists on page load
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    // Login function
    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        navigate("/dashboard");
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
