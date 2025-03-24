import React from "react";
import AdminNavbar from "../../components/admin-components/adminNavbar";

const AdminOrders = () => {
  // Dummy data for orders
  const orders = [
    { id: 1, customerId: 1, productId: 1, quantity: 2 },
    { id: 2, customerId: 2, productId: 2, quantity: 1 },
    { id: 3, customerId: 3, productId: 3, quantity: 5 },
  ];

  return (
    <>
      <AdminNavbar />
      <div className="p-8 max-w-screen-lg mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Order Management
        </h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left font-semibold">Order ID</th>
                <th className="p-3 text-left font-semibold">Customer ID</th>
                <th className="p-3 text-left font-semibold">Product ID</th>
                <th className="p-3 text-left font-semibold">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.customerId}</td>
                  <td className="p-3">{order.productId}</td>
                  <td className="p-3">{order.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminOrders;
