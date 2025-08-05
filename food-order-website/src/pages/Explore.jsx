import { useState } from "react";
import RestaurantCard from "../components/RestaurantCard";

const restaurants = [
    { id: 1, name: "Biryani House", cuisine: "Indian", price: 220, image: "https://content3.jdmagicbox.com/comp/mangalore/r6/0824px824.x824.190505144444.d7r6/catalogue/biriyani-house-mangalore-7kn9kb30m6.jpg" },
    { id: 2, name: "Pizza King", cuisine: "Italian", price: 299, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlPmxPmbOxS7csF0eJ56k6-V8BJt-QnBWstA&s" },
    { id: 3, name: "Dragon Bowl", cuisine: "Chinese", price: 180, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdR8uwyeVIs5XuTAjUhf4Q8MEyWo0aIMILZA&s" },
    { id: 4, name: "Sushi Central", cuisine: "Japanese", price: 420, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-Yv0Lkn09spPaCaaI_o0FxsYfiwZ43sN4OQ&s" },
    { id: 5, name: "Taco Mex", cuisine: "Mexican", price: 160, image: "https://howtofeedaloon.com/wp-content/uploads/2023/05/texmex-beef-taco-IG.jpg" },
    { id: 6, name: "Grill Master", cuisine: "BBQ", price: 320, image: "https://content.jdmagicbox.com/comp/meerut/b6/9999px121.x121.221117151320.m6b6/catalogue/grill-masters-western-kachery-road-meerut-restaurants-jda30w1pdh.jpg" },
    { id: 7, name: "Veggie World", cuisine: "Healthy", price: 150, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs5q4uSQ10BovFw-SUdLnUU3njNcKBP4dZQA&s" },
    { id: 8, name: "Waffle Town", cuisine: "Dessert", price: 110, image: "https://b.zmtcdn.com/data/pictures/6/19701626/56b51cf866d9237aac86caed6229c079.jpg" },
    { id: 9, name: "Mocha Cafe", cuisine: "Coffee", price: 90, image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/25/34/d2/caption.jpg?w=900&h=500&s=1" },
    { id: 10, name: "Spaghetti Spot", cuisine: "Italian", price: 270, image: "https://images.squarespace-cdn.com/content/v1/5a83e3cb017db2a72a09ddfd/1621887523776-Z0A2RB937HI57MYJ2PXE/black-bean-prawn-linguine.jpeg" },
    { id: 11, name: "Chole Bhature", cuisine: "Indian", price: 140, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRTltZRK6Nb2hlLcg-PySvkjbxAJdEx_0zcQ&s" },
    { id: 12, name: "Falafel Fiesta", cuisine: "Middle Eastern", price: 200, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-q8ph-WkZooBUONCTBYsQQ5H76GXF_ZO91w&s" },
];

const cuisines = ["All", ...Array.from(new Set(restaurants.map((r) => r.cuisine))).sort()];

const sortRestaurants = (list, sortType) => {
    if (sortType === "lowToHigh") return [...list].sort((a, b) => a.price - b.price);
    if (sortType === "highToLow") return [...list].sort((a, b) => b.price - a.price);
    return list;
};

export default function Explore() {
    const [selectedCuisine, setSelectedCuisine] = useState("All");
    const [sortType, setSortType] = useState("default");
    const [filterType, setFilterType] = useState(null);

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
            <div className="relative h-[250px] bg-gradient-to-r from-red-600 to-pink-500 text-white flex items-center justify-center shadow-xl">
                <div className="text-center px-6">
                    <h1 className="text-4xl font-extrabold drop-shadow-lg">Discover the Best Food in Town</h1>
                    <p className="text-lg mt-2 font-light drop-shadow-sm">Curated dishes across all cuisines 🍽️</p>
                </div>
            </div>

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
                            onClick={() => setFilterType(filter.key)}
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
