import { Link, useNavigate } from "react-router";
import Input from "../../../../components/Input"; // reuse same component
import { useForm } from "react-hook-form";
import AuthBanner from "../../components/AuthBanner";
import { useLoginUser } from "../../hooks/useAuth";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../../services/auth.service";
import toast from "react-hot-toast";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useResponsive } from "@/hooks/useResponsive";
const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const queryClient = useQueryClient();

	const [formError, setFormError] = useState("");
	const { mutate: login, status } = useLoginUser();
	const navigate = useNavigate();

    const {isTab} = useResponsive()

	const onSubmit = (data) => {
		console.log(123);
		login(data, {
			onError: (data) => {
				setFormError(data.response.data.message);
				toast.error(data.response.data.message);
			},
			onSuccess: () => console.log("success"),
		});
		console.log(data);
	};

	const responseGoogle = async (authResult) => {
		console.log("Google Login");
		try {
			if (authResult["code"]) {
				const result = await googleAuth(authResult.code);
				console.log(result);
				const email = result.data.email;
				const first_name = result.data.first_name;
				const active = result.data.active;
				const role = result.data.role;
				const obj = { email, first_name, active, role };
				queryClient.setQueryData(["user"], obj);
				navigate("/");
			} else {
				throw new Error(authResult);
			}
		} catch (error) {
			toast.error(error.response.data.message);
			console.log("Error while google login", error);
		}
	};

	const googleLogin = useGoogleLogin({
		onSuccess: responseGoogle,
		onError: responseGoogle,
		flow: "auth-code",
	});

	console.log(errors);
	return (
		<div className="flex h-[90vh]">
			{/* Left Side - Background */}
			{!isTab && <AuthBanner />}

			{/* Right Side - Login Form */}
			<div className={`${isTab ? "w-full px-15 " :"w-2/3"}  flex justify-center items-center bg-gray-50`}>
				<div className="w-full max-w-md">
					{/* Heading */}
					<h1 className="text-2xl font-bold mb-2 text-center">
						Syn<span className="text-purple-500">apse</span>
					</h1>
					<h2 className="text-xl font-semibold text-center mb-6">Sign In to Event Hive</h2>

					{/* Form */}
					<form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
						{formError && <p className="text-red-500 bg-red-300 p-4 text-center">{formError}</p>}
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
							})}
							error={errors.password?.message}
						/>

						{/* Forgot Password */}
						<div className="flex justify-end">
							<Link to="/auth/forget-password" className="text-sm text-red-500 hover:underline">
								Forgot Password?
							</Link>
						</div>

						{/* Login Button */}
						<button
							disabled={status === "pending"}
							type="submit"
							className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition disabled:bg-gray-900"
						>
							{status === "pending" ? "Logining " : "Login"}
						</button>

						{/* Google Sign-In */}
						<button
							onClick={googleLogin}
							type="button"
							className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
						>
							<img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5 mr-2" />
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
