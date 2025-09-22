import { ChevronLeft, Home, HomeIcon } from "lucide-react";
import { Link } from "react-router";

const Header = ({
    heading = "Dashboard",
    description = "Welcome back! Here's what's happening with your platform.",
    goback = false,
}) => {
    return (
        <div className="w-full bg-white p-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
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
                <Link to={"/admin/"}>
                    <Home />
                </Link>
            </div>
        </div>
    );
};
export default Header;
