import { Heart, Star } from "lucide-react";
import { Link } from "react-router";

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

function ProductCard({ product }) {
  console.log(product.images[0]?.url)
  
  return (
    <Link className="group" to={'/product/'+product._id}>
  <div className="group cursor-pointer w-full">
                                <div className="bg-gray-medium rounded-2xl p-4 mb-4 relative overflow-hidden">
                                    <img
                                        src={product.images[0].url}
                                        alt="T-shirt with Tape Details"
                                        className="w-full h-full object-cover"
                                    />
                                    <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                                        <Heart className="w-5 h-5" />
                                    </button>
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
                                    ${product.price - (product.price * (product.discount /100))}
                                </div>
                            </div>
    </Link>
  );
}

export default ProductCard