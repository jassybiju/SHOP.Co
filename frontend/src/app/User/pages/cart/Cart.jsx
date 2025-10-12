import BreadCrumb from "@/app/Home/components/BreadCrumb";
import React from "react";
import Button from "../../components/Button";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
    useGetAllCart,
    useRemoveCartItems,
    useUpdateCartItems,
} from "../../hooks/useCart";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { ProductCard } from "../../components/ProductCart";
const Cart = () => {
    const { data: cart, status: getStatus } = useGetAllCart();
    const navigate = useNavigate();
    if (getStatus === "pending") return <Loader />;
    console.log(cart);
    return (
        <div className="px-20 py-5">
            <BreadCrumb items={[{ label: "Cart" }, { label: "a" }]} />

            <h1 className=" font-hero text-5xl my-10 ">Your Cart</h1>
            <div className="flex gap-10 w-full min-h-100">
                <div className="rounded border-1 w-3/5 border-gray-400 px-10 py-10">
                    {cart.data.map((x) => (
                        <ProductCard key={x._id} data={x} />
                    ))}
            </div>
                <div className="w-2/5 rounded border-1 h-max border-gray-400 p-5 pb-10 text-xl px-10">
                    <h1 className=" font-hero text-3xl  ">Cart Summary</h1>
                    <div className="flex justify-between w-full my-5">
                        <span>Items : </span> <span>20</span>
                    </div>
                    <hr />
                    <div className="flex justify-between w-full my-5">
                        <span>SubTotal : </span>{" "}
                        <span className="font-bold">$20</span>
                    </div>
                    <Button
                        onClick={() => navigate('/checkout')}
                        className={"rounded-full w-full"}
                        label="Checkout"
                    />
                </div>
            </div>
        </div>
    );
};


export default Cart;
