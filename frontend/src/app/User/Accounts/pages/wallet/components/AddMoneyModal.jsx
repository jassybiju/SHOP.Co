import { useModal } from "@/hooks/useModal";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAddAmount } from "../../../hooks/useWallet";
import toast from "react-hot-toast";
import { displayRazorpay } from "@/utils/displayRazorpay";
import { walletAxiosInstance } from "@/lib/axios";
import { redirect } from "react-router";

const AddMoneyModal = () => {
	const {
		register,
		handleSubmit,
		formState: { errors: formError },
	} = useForm();
	const { mutate: addMoney , status } = useAddAmount();
	const { closeModal } = useModal();
	const onSubmit = (data) => {
		addMoney(data, {
			onSuccess: (data) => {
				toast.success(data.message);
				if (data?.status === "success") {
                    console.log(data.data)
					displayRazorpay(data.data, (response) => {
						walletAxiosInstance
							.post("validate", {
								razorpay_order_id: response.razorpay_order_id,
								razorpay_payment_id: response.razorpay_payment_id,
								razorpay_signature: response.razorpay_signature,
							})
							.then((data) => {
								console.log(data.statusText === "OK");
								if (data.statusText === "OK") {
									console.log(1);
									return redirect("/order/successful");
									// return window.location.href = '/order/susccessful'
								} else {
									console.log(2);
									return redirect("/order/payment-failed");
									// return window.location.href = '/order/paymsent-failed'
								}
							})
							.catch((e) => {
								console.log(3);
								window.location.href = "/order/paydment-failed";
							});
					},()=>toast.error("Error In payment"));
				}
			},
			onError: (data) => toast.error(data.response.data.message),
		});
	};
	return (
		<>
			<div className="bg-white rounded-xl shadow-xl w-1/2 my-10  p-10 px-[10%]  outline-1">
				<h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2">Add Money</h2>

				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<p className="text-red-500"></p>

					<div className="mb-6">
						<label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
							<span className="text-red-500">*</span> Amount
						</label>
						<input
							type="number"
							name="amount"
							min={0}
							{...register("amount", {
								required: "Amount is required",
								min: {
									value: 1,
									message: "Amount should be greater than 0",
								},
							})}
							required
							placeholder="Enter Amount"
							className="block w-full bg-gray-50 border border-gray-300 rounded-lg p-3  text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
						/>
						<p className="text-red-500">{formError?.amount?.message}</p>
					</div>
					<div className="mb-8">
						<p>Currently razorpay gateway is only available </p>
					</div>
					<div className="flex justify-end gap-4">
						<button
							type="button"
							disabled={status == "pending"}
							onClick={() => closeModal("add-money")}
							className="px-6 py-3 bg-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-400 transition disabled:bg-gray-400"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={status === "pending"}
							className="px-6 py-3 bg-indigo-600 rounded-lg font-semibold text-white hover:bg-indigo-700 transition disabled:bg-indigo-700"
						>
							{status === "pending" ? (
								<div className="flex gap-2">
									<Loader2 className="animate-spin" /> Adding Money
								</div>
							) : (
								"Add Money"
							)}
						</button>
					</div>
				</form>
			</div>
		</>
	);
};
export default AddMoneyModal;
