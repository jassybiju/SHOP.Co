import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";

const SearchProduct = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const value = searchParams.get("q");
	const loc = useLocation();
	console.log(loc);
	const [q, setQ] = useState(value);

	// const debouncedQuery = String(useDebounce(()=> q, 800));

	const debouncedUpdateParams = useDebounce((q) => {
		console.log(123);
		if (loc.pathname === "/search") {
			setSearchParams({
				...Object.fromEntries(searchParams),
				q: q.trim(),
			});
		}
	}, 500);

	const handleChange = (e) => {
		setQ(e.target.value), debouncedUpdateParams(e.target.value);
	};

	const handleKeyDown = (e) => {
		console.log("Debounced Ran");
		if (e.key === "Enter" && q.trim()) {
			navigate("/search?q=" + q);
		}
	};
	const navigate = useNavigate();
	// const handleKeyDown = (e) => {

	// };
	return (
		<div className="hidden lg:flex items-center bg-gray-light rounded-full px-4 py-3 w-80">
			<Search className="w-5 h-5 text-gray-400 mr-3" />
			<input
				type="text"
				placeholder="Search for products..."
				className="bg-transparent outline-none text-sm flex-1 font-poppins"
				value={q}
				// onChange={(e) => setSearchParams({ ...Object.fromEntries(searchParams), q: e.target.value })}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
			/>
		</div>
	);
};
export default SearchProduct;
