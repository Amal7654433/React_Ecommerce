import React, { useEffect, useState } from "react";


import axiosInstance from "../../axios/axiosConfig";
import UserNavbar from "../../components/user-components/userNavbar";

export const UserHomePage = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axiosInstance.get('/home');
            setProducts(response.data.products);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
           
            <div className="bg-gray-100 min-h-screen text-gray-900">
                <div className="max-w-6xl mx-auto py-8 px-4">
                    <h1 className="text-3xl font-semibold text-center mb-6">Welcome to Our Store</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden text-center transition-transform transform hover:-translate-y-2 hover:shadow-xl">
                                <img src={`http://localhost:5000/images/${product.image}`} alt={product.name} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                                    <p className="text-indigo-600 font-medium">Price: ${product.price}</p>
                                    <p className="text-gray-700 font-semibold">Total: ${product.price}</p>
                                    <div className="flex items-center justify-center mt-2 space-x-2">
                                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500">-</button>
                                        <span className="text-lg font-bold">1</span>
                                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500">+</button>
                                    </div>
                                    <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-500">Add To Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserHomePage;
