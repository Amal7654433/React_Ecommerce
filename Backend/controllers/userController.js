import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import Products from '../models/productModel.js'
import Order from '../models/orderModel.js'

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(req.body)
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or phone number already exists', success: false });
        }
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', success: true, newUser });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user' });
        console.log('internal eroor')
        console.log(error.message)
    }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Incorrect password or email', user: false })
        }
        const auth = await bcrypt.compare(password, user.password)
        if (!auth) {
            return res.status(401).json({ message: 'Incorrect password or email', user: false })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.cookie('userToken', token, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            // httpOnly: true,
            secure: true
        });
        res.status(200).json({ message: "User logged in successfully", success: true, token, user });

    } catch (error) {

        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
}

export const userLogout = (req, res) => {
    res.clearCookie('userToken', {
        httpOnly: true,
    });
    return res.status(200).json({ message: 'User logged out successfully', success: true });
};

export const userHome = async (req, res) => {
    try {
        const products = await Products.find({});
        console.log(req.userId, 'jdjdjdj')
        const user = await User.findById(req.userId);
        console.log(user, 'thsi is now')

        res.status(200).json({ products, user });

    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users' });
    }
}



export const createOrder = async (req, res) => {
    try {
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

            // Reduce stock
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

    } catch (error) {
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.userId;
        console.log(userId)
        const orders = await Order.find({ userId }).populate("products.product", "name price");
        console.log(orders, 'ldkdkd')
        if (!orders.length) {
            return res.status(404).json({ message: "No orders found for this user." });
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders", details: error.message });
    }
};
