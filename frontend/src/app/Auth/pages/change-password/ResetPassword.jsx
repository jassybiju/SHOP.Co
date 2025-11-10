import { useForm } from "react-hook-form";
import Input from "../../../../components/Input";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { useResetPassword } from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
const ResetPassword = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const { mutate: resetpassword, isPending  } = useResetPassword();
    const {state  } = useLocation()
    const navigate = useNavigate();
    
    if(!state){
        toast.error("Not Allowed")
        return <Navigate to={-1}/>
    }

    const email = state.email
    const onSubmit = (data) => {
        console.log("Email submitted:", data);
        resetpassword({...data, email}, {
            onSuccess: (res) => {
                console.log(res)
                toast.success(res.message);
                console.log(res);
                navigate('/',{replace :true})
            },
            onError : (res) => {
                console.log(res)
                toast.error(res.response.data.message)
                navigate(-1)
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
                <h2 className="text-3xl font-bold text-center mb-20">
                    Reset Password
                </h2>

                {/* Instruction */}

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                    noValidate
                >
                    <p className="text-gray-600  mb-4">
                        Enter your new password
                    </p>
                    <Input
                        type="email"
                        placeholder="Enter the email"
                        register={register("password", {
                            required: "Passwrd is required",
                        })}
                        error={errors.password?.message}
                    />
                    <p className="text-gray-600  mb-4">
                        Enter your password again
                    </p>
                    <Input
                        type="email"
                        placeholder="Enter the email"
                        register={register("confirm_password", {
                            required: "Password required",
                            validate: (value) =>
                                value === watch("password") ||
                                "Passwords do not match",
                        })}
                        error={errors.confirm_password?.message}
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
                            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-800 transition disabled:bg-purple-800" 
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default ResetPassword;
