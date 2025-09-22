import { useState } from "react";
import Search from "../../components/Search";
import Header from "../../components/Header";
import Dropdown from "../../components/Dropdown";
import TableComponent from "../../components/TableComponent";
import IconCards from "../../components/IconCards";
import {
    Package2,
    Package2Icon,
    PackageCheck,
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

const ProductManagement = () => {
    const navigate = useNavigate();
    const [params, setParams] = useState({
        search: "",
        sort: "created at - asc",
        filter: "AllUsers",
        page: 1,
    });

    const { data: categories } = useGetAllCategories();

    const { data: products, status } = useGetAllProducts(params);
    const { mutate: toggleProduct } = useToggleProductStatus();
    console.log(status)
    if (status !== "success") {
        return "Loading";
    }
    console.log(products)

    const column = [
        {
            label: "Sl No",
            key: "_id",
            render: (_, row, data) => data.indexOf(row) + 1,
        },
        { label: "Product", key: "name", render: (val, row) => <>{val}</> },
        {
            label: "Category",
            key: "category_id",
            render: (val) => categories.data.find((x) => x._id === val)?.name,
        },
        { label: "Qty", key: "stock" },
        { label: "Price", key: "price" },
        {
            label: "is_active",
            key: "is_active",
            render: (val) =><ProductStateComponent state={val}/>,
        },
        { label: "Description", key: "description" },
        {
            label: "Actions",
            key: "_id",
            render: (_, row) => (
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
                        onClick={() =>
                            toggleProduct(row._id, {
                                onSuccess: (res) => console.log(res),
                            })
                        }
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
                    value={120}
                    label={"total users"}
                />
                <IconCards
                    icon={<PackageOpen size={35} />}
                    value={1024}
                    label={"Blocked users"}
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
                    <Dropdown label="Sort by" onChange={(e)=>setParams(state => ({...state, filter:e.target.value}))} options={productFilterOptions} />
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
