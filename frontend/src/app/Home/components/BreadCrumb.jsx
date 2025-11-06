import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router";

const BreadCrumb = ({ items, separator }) => {
  const location = useLocation();

  // If no items prop, generate from URL
  const pathItems = items?.length
    ? items
    : location.pathname
        .split("/")
        .filter(Boolean)
        .map((name, index, arr) => ({
          label: name.charAt(0).toUpperCase() + name.slice(1), // capitalize
          link: "/" + arr.slice(0, index + 1).join("/"),
        }));

  return (
    <nav className="flex items-center space-x-1 text-sm mb-6" aria-label="Breadcrumb">
      {pathItems.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (separator || <ChevronRight className="w-4 h-4 text-gray-text mx-1" />)}
          <Link
            to={item.link}
            className={`font-poppins ${index === pathItems.length - 1 ? "text-black" : "text-gray-text"}`}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default BreadCrumb;
