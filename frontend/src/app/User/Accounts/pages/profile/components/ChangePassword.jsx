import Button from "@/app/User/components/Button";
import InputComponent from "@/components/InputComponent";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useChangePassword } from "../../../hooks/useAccount";
import toast from "react-hot-toast";
import { Link } from "react-router";

const ChangePassword = () => {
    const { handleSubmit, register , formState : {errors} , watch } = useForm();
    const {mutate : changePassword , status} = useChangePassword()
    const onSubmit = (data) => {
        console.log(data)
        changePassword(data, {
        onSuccess : (data) => {
            toast.success(data.message)
        },
        onError : (res) => {
            toast.error(res.response.data.message)
        }
    })};
    console.log(errors)
    return (
        <div className="w-3/5 mx-auto shadow-xl ring ring-gray-200 rounded-xl px-20 py-10 ">
            <div className="pb-5 mb-5 flex justify-between text-2xl font-normal border-b-2 ">
                <span>Change Password</span>{" "}
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="relative">
                    <InputComponent label={'Old password'} register={register("old_password", {
                                required: "Password is required",
                             
                            })}   error={errors?.old_password} />
                        <Link to={'/auth/forget-password'} className="text-sm text-right w-full block text-red-400 relative -top-5 z-1000 hover:text-red-600">forget password ?</Link>
                    <InputComponent label={'New password'} register={register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters",
                                },
                                pattern: {
                                    value: /^(?=.*[0-9])(?=.*[!@#$%^&*])/,
                                    message:
                                        "Password must include a number & special character",
                                },
                            })}   error={errors?.password}/>
                    <InputComponent label={'New password again'}  register={register("confirm_password", {
                                required: "Please confirm your password",
                                validate: (value) =>
                                    value === watch("password") ||
                                    "Passwords do not match",
                            })}
                            error={errors?.confirm_password}/>

                    
                        
                        <Button 
                        type='submit'
                            className={"h-min mt-2"}
                            disabled={status === "pending"}
                            label={"Submit"}
                            isLoading={status === "pending"}
                            loadingLabel={
                                <div className="flex gap-2">
                                    <Loader2 className="animate-spin" />{" "}
                                    Submiting{" "}
                                </div>
                            }
                        />
                    
                
            </form>
            {/* <ChangeUserEmail/> */}
        </div>
    );
};
export default ChangePassword;
