import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addToCart } from "../redux/cartSlice";
import { FaStar, FaRegStar, FaStarHalfAlt, FaHeart, FaRegHeart } from "react-icons/fa";

export default function RestaurantCard({ item }) {
    const dispatch = useDispatch();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem("favoriteRestaurants")) || [];
        const exists = favs.find(fav => fav.id === item.id);
        if (exists) setIsFavorite(true);
    }, [item.id]);

    const toggleFavorite = () => {
        let favs = JSON.parse(localStorage.getItem("favoriteRestaurants")) || [];

        if (isFavorite) {
            favs = favs.filter(fav => fav.id !== item.id);
            setIsFavorite(false);
        } else {
            favs.push(item);
            setIsFavorite(true);
        }

        localStorage.setItem("favoriteRestaurants", JSON.stringify(favs));
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} className="text-yellow-400" />);
        }

        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
        }

        while (stars.length < 5) {
            stars.push(<FaRegStar key={`empty-${stars.length}`} className="text-yellow-400" />);
        }

        return stars;
    };

    return (
        <div className="bg-white shadow-md rounded-2xl overflow-hidden w-72 relative">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />

            <button
                onClick={toggleFavorite}
                className="absolute top-2 right-2 text-xl text-red-500 bg-white rounded-full p-1"
                title="Add to Favorites"
            >
                {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </button>

            <div className="p-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.cuisine}</p>

                <div className="flex items-center gap-1 mt-2">
                    {renderStars(item.rating)}
                    <span className="text-sm text-gray-500 ml-1">({item.rating})</span>
                </div>

                <p className="text-red-500 font-bold mt-2">₹{item.price}</p>

                <button
                    onClick={() => dispatch(addToCart(item))}
                    className="mt-3 w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
