import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Cart from "./pages/Cart";
import BuyNow from "./pages/BuyNow";
import AdminDashboard from "./pages/AdminDashboard";
import Footer from "./pages/Footer";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import Account from "./pages/Account";
import AdminAddProduct from "./pages/AddProduct";
import AdminManageProduct from "./pages/AdminManageProduct"
import SalesDashboard from "./pages/SalesDashboard";


export default function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/buy-now" element={<BuyNow />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin/add-product" element={<AdminAddProduct />} />
        <Route path="/admin-products" element={<AdminManageProduct />} />
        <Route path="/admin/sales" element={<SalesDashboard />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </div>
  );
}
