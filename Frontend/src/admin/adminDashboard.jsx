import React, { useEffect, useState } from "react";
import "./adminDashboard.css"; // Ensure you have the CSS file
import AdminNavbar from './adminNavbar';
import axiosInstance from "../axios/axiosConfig";
const AdminDashboard = () => {
    // Dummy data for customers
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get('/admin/dashboard');
                setUser(response.data);
            } catch (err) {
                console.error('Error fetching users:', err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    return (
        <>
            <AdminNavbar />
            <div className="totCusomerContainer">
                <div className="admin-dashboard">
                    <h1>Customer Management</h1>
                    <div className="table-container">
                        {loading ? <p>Loading...</p> : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user && user.map((customer, index) => (
                                        <tr key={customer._id}>
                                            <td>{index + 1}</td>
                                            <td>{customer.name}</td>
                                            <td>{customer.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;