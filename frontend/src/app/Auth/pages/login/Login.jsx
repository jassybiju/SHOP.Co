import { Link } from "react-router";
import Input from "../../../../components/Input"; // reuse same component
import { useForm } from "react-hook-form";
import AuthBanner from "../../components/AuthBanner";
import { useLoginUser } from "../../hooks/useAuth";

const Login = () => {
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { mutate: login } = useLoginUser();
    console.log("Gotcha")
    const onSubmit = (data) => {
         login(data);
        console.log(data)
    };

    return (
        <div className="flex h-[90vh]">
            {/* Left Side - Background */}
            <AuthBanner />

            {/* Right Side - Login Form */}
            <div className="w-2/3  flex justify-center items-center bg-gray-50">
                <div className="w-full max-w-md">
                    {/* Heading */}
                    <h1 className="text-2xl font-bold mb-2 text-center">
                        Syn<span className="text-purple-500">apse</span>
                    </h1>
                    <h2 className="text-xl font-semibold text-center mb-6">
                        Sign In to Event Hive
                    </h2>

                    {/* Form */}
                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                    >
                        <Input
                            type="email"
                            label="Email"
                            register={register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email",
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
                            })}
                            error={errors.password?.message}
                        />

                        {/* Forgot Password */}
                        <div className="flex justify-end">
                            <Link
                                to="/auth/forget-password"
                                className="text-sm text-red-500 hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
                        >
                            Login
                        </button>

                        {/* Google Sign-In */}
                        <button
                            type="button"
                            className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
                        >
                            <img
                                src="https://www.svgrepo.com/show/355037/google.svg"
                                alt="Google"
                                className="w-5 h-5 mr-2"
                            />
                            Sign In with Google
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center mt-4 text-gray-600">
                        Don’t have an account?{" "}
                        <Link to={"/auth/register"} className="underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
