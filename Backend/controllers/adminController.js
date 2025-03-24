

import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import Products from '../models/productModel.js'
import asyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs'
export const adminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    const storedEmail = process.env.ADMIN_EMAIL;
    const storedPassword = process.env.ADMIN_PASSWORD;

    if (email !== storedEmail || password !== storedPassword) {
        console.log("Invalid credentials");
        res.status(400);
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ adminId: "admin" }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.cookie("adminToken", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        sameSite: "strict",
        secure: true,
    });

    res.status(200).json({ login: true, token });
});

// Admin Logout
export const adminLogout = asyncHandler(async (req, res) => {
    res.clearCookie("adminToken", { httpOnly: true });
    res.status(200).json({ message: "Admin logged out successfully", success: true });
});

// Get Dashboard Users
export const dashboard = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
});

// Add Product
export const addProduct = asyncHandler(async (req, res) => {
    const { name, detail, stock, price } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!image) {
        res.status(400);
        throw new Error("Image is required");
    }

    const newProduct = new Products({ name, price, detail, stock, image });
    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
});

// Get All Products
export const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Products.find({});
    res.status(200).json(products);
});
export const adminCheck = asyncHandler(async (req, res) => {
console.log(req.adminId)
});
