import toast from "react-hot-toast";
import { loadScript } from "./loadScript";
import { redirect } from "react-router";

export const displayRazorpay = async (result, validateFn , errorFn = null) => {
	const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

	if (!res) {
		toast.error("Razorpay sdk failed to load");
		return;
	}

	const { amount, id: order_id, currency, receipt='' } = result;
    console.log(amount, result)
	const options = {
		key: "rzp_test_RVl8zmvwluwyHj",
		amount: amount.toString(),
		currency: currency,
		name: receipt,
		description: `${amount.toString()} from ${receipt}`,
		order_id,
		prefill: {
			name: "yourname0",
			email: "name@gamilc.om",
			contact: 12434568,
		},
        modal : {
            ondismiss : () => {
                console.log(7785)
                if(!errorFn){
                    console.log(order_id, amount.toString())
                window.location.href = `/order/failed?orderId=${order_id}&amount=${amount.toString()}`
                toast.error("Payment popul closed")
                }
                else{
                    console.log(1232)
                    errorFn()
                }
            }
        },
		handler:validateFn,
		theme: {
			color: "#2249f5",
		},
	};

	const paymentObj = new window.Razorpay(options);
	paymentObj.open();
};
