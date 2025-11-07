import React, { useState } from "react";
import TableComponent from "../../components/TableComponent";
import { Link } from "react-router";
import Header from "../../components/Header";
import Search from "../../components/Search";
import Dropdown from "../../../../components/Dropdown";
import { useGetAllOrder } from "../../hooks/useOrderManagement";
import Loader from "@/components/Loader";

const STATUS_OPTIONS = [
	{ label: "ALL Status", value: "ALL" },
	{ label: "placed", value: "PLACED" },
	{ label: "confirmed", value: "CONFIRMED" },
	{ label: "CANCELLATION_REQUESTED", value: "CANCELLATION_REQUESTED" },
	{ label: "RETURN_REQUESTED", value: "RETURN_REQUESTED" },
];

const sortOptions = [
	{
		label: "Created At - asc",
		value: "createdAt -asc",
		CONST: { sort: "createdAt", order: "asc" },
	},
	{
		label: "Created At - desc",
		value: "createdAt -desc",
		CONST: { sort: "createdAt", order: "desc" },
	},
	{
		label: "total - asc",
		value: "total -asc",
		CONST: { sort: "name", order: "asc" },
	},
	{
		label: "Name - desc",
		value: "name -desc",
		CONST: { sort: "name", order: "desc" },
	},
];

const OrderManagement = () => {
	const [params, setParams] = useState({
		search: "",
		status: "",
        sort : "createdAt",
        order : "desc"
	});

	const { data: orders, status } = useGetAllOrder(params);
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
			render: (val) => (
				<p className="text-nowrap">
					{new Date(val).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}{" "}
					<span className="block text-gray-500">{new Date(val).toLocaleTimeString()}</span>
				</p>
			),
		},
		{
			label: "USER EMAIL",
			key: "user",
			render: (val) => val.email,
		},
		{
			label: "TOTAL",
			key: "total_amount",
			render: (val) => Number(val).toFixed(2),
		},
		{
			label: "PAYMENT METHOD",
			key: "payment_method",
		},
		{
			label: "PAYMENT STATUS",
			key: "payment_status",
		},
		{
			label: "ACTIONS",
			render: (_, row) => (
				<div className="flex gap-5">
					{" "}
					<Link className="bg-violet-600 hover:bg-violet-700 text-white py-1 px-4 rounded font-semibold text-xs" to={"view/" + row._id}>
						VIEW
					</Link>
					<button
						className="bg-amber-500 hover:bg-amber-600 text-white py-1 px-4 rounded font-semibold text-xs"
						onClick={() => alert(`Currently on ${row.status_history.slice(-1)[0].status} statys`)}
						//     onClick={()=>showConfirmation(()=>toggleProduct(row._id, {
						//     onSuccess: (res) => toast.success(res.message),
						// }), `${row.is_active ? 'block' : 'unblock'} this product `)}
					>
						{row.status_history.slice(-1)[0].status}
					</button>
				</div>
			),
		},
	];
	// const filterOptions = [
	// 	{ label: "Active", value: "isActive" },
	// 	{ label: "All Products", value: "AllProduct" },
	// 	{ label: "In Active", value: "isInActive" },
	// ];
	console.log(orders);
	return (
		<div className="">
			<Header heading="Order Mangement" />

			{/* Stat Cards */}
			{/* <div className="flex flex-col sm:flex-row sm:gap-10 gap-4 sm:m-10 m-4">
				<IconCards icon={<Package2 size={35} />} label={"Total Products"} />
				<IconCards icon={<PackageMinus size={35} />} label={"Blocked Products"} />
			</div> */}

			{/* Filters */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mx-3 sm:mx-6 mt-3">
				<div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full sm:w-[70%]">
					<Search
						value={params.search}
						onChange={(e) => setParams((state) => ({ ...state, search: e.target.value }))}
					/>
					<Dropdown
						label="Sort by"
						onChange={(e) =>
							setParams((state) => ({
								...state,
								...sortOptions.find((x) => x.value === e.target.value).CONST,
							}))
						}
						options={sortOptions}
					/>
					<Dropdown
						label="Select Status"
						onChange={(e) => setParams((state) => ({ ...state, status: e.target.value }))}
						options={STATUS_OPTIONS}
					/>
				</div>

				{/* <Link
					type="submit"
					className="hover:text-gray-700 w-full sm:w-auto flex justify-center items-center rounded px-6 sm:px-10 py-2 text-lg sm:text-xl bg-violet-700 hover:bg-violet-500 text-white"
					to={"add"}
				>
					Add Product
				</Link> */}
			</div>

			{/* Table */}
			<div className="mt-4 overflow-x-auto">
				<TableComponent
					data={orders?.data.data}
					column={column}
					pages={orders?.data.pages}
					page={orders?.data.page}
					onPageChange={(x) => setParams((state) => ({ ...state, page: x }))}
				/>
			</div>
		</div>	);
};
export default OrderManagement;
