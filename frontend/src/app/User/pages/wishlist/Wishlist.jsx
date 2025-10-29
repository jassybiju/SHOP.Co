import BreadCrumb from "@/app/Home/components/BreadCrumb";
import Loader from "@/components/Loader";
import {ProductCard}  from "./components/ProductCard";
import Button from "../../components/Button";
import { useNavigate } from "react-router";
import { useGetAllWishlist } from "../../hooks/useWishlist";

const Wishlist = () => {
	const { data: wishlist, status: getStatus } = useGetAllWishlist();
	const navigate = useNavigate();
	if (getStatus === "pending") return <Loader />;
	return (
		<div className="px-20 py-5">
			<BreadCrumb />

			<h1 className=" font-hero text-5xl my-10 ">Your Wishlist</h1>
			<div className="flex gap-10 w-full min-h-100">
				<div className="rounded border-1 w-3/5 border-gray-400 px-10 py-10">
					{wishlist.data.map((x) => (
						<ProductCard key={x._id} data={x} is_blocked={x.stock === 0} />
					))}
				</div>
			
			</div>
		</div>
	);
};
export default Wishlist;
