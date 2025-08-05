import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserCircle, ShoppingCart, LayoutDashboard, PlusCircle, Settings } from "lucide-react";

export default function Navbar() {
    const cartItems = useSelector((state) => state.cart.items);
    const location = useLocation();

    const navLinkClass = (path) =>
        `relative px-3 py-1 rounded-md transition-all duration-200 text-base font-medium ${location.pathname === path
            ? "text-red-600 font-semibold"
            : "text-gray-700 hover:text-red-500"
        }`;

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
            
                <Link to="/" className="text-2xl font-extrabold text-red-600 tracking-wide">
                    🍽 Zomato Clone
                </Link>

                
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/" className={navLinkClass("/")}>Home</Link>
                    <Link to="/explore" className={navLinkClass("/explore")}>Explore</Link>

                    <Link to="/cart" className="relative group">
                        <span className={navLinkClass("/cart")}>Cart</span>
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full animate-bounce shadow-md">
                                {cartItems.length}
                            </span>
                        )}
                    </Link>

                    <Link to="/register" className={navLinkClass("/login")}>Login</Link>

                    <Link to="/account" className="flex items-center gap-1 group">
                        <UserCircle className="w-5 h-5 text-gray-700 group-hover:text-red-500" />
                        <span className="group-hover:text-red-500">Profile</span>
                    </Link>

                    <div className="relative group">
                        <button className="flex items-center gap-1 px-3 py-1 rounded-md font-medium text-gray-700 hover:text-red-500 transition">
                            <Settings className="w-4 h-4" />
                            <span>Admin Panel</span>
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md p-2 opacity-0 group-hover:opacity-100 group-hover:visible invisible transition duration-300 z-50">
                            <Link to="/admin-dashboard" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                                <LayoutDashboard className="w-4 h-4" />
                                Dashboard
                            </Link>
                            <Link to="/admin/add-product" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                                <PlusCircle className="w-4 h-4" />
                                Add Product
                            </Link>
                            <Link to="/admin-products" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                                <ShoppingCart className="w-4 h-4" />
                                Manage Products
                            </Link>
                            <Link to="/admin/sales" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">📊 Sales Dashboard</Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
