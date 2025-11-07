import BreadCrumb from "@/app/Home/components/BreadCrumb";
import Loader from "@/components/Loader";
import {ProductCard}  from "./components/ProductCard";
import { useGetAllWishlist } from "../../hooks/useWishlist";

const Wishlist = () => {
	const { data: wishlist, status: getStatus } = useGetAllWishlist();
	if (getStatus === "pending") return <Loader />;
	return (
		<div className="px-4 sm:px-8 md:px-20 py-5 w-full">
			<BreadCrumb />

			<h1 className="font-hero text-3xl sm:text-4xl md:text-5xl my-6 sm:my-10 text-center md:text-left">
				Your Wishlist
			</h1>

			<div className="flex flex-col md:flex-row gap-6 md:gap-10  w-full min-h-[100px]">
				{/* Wishlist Container */}
				<div className="w-full lg:w-3/5 border border-gray-300 rounded-xl p-5 sm:p-8 md:px-10 md:py-10 flex flex-col gap-6">
					{wishlist?.data?.length > 0 ? (
						wishlist.data.map((x) => (
							<ProductCard
								key={x._id}
								data={x}
								is_blocked={x.stock === 0}
							/>
						))
					) : (
						<p className="text-center text-gray-500 text-lg">
							No items in your wishlist
						</p>
					)}
				</div>

				{/* Optional future sidebar or button section */}
				{/* <div className="w-full md:w-2/5 flex justify-center items-start">
					<Button onClick={() => navigate("/shop")} label="Continue Shopping" />
				</div> */}
			</div>
		</div>
	);};
export default Wishlist;
