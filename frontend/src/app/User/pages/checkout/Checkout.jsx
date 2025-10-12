import React from "react";
import { useCheckout } from "../../hooks/useCheckout";
import Button from "../../components/Button";
import BreadCrumb from "@/app/Home/components/BreadCrumb";
import { ProductCard } from "../../components/ProductCart";
import Loader from "@/components/Loader";
import { Navigate, useNavigate } from "react-router";
import toast from "react-hot-toast";
import CouponInput from "./components/CouponInput";
import { MoveRight } from "lucide-react";
import AddressComponent from "../../Accounts/pages/address/component/AddressComponent";
import CheckoutAddress from "./components/CheckoutAddress";
import ModalWrapper from "@/components/ModalWrapper";
import AddAddress from "../../Accounts/pages/address/AddAddress";
import { useModal } from "@/hooks/useModal";
const Checkout = () => {
    const { data, status, error } = useCheckout();
    const navigate = useNavigate();
    const { openModal, closeModal } = useModal();
    if (status === "pending") return <Loader />;

    if (status === "error" || !data || data.status !== "success") {
        console.log(error);
        // toast.error(data?.message || "Unable to load checkout");
        toast.error(error.response.data.message);
        navigate("/cart", { replace: true });
        return null;
    }

    const { cart, subtotal, total, address, discountApplied, delivery_fee } =
        data.data;

    const addAddressModal = () => {
        openModal(
            "add-address",
            <ModalWrapper
                onX={() => closeModal("add-address")}
                render={<AddAddress />}
            />
        );
    };

    return (
        <div className="px-20 py-5">
            <BreadCrumb items={[{ label: "Cart" }, { label: "Checkout" }]} />

            <h1 className="font-hero text-5xl my-10">Checkout</h1>
            <div className="flex gap-10 w-full h-min">
                <div className="flex flex-col w-3/5">
                    {/* // Cart Items  */}
                    <div className="rounded border-0 w-full border-gray-400 px-1 py-1 h-max">
                        {cart.map((x) => (
                            <ProductCard key={x._id} data={x} disabled={true} />
                        ))}
                    </div>

                    {/* //Addres/s */}
                    <div className="rounded-xl shadow-lg border-2 border-gray-100 my-5 px-10 py-10 h-min gap-2 flex flex-col">
                        <p className="font-hero text-2xl w-full border-b-1 py-5 my-5">
                            Delivery Address
                        </p>
                        {address
                            .sort(
                                (a, b) =>
                                    (b.is_primary === true) -
                                    (a.is_primary === true)
                            )
                            .map((x) => (
                                <CheckoutAddress key={x._id} data={x} />
                            ))}
                        <div className="flex justify-end">
                            <Button
                                label="Add Address"
                                loadingLabel="Adding Address"
                                onClick={addAddressModal}
                            />
                        </div>
                    </div>

                    {/* // Payment Methods */}
                    <div className="rounded-xl shadow-lg border-2 border-gray-100 bg-white px-10 py-10 my-5 h-min gap-2 flex flex-col">
                        <p className="font-hero text-2xl border-b-1 py-5 w-full my-5">
                            Payment Method
                        </p>
                        Select Any Payment Methods
                        <div className="flex flex-col gap-4 my-4">
                            {[{label:'Cash On Delivery'} , {label : "UPI"}].map((x,i) => (<>
                            <div className="flex items-center me-4">
                                <input
                                    defaultChecked={i === 0}
                                    id="inline-checked-radio"
                                    type="radio"
                                    value=""
                                    name={'payment'}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                                />
                                <label
                                    htmlFor={x.label}
                                    className="ms-2 text-sm font-medium text-gray-900"
                                >
                                   {x.label}
                                </label>
                            </div>
                            </>))}
                            <div className="flex items-center">
                                <input
                                    disabled
                                    id="inline-disabled-radio"
                                    type="radio"
                                    value=""
                                    name="inline-radio-group"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    for="inline-disabled-radio"
                                    className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500"
                                >
                                    Inline disabled
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-2/5 rounded border-1 h-max border-gray-400 text-lg p-5 pb-10 text-bg-gray-200 px-10">
                    <h1 className="font-hero text-3xl">Order Summary</h1>
                    <div className="flex justify-between w-full my-5">
                        <span>Subtotal : </span>
                        <span className="font-bold">
                            ${subtotal.toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between w-full my-5">
                        <span>Discount : </span>
                        <span className="font-bold text-red-600">
                            -${discountApplied.toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between w-full my-5">
                        <span>Delivery Fee : </span>
                        <span className="font-bold ">
                            ${delivery_fee.toFixed(2)}
                        </span>
                    </div>
                    <hr />
                    <div className="flex justify-between w-full my-5">
                        <span>Total : </span>
                        <span className="font-bold">${total.toFixed(2)}</span>
                    </div>

                    <CouponInput />
                    <Button
                        onClick={() => navigate("/checkout")}
                        className={"rounded-full w-full mt-4"}
                        label={
                            <div className="flex gap-2 justify-center">
                                Place Order <MoveRight />{" "}
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default Checkout;
