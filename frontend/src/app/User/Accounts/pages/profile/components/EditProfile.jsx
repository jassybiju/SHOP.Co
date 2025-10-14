import React from "react";
import Button from "@/app/User/components/Button";
import InputComponent from "@/components/InputComponent";
import { useUser } from "@/hooks/useUser";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import {  useEditAccount } from "../../../hooks/useAccount";
import { Loader2 } from "lucide-react";
import AvatarImageComponent from "./AvatarImageComponent";
import ChangeUserEmail from "./ChangeUserEmail";
import toast from "react-hot-toast";

const EditProfile = () => {
    const navigate = useNavigate();
    const { data: user } = useUser();
    const { register, handleSubmit, formState :{ errors}, setValue } = useForm({
        defaultValues: {
            first_name: user.first_name,
            last_name: user.last_name,
            phone: user.phone,
        },
    });
    const { mutate: editAccount, status } = useEditAccount();
    console.log(errors)
    const onSubmit = (data) => editAccount(data, {onError: (data)=>toast.error(data.response.data.message), onSuccess: (data) => toast.success(data.message)});

    console.log(user);
    return (
        <div className="w-3/5 mx-auto shadow-xl ring ring-gray-200 rounded-xl px-20 py-10 ">
            <div className="pb-5 mb-5 flex justify-between text-2xl font-semibold border-b-2 ">
                <span>Edit Your Details</span>{" "}
                <span className="font-normal">Personal Information</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="h-40 w-40 my-10">
                    <AvatarImageComponent
                        size={99}
                        register={register}
                        name="avatar_url"
                        setValue={setValue}
                        previewImg={user.avatar_url}
                    />
                </div>
                <div className="flex gap-10">
                    <InputComponent
                        label={"First Name"}
                        register={register("first_name" ,{required : "First Name is requried"})}
                        width={100}
                        errors={errors?.first_name}
                    />
                    <InputComponent
                        label={"Last Name"}
                        register={register("last_name", {required : "Last Name is requried"})}
                        width={100}
                        errors={errors?.last_name}
                    />
                </div>
                <InputComponent
                    label={"Phone Number"}
                    register={register("phone", {
                        pattern: {
                            value: /^[0-9]{10,15}$/,
                            message: "Phone must be 10–15 digits only",
                        },

                    })}
                    errors={errors?.phone}
                    width={100}
                />
                <div className="flex justify-end">
                    <Button
                        disabled={status === "pending"}
                        label={"Submit"}
                        type="submit"
                        onClick={() => navigate("/account/edit")}
                        isLoading={status === "pending"}
                        loadingLabel={
                            <div className="flex gap-2">
                                <Loader2 className="animate-spin" /> Submiting{" "}
                            </div>
                        }
                    />
                </div>
            </form>
            <ChangeUserEmail/>
        </div>
    );
};
export default EditProfile;
