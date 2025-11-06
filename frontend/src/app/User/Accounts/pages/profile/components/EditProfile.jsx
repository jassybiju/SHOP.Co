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
        <>
         {/* Header */}
      <div className="pb-4 mb-6 flex flex-col md:flex-row md:justify-between text-xl md:text-2xl font-semibold border-b-2 gap-2 md:gap-0">
        <span>Edit Your Details</span>
        <span className="font-normal text-gray-600">Personal Information</span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center md:items-start">
          <div className="h-28 w-28 md:h-40 md:w-40 my-6">
            <AvatarImageComponent
              size={99}
              register={register}
              name="avatar_url"
              setValue={setValue}
              previewImg={user.avatar_url}
            />
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputComponent
            label="First Name"
            register={register("first_name", {
              required: "First Name is required",
            })}
            width={100}
            errors={errors?.first_name}
          />
          <InputComponent
            label="Last Name"
            register={register("last_name", {
              required: "Last Name is required",
            })}
            width={100}
            errors={errors?.last_name}
          />
        </div>

        <InputComponent
          label="Phone Number"
          register={register("phone", {
            pattern: {
              value: /^[0-9]{10,15}$/,
              message: "Phone must be 10–15 digits only",
            },
          })}
          errors={errors?.phone}
          width={100}
        />

        {/* Submit Button */}
        <div className="flex justify-center md:justify-end mt-8">
          <Button
            disabled={status === "pending"}
            label="Submit"
            type="submit"
            isLoading={status === "pending"}
            loadingLabel={
              <div className="flex gap-2 items-center">
                <Loader2 className="animate-spin" /> Submitting
              </div>
            }
          />
        </div>
      </form>

      {/* Change Email Section */}
      <div className="mt-10">
        <ChangeUserEmail />
      </div>
    </>
 );
};
export default EditProfile;
