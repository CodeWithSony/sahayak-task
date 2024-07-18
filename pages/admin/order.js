import { useState, useEffect } from "react";

const fetchOrders = async () => {
  const response = await fetch("/api/orders");
  return response.json();
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const createOrder = async (newOrder) => {
    await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: { "Content-Type": "application/json" },
    });
    fetchOrders();
  };

  const updateOrder = async (id, updatedOrder) => {
    await fetch(`/api/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedOrder),
      headers: { "Content-Type": "application/json" },
    });
    fetchOrders();
  };

  const deleteOrder = async (id) => {
    await fetch(`/api/orders/${id}`, {
      method: "DELETE",
    });
    fetchOrders();
  };

  const fetchOrders = async (id) => {
    let res = await fetch(`/api/orders`, {
      method: "GET",
    });

    let result = await res.json();

    console.log(result, `resultresultresultresult`);
    setOrders(result);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-white">
        {orders.length > 0 &&
          orders.map((order) => (
            <div key={order.id} className="border p-4 rounded">
              <h2 className="text-xl">Order {order.id}</h2>
              <p>Status: {order.status}</p>
              <button
                onClick={() =>
                  updateOrder(order.id, { ...order, status: "Updated" })
                }
                className="bg-yellow-500 text-white p-2 mr-2"
              >
                Update
              </button>
              <button
                onClick={() => deleteOrder(order.id)}
                className="bg-red-500 text-white p-2"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminOrders;
