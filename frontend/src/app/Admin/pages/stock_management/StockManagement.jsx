import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useGetAllProductStatus, useRestokeProduct } from "../../hooks/useStockManagement";
import useConfirmationModal from "../../hooks/useConfirmationModal";
import Header from "../../components/Header";
import IconCards from "../../components/IconCards";
import { Package2, PackageMinus } from "lucide-react";
import Dropdown from "../../../../components/Dropdown";
import { productFilterOptions } from "@/utils/CONSTANTS";
import TableComponent from "../../components/TableComponent";
import Search from "../../components/Search";
import RestokeInput from "./components/RestokeInput";

const FILTER_OPTIONS = [
	{
		value: "lowStock",
		label: "LOW STOCK",
	},
];

const StockManagement = () => {
	const navigate = useNavigate();
	const [params, setParams] = useState({
		search: "",
		sort: "created at - asc",
		filter: "AllUsers",
		page: 1,
		limit: 4,
	});

	// const { data: categories } = useGetAllCategories();

	const { data: products, status } = useGetAllProductStatus(params);
	// const { mutate: toggleProduct } = useToggleProductStatus();
	console.log(products);
	useEffect(() => {
		if (products?.pages < params?.page) {
			setParams((state) => ({ ...state, page: products.pages }));
		}
		// console.log(users?.page , params?.page)
	}, [params, products]);

	const showConfirmation = useConfirmationModal();

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
			key: "product_name",
			render: (val, row) => (
				<div className="flex w-1/2 text-nowrap items-center gap-3 px-3">
					<img src={row?.image} className="rounded-full w-10 h-10" alt="" />
					{val}
				</div>
			),
		},
		{
			label: "Category",
			key: "category_name",
			render: (val) => (
				<div className="rounded-full bg-gray-300 py-1">
					{" "}
					{val}
					{/* {categories.data.find((x) => x._id === val)?.name} */}
				</div>
			),
		},
		{
			label: "Qty",
			key: "stock",
			// render: (val) => val.reduce((acc, cur) => acc + cur.stock, 0),
		},
		{ label: "Price", key: "price" },
		{ label: "Discount", key: "discount" },
		{
			label: "variant Id",
			key: "_id",
			// render: (val, row) => (
			//     <></>
			//     // <ToggleBtn
			//     //     state={val}
			//     //     onClick={() =>
			//     //         showConfirmation(
			//     //             () =>
			//     //                 toggleProduct(row._id, {
			//     //                     onSuccess: (res) =>
			//     //                         toast.success(res.message),
			//     //                 }),
			//     //             `${val ? "block" : "unblock"} this product `
			//     //         )
			//     //     }
			//     // />
			// ),
		},
		// {
		//     label: "Description",
		//     key: "description",
		//     render: (val) => <>{val.substring(0, 10)}...</>,
		// },
		{
			label: "Actions",
			key: "_id",
			render: (_, row) => <RestokeInput row={row} />,
		},
	];

	return (
		<div>
			<Header heading="Product Mangement" />
			<div className="flex gap-10 m-10">
				<IconCards icon={<Package2 size={35} />} value={products.total_products} label={"total products"} />
				<IconCards icon={<PackageMinus size={35} />} value={products.blocked_products || 0} label={"Blocked products"} />
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
						options={FILTER_OPTIONS}
					/>
				</div>
				{/* <Link
                    type="submit"
                    className="hover:text-gray-700 h-auto flex  rounded px-10 p-2  gap-4 text-xl items-center bg-violet-700 hover:bg-violet-500 text-white"
                    to={"add"}
                >
                    Add Product
                </Link> */}
			</div>
			<TableComponent
				data={products?.data.data}
				column={column}
				pages={products?.data.pages}
				page={products?.data.page}
				onPageChange={(x) => setParams((state) => ({ ...state, page: x }))}
			/>
		</div>
	);
};
export default StockManagement;
