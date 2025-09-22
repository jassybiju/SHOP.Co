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
import ProductCard  from "./components/ProductCard";

const products = [
    {
        id: 1,
        name: "Gradient Graphic T-shirt",
        price: 145,
        originalPrice: null,
        discount: null,
        rating: 3.5,
        image: "https://api.builder.io/api/v1/image/assets/TEMP/a42d1769d313698469a62f240cdf7b5c498bd287?width=588",
    },
    {
        id: 2,
        name: "Polo with Tipping Details",
        price: 180,
        originalPrice: null,
        discount: null,
        rating: 4.5,
        image: "https://api.builder.io/api/v1/image/assets/TEMP/50e7b0e4c8d80be3f1924d0b71aed47f5d0a7342?width=592",
    },
    {
        id: 3,
        name: "Black Striped T-shirt",
        price: 120,
        originalPrice: 150,
        discount: 30,
        rating: 5.0,
        image: "https://api.builder.io/api/v1/image/assets/TEMP/4d195e0fefe30b3b6d4376c74021385f19891d59?width=592",
    },
    {
        id: 4,
        name: "Skinny Fit Jeans",
        price: 240,
        originalPrice: 260,
        discount: 20,
        rating: 3.5,
        image: "https://api.builder.io/api/v1/image/assets/TEMP/28f520bf697cccaa5a5306ce4fae6f2ea08f5723?width=536",
    },
    {
        id: 5,
        name: "Checkered Shirt",
        price: 180,
        originalPrice: null,
        discount: null,
        rating: 4.5,
        image: "https://api.builder.io/api/v1/image/assets/TEMP/6998f15b96c251235bb3250922ab9651389f3a54?width=592",
    },
    {
        id: 6,
        name: "Sleeve Striped T-shirt",
        price: 130,
        originalPrice: 160,
        discount: 30,
        rating: 4.5,
        image: "https://api.builder.io/api/v1/image/assets/TEMP/23a298726afa66c87fcd7c5a3094e8bd04b746d4?width=592",
    },
    {
        id: 7,
        name: "Vertical Striped Shirt",
        price: 212,
        originalPrice: 232,
        discount: 20,
        rating: 5.0,
        image: "https://api.builder.io/api/v1/image/assets/TEMP/6715cee640f44a9289fe62903991f22d638a1eb9?width=592",
    },
    {
        id: 8,
        name: "Courage Graphic T-shirt",
        price: 145,
        originalPrice: null,
        discount: null,
        rating: 4.0,
        image: "https://api.builder.io/api/v1/image/assets/TEMP/fde077b6d8d69e40b7a58332fe30bc48ae8c8226?width=588",
    },
    {
        id: 9,
        name: "Loose Fit Bermuda Shorts",
        price: 80,
        originalPrice: null,
        discount: null,
        rating: 3.0,
        image: "https://api.builder.io/api/v1/image/assets/TEMP/7b7cb422442234877df150f2dc28b79f3ceb21fe?width=592",
    },
];

const categories = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];
const brands = ["Casual", "Formal", "Party", "Gym", "Business"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];
const colors = [
    { name: "Green", value: "#00C12B" },
    { name: "Red", value: "#F50606" },
    { name: "Yellow", value: "#F5DD06" },
    { name: "Orange", value: "#F57906" },
    { name: "Light Blue", value: "#06CAF5" },
    { name: "Blue", value: "#063AF5" },
    { name: "Purple", value: "#7D06F5" },
    { name: "Pink", value: "#F506A4" },
    { name: "White", value: "#FFFFFF" },
    { name: "Black", value: "#000000" },
];

function StarRating({ rating }) {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    className="w-4 h-4"
                    viewBox="0 0 20 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9.24494 0.254883L11.8641 5.89479L18.0374 6.64298L13.4829 10.8768L14.679 16.9791L9.24494 13.9559L3.8109 16.9791L5.00697 10.8768L0.452479 6.64298L6.62573 5.89479L9.24494 0.254883Z"
                        fill={
                            star <= rating
                                ? "#FFC633"
                                : star - 0.5 <= rating
                                ? "#FFC633"
                                : "#E5E7EB"
                        }
                    />
                </svg>
            ))}
            <span className="text-sm text-black ml-2">
                {rating}
                <span className="text-black/60">/5</span>
            </span>
        </div>
    );
}

// const Slider = ()=>(<>SLider</>)

const Search = () => {
    const [priceRange, setPriceRange] = useState([50, 200]);
    const [selectedColors, setSelectedColors] = useState(["#063AF5"]);
    const [currentPage, setCurrentPage] = useState(1);

    const [params, useParams] = useState({
        search: "",
        sort: "created at - asc",
        filter: "AllUsers",
        page: 1,
    });
    const { data: product } = useSearchProduct(params);

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
                            <div className="border-b border-black/10 pb-6 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-base font-semibold text-black">
                                        Categories
                                    </h3>
                                    <ChevronDown className="w-4 h-4 text-black" />
                                </div>
                                <div className="space-y-4">
                                    {categories.map((category) => (
                                        <div
                                            key={category}
                                            className="flex items-center gap-3"
                                        >
                                            {/* <Checkbox className="w-4 h-4 border-gray-400" /> */}
                                            <label className="text-sm text-black/60 cursor-pointer">
                                                {category}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="border-b border-black/10 pb-6 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-base font-semibold text-black">
                                        Price Range
                                    </h3>
                                    <ChevronDown className="w-4 h-4 text-black" />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm font-medium text-black">
                                        <span>${priceRange[0]}</span>
                                        <span>${priceRange[1]}</span>
                                    </div>
                                    <Slider
                                        value={priceRange}
                                        onValueChange={setPriceRange}
                                        max={200}
                                        min={50}
                                        step={10}
                                        className="w-full"
                                    />
                                    <div className="flex gap-4">
                                        {/* <div>
                    <label className="text-xs text-black/60 block mb-1">Min</label>
                    <input className="w-[159px] h-10 border border-black/20 rounded-lg" onChange={(e)=>setPriceRange(x => ([e.target.value, x[1]]))} value={priceRange[0]} min={50}/>
                  </div>
                  <div>
                    <label className="text-xs text-black/60 block mb-1">Max</label>
                    <div className="w-[159px] h-10 border border-black/20 rounded-lg" />
                  </div> */}
                                    </div>
                                </div>
                            </div>

                            {/* Colors */}
                            <div className="border-b border-black/10 pb-6 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-base font-semibold text-black">
                                        Colors
                                    </h3>
                                    <ChevronDown className="w-4 h-4 text-black" />
                                </div>
                                <div className="grid grid-cols-5 gap-4">
                                    {colors.map((color) => (
                                        <button
                                            key={color.value}
                                            className="w-10 h-10 rounded-full border relative"
                                            style={{
                                                backgroundColor: color.value,
                                                borderColor:
                                                    color.value === "#FFFFFF"
                                                        ? "#000000"
                                                        : "transparent",
                                                borderWidth:
                                                    color.value === "#FFFFFF"
                                                        ? "1px"
                                                        : "0",
                                                opacity:
                                                    color.value === "#FFFFFF"
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
                            </div>

                            {/* Sizes */}
                            <div className="border-b border-black/10 pb-6 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-base font-semibold text-black">
                                        Sizes
                                    </h3>
                                    <ChevronDown className="w-4 h-4 text-black" />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            className="px-4 py-2 bg-[#F0F0F0] text-black/60 text-sm font-medium rounded-full border border-[#F0F0F0] hover:bg-black hover:text-white transition-colors"
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Brands */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-base font-semibold text-black">
                                        Brands
                                    </h3>
                                    <ChevronDown className="w-4 h-4 text-black" />
                                </div>
                                <div className="space-y-4">
                                    {brands.map((brand) => (
                                        <div
                                            key={brand}
                                            className="flex items-center gap-3"
                                        >
                                            {/* <Checkbox className="w-4 h-4 border-gray-400" /> */}
                                            <label className="text-sm text-black/60 cursor-pointer">
                                                {brand}
                                            </label>
                                        </div>
                                    ))}
                                </div>
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
                        <div className="grid grid-cols-3 gap-8 mb-12">
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
        </>
    );
};

export default Search;
