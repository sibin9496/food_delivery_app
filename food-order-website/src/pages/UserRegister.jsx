import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, saveUser1 } from "../utils/storage";

export default function UserRegister() {
    const [form, setForm] = useState({
        name: "",
        identifier: "", 
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        const updatedValue = name === "identifier" ? value.toLowerCase() : value;
        setForm({ ...form, [name]: updatedValue });
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.identifier);
        const isPhone = /^[6-9]\d{9}$/.test(form.identifier);

        if (!isEmail && !isPhone) {
            setError("Enter a valid email or Indian contact number.");
            return;
        }

        const users = getAllUsers();
        const exists = users.find(
            (u) => u.email === form.identifier || u.contact === form.identifier
        );
        if (exists) {
            setError("User with this email or contact already exists.");
            return;
        }

        saveUser1({
            name: form.name,
            email: isEmail ? form.identifier : "",
            contact: isPhone ? form.identifier : "",
            password: form.password,
        });

        alert("Registration Successful");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-white-100 to-red-100 flex items-center justify-center">
            <div className="backdrop-blur-md bg-white/40 p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/30">
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-4">
                    User Registration
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="name"
                        required
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                    <input
                        name="identifier"
                        required
                        onChange={handleChange}
                        placeholder="Email or Contact Number"
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                    <input
                        name="password"
                        type="password"
                        required
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                    <input
                        name="confirmPassword"
                        type="password"
                        required
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                    {error && <p className="text-red-600 text-sm text-center">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-red-500 hover:bg-red-600 transition text-white font-semibold py-3 rounded-xl shadow-md"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-700">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-red-600 font-medium cursor-pointer hover:underline"
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}
