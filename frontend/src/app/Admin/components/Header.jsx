import { ChevronLeft, Home, HomeIcon, Menu } from "lucide-react";
import { Link, useOutletContext } from "react-router";

const Header = ({
    heading = "Dashboard",
    description = "Welcome back! Here's what's happening with your platform.",
    goback = false,
}) => {
    const { isOpen, setIsOpen } = useOutletContext();
    return (
        <div className="w-full bg-white p-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <button
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Menu size={24} />
                </button>
                {goback && (
                    <Link to={-1}>
                        <ChevronLeft size={50} />
                    </Link>
                )}
                <div>
                    <h1 className="text-3xl font-bold">{heading}</h1>
                    <p className="text-sm text-black/80">{description}</p>
                </div>
            </div>
            <div>
                <Link to={"/"}>
                    <Home />
                </Link>
            </div>
        </div>
    );
};
export default Header;
