import React from "react";
import "./adminOrders.css"; // We'll create this CSS file next
import AdminNavbar from "./adminNavbar";

const AdminOrders = () => {
  // Dummy data for orders
  const orders = [
    { id: 1, customerId: 1, productId: 1, quantity: 2 },
    { id: 2, customerId: 2, productId: 2, quantity: 1 },
    { id: 3, customerId: 3, productId: 3, quantity: 5 },
  ];

  return (
    <>
    <AdminNavbar/>
    <div className="orders-page">
      <h1>Order Management</h1>
      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Product ID</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerId}</td>
                <td>{order.productId}</td>
                <td>{order.quantity}</td>
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