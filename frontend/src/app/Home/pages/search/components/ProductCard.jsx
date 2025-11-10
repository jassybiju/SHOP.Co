import { useAddWishlistItems } from "@/app/User/hooks/useWishlist";
import ProtectedFunctionsWrapper from "@/components/ProtectedFunctionsWrapper";
import { Heart, Star } from "lucide-react";
import { Link } from "react-router";

function ProductCard({ product }) {
//   console.log(product.images[0]?.url)
    const {mutate : addToWishlist} = useAddWishlistItems()

    const handleWishlist = (e) => {
        e.preventDefault()
        e.stopPropagation()
        addToWishlist(product._id)
    }
  return (
    <Link className="group" to={'/product/'+product._id}>
  <div className="group cursor-pointer w-full">
                                <div className="bg-gray-medium rounded-2xl p-4 mb-4 relative overflow-hidden">
                                    <img
                                        src={product.images[0].url}
                                        alt="T-shirt with Tape Details"
                                        className="w-full h-full object-cover"
                                    />
                                    <ProtectedFunctionsWrapper fn={handleWishlist}>
                                    <button  className="absolute z-10 top-4 right-4 p-2 bg-white cursor-all-scroll rounded-full shadow-md hover:shadow-lg transition-shadow">
                                        <Heart className="w-5 h-5" color="red" fill={product?.wishlist?.length === 1 ? 'red' : 'white'} />
                                    </button>
                                    </ProtectedFunctionsWrapper>
                                </div>
                                <h3 className="font-poppins font-bold text-lg mb-2 uppercase">
                                   {product.name}
                                </h3>
                                <div className="flex items-center mb-2">
                                    <div className="flex text-yellow-star">
                                        {[...Array(4)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-4 h-4 fill-current"
                                            />
                                        ))}
                                        <Star className="w-4 h-4 fill-current opacity-50" />
                                    </div>
                                    <span className="ml-2 font-poppins text-sm text-gray-600">
                                        4.5/5
                                    </span>
                                </div>
                                <div className="font-poppins font-bold text-xl">
                                    ${product.price - (product.price * (product.discount /100))} <span className="strike text-lg text-gray-500 line-through decoration-2">${product.price}</span>
                                </div>
                            </div>
    </Link>
  );
}

export default ProductCard