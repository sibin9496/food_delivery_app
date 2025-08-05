import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const matchedUser = users.find(
            (u) =>
                (u.email === input.toLowerCase() || u.contact === input) &&
                u.password === password
        );

        if (matchedUser) {
            localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
            navigate("/account");
        } else {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-white-100 to-red-100 flex items-center justify-center">
            <div className="backdrop-blur-md bg-white/40 p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/30">
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Welcome Back</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    {error && <p className="text-center text-red-600 font-medium">{error}</p>}
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border"
                        placeholder="Email or Contact Number"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border"
                        placeholder="Password"
                        required
                    />
                    <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-lg">Login</button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don’t have an account?{" "}
                    <span
                        className="text-red-600 font-semibold cursor-pointer hover:underline"
                        onClick={() => navigate("/register")}
                    >
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    );
}
