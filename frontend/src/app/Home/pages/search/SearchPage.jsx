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
import { useEffect } from "react";
import Pagination from "./components/Pagination";
import { useSearchParams } from "react-router";
import BreadCrumb from "../../components/BreadCrumb";

// const Slider = ()=>(<>SLider</>)

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const q = searchParams.get("q");
    console.log(searchParams.get("q"));
    const [filterToggle, setFilterToggle] = useState({
        color: true,
        category: true,
        price: true,
        size: true,
        brand: true,
    });
    // const [priceRange, setPriceRange] = useState([50, 200]);
    // const [selectedColors, setSelectedColors] = useState(["#063AF5"]);
    // const [currentPage, setCurrentPage] = useState(1);

    const [params, setParams] = useState({
        q: q,
        sort: "createdAt",
        order: "desc",
        price_min: 0,
        price_max: null,
        size: [],
        brand: [],
        limit: 1,
        category: [],
        color: [],
        page: 1,
    });
    useEffect(() => {
        setParams((state) => ({ ...state, q: q, page: 1 }));
    }, [q]);
    const { data, isLoading } = useSearchProduct(params);

    //   useEffect(()=> {
    //     if(data?.pages < params?.page){
    //         setParams((state)=> ({...state, page : data.pages}))
    //     }
    //     // console.log(users?.page , params?.page)
    // },[params,   data])
    useEffect(() => {
        if (data?.minPrice > params.price_min) {
            setParams((state) => ({ ...state, price_min: data.minPrice }));
        }
        if (data?.maxPrice < params.price_max) {
            setParams((state) => ({ ...state, price_max: data.maxPrice }));
        }
    }, [data, params]);

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
    console.log(data, filterToggle, params);

    const breadcrumbItems = [
        { label: "Home", link: "/" },
        { label: "search", link: "/search" },
    ];

    return (
        <>
            <div className="min-h-screen bg-white p-6">
                {/* Breadcrumb */}

                <BreadCrumb items={breadcrumbItems} />
                <div className="flex gap-6 px-0">
                    {/* Filter Sidebar */}
                    <div className="w-[400px] flex-shrink-0">
                        <div className="border border-black/10 rounded-[20px] bg-white p-6">
                            {/* Filter Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-black">
                                    Filters
                                </h2>
                                <div className="flex items-center gap-3">
                                    <button
                                        className="text-black/60 text-sm"
                                        onClick={() =>
                                            setParams({
                                                q: "",
                                                sort: "createdAt",
                                                order: "desc",
                                                price_min: 0,
                                                price_max: null,
                                                size: [],
                                                brand: [],
                                                limit: 10,
                                                category: [],
                                                color: [],
                                                page: 1,
                                            })
                                        }
                                    >
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
                                    onClick={() =>
                                        setFilterToggle((state) => ({
                                            ...state,
                                            price: !state.price,
                                        }))
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
                                        {[
                                            ...params.color,
                                            ...data.allColors.filter(
                                                (x) => !params.color.includes(x)
                                            ),
                                        ].map((color) => (
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
                                                        params.color.includes(
                                                            color
                                                        )
                                                    ) {
                                                        setParams((state) => ({
                                                            ...state,
                                                            color: state.color.filter(
                                                                (x) =>
                                                                    x !== color
                                                            ),
                                                        }));
                                                    } else {
                                                        setParams((state) => ({
                                                            ...state,
                                                            color: [
                                                                ...state.color,
                                                                color,
                                                            ],
                                                        }));
                                                    }
                                                }}
                                            >
                                                {params.color.includes(
                                                    color
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
                                                <label
                                                    className={`text-sm text-black/60  cursor-pointer px-7 py-2 rounded w-full ${
                                                        params.brand.includes(
                                                            brand
                                                        )
                                                            ? `bg-gray-400 text-white `
                                                            : "hover:bg-gray-200"
                                                    }`}
                                                    onClick={() =>
                                                        setParams((state) => ({
                                                            ...state,
                                                            brand: state.brand.includes(
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
                                                    }
                                                >
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
                                {q &&(<>
                                <span className="text-gray-600 font-normal">
                                    Looking for
                                </span>{" "}
                                {q}</>) }
                            </h1>
                            <div className="flex items-center gap-3 text-base">
                                <span className="text-black/60">Sort by:</span>
                                <select
                                    value={`${params.sort}_${params.order}`}
                                    onChange={(e) => {
                                        const [sort, order] =
                                            e.target.value.split("_");
                                        setParams((state) => ({
                                            ...state,
                                            sort,
                                            order,
                                        }));
                                    }}
                                    className="border border-black/20 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
                                >
                                    {SORT_OPTIONS.map((option) => (
                                        <option
                                            key={option.label}
                                            value={`${option.sort}_${option.order}`}
                                        >
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
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                        />
                                    ))}
                                </div>
                                <div className="flex justify-center w-full">
                                    <Pagination
                                        page={data?.page}
                                        pages={data?.pages}
                                        onPageChange={(x) =>
                                            setParams((state) => ({
                                                ...state,
                                                page: x,
                                            }))
                                        }
                                    />
                                </div>
                            </>
                        )}

                        {/* Pagination */}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SearchPage;
