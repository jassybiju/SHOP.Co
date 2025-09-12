import { useForm } from "react-hook-form";
import Input from "../../../../components/Input"; // same component
import { useCallback, useEffect, useState } from "react";
import { useStore } from "../../../../store/store";
import { Link, useLocation, useNavigate } from "react-router";
import { useVerifyOtp } from "../../hooks/useAuth";
import toast from "react-hot-toast";

const OTPVerify = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate()
    const { otpExpiry, clearOtpExpiry } = useStore();
    const { state : { email, type }} = useLocation();
    const { mutate: otpVerify } = useVerifyOtp();
    console.log(otpExpiry)
    const onSubmit = (data) => {
        console.log("OTP Submitted:", data);
        otpVerify(
            { otp_code: data.otp, email, type },
            {
                onSuccess: (data) => {
                    console.log(data);
                    toast.success(data.data.message);
                    clearOtpExpiry()
                    navigate('/home')
                },
                onError: (error) => console.log(error),
            }
        )
    };

    //for otp timer
    const [timer, setTimer] = useState(0);
    const updateTimer = useCallback(() => {
        const diff = Math.max(0, Math.floor((otpExpiry - Date.now()) / 1000));
        setTimer(diff);
        if (diff === 0) clearOtpExpiry();
    }, [clearOtpExpiry, otpExpiry]);

    console.log(timer);

    useEffect(() => {
        if (!otpExpiry) {
            setTimer(0);
            return;
        }
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [updateTimer, setTimer, otpExpiry]);

    return (
        <div className="flex h-[90vh] justify-center items-center bg-gray-50">
            <div className="w-full h-3/4 max-w-md ">
                {/* Heading */}
                <h1 className="text-2xl font-bold mb-2 text-center">
                    Syn<span className="text-purple-500">apse</span>
                </h1>
                <h2 className="text-xl font-semibold text-center mb-6">
                    Enter the OTP
                </h2>

                {/* Info text */}
                <p className="text-center text-gray-600 mb-4">
                    The OTP has been sent to your registered email
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Input
                            type="text"
                            label="Enter the OTP"
                            register={register("otp", {
                                required: "OTP is required",
                                minLength: {
                                    value: 6,
                                    message: "OTP must be 6 digits",
                                },
                                maxLength: {
                                    value: 6,
                                    message: "OTP must be 6 digits",
                                },
                            })}
                            error={errors.otp?.message}
                        />

                        {/* Resend OTP */}
                        <button
                            type="button"
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition disabled:bg-purple-950 "

                            disabled={otpExpiry === null}
                        >
                            Resend OTP
                        </button>
                    </div>

                    {/* Timer */}
                    <p className="text-sm text-red-500">
                    {timer !== 0 ?
                        `${`${Math.floor(timer / 60)} : ${timer % 60}`} seconds
                        remaining` : "Timeout"
                    }
                    </p>

                    {/* Buttons */}
                    <div className="flex justify-between items-center mt-6">
                        <Link
                            to={"/auth/register"}
                            className="text-sm text-gray-600 hover:underline"
                        >
                            Go back
                        </Link>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                        >
                            Verify
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OTPVerify;
