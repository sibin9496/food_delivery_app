import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    User, LogOut, Phone, Mail, CalendarDays, BadgeCheck, PencilLine, Save, Star,
} from "lucide-react";

export default function Account() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedUser, setEditedUser] = useState({ name: "", email: "", contact: "" });
    const [orders, setOrders] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [ratings, setRatings] = useState({});

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("loggedInUser");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setEditedUser(parsedUser);
            } else {
                navigate("/login");
            }

            const storedOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
            setOrders(storedOrders);

            const favs = JSON.parse(localStorage.getItem("favoriteRestaurants")) || [];
            setFavorites(favs);

            const storedRatings = JSON.parse(localStorage.getItem("restaurantRatings")) || {};
            setRatings(storedRatings);

        } catch (error) {
            console.error("Error loading data:", error);
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        navigate("/login");
    };

    const handleChange = (e) => {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setUser(editedUser);
        localStorage.setItem("loggedInUser", JSON.stringify(editedUser));
        setEditMode(false);
    };

    const handleOrderAgain = (items) => {
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCart = [...existingCart, ...items];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        alert("Items added to cart again!");
    };

    const handleRatingChange = (restaurantId, value) => {
        const updated = { ...ratings, [restaurantId]: value };
        setRatings(updated);
        localStorage.setItem("restaurantRatings", JSON.stringify(updated));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white-100 to-red-100 p-6 flex justify-center items-center">
            <div className="w-full max-w-5xl bg-white/70 backdrop-blur-xl border border-red-200 shadow-2xl rounded-3xl p-10">
                <h2 className="text-4xl font-bold text-center text-red-600 mb-10 flex items-center justify-center gap-2">
                    <User className="w-8 h-8 text-red-600" /> Profile
                </h2>

                {user ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-red-50 rounded-2xl p-6 shadow-inner">
                            <h3 className="text-xl font-semibold text-red-800 mb-4 flex items-center gap-2">
                                <BadgeCheck className="w-5 h-5 text-green-600" />
                                Profile Details
                            </h3>

                            {editMode ? (
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-gray-700 font-medium">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editedUser.name}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded-lg mt-1"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-gray-700 font-medium">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={editedUser.email}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded-lg mt-1"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-gray-700 font-medium">Contact</label>
                                        <input
                                            type="text"
                                            name="contact"
                                            value={editedUser.contact}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded-lg mt-1"
                                        />
                                    </div>
                                    <button
                                        onClick={handleSave}
                                        className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                                    >
                                        <Save className="w-4 h-4" />
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <p className="text-gray-800 flex items-center gap-2"><User className="w-4 h-4 text-red-400" /> <strong>Name:</strong> {user.name}</p>
                                    <p className="text-gray-800 flex items-center gap-2"><Mail className="w-4 h-4 text-red-400" /> <strong>Email:</strong> {user.email}</p>
                                    <p className="text-gray-800 flex items-center gap-2"><Phone className="w-4 h-4 text-red-400" /> <strong>Contact:</strong> {user.contact || "N/A"}</p>
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100 flex flex-col justify-between">
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-red-800 mb-4 flex items-center gap-2">
                                    <CalendarDays className="w-5 h-5 text-blue-500" />
                                    Activity
                                </h3>
                                <p className="text-gray-800 mb-2"><strong>Role:</strong> {user.role || "User"}</p>
                                <p className="text-gray-800"><strong>Last Login:</strong> {new Date().toLocaleString()}</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => setEditMode(!editMode)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-xl flex items-center justify-center gap-2"
                                >
                                    <PencilLine className="w-4 h-4" /> {editMode ? "Cancel Edit" : "Edit Profile"}
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-xl shadow-md transition flex items-center justify-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" /> Logout
                                </button>
                            </div>
                        </div>

                        <div className="col-span-2 bg-yellow-50 p-6 rounded-2xl shadow-inner">
                            <h3 className="text-xl font-semibold text-red-800 mb-4">Order History</h3>
                            {orders.length > 0 ? orders.map((order, i) => (
                                <div key={i} className="bg-white rounded-xl p-4 mb-4 shadow border">
                                    <p className="text-gray-700 mb-2"><strong>Items:</strong> {order.items.map(item => item.name).join(", ")}</p>
                                    <button
                                        onClick={() => handleOrderAgain(order.items)}
                                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded-full text-sm mb-2"
                                    >Order Again</button>

                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-sm text-gray-600">Rate this order:</span>
                                        {[1, 2, 3, 4, 5].map(num => (
                                            <Star
                                                key={num}
                                                size={18}
                                                onClick={() => handleRatingChange(order.id, num)}
                                                className={
                                                    ratings[order.id] >= num ? "text-yellow-400 cursor-pointer" : "text-gray-300 cursor-pointer"
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                            )) : <p className="text-gray-500">No past orders yet.</p>}
                        </div>

                        <div className="col-span-2 bg-white p-6 rounded-2xl shadow-inner border border-red-100">
                            <h3 className="text-xl font-semibold text-red-800 mb-4">Favorite Restaurants ❤️</h3>
                            {favorites.length > 0 ? favorites.map((res, i) => (
                                <div key={i} className="p-3 border rounded-lg mb-2 bg-red-50">
                                    <p className="text-gray-800"><strong>{res.name}</strong> – {res.cuisine}</p>
                                </div>
                            )) : <p className="text-gray-500">No favorites added yet.</p>}
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 text-lg">Loading your account...</p>
                )}
            </div>
        </div>
    );
}
