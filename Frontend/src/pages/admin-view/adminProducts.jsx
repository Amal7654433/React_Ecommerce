import React, { useState, useEffect } from "react";
import AdminNavbar from "../../components/admin-components/adminNavbar";
import axiosInstance from "../../axios/axiosConfig";

const AdminProducts = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [detail, setDetail] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [product, setProduct] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axiosInstance.get('/admin/product');
            setProduct(response.data);
        } catch (err) {
            console.error('Error fetching products:', err.response ? err.response.data : err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !price || !stock || !detail) {
            setError('All fields are required');
            return;
        }
        
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("detail", detail);
        formData.append("stock", stock);
        formData.append("image", image);
        
        try {
            const response = await axiosInstance.post(`/admin/product/add`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (response.status === 201) {
                setName('');
                setPrice('');
                setStock('');
                setDetail('');
                setImage(null);
                fetchProducts();
            }
        } catch (error) {
            setError('Failed to add product');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            <AdminNavbar />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold text-center mb-6">Product Management</h1>
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Add Product</h2>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" />
                        <input type="text" placeholder="Product Detail" value={detail} onChange={(e) => setDetail(e.target.value)} className="w-full p-2 border rounded" />
                        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 border rounded" />
                        <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full p-2 border rounded" />
                        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full p-2 border rounded" />
                        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Add Product</button>
                    </form>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2">No</th>
                                <th className="p-2">Name</th>
                                <th className="p-2">Detail</th>
                                <th className="p-2">Price</th>
                                <th className="p-2">Stock</th>
                                <th className="p-2">Image</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product && product.map((item, index) => (
                                <tr key={item._id} className="border-t">
                                    <td className="p-2 text-center">{index + 1}</td>
                                    <td className="p-2">{item.name}</td>
                                    <td className="p-2">{item.detail}</td>
                                    <td className="p-2">${item.price}</td>
                                    <td className="p-2">{item.stock}</td>
                                    <td className="p-2 text-center">
                                        <img src={`http://localhost:5000/public/images/${item.image}`} alt={item.name} className="w-12 h-12 object-cover" />
                                    </td>
                                    <td className="p-2 text-center">
                                        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AdminProducts;
