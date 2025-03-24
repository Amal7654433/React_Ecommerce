import React, { useEffect, useState } from "react";


import axiosInstance from "../../axios/axiosConfig";

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get("/order");
                setOrders(response.data);
            } catch (error) {
                setError(error.response?.data?.message || "Failed to fetch orders.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
    
            <div className="orders-container">
                <h1>Your Orders</h1>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    orders.map((order) => (
                        <div key={order._id} className="order-card">
                            <p><strong>Order ID:</strong> {order._id}</p>
                            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                            <h3>Products:</h3>
                            <ul>
                                {order.products.map((item, index) => (
                                    <li key={index}>
                                        {item.product.name} - {item.quantity} x ${item.product.price}
                                    </li>
                                ))}
                            </ul>
                            <p><strong>Total:</strong> ${order.products.reduce((acc, item) => acc + item.quantity * item.product.price, 0).toFixed(2)}</p>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default UserOrders;
