import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../axios/axiosConfig";

const schema = yup.object().shape({
    name: yup
        .string()
        .matches(/^[a-zA-Z]+$/, "Only alphabets are allowed")
        .required("Name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup
        .string()
        .min(3, "Password must be at least 3 characters")
        .matches(/\S*$/, "No spaces allowed in password")
        .required("Password is required"),
});

const UserSignup = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
    });

 

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 to-blue-500">
            <ToastContainer position="top-center" autoClose={2000} />
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Name</label>
                        <input type="text" id="name" {...register("name")} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter your name" />
                        <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input type="email" id="email" {...register("email")} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter your email" />
                        <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input type="password" id="password" {...register("password")} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter your password" />
                        <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300">
                        {isSubmitting ? "Registering..." : "Sign Up"}
                    </button>
                </form>
                <p className="text-gray-600 text-center mt-4">
                    Already have an account? <Link to="/login" className="text-purple-600 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default UserSignup;
