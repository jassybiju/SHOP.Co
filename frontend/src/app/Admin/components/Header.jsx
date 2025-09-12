import { Home, HomeIcon } from "lucide-react";
import { Link } from "react-router";

const Header = ({
    heading = "Dashboard",
    description = "Welcome back! Here's what's happening with your platform.",
}) => {
    return (
        <div className="w-full bg-white p-6 flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold">{heading}</h1>
                <p className="text-sm text-black/80">{description}</p>
            </div>
            <div>
                <Link to={'/admin/'}><Home/></Link>
            </div>
        </div>
    );
};
export default Header;
