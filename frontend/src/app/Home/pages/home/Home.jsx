// import { button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
import {
    Heart,
    Search,
    ShoppingCart,
    User,
    ChevronDown,
    X,
    Star,
    ArrowRight,
    ArrowLeft,
    Check,
    Mail,
    
} from "lucide-react";
import { useLogoutUser } from "../../../Auth/hooks/useAuth";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import NewsLetter from "../../components/NewsLetter";
import { useHome } from "../../hooks/useHome";
import ProductCard from "../search/components/ProductCard";
import { Link } from "react-router";
import Loader from "../../../../components/Loader";
import zara_logo from '../../../../assets/zara_logo.png'
import prada_logo from '../../../../assets/prada_logo.png'
import gucci_logo from '../../../../assets/gucci_logo.png'
import calvin_logo from '../../../../assets/Calvin_logo.png'
import versace_logo from '../../../../assets/versace_logo.png'

export default function Home() {
    const { data : res, status } = useHome();
    console.log(res);
    console.log(status)
    if(status!=='success'){
      return Loader
    }
    return (
        <div className="min-h-screen bg-white">
            {/* Top Banner */}
            {/* Hero Section */}
            <section className="relative bg-gray-light">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-8 items-center py-16 lg:py-24 bg-amber-50 lg:bg-[url(https://api.builder.io/api/v1/image/assets/TEMP/cc5ac856502dbe60fc369bcb305fc33a0932a7e6?width=2880)] " style={{ backgroundRepeat : 'no-repeat' ,backgroundSize : 'contain',  }}>
                        {/* Left Content */}
                        <div className="space-y-8">
                            {/* Decorative stars */}
                            <div className="absolute top-32 right-20 hidden lg:block">
                                <div className="w-26 h-20">
                                    <svg
                                        viewBox="0 0 104 83"
                                        fill="currentColor"
                                        className="w-full h-full"
                                    >
                                        <path d="M52 0.576172C53.7654 22.5052 76.0448 39.9823 104 41.367C76.0448 42.7519 53.7654 60.2287 52 82.1579C50.2347 60.2287 27.955 42.7519 0 41.367C27.955 39.9823 50.2347 22.5052 52 0.576172Z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="absolute top-80 left-20 hidden lg:block">
                                <div className="w-14 h-11">
                                    <svg
                                        viewBox="0 0 56 45"
                                        fill="currentColor"
                                        className="w-full h-full"
                                    >
                                        <path d="M28 0.09375C28.9506 11.9017 40.9472 21.3124 56 22.0581C40.9472 22.8037 28.9506 32.2143 28 44.0224C27.0495 32.2143 15.0527 22.8037 0 22.0581C15.0527 21.3124 27.0495 11.9017 28 0.09375Z" />
                                    </svg>
                                </div>
                            </div>

                            <h1 className="font-bakbak text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                FIND CLOTHES THAT MATCHES YOUR STYLE
                            </h1>

                            <p className="font-poppins text-gray-600 text-lg leading-relaxed max-w-lg">
                                Browse through our diverse range of meticulously
                                crafted garments, designed to bring out your
                                individuality and cater to your sense of style.
                            </p>

                            <Link to={'/search'} className="bg-black text-white hover:bg-gray-800 rounded-full px-14 py-6 text-lg font-poppins">
                                Shop Now
                            </Link>

                            {/* Stats */}
                            <div className="flex flex-wrap items-center gap-8 pt-8">
                                <div className="flex items-center">
                                    <div>
                                        <div className="font-poppins text-2xl md:text-4xl font-bold">
                                            200+
                                        </div>
                                        <div className="font-poppins text-gray-600 text-sm">
                                            International Brands
                                        </div>
                                    </div>
                                    <div className="w-px h-16 bg-gray-300 mx-8 hidden sm:block"></div>
                                </div>

                                <div className="flex items-center">
                                    <div>
                                        <div className="font-poppins text-2xl md:text-4xl font-bold">
                                            2,000+
                                        </div>
                                        <div className="font-poppins text-gray-600 text-sm">
                                            High-Quality Products
                                        </div>
                                    </div>
                                    <div className="w-px h-16 bg-gray-300 mx-8 hidden sm:block"></div>
                                </div>

                                <div>
                                    <div className="font-poppins text-2xl md:text-4xl font-bold">
                                        30,000+
                                    </div>
                                    <div className="font-poppins text-gray-600 text-sm">
                                        Happy Customers
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Hero Image */}
                        {/* <div className="relative">
                            <img
                                src="https://api.builder.io/api/v1/image/assets/TEMP/cc5ac856502dbe60fc369bcb305fc33a0932a7e6?width=2880"
                                alt="Fashion models wearing stylish clothes"
                                className="w-full h-auto object-cover rounded-lg"
                            />
                        </div> */}
                    </div>
                </div>
            </section>

            {/* Brand Logos */}
            <section className="bg-black py-12">
                <div className=" flex justify-center w-full">
                    <div className="flex w-[90vw]  gap-15 items-center justify-evenly  flex-nowrap ">
                        <img 
                            src={versace_logo}
                            alt="VERSACE"
                            className="h-6 md:h-8 w-full opacity-80"
                        />
                        <img
                            src={zara_logo}
                            alt="ZARA"
                            className="h-6 md:h-8 w-full opacity-80"
                        />
                        <img
                            src={gucci_logo}
                            alt="GUCCI"
                            className="h-6 md:h-8 w-full opacity-80"
                        />
                        <img
                            src={prada_logo}
                            alt="PRADA"
                            className="h-6 md:h-8 w-full opacity-80"
                        />
                        <img
                            src={calvin_logo}
                            alt="Calvin Klein"
                            className="h-6 md:h-8 w-full opacity-80"
                        />
                    </div>
                </div>
            </section>

            {/* New Arrivals Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="font-bakbak text-4xl font-bold text-center mb-12">
                        NEW ARRIVALS
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Product 1 */}

                        {res.data.new_arrivals.map((x) => (
                           <ProductCard product={x}/>
                        ))}
                      

                      
                    </div>

                    <div className="text-center">
                        <Link 
                        to={'/search?sort=createdAt&order=desc'}
                            variant="outline"
                            className="border-gray-300 px-12 py-3 font-poppins"
                        >
                            View All
                        </Link>
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <hr className="border-gray-200" />
            </div>

            {/* Top Selling Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="font-bakbak text-4xl font-bold text-center mb-12">
                        Top Selling
                    </h2>
                        
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Product 1 */}
                        {res.data.top_selling.map(x => (
                      <ProductCard product={x}/>
))}
                      </div>   

                    <div className="text-center">
                        <Link 
                            to={'/search?sort=createdAt&order=desc'}
                            variant="outline"
                            className="border-gray-300 px-12 py-3 font-poppins"
                        >
                            View All
                        </Link>
                    </div>
                </div>
            </section>

            {/* Customer Reviews Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="font-bakbak text-4xl font-bold">
                            OUR HAPPY CUSTOMERS
                        </h2>
                        <div className="flex space-x-2">
                            <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50">
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Review 1 */}
                        <div className="border border-gray-200 rounded-2xl p-6">
                            <div className="flex text-yellow-star mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-5 h-5 fill-current"
                                    />
                                ))}
                            </div>
                            <div className="flex items-center mb-3">
                                <span className="font-poppins font-bold text-lg">
                                    Sarah M.
                                </span>
                                <Check className="w-5 h-5 bg-green-verified text-white rounded-full ml-2 p-0.5" />
                            </div>
                            <p className="font-poppins text-gray-600 leading-relaxed">
                                "I'm blown away by the quality and style of the
                                clothes I received from Shop.co. From casual
                                wear to elegant dresses, every piece I've bought
                                has exceeded my expectations."
                            </p>
                        </div>

                        {/* Review 2 */}
                        <div className="border border-gray-200 rounded-2xl p-6">
                            <div className="flex text-yellow-star mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-5 h-5 fill-current"
                                    />
                                ))}
                            </div>
                            <div className="flex items-center mb-3">
                                <span className="font-poppins font-bold text-lg">
                                    Alex K.
                                </span>
                                <Check className="w-5 h-5 bg-green-verified text-white rounded-full ml-2 p-0.5" />
                            </div>
                            <p className="font-poppins text-gray-600 leading-relaxed">
                                "Finding clothes that align with my personal
                                style used to be a challenge until I discovered
                                Shop.co. The range of options they offer is
                                truly remarkable, catering to a variety of
                                tastes and occasions."
                            </p>
                        </div>

                        {/* Review 3 */}
                        <div className="border border-gray-200 rounded-2xl p-6">
                            <div className="flex text-yellow-star mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-5 h-5 fill-current"
                                    />
                                ))}
                            </div>
                            <div className="flex items-center mb-3">
                                <span className="font-poppins font-bold text-lg">
                                    James L.
                                </span>
                                <Check className="w-5 h-5 bg-green-verified text-white rounded-full ml-2 p-0.5" />
                            </div>
                            <p className="font-poppins text-gray-600 leading-relaxed">
                                "As someone who's always on the lookout for
                                unique fashion pieces, I'm thrilled to have
                                stumbled upon Shop.co. The selection of clothes
                                is not only diverse but also on-point with the
                                latest trends."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

                                <NewsLetter/>
        </div>
    );
}
