import { Link, useNavigate } from "react-router";
import Input from "../../../../components/Input"; // adjust path if needed
import { useForm } from "react-hook-form";
import AuthBanner from "../../components/AuthBanner";
import Select from "../../../../components/Select";
import { useRegister } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useStore } from "../../../../store/store";
import { OTP_TYPES } from "../../../../utils/CONSTANTS";
import { useState } from "react";

const Register = () => {
    const { mutate: registerUser, isPending } = useRegister();
    const { setOtpExpiry } = useStore();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [formError, setFormError] = useState('')
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        registerUser(data, {
            onSuccess: (res, variables) => {
                console.log(res);
                toast.success(res.message);
                navigate("/auth/otp-verify", {
                    state: {otpExpiry : res.data.otp_timer, email: variables?.email, type: OTP_TYPES.SIGN_UP },
                });
            },
            onError: (data) => setFormError(data.response.data.message)
        });
    };

    return (
        <div className="flex h-[90vh]">
            <AuthBanner />
            {/* Right Side - Signup form */}
            <div className="w-2/3 flex justify-center items-center bg-gray-50">
                <div className="w-full max-w-md">
                    {/* Logo/Heading */}
                    <h1 className="text-2xl font-bold mb-2 text-center">
                        Syn<span className="text-purple-500">apse</span>
                    </h1>
                    <h2 className="text-xl font-semibold text-center mb-6">
                        Create an account
                    </h2>

                    {/* Form */}
                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                          {formError && (
                            <p className="text-red-500 bg-red-300 p-4 text-center">
                                {formError}
                            </p>
                        )}
                        <div className="flex space-x-2 w-full">
                            <Input
                                type="text"
                                label="First Name"
                                register={register("first_name", {
                                    required: "First name is required",
                                    minLength: {
                                        value: 2,
                                        message:
                                            "First name must be at least 2 characters",
                                    },
                                })}
                                error={errors.first_name?.message}
                            />

                            <Input
                                type="text"
                                label="Last Name"
                                register={register("last_name", {
                                    required: "Last name is required",
                                    minLength: {
                                        value: 2,
                                        message:
                                            "Last name must be at least 2 characters",
                                    },
                                })}
                                error={errors.last_name?.message}
                            />
                        </div>
                        <div className="flex space-x-2 w-full">
                            {/* Gender  */}
                            <Select
                                label={"Select Gender"}
                                options={[
                                    { value: "male", label: "Male" },
                                    { value: "female", label: "Female" },
                                    { value: "other", label: "Other" },
                                ]}
                                 register={register("gender", {
                                required: "Gender is required",
                            })}
                            />

                         
                        </div>
                        <Input
                            type="text"
                            label="Phone"
                            register={register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^[0-9]{10,15}$/,
                                    message: "Phone must be 10–15 digits only",
                                },
                            })}
                            error={errors.phone?.message}
                        />

                        <Input
                            type="email"
                            label="Email"
                            register={register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email address",
                                },
                            })}
                            error={errors.email?.message}
                        />

                        <Input
                            type="password"
                            label="Password"
                            register={register("password", {
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
                            })}
                            error={errors.password?.message}
                        />

                        <Input
                            type="password"
                            label="Confirm Password"
                            register={register("confirm_password", {
                                required: "Please confirm your password",
                                validate: (value) =>
                                    value === watch("password") ||
                                    "Passwords do not match",
                            })}
                            error={errors.confirm_password?.message}
                        />

                        {/* Create Account Button */}
                        <button
                            type="submit"
                            className={`w-full  text-white py-2 rounded-md  transition ${isPending ? "bg-gray-900" : 'hover:bg-gray-900 bg-black'} `}
                            disabled={isPending}
                        >
                            {isPending
                                ? "Creating Account ... "
                                : "Create Account"}
                        </button>

                        {/* Google Signup */}
                        <button
                            type="button"
                            className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
                        >
                            <img
                                src="https://www.svgrepo.com/show/355037/google.svg"
                                alt="Google"
                                className="w-5 h-5 mr-2"
                            />
                            Sign up with Google
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center mt-4 text-gray-600">
                        Already have account?{" "}
                        <Link to={"/auth/login/"} className="underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
