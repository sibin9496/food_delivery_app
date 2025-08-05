import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart, updateQuantity } from "../redux/cartSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Sorting helpers
const sortItems = (items, type) => {
    switch (type) {
        case "lowToHigh":
            return [...items].sort((a, b) => a.price - b.price);
        case "highToLow":
            return [...items].sort((a, b) => b.price - a.price);
        default:
            return items;
    }
};

export default function Cart() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [sortType, setSortType] = useState("default");

    const sortedItems = sortItems(cartItems, sortType);

    const total = sortedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleAddMore = () => navigate("/explore");

    const handleBuy = () => {
        if (!cartItems.length) {
            setMessage("🛒 Your cart is empty.");
            return;
        }

        // Save order history to localStorage
        const prevOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
        const newOrder = {
            id: Date.now(),
            items: cartItems,
            total,
            date: new Date().toLocaleString(),
        };
        localStorage.setItem("orderHistory", JSON.stringify([...prevOrders, newOrder]));

        dispatch(clearCart());
        navigate("/buy-now");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-extrabold text-gray-800">🛍️ Your Cart</h2>

                    <select
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                        className="text-sm bg-white border border-red-300 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                    >
                        <option value="default">Sort: Default</option>
                        <option value="lowToHigh">Price: Low → High</option>
                        <option value="highToLow">Price: High → Low</option>
                    </select>
                </div>

                {!sortedItems.length ? (
                    <p className="text-center text-gray-600 text-lg">No items added yet.</p>
                ) : (
                    <div className="space-y-6">
                        {sortedItems.map((item) => (
                            <div
                                key={item.id}
                                className="backdrop-blur-sm bg-white/80 border border-gray-200 rounded-2xl shadow-xl p-5 flex justify-between items-center transition duration-300 hover:scale-[1.01]"
                            >
                                <div>
                                    <h3 className="font-semibold text-xl text-gray-800">{item.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        ₹{item.price} × {item.quantity}
                                    </p>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => dispatch(updateQuantity({ id: item.id, delta: -1 }))}
                                        className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-lg"
                                    >
                                        –
                                    </button>
                                    <span className="text-lg font-medium">{item.quantity}</span>
                                    <button
                                        onClick={() => dispatch(updateQuantity({ id: item.id, delta: +1 }))}
                                        className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-lg"
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    onClick={() => dispatch(removeFromCart(item.id))}
                                    className="text-red-500 hover:underline text-sm font-medium"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

                        <div className="text-right mt-4 text-2xl font-bold text-gray-700">
                            Total: ₹{total}
                        </div>

                        <div className="flex flex-wrap gap-4 justify-end mt-6">
                            <button
                                onClick={handleAddMore}
                                className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium px-6 py-3 rounded-xl shadow-lg transition"
                            >
                                ➕ Add More Items
                            </button>
                            <button
                                onClick={handleBuy}
                                className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg transition"
                            >
                                ✅ Buy Now
                            </button>
                        </div>

                        {message && (
                            <div className="mt-6 text-center text-purple-700 font-semibold text-lg">
                                {message}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}


