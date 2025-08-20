import { Link } from "react-router-dom";
import { useEffect } from "react";


export default function BuyNow() {
    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const orders = JSON.parse(localStorage.getItem("orders")) || [];

        const newOrder = {
            id: Date.now(),
            date: new Date().toISOString().split("T")[0], 
            items: cartItems,
            total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        };

        orders.push(newOrder);
        localStorage.setItem("orders", JSON.stringify(orders));
        localStorage.removeItem("cart"); 
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 to-green-50 p-6">
            <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-xl w-full text-center border border-gray-100">
                <div className="mb-6">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
                        alt="Success"
                        className="w-24 h-24 mx-auto drop-shadow-lg"
                    />
                </div>
                <h1 className="text-4xl font-extrabold text-green-600 mb-3">Order Confirmed!</h1>
                <p className="text-lg text-gray-700 mb-6">
                    Thank you for ordering with <span className="font-semibold text-red-500">Zomato Clone</span>.<br />
                    Your delicious meal is being prepared and will arrive shortly! 🍽️
                </p>

                <div className="flex justify-center">
                    <Link
                        to="/"
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition transform hover:scale-105"
                    >
                        ⬅ Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
