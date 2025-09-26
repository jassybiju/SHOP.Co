import { ChevronRight, Minus, Plus, Star } from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../components/Footer";
import { useState } from "react";
import { useProduct } from "../../hooks/useProduct";
import { useParams } from "react-router";

function Breadcrumb({ items }) {
    return (
        <nav className="flex items-center space-x-1 text-sm mb-6">
            {items.map((item, index) => (
                <div key={index} className="flex items-center">
                    {index > 0 && (
                        <ChevronRight className="w-4 h-4 text-gray-text mx-1 rotate-90" />
                    )}
                    <span
                        className={`font-poppins ${
                            index === items.length - 1
                                ? "text-black"
                                : "text-gray-text"
                        }`}
                    >
                        {item.label}
                    </span>
                </div>
            ))}
        </nav>
    );
}

function StarRating({ rating, maxRating = 5, size = "md", showRating = true }) {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
    };

    const textSizeClasses = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
    };

    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
                {Array.from({ length: maxRating }, (_, index) => {
                    const isFilled = index < Math.floor(rating);
                    const isHalfFilled =
                        index === Math.floor(rating) && rating % 1 !== 0;

                    return (
                        <div key={index} className="relative">
                            <Star
                                className={`${sizeClasses[size]} ${
                                    isFilled
                                        ? "fill-star-yellow text-star-yellow"
                                        : "text-gray-300"
                                }`}
                            />
                            {isHalfFilled && (
                                <div
                                    className="absolute inset-0 overflow-hidden"
                                    style={{ width: "50%" }}
                                >
                                    <Star
                                        className={`${sizeClasses[size]} fill-star-yellow text-star-yellow`}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            {showRating && (
                <span className={`${textSizeClasses[size]} text-gray-text`}>
                    <span className="text-black">{rating}</span>/{maxRating}
                </span>
            )}
        </div>
    );
}

const ProductPage = () => {
    const {id} = useParams()
    const {data} = useProduct(id)
    console.log(data)

    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("Medium");
    const [activeTab, setActiveTab] = useState("details");

    const breadcrumbItems = [
        { label: "Home" },
        { label: "Search" },
        { label: "T-shirts" },
    ];

    const productImages = [
        "https://api.builder.io/api/v1/image/assets/TEMP/9346afee27212b276cd093c478128db674a63492?width=304",
        "https://api.builder.io/api/v1/image/assets/TEMP/d8385e6307f3b48a64c08f74eca51d1151fae503?width=888",
        "https://api.builder.io/api/v1/image/assets/TEMP/23af1545b104ae11fb57f57452a6852dd673e2d8?width=304",
        "https://api.builder.io/api/v1/image/assets/TEMP/d0441589a44be6b4f70aa55d069748667b27482c?width=304",
    ];

    const relatedProducts = [
        {
            name: "Polo with Contrast Trims",
            price: 212,
            originalPrice: 242,
            discount: 20,
            rating: 4.0,
            image: "https://api.builder.io/api/v1/image/assets/TEMP/2f47e10a1ee7322db5ebd680112fd0d4222b041c?width=592",
        },
        {
            name: "Gradient Graphic T-shirt",
            price: 145,
            originalPrice: null,
            discount: null,
            rating: 3.5,
            image: "https://api.builder.io/api/v1/image/assets/TEMP/a42d1769d313698469a62f240cdf7b5c498bd287?width=588",
        },
        {
            name: "Polo with Tipping Details",
            price: 180,
            originalPrice: null,
            discount: null,
            rating: 4.5,
            image: "https://api.builder.io/api/v1/image/assets/TEMP/50e7b0e4c8d80be3f1924d0b71aed47f5d0a7342?width=592",
        },
        {
            name: "Black Striped T-shirt",
            price: 120,
            originalPrice: 150,
            discount: 30,
            rating: 5.0,
            image: "https://api.builder.io/api/v1/image/assets/TEMP/4d195e0fefe30b3b6d4376c74021385f19891d59?width=592",
        },
    ];

    const sizes = ["Medium", "Medium", "Medium", "Medium"];
    return (
        <div>
            <Navbar />

            <div className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Breadcrumb */}
                    <Breadcrumb items={breadcrumbItems} />

                    {/* Main Product Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-16 mb-12 md:mb-16">
                        {/* Image Gallery */}
                        <div className="flex flex-col lg:flex-row gap-3 md:gap-4">
                            {/* Thumbnail Images */}
                            <div className="flex lg:flex-col gap-3 md:gap-4 order-2 lg:order-1 overflow-x-auto lg:overflow-visible">
                                {productImages.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-28 rounded-xl md:rounded-2xl overflow-hidden border-2 transition-all ${
                                            selectedImage === index
                                                ? "border-black"
                                                : "border-transparent"
                                        }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`Product view ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Main Image */}
                            <div className="flex-1 order-1 lg:order-2 ">
                                <div className="aspect-square border-2 rounded-xl md:rounded-2xl overflow-hidden bg-gray-100">
                                    <img
                                        src={productImages[selectedImage]}
                                        alt="One Life Graphic T-shirt"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-4 md:space-y-6">
                            {/* Title and Rating */}
                            <div>
                                <h1 className="font-hero text-2xl md:text-3xl lg:text-4xl text-black mb-3 md:mb-4">
                                    One Life Graphic T-shirt
                                </h1>
                                <StarRating rating={4.5} />
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                                <span className="font-poppins text-3xl  font-bold text-black">
                                    $260
                                </span>
                                <span className="font-poppins text-2xl text-black opacity-50 font-bold text-gray-text line-through  ">
                                    $300
                                </span>
                                <div className="bg-red-400 text-red-discount px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                                    -40%
                                </div>
                            </div>

                            {/* Description */}
                            <p className="font-poppins text-gray-text leading-relaxed">
                                This graphic t-shirt which is perfect for any
                                occasion. Crafted from a soft and breathable
                                fabric, it offers superior comfort and style.
                            </p>

                            <hr className="border-gray-200" />

                            {/* Size Selection */}
                            <div>
                                <h3 className="font-poppins text-gray-text mb-4">
                                    Select Variant
                                </h3>
                                <div className="flex gap-3 flex-wrap">
                                    {sizes.map((size, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                setSelectedSize(size)
                                            }
                                            className={`px-5 py-3 rounded-full font-poppins text-sm border transition-all ${
                                                selectedSize === size
                                                    ? "bg-gray-variant border-gray-400"
                                                    : "bg-gray-variant border-transparent hover:border-gray-300"
                                            } flex items-center gap-2`}
                                        >
                                            {size}
                                            <div className="w-4 h-4 bg-red-discount rounded-full"></div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <hr className="border-gray-200" />

                            {/* Quantity and Actions */}
                            <div className="space-y-4">
                                {/* Quantity Selector */}
                                <div className="flex items-center">
                                    <div className="flex items-center bg-gray-light rounded-full px-4 md:px-5 py-3">
                                        <button
                                            onClick={() =>
                                                setQuantity(
                                                    Math.max(1, quantity - 1)
                                                )
                                            }
                                            className="p-1"
                                        >
                                            <Minus className="w-4 h-4 md:w-5 md:h-5" />
                                        </button>
                                        <span className="mx-4 md:mx-6 font-poppins font-medium min-w-[2rem] text-center">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() =>
                                                setQuantity(quantity + 1)
                                            }
                                            className="p-1"
                                        >
                                            <Plus className="w-4 h-4 md:w-5 md:h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    <button className="w-full bg-black text-white font-poppins font-medium py-3 md:py-4 rounded-full hover:bg-gray-800 transition-colors text-sm md:text-base">
                                        Add to Cart
                                    </button>
                                    <button className="w-full bg-black text-white font-poppins font-medium py-3 md:py-4 rounded-full hover:bg-gray-800 transition-colors text-sm md:text-base">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Details Tabs */}
                    <div className="mb-12 md:mb-16">
                        <div className="flex border-b border-gray-200 mb-6 md:mb-8 overflow-x-auto">
                            <button
                                onClick={() => setActiveTab("details")}
                                className={`pb-3 md:pb-4 px-1 font-poppins text-lg md:text-xl whitespace-nowrap ${
                                    activeTab === "details"
                                        ? "text-black border-b-2 border-black font-medium"
                                        : "text-gray-400"
                                }`}
                            >
                                Product Details
                            </button>
                            <button
                                onClick={() => setActiveTab("reviews")}
                                className={`pb-3 md:pb-4 px-1 ml-6 md:ml-12 font-poppins text-lg md:text-xl whitespace-nowrap ${
                                    activeTab === "reviews"
                                        ? "text-black border-b-2 border-black font-medium"
                                        : "text-gray-400"
                                }`}
                            >
                                Rating & Reviews
                            </button>
                            <button
                                onClick={() => setActiveTab("faqs")}
                                className={`pb-3 md:pb-4 px-1 ml-6 md:ml-12 font-poppins text-lg md:text-xl whitespace-nowrap ${
                                    activeTab === "faqs"
                                        ? "text-black border-b-2 border-black font-medium"
                                        : "text-gray-400"
                                }`}
                            >
                                FAQs
                            </button>
                        </div>

                        {activeTab === "details" && (
                            <div className="space-y-6 md:space-y-8">
                                <div>
                                    <h3 className="font-poppins text-xl md:text-2xl font-bold mb-3 md:mb-4">
                                        Product Description
                                    </h3>
                                    <p className="font-poppins text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                                        Celebrate individuality and confidence
                                        with the One Life Graphic T-Shirt – a
                                        wardrobe essential crafted for those who
                                        live with purpose and passion. Whether
                                        you're heading out with friends, hitting
                                        the gym, or keeping it casual, this tee
                                        combines comfort, durability, and bold
                                        streetwear aesthetics.
                                    </p>
                                    <p className="font-poppins text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                                        Made with 100% premium cotton, the
                                        fabric is lightweight, breathable, and
                                        skin-friendly, ensuring maximum comfort
                                        even on long days. The high-quality
                                        print features the empowering "One Life"
                                        slogan, designed to last wash after wash
                                        without fading or cracking.
                                    </p>
                                    <p className="font-poppins text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                                        The classic crew neckline and short
                                        sleeves give it a timeless silhouette
                                        that works effortlessly with jeans,
                                        joggers, or layered under a jacket.
                                        Available in versatile color options,
                                        this graphic tee complements every
                                        style.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-poppins text-xl md:text-2xl font-bold mb-3 md:mb-4">
                                        Key Features
                                    </h3>
                                    <ul className="font-poppins text-base md:text-lg space-y-1 md:space-y-2">
                                        <li>
                                            Material: 100% Super-soft combed
                                            cotton (180 GSM)
                                        </li>
                                        <li>
                                            Fit: Regular / Relaxed fit – neither
                                            too tight nor too loose
                                        </li>
                                        <li>
                                            Design: Premium "One Life" graphic
                                            print (fade-resistant)
                                        </li>
                                        <li>
                                            Neckline: Classic crew neck with
                                            reinforced ribbing
                                        </li>
                                        <li>
                                            Durability: Double-stitched hems for
                                            long-lasting wear
                                        </li>
                                        <li>
                                            Colors: Black, White, Charcoal Grey
                                        </li>
                                        <li>Sizes: S, M, L, XL, XXL</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-poppins text-xl md:text-2xl font-bold mb-3 md:mb-4">
                                        Care Instructions
                                    </h3>
                                    <ul className="font-poppins text-base md:text-lg space-y-1 md:space-y-2">
                                        <li>Machine wash cold, inside out</li>
                                        <li>
                                            Use mild detergent, avoid bleach
                                        </li>
                                        <li>Tumble dry low or hang dry</li>
                                        <li>
                                            Do not iron directly on the print
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* You Might Also Like */}
                    <div>
                        <h2 className="font-bakbak text-3xl md:text-4xl lg:text-5xl text-center mb-8 md:mb-12">
                            You might also like
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            {relatedProducts.map((product, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-light rounded-xl md:rounded-2xl overflow-hidden group cursor-pointer"
                                >
                                    <div className="aspect-square bg-gray-light relative overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-3 md:p-4">
                                        <h3 className="font-poppins font-bold text-base md:text-lg mb-2">
                                            {product.name}
                                        </h3>
                                        <StarRating
                                            rating={product.rating}
                                            size="sm"
                                        />
                                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                                            <span className="font-poppins text-lg md:text-xl font-bold">
                                                ${product.price}
                                            </span>
                                            {product.originalPrice && (
                                                <>
                                                    <span className="font-poppins text-lg md:text-xl font-bold text-gray-400 line-through">
                                                        ${product.originalPrice}
                                                    </span>
                                                    {product.discount && (
                                                        <div className="bg-red-discount-bg text-red-discount px-2 py-1 rounded-full text-xs font-medium">
                                                            -{product.discount}%
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};
export default ProductPage;
