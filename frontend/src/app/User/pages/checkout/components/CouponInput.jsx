import Button from "@/app/User/components/Button";
import { Loader, TicketPercent } from "lucide-react";
import React from "react";

const CouponInput = () => {
    return (
        <div className="w-full mx-auto flex gap-2">

            <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
                    <TicketPercent/>
                </div>
                <input
                    // onChange={onChange}

                    id="default-search"
                    className="block w-full p-5 ps-15 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-100 focus:border-blue-500 focus-visible:ring-blue-100 outline-violet-600 "
                    placeholder={"Add Coupon Code"}
                    required
                />

            </div>
            <Button className={'rounded-full text-lg text-center !p-0 w-2/5'} label="Apply"/>
        </div>
    );
};
export default CouponInput;
