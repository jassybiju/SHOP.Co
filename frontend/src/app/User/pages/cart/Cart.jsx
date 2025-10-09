import BreadCrumb from "@/app/Home/components/BreadCrumb";
import React from "react";
const Cart = () => {
    return (
        <div className="px-10 py-5">
            <BreadCrumb items={[{ label: "Cart" }, { label: "a" }]} />

            <h1 className=" font-hero text-5xl  ">Your Cart</h1>
            
        </div>
    );
};
export default Cart;
