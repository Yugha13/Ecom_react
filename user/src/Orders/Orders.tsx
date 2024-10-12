import Navbar from "@/Navbar/Navbar"
import { useState } from "react"

export default function Orders() {
  const orders = [
    {
      id: 1,
      number: "#12345",
      date: "2023-04-15",
      items: [
        { name: "Product A", quantity: 2 },
        { name: "Product B", quantity: 1 },
      ],
      total: 99.99,
      status: "Delivered",
    },
    {
      id: 2,
      number: "#12346",
      date: "2023-04-12",
      items: [
        { name: "Product C", quantity: 1 },
        { name: "Product D", quantity: 3 },
      ],
      total: 149.99,
      status: "Shipped",
    },
    {
      id: 3,
      number: "#12347",
      date: "2023-04-08",
      items: [{ name: "Product E", quantity: 1 }],
      total: 29.99,
      status: "Delivered",
    },
    {
      id: 4,
      number: "#12348",
      date: "2023-04-20",
      items: [
        { name: "Product F", quantity: 2 },
        { name: "Product G", quantity: 1 },
      ],
      total: 79.99,
      status: "Pending",
    },
    {
      id: 5,
      number: "#12349",
      date: "2023-04-18",
      items: [{ name: "Product H", quantity: 1 }],
      total: 49.99,
      status: "Delivered",
    },
    {
      id: 6,
      number: "#12350",
      date: "2023-04-22",
      items: [{ name: "Product I", quantity: 3 }],
      total: 89.99,
      status: "Pending",
    },
  ]
  const upcomingOrders = [
    {
      id: 1,
      number: "#12351",
      date: "2023-04-25",
      items: [
        { name: "Product J", quantity: 1 },
        { name: "Product K", quantity: 2 },
      ],
      total: 119.99,
      status: "Pending",
    },
    {
      id: 2,
      number: "#12352",
      date: "2023-04-27",
      items: [{ name: "Product L", quantity: 1 }],
      total: 39.99,
      status: "Pending",
    },
    {
      id: 3,
      number: "#12353",
      date: "2023-04-30",
      items: [
        { name: "Product M", quantity: 2 },
        { name: "Product N", quantity: 1 },
      ],
      total: 99.99,
      status: "Pending",
    },
  ]
  const [activeTab, setActiveTab] = useState("orders")
  return (
    <div>
    <Navbar/>
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-2xl font-bold mb-6 md:text-3xl">Orders</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === "orders" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Orders History
          </button>
          <button
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === "upcoming" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming Orders
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {activeTab === "orders"
          ? orders.map((order) => (
              <div
                key={order.id}
                className="bg-background rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-muted-foreground">{order.number}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-600"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{order.date}</p>
                  <ul className="space-y-1">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{item.name}</span>
                        <span>x{item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-muted/40 px-4 py-3 flex justify-between items-center">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-sm font-medium">${order.total.toFixed(2)}</span>
                </div>
              </div>
            ))
          : upcomingOrders.map((order) => (
              <div
                key={order.id}
                className="bg-background rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-muted-foreground">{order.number}</span>
                    <span className={`text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-600`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{order.date}</p>
                  <ul className="space-y-1">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{item.name}</span>
                        <span>x{item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-muted/40 px-4 py-3 flex justify-between items-center">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-sm font-medium">${order.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
      </div>
    </div>
    </div>
  )
}