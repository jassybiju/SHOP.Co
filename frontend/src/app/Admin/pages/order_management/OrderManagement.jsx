import React, { useState } from "react";
import TableComponent from "../../components/TableComponent";
import { Link } from "react-router";
import Header from "../../components/Header";
import IconCards from "../../components/IconCards";
import { Package2, PackageMinus } from "lucide-react";
import Search from "../../components/Search";
import Dropdown from "../../components/Dropdown";
import { useGetAllOrder } from "../../hooks/useOrderManagement";
import Loader from "@/components/Loader";

const OrderManagement = () => {
    const [params, setParams] = useState({
        search: "",
    });

    const { data: orders, status } = useGetAllOrder();
    if (status === "pending") {
        return <Loader />;
    }
    const column = [
        {
            label: "ORD ID",
            key: "_id",
        },
        {
            label: "DATE",
            key: "createdAt",
            render : (val) => <p className="text-nowrap">{new Date(val).toLocaleDateString('en-GB',{day:'2-digit', month : 'short', year: 'numeric'})} <span className="block text-gray-500">{new Date(val).toLocaleTimeString()}</span></p>
        },{
            label : "USER EMAIL",
            key : 'user',
            render : (val) => val.email
        },{
            label : "TOTAL",
            key : "total_amount",
            render : (val) => Number(val).toFixed(2)
        },
        {
            label : "PAYMENT METHOD",
            key : "payment_method",
        }, {
            label : "PAYMENT STATUS",
            key : "payment_status",
        },{
            label : 'ACTIONS',
            render : (_, row)=> <div className="flex gap-5">
                    {" "}
                    <Link
                        className="bg-violet-600 hover:bg-violet-700 text-white py-1 px-4 rounded font-semibold text-xs"
                        to={"view/" + row._id}
                    >
                        VIEW
                    </Link>
                    <Link
                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded font-semibold text-xs"
                        to={"edit/" + row._id}
                    >
                        Edit
                    </Link>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded font-semibold text-xs"
                    //     onClick={()=>showConfirmation(()=>toggleProduct(row._id, {
                    //     onSuccess: (res) => toast.success(res.message),
                    // }), `${row.is_active ? 'block' : 'unblock'} this product `)}
                    >
                        Block{" "}
                    </button>
                </div>
        }
    ];
    const filterOptions = [
        { label: "Active", value: "isActive" },
        { label: "All Products", value: "AllProduct" },
        { label: "In Active", value: "isInActive" },
    ];
    console.log(orders);
    return (
        <div>
            <Header heading="Product Mangement" />
            <div className="flex gap-10 m-10">
                <IconCards
                    icon={<Package2 size={35} />}
                    // value={products.total_products}
                    label={"total products"}
                />
                <IconCards
                    icon={<PackageMinus size={35} />}
                    // value={products.blocked_products || 0}
                    label={"Blocked products"}
                />
            </div>
            <div className=" flex justify-between mx-6">
                <div className="flex gap-5 w-[60%] ">
                    <Search
                        value={params.search}
                        onChange={(e) =>
                            setParams((state) => ({
                                ...state,
                                search: e.target.value,
                            }))
                        }
                    />
                    <Dropdown
                        label="Sort by"
                        onChange={(e) =>
                            setParams((state) => ({
                                ...state,
                                filter: e.target.value,
                            }))
                        }
                        options={filterOptions}
                    />
                </div>
                <Link
                    type="submit"
                    className="hover:text-gray-700 h-auto flex  rounded px-10 p-2  gap-4 text-xl items-center bg-violet-700 hover:bg-violet-500 text-white"
                    to={"add"}
                >
                    Add Product
                </Link>
            </div>
            <TableComponent
                data={orders?.data.data}
                column={column}
                // pages={products.pages}
                // page={products.page}
                // onPageChange={(x) =>
                //     setParams((state) => ({ ...state, page: x }))
                // }
            />
        </div>
    );
};
export default OrderManagement;
