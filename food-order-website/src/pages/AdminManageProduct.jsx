import { useEffect, useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";

export default function AdminManageProduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];
        setProducts(storedProducts);
    }, []);

    const updateLocalStorage = (updatedList) => {
        setProducts(updatedList);
        localStorage.setItem("adminProducts", JSON.stringify(updatedList));
    };

    const handleDelete = (id) => {
        const updated = products.filter((product) => product.id !== id);
        updateLocalStorage(updated);
        alert("🗑️ Product deleted successfully!");
    };

    const handleIncrement = (id) => {
        const updated = products.map((product) =>
            product.id === id ? { ...product, stock: product.stock + 1 } : product
        );
        updateLocalStorage(updated);
    };

    const handleDecrement = (id) => {
        const updated = products.map((product) =>
            product.id === id && product.stock > 0
                ? { ...product, stock: product.stock - 1 }
                : product
        );
        updateLocalStorage(updated);
    };

    if (products.length === 0) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <p className="text-center text-gray-400 to-blue text-xl font-medium">
                    No products available. Please add some!
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-center text-black-800 mb-12 tracking-tight">
                🛒 Admin Product Management
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-2xl shadow-xl border border-gray-200 transition transform hover:-translate-y-1 hover:shadow-2xl"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-t-2xl"
                        />
                        <div className="p-5 space-y-3">
                            <h3 className="text-2xl font-semibold text-gray-800">{product.name}</h3>
                            <p className="text-lg font-medium text-green-600">₹{product.price}</p>
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">Cuisine:</span> {product.cuisine || "N/A"}
                            </p>

                            <div className="flex justify-between items-center text-sm text-gray-600">
                                <span className="font-semibold">Stock:</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleDecrement(product.id)}
                                        className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="font-bold text-lg">{product.stock}</span>
                                    <button
                                        onClick={() => handleIncrement(product.id)}
                                        className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={() => handleDelete(product.id)}
                                className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-xl font-medium text-sm hover:bg-red-700 flex justify-center items-center gap-2 shadow-sm"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete Product
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
