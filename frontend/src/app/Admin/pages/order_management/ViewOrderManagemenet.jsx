import React, { useState } from "react";
import { useParams } from "react-router";
import { useGetOrder, useReturnOrderItemStatus, useUpdateOrderStatus } from "../../hooks/useOrderManagement";
import Header from "../../components/Header";
import InputComponent from "@/components/InputComponent";
import Button from "@/app/User/components/Button";
import useCommentModal from "@/hooks/useCommentModal";
import { STATUS_TRANSITIONS_OPTIONS } from "@/utils/CONSTANTS";
import Loader from "@/components/Loader";

const ViewOrderManagement = () => {
	const { id } = useParams();
	const { data: orderData, status } = useGetOrder(id);
	const { mutate: updateStatus, } = useUpdateOrderStatus();
	const { mutate: returnOrder,   } = useReturnOrderItemStatus();
	const [selectedStatus, setSelectedStatus] = useState("");
	const onClickComment = useCommentModal();
	if (status === "pending") {
		return <Loader/>;
	}
	const { user_id: customerInfo, status_history, items, shipping_address_id } = orderData?.data || {};

	return (
		<div>
			<Header goback />
			<div className="w-full gap-2 flex p-3">
				<div className="w-3/5 gap-2 flex flex-col">
					{/* // Customer Info  */}
					<div className="w-full rounded-2xl border-2 bg-white ">
						{/* ! HEADER  */}
						<div className=" flex flex-col sm:flex-row p-4 sm:justify-between gap-4 sm:gap-0 border-b-2">
							<div className="flex flex-col sm:flex-row sm:gap-8 flex-1">
								Customer Information
							</div>
						</div>
						<div className="p-4">
							Name : {customerInfo.first_name} {customerInfo.last_name}
							<br />
							Email : {customerInfo.email}
							<br />
							phone : {customerInfo.phone}
						</div>
					</div>
					{/* // Timline  */}
					<div className="w-full rounded-2xl border-2 bg-white">
						{/* ! HEADER  */}
						<div className=" flex flex-col sm:flex-row p-4 sm:justify-between gap-4 sm:gap-0 border-b-2">
							<div className="flex flex-col sm:flex-row sm:gap-8 flex-1">
								Order Timeline
							</div>
						</div>
						<div className="p-8">
							<ol className="relative border-s-8 border-gray-300 ">
								{status_history.map((x) => (
									<li key={x._id} className="mb-10 ms-6 group">
										<span className="absolute flex items-center justify-center w-6 h-6  rounded-full -start-4 bg-gray-300   "></span>
										<h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 ">
											ORDER {x.status}{" "}
											<span className="ml-2 relative cursor-pointer">
												<svg
													className="w-4 h-4 text-gray-400"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path d="M9 2a7 7 0 100 14A7 7 0 009 2zm.25 10h-1.5v-1.5h1.5V12zm0-3h-1.5V5h1.5v4z" />
												</svg>
												<span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-2 text-sm text-black border-1  rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 font-normal bg-white">
													{x.description}
												</span>
											</span>
										</h3>
										<time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
											{new Date(x.changed_at).toLocaleString(
												"en-EG"
											)}
										</time>
									</li>
								))}
							</ol>
						</div>
					</div>
					{/* Orders List */}
					<div className="flex flex-col gap-5 bg-white">
						<div className="w-full rounded-2xl border-2 ">
							{/* Order Info */}
							{/* ! HEADER  */}
							<div className=" flex flex-col sm:flex-row p-4 sm:justify-between gap-4 sm:gap-0 border-b-2">
								<div className="flex flex-col sm:flex-row sm:gap-8 flex-1">
									Order Items
								</div>
							</div>
							<div className=" p-4">
								{items.map((x) => (
									<div
										key={x._id}
										className={`relative  bg-gray-50 shadow w-full mb-2 rounded-2xl px-3 py-3 flex items-center justify-between transition-all duration-300`}
									>
										{x.is_cancelled ||
											(x.is_returned && (
												<div className="absolute rounded-2xl flex items-center justify-center w-full h-full bg-gray-400/60 text-center text-3xl">
													<p className="-rotate-22 ">
														{x.is_cancelled
															? "Cancelled"
															: "Returned"}
													</p>
												</div>
											))}
										{/* Left Side - Image and Info */}
										<div className="flex h-full gap-2">
											<img
												src={x.images}
												alt=""
												className="w-25  h-30 rounded"
											/>
											<div className="flex flex-col justify-evenly h-full">
												<h1 className=" text-auto font-semibold">
													{x.name}
												</h1>
												<p>
													Size :{" "}
													{
														{
															S: "Small",
															L: "Large",
															M: "Medium",
															XL: "Extra Large",
														}[x.size]
													}
												</p>
												<p>Color : {x.color}</p>
												<h1 className="font-bold text-lg">
													$
													{(
														x.price *
														x.quantity *
														(1 -
															(x.discount ||
																0) /
																100)
													).toFixed(2)}{" "}
													({x.price} * {x.quantity}{" "}
													{x.discount
														? `- ${x.discount}%`
														: ""}
													)
												</h1>
												{x.status}
												{x.status ===
													"RETURN_REQUESTED" && (
													<div className="flex w-full gap-4">
														<Button
															onClick={() =>
																onClickComment(
																	(
																		comment
																	) => {
																		returnOrder(
																			{
																				id,
																				itemId: x._id,
																				data: {
																					status: "RETURN_ACCEPTED",
																					description:
																						comment,
																				},
																			}
																		);
																	},
																	"update status"
																)
															}
															className={
																"bg-green-400 h-1/2  text-nowrap  w-full hover:bg-green-700"
															}
															label="Return Accepted"
														/>
														<Button
															onClick={() =>
																onClickComment(
																	(
																		comment
																	) => {
																		returnOrder(
																			{
																				id,
																				itemId: x._id,
																				data: {
																					status: "RETURN_DENIED",
																					description:
																						comment,
																				},
																			}
																		);
																	},
																	"update status"
																)
															}
															className={
																"py-2  h-1/2 bg-red-400 w-full hover:bg-red-700 "
															}
															label="Return Denied"
														/>
													</div>
												)}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
					{/* // Shipping Address Info  */}
					<div className="w-full rounded-2xl border-2 bg-white">
						{/* ! HEADER  */}
						<div className=" flex flex-col sm:flex-row p-4 sm:justify-between gap-4 sm:gap-0 border-b-2">
							<div className="flex flex-col sm:flex-row sm:gap-8 flex-1">
								Shipping Address
							</div>
						</div>

						<div className="w-full  rounded-lg  flex justify-between py-2 px-4">
							<div>
								{shipping_address_id.first_name +
									" " +
									shipping_address_id.last_name}{" "}
								,{shipping_address_id.address}
								<br />
								{shipping_address_id.place}, {shipping_address_id.state},
								<br />
								{shipping_address_id.pincode}
								<br />
								Contact : {shipping_address_id.phone}
							</div>
							<div className="flex flex-col justify-between items-end">
								<div>
									<span className="bg-gray-500 text-white text-sm px-4 py-1 rounded-full mx-3">
										{shipping_address_id.address_type}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="w-2/4 flex flex-col gap-2 ">
					{/* // Update Status  */}
					<div className="w-full rounded-2xl border-2 bg-white ">
						{/* ! HEADER  */}
						<div className=" flex flex-col sm:flex-row p-4 sm:justify-between gap-4 sm:gap-0 border-b-2">
							<div className="flex flex-col sm:flex-row sm:gap-8 flex-1">
								Update Order Status
							</div>
						</div>
						<div className="p-4">
							<InputComponent
								select
								value={selectedStatus}
								onChange={(e) => setSelectedStatus(e.target.value)}
								placeholder={"Select Status"}
								options={
									STATUS_TRANSITIONS_OPTIONS[
										status_history.slice(-1)[0].status
									]
								}
							/>
							<Button
								onClick={() =>
									selectedStatus === "RETURNED" || selectedStatus ==='RETURN_DENIED'
										? onClickComment((x) => {
												updateStatus({
													id,
													data: {
														status: selectedStatus,
														description: x,
													},
												});
										  }, "update status")
										: updateStatus({
												id,
												data: {
													status: selectedStatus,
													description: 'No Description',
												},
										  })
								}
								className={"bg-green-400 w-full hover:bg-green-700"}
								label="Submit"
							/>
						</div>
					</div>

					<div className="w-full rounded-2xl border-2 bg-white  ">
						{/* ! HEADER  */}
						<div className=" flex flex-col sm:flex-row p-4 sm:justify-between gap-4 sm:gap-0 border-b-2">
							<div className="flex flex-col sm:flex-row sm:gap-8 flex-1">
								Order Summary
							</div>
						</div>
						<div className="p-4 flex flex-col gap-3">
							<div className="w-full flex justify-between">
								<span className="">
									Subtotal{" "}
									<span className="text-gray-500 text-sm">
										( {items.length} item(s) )
									</span>
									:{" "}
								</span>
								<span className="font-bold ">
									{" "}
									${orderData.data.subtotal.toFixed(2)}{" "}
								</span>
							</div>
							<div className="w-full flex justify-between">
								<span className="">Discount :</span>
								<span className="font-bold text-red-600">
									- ${orderData.data.discountApplied.toFixed(2)}{" "}
								</span>
							</div>
							<div className="w-full flex justify-between">
								<span className="">Coupon Discount :</span>
								<span className="font-bold text-red-600">
									- ${orderData.data.couponDiscountApplied.toFixed(2)}{" "}
								</span>
							</div>
							<hr className="border-1 border-gray-500" />
							<div className="w-full flex justify-between">
								<span className="">Total :</span>
								<span className="font-bold ">
									${orderData.data.total_amount.toFixed(2)}{" "}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ViewOrderManagement;
