import InputComponent from "@/components/InputComponent";
import { useForm } from "react-hook-form";
import Button from "@/app/User/components/Button";
import { useAddAddress } from "../../hooks/useAccount";
import toast from "react-hot-toast";
import { ChevronLeft, Loader2 } from "lucide-react";
import { router } from "@/app/route";

const AddAddress = ({isModal = false, onClose}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const {mutate : addAddress , status} = useAddAddress()

    const goback = isModal ? onClose : () => router.navigate('/account/address')

    const onSubmit = (data) => {
        console.log("Address submitted ✅", data);
        addAddress(data, {onSuccess : (data) => {
            console.log(data)
            toast.success(data.message)
            goback()
        },onError : (res) => {
            console.log(res)
            toast.error(res.response.data.message)
        }})
    };

    return (
        <>
            <div className="pb-5 mb-5 flex justify-between text-2xl font-normal border-b-2">
                <span className='flex items-center gap-2'><button onClick={goback} ><ChevronLeft/></button> Add new Address</span> <span>Personal Information</span>
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
                        disabled={status === 'pending'}
                        isLoading={status === 'pending'}
                        label="Save Address"
                        loadingLabel={
                            <div className="flex gap-2">
                                <Loader2 className="animate-spin" /> Submiting{" "}
                            </div>
                        }
                    />
                </div>
            </form>
        </>
    );
};

export default AddAddress;
