

import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import Products from '../models/productModel.js'
import bcrypt from 'bcryptjs'
export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    try {
        // Get admin credentials from environment variables
        const storedEmail = process.env.ADMIN_EMAIL;
        const storedPassword = process.env.ADMIN_PASSWORD;

        // Check if the provided email and password match the stored values
        if (email !== storedEmail || password !== storedPassword) {
            return res.status(400).json({ login: false, message: 'Invalid credentials' });
        }
     
     
        const token = jwt.sign({ adminId: 'admin' }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.cookie('adminToken', token, {
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            sameSite: 'strict',
            secure: true,
            // httpOnly: true,
        });

        return res.status(200).json({ login: true, token });

    } catch (error) {
        console.error('Error during admin login:', error);
        return res.status(500).json({ error: 'Server error' });
    }

}
export const adminLogout = (req, res) => {
    res.clearCookie('adminToken', {
      httpOnly: true,
    });
    return res.status(200).json({ message: 'User logged out successfully', success: true });
  };
export const dashboard = async (req, res) => {
    try {
        const users = await User.find({});
        console.log(users)
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users' });
    }
}

export const addProduct = async (req, res) => {
    try {
        const { name, detail, stock, price } = req.body;
        const image = req.file ? req.file.filename : null; 

        if (!image) {
            return res.status(400).json({ success: false, message: "Image is required" });
        }

        const newProduct = new Products({ name, price, detail, stock, image });
        await newProduct.save();
        res.status(201).json({ success: true, product: newProduct });

    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, message: "Error adding product", error: error.message });
    }
};


// Function to fetch all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Products.find({});
        console.log(products)
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return { success: false, message: "Error fetching products" };
    }
};