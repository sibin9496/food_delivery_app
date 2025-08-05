import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-950 text-gray-300 pt-12 px-6 mt-24 border-t border-gray-800">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Zomato Clone</h3>
                    <p className="text-sm text-gray-400">
                        Discover the best food & drinks in your city. Explore menus, order online, and enjoy quick delivery from top restaurants near you.
                    </p>
                </div>

                <div>
                    <h4 className="text-base font-semibold mb-4 text-white">Company</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-white">About Us</a></li>
                        <li><a href="#" className="hover:text-white">Careers</a></li>
                        <li><a href="#" className="hover:text-white">Team</a></li>
                        <li><a href="#" className="hover:text-white">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-base font-semibold mb-4 text-white">For Foodies</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="/explore" className="hover:text-white">Explore Restaurants</a></li>
                        <li><a href="/cart" className="hover:text-white">My Cart</a></li>
                        <li><a href="/login" className="hover:text-white">Login</a></li>

                    </ul>
                </div>

                <div>
                    <h4 className="text-base font-semibold mb-4 text-white">Follow Us</h4>
                    <div className="flex gap-4 text-xl text-gray-400">
                        <a href="#" className="hover:text-white"><FaFacebookF /></a>
                        <a href="#" className="hover:text-white"><FaTwitter /></a>
                        <a href="#" className="hover:text-white"><FaInstagram /></a>
                        <a href="#" className="hover:text-white"><FaYoutube /></a>
                    </div>
                </div>

                <div>
                    <h4 className="text-base font-semibold mb-4 text-white">Download App</h4>
                    <div className="space-y-3">
                        <a href="#">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                alt="Google Play"
                                className="h-10"
                            />
                        </a>
                        <a href="#">
                            <img
                                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                                alt="App Store"
                                className="h-10"
                            />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 mt-10 pt-3 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Zomato Clone. All rights reserved.
            </div>
        </footer>
    );
}
