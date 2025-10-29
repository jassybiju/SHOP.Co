import React from "react";
import Footer from "@/app/Home/components/Footer";
import Navbar from "@/app/Home/components/Navbar";
import { Link, useLocation, Navigate } from "react-router";

const OrderSuccessful = () => {
    const {state : {total_amount , payment_method, order_id}} = useLocation()

    if(!order_id) {return <Navigate to='/'/>}

  return <div>
    <Navbar/>
        <div className="text-center py-10">
            <div className="w-50 h-50 bg-green-600 rounded-full flex items-center justify-center text-8xl mx-auto">✔️</div>
            <p className="font-hero text-5xl my-3">Order Successful</p>
            <p>Thank you for your purchase! Your order has been confirmed and will be processed shortly.</p>
            <div className="bg-gray-200 mx-auto w-1/2 flex flex-col p-10 rounded-lg gap-5 my-5">
                <div className="flex justify-between"><span>Order Number</span><span>{order_id}</span></div>
                <div className="flex justify-between"><span>Payment Methods</span><span>{payment_method}</span></div>
                <div className="flex justify-between"><span>Total Amount</span><span>{total_amount}</span></div>
            </div>
            <div className="flex gap-1 mx-auto w-1/2 items-center text-nowrap flex-col ">
            <Link to={'/account/orders'} className=" w-1/2 bg-black rounded-full text-white text-xl py-2 px-10 my-2">Track Order</Link>

            <Link to={'/search'} className="w-auto bg-black rounded-full text-white text-xl py-3 px-10 my-2">Continue Shopping</Link>
            </div>
        </div>
    <Footer/>
  </div>;
};
export default OrderSuccessful;
