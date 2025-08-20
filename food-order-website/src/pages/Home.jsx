import { useState, useEffect } from "react";
import RestaurantCard from "../components/RestaurantCard";

const sortRestaurants = (list, sortType) => {
    if (sortType === "lowToHigh") return [...list].sort((a, b) => a.price - b.price);
    if (sortType === "highToLow") return [...list].sort((a, b) => b.price - a.price);
    return list;
};

export default function Home() {
    const [selectedCuisine, setSelectedCuisine] = useState("All");
    const [sortType, setSortType] = useState("default");
    const [filterType, setFilterType] = useState(null);
    const [products, setProducts] = useState([]);
    const [staticRestaurants, setStaticRestaurants] = useState([]);

    useEffect(() => {
        fetch("/data/restaurants.json")
            .then(res => res.json())
            .then(data => setStaticRestaurants(data))
            .catch(err => console.error("Error loading restaurants:", err));

        const fromStorage = JSON.parse(localStorage.getItem("adminProducts")) || [];
        setProducts(fromStorage);
    }, []);

    const combinedItems = [...staticRestaurants, ...products];

    const cuisines = [
        "All",
        ...Array.from(new Set(combinedItems.map(r => r.cuisine))).sort(),
    ];

    let filtered = selectedCuisine === "All"
        ? combinedItems
        : combinedItems.filter(r => r.cuisine === selectedCuisine);

    if (filterType === "under200") {
        filtered = filtered.filter(r => r.price <= 200);
    }

    const sorted = sortRestaurants(filtered, sortType);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="relative h-[250px] bg-gradient-to-r from-red-600 to-pink-500 text-white flex items-center justify-center shadow-xl">
                <div className="text-center px-6">
                    <h1 className="text-5xl font-extrabold drop-shadow-xl tracking-wide">
                        Welcome to Zomato Clone
                    </h1>
                    <p className="text-xl mt-3 font-light drop-shadow-sm italic">
                        Exclusive restaurants. Handpicked dishes. First-class experience. 🥂
                    </p>
                </div>
            </div>

            {/* Filters & Sorting */}
            <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
                <div className="max-w-10xl mx-auto px-10 py-4 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
                    {/* Cuisine Buttons */}
                    <div className="flex flex-wrap gap-2">
                        {cuisines.map(cuisine => (
                            <button
                                key={cuisine}
                                onClick={() => setSelectedCuisine(cuisine)}
                                className={`px-5 py-2 rounded-full text-sm md:text-base font-medium transition border ${selectedCuisine === cuisine
                                        ? "bg-red-500 text-white border-red-500 shadow"
                                        : "text-gray-700 border-gray-300 bg-white hover:bg-red-50 hover:text-red-500"
                                    }`}
                            >
                                {cuisine}
                            </button>
                        ))}
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-2 px-6 py-4">
                        {[
                            { label: "Under ₹200", key: "under200" },
                            { label: "Open Now", key: "openNow" },
                            { label: "Top Rated", key: "topRated" },
                            { label: "Pure Veg", key: "pureVeg" },
                            { label: "Non-Veg", key: "nonVeg" },
                            { label: "Free Delivery", key: "freeDelivery" },
                        ].map(filter => (
                            <button
                                key={filter.key}
                                onClick={() =>
                                    setFilterType(filterType === filter.key ? null : filter.key)
                                }
                                className={`border px-4 py-2 rounded-full text-sm transition ${filterType === filter.key
                                        ? "bg-red-500 text-white border-red-500"
                                        : "border-gray-300 hover:bg-gray-100"
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    {/* Sort Dropdown */}
                    <div className="w-full md:w-60">
                        <select
                            value={sortType}
                            onChange={(e) => setSortType(e.target.value)}
                            className="w-full md:w-auto text-sm bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                        >
                            <option value="default">Sort: Default</option>
                            <option value="lowToHigh">Price: Low → High</option>
                            <option value="highToLow">Price: High → Low</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Restaurant List */}
            <div className="px-6 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                    {sorted.map((item) => (
                        <RestaurantCard key={item.id} item={item} />
                    ))}
                </div>
                {sorted.length === 0 && (
                    <div className="text-center mt-10 text-gray-600 text-lg">
                        No restaurants found for this filter.
                    </div>
                )}
            </div>
        </div>
    );
}
