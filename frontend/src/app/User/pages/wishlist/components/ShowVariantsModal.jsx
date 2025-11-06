import { useProduct } from "@/app/Home/hooks/useProduct"
import { useUpdateCartItems } from "@/app/User/hooks/useCart";
import Loader from "@/components/Loader";
import { useModal } from "@/hooks/useModal";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const ShowVariantsModal = ({ id }) => {
    const {mutate : addToCart } = useUpdateCartItems()
	const [selectedVariant, setSelectedVariant] = useState("");
	const [quantity, setQuantity] = useState(0);
	const { data, status } = useProduct(id);
    console.log(data)
    const {closeModal} = useModal()
	if (status === "pending") {
		return <Loader />;
	}

     const onAddToCart = () => {
        if (!selectedVariant) return toast.error("Variant not selected");
        addToCart(
            { variant_id: selectedVariant._id, quantity },
            {
                onSuccess: (data) => {
                    console.log(data);
                    toast.success(data.message);
                    closeModal('add-to-cart')
                },
                onError: (res) => {
                    toast.error(res.response.data.message);
                },
            }
        );
    };


	return (
		<div className="bg-white px-10 py-10 border rounded-2xl ">
			{" "}
			<h1 className="font-bold uppercase text-center pb-10">Select variant to add to Cart</h1>
			<div className="flex gap-3 flex-wrap">
				{data?.variants.map((variant, index) => (
					<button
						key={index}
						onClick={() => (variant.stock !== 0) && setSelectedVariant(variant)}
						className={` border-gray-200 flex justify-center items-center  px-8 py-3 rounded-full font-poppins text-sm border transition-all ${
							selectedVariant === variant ? "bg-gray-variant border-gray-800" : "bg-gray-variant  hover:border-gray-300"
						} flex items-center gap-2 ${variant.stock === 0 && "bg-red-400"}`}
					>
						{variant.size}{" "}
						<div
							className="w-4  h-4 border-black border-1 rounded-full"
							style={{
								backgroundColor: variant.color,

							}}
						></div>
						{/* <div className="w-4 h-4 bg-red-discount rounded-full"></div> */}
					</button>
				))}
			</div>
            <hr className=" mt-5"/>
			<div className="space-y-4">
				{/* Quantity Selector */}
				<div className="flex items-center">
					<div className="flex items-center bg-gray-light rounded-full px-4 md:px-5 py-3">
						<button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1">
							<Minus className="w-4 h-4 md:w-5 md:h-5" />
						</button>
						<span className="mx-4 md:mx-6 font-poppins font-medium min-w-[2rem] text-center">{quantity}</span>
						<button onClick={() => setQuantity(quantity + 1)} className="p-1">
							<Plus className="w-4 h-4 md:w-5 md:h-5" />
						</button>
					</div>
				</div>
			</div>
            <button className='bg-black rounded-full px-5 py-3 me-0 float-end text-white uppercase' onClick={onAddToCart}>Add to Cart</button>
		</div>
	);
};
export default ShowVariantsModal;
