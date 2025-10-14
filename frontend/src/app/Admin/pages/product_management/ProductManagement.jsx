import React, { useState } from "react";
import Search from "../../components/Search";
import Header from "../../components/Header";
import Dropdown from "../../components/Dropdown";
import TableComponent from "../../components/TableComponent";
import IconCards from "../../components/IconCards";
import {
    Package2,
    Package2Icon,
    PackageCheck,
    PackageMinus,
    PackageOpen,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import {
    useGetAllProducts,
    useToggleProductStatus,
} from "../../hooks/useProductManagement";
import { useGetAllCategories } from "../../hooks/useCategoryManagement";
import ProductStateComponent from "./ui/ProductStateComponent";
import { productFilterOptions } from "../../../../utils/CONSTANTS";
import { useEffect } from "react";
import ToggleBtn from "./ui/ToggleBtn";
import toast from "react-hot-toast";
import useConfirmationModal from "../../hooks/useConfirmationModal";

const ProductManagement = () => {
    const navigate = useNavigate();
    const [params, setParams] = useState({
        search: "",
        sort: "created at - asc",
        filter: "AllUsers",
        page: 1,
        limit: 4,
    });

    const { data: categories } = useGetAllCategories();

    const { data: products, status } = useGetAllProducts(params);
    const { mutate: toggleProduct } = useToggleProductStatus();
    console.log(products);
    useEffect(() => {
        if (products?.pages < params?.page) {
            setParams((state) => ({ ...state, page: products.pages }));
        }
        // console.log(users?.page , params?.page)
    }, [params, products]);

    const showConfirmation = useConfirmationModal()

    if (status !== "success") {
        return "Loading";
    }

    const column = [
        {
            label: "Sl No",
            key: "_id",
            render: (_, row, data) => data.indexOf(row) + 1,
        },
        {
            label: "Product",
            key: "name",
            render: (val, row) => (
                <div className="flex w-full text-nowrap items-center gap-3 px-3">
                    <img
                        src={row?.images[0]?.url}
                        className="rounded-full w-10 h-10"
                        alt=""
                    />
                    {val}
                </div>
            ),
        },
        {
            label: "Category",
            key: "category_id",
            render: (val) => <div className="rounded-full bg-gray-300 py-1"> {categories.data.find((x) => x._id === val)?.name}</div>,
        },
        {
            label: "Qty",
            key: "variants",
            render: (val) => val.reduce((acc, cur) => acc + cur.stock, 0),
        },
        { label: "Price", key: "price" },
        {
            label: "is_active",
            key: "is_active",
            render: (val, row) => (
                <ToggleBtn
                    state={val}
                    onClick={()=>showConfirmation(()=>toggleProduct(row._id, {
                        onSuccess: (res) => toast.success(res.message),
                    }), `${val ? 'block' : 'unblock'} this product `)}
                />
            ),
        },
        // {
        //     label: "Description",
        //     key: "description",
        //     render: (val) => <>{val.substring(0, 10)}...</>,
        // },
        {
            label: "Actions",
            key: "_id",
            render: (val, row) => (
                <div className="flex gap-5">
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
                        onClick={()=>showConfirmation(()=>toggleProduct(row._id, {
                        onSuccess: (res) => toast.success(res.message),
                    }), `${row.is_active ? 'block' : 'unblock'} this product `)}
                    >
                        Block{" "}
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <Header heading="Product Mangement" />
            <div className="flex gap-10 m-10">
                <IconCards
                    icon={<Package2 size={35} />}
                    value={products.total_products}
                    label={"total products"}
                />
                <IconCards
                    icon={<PackageMinus size={35} />}
                    value={products.blocked_products || 0}
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
                        label="Filter by"
                        onChange={(e) =>
                            setParams((state) => ({
                                ...state,
                                filter: e.target.value,
                            }))
                        }
                        options={productFilterOptions}
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
                data={products?.data}
                column={column}
                pages={products.pages}
                page={products.page}
                onPageChange={(x) =>
                    setParams((state) => ({ ...state, page: x }))
                }
            />
        </div>
    );
};
export default ProductManagement;
