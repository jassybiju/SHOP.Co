
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