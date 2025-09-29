import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const SearchProduct = () => {

  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate('/search?q='+query)
    }
  };
    return (

        <div className="hidden lg:flex items-center bg-gray-light rounded-full px-4 py-3 w-80">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
                type="text"
                placeholder="Search for products..."
                className="bg-transparent outline-none text-sm flex-1 font-poppins"
                value={query}
                onChange={(e)=> setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};
export default SearchProduct;
