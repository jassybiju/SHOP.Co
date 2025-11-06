import React from "react";
import { useRemoveCartItems, useUpdateCartItems } from "../hooks/useCart";
import { BatteryWarning, LucideFileWarning, Minus, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router";

export const ProductCard = ({ data , disabled , is_blocked = false}) => {
    const { mutate: updateCartItem, status } = useUpdateCartItems();
    const { mutate: removeCartItem, status: removeStatus } =
        useRemoveCartItems();
    console.log(data)
    const onAddToCart = (quantity) => {
        updateCartItem(
            { variant_id: data.variant_id, quantity },
            {
                onSuccess: (data) => {
                    console.log(data);
                    toast.success(data.message);
                },
                onError: (res) => {
                    console.log(res);
                    toast.error(res.response.data.message);
                },
            }
        );
    };

    const isRemoving = removeStatus === "pending";

    return (
        <div
            className={`relative bg-gray-50 shadow w-full h-40 rounded-2xl px-3 py-3 flex items-center justify-between transition-all duration-300 ${
                isRemoving ? "opacity-60 pointer-events-none" : ""
            }`}
        >
            {/* Left Side - Image and Info */}
            <Link to={'/product/'+data.product_id} className="flex h-full gap-5" >
                <img src={data.image} alt="" className="w-35 h-35 rounded" />
                <div className="flex flex-col justify-evenly h-full">
                    <h1 className="font-hero text-xl">{data.name}</h1>
                    <p>
                        Size :{" "}
                        {
                            {
                                S: "Small",
                                L: "Large",
                                M: "Medium",
                                XL: "Extra Large",
                            }[data.size]
                        }
                    </p>
                    <p>Color : {data.color}</p>
                    <h1 className="font-hero text-xl">${data.price} * {data.quantity}</h1>
                    {is_blocked && <p className="text-red-500"> <BatteryWarning/> Product is out of stock</p>}
                </div>
            </Link>
           {!disabled && (

            <div className="flex flex-col justify-between items-end h-full">
                <button
                    onClick={() => removeCartItem(data._id)}
                    disabled={isRemoving}
                >
                    <Trash2 className="text-red-700 mx-3" />
                </button>
                <div className="flex gap-3 bg-gray-100 py-3 px-5 rounded-full items-center">
                    <button
                        onClick={() => onAddToCart(1)}
                        disabled={status === "pending" || isRemoving}
                        className="hover:bg-gray-300 border-8 border-neutral-50 rounded-full hover:border-gray-300"
                    >
                        <Plus />
                    </button>
                    {data.quantity}
                    <button
                        onClick={() => onAddToCart(-1)}
                        disabled={status === "pending" || isRemoving}
                        className="hover:bg-gray-300 border-8 border-black/0 rounded-full hover:border-gray-300"
                    >
                        <Minus />
                    </button>
                </div>
            </div>
            )}
        </div>
    );
};