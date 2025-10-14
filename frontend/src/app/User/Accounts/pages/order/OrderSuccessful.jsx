import React from "react";
import Footer from "@/app/Home/components/Footer";
import Navbar from "@/app/Home/components/Navbar";
import { Link } from "react-router";

const OrderSuccessful = () => {
  return <div>
    <Navbar/>
        <div className="text-center py-10">
            <div className="w-50 h-50 bg-green-600 rounded-full flex items-center justify-center text-8xl mx-auto">✔️</div>
            <p className="font-hero text-5xl my-3">Order Successful</p>
            <p>Thank you for your purchase! Your order has been confirmed and will be processed shortly.</p>
            <div className="bg-gray-200 mx-auto w-1/2 flex flex-col p-10 rounded-lg gap-5 my-5">
                <div className="flex justify-between"><span>Order Number</span><span>asdf</span></div>
                <div className="flex justify-between"><span>Payment Methods</span><span>asdf</span></div>
                <div className="flex justify-between"><span>Total Amount</span><span>asdf</span></div>
            </div>
            <Link to={'/account/orders'} className="mx-auto w-1/4 bg-black rounded-full text-white text-xl py-2 px-10 my-5">Track Order</Link>
        </div>
    <Footer/>
  </div>;
};
export default OrderSuccessful;
