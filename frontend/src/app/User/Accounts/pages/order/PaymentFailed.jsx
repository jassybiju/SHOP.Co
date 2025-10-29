import Footer from "@/app/Home/components/Footer"
import Navbar from "@/app/Home/components/Navbar"
import { orderAxiosInstance } from "@/lib/axios"
import { displayRazorpay } from "@/utils/displayRazorpay"
import toast from "react-hot-toast"
import { Link, useLocation, useNavigate } from "react-router"


const PaymentFailed = () => {
    const {state ,search} = useLocation()
    const navigate = useNavigate()
    let razorpay_order_id = state?.razorpay_order_id
    let total_amount = state?.total_amount
    if(!state){
        const query = new URLSearchParams(search)
         razorpay_order_id = query.get('orderId')
        total_amount = query.get('amount')
    }
    console.log(total_amount)
    return (
        <><div>
    <Navbar/>
        <div className="text-center py-10">
            <div className="w-50 h-50 bg-red-600 rounded-full flex items-center justify-center text-8xl mx-auto text-white">X</div>
            <p className="font-hero text-5xl my-3">Payment Failed {razorpay_order_id}</p>
            <p>Thank you for your purchase! Your order has been confirmed and will be processed shortly.</p>
            {/* <div className="bg-gray-200 mx-auto w-1/2 flex flex-col p-10 rounded-lg gap-5 my-5">
                <div className="flex justify-between"><span>Order Number</span><span>state.</span></div>
                <div className="flex justify-between"><span>Payment Methods</span><span>asdf</span></div>
                <div className="flex justify-between"><span>Total Amount</span><span>asdf</span></div>
            </div> */}
            <Link to={'/account/orders'} className="mx-auto w-1/4 bg-black rounded-full text-white text-xl py-2 px-10 my-5">track order</Link>
            <button className="mx-auto w-1/4 bg-black rounded-full text-white text-xl py-2 px-10 my-5" onClick={()=>displayRazorpay({id :razorpay_order_id , amount : (total_amount * 100).toFixed(2), currency : "INR"},(response)=>{
                                            console.log(response)
                                            orderAxiosInstance.post('./verify-payment',{
                                                razorpay_order_id : response.razorpay_order_id,
                                                razorpay_payment_id : response.razorpay_payment_id,
                                                razorpay_signature : response.razorpay_signature
                                            }).then((res)=>{
                                                console.log(res," Order paid")
                                                if(res.statusText === "OK"){
                                                    toast.success("Payment Received")
                                                    return navigate('/account/orders')
                                                }else{
                                                    toast.error('Payment Failed')
                                                }
                                            }).catch(e=>{
                                                console.log(e)
                                                toast.error("Payment failed")
                                            })
                                        },()=> toast.error("Error i payemnt"))}>REPAY</button>
        </div>
    <Footer/>
  </div>;</>
    )
}

export default PaymentFailed