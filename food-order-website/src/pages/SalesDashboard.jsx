import { useEffect, useState } from "react";

export default function SalesDashboard() {
    const [orders, setOrders] = useState([]);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
        setOrders(allOrders);

        let earnings = 0;
        const itemCount = {};

        allOrders.forEach(order => {
            order.items.forEach(item => {
                earnings += item.price * item.quantity;
                itemCount[item.name] = (itemCount[item.name] || 0) + item.quantity;
            });
        });

        setTotalEarnings(earnings);

        const sortedItems = Object.entries(itemCount)
            .sort((a, b) => b[1] - a[1])
            .map(([name, qty]) => ({ name, qty }));

        setBestSellers(sortedItems.slice(0, 5)); 
    }, []);

    const ordersPerDay = () => {
        const map = {};
        orders.forEach(order => {
            const date = new Date(order.timestamp).toLocaleDateString();
            map[date] = (map[date] || 0) + 1;
        });
        return map;
    };

    return (
        <div className="p-6 bg-gradient-to-b from-white-50 to-red min-h-screen font-sans">
            <h1 className="text-4xl font-extrabold text-red-600 mb-8 text-center drop-shadow-md">
                📊 Sales Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:scale-105 transition">
                    <h2 className="text-xl font-semibold mb-2 text-gray-700">Total Earnings</h2>
                    <p className="text-3xl font-bold text-green-600">₹{totalEarnings.toFixed(2)}</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6 md:col-span-2 border border-gray-100 hover:scale-105 transition">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">📅 Orders Per Day</h2>
                    <ul className="space-y-2">
                        {Object.entries(ordersPerDay()).map(([date, count]) => (
                            <li key={date} className="text-gray-600">
                                <span className="font-medium">{date}</span>: {count} orders
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 mt-10 border border-gray-100 hover:scale-[1.02] transition">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">🔥 Best Selling Dishes</h2>
                <ul className="space-y-2">
                    {bestSellers.length > 0 ? (
                        bestSellers.map((item, index) => (
                            <li key={index} className="text-gray-600">
                                🍽️ <span className="font-medium">{item.name}</span> — {item.qty} sold
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-500">No orders yet.</li>
                    )}
                </ul>
            </div>
        </div>
    );
}
