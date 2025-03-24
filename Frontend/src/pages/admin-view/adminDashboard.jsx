import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/admin-components/adminNavbar";
import axiosInstance from "../../axios/axiosConfig";


const AdminDashboard = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get("/admin/dashboard");
                setUser(response.data);
            } catch (err) {
                console.error("Error fetching users:", err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    return (
        <>
            <AdminNavbar />
            <div className="min-h-screen bg-gray-100 text-gray-800 p-4">
                <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-center mb-4">Customer Management</h1>
                    <div className="overflow-x-auto">
                        {loading ? (
                            <p className="text-center text-gray-500">Loading...</p>
                        ) : (
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="p-3 border border-gray-300 text-left">No</th>
                                        <th className="p-3 border border-gray-300 text-left">Name</th>
                                        <th className="p-3 border border-gray-300 text-left">Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user &&
                                        user.map((customer, index) => (
                                            <tr
                                                key={customer._id}
                                                className="hover:bg-gray-100 transition"
                                            >
                                                <td className="p-3 border border-gray-300">{index + 1}</td>
                                                <td className="p-3 border border-gray-300">{customer.name}</td>
                                                <td className="p-3 border border-gray-300">{customer.email}</td>
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
