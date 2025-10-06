import { useForm } from "react-hook-form";
import Input from "../../../../components/Input";
import { Link, useNavigate } from "react-router";
import { useForgetPassword } from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { OTP_TYPES } from "../../../../utils/CONSTANTS";
import { useState } from "react";
const ForgetPassword = () => {
    const {
        register,
    handleSubmit,
        formState: { errors },
  } = useForm();
    const [formError, setFormError] = useState('')
    const { mutate: forgetPassword , isPending} = useForgetPassword();
    const navigate = useNavigate()
    const onSubmit = (data) => {
        console.log("Email submitted:", data);
        forgetPassword(data, {
            onSuccess: (res) => {
                toast.success(res.message);
                
                navigate('/auth/otp-verify', {replace :true, state : {otpExpiry : res.data.otp_timer, email : data.email , type : OTP_TYPES.FORGET_PASSWORD }})
            },
            onError: (res) => {
                setFormError(res.response.data.message)
            }
        });
    };

    return (
        <div className="flex h-[90vh] items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full h-3/4 max-w-md p-8 ">
                {/* Logo / App Name */}
                <h1 className="text-2xl font-bold text-center mb-2">
                    Syn<span className="text-purple-500">apse</span>
                </h1>
                <h2 className="text-3xl font-bold text-center mb-10">
                    Forgot Password ?
                </h2>
  
                            <p className= {` p-4 text-center ${formError && "text-red-500 bg-red-300"}`}>
                              &nbsp;  {formError}
                            </p>
                       
                {/* Instruction */}
                <p className="text-gray-600  mb-4">
                    Enter your registered email
                </p>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                    noValidate
                >
                    <Input
                        type="email"
                        placeholder="Enter the email"
                        register={register("email", {
                            required: "Email is required",
                        })}
                        error={errors.email?.message}
                    />

                    {/* Buttons */}
                    <div className="flex items-center justify-between">
                        <Link
                            to="/auth/login"
                            className="text-sm text-gray-600 hover:underline"
                        >
                            Back to Login
                        </Link>
                        <button
                            disabled={isPending}
                            type="submit"
                            className={`px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-800  transition disabled:bg-purple-800 `}
                        >
                           { isPending ? "Verifying Email" : "Verify Email" } 
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default ForgetPassword;
