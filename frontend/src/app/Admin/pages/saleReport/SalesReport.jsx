import { Package2, PackageMinus } from "lucide-react";
import Header from "../../components/Header";
import IconCards from "../../components/IconCards";
import Dropdown from "@/components/Dropdown";
import DateRangeDropdown from "./components/DateRangeDropdown";
import { useEffect, useState } from "react";
import { calculateDateRange } from "@/utils/datesUtil";
import { useGetSalesReport } from "../../hooks/useSalesReport";
import TableComponent from "../../components/TableComponent";
import {
	downloadSalesReportExcel,
	downloadSalesReportPDF,
	getSalesReportDownloadable,
} from "../../services/sales-report.service";
import toast from "react-hot-toast";

const SalesReport = () => {
	const [dateRange, setDateRange] = useState("today");
	const [start, setStart] = useState();
	const [end, setEnd] = useState();
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [page, setPage] = useState(1);

	const { data, refetch } = useGetSalesReport({ range: dateRange, start, end, page: page, limit: 4 });

	// useEffect(()=>{generateReport()},[gne])
	const generateReport = () => {
		console.log(123);
		refetch();
	};

	const generatePdfReport = async () => {
		const data = await getSalesReportDownloadable({ range: dateRange, start, end });
		downloadSalesReportPDF(data.data.order, data.data.startDate, data.data.endDate);
	};
	const generateExcelReport = async () => {
		toast.success("Downloading report");
		const data = await getSalesReportDownloadable({ range: dateRange, start, end });
		downloadSalesReportExcel(data.data.order, data.data.startDate, data.data.endDate);
	};
	const column = [
		{ label: "ORDER ID", key: "_id" },
		{ label: "Date", key: "createdAt", render: (val) => new Date(val).toDateString() },
		{ label: "Amount", key: "total_amount", render: (val) => val.toFixed(2) },
		{ label: "Payment Methods", key: "payment_method" },
		{ label: "Payment Status", key: "payment_status" },
		{ label: "Status", key: "status_history", render: (val) => val.slice(-1)[0].status },
	];

	return (
		<>
			<Header heading="Sales  Report" />
			<div className="flex gap-10 md:p-10 m-1 w-full  box-border overflow-scroll">
				<IconCards
					icon={<Package2 size={35} />}
					value={data?.data?.grandTotalOrder}
					label={"Overall sales count"}
				/>
				<IconCards
					icon={<PackageMinus size={35} />}
					value={data?.data?.grandTotalAmount.toFixed(2) || 0}
					label={"Overall order amount"}
				/>
				<IconCards
					icon={<PackageMinus size={35} />}
					value={data?.data?.grandTotalDiscount?.toFixed(2) || 0}
					label={"Overall order discount"}
				/>
				<IconCards
					icon={<PackageMinus size={35} />}
					value={data?.data?.totalCouponDiscountAmount?.toFixed(2) || 0}
					label={"Overall coupon discount"}
				/>
				{/* <IconCards icon={<PackageMinus size={35} />} value={200 || 0} label={"Overall Discount"} /> */}
			</div>
			<div
				className="px-4  py-4   w-full box-border flex sm:flex-row flex-col md:justify-between items-start md:items-center md:space-y-0 md:space-x-4 rounded-xl bg-gray-300"
				style={{ borderRadius: "16px" }}
			>
				{/* 1. Date Range Dropdown & Filter Label */}
				<div className="flex  items-center gap-5 w-full md:w-auto">
					<p className="text-sm font-semibold text-black ">Report Duration</p>

					{/* Dropdown */}
					<select
						value={dateRange}
						onChange={(e) => {
							const value = e.target.value;
							if (value === "custom") {
								// open date picker or modal for custom range
								setShowDatePicker(true);
								setDateRange(value);
							} else {
								setDateRange(value);
								setShowDatePicker(false);
							}
						}}
						className="bg-gray-700 text-white px-4 py-3 rounded-lg outline-none border w-1/2 min-w-[150px] md:w-auto border-gray-600 focus:ring-2 focus:ring-indigo-500"
					>
						<option value="today">Today</option>
						<option value="last7days">Last 7 Days</option>
						<option value="last30days">Last 30 Days</option>
						<option value="thismonth">This Month</option>
						<option value="lastmonth">Last Month</option>
						<option value="custom">Custom Range</option>
					</select>
				</div>

				{/* 2. Action Buttons */}
				<div className="flex w-full md:w-auto space-x-4">
					{/* Download PDF Button */}
					<button
						// ... button logic ...
						className="px-6 py-3 w-1/2 bg-green-500 box-border text-white font-bold rounded-xl shadow-lg hover:bg-green-600 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
						style={{ backgroundColor: "#48bb78" }}
					>
						Download PDF
					</button>

					{/* Download Excel Button */}
					<button
						// ... button logic ...
						className="px-6 py-3 w-1/2 bg-pink-600 text-white box-border font-bold rounded-xl shadow-lg hover:bg-pink-700 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
						style={{ backgroundColor: "#e93b8d" }}
					>
						Download Excel
					</button>
				</div>
			</div>
			{showDatePicker && (
				<div className="flex items-center space-x-3 mt-3 px-10">
					<input
						type="date"
						value={start}
						onChange={(e) => setStart(e.target.value)}
						className="bg-gray-100 text-black px-3 py-2 rounded-lg border border-gray-600"
					/>
					<span className="text-gray-00">to</span>
					<input
						type="date"
						value={end}
						onChange={(e) => setEnd(e.target.value)}
						className="bg-gray-100 text-black px-3 py-2 rounded-lg border border-gray-600"
					/>
				</div>
			)}
			<p className="px-10 text-sm text-gray-600 mt-4">
				Current Filtered Dates: <strong>{new Date(data?.data?.startDate).toDateString()}</strong> to{" "}
				<strong>{new Date(data?.data?.endDate).toDateString()}</strong>
			</p>
			<TableComponent
				page={Number(data?.data?.page)}
				pages={data?.data?.pages}
				data={data?.data?.order}
				column={column}
				onPageChange={(x) => {
					console.log(x);
					setPage(x);
				}}
			/>
		</>
	);
};
export default SalesReport;
