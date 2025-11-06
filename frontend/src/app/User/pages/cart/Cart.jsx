import BreadCrumb from "@/app/Home/components/BreadCrumb";
import React from "react";
import Button from "../../components/Button";
import { useGetAllCart, useRemoveCartItems, useUpdateCartItems } from "../../hooks/useCart";
import Loader from "@/components/Loader";
import { useNavigate } from "react-router";
import { ProductCard } from "../../components/ProductCart";
import { useResponsive } from "@/hooks/useResponsive";
const Cart = () => {
	const { data: cart, status: getStatus } = useGetAllCart();
	const navigate = useNavigate();
	const { isTab } = useResponsive();
	if (getStatus === "pending") return <Loader />;
	console.log(cart);
	return (
		<div className="px-20 py-5">
			<BreadCrumb />

			<h1 className=" font-hero text-5xl my-10 ">Your Cart</h1>
			<div className="flex flex-col md:flex-row gap-10 w-full min-h-100">
				<div className="rounded border-1 w-3/5 border-gray-400 px-10 py-10">
					{cart?.data?.cart.map((x) => (
						<ProductCard key={x._id} data={x} is_blocked={x.stock === 0} />
					))}
				</div>
				<div className="w-full md:2/5 rounded border-1 h-max border-gray-400 md:p-5 p-2 pb-10 text-lg md:px-10 px-4 ">
					<h1 className="font-hero text-3xl">Order Summary</h1>
					<div className="flex justify-between w-full my-5">
						<span>Subtotal : </span>
						<span className="font-bold">${cart.data.subtotal}</span>
					</div>
					<div className="flex justify-between w-full my-5">
						<span>
							Discount : <span>{cart.data.discountAppliedInPercentage}</span>{" "}
						</span>
						<span className="font-bold text-red-600">-${cart.data.discountApplied}</span>
					</div>
					<div className="flex justify-between w-full my-5">
						<span>Delivery Fee : </span>
						<span className="font-bold ">${cart.data.cart.length !== 0 ? Number(15).toFixed(2) : Number(0.0).toFixed(2)}</span>
					</div>
					<hr />
					<div className="flex justify-between w-full my-5">
						<span>Total : </span>
						<span className="font-bold">${cart.data.total.toFixed(2)}</span>
					</div>

					{/* <CouponInput /> */}

					<Button onClick={() => navigate("/checkout")} className={"rounded-full w-full"} label="Checkout" />
				</div>
			</div>
		</div>
	);
};

export default Cart;
