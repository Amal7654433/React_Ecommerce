import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import Products from '../models/productModel.js'
import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "Email or phone number already exists", success: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        name,
        email,
        password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully", success: true, newUser });
});


export const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log('hello')
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Incorrect password or email", user: false });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.cookie("userToken", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: true
    });

    res.status(200).json({ message: "User logged in successfully", success: true, token, user });
});


export const userLogout = (req, res) => {
    res.clearCookie("userToken", {
        httpOnly: true,
    });
    return res.status(200).json({ message: "User logged out successfully", success: true });
};


export const userHome = asyncHandler(async (req, res) => {
    const products = await Products.find({});
    let user = req.userId ? await User.findById(req.userId) : null;
console.log('amal',products)
    res.status(200).json({ products, user });
});


export const createOrder = asyncHandler(async (req, res) => {
    const { userId, products } = req.body;

    if (!userId || !products || products.length === 0) {
        return res.status(400).json({ message: "Invalid order data" });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of products) {
        const product = await Products.findById(item.product);
        if (!product) {
            return res.status(404).json({ message: `Product not found: ${item.product}` });
        }

        if (product.stock < item.quantity) {
            return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
        }

        totalAmount += product.price * item.quantity;
        orderItems.push({
            name: product.name,
            quantity: item.quantity,
            price: product.price,
        });

        product.stock -= item.quantity;
        await product.save();
    }

    const newOrder = new Order({
        user: userId,
        products: orderItems,
        totalAmount,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
});

// ✅ Get User Orders
export const getUserOrders = asyncHandler(async (req, res) => {
    const userId = req.userId;
    console.log(userId);
    const orders = await Order.find({ user: userId }).populate("products.product", "name price");
    if (!orders.length) {
        return res.status(404).json({ message: "No orders found for this user." });
    }
    res.status(200).json(orders);
});