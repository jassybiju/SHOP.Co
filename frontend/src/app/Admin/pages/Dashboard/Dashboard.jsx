import { Package2, User } from "lucide-react";
import Header from "../../components/Header";
import IconCards from "../../components/IconCards";
import { useGetAllProducts } from "../../hooks/useProductManagement";
import { useGetAllBrands } from "../../hooks/useBrandManagement";
import { useGetAllUsers } from "../../hooks/useUserManagement";
import Loader from "../../../../components/Loader";
import Chart from "react-apexcharts";
import { useState } from "react";
import { useGetDashboard } from "../../hooks/useDashboard";

const Dashboard = () => {
	const { data: products, isLoading: productLoading } = useGetAllProducts();
	const { data: users, isLoading: userLoading } = useGetAllUsers();
    const {data : data} = useGetDashboard()

    console.log(data)

	if (productLoading && userLoading) {
		return <Loader />;
	}
	return (
		<div>
			{" "}
			<Header heading="Dashboard" />
			<div className="flex gap-10 m-10">
				<IconCards icon={<User size={35} />} value={users?.total_users} label={"total users"} />{" "}
				<IconCards
					icon={<Package2 size={35} />}
					value={products?.total_products}
					label={"total products"}
				/>
			</div>
			<div>
				{/* //starting  */}


				<div className=" w-3xl bg-white rounded-lg shadow-sm  p-4 md:p-6 mx-auto">
					{/* Header Section */}
					<div className="flex justify-between mb-5 ">
						{/* Metrics */}
						<div className="grid gap-4 grid-cols-2">
							{/* Clicks */}
							<div>
								<p className="text-gray-900  text-2xl leading-none font-bold">
                                    Revenue
								</p>
							</div>

						</div>

						{/* Dropdown */}
						<div>
							<select
								type="button"
								className="px-3 py-2 inline-flex items-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
							>
								<option value="">Weekly</option>
								<option value="">Daily</option>
								<option value="">Monthly</option>
							</select>
						</div>
					</div>

					{/* Line Chart */}
					<div id="line-chart" className="w-full ">
						<Chart
							options={{
								chart: {
									height: 280,
									type: "area",
								},
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
								xaxis: {
									categories: data?.data?.chart.map(x => x.date)
								},
							}}
							series={[
								{
									data: data?.data?.chart.map(x => x.value),
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
		</div>
	);
};
export default Dashboard;
