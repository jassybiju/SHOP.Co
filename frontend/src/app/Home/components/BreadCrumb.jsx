import { ChevronRight } from "lucide-react";
import { Link } from "react-router";

const BreadCrumb = ({items}) => {
    // console.log(items)
    return (
        <nav className="flex items-center space-x-1 text-sm mb-6">
            {items.map((item, index) => (
                <div key={index} className="flex items-center">
                    {index > 0 && (
                        <ChevronRight className="w-4 h-4 text-gray-text mx-1 " />
                    )}
                    <Link 
                    to={item.link}
                        className={`font-poppins ${
                            index === items.length - 1
                                ? "text-black"
                                : "text-gray-text"
                        }`}
                    >
                        {item.label}
                    </Link>
                </div>
            ))}
        </nav>
    );
};
export default BreadCrumb;
