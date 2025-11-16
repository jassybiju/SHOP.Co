import React, { useEffect, useState } from "react";
import { useGetAllProductStatus,  } from "../../hooks/useStockManagement";
import Header from "../../components/Header";
import Dropdown from "../../../../components/Dropdown";
import TableComponent from "../../components/TableComponent";
import Search from "../../components/Search";
import RestokeInput from "./components/RestokeInput";
import Loader from "@/components/Loader";

const FILTER_OPTIONS = [
	{
		value: "lowStock",
		label: "LOW STOCK",
	},
];

const StockManagement = () => {
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


	if (status !== "success") {
		return <Loader/>;
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
					{val} {row.size}
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
			<Header heading="Stock Mangement" />
			{/* Top Cards */}
			{/* <div className="flex flex-col sm:flex-row sm:gap-10 gap-4 sm:m-10 m-4">
				<IconCards
					icon={<Package2 size={35} />}
					value={products.total_products}
					label={"Total Products"}
				/>
				<IconCards
					icon={<PackageMinus size={35} />}
					value={products.blocked_products || 0}
					label={"Blocked Products"}
				/>
			</div> */}

			{/* Search & Filter Row */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mx-3 sm:mx-6 mt-3">
				<div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full sm:w-[70%]">
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
			</div>
				{/* <Link
                    type="submit"
                    className="hover:text-gray-700 h-auto flex  rounded px-10 p-2  gap-4 text-xl items-center bg-violet-700 hover:bg-violet-500 text-white"
                    to={"add"}
                >
                    Add Product
                </Link> */}
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
