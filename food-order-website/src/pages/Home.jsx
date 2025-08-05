import { useState, useEffect } from "react";
import RestaurantCard from "../components/RestaurantCard";

const staticRestaurants = [
    { id: 1, name: "Royal Biryani", cuisine: "Indian", price: 240, image: "https://images.jdmagicbox.com/v2/comp/bangalore/r5/080pxx80.xx80.180205130314.d8r5/catalogue/royal-biryani-house-kaggadasapura-bangalore-hyderabadi-restaurants-wo9q9dcvy0.jpg" },
    { id: 2, name: "Napoli Pizza", cuisine: "Italian", price: 320, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4lr4Bq4NakxfcUzcOCn91h6bJQBhEIru8Mg&s" },
    { id: 3, name: "Golden Sushi", cuisine: "Japanese", price: 450, image: "https://img.etimg.com/photo/msid-111264268,imgsize-40886/GoldenSushi.jpg" },
    { id: 4, name: "Beijing Wok", cuisine: "Chinese", price: 210, image: "https://media-cdn.tripadvisor.com/media/photo-s/1a/8c/e2/60/beijing-wok.jpg" },
    { id: 5, name: "Taco Supreme", cuisine: "Mexican", price: 170, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4YUy5heAasfD1HRVg3TW9zxN3j1K_XF073w&s" },
    { id: 6, name: "Grill House", cuisine: "BBQ", price: 350, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmMdvkRKWSE8Pxtq0Hv0e7fEDqjqceOoqz0Q&s" },
    { id: 7, name: "Green Feast", cuisine: "Healthy", price: 160, image: "https://cdn.dotpe.in/longtail/store-logo/4940246/kTXH1dzE.webp" },
    { id: 8, name: "Sweet Heaven", cuisine: "Dessert", price: 130, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBZvR9vzqGK0bN-TF1bfneW5ve0rrYIqqzfQ&s" },
    { id: 9, name: "Arabian Night", cuisine: "Middle Eastern", price: 260, image: "https://i1.sndcdn.com/artworks-000482975640-qxgar8-t500x500.jpg" },
    { id: 10, name: "Kolkata Kathi", cuisine: "Indian", price: 180, image: "https://i.ytimg.com/vi/0n7PQD9NBvE/hq720.jpg" },
    { id: 11, name: "Mocha Vibes", cuisine: "Coffee", price: 95, image: "https://b.zmtcdn.com/data/pictures/chains/0/20606930/0534c422669845aad249c94224aff238.jpg" },
    { id: 12, name: "Pasta Palace", cuisine: "Italian", price: 280, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZzvG_n4f7lCigky8mdPVncl5I-cEmY2znpA&s" },
];

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

    useEffect(() => {
        const fromStorage = JSON.parse(localStorage.getItem("adminProducts")) || [];
        setProducts(fromStorage);
    }, []);

    const combinedItems = [...staticRestaurants, ...products];

    const cuisines = [
        "All",
        ...Array.from(new Set(combinedItems.map((r) => r.cuisine))).sort(),
    ];

    let filtered = selectedCuisine === "All"
        ? combinedItems
        : combinedItems.filter((r) => r.cuisine === selectedCuisine);

    if (filterType === "under200") {
        filtered = filtered.filter((r) => r.price <= 200);
    }

    const sorted = sortRestaurants(filtered, sortType);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="relative h-[250px] bg-gradient-to-r from-red-600 to-pink-500 text-white flex items-center justify-center shadow-xl">
                <div className="text-center px-6">
                    <h1 className="text-5xl font-extrabold drop-shadow-xl tracking-wide">Welcome to Zomato Clone</h1>
                    <p className="text-xl mt-3 font-light drop-shadow-sm italic">
                        Exclusive restaurants. Handpicked dishes. First-class experience. 🥂
                    </p>
                </div>
            </div>

            <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
                <div className="max-w-10xl mx-auto px-10 py-4 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
                    <div className="flex flex-wrap gap-2">
                        {cuisines.map((cuisine) => (
                            <button
                                key={cuisine}
                                onClick={() => setSelectedCuisine(cuisine)}
                                className={`px-5 py-2 rounded-full text-sm md:text-base font-medium transition border 
                    ${selectedCuisine === cuisine
                                        ? "bg-red-500 text-white border-red-500 shadow"
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
                                onClick={() => setFilterType(filterType === filter.key ? null : filter.key)}
                                className={`border px-4 py-2 rounded-full text-sm transition 
                    ${filterType === filter.key
                                        ? "bg-red-500 text-white border-red-500"
                                        : "border-gray-300 hover:bg-gray-100"}`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>

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
