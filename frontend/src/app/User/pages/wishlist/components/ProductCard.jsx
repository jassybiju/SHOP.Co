import {  useRemoveWishlistItems } from "@/app/User/hooks/useWishlist";
import ModalWrapper from "@/components/ModalWrapper";
import { BatteryWarning, Trash2 } from "lucide-react";
import ShowVariantsModal from "./ShowVariantsModal";
import { useModal } from "@/hooks/useModal";
import { useResponsive } from "@/hooks/useResponsive";

export const ProductCard = ({ data, is_blocked = false }) => {
	const { mutate: removeWishlistItem, status: removeStatus } = useRemoveWishlistItems();
	const { isMobile } = useResponsive();

	console.log(data);
	const { openModal, closeModal } = useModal();

	const onAddToCart = (id) => {
		openModal(
			"add-to-cart",
			<ModalWrapper
				render={<ShowVariantsModal id={id} />}
				xRequired={true}
				onX={() => closeModal("add-to-cart")}
			/>
		);
	};

	const isRemoving = removeStatus === "pending";

	return (
		<div
			className={`${isMobile ? 'flex-col item-left' : 'flex-row items-center'}  relative bg-gray-50 shadow w-full h-max rounded-2xl px-3 py-3 flex  justify-between transition-all duration-300 ${
				isRemoving ? "opacity-60 pointer-events-none" : ""
			}`}
		>
			{/* Left Side - Image and Info */}
			<div className="flex h-full w-full  gap-5 ">
				<img src={data.image} alt="" className="md:w-35 w-20 md:h-35 h-20 rounded" />
				<div className="flex flex-col justify-evenly h-full w-full">
					<h1 className="font-hero md:text-xl text-lg  overflow-hidden">{data.name}</h1>

					<h1 className="font-hero text-xl">
						${data.price} <span className="text-red-500">-${data.discount}</span>
					</h1>
					{is_blocked && (
						<p className="text-red-500">
							{" "}
							<BatteryWarning /> Product is out of stock
						</p>
					)}
				</div>
			</div>
			{!isMobile && (
					<div className="flex flex-col w-min justify-between items-end h-full  ">
						<button onClick={() => removeWishlistItem(data._id)} disabled={isRemoving}>
							<Trash2 className="text-red-700 mx-3 " size={isMobile ? 20 : 30} />
						</button>

						<div className="flex gap-3  py-3 px-5 rounded-full items-center">
							<button
								onClick={() => onAddToCart(data.product_id)}
								disabled={ isRemoving}
								className="hover:bg-gray-300 border-8 md:text-sm text-sm text-nowrap border-neutral-50 rounded-full hover:border-gray-300"
							>
								Add to Cart
							</button>
						</div>
					</div>
				)}
			{isMobile && (
				<div className="flex flex-row w-min justify-between items-end gap-4   ">
					<button
						onClick={() => removeWishlistItem(data._id)}
						disabled={isRemoving}
						className="hover:bg-gray-300 bg-red-500 border-red-500 px-4 py-3 border-1 rounded-sm  md:text-sm text-sm text-nowrap   hover:border-gray-300"
					>
						Delete
					</button>
					<button
						onClick={() => onAddToCart(data.product_id)}
						disabled={status === "pending" || isRemoving}
						className="hover:bg-gray-300 border-1 px-4 py-3 rounded-sm md:text-sm text-sm text-nowrap border-black  hover:border-gray-300"
					>
						Add to Cart
					</button>
				</div>
			)}
		</div>
	);
};
