import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axiosInstance from "../axios/axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./userSignup.css";

// Validation Schema using Yup
const schema = yup.object().shape({
    name: yup
        .string()
        .matches(/^[a-zA-Z]+$/, "Only alphabets are allowed")
        .required("Name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup
        .string()
        .min(3, "Password must be at least 3 characters")
        .matches(/^\S*$/, "No spaces allowed in password")
        .required("Password is required"),
});

const UserSignup = () => {
    const navigate = useNavigate();

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (token) navigate("/home");
    }, [navigate]);

    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance.post("/register", data);
            if (response.status === 201) {
                toast.success("Registration successful! Redirecting to login...");
                setTimeout(() => navigate("/login"), 1000);
            }
        } catch (error) {
            toast.error(
                error.response?.status === 400
                    ? "Email already exists. Please use a different email."
                    : "An error occurred while registering. Please try again later."
            );
        }
    };

    return (
        <div className="totSignupContainer">
              <ToastContainer position="top-center" autoClose={2000} />
            <div className="signup-container">
                <div className="signup-box">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Name Field */}
                        <div className="input-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" {...register("name")} placeholder="Enter your name" />
                            <p className="error-message">{errors.name?.message}</p>
                        </div>

                        {/* Email Field */}
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" {...register("email")} placeholder="Enter your email" />
                            <p className="error-message">{errors.email?.message}</p>
                        </div>

                        {/* Password Field */}
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" {...register("password")} placeholder="Enter your password" />
                            <p className="error-message">{errors.password?.message}</p>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" disabled={isSubmitting} className="signup-button">
                            {isSubmitting ? "Registering..." : "Sign Up"}
                        </button>
                    </form>

                    <p className="login-link">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
       
        </div>
    );
};

export default UserSignup;
