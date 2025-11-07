import { use, useState } from "react";
import Navbar from "../../components/Navbar";
import { ChevronDown, ChevronLeft, ChevronRight, Filter, Check, Sliders, Cross, X } from "lucide-react";
import { forwardRef } from "react";
import { Slider } from "./components/Slider";
import { useSearchProduct } from "../../hooks/useSearch";
import { useGetAllBrands } from "../../../Admin/hooks/useBrandManagement";
import ProductCard from "./components/ProductCard";
import { useEffect } from "react";
import Pagination from "./components/Pagination";
import { useSearchParams } from "react-router";
import BreadCrumb from "../../components/BreadCrumb";
import { useThrottle } from "../../../../hooks/useThrottle";
import MultiRangeSlider from "./components/MultiRangeSlider";
import { useResponsive } from "@/hooks/useResponsive";

// const Slider = ()=>(<>SLider</>)

const SearchPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
    const [isOpen , setIsOpen] = useState(false)
    const {isTab} = useResponsive()
	const params = {
		q: searchParams.get("q"),
		category: searchParams.getAll("category"),
		brand: searchParams.getAll("brand"),
		color: searchParams.getAll("color"),
		size: searchParams.getAll("size"),
		sort: searchParams.get("sort"),
		order: searchParams.get("order"),
	};

	// console.log(params);
	const [filterToggle, setFilterToggle] = useState({
		color: true,
		category: true,
		price: true,
		size: true,
		brand: true,
	});
	// const [selectedColors, setSelectedColors] = useState(["#063AF5"]);
	// const [currentPage, setCurrentPage] = useState(1);

	// const [params, setParams] = useState({
	//     q: q,
	//     sort: "createdAt",
	//     order: "desc",
	//     price_min: 0,
	//     price_max: null,
	//     size: [],
	//     brand: [],
	//     limit: 1,
	//     category: [],
	//     color: [],
	//     page: 1,
	// });
	// useEffect(() => {
	//     setParams((state) => ({ ...state, q: q, page: 1 }));
	// }, [q]);

	const [priceRange, setPriceRange] = useState([0, 0]);
	const [throttleRange, setThrottleRange] = useState(priceRange);

	// useEffect(() => {
	//     const handler = setTimeout(() => {
	//         setDebouncedRange(priceRange);
	//     }, 1000);

	//     return ()=> clearTimeout(handler)
	// }, [priceRange]);

	const { data, isLoading } = useSearchProduct({
		...params,
		price_min: throttleRange[0],
		price_max: throttleRange[1],
	});
	console.log(data);
	useEffect(() => {
		console.log(priceRange, 123);
	}, [priceRange]);
	useEffect(() => {
		if (data?.minPrice && data?.maxPrice && priceRange[1] === 0 && priceRange[0] === 0) {
			setPriceRange([data.minPrice, data.maxPrice]);
		}
	}, [data, priceRange]);
	//   useEffect(()=> {
	//     if(data?.pages < params?.page){
	//         setParams((state)=> ({...state, page : data.pages}))
	//     }
	//     // console.log(users?.page , params?.page)
	// },[params,   data])
	// useEffect(() => {
	//     if (data?.minPrice > params.price_min) {
	//         setParams((state) => ({ ...state, price_min: data.minPrice }));
	//     }
	//     if (data?.maxPrice < params.price_max) {
	//         setParams((state) => ({ ...state, price_max: data.maxPrice }));
	//     }
	// }, [data, params]);

	if (isLoading) {
		return "Searching...";
	}

	const SORT_OPTIONS = [
		// { label: "Most Popular", sort: "popularity", order: "desc" },
		{ label: "Price: Low to High", sort: "price", order: "asc" },
		{ label: "Price: High to Low", sort: "price", order: "desc" },
		{ label: "Newest First", sort: "createdAt", order: "desc" },
		{ label: "Oldest First", sort: "createdAt", order: "asc" },
	];

	const products = data?.data;
	// console.log(data, filterToggle, params);

	const breadcrumbItems = [
		{ label: "Home", link: "/" },
		{ label: "search", link: "/search" },
	];

	const toggleCategories = (cat) => {
		const updated = params.category.includes(cat) ? params.category.filter((c) => c !== cat) : [...params.category, cat];
		setSearchParams({
			...Object.fromEntries(searchParams),
			category: updated,
		});
	};

	const toggleColor = (col) => {
		const updated = params.color.includes(col) ? params.color.filter((c) => c !== col) : [...params.color, col];
		setSearchParams({
			...Object.fromEntries(searchParams),
			color: updated,
		});
	};

	const toggleSize = (size) => {
		const updated = params.size.includes(size) ? params.size.filter((s) => s !== size) : [...params.size, size];
		setSearchParams({ ...Object.fromEntries(searchParams), size: updated });
	};

	const toggleBrand = (brand) => {
		const updated = params.brand.includes(brand) ? params.brand.filter((b) => b !== brand) : [...params.brand, brand];
		setSearchParams({
			...Object.fromEntries(searchParams),
			brand: updated,
		});
	};
	const toggleSortOptions = (option) => {
		// console.log(option,12340)
		setSearchParams({
			...Object.fromEntries(searchParams),
			sort: option.sort,
			order: option.order,
		});
	};
	return (
		<>
			<div className="min-h-screen bg-white p-6">
				{/* Breadcrumb */}

				<BreadCrumb items={breadcrumbItems} />
				<div className="flex gap-6 px-0">
					{/* Filter Sidebar */}
					<div className={`md:w-1/3 max-w-[400px] md:block  w-full z-1000 bg-white flex-shrink-0 ${isTab && isOpen ? 'block' : 'hidden'}`}>
						<div className="border border-black/10 rounded-[20px] bg-white p-6">
							{/* Filter Header */}
							<div className="flex items-center justify-between mb-6">
								<h2 className="text-xl font-bold text-black">Filters</h2>
								<div className="flex items-center gap-3">
									<button
										className="text-black/60 text-sm"
										onClick={() => setSearchParams({})}
										//         q: "",
										//         sort: "createdAt",
										//         order: "desc",
										//         price_min: 0,
										//         price_max: null,
										//         size: [],
										//         brand: [],
										//         limit: 10,
										//         category: [],
										//         color: [],
										//         page: 1,
										//     })
										// }
									>
										Clear All
									</button>
									 <X className="w-6 h-6 text-black md:hidden block" onClick={()=>setIsOpen(false)} />
								</div>
							</div>

							{/* Categories */}
							<div className="border-b border-black/10 pb-2 mb-6">
								<button
									className="flex items-center justify-between mb-4"
									onClick={() =>
										setFilterToggle((state) => ({
											...state,
											category: !state.category,
										}))
									}
								>
									<h3 className="text-base font-semibold text-black">Categories</h3>
									<ChevronDown className={`w-4 h-4 text-black ${filterToggle.category && "rotate-180"}`} />
								</button>
								{filterToggle.category && (
									<div className="space-y-4 mb-6">
										{data?.allCategories.map((category) => (
											<div key={category} className="flex items-center gap-3">
												{/* <Checkbox className="w-4 h-4 border-gray-400" /> */}
												<button
													className={`text-sm text-black/60  cursor-pointer px-7 py-2 rounded w-full ${
														params.category.includes(category)
															? `bg-gray-400 text-white `
															: "hover:bg-gray-200"
													}`}
													onClick={() => {
														toggleCategories(category);
													}}
													// onClick={() =>
													//     setParams((state) => ({
													//         ...state,
													//         category:
													//             state.category.includes(
													//                 category
													//             )
													//                 ? state.category.filter(
													//                       (x) =>
													//                           x !==
													//                           category
													//                   )
													//                 : [
													//                       ...state.category,
													//                       category,
													//                   ],
													//     }))
													// }
												>
													{category}
												</button>
											</div>
										))}
									</div>
								)}
							</div>

							{/* Price Range */}
							<div className="border-b border-black/10 pb-6 mb-6">
								<button
									className="flex items-center justify-between mb-4"
									onClick={() =>
										setFilterToggle((state) => ({
											...state,
											price: !state.price,
										}))
									}
								>
									<h3 className="text-base font-semibold text-black">Price Range</h3>
									<ChevronDown className={`w-4 h-4 text-black ${filterToggle.price && "rotate-180"} `} />
								</button>
								{filterToggle.price && (
									<div className="space-y-4">
										<div className="flex justify-between text-sm font-medium text-black">
											<span>${data.minPrice || 0}</span>
											<span>${data.maxPrice || 1000}</span>
										</div>
										<Slider
											value={priceRange}
											onAfterChange={(value) => setThrottleRange(value)}
											onValueChange={([min, max]) => {
												setPriceRange([min, max]);
											}}
											// onValueChange={([min, max]) =>
											//     setParams((state) => ({
											//         ...state,
											//         price_min: min,
											//         price_max: max,
											//     }))
											// }
											max={data.maxPrice}
											min={data.minPrice}
											step={10}
											className="w-full"
										/>
										{/* <div className="flex gap-4">
                                        <div>
                                            <label className="text-xs text-black/60 block mb-1">
                                                Min
                                            </label>
                                            <input
                                                className="w-[159px] h-10 border border-black/20 rounded-lg"
                                                onChange={(e) =>
                                                    ((x) => [
                                                        e.target.value,
                                                        x[1],
                                                    ])
                                                }
                                                value={priceRange[0]}
                                                min={50}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-black/60 block mb-1">
                                                Max
                                            </label>
                                            <div className="w-[159px] h-10 border border-black/20 rounded-lg" />
                                        </div>
                                    </div> */}
									</div>
								)}
							</div>

							{/* Colors */}
							<div className="border-b border-black/10 pb-6 mb-6">
								<button
									className="flex items-center justify-between mb-4"
									onClick={() =>
										setFilterToggle((state) => ({
											...state,
											color: !state.color,
										}))
									}
								>
									<h3 className="text-base font-semibold text-black">Colors</h3>
									<ChevronDown className={`w-4 h-4 text-black ${filterToggle.color && "rotate-180"}`} />
								</button>
								{filterToggle.color && (
									<div className="grid grid-cols-5 gap-4">
										{[
											...params.color,
											...(data?.allColors?.length
												? data.allColors.filter((x) => !params.color.includes(x))
												: ["#000000", "#FFFFFF", "#FF0000", "#0000FF"]),
										].map((color) => (
											<button
												key={color}
												className="w-10 h-10 rounded-full border relative"
												style={{
													backgroundColor: color,
													borderColor: color === "#FFFFFF" ? "#000000" : "transparent",
													borderWidth: color === "#FFFFFF" ? "1px" : "0",
													opacity: color === "#FFFFFF" ? 0.2 : 1,
												}}
												onClick={() => toggleColor(color)}
												// onClick={() => {
												//     if (
												//         params.color.includes(
												//             color
												//         )
												//     ) {
												//         setParams((state) => ({
												//             ...state,
												//             color: state.color.filter(
												//                 (x) =>
												//                     x !== color
												//             ),
												//         }));
												//     } else {
												//         setParams((state) => ({
												//             ...state,
												//             color: [
												//                 ...state.color,
												//                 color,
												//             ],
												//         }));
												//     }
												// }}
											>
												{params.color.includes(color) && (
													<Check className="w-5 h-5 text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
												)}
											</button>
										))}
									</div>
								)}
							</div>

							{/* Sizes */}
							<div className="border-b border-black/10 pb-6 mb-6">
								<button
									className="flex items-center justify-between mb-4"
									onClick={() =>
										setFilterToggle((state) => ({
											...state,
											size: !state.size,
										}))
									}
								>
									<h3 className="text-base font-semibold text-black">Sizes</h3>
									<ChevronDown className={`w-4 h-4 text-black ${filterToggle.size && "rotate-180"} `} />
								</button>
								{filterToggle.size && (
									<div className="flex flex-wrap gap-2">
										{(data?.allSizes ? data.allSizes : ["M", "XL"]).sort().map((size) => (
											<button
												key={size}
												className={`px-4 py-2 bg-[#F0F0F0] text-black/60 text-sm font-medium rounded-full border border-[#F0F0F0] hover:bg-black/70 hover:text-white transition-colors ${
													params.size.includes(size) && "bg-black text-white hover:bg-black"
												}`}
												onClick={() => toggleSize(size)}
												// onClick={() =>
												//     setParams((state) => ({
												//         ...state,
												//         size: state.size.includes(
												//             size
												//         )
												//             ? state.size.filter(
												//                   (x) =>
												//                       x != size
												//               )
												//             : [
												//                   ...state.size,
												//                   size,
												//               ],
												//     }))
												// }
											>
												{size}
											</button>
										))}
									</div>
								)}
							</div>

							{/* Brands */}
							<div>
								<button
									className="flex items-center justify-between mb-4"
									onClick={() =>
										setFilterToggle((state) => ({
											...state,
											brand: !state.brand,
										}))
									}
								>
									<h3 className="text-base font-semibold text-black">Brands</h3>
									<ChevronDown className={`w-4 h-4 text-black ${filterToggle.brand && "rotate-180"}`} />
								</button>
								{filterToggle.brand && (
									<div className="space-y-4">
										{data.allBrands.map((brand) => (
											<div key={brand} className="flex items-center gap-3">
												{/* <Checkbox className="w-4 h-4 border-gray-400" /> */}
												<button
													className={`text-sm text-black/60  cursor-pointer px-7 py-2 rounded w-full ${
														params.brand.includes(brand)
															? `bg-gray-400 text-white `
															: "hover:bg-gray-200"
													}`}
													onClick={() => toggleBrand(brand)}
													// onClick={() =>
													//     setParams((state) => ({
													//         ...state,
													//         brand: state.brand.includes(
													//             brand
													//         )
													//             ? state.brand.filter(
													//                   (x) =>
													//                       x !==
													//                       brand
													//               )
													//             : [
													//                   ...state.brand,
													//                   brand,
													//               ],
													//     }))
													// }
												>
													{brand}
												</button>
											</div>
										))}
									</div>
								)}
							</div>
						</div>
					</div>
                    <button onClick={()=>setIsOpen(prev => !prev)} className="absolute z-10000 md:hidden block bottom-10 bg-white rounded-full shadow shadow-black p-2"><Filter/></button>

					{/* Main Content */}
					<div className="flex-1 md:static absolute">
						{/* Header */}
						<div className="flex items-center justify-between mb-8">
							<h1 className="text-3xl font-bold text-black">
								{params.q && (
									<>
										<span className="text-gray-600 font-normal">Looking for</span> {params.q}
									</>
								)}
							</h1>
							<div className="flex items-center gap-3 text-base">
								<span className="text-black/60">Sort by:</span>
								<select
									// onChange={(e)=>toggleSortOptions(e.target.value)}
									value={`${params.sort}_${params.order}`}
									onChange={(e) => {
										const [sort, order] = e.target.value.split("_");
										toggleSortOptions({ sort, order });
									}}
									className="border border-black/20 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
								>
									{SORT_OPTIONS.map((option) => (
										<option key={option.label} value={`${option.sort}_${option.order}`}>
											{option.label}
										</option>
									))}
								</select>
							</div>
						</div>

						{/* Products Grid */}
						{products.length === 0 ? (
							"No Items"
						) : (
							<>
								<div className="grid grid-cols-3 gap-8 mb-12">
									{products.map((product) => (
										<ProductCard key={product.id} product={product} />
									))}
								</div>
								<div className="flex justify-center w-full">
									<Pagination
										page={data?.page}
										pages={data?.pages}
										// onPageChange={(x) =>
										//     setParams((state) => ({
										//         ...state,
										//         page: x,
										//     }))
										// }
									/>
								</div>
							</>
						)}

						{/* Pagination */}
					</div>
				</div>
			</div>
		</>
	);
};

export default SearchPage;
