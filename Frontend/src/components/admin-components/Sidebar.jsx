import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-64 bg-gray-800 text-white p-6 flex flex-col gap-4 fixed">
            <button 
                onClick={() => navigate('/admin/dashboard')} 
                className="px-6 py-3 bg-purple-600 rounded-md text-lg cursor-pointer transition-all hover:bg-blue-500"
            >
                Customers
            </button>
            <button 
                onClick={() => navigate('/admin/product')} 
                className="px-6 py-3 bg-purple-600 rounded-md text-lg cursor-pointer transition-all hover:bg-blue-500"
            >
                Products
            </button>
            <button 
                onClick={() => navigate('/admin/order')} 
                className="px-6 py-3 bg-purple-600 rounded-md text-lg cursor-pointer transition-all hover:bg-blue-500"
            >
                Orders
            </button>
        </div>
    );
};

export default Sidebar;