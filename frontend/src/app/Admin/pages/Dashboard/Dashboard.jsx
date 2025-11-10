import Header from "../../components/Header";
import Loader from "../../../../components/Loader";
import Chart from "react-apexcharts";
import { useState } from "react";
import { useGetDashboard } from "../../hooks/useDashboard";

const Dashboard = () => {
	// const { data: products, isLoading: productLoading } = useGetAllProducts();
	// const { data: users, isLoading: userLoading } = useGetAllUsers();
	const [duration, setDuration] = useState("daily");
	const { data: data, status } = useGetDashboard(duration);

	console.log(data);

	if (status == 'pending') {
		return <Loader />;
	}
	return (
		<div>
			{" "}
			<Header heading="Dashboard" />
			{/* <div className="flex gap-10 m-10"> */}
				{/* <IconCards icon={<User size={35} />} value={users?.total_users} label={"total users"} />{" "} */}
				{/* <IconCards
					icon={<Package2 size={35} />}
					// value={products?.total_products}
					label={"total products"}
				/>
			</div> */}
			<div>
				{/* //starting  */}

				<div className="max-w-3xl w-auto mt-10 bg-white rounded-lg shadow-sm p-4 md:p-6 ms-10">
					{/* Header Section */}
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5 ">
						{/* Metrics */}

						{/* Clicks */}

						<p className="text-gray-900  text-2xl leading-none font-bold">Revenue</p>

						{/* Dropdown */}
						<div>
							<select
								onChange={(e) => setDuration(e.target.value)}
								type="button"
								className="px-3 py-2 inline-flex items-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
							>
								<option value="daily">Daily</option>
								<option value="weekly">Weekly</option>
								<option value="monthly">Monthly</option>
							</select>
						</div>
					</div>

					{/* Line Chart */}
					<div id="line-chart" className="w-full">
						<Chart
							options={{
								chart: {
									height: 280,
									type: "area",
                                    width : "100%"
								},
								title: { text: "Revenue Over time" },

								dataLabels: {
									enabled: false,
								},

								fill: {
									type: "gradient",
									gradient: {
										shadeIntensity: 0,
										opacityFrom: 0.9,
										opacityTo: 0,
										stops: [0, 90, 100],
										type: "vertical",
									},
								},
								yaxis: { title: { text: "Revenue" } },
								xaxis: {
									categories: data?.data?.chartData?.map((x) => x.date),
								},
							}}
							series={[
								{
									data: data?.data?.chartData?.map((x) => x.value),
								},
							]}
							stroke={{ curve: "smooth" }}
							type="area"
							width={"100%"}
							height={250}
						/>
					</div>
				</div>
			</div>
			<div className=" ps-10 w-full max-w-7xl mx-auto">
				<h1 className="text-2xl font-semibold mb-6 text-center sm:text-left">🏆 Rankings</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
					{/* Top Products */}
					<div className="bg-white rounded-lg shadow-md p-5 w-full">
						<h2 className="text-lg font-bold mb-3">Top Products</h2>
						{data?.data?.topData?.topProducts?.map((p, i) => (
							<div
								key={i}
								className="flex  text-nowrap justify-between w-full border-b py-2"
							>
								<span className=" overflow-ellipsis truncate overflow-hidden ">
									{i + 1}.{i == 0 && "🏆"} {p.name}
								</span>
								<span>{p.count} sold</span>
							</div>
						))}
					</div>

					{/* Top Brands */}
					<div className="bg-white rounded-lg shadow-md p-5">
						<h2 className="text-lg font-bold mb-3">Top Brands</h2>
						{data?.data?.topData?.topBrands?.map((b, i) => (
							<div key={i} className="flex justify-between border-b py-2">
								<span>
									{i + 1}.{i == 0 && "🏆"} {b.name}
								</span>
								<span>{b.count} sales</span>
							</div>
						))}
					</div>

					{/* Top Categories */}
					<div className="bg-white rounded-lg shadow-md p-5">
						<h2 className="text-lg font-bold mb-3">Top Categories</h2>
						{data?.data?.topData?.topCategories?.map((c, i) => (
							<div key={i} className="flex justify-between border-b py-2">
								<span>
									{i + 1}.{i == 0 && "🏆"} {c.name}
								</span>
								<span>{c.count} items</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Dashboard;
