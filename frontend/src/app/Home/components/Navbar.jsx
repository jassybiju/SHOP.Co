import {
    ChevronDown,
    Heart,
    Search,
    ShoppingCart,
    User,
    X,
} from "lucide-react";
import { useLogoutUser } from "../../Auth/hooks/useAuth";
import { useUser } from "../../../hooks/useUser";
import { Link, NavLink, useNavigate } from "react-router";
import SearchProduct from "./SearchProduct";
import Dropdown from "./DropDown";
const Navbar = () => {
    const { mutate: logout } = useLogoutUser();
    const { data: user } = useUser();
    const navigate = useNavigate();
    let dropdownitems = [{ label: "Logout", onClick: logout }];
    if (user?.role === "admin") {
        dropdownitems.push({
            label: "Admin",
            onClick: () => navigate("admin"),
        });
    }
    return (
        <>
            {!user && (
                <div className="bg-black text-white px-4 py-2 text-center relative">
                    <p className="text-sm font-poppins">
                        Sign up and get 20% off to your first order.{" "}
                        <span className="underline cursor-pointer">
                            Sign Up Now
                        </span>
                    </p>
                    <button className="absolute right-4 top-1/2 -translate-y-1/2">
                        <X className="w-5 h-5" />
                    </button>
                </div>
            )}
            {/* Header */}
            <header className="border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <h1 className="font-bakbak text-2xl font-bold">
                                SHOP.CO
                            </h1>
                        </div>

                        {/* Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {/* Home */}
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `relative font-poppins cursor-pointer
       after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]
       after:w-0 after:bg-black after:transition-all after:duration-300
       hover:after:w-full ${isActive ? "after:w-full" : ""}`
                                }
                            >
                                Home
                            </NavLink>

                            {/* New Arrivals */}
                            <NavLink
                                to="/search"
                                className={({ isActive }) =>
                                    `relative font-poppins cursor-pointer
       after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]
       after:w-0 after:bg-black after:transition-all after:duration-300
       hover:after:w-full ${isActive ? "after:w-full" : ""}`
                                }
                            >
                                Shop
                            </NavLink>

                            {/* About */}
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    `relative font-poppins cursor-pointer
       after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]
       after:w-0 after:bg-black after:transition-all after:duration-300
       hover:after:w-full ${isActive ? "after:w-full" : ""}`
                                }
                            >
                                About
                            </NavLink>

                            {/* Contact */}
                            <NavLink
                                to="/contact"
                                className={({ isActive }) =>
                                    `relative font-poppins cursor-pointer
       after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]
       after:w-0 after:bg-black after:transition-all after:duration-300
       hover:after:w-full ${isActive ? "after:w-full" : ""}`
                                }
                            >
                                Contact
                            </NavLink>
                        </nav>

                        {/* Search and Icons */}
                        <div className="flex items-center space-x-4">
                            <SearchProduct />
                            {user ? (
                                <div className="flex items-center space-x-3">
                                    <Search className="w-6 h-6 lg:hidden cursor-pointer" />
                                    <div className="relative cursor-pointer">
                                        <ShoppingCart className="w-6 h-6" />
                                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            4
                                        </div>
                                    </div>
                                    <Heart className="w-6 h-6 cursor-pointer" />

                                    <Dropdown
                                        label={
                                            <User className="w-6 h-6 cursor-pointer" />
                                        }
                                        items={dropdownitems}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <Link
                                        to={"/auth/login"}
                                        className="bg-black text-white px-10 py-2 rounded-full hover:bg-black/90"
                                    >
                                        Login
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};
export default Navbar;
