import { useState, useEffect } from "react";
import RestaurantCard from "../components/RestaurantCard";

const sortRestaurants = (list, sortType) => {
    if (sortType === "lowToHigh") return [...list].sort((a, b) => a.price - b.price);
    if (sortType === "highToLow") return [...list].sort((a, b) => b.price - a.price);
    return list;
};

export default function Explore() {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedCuisine, setSelectedCuisine] = useState("All");
    const [sortType, setSortType] = useState("default");
    const [filterType, setFilterType] = useState(null);

    useEffect(() => {
        fetch("/data/restaurants.json")
            .then((res) => res.json())
            .then((data) => setRestaurants(data))
            .catch((err) => console.error("Error loading data:", err));
    }, []);

    const cuisines = ["All", ...Array.from(new Set(restaurants.map(r => r.cuisine))).sort()];

    let filtered = selectedCuisine === "All"
        ? restaurants
        : restaurants.filter((r) => r.cuisine === selectedCuisine);

    if (filterType === "under200") filtered = filtered.filter((r) => r.price <= 200);
    if (filterType === "topRated") filtered = filtered.filter((r) => r.price >= 300);
    if (filterType === "pureVeg") filtered = filtered.filter((r) => r.name.toLowerCase().includes("veg"));
    if (filterType === "nonVeg") filtered = filtered.filter((r) => !r.name.toLowerCase().includes("veg"));
    if (filterType === "freeDelivery") filtered = filtered.filter((_, i) => i % 2 === 0);

    const sorted = sortRestaurants(filtered, sortType);

    return (
        <div>
            {/* Hero Section */}
            <div className="relative h-[250px] bg-gradient-to-r from-red-600 to-pink-500 text-white flex items-center justify-center shadow-xl">
                <div className="text-center px-6">
                    <h1 className="text-4xl font-extrabold drop-shadow-lg">Discover the Best Food in Town</h1>
                    <p className="text-lg mt-2 font-light drop-shadow-sm">Curated dishes across all cuisines 🍽️</p>
                </div>
            </div>

            {/* Filters */}
            <div className="sticky top-0 z-20 backdrop-blur-md bg-white/60 border-b border-gray-200 shadow-md px-10 py-4 flex flex-col md:flex-row justify-between items-start md:items-center max-w-10xl mx-auto gap-4">
                <div className="flex flex-wrap gap-2">
                    {cuisines.map((cuisine) => (
                        <button
                            key={cuisine}
                            onClick={() => setSelectedCuisine(cuisine)}
                            className={`px-5 py-2 rounded-full text-sm md:text-base font-medium transition border 
                            ${selectedCuisine === cuisine
                                    ? "bg-red-500 text-white border-red-500 shadow-sm"
                                    : "text-gray-700 border-gray-300 bg-white hover:bg-red-50 hover:text-red-500"}`}
                        >
                            {cuisine}
                        </button>
                    ))}
                </div>

                <div className="flex flex-wrap gap-2 px-6 py-4">
                    {[
                        { label: "Under ₹200", key: "under200" },
                        { label: "Open Now", key: "openNow" },
                        { label: "Top Rated", key: "topRated" },
                        { label: "Pure Veg", key: "pureVeg" },
                        { label: "Non-Veg", key: "nonVeg" },
                        { label: "Free Delivery", key: "freeDelivery" },
                    ].map((filter) => (
                        <button
                            key={filter.key}
                            onClick={() =>
                                setFilterType(filterType === filter.key ? null : filter.key)
                            }
                            className={`border px-4 py-2 rounded-full text-sm ${filterType === filter.key ? "bg-red-500 text-white border-red-500" : "border-gray-300 hover:bg-gray-100"}`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                <div className="w-full md:w-50">
                    <select
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                        className="w-full text-sm bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                    >
                        <option value="default">Sort: Default</option>
                        <option value="lowToHigh">Price: Low → High</option>
                        <option value="highToLow">Price: High → Low</option>
                    </select>
                </div>
            </div>

            {/* Restaurant Cards */}
            <div className="px-6 py-10 bg-gray-50 min-h-screen">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                    {sorted.map((item) => (
                        <RestaurantCard key={item.id} item={item} />
                    ))}
                </div>
                {sorted.length === 0 && (
                    <div className="text-center mt-10 text-gray-600 text-lg">
                        No restaurants found for this category.
                    </div>
                )}
            </div>
        </div>
    );
}
