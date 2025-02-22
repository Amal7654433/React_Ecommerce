import React, { useEffect, useState } from "react";
import "./userLogin.css"; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from "../axios/axiosConfig";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const schema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string()
        .min(3, "Password must be at least 6 characters")
        .matches(/\S+/, "Password cannot contain spaces")
        .required("Password is required"),
});

const UserLogin = () => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        resolver: yupResolver(schema),
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (token) {
            navigate("/home");
        }
    }, [navigate]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('/login', data, { withCredentials: true });

            if (response.status === 200) {
                localStorage.setItem('userToken', response.data.token);
                toast.success("Login successful! Redirecting...", { autoClose: 1500 });
                setTimeout(() => navigate("/home"), 2000);
            }
        } catch (error) {
            console.error('Login failed:', error);
            if (error.response?.status === 401) {
                setError("email", { type: "manual", message: "Incorrect email or password" });
            } else {
                toast.error("Failed to log in. Please try again.");
            }
            setLoading(false);
        }
    };

    return (
        <div className="totUserLoginContainer">
            <ToastContainer position="top-center" autoClose={2000} />
            <div className="login-container">
                <div className="login-box">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                {...register("email")}
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                            />
                            <p className="error-message">{errors.email?.message}</p>
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                          
                                <input
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter your password"
                                />
                                {/* <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button> */}
                            
                            <p className="error-message">{errors.password?.message}</p>
                        </div>
                        <button type="submit" className="login-button" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                    <p className="signup-link">
                        Don't have an account? <Link to="/register">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;
