import React, { useEffect, useState } from "react";
import { useCheckout } from "../../hooks/useCheckout";
import Button from "../../components/Button";
import BreadCrumb from "@/app/Home/components/BreadCrumb";
import { ProductCard } from "../../components/ProductCart";
import Loader from "@/components/Loader";
import { redirect, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import CouponInput from "./components/CouponInput";
import { MoveRight } from "lucide-react";
import ModalWrapper from "@/components/ModalWrapper";
import AddAddress from "../../Accounts/pages/address/AddAddress";
import { useModal } from "@/hooks/useModal";
import { usePlaceOrder } from "../../hooks/useOrder";
import { displayRazorpay } from "@/utils/displayRazorpay";
import { orderAxiosInstance } from "@/lib/axios";
const Checkout = () => {
	// s
	const { state } = useLocation();

	const { data, status, error } = useCheckout(state);
	const { cart, subtotal, total, address, discountApplied, delivery_fee, discountAppliedInPercentage , availableCoupons } = data?.data || {};

	const { mutate: placeOrder, status: placeOrderStatus } = usePlaceOrder();
	const [paymentMethod, setPaymentMethod] = useState("COD");
    const [placedOrder, setPlacedOrder] = useState(false)
	const navigate = useNavigate();
	const { openModal, closeModal } = useModal();
	const [selectedAddress, setSelectedAddress] = useState();
	const [couponDiscount, setCouponDiscount] = useState(null);
	useEffect(() => console.log(paymentMethod), [paymentMethod]);

	// * populating address
	useEffect(() => {
		if (data?.data.address) {
			setSelectedAddress(address.find((x) => x.is_primary === true)?._id);
		}
	}, [data?.data?.address, address]);

	if (status === "pending") return <Loader />;

	if (status === "error" || !data || data.status !== "success") {
		console.log(error);
		// toast.error(data?.message || "Unable to load checkout");
		console.log(error);
		toast.error(error?.response.data.message || "Network Error");
		navigate("/cart", { replace: true });
		return null;
	}

	// ! show address Modal
	const showAddAddressModal = () => {
		openModal("add-address", <ModalWrapper onX={() => closeModal("add-address")} render={<AddAddress />} />);
	};

	const onPlaceOrder = () => {
        setPlacedOrder(true)
		placeOrder(
			{
				order_items: cart.map((x) => ({
					variant_id: x.variant_id,
					quantity: x.quantity,
				})),
				shipping_address_id: selectedAddress,
				payment_method: paymentMethod,
				coupon_code: couponDiscount?.code,
			},
			{
				onSettled: (data) => console.log(data),
				onError: (data) => toast.error(data.response.data.message),
				onSuccess: (data) => {
					toast.success(data.message);

					if (data?.data?.razorpay_order) {
                        console.log(data?.data?.razorpay_order)
                            displayRazorpay(data.data.razorpay_order, (response) => {
                                console.log(response);
                                orderAxiosInstance
                                    .post("/verify-payment", {
                                        razorpay_order_id: response.razorpay_order_id,
                                        razorpay_payment_id: response.razorpay_payment_id,
                                        razorpay_signature: response.razorpay_signature,
                                    })
                                    .then((res) => {
                                        console.log(res.statusText === "OK");
                                        if (res.statusText === "OK") {
                                            console.log(1);
                                            return navigate("/order/successful",{state : {total_amount : data?.data?.order.total_amount, order_id : data?.data?.order._id, payment_method : data?.data?.order.payment_method}});
                                            // return window.location.href = '/order/susccessful'
                                        } else {
                                            console.log(2);
                                            return navigate("/order/payment-failed",{state : {razorpay_order_id : data.data.razorpay_order.razorpay_order_id}});
                                            // return window.location.href = '/order/paymsent-failed'
                                        }
                                    })
                                    .catch((e) => {
                                        console.log(3);
                                        return navigate("/order/paydment-failed");
                                    });
                            });
					} else {
						navigate("/order/successful",{state : {total_amount : data?.data?.order.total_amount, order_id : data?.data?.order._id, payment_method : data?.data?.order.payment_method}});
					}
				},
			}
		);
	};

	return (
		<>
			<div className="px-20 py-5">
				<BreadCrumb items={[{ label: "Cart" }, { label: "Checkout" }]} />

				<h1 className="font-hero text-5xl my-10">Checkout</h1>
				<div className="flex gap-10 w-full h-min lg:flex-row flex-col">
					<div className="flex flex-col w-full lg:3/5">
						{/* // Cart Items  */}
						<div className="rounded border-0 w-full border-gray-400 px-1 py-1 h-max">
							{cart.map((x) => (
								<ProductCard key={x._id} data={x} disabled={true} />
							))}
						</div>

						{/* //Addres/s */}
						<div className="rounded-xl shadow-lg border-2 border-gray-100 my-5 px-10 py-10 h-min gap-2 flex flex-col">
							<p className="font-hero text-2xl w-full border-b-1 py-5 my-5">Delivery Address</p>
							{address
								.sort((a, b) => (b.is_primary === true) - (a.is_primary === true))
								.map((data) => (
									<div key={data._id} className="w-full border-2 rounded-lg  flex justify-between py-2 px-4">
										<div>
											{data.first_name + " " + data.last_name} ,{data.address}
											<br />
											{data.place}, {data.state}
											,
											<br />
											{data.pincode}
											<br />
											Contact : {data.phone}
										</div>
										<div className="flex flex-col justify-between items-end">
											<div>
												<span className="bg-gray-500 text-white text-sm px-4 py-1 rounded-full mx-3">
													{data.address_type}
												</span>
												{data._id === selectedAddress ? (
													<input
														checked
														id="default-radio-2"
														type="radio"
														value=""
														name="default-radio"
														className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
													></input>
												) : (
													<input
														onClick={() => setSelectedAddress(data._id)}
														id="default-radio-1"
														type="radio"
														value=""
														name="default-radio"
														className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
													></input>
												)}
											</div>

											{/* <div className="gap-2 flex">
                                                <button
                                                    className="bg-black text-white px-8 py-1 rounded hover:bg-gray-800"
                                                    onClick={() =>
                                                        editModal(data._id)
                                                    }
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="bg-gray-400 text-white px-8 py-1 rounded hover:bg-gray-500"
                                                    onClick={() =>
                                                        deleteAddress(data._id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div> */}
										</div>
									</div>
								))}
							<div className="flex justify-end">
								<Button label="Add Address" loadingLabel="Adding Address" onClick={showAddAddressModal} />
							</div>
						</div>

						{/* // Payment Methods */}
						<div className="rounded-xl shadow-lg border-2 border-gray-100 bg-white px-10 py-10 my-5 h-min gap-2 flex flex-col">
							<p className="font-hero text-2xl border-b-1 py-5 w-full my-5">Payment Method</p>
							Select Any Payment Methods
							<div className="flex flex-col gap-4 my-4">
								{[
									{
										label: "Cash On Delivery",
										value: "COD",
									},
									{
										label: "RAZORPAY",
										value: "RAZORPAY",
									},
									{ label: "Wallet", value : "WALLET" },
								].map((x, i) => (
									<>
										<div className="flex items-center me-4">
											<input
												defaultChecked={i === 0}
												onClick={(x) => setPaymentMethod(x.target.value)}
												id="inline-checked-radio"
												type="radio"
												value={x.value}
												name={"payment"}
												className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
											/>
											<label htmlFor={x.label} className="ms-2 text-sm font-medium text-gray-900">
												{x.label}
											</label>
										</div>
									</>
								))}
								<div className="flex items-center">
									<input
										disabled
										id="inline-disabled-radio"
										type="radio"
										value=""
										name="inline-radio-group"
										className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
									/>
									<label
										htmlFor="inline-disabled-radio"
										className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500"
									>
										Inline disabled
									</label>
								</div>
							</div>
						</div>
					</div>
					<div className="lg:w-2/5 w-full rounded border-1 h-max border-gray-400 text-lg p-5 pb-10 text-bg-gray-200 px-10">
						<h1 className="font-hero text-3xl">Order Summary</h1>
						<div className="flex justify-between w-full my-5">
							<span>Subtotal : </span>
							<span className="font-bold">${subtotal}</span>
						</div>
						<div className="flex justify-between w-full my-5">
							<span>Discount : <span>({discountAppliedInPercentage} %)</span> </span>
							<span className="font-bold text-red-600">-${discountApplied}</span>
						</div>

						<div className="flex justify-between w-full my-5">
							<span>Delivery Fee : </span>
							<span className="font-bold ">${delivery_fee}</span>
						</div>
						{couponDiscount ? (
							<div className="flex justify-between w-full my-5">
								You saved {couponDiscount?.discountAmount} ({couponDiscount?.discountPercentageApplied}%) with {couponDiscount.code}{" "}
								<button onClick={() => setCouponDiscount(null)}>remove</button>
							</div>
						) : (
							<CouponInput available={availableCoupons} cartTotal={total} setDiscountData={setCouponDiscount} />
						)}
						<hr />
						<div className="flex justify-between w-full my-5">
							<span>Total : </span>
							<span className="font-bold">${ couponDiscount?.discountedTotal ?   (couponDiscount?.discountedTotal || 0) : total}</span>
						</div>

						<Button
							onClick={onPlaceOrder}
							className={"rounded-full w-full mt-4"}
							label={
								<div className="flex gap-2 justify-center">
									Place Order <MoveRight />{" "}
								</div>
							}
							disabled={placedOrder}
							loadingLabel={
								<div className="flex gap-2 justify-center">
									Placing Order <MoveRight />{" "}
								</div>
							}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Checkout;
