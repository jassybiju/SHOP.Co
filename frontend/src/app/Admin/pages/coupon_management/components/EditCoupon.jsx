import useConfirmationModal from "@/app/Admin/hooks/useConfirmationModal";
import { useEditCoupon, useGetCouponById } from "@/app/Admin/hooks/useCouponManagement";
import { useGetAllUsers } from "@/app/Admin/hooks/useUserManagement";
import InputComponent from "@/components/InputComponent";
import { useModal } from "@/hooks/useModal";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${Number(day) + 1}`;
};
const TODAY_STRING = getTodayString();

const EditCoupon = ({id}) => {
    const {
        register,
        trigger,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm();
    const {mutate : editCoupon , status : editingStatus} = useEditCoupon()
    const forUserValue = watch("for_user");

    const confirmation = useConfirmationModal();
    const { closeModal } = useModal();
    const { data } = useGetAllUsers();
    const { data: couponData ,status : getCouponStatus} = useGetCouponById(id);

    useEffect(()=>{
        if(couponData?.data){
            reset({...couponData?.data,expiry_date : new Date(couponData?.data.expiry_date).toISOString().slice(0,16)})
        }
    },[couponData, reset])

    const usersOption = data?.data.map((x) => ({
        label: `${x.first_name} ${x.last_name}`,
        value: x._id,
    }));
    console.log(couponData?.data)
    const onSubmit = (data) => {
        const {_id ,used_count ,is_deleted, is_active ,createdAt ,updatedAt ,__v , ...rest} = data
        editCoupon({id, data : rest},{onSuccess : (data)=> {
            console.log(data)
            toast.success(data.message)
            closeModal()
        },onError : (res) => {
            toast.error(res.response.data.message)
        }});
    };
    return (
        <>
            <div className="bg-white rounded-xl shadow-xl w-3/4 my-10  p-10 px-[10%]  outline-1">
                <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2">
                    Add Coupon
                </h2>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        trigger().then(
                            (x) => x && confirmation(handleSubmit(onSubmit))
                        );
                    }}
                    noValidate
                >
                    <p className="text-red-500">
                        {/* {formError?.form && formError?.form.message} */}
                    </p>

                    <div className="mb-6">
                        <InputComponent
                            label={"Coupon Code"}
                            register={register("code", {
                                minLength: 7,
                                maxLength: 9,
                            })}
                            errors={errors.code}
                        />
                        <div>
                            <InputComponent
                                label={"Coupon Name"}
                                register={register("name", {
                                    minLength: 3,
                                    maxLength: 50,
                                    required: "Coupon Name is required",
                                })}
                                errors={errors.name}
                            />
                            <InputComponent
                                label={"Coupon Description"}
                                register={register("description", {
                                    minLength: 3,
                                    maxLength: 150,
                                    required: "Coupon Description is required",
                                })}
                                errors={errors.description}
                            />
                        </div>
                        <div className="flex gap-4">
                            <InputComponent
                                label={"Discount Percentage"}
                                type="number"
                                register={register("discount_percentage", {
                                    required: "Discount Percentage is required",
                                    valueAsNumber: true,
                                    min: {
                                        value: 0,
                                        message: "Min value should be zero",
                                    },
                                    max: {
                                        value: 100,
                                        message: "Max value should be 100",
                                    },
                                })}
                                errors={errors.discount_percentage}
                            />
                            <InputComponent
                                label={"Max Discount Amount"}
                                type="number"
                                register={register("max_discount_amount", {
                                    required: "Max Discount Amount is Required",
                                    valueAsNumber: true,

                                    min: {
                                        value: 0,
                                        message: "Min Value is 0",
                                    },
                                })}
                                errors={errors.max_discount_amount}
                            />
                            <InputComponent
                                label={"Minimum Order Amount"}
                                type="number"
                                register={register("min_order_amount", {
                                    required:
                                        "Minimum Order Amount is required",
                                    valueAsNumber: true,

                                    min: {
                                        value: 0,
                                        message: "Minimum value is zero",
                                    },
                                })}
                                errors={errors.min_order_amount}
                            />
                        </div>
                        <div className="flex gap-4">
                            <InputComponent
                                label={"Expiry Date"}
                                type="datetime-local"
                                min={TODAY_STRING}
                                register={register("expiry_date", {
                                    required: "Expiry Date is required",
                                    valueAsDate: true,

                                    min: {
                                        value: TODAY_STRING,
                                        message:
                                            "Expiry date should be from tommorrow",
                                    },
                                })}
                                errors={errors.expiry_date}
                            />
                            <InputComponent
                                label={"Total Usage Limit"}
                                type="number"
                                register={register("usage_limit", {
                                    required: "Usage Limit is required",
                                    valueAsNumber: true,

                                    validate: (value) => {
                                        if (forUserValue) {
                                            if (value !== 1) {
                                                return "Usage Limit should be 1 if For User is selected";
                                            }
                                        } else {
                                            if (!value || value < 1) {
                                                return "Usage Limit is required and should be greater or equal to 1";
                                            }
                                        }
                                        return true;
                                    },
                                })}
                                errors={errors.usage_limit}
                            />
                            <InputComponent
                                select
                                label={"For User"}
                                register={register("for_user")}
                                options={usersOption}
                                errors={errors.for_user}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            disabled={status == "pending"}
                            onClick={() => closeModal("edit-coupon")}
                            className="px-6 py-3 bg-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-400 transition disabled:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={status === "pending"}
                            className="px-6 py-3 bg-indigo-600 rounded-lg font-semibold text-white hover:bg-indigo-700 transition disabled:bg-indigo-700"
                        >
                            {status === "pending" ? (
                                <div className="flex gap-2">
                                    <Loader2 className="animate-spin" /> Adding
                                    Brand
                                </div>
                            ) : (
                                "Add Brand"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};
export default EditCoupon;
