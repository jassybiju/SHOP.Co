import { useAddWishlistItems, useRemoveWishlistItems } from "@/app/User/hooks/useWishlist";
import ModalWrapper from "@/components/ModalWrapper";
import { BatteryWarning, Minus, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import ShowVariantsModal from "./ShowVariantsModal";
import { useModal } from "@/hooks/useModal";

export const ProductCard = ({ data , disabled , is_blocked = false}) => {
    const { mutate: updateWishlistItem, status } = useAddWishlistItems();
    const { mutate: removeWishlistItem, status: removeStatus } =
        useRemoveWishlistItems();

        console.log(data)
    const {openModal, closeModal } = useModal()

    const onAddToCart = (id) => {
        openModal('add-to-cart',<ModalWrapper render={<ShowVariantsModal id={id}/>} xRequired={true} onX={()=>closeModal('add-to-cart')}/>)
    }


    const isRemoving = removeStatus === "pending";

    return (
        <div
            className={`relative bg-gray-50 shadow w-full h-40 rounded-2xl px-3 py-3 flex items-center justify-between transition-all duration-300 ${
                isRemoving ? "opacity-60 pointer-events-none" : ""
            }`}
        >
            {/* Left Side - Image and Info */}
            <div className="flex h-full gap-5">
                <img src={data.image} alt="" className="w-35 h-35 rounded" />
                <div className="flex flex-col justify-evenly h-full">
                    <h1 className="font-hero text-xl">{data.name}</h1>

                    <h1 className="font-hero text-xl">${data.price} {data.quantity}</h1>
                    {is_blocked && <p className="text-red-500"> <BatteryWarning/> Product is out of stock</p>}
                </div>
            </div>
           {!disabled && (

            <div className="flex flex-col justify-between items-end h-full">
                <button
                    onClick={() => removeWishlistItem(data._id)}
                    disabled={isRemoving}
                >
                    <Trash2 className="text-red-700 mx-3" />
                </button>
                <div className="flex gap-3  py-3 px-5 rounded-full items-center">
                    <button
                        onClick={()=>onAddToCart(data.product_id)}
                        disabled={status === "pending" || isRemoving}
                        className="hover:bg-gray-300 border-8 text-nowrap border-neutral-50 rounded-full hover:border-gray-300"
                    >
                        Add to Cart
                    </button>

                </div>
            </div>
            )}
        </div>
    );
};