import React, { useEffect, useState } from "react";
import "./userHome.css";
import axiosInstance from "../axios/axiosConfig";
import Navbar from "./userNavbar";
import { jwtDecode } from "jwt-decode";

const UserHomePage = () => {
    const [products, setProducts] = useState([]);
    const[user,setUser]=useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantities, setQuantities] = useState({});
    const fetchProducts = async () => {
        try {
            const response = await axiosInstance.get("/home");
            console.log("This is the data", response.data);
            setProducts(response.data.products);
           setUser(response.data.user)
            
            // Initialize quantities with 1 for each product
            const initialQuantities = response.data.products.reduce((acc, product) => {
                acc[product._id] = 1;
                return acc;
            }, {});
            setQuantities(initialQuantities);
            
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
      

        fetchProducts();
    }, []);

    const handleIncrease = (id) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: prev[id] + 1
        }));
    };

    const handleDecrease = (id) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(1, prev[id] - 1) // Prevents quantity from going below 1
        }));
    };

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    const handlePurchase = async (product) => {
        try {
            const token = localStorage.getItem("userToken"); 
            const decodedToken = jwtDecode(token);
            const userId = user._id
            console.log(userId)// Replace with logged-in user's ID
            const quantity = quantities[product._id];
            const response = await axiosInstance.post("/order/create", {
                userId,
                products: [{ product: product._id, quantity }],
            });

            alert("Purchase successful!");
            fetchProducts()
            console.log("Order Details:", response.data);
        } catch (error) {
            console.error("Order failed:", error.response?.data || error.message);
        }
    };
    return (
        <>
            <Navbar />
            <div className="homeContainer">
                <div className="user-home-page">
                    <h1>Welcome to Our Store</h1>
                    <div className="product-list">
                        {products.map((product) => (
                            <div key={product._id} className="product-card">
                                <img src={`http://localhost:5000/images/${product.image}`} alt={product.name} className="product-image" />
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-price">Price: ${product.price}</p>
                                
                                {/* Quantity Controls */}
                                <div className="quantity-controls">
                                    <button className="decrease-btn" onClick={() => handleDecrease(product._id)}>-</button>
                                    <span className="quantity">{quantities[product._id]}</span>
                                    <button className="increase-btn" onClick={() => handleIncrease(product._id)}>+</button>
                                </div>

                                {/* Total Price */}
                                <p className="total-price">
                                    Total: ${(quantities[product._id] * product.price).toFixed(2)}
                                </p>

                                <button onClick={() => handlePurchase(product)} className="add-to-cart-btn">Purchase</button>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserHomePage;
