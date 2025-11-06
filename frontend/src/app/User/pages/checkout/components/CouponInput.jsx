import { useValidateCoupon } from "@/app/Admin/hooks/useCouponManagement";
import Button from "@/app/User/components/Button";
import { TicketPercent } from "lucide-react";
import React, { useRef } from "react";
import toast from "react-hot-toast";

const CouponInput = ({cartTotal , setDiscountData , available}) => {
    const codeRef = useRef()
    const {mutate : validateCoupon , status , data , error} = useValidateCoupon()

    const handleApplyCoupon = () => {
        validateCoupon(
            { code : codeRef.current.value , cartTotal },
            {
                onSuccess : (response) => {
                    console.log(response)
                    toast.success(response.message || "Coupon Applied Successfully")
                    setDiscountData(response.data)
                },
                onError : (err) => {
                    setDiscountData(null)
                    toast.error(err.response?.data?.message)
                }
            }
        )
    }

    return (
		<div className="w-full mx-auto mb-5 flex gap-2">
			<div className="relative w-full">
				<div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
					<TicketPercent />
				</div>
				<input
					// onChange={onChange}
                    ref={codeRef}
					id="default-search"
					className="block w-full p-3 ps-15 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-100 focus:border-blue-500 focus-visible:ring-blue-100 outline-violet-600 "
					placeholder={"Add Coupon Code"}
                    list='suggestion'
					required
				/>
                <datalist id='suggestion'>
                    {available.map(x => (

                    <option value={x.code}>{x.description}</option>
                    ))}
                </datalist>
			</div>
			<Button
				className={"rounded-full text-lg text-center !p-0 w-2/5"}
				label="Apply"
                onClick={()=> handleApplyCoupon(codeRef.current.value)}
			/>
		</div>
	);
};
export default CouponInput;
