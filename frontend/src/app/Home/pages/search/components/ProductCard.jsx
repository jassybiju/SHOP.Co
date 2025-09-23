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
  return (
    <div className="group">
      <div className="w-full aspect-[295/298] bg-[#F0EEED] rounded-[20px] overflow-hidden relative mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-bold text-black mb-2 leading-tight">
        {product.name}
      </h3>
      <div className="mb-2">
        <StarRating rating={product.rating} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-black">${product.price}</span>
        {product.originalPrice && (
          <>
            <span className="text-2xl font-bold text-black/40 line-through">
              ${product.originalPrice}
            </span>
            {product.discount && (
              <span className="bg-red-50 text-red-500 text-xs font-medium px-3 py-1.5 rounded-full">
                -{product.discount}%
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProductCard