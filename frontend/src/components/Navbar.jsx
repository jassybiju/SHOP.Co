import { Heart, Search, ShoppingCart, User, ChevronDown } from "lucide-react";
import { useLogoutUser } from "../app/Auth/hooks/useAuth";

export default function Navbar() {
    const {mutate : logoutUser} = useLogoutUser()
    return (
        <header className="w-full bg-white border-b border-gray-100 h-[10vh]  ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <div className="flex items-center">
                        <h1 className="font-bakbak text-2xl md:text-3xl font-normal text-black">
                            SHOP.CO
                        </h1>
                    </div>

                    {/* Navigation - Hidden on mobile */}
                    <nav className="hidden lg:flex items-center space-x-6">
                        <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700 transition-colors">
                            <span className="font-poppins text-base font-normal text-black">
                                Shop
                            </span>
                            <ChevronDown className="h-4 w-4 text-black" />
                        </div>
                        <a
                            href="#"
                            className="font-poppins text-base font-normal text-black hover:text-gray-700 transition-colors"
                        >
                            On Sale
                        </a>
                        <a
                            href="#"
                            className="font-poppins text-base font-normal text-black hover:text-gray-700 transition-colors"
                        >
                            New Arrivals
                        </a>
                        <a
                            href="#"
                            className="font-poppins text-base font-normal text-black hover:text-gray-700 transition-colors"
                        >
                            Brands
                        </a>
                    </nav>

                    {/* Search Bar - Hidden on small screens */}
                    <div className="hidden md:flex flex-1 max-w-lg mx-6">
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                                <Search className="h-6 w-6 text-black/40" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for products..."
                                className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full border-0 font-poppins text-base placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black/10"
                            />
                        </div>
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center space-x-4">
                        {/* Mobile search icon */}
                        <button className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <Search className="h-6 w-6 text-black" />
                        </button>

                        {/* Cart with notification badge */}
                        <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ShoppingCart className="h-6 w-6 text-black" />
                            <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                                4
                            </div>
                        </button>

                        {/* Favorites */}
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <Heart className="h-6 w-6 text-black" />
                        </button>

                        {/* User Profile */}
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" onClick={()=>logoutUser()}>
                            <User className="h-6 w-6 text-black" />
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className="md:hidden pb-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                            <Search className="h-5 w-5 text-black/40" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="w-full pl-11 pr-4 py-3 bg-gray-100 rounded-full border-0 font-poppins text-sm placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black/10"
                        />
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="lg:hidden pb-4">
                    <nav className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700 transition-colors">
                            <span className="font-poppins text-sm font-normal text-black">
                                Shop
                            </span>
                            <ChevronDown className="h-3 w-3 text-black" />
                        </div>
                        <a
                            href="#"
                            className="font-poppins text-sm font-normal text-black hover:text-gray-700 transition-colors"
                        >
                            On Sale
                        </a>
                        <a
                            href="#"
                            className="font-poppins text-sm font-normal text-black hover:text-gray-700 transition-colors"
                        >
                            New Arrivals
                        </a>
                        <a
                            href="#"
                            className="font-poppins text-sm font-normal text-black hover:text-gray-700 transition-colors"
                        >
                            Brands
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
}
