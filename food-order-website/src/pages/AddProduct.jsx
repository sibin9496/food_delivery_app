import { useState } from "react";
import { PlusCircle } from "lucide-react";

export default function AddProduct() {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        image: "",
        cuisine: "",
        rating: "4.5",
        stock: "",
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleAddProduct = (e) => {
        e.preventDefault();

        const products = JSON.parse(localStorage.getItem("adminProducts")) || [];

        const newProduct = {
            id: Date.now() + Math.random(),
            ...product,
            price: parseFloat(product.price),
            stock: parseInt(product.stock),
        };

        products.push(newProduct);
        localStorage.setItem("adminProducts", JSON.stringify(products));
        alert("✅ Product added successfully!");

        setProduct({
            name: "",
            price: "",
            image: "",
            cuisine: "",
            rating: "4.5",
            stock: "",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-xl bg-white shadow-2xl rounded-2xl p-10 border border-gray-200">
                <h2 className="text-3xl font-extrabold text-center text-black-700 mb-6 flex items-center justify-center gap-2">
                    <PlusCircle className="w-7 h-7" />
                    Add New Product
                </h2>

                <form onSubmit={handleAddProduct} className="space-y-6">
                    {["name", "price", "image", "cuisine", "rating", "stock"].map((field) => (
                        <div key={field}>
                            <label className="block mb-1 font-semibold text-gray-700 capitalize">
                                {field.replace("_", " ")}
                            </label>
                            <input
                                type={field === "price" || field === "stock" ? "number" : "text"}
                                name={field}
                                value={product[field]}
                                onChange={handleChange}
                                placeholder={`Enter ${field}`}
                                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-md"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
}
