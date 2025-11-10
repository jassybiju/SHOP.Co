import React from "react";
import { useRemoveCartItems, useUpdateCartItems } from "../hooks/useCart";
import { BatteryWarning, Minus, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router";

export const ProductCard = ({ data , disabled , is_blocked = false}) => {
    const { mutate: updateCartItem, status } = useUpdateCartItems();
    const { mutate: removeCartItem, status: removeStatus } =
        useRemoveCartItems();
    console.log(data)
    const onAddToCart = (quantity) => {
        updateCartItem(
            { variant_id: data.variant_id, quantity },
            {
                onSuccess: (data) => {
                    console.log(data);
                    toast.success(data.message);
                },
                onError: (res) => {
                    console.log(res);
                    toast.error(res.response.data.message);
                },
            }
        );
    };

    const isRemoving = removeStatus === "pending";

    return (
		<div
			className={`relative bg-gray-50 shadow w-full rounded-2xl px-4 py-4 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 transition-all duration-300 ${
				isRemoving ? "opacity-60 pointer-events-none" : ""
			}`}
		>
			{/* Left Side - Image and Info */}
			<Link
				to={"/product/" + data.product_id}
				className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto"
			>
				<img
					src={data.image}
					alt={data.name}
					className="w-full sm:w-32 h-40 sm:h-32 object-cover rounded-lg"
				/>
				<div className="flex flex-col justify-evenly text-center sm:text-left">
					<h1 className="font-hero text-lg sm:text-xl">{data.name}</h1>
					<p className="text-gray-600 text-sm sm:text-base">
						Size: {{
							S: "Small",
							L: "Large",
							M: "Medium",
							XL: "Extra Large",
						}[data.size]}
					</p>
					<p className="text-gray-600 text-sm sm:text-base">
						Color: {data.color}
					</p>
					<h1 className="font-hero text-lg sm:text-xl">
						${data.price} × {data.quantity}
					</h1>
					{is_blocked && (
						<p className="text-red-500 flex items-center justify-center sm:justify-start gap-1 text-sm sm:text-base">
							<BatteryWarning className="w-4 h-4" /> Product is out of stock
						</p>
					)}
				</div>
			</Link>

			{/* Right Side - Controls */}
			{!disabled && (
				<div className="flex sm:flex-col justify-between sm:items-end items-center w-full sm:w-auto gap-3">
					<button
						onClick={() => removeCartItem(data._id)}
						disabled={isRemoving}
						className="text-red-700 hover:text-red-800 transition-colors"
					>
						<Trash2 className="w-5 h-5" />
					</button>

					<div className="flex gap-4 bg-gray-100 py-2 px-5 rounded-full items-center">
						<button
							onClick={() => onAddToCart(1)}
							disabled={status === "pending" || isRemoving}
							className="hover:bg-gray-200 border-4 border-transparent rounded-full transition-all"
						>
							<Plus className="w-4 h-4" />
						</button>
						<span className="text-base font-medium">{data.quantity}</span>
						<button
							onClick={() => onAddToCart(-1)}
							disabled={status === "pending" || isRemoving}
							className="hover:bg-gray-200 border-4 border-transparent rounded-full transition-all"
						>
							<Minus className="w-4 h-4" />
						</button>
					</div>
				</div>
			)}
		</div>
	);
};