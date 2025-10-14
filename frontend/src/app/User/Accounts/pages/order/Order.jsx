import Search from "@/app/Admin/components/Search";
import { ProductCard } from "@/app/User/components/ProductCart";
import { useCancelOrder, useGetAllOrder, useReturnOrder } from "@/app/User/hooks/useOrder";
import Loader from "@/components/Loader";
import {Link} from 'react-router-dom'
import useCommentModal from "@/hooks/useCommentModal";
import React, { useState } from "react";

const Order = () => {
    const { data, status } = useGetAllOrder();
    const [params, setParams] = useState({ q: "", sort: "", order: "" });
    const onClickComment = useCommentModal();
    const { mutate: cancelOrder } = useCancelOrder();
    const {mutate : returnOrder} = useReturnOrder()
    console.log(data?.data);
    const SORT_OPTIONS = [
        // { label: "Most Popular", sort: "popularity", order: "desc" },
        { label: "Latest", sort: "createdAt", order: "desc" },
        { label: "Oldest", sort: "createdAt", order: "asc" },
    ];
    if (status === "pending") {
        return <Loader />;
    }
    return (
        <div className="w-3/5 mx-auto shadow-xl ring ring-gray-200 rounded-xl px-20 py-10 ">
            <div className="pb-5 mb-5 flex justify-between text-2xl font-semibold border-b-2">
                <span>My Orders</span>
            </div>
            <div className="flex justify-between">
                {/* <Search
                    label={"Search Order by id"}
                    className="m-0"
                    width={50}
                    onChange={(e) =>
                        setParams((prev) => ({ ...prev, q: e.target.value }))
                    }
                />

                <select
                    // onChange={(e)=>toggleSortOptions(e.target.value)}
                    value={`${params.sort}_${params.order}`}
                    onChange={(e) => {
                        const [sort, order] = e.target.value.split("_");
                        setParams((prev) => ({ ...prev, sort, order }));
                    }}
                    className="border border-black/20 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
                >
                    {SORT_OPTIONS.map((option) => (
                        <option
                            key={option.label}
                            value={`${option.sort}_${option.order}`}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>

                <select
                    // onChange={(e)=>toggleSortOptions(e.target.value)}
                    value={`${params.sort}_${params.order}`}
                    onChange={(e) => {
                        const [sort, order] = e.target.value.split("_");
                        setParams((prev) => ({ ...prev, sort, order }));
                    }}
                    className="border border-black/20 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
                >
                    {SORT_OPTIONS.map((option) => (
                        <option
                            key={option.label}
                            value={`${option.sort}_${option.order}`}
                        >
                            {option.label}
                        </option>
                    ))}
                </select> */}
            </div>
            {/* Orders List */}
            <div className="flex flex-col gap-5">
                {data?.data?.map((order) => (
                    <div
                        key={order._id}
                        className="w-full rounded-2xl border-2 "
                    >
                        {/* Order Info */}
                        {/* ! HEADER  */}
                        <div className=" flex flex-col sm:flex-row p-4 sm:justify-between gap-4 sm:gap-0 border-b-2">
                            <div className="flex flex-col sm:flex-row sm:gap-8 flex-1">
                                <div className="flex flex-col">
                                    <span className="text-gray-400 text-xs">
                                        ORDER ID
                                    </span>
                                    <span className="font-medium text-sm">
                                        {order._id}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-400 text-xs">
                                        ORDER DATE
                                    </span>
                                    <span className="font-medium text-sm">
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-400 text-xs">
                                        TOTAL AMOUNT
                                    </span>
                                    <span className="font-medium text-sm">
                                        {order.total_amount.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-400 text-xs">
                                        PAYMENT TYPE
                                    </span>
                                    <span className="font-medium text-sm">
                                        {order.payment_method}
                                    </span>
                                </div>
                            </div>

                            {/* Order Status */}
                            <div className="flex flex-col sm:items-end justify-center bg-green-400 text-white px-4 py-2 rounded">
                                <span className="font-medium text-sm">
                                    {order.status_history.slice(-1)[0]?.status}
                                </span>
                            </div>
                        </div>
                        <div className=" p-4">
                            {order.items.map((x) => (
                                <div
                                    key={x._id}
                                    className={`relative bg-gray-50 shadow w-full  rounded-2xl px-3 py-3 flex items-center justify-between transition-all duration-300`}
                                >
                                    {/* Left Side - Image and Info */}
                                    <div className="flex h-full gap-2">
                                        <img
                                            src={x.image}
                                            alt=""
                                            className="w-25  h-30 rounded"
                                        />
                                        <div className="flex flex-col justify-evenly h-full">
                                            <h1 className=" text-auto font-semibold">
                                                {x.name}
                                            </h1>
                                            <p>
                                                Size :{" "}
                                                {
                                                    {
                                                        S: "Small",
                                                        L: "Large",
                                                        M: "Medium",
                                                        XL: "Extra Large",
                                                    }[x.size]
                                                }
                                            </p>
                                            <p>Color : {x.color}</p>
                                            <h1 className="font-bold text-lg">
                                                $
                                                {(
                                                    x.price *
                                                    x.quantity *
                                                    (1 -
                                                        (x.discount || 0) / 100)
                                                ).toFixed(2)}{" "}
                                                ({x.price} * {x.quantity}{" "}
                                                {x.discount
                                                    ? `- ${x.discount}%`
                                                    : ""}
                                                )
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div>
                                <Link to={"/account/orders/"+order._id} className="px-5  py-2 me-4 bg-amber-400 rounded border-1 text-white">View</Link>


                                 {order.status_history.slice(-1)[0]?.status !== 'DELIVERED' ?
                                <button
                                    className="px-3 py-2 bg-red-400 rounded border-1 text-white"
                                    onClick={() =>
                                        onClickComment((x) =>
                                            cancelOrder({
                                                id: order._id,
                                                data: { reason: x },
                                            })
                                        )
                                    }
                                >
                                    Cancel Order
                                </button>
                                 :
   <button
                                    className="px-3 py-2 bg-red-400 rounded border-1 text-white"
                                    onClick={() =>
                                        onClickComment((x) =>
                                            returnOrder({
                                                id: order._id,
                                                data: { reason: x },
                                            })
                                        )
                                    }
                                >
                                    Return Order
                                </button>
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Order;
