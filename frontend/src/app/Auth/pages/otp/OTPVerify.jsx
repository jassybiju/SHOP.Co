import { useForm } from "react-hook-form";
import Input from "../../../../components/Input"; // same component
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useResendOtp, useVerifyOtp } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { OTP_TYPES } from "../../../../utils/CONSTANTS";

const OTPVerify = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [formError, setFormError] = useState('')
    const navigate = useNavigate();
    const {
        state: { email, type, otpExpiry }, pathname
    } = useLocation();

    const { mutate : otpVerify , isPending : isVerifyOtpPending} = useVerifyOtp();
    const { mutate : resendOTP , isPending : isResendOtpPending } = useResendOtp()

    const onSubmit = (data) => {
        console.log("OTP Submitted:", data);
        otpVerify(
            { otp_code: data.otp, email, type },
            {
                onSuccess: (data) => {
                    console.log(data);
                    toast.success(data.message);
                    if(type === OTP_TYPES.FORGET_PASSWORD){
                        console.log('9999999999999')
                        return navigate('/auth/reset-password', {replace : true ,state : {email : email}})
                    }
                    navigate("/", {replace: true});
                },
                onError: (error) =>{
                    const errorMessage = error.response?.data?.message
                    console.log(errorMessage)
                    setFormError(errorMessage)
                    toast.error(errorMessage)
                }
            }
        );
    };

    const resendOTPHandle = () => {
        setFormError('')
        resendOTP({email}, {
            onSuccess : (res) => {
                console.log(res)
                toast.success(res.message)
                if(res.data.otp_timer){

                    navigate(pathname, {replace : true, state : {email : email , type : type , otpExpiry : res.data.otp_timer}})
                }

            },
            onError : (res) => {
                console.log(res)
                const errorMessage = res.response?.data?.message
                setFormError(errorMessage)
                toast.error(errorMessage)
            }
        })
    } 

    const onExpire = () => {console.log("Expired")}
    //for otp timer
    const [timeLeft, setTimeLeft] = useState(
        Math.max(0, otpExpiry - Date.now())
    );

    console.log(timeLeft, otpExpiry , email , type , Math.max(0, otpExpiry - Date.now()))

    useEffect(() => {

        let initialTimeLeft = Math.max(0, (otpExpiry || 0) - Date.now())
        setTimeLeft(initialTimeLeft)

        if (initialTimeLeft <= 0) {
            onExpire();
            return;
        }

        const interval = setInterval(() => {
            const diff = Math.max(0, otpExpiry - Date.now());
            setTimeLeft(diff);
            console.log(timeLeft)
            if (diff <= 0) {
                clearInterval(interval);
                onExpire();
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [otpExpiry]);

    console.log(formError)

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
                
                 <p className= {` p-4 text-center ${formError && "text-red-500 bg-red-300"}`}>
                              &nbsp;  {formError}
                            </p>
                       
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
                            onClick={resendOTPHandle}
                            type="button"
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition disabled:bg-purple-950 "
                            disabled={isResendOtpPending }
                        >
                            Resend OTP
                        </button>
                    </div>

                    {/* Timer */}
                    <p className="text-sm text-red-500">
                        {timeLeft !== 0
                            ? `${`${Math.floor(timeLeft / 60000)} : ${
                                  Math.floor((timeLeft % 60000)/1000)
                              }`} seconds
                        remaining`
                            : "Timeout"}
                    </p>

                    {/* Buttons */}
                    <div className="flex justify-between items-center mt-6">
                        <Link
                            to={-1}
                            className="text-sm text-gray-600 hover:underline"
                        >
                            Go back 
                        </Link>
                        <button
                            disabled={isVerifyOtpPending}
                            type="submit"
                            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition disabled:bg-purple-800 "
                        >
                            { isVerifyOtpPending ? "Verifying" : "Verify" }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OTPVerify;
