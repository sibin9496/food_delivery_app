import { useState, useEffect } from "react";
import { Trash2, BarChart } from "lucide-react";


export default function AdminDashboard() {
    const [step, setStep] = useState("loading");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [error, setError] = useState("");
    const [adminData, setAdminData] = useState(null);
    const [users, setUsers] = useState([]);


    useEffect(() => {
        const storedAdmin = JSON.parse(localStorage.getItem("adminData"));
        const isLoggedIn = localStorage.getItem("adminLoggedIn");
        const fetchedUsers = JSON.parse(localStorage.getItem("users")) || [];

        setUsers(fetchedUsers);
        if (!storedAdmin) {
            setStep("setup");
        } else if (isLoggedIn === "true") {
            setStep("dashboard");
        } else {
            setStep("login");
        }
        setAdminData(storedAdmin);
    }, []);

    const handlePasswordSetup = () => {
        if (!emailInput || !passwordInput) return setError("Email and password are required.");
        if (passwordInput.trim().length < 4) return setError("Password must be at least 4 characters.");

        const newAdmin = { email: emailInput.trim(), password: passwordInput.trim() };
        localStorage.setItem("adminData", JSON.stringify(newAdmin));
        localStorage.setItem("adminLoggedIn", "true");
        setAdminData(newAdmin);
        setStep("dashboard");
    };

    const handleLogin = () => {
        if (!adminData) return setError("No admin account found.");
        if (emailInput === adminData.email && passwordInput === adminData.password) {
            localStorage.setItem("adminLoggedIn", "true");
            setStep("dashboard");
        } else {
            setError("Incorrect email or password.");
        }
    };

    const handleLogout = () => {
        localStorage.setItem("adminLoggedIn", "false");
        setStep("login");
        setEmailInput("");
        setPasswordInput("");
        setError("");
    };

    const handleForgotPassword = () => {
        setStep("forgot");
        setEmailInput("");
        setPasswordInput("");
        setError("");
    };

    const handleResetPassword = () => {
        if (!emailInput || !passwordInput) return setError("Email and new password are required.");
        if (emailInput !== adminData?.email) return setError("Entered email does not match the registered admin email.");
        if (passwordInput.trim().length < 4) return setError("New password must be at least 4 characters.");

        const updatedAdmin = { email: emailInput.trim(), password: passwordInput.trim() };
        localStorage.setItem("adminData", JSON.stringify(updatedAdmin));
        alert("Password has been reset. Please log in again.");
        setStep("login");
        setEmailInput("");
        setPasswordInput("");
        setError("");
    };

    const handleDeleteUser = (email) => {
        const updatedUsers = users.filter((user) => user.email !== email);
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    };

    const handleDeleteAllUsers = () => {
        setUsers([]);
        localStorage.setItem("users", JSON.stringify([]));
    };

    const renderInputSection = ({ heading, buttonText, handler, showForgot }) => (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white-100 to-blue-100 px-4">
            <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{heading}</h2>
                <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Admin Email"
                    className="w-full px-4 py-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button
                    onClick={handler}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md shadow-md"
                >
                    {buttonText}
                </button>
                {showForgot && (
                    <button
                        onClick={handleForgotPassword}
                        className="mt-4 text-sm text-blue-500 hover:underline"
                    >
                        Forgot Password?
                    </button>
                )}
            </div>
        </div>
    );

    if (step === "dashboard") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-10 px-4">
                <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
                        <div className="flex gap-3">
                            <button
                                onClick={handleLogout}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    

                    <div className="mb-10">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-700">Registered Users</h3>
                            {users.length > 0 && (
                                <button
                                    onClick={handleDeleteAllUsers}
                                    className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-red-200 shadow"
                                >
                                    Delete All
                                </button>
                            )}
                        </div>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <div key={index} className="mb-6 flex justify-between items-center border-b pb-4">
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800">👤 {user.name}</h4>
                                        <p className="text-gray-600 text-sm">{user.email}</p>
                                        <p className="text-gray-600 text-sm">{user.contact}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteUser(user.email)}
                                        className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-red-600 hover:bg-red-200 rounded-lg shadow-sm"
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No users registered yet.</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (step === "setup") {
        return renderInputSection({
            heading: "Set Admin Email & Password",
            buttonText: "Register Admin",
            handler: handlePasswordSetup,
        });
    }

    if (step === "login") {
        return renderInputSection({
            heading: "Admin Login",
            buttonText: "Login",
            handler: handleLogin,
            showForgot: true,
        });
    }

    if (step === "forgot") {
        return renderInputSection({
            heading: "Reset Admin Password",
            buttonText: "Reset Password",
            handler: handleResetPassword,
        });
    }

    return null;
}