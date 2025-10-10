import BreadCrumb from "@/app/Home/components/BreadCrumb";
import React from "react";
import Button from "../../components/Button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useGetAllCart, useRemoveCartItems, useUpdateCartItems } from "../../hooks/useCart";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
const Cart = () => {
    const {data : cart , status : getStatus} = useGetAllCart()
    if(getStatus === 'pending') return <Loader/>
    console.log(cart)
    return (
        <div className="px-20 py-5">
            <BreadCrumb items={[{ label: "Cart" }, { label: "a" }]} />

            <h1 className=" font-hero text-5xl my-10 ">Your Cart</h1>
            <div className="flex gap-10 w-full min-h-100">
                <div className="rounded border-1 w-3/5 border-gray-400 px-10 py-10">
                {cart.data.map(x => <ProductCard key={x._id} data={x}/>)}
                   
                </div>
                <div className="w-2/5 rounded border-1 h-max border-gray-400 p-5 pb-10 text-xl px-10">
                    <h1 className=" font-hero text-3xl  ">Cart Summary</h1>
                    <div className="flex justify-between w-full my-5">
                        <span>Items : </span> <span>20</span>
                    </div>
                    <hr />
                    <div className="flex justify-between w-full my-5">
                        <span>SubTotal : </span>{" "}
                        <span className="font-bold">$20</span>
                    </div>
                    <Button
                        className={"rounded-full w-full"}
                        label="Checkout"
                    />
                </div>
            </div>
        </div>
    );
};

const ProductCard = ({ data }) => {
    const { mutate: updateCartItem, status } = useUpdateCartItems();
  const { mutate: removeCartItem, status: removeStatus } = useRemoveCartItems();

  const onAddToCart = (quantity) => {
        
        updateCartItem({variant_id : data.variant_id, quantity }, {onSuccess : (data)=>{
    console.log(data)
            toast.success(data.message)
        },onError : (res)=>{
            console.log(res)
            toast.error(res.response.data.message)
        }})
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
          <p>Size : {{ S: "Small", L: "Large", M: "Medium", XL: "Extra Large" }[data.size]}</p>
          <p>Color : {data.color}</p>
          <h1 className="font-hero text-xl">${data.price}</h1>
        </div>
      </div>

      {/* Right Side - Actions */}
      <div className="flex flex-col justify-between items-end h-full">
        <button onClick={() => removeCartItem(data._id)} disabled={isRemoving}>
          <Trash2 className="text-red-700 mx-3" />
        </button>
        <div className="flex gap-3 bg-gray-100 py-3 px-5 rounded-full items-center">
          <button
            onClick={() => onAddToCart(1)}
            disabled={status === "pending" || isRemoving}
            className="hover:bg-gray-300 border-8 border-neutral-50 rounded-full hover:border-gray-300"
          >
            <Plus />
          </button>
          {data.quantity}
          <button
            onClick={() => onAddToCart(-1)}
            disabled={status === "pending" || isRemoving}
            className="hover:bg-gray-300 border-8 border-black/0 rounded-full hover:border-gray-300"
          >
            <Minus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart 