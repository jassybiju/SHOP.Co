import { useState } from "react";
import Navbar from "../../components/Navbar";
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Filter,
    Check,
    Sliders,
} from "lucide-react";
import { forwardRef } from "react";
import { Slider } from "./components/Slider";
import { useSearchProduct } from "../../hooks/useSearch";
import { useGetAllBrands } from "../../../Admin/hooks/useBrandManagement";
import ProductCard from "./components/ProductCard";
import Footer from "../../components/Footer";

// const Slider = ()=>(<>SLider</>)

const SearchPage = () => {
    const [filterToggle, setFilterToggle] = useState({
        color: true,
        category: true,
        price: true,
        size: true,
        brand: true,
    });
    const [priceRange, setPriceRange] = useState([50, 200]);
    const [selectedColors, setSelectedColors] = useState(["#063AF5"]);
    const [currentPage, setCurrentPage] = useState(1);

    const [params, setParams] = useState({
        q: "",
        sort: "createdAt",
        order: "desc",
        price_min: 0,
        price_max: null,
        size: ["M"],
        brand: [],
        category: ["shirt"],
        color: ["#ffff"],
        page: 1,
    });

    const { data, isLoading } = useSearchProduct(params);
    if (isLoading) {
        return "Searching...";
    }

    const products = data?.data;
    console.log(data, filterToggle);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white">
                {/* Breadcrumb */}
                <div className="px-6 pt-4 pb-6">
                    <div className="flex items-center gap-3 text-base">
                        <span className="text-black/60 font-normal">Home</span>
                        <ChevronRight className="w-4 h-4 text-black/60 -rotate-90" />
                        <span className="text-black font-normal">Search</span>
                    </div>
                </div>

                <div className="flex gap-6 px-6">
                    {/* Filter Sidebar */}
                    <div className="w-[400px] flex-shrink-0">
                        <div className="border border-black/10 rounded-[20px] bg-white p-6">
                            {/* Filter Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-black">
                                    Filters
                                </h2>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs font-medium">
                                            2
                                        </span>
                                    </div>
                                    <button className="text-black/60 text-sm">
                                        Clear All
                                    </button>
                                    <Filter className="w-6 h-6 text-black" />
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="border-b border-black/10 pb-2 mb-6">
                                <div
                                    className="flex items-center justify-between mb-4"
                                    onClick={() =>
                                        setFilterToggle((state) => ({
                                            ...state,
                                            category: !state.category,
                                        }))
                                    }
                                >
                                    <h3 className="text-base font-semibold text-black">
                                        Categories
                                    </h3>
                                    <ChevronDown
                                        className={`w-4 h-4 text-black ${
                                            filterToggle.category &&
                                            "rotate-180"
                                        }`}
                                    />
                                </div>
                                {filterToggle.category && (
                                    <div className="space-y-4 mb-6">
                                        {data.allCategories.map((category) => (
                                            <div
                                                key={category}
                                                className="flex items-center gap-3"
                                            >
                                                {/* <Checkbox className="w-4 h-4 border-gray-400" /> */}
                                                <label
                                                    className={`text-sm text-black/60  cursor-pointer px-7 py-2 rounded w-full ${
                                                        params.category.includes(
                                                            category
                                                        )
                                                            ? `bg-gray-400 text-white `
                                                            : "hover:bg-gray-200"
                                                    }`}
                                                    onClick={() =>
                                                        setParams((state) => ({
                                                            ...state,
                                                            category:
                                                                state.category.includes(
                                                                    category
                                                                )
                                                                    ? state.category.filter(
                                                                          (x) =>
                                                                              x !==
                                                                              category
                                                                      )
                                                                    : [
                                                                          ...state.category,
                                                                          category,
                                                                      ],
                                                        }))
                                                    }
                                                >
                                                    {category}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Price Range */}
                            <div className="border-b border-black/10 pb-6 mb-6">
                                <div
                                    className="flex items-center justify-between mb-4"
                                    onClick={
                                        () =>
                                            setFilterToggle((state) => ({
                                                ...state,
                                                price: !state.price,
                                            }))
                                        // {                                        console.log(123)}
                                    }
                                >
                                    <h3 className="text-base font-semibold text-black">
                                        Price Range
                                    </h3>
                                    <ChevronDown
                                        className={`w-4 h-4 text-black ${
                                            filterToggle.price && "rotate-180"
                                        } `}
                                    />
                                </div>
                                {filterToggle.price && (
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-sm font-medium text-black">
                                            <span>${data.minPrice}</span>
                                            <span>${data.maxPrice}</span>
                                        </div>
                                        <Slider
                                            value={[
                                                params.price_min,
                                                params.price_max
                                                    ? params.price_max
                                                    : 1000,
                                            ]}
                                            onValueChange={([min, max]) =>
                                                setParams((state) => ({
                                                    ...state,
                                                    price_min: min,
                                                    price_max: max,
                                                }))
                                            }
                                            // max={data.maxPrice }
                                            min={
                                                data.minPrice < params.price_min
                                                    ? data.minPrice
                                                    : params.price_min
                                            }
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
                                <div
                                    className="flex items-center justify-between mb-4"
                                    onClick={() =>
                                        setFilterToggle((state) => ({
                                            ...state,
                                            color: !state.color,
                                        }))
                                    }
                                >
                                    <h3 className="text-base font-semibold text-black">
                                        Colors
                                    </h3>
                                    <ChevronDown
                                        className={`w-4 h-4 text-black ${
                                            filterToggle.color && "rotate-180"
                                        }`}
                                    />
                                </div>
                                {filterToggle.color && (
                                    <div className="grid grid-cols-5 gap-4">
                                        {data.allColors.map((color) => (
                                            <button
                                                key={color}
                                                className="w-10 h-10 rounded-full border relative"
                                                style={{
                                                    backgroundColor: color,
                                                    borderColor:
                                                        color === "#FFFFFF"
                                                            ? "#000000"
                                                            : "transparent",
                                                    borderWidth:
                                                        color === "#FFFFFF"
                                                            ? "1px"
                                                            : "0",
                                                    opacity:
                                                        color === "#FFFFFF"
                                                            ? 0.2
                                                            : 1,
                                                }}
                                                onClick={() => {
                                                    if (
                                                        selectedColors.includes(
                                                            color.value
                                                        )
                                                    ) {
                                                        setSelectedColors(
                                                            selectedColors.filter(
                                                                (c) =>
                                                                    c !==
                                                                    color.value
                                                            )
                                                        );
                                                    } else {
                                                        setSelectedColors([
                                                            ...selectedColors,
                                                            color.value,
                                                        ]);
                                                    }
                                                }}
                                            >
                                                {selectedColors.includes(
                                                    color.value
                                                ) && (
                                                    <Check className="w-5 h-5 text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Sizes */}
                            <div className="border-b border-black/10 pb-6 mb-6">
                                <div
                                    className="flex items-center justify-between mb-4"
                                    onClick={() =>
                                        setFilterToggle((state) => ({
                                            ...state,
                                            size: !state.size,
                                        }))
                                    }
                                >
                                    <h3 className="text-base font-semibold text-black">
                                        Sizes
                                    </h3>
                                    <ChevronDown
                                        className={`w-4 h-4 text-black ${
                                            filterToggle.size && "rotate-180"
                                        } `}
                                    />
                                </div>
                                {filterToggle.size && (
                                    <div className="flex flex-wrap gap-2">
                                        {data.allSizes.sort().map((size) => (
                                            <button
                                                key={size}
                                                className={`px-4 py-2 bg-[#F0F0F0] text-black/60 text-sm font-medium rounded-full border border-[#F0F0F0] hover:bg-black/70 hover:text-white transition-colors ${
                                                    params.size.includes(
                                                        size
                                                    ) &&
                                                    "bg-black text-white hover:bg-black"
                                                }`}
                                                onClick={() =>
                                                    setParams((state) => ({
                                                        ...state,
                                                        size: state.size.includes(
                                                            size
                                                        )
                                                            ? state.size.filter(
                                                                  (x) =>
                                                                      x != size
                                                              )
                                                            : [
                                                                  ...state.size,
                                                                  size,
                                                              ],
                                                    }))
                                                }
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Brands */}
                            <div>
                                <div
                                    className="flex items-center justify-between mb-4"
                                    onClick={() =>
                                        setFilterToggle((state) => ({
                                            ...state,
                                            brand: !state.brand,
                                        }))
                                    }
                                >
                                    <h3 className="text-base font-semibold text-black">
                                        Brands
                                    </h3>
                                    <ChevronDown
                                        className={`w-4 h-4 text-black ${
                                            filterToggle.brand && "rotate-180"
                                        }`}
                                    />
                                </div>
                                {filterToggle.brand && (
                                    <div className="space-y-4">
                                        {data.allBrands.map((brand) => (
                                            <div
                                                key={brand}
                                                className="flex items-center gap-3"
                                            >
                                                {/* <Checkbox className="w-4 h-4 border-gray-400" /> */}
                                                <label  className={`text-sm text-black/60  cursor-pointer px-7 py-2 rounded w-full ${
                                                        params.brand.includes(
                                                            brand
                                                        )
                                                            ? `bg-gray-400 text-white `
                                                            : "hover:bg-gray-200"
                                                    }`}
                                                    onClick={() =>
                                                        setParams((state) => ({
                                                            ...state,
                                                            brand:
                                                                state.brand.includes(
                                                                    brand
                                                                )
                                                                    ? state.brand.filter(
                                                                          (x) =>
                                                                              x !==
                                                                              brand
                                                                      )
                                                                    : [
                                                                          ...state.brand,
                                                                          brand,
                                                                      ],
                                                        }))
                                                    }>
                                                    {brand}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-3xl font-bold text-black">
                                <span className="text-gray-600 font-normal">
                                    Looking for
                                </span>{" "}
                                Casual
                            </h1>
                            <div className="flex items-center gap-3 text-base">
                                <span className="text-black/60">
                                    Showing 1-10 of 100 Products
                                </span>
                                <div className="flex items-center gap-1">
                                    <span className="text-black/60">
                                        Sort by:
                                    </span>
                                    <span className="text-black">
                                        Most Popular
                                    </span>
                                    <ChevronDown className="w-4 h-4 text-black" />
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-4 gap-8 mb-12">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="border-t border-black/10 pt-8">
                            <div className="flex items-center justify-between">
                                <button
                                    variant="outline"
                                    className="flex items-center gap-2 h-10 px-4"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                    Previous
                                </button>

                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, "...", 8, 9, 10].map(
                                        (page, index) => (
                                            <button
                                                key={index}
                                                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium ${
                                                    page === currentPage
                                                        ? "bg-black/6 text-black"
                                                        : "text-black/50 hover:bg-black/6"
                                                }`}
                                                onClick={() =>
                                                    typeof page === "number" &&
                                                    setCurrentPage(page)
                                                }
                                            >
                                                {page}
                                            </button>
                                        )
                                    )}
                                </div>

                                <button
                                    variant="outline"
                                    className="flex items-center gap-2 h-10 px-4"
                                >
                                    Next
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SearchPage;
