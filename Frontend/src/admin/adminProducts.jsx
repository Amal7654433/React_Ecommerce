import React, { useState, useEffect } from "react";
import "./adminProducts.css";
import AdminNavbar from "./adminNavbar";
import axiosInstance from "../axios/axiosConfig";

const AdminProducts = () => {
    // State to manage the list of products
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [detail, setDetail] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [product, setProduct] = useState([]);
    const fetchProducts = async () => {
        try {
            console.log('Fetching products...');
            const response = await axiosInstance.get('/admin/product');
            console.log('Fetched Data:', response.data); // Debugging
            setProduct(response.data);
        } catch (err) {
            console.error('Error fetching products:', err.response ? err.response.data : err.message);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        if (!name || !price || !stock || !detail) {
            setError('All fields are required');
            return;
        }
        if (!name || !name.trim()) {
            setError('Please enter a valid name');
            setLoading(false);
            return;
        }
        if (!detail || !detail.trim()) {
            setError('Please enter a valid detail');
            setLoading(false);
            return;
        }
        const priceRegex = /^[0-9]+(\.[0-9]{1,2})?$/; // Allow decimals
        if (!priceRegex.test(price)) {
            setError('Please enter a valid price');
            return;
        }

        const stockRegex = /^[0-9]+$/;
        if (!stockRegex.test(stock)) {
            setError('Please enter a valid stock quantity');
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

                // Refresh the product list
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
            <div className="totalProductContainer">
                <div className="products-page">
                    <h1>Product Management</h1>

                    <div className="add-product-form">
                        <h2>Add Product</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="form-group">
                                <label htmlFor="name">Product Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter product name"

                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Product Detail</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={detail}
                                    onChange={(e) => setDetail(e.target.value)}
                                    placeholder="Enter product name"

                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price">Product Price</label>
                                <input
                                    type="number"
                                    id="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Enter product price"

                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="stock">Stock</label>
                                <input
                                    type="number"
                                    id="stock"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    placeholder="Enter stock quantity"

                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">Product Image</label>
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </div>
                            <button type="submit" className="submit-btn">
                                Add Product
                            </button>
                        </form>
                    </div>

                    <div className="products-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Detail</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product && product.map((item, index) => (
                                    <tr key={item._id}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.detail}</td>
                                        <td>${item.price}</td>
                                        <td>{item.stock}</td>
                                        <td>
                                            <img src={`http://localhost:5000/public/images/${item.image}`} alt={item.name} width="50" />
                                        </td>
                                        <td>
                                            <button className="delete-btn">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminProducts;
