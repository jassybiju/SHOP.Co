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

export default function Home() {
    const { data : res, status } = useHome();
    console.log(res);
    console.log(status)
    if(status!=='success'){
      return "Laoding.."
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

                            <button className="bg-black text-white hover:bg-gray-800 rounded-full px-14 py-6 text-lg font-poppins">
                                Shop Now
                            </button>

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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center space-x-8 md:space-x-16 flex-wrap gap-y-8">
                        <img
                            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTY3IiBoZWlnaHQ9IjI3IiB2aWV3Qm94PSIwIDAgMTY3IDI3IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTUwLjE3OSAwLjUxNDMyMkgxNjYuNDgyVjIuNTUyMDdDMTY2LjAwOCAyLjQyNzM0IDE2NS41MTMgMi4zNjMwNCAxNjUuMDEzIDIuMzYxNjRIMTU1LjY0MlYxMS44ODM2SDE2NC43NThDMTY1LjQxMyAxMS44ODM2IDE2NS45OTYgMTEuODI3MiAxNjYuNDgxIDExLjczMTFWMTMuNzU5OUMxNjYuMDY4IDEzLjY4NCAxNjUuNDk5IDEzLjY0NTUgMTY0Ljc5NCAxMy42NDU1SDE1NS42NDJWMjMuNDkxM0gxNjQuNzMzQzE2NS4yMzIgMjMuNDkxMyAxNjUuODI2IDIzLjQzNDMgMTY2LjQ4MSAyMy4zMTA0VjI1LjUwMDZIMTUwLjIwM0MxNTAuMzMzIDI1LjExNTQgMTUwLjM5OSAyNC43MTg1IDE1MC4zOTggMjQuMzJWMS43MjMzNEMxNTAuMzk4IDEuMjI4NTcgMTUwLjMyNSAwLjgxOTIzIDE1MC4xNzkgMC41MTQzMjJaTTE0Ni40MDUgNi45OTg5MUwxNDEuNjk1IDYuOTcwOTlDMTQxLjQ2NCA0Ljg5NDcyIDEzOS45NDcgMi44ODQ4OSAxMzYuNjA5IDIuNTE0NjVDMTI5LjQ1OSAyLjAwOTgyIDEyNy40NDQgOC4xNjk5NiAxMjcuNjI2IDEyLjY3NDNDMTI3LjgwOSAxNy4wMTYyIDEyOC42OTQgMjMuNjkxMiAxMzYuMDc1IDIzLjY5MTJDMTM5LjE3MSAyMy42OTEyIDE0Mi4xNDQgMjEuMTk2MSAxNDIuMDQ3IDE5LjA5MTlMMTQ2LjQwNSAxOS4wNjRDMTQ2LjA4OSAyMy40MDU4IDEzOS43NDEgMjUuOTE5NCAxMzYuNzE4IDI2LjAwNTRDMTI2LjM4OSAyNi4yODE4IDEyMi4wNjYgMjAuODgyMyAxMjEuODQ4IDEzLjE3OEMxMjEuNjU0IDYuMTk5NzkgMTI1LjI5NiAwIDEzNS41MDQgMEMxNDQuMjQ0IDAuMDk1NDkzIDE0NS45MzEgNC4xNTE5OSAxNDYuNDA1IDYuOTk4OTFaTTcyLjk0MDggMjIuNjYyNkw3Ni4wNjExIDIwLjYxNTNDNzcuNjg3IDIyLjcyMDEgNzkuMDIyNSAyMy42ODEyIDgyLjI1MTcgMjMuNjgxMkM4NS41Mjg2IDIzLjY4MTIgODguMjg1IDIyLjExOTggODguMjg1IDE5LjM1ODhDODguMjg1IDE3Ljk5NjggODcuNTgwMiAxNi44ODI3IDg2LjE4NDkgMTYuMDQ1MUM4NS41NTI4IDE1LjY1NDIgODMuOTUxIDE0Ljk3ODQgODEuNDI1OSAxNC4wMzU4Qzc3LjY1MDcgMTIuNjE3NCA3My45NzMxIDEwLjc2OTUgNzMuOTczMSA3LjA1NjQzQzczLjk3MzEgMi4zNzExMyA3OS4wNDY3IDAuMzA0OTA4IDg0LjM5OTUgMC4xNTE4OTVDODcuNTY4MSAwLjA1Njk2MDggOTEuNTAxNCAxLjQyOTA1IDkzLjA5MSAyLjk3MDg5TDg5LjkyMzEgNC44ODQ2Nkw4OS4zNTgxIDQuMDU3NTUgODguNTE4MSAzLjM2NTkgODcuNDkyMyAyLjg4MzEzIDg2LjQ2NjUgMi40MDAzNyA4NS4yOTMyIDIuMTQ0NTEgODQuMDk2OSAyLjE0MjczQzgwLjA1NDEgMi4xNDI3MyA3Ni44NDk4IDUuODE4MzcgODAuMiA4LjM1MTQ1QzgxLjA0OTMgOC45OTg2OCA4Mi43ODYzIDkuNzk4MzcgODUuNDMyNCA5Ljc4MDM3QzgxLjA0OTMgOC45OTg2OCA4Mi43ODYzIDkuNzk4MzcgODUuNDMyNCAx"
                            alt="VERSACE"
                            className="h-6 md:h-8 opacity-80"
                        />
                        <img
                            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTIiIGhlaWdodD0iMzgiIHZpZXdCb3g9IjAgMCA5MiAzOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzI3OF85OTc3KSI+CjxwYXRoIGQ9Ik04Ni44MTQxIDM2Ljg2ODJMN"
                            alt="ZARA"
                            className="h-6 md:h-8 opacity-80"
                        />
                        <img
                            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTU3IiBoZWlnaHQ9IjM2IiB2aWV3Qm94PSIwIDAgMTU3IDM2IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMjc4Xzk5NzkpIj4KPHBhdGggZD0iTTE0MS43OTQgMTEuMjkzNUwxNDEuNTAyIDExLjM4"
                            alt="GUCCI"
                            className="h-6 md:h-8 opacity-80"
                        />
                        <img
                            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk1IiBoZWlnaHQ9IjMyIiB2aWV3Qm94PSIwIDAgMTk1IDMyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMjc4Xzk5ODEpIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wLjQ4MTY4OSAwLjkwMTg3MkwzLjQxMzg2IDQuMjA4NlYyOC40MTA4TDEuMjQwNjYgMzEuNTc3NUwxNC41NTAxIDMxLjU5NzlMMTIuMTUxMiAyOC42ODRMMTEuOTAyMSAxOS45NjhMMjQuNzM1MyAyMC4wMzc2QzI4LjYyNTEgMTguNzQyNiAzMi42MjM4IDE1Ljk4MTYgMzIuODE1OSAxMC4zOTk3QzMyLjc1NDUgNC45OTA0NCAyOS40NTIgMS41MjA5OSAyNS42MTc3IDAuODMwNzI3TDAuNDgxNjg5IDAuOTAxODcyWk0xMS40MjY1IDIuNDQ5NjVWMTcuOTk3OUwyMS4yNzI4IDE4LjA2OUMyMy41MTMxIDE2LjI2MjQgMjUuMjExNSAxNC44Nzg4IDI1LjE0MzYgMTAuNTQxM0MyNS4xMTE1IDcuMDA0NDUgMjQuMzY0OSAzLjkyMDI0IDIxLjA2ODkgMi40NTA0MUwxMS40MjY1IDIuNDQ5NjVaTTM4Ljk3NTMgMC43MjU1MjRMNDEuOTA3NSA0LjAzMzAxVjI4LjIzNTJMMzkuNzM0MyAzMS40MDM0TDUzLjA0MyAzMS40MjIzTDUwLjY0NDEgMjguNTA4NEw1MC4zOTUgMTkuNzkyNEg1MC40NDgzTDY0LjE5ODIgMzEuNTIwN0w3NS42MDkxIDMxLjQyNzZMNjUuMTk0NiAyMi40MTk0SDU2LjUwMDRMNTMuNDM2IDE5LjgwOUw2My4yMjgyIDE5Ljg2MkM2Ny4xMTggMTguNTY3IDcxLjExNTkgMTUuODA2IDcxLjMwODggMTAuMjI0MUM3MS4yNDgyIDQuODE1NiA2Ny45NDU2IDEuMzQ1MzkgNjQuMTEwNiAwLjY1NTg5Mkw"
                            alt="PRADA"
                            className="h-6 md:h-8 opacity-80"
                        />
                        <img
                            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjA4IiBoZWlnaHQ9IjI3IiB2aWV3Qm94PSIwIDAgMjA4IDI3IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE3LjEyOTUgMjMuODg3OUM5Ljg5MDg5IDIzLjg4NzkgMy43MTIyNSAxOC43Mzc3IDMuNzEyMjUgMTMuMTIwMUMzLjcxMjI1IDcuNTIzMzQgOS43NjE1NyAyLjI3MDc5IDE3LjA3NzYgMi4yNzA3OUMyMS44ODY3IDIuMjcwNzkgMjUuMzQ5NyA0LjA5NTkxIDI4LjE2ODIgNi45NTU0MkgzMS43MDk2QzMwLjY0OTYgNS40NTQ1NyAyOS41MTIyIDQuMDc1OTcgMjcuNzgwMiAzLjAwMDg0QzI0LjgwNyAxLjExNTAyIDIwLjk1NSAwIDE3LjEyOTUgMEM3Ljk1MjE5IDAgMC40ODE0NDUgNS45NDE4NSAwLjQ4MTQ0NSAxMy4xMDAyQzAuNDgxNDQ1IDIwLjI3ODQgOC4wNTYwOSAyNi4xNTk2IDE3LjE4MTUgMjYuMTU5NkMyMC45MDQxIDI2LjE1OTYgMjQuNTQ5NCAyNS4wODUzIDI3LjQ3MDcgMjMuMjgwMUMyOS4zMDY2IDIyLjEyNDMgMzAuNTk4NyAyMC42MjM1IDMxLjg0IDIuMDgxOUgzMS44NEMzMS44NCAyLjA4MTkgMzMuMTM5MyAzLjEzNzY2IDMzLjQ5MzkgMy4zNDY2NFYyMS4zMDE5SDQxLjc1NjhWMzEuNTM1NUg0MS43NTY4SDAuNzU0NDg2VjMxLjUzNTVIMC40ODE0NDVWMTguMTI3OUg4Ljk5NjQzVjkuNjQwODZIOC45OTY0M0gwLjczMjQyOVYzLjEzNzY2SDAuNzMyNDI5SDMzLjQ5MzlWMC4xNTk2OTZINDAuNjg4NUwzNy4yMjA1IDMuMTM3NjZIMzcuMjIwNVYzMS41MzU1SDAuNzMyNDI5WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg=="
                            alt="Calvin Klein"
                            className="h-6 md:h-8 opacity-80"
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
                        to={'search'}
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
                        top selling
                    </h2>
                        
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Product 1 */}
                        {res.data.top_selling.map(x => (
                      <ProductCard product={x}/>
))}
                      </div>   

                    <div className="text-center">
                        <Link 
                            to={'/search'}
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

            {/* Newsletter Section */}
            <NewsLetter />
            <Footer />
        </div>
    );
}
