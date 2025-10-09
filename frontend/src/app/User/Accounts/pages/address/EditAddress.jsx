import React from "react";
import InputComponent from "@/components/InputComponent";
import { Link, useParams } from "react-router";
import { useForm } from "react-hook-form";
import Button from "@/app/User/components/Button";
import { useAddAddress, useEditAccount, useEditAddress, useGetAddress } from "../../hooks/useAccount";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const EditAddress = () => {
    const { id } = useParams();
    const { data } = useGetAddress(id);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()
    console.log(errors);
    
    useEffect(()=>{
        if(data?.data){
            reset(data?.data)
        }
    },[reset, data?.data])
    
    const { mutate: editAddress, status } = useEditAddress();
    const onSubmit = (data) => {
        const { _id , user_id, __v , is_primary, ...rest} = data
        void _id
        void user_id
        void __v
        void is_primary
        console.log("Address submitted ✅", data);
        editAddress(({id,data: rest}), {
            onSuccess: (data) => {
                console.log(data);
                toast.success(data.message);
            },
            onError: (res) => {
                console.log(res);
                toast.error(res.response.data.message);
            },
        });
    };

    return (
        <div className="w-3/5 mx-auto shadow-xl ring ring-gray-200 rounded-xl px-20 py-10 ">
            <div className="pb-5 mb-5 flex justify-between text-2xl font-normal border-b-2">
                <span>Add new Address</span> <span>Personal Information</span>
            </div>

            {/* You had your <form> here, we keep it exactly here */}
            <form onSubmit={handleSubmit(onSubmit)} className=" ">
                <div className="flex gap-4">
                    <InputComponent
                        label={"first name"}
                        register={register("first_name", {
                            required: "First name is required",
                        })}
                        errors={errors.first_name}
                    />
                    <InputComponent
                        label={"last name"}
                        register={register("last_name", {
                            required: "Last name is required",
                        })}
                        errors={errors.last_name}
                    />
                </div>

                {/* The rest remains outside the form exactly as you placed */}
                <InputComponent
                    label={"phone"}
                    register={register("phone", {
                        required: "Phone number is required",
                        pattern: {
                            value: /^[0-9]{7,15}$/,
                            message: "Invalid phone number",
                        },
                    })}
                    errors={errors.phone}
                />

                <InputComponent
                    textarea
                    label={"Address"}
                    register={register("address", {
                        required: "Address is required",
                    })}
                    errors={errors.address}
                />

                <div className="flex gap-4">
                    <InputComponent
                        label={"District / Town"}
                        register={register("place", {
                            required: "District/Town is required",
                        })}
                        errors={errors.place}
                    />
                    <InputComponent
                        label={"State"}
                        register={register("state", {
                            required: "State is required",
                        })}
                        errors={errors.state}
                    />
                </div>

                <div className="flex gap-4">
                    <InputComponent
                        label={"Landmark"}
                        register={register("landmark")}
                    />
                    <InputComponent
                        label={"Pincode"}
                        register={register("pincode", {
                            required: "Pincode is required",
                            pattern: {
                                value: /^[0-9]{5,6}$/,
                                message: "Invalid pincode",
                            },
                        })}
                        errors={errors.pincode}
                    />
                </div>

                <InputComponent
                    label={"Address Type"}
                    placeholder={"eg: "}
                    register={register("address_type", {
                        required: "Address type is required",
                    })}
                    errors={errors.address_type}
                />

                <div className="mt-6 flex justify-end">
                    <Button
                        type="submit"
                        disabled={status === "pending"}
                        isLoading={status === "pending"}
                        label="Save Address"
                        loadingLabel={
                            <div className="flex gap-2">
                                <Loader2 className="animate-spin" /> Submiting{" "}
                            </div>
                        }
                    />
                </div>
            </form>
        </div>
    );
};

export default EditAddress;
