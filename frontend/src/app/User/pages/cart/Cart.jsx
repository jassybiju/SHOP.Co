import BreadCrumb from "@/app/Home/components/BreadCrumb";
import React from "react";
import Button from "../../components/Button";
import { useGetAllCart,} from "../../hooks/useCart";
import Loader from "@/components/Loader";
import { useNavigate } from "react-router";
import { ProductCard } from "../../components/ProductCart";
const Cart = () => {
	const { data: cart, status: getStatus } = useGetAllCart();
	const navigate = useNavigate();
	if (getStatus === "pending") return <Loader />;
	console.log(cart);
	return   (
		<div className="w-full px-3 sm:px-6 md:px-10 lg:px-20 py-5 md:py-10">
			<BreadCrumb />

			<h1 className="font-hero text-2xl sm:text-3xl md:text-5xl my-5 md:my-10 text-center md:text-left">
				Your Cart
			</h1>

			<div className="flex flex-col md:flex-row gap-6 md:gap-10">
				{/* Left Section - Product List */}
				<div className="w-full md:w-3/5 border border-gray-300 rounded-xl px-3 sm:px-5 md:px-10 py-5">
					{cart?.data?.cart?.length > 0 ? (
						cart.data.cart.map((x) => (
							<ProductCard key={x._id} data={x} is_blocked={x.stock === 0} />
						))
					) : (
						<div className="text-center text-gray-500 py-10 text-sm sm:text-base">
							Your cart is empty
						</div>
					)}
				</div>

				{/* Right Section - Order Summary */}
				<div className="w-full md:w-2/5 border border-gray-300 rounded-xl p-3 sm:p-5 md:p-8 text-sm sm:text-base h-max bg-white">
					<h1 className="font-hero text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 text-center md:text-left">
						Order Summary
					</h1>

					<div className="flex justify-between my-2 sm:my-3">
						<span>Subtotal:</span>
						<span className="font-semibold">${cart?.data?.subtotal ?? 0}</span>
					</div>

					<div className="flex justify-between my-2 sm:my-3">
						<span>
							Discount:{" "}
							<span>{cart?.data?.discountAppliedInPercentage ?? 0}%</span>
						</span>
						<span className="font-semibold text-red-600">
							-${cart?.data?.discountApplied ?? 0}
						</span>
					</div>

					<div className="flex justify-between my-2 sm:my-3">
						<span>Delivery Fee:</span>
						<span className="font-semibold">
							$
							{cart?.data?.cart?.length
								? Number(15).toFixed(2)
								: Number(0.0).toFixed(2)}
						</span>
					</div>

					<hr className="my-4 sm:my-5" />

					<div className="flex justify-between my-2 sm:my-3">
						<span>Total:</span>
						<span className="font-bold">
							${cart?.data?.total?.toFixed(2) ?? "0.00"}
						</span>
					</div>

					<Button
						onClick={() => navigate("/checkout")}
						className="rounded-full w-full mt-5 sm:mt-6"
						label="Checkout"
					/>
				</div>
			</div>
		</div>
	);};

export default Cart;
